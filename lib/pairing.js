/**
 * pairing.js — log in with a phone number (pairing code) instead of scanning a QR.
 *
 * How it works
 *   When a session has no valid credentials, Baileys emits a `qr` event. If a
 *   pairing number is configured (or typed on an interactive console) we ask the
 *   socket for a pairing code instead of printing the QR:
 *
 *       const sock = makeWASocket({ auth, printQRInTerminal: false })
 *       sock.ev.on("connection.update", ({ qr }) => {
 *         if (qr) sock.requestPairingCode("2547xxxxxxxx")   // digits only, no "+"
 *       })
 *
 *   WhatsApp then shows "Link a device" on the phone: enter the code there.
 *
 * Notes
 *   - The number must be digits only, with the country code, e.g. 2547xxxxxxxx.
 *   - `requestPairingCode` only makes sense for an unregistered session (one with
 *     no creds). A saved session never emits `qr`, so nothing is requested.
 *   - Older/other Baileys builds may not expose `requestPairingCode`; the caller
 *     gets `false` back and the QR is shown instead.
 *   - The interactive prompt needs a real terminal (stdin TTY). Under pm2 / a
 *     panel there is no stdin, so set PAIRING_NUMBER in the env instead.
 */

/** WhatsApp wants plain digits: fail closed on junk like "+254 712-345-678". */
const normalizeNumber = (raw) => String(raw || "").replace(/[^0-9]/g, "");

/** "ABCDEFGH" -> "ABCD-EFGH" (WhatsApp prints the code in blocks of four). */
const formatCode = (code) => {
  if (!code) return code;
  const groups = String(code).match(/.{1,4}/g);
  return groups ? groups.join("-") : String(code);
};

/** Ask for the number on an interactive console; "" when stdin is not a TTY. */
const askForNumber = async () => {
  if (!process.stdin.isTTY) return "";
  const readline = require("readline");
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    const answer = await new Promise((resolve) =>
      rl.question("Your WhatsApp phone number with country code (e.g. 2547xxxxxxxx): ", resolve),
    );
    return normalizeNumber(answer);
  } finally {
    rl.close();
  }
};

/** Local sleep so this module does not depend on Baileys just to wait. */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Ask the socket for a pairing code and print instructions for the user.
 *
 * @param {object}  sock            the Baileys socket
 * @param {string}  number          digits only, with country code
 * @param {object}  log             logger (info/warn/error), optional
 * @param {string}  sessionName     shown as a prefix, optional
 * @param {number}  waitMs          grace period before requesting (default 3000)
 * @returns {Promise<boolean>}      true when the user was given a code
 */
const requestPairingCode = async (sock, number, log, sessionName = "", waitMs = 3000) => {
  const tag = sessionName ? "[" + sessionName + "] " : "";
  const digits = normalizeNumber(number);

  if (digits.length < 7) {
    log?.warn?.(tag + "Pairing code skipped: no valid phone number (need digits only, with country code).");
    return false;
  }
  if (!sock || typeof sock.requestPairingCode !== "function") {
    log?.warn?.(tag + "Pairing code skipped: this Baileys build has no requestPairingCode().");
    return false;
  }

  if (waitMs > 0) {
    log?.info?.(tag + "Waiting " + Math.round(waitMs / 1000) + "s for the socket to stabilise...");
    await sleep(waitMs);
  }

  try {
    const raw = await sock.requestPairingCode(digits);
    const code = formatCode(raw);
    log?.info?.(
      "\n" +
        tag +
        "🔑 Pairing code: " +
        code +
        "\n" +
        tag +
        "1. Open WhatsApp → Settings → Linked devices\n" +
        tag +
        '2. Tap "Link a device"\n' +
        tag +
        "3. Enter the code above (it expires in a few minutes)\n",
    );
    return true;
  } catch (error) {
    log?.error?.(tag + "Failed to get a pairing code: " + (error && error.message ? error.message : error));
    return false;
  }
};

module.exports = {
  normalizeNumber,
  formatCode,
  askForNumber,
  requestPairingCode,
};
