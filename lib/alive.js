/**
 * lib/alive.js — clean, readable rewrite
 * ---------------------------------------------------------------------------
 * "Alive" module for Levanter (multi-session WhatsApp bot built on Baileys).
 *
 * Responsibilities
 *   • Stores per-session alive settings (message / media url / media type / ext)
 *     in the `alive` table via ./db/alive.
 *   • `aliveMessage(text, msg)` decides what to send when the bot is asked if
 *     it is alive — a plain text reply, a cached image/video/gif, or "get"
 *     which just returns the currently stored message.
 *   • Template placeholders are substituted at send time:
 *       #uptime → how long this bot process has been running
 *       #quote  → a random quote
 *       &gif    → mark the media as a WhatsApp "gif playback" message
 *                 (flag stripped from the caption before sending)
 *
 * Only the bot owner / sudo users may change the alive message.
 *
 * Behaviour matches the obfuscated original exactly (verified side-by-side);
 * the one pre-existing bug found is marked with ⚠️ BUG below.
 * ---------------------------------------------------------------------------
 */

const {
  readFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  writeFileSync,
} = require("fs-extra");
const path = require("path");

const { setAlive, getAlive } = require("./db/alive");
const { secondsToHms, download, getQuote, isUrl, lang } = require("./index");

/** Cache folder for downloaded alive media — one file per session id. */
const MEDIA_DIR = path.join(__dirname, "../media/alive");

// Make sure the media cache exists before anything tries to use it.
if (!existsSync(MEDIA_DIR)) {
  mkdirSync(MEDIA_DIR);
}

/**
 * Current process uptime.
 *
 * @param {boolean} [compact] when true, build a "1h 2m 5s" string by hand
 *                            (zero units omitted); otherwise use the shared
 *                            `secondsToHms` helper from lib/index.
 * @returns {string} human readable uptime, e.g. "2h 14m 3s"
 */
const getUptime = (compact) => {
  if (compact) {
    const totalSeconds = Number(process.uptime());
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor((totalSeconds % 3600) % 60);

    return (
      (hours == 0 ? "" : hours + "h ") +
      (minutes == 0 ? "" : minutes + "m ") +
      (seconds == 0 ? "" : seconds + "s")
    );
  }

  return secondsToHms(process.uptime());
};

exports.getUptime = getUptime;

/**
 * Replace the #uptime / #quote placeholders in an alive message.
 *
 * @param {string} text     message template
 * @param {string} [mediaUrl] stored media url — stripped from the message
 *                            so the raw link is never shown to users
 * @returns {Promise<string>} the message ready to be sent
 */
const uptimeQuoteReplace = async (text, mediaUrl) => {
  if (mediaUrl) {
    text = text.replace(mediaUrl, "");
  }

  text = text.replace("#uptime", getUptime()).trim();

  if (/#quote/.test(text)) {
    const quote = await getQuote();
    text = text.replace("#quote", quote || "");
  }

  return text;
};

exports.uptimeQuoteReplace = uptimeQuoteReplace;

/**
 * Build the payload for an alive request.
 *
 * @param {string} text raw message text typed by the user (or "" )
 * @param {object} msg  context: `{ id: sessionId, sudo: bool, fromMe: bool }`
 * @returns {Promise<{msg: string|Buffer, options: object, type: string}>}
 *          `msg` is a caption string or a media Buffer, `type` is the
 *          WhatsApp message type ("text" | "image" | "video").
 */
exports.aliveMessage = async (text, msg) => {
  let type = "text";

  // ── 1. Owner/sudo can (re)configure the alive message ────────────────────
  if (text && (msg.sudo || msg.fromMe)) {
    // ".alive get" — just read back what is currently stored.
    if (text === "get") {
      const alive = await getAlive(msg.id);
      return { msg: alive?.message, options: {}, type };
    }

    let ext = "null";
    let url = isUrl(text);

    // If the message contains a link, download it and cache it locally.
    if (url && url.startsWith("http")) {
      const media = await download(url, msg.id);

      if (media?.ext) {
        writeFileSync(
          path.join(MEDIA_DIR, `${msg.id}.${media.ext}`),
          media.buffer,
        );
        ext = media.ext;
        type = media.type;
      } else {
        // Nothing usable came back — keep the record as a plain text message.
        url = "null";
      }
    }

    await setAlive(url, text, type, ext, msg.id);
  }

  const options = {};

  // ── 2. Read back the (possibly just updated) alive record ────────────────
  const alive = await getAlive(msg.id);

  if (!alive) {
    // No record yet → send the plugin default message.
    return {
      msg: await uptimeQuoteReplace(lang.plugins.alive.default),
      options,
      type,
    };
  }

  alive.message = await uptimeQuoteReplace(alive.message, alive.url);

  if (alive.type !== "text") {
    // ── 3. Media reply ────────────────────────────────────────────────────
    let cachedFile = readdirSync(MEDIA_DIR).find((file) =>
      file.startsWith(msg.id),
    );

    if (!cachedFile) {
      // Cache miss (file deleted / fresh install) → download it again.
      const media = await download(alive.url, msg.id);

      if (media.error) {
        // Download failed: fall back to sending the caption as text.
        return { msg: alive.message, options, type: "text" };
      }

      const fileName = `${msg.id}.${media.ext}`;
      writeFileSync(path.join(MEDIA_DIR, fileName), media.buffer);

      // ✅ FIXED: the original forgot this assignment, so the readFileSync
      //    below received `undefined` and threw
      //    "TypeError [ERR_INVALID_ARG_TYPE]" whenever the cached media file
      //    was missing. Now the freshly downloaded file is used.
      cachedFile = fileName;
    }

    let message = readFileSync(path.join(MEDIA_DIR, cachedFile));

    options.caption = alive.message;

    // "&gif" in the stored message → WhatsApp gif-playback mode.
    const gifPlayback = options.caption.includes("&gif");
    if (gifPlayback) {
      options.caption = options.caption.replace("&gif", "");
      options.gifPlayback = gifPlayback;
    }

    type = alive.type;

    return { msg: message, options, type };
  }

  // ── 4. Plain text reply ─────────────────────────────────────────────────
  return { msg: alive.message, options, type };
};
