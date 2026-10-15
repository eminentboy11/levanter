// Client.js — deobfuscated rewrite.
// Control flow, public method names (hb, bloc, _handleX, botState keys) and
// behaviour are kept so other modules keep working. Opaque predicates such as
// `if ("abc" !== "abc")` were resolved, and the self-defending / console-wrapping
// junk at the top of the original was removed.

String.prototype.format = function (...args) {
  return this.replace(/{(\d+)}/g, (match, i) => (args[i] !== undefined ? args[i] : match));
};
const { loadBaileys } = require("./baileys");
const { default: axios } = require("axios");
const cron = require("cron");
const config = require("./config");
const prettyPino = require("pino-pretty");
const { Boom } = require("@hapi/boom");
const { NodeCache } = require("@cacheable/node-cache");
const core = require("./index");
const settings = require("../config");
const { stopInstance } = require("./pm2");
const auth = require("./auth");
const { requestPairingCode, askForNumber, normalizeNumber } = require("./pairing");
const simpleGit = require("simple-git");
const { writeStream, chats } = require("./constant");
const pino = require("pino");
const util = require("util");
const { getCmdState } = require("./db/cmd");
const {
  readdirSync,
  existsSync,
  writeFileSync,
  readFileSync,
  unlinkSync,
  mkdir,
  emptyDir,
  ensureDirSync,
  emptyDirSync,
} = require("fs-extra");
const path = require("path");
const net = require("net");
const { getGAuth, setGAuth } = require("./db/");
const { TEMP_DIR } = require("./index");
const { getConfig, setConfig, getDb } = require("./db/store");
const pdm = require("./db/pdm");
const utils = require("./utils");
const { getSubscription, delSubscription } = require("./db/antilink");
const { groupMuteTask, scheduleMessageTask, scheduleMessageStatusTask } = require("./mute");
const handle = require("./handle");
const { participantUpdate } = require("./participantUpdate");
const { prepareMessage } = require("./sendMessage");
require("./store");

// Baileys bindings, filled in by Session.connect()
let makeWASocket,
  DisconnectReason,
  delay,
  jidNormalizedUser,
  getBinaryNodeChildren,
  makeCacheableSignalKeyStore,
  getContentType,
  isJidBroadcast,
  generateWAMessageFromContent,
  proto,
  isJidUser;
const MESSAGES_UPSERT = "messages.upsert";
const GROUP_NOTIFICATION = "CB:notification,type:w:gp2";
const EPHEMERAL_1_DAY = 86400;
const SITE_URL = "https://levanter.site/";
const PLUGIN_API = "https://levanter-plugin.levanter.site";
const GIST_HOST = "https://gist.githubusercontent.com";
const PDF_DIR = path.join(__dirname, "../pdf");
const EXTERNAL_PLUGINS_DIR = path.join(__dirname, "../eplugins");
ensureDirSync(TEMP_DIR);
emptyDirSync(TEMP_DIR);
if (!existsSync(EXTERNAL_PLUGINS_DIR)) mkdir(EXTERNAL_PLUGINS_DIR);
if (existsSync(PDF_DIR)) emptyDir(PDF_DIR);
else mkdir(PDF_DIR);
exports.logger = core.logger;
const debugOn = () => process.env.DEBUG_RESTART === "true";

/**
 * Turn a Baileys disconnect into ONE short line.
 *
 * A dropped socket hands us a Boom object holding `err`, `data` and `output`
 * (statusCode 515 "Stream Errored (restart required)", 428, 401, ...). Logging it
 * raw prints a wall of stack trace + JSON for something that is routine and
 * self-healing, so the console is reduced to e.g.
 *   [0] stream error 515 (restart required) - reconnecting
 * The full object is still printed when DEBUG_RESTART=true.
 */
const DISCONNECT_CODES = {
  401: "logged out (401) - the session has to be linked again",
  402: "temporarily banned by WhatsApp (402)",
  403: "forbidden (403)",
  405: "method not allowed (405)",
  406: "account restricted (406)",
  408: "timed out waiting for the QR scan (408)",
  411: "multi-device mismatch (411)",
  428: "connection closed (428)",
  429: "rate limited by WhatsApp (429)",
  440: "session replaced by a newer login (440)",
  500: "bad session (500) - credentials may be corrupt",
  503: "WhatsApp service unavailable (503)",
  515: "stream error (515) - restart required",
  555: "connection attempt failed (555)",
  556: "session force terminated (556)",
};
// codes the bot handles by simply reconnecting: report as info, not as an error
const TRANSIENT_CODES = [408, 411, 428, 429, 500, 503, 515, 555];

const disconnectCode = (error) =>
  error && error.output && typeof error.output.statusCode === "number"
    ? error.output.statusCode
    : error && typeof error.statusCode === "number"
      ? error.statusCode
      : undefined;

/** true when the failure is expected and the reconnect logic deals with it */
const isTransientDisconnect = (error) => TRANSIENT_CODES.includes(disconnectCode(error));

/** one-line, no stack, no JSON, no newlines */
const describeDisconnect = (error) => {
  if (!error) return "connection closed";
  const code = disconnectCode(error);
  const payload = (error.output && error.output.payload) || {};
  const known = code !== undefined && DISCONNECT_CODES[code];
  const raw = payload.message || error.message || String(error);
  const detail = String(raw).split("\n")[0].replace(/\s+/g, " ").trim().slice(0, 90);
  if (!known) return detail || "connection lost";
  // the library's own wording is only appended when it adds something
  const adds = detail && !known.toLowerCase().includes(detail.toLowerCase().slice(0, 12));
  return known + (adds ? " (" + detail + ")" : "");
};
const stripPlus = (s) => s.replace(/\+/g, "");
const stripDeviceSuffix = (jid) => (jid ? jid.replace(/:\d+/, "") : undefined);
const tick = (v) => (v ? "✅" : "❎");
const randomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
// undefined/"off" -> "false", "on" -> "true", anything else unchanged
const normalizeEnv = (v) => (v === undefined || v === "off" ? "false" : v === "on" ? "true" : v);

// `shift` is an implicit global in the original; other modules may read it.
const exposeFlag = (botState) => {
  try {
    globalThis.shift = botState.E;
  } catch {}
};

// If `jid` is the bot's own PN, return the bot's own LID.
const ownLidFor = (sock, jid) => {
  if (!jid || typeof jidNormalizedUser !== "function") return null;
  const user = sock?.session?.user;
  if (!user?.id || !user?.lid) return null;
  let pn, lid, target;
  try {
    pn = jidNormalizedUser(user.id);
    lid = jidNormalizedUser(user.lid);
    target = jidNormalizedUser(jid);
  } catch {
    return null;
  }
  if (pn && lid && target === pn) {
    if (sock.lipMap && typeof sock.lipMap.set === "function") sock.lipMap.set(pn, lid);
    return lid;
  }
  return null;
};

// If `jid` is the bot's own LID, return the bot's own PN.
const ownPnFor = (sock, jid) => {
  if (!jid || typeof jidNormalizedUser !== "function") return null;
  const user = sock?.session?.user;
  if (!user?.id || !user?.lid) return null;
  let pn, lid, target;
  try {
    pn = jidNormalizedUser(user.id);
    lid = jidNormalizedUser(user.lid);
    target = jidNormalizedUser(jid);
  } catch {
    return null;
  }
  if (pn && lid && target === lid) {
    if (sock.lipMap && typeof sock.lipMap.set === "function") sock.lipMap.set(lid, pn);
    return pn;
  }
  return null;
};
const statusSummary = (env, sessionId) => {
  const viewMode =
    ["only-view", "no-dl", "expect-view"].find((m) => env.AUTO_STATUS_VIEW.includes(m)) || "all";
  const l = core.lang.extra.labels;
  const antiDeleteOff = env.ANTI_DELETE === "false" || env.ANTI_DELETE === "null";
  return (
    l.sudo +
    "      : " +
    (config[sessionId].SUDO_MAP.length === 0 ? "0" : config[sessionId].SUDO_MAP.join(", ")) +
    "\n" +
    l.auto_read +
    "    : " +
    tick(env.SEND_READ === "true") +
    "\n" +
    l.auto_status +
    " : " +
    (env.AUTO_STATUS_VIEW !== "false" ? tick(true) + " (" + viewMode + ")" : tick(false)) +
    "\n" +
    l.auto_reject +
    " : " +
    tick(env.REJECT_CALL === "true") +
    "\n" +
    l.always_online +
    "    : " +
    tick(env.ALWAYS_ONLINE === "true") +
    "\n" +
    l.anti_delete +
    "  : " +
    (antiDeleteOff ? tick(false) : tick(true) + " (" + env.ANTI_DELETE + ")") +
    "\n" +
    l.auto_update +
    "  : " +
    tick(env.AUTO_UPDATE !== "false") +
    "\n\n\nTelegram : https://t.me/+TYpRg-AoN4gzNzNl\n\nChannel : https://whatsapp.com/channel/0029Va92msU59PwYuplVMH2L\n\nPlugins : https://levanter.site/\n\nFAQ : https://levanter.site/"
  );
};
const getMessage = async (key) => {
  try {
    const id = "" + key.remoteJid + key.id;
    const cached = chats.get(id);
    if (cached) return cached.message;
    const stored = await pdm.getTMessage(key.id);
    if (stored) return stored.message;
  } catch {}
};
const logger = pino.default(
  {
    level: settings.BAILEYS_LOG_LVL,
  },
  prettyPino({
    colorize: true,
    levelFirst: true,
    translateTime: "SYS:yy-mm-dd HH:MM:ss",
    ignore: "pid,hostname",
  }),
);
if (
  core.PLATFORM === "koyeb" ||
  core.PLATFORM === "render" ||
  process.env.PORT ||
  settings.API_ENABLED
) {
  if (!config.server) {
    require("./bing");
    if (settings.API_ENABLED) {
      require("./api").subscribe(core.levanter);
      core.logger.info(
        "API enabled (mode: " +
          settings.MODE +
          ") — /api routes on port " +
          (process.env.PORT || 3000),
      );
    }
  }
}

// Queue task types: timeout (ms) and handler (method name or function(session, task, signal))
const TASKS = {
  mute: {
    timeout: 30000,
    handler: "_handleMute",
  },
  unmute: {
    timeout: 30000,
    handler: "_handleUnmute",
  },
  presence: {
    timeout: 15000,
    handler: "_handlePresence",
  },
  relay: {
    timeout: 30000,
    handler: "_handleRelay",
  },
  send_message: {
    timeout: 60000,
    handler: "_handleSendMessage",
  },
  forward: {
    timeout: 30000,
    handler: "_handleForward",
  },
  end: {
    timeout: 10000,
    handler: "_handleEnd",
  },
  read: {
    timeout: 15000,
    handler: "_handleRead",
  },
  call: {
    timeout: 15000,
    handler: "_handleCall",
  },
  prepare_message: {
    timeout: 60000,
    handler: "_handlePrepareMessage",
  },
  participant_remove: {
    timeout: 30000,
    handler: (s, t) => s._handleParticipantUpdate(t, "remove"),
  },
  participant_promote: {
    timeout: 30000,
    handler: (s, t) => s._handleParticipantUpdate(t, "promote"),
  },
  participant_demote: {
    timeout: 30000,
    handler: (s, t) => s._handleParticipantUpdate(t, "demote"),
  },
};

// Task types that need a `chat` to be actionable
const CHAT_REQUIRED = [
  "mute",
  "unmute",
  "relay",
  "send_message",
  "participant_remove",
  "participant_promote",
  "participant_demote",
  "forward",
  "read",
  "call",
  "prepare_message",
];
const RETRYABLE = [403, 408, 428, 429, 500, 502, 503, 504, "ETIMEDOUT", "ECONNRESET"];
const DELETE_RETRYABLE = [
  403,
  500,
  503,
  "ETIMEDOUT",
  "ECONNRESET",
  "ENOTFOUND",
  "ERR_STREAM_PREMATURE_CLOSE",
];
class Session {
  html = "<p></p>";
  constructor(id) {
    if (id === undefined) throw new Error("missing id");
    this.tid = null;
    this.session = null;
    this.activeIntervals = new Set();
    this.activeTimeouts = new Set();
    this.metrics = {
      totalProcessed: 0,
      totalFailed: 0,
    };
    const reachoutLock = {
      active: false,
      until: 0,
      type: "",
    };
    this.priorityQueue = require("fastq").promise(async (task) => {
      await core.sleep(task.delay ? task.delay : 50);
      task._retryCount ||= 0;
      task._trace ||= [];
      const traceId = Math.random().toString(36).substring(7);
      task._trace.push({
        step: "worker_start",
        time: Date.now(),
        id: traceId,
      });
      if (!this.botState.connected) {
        if (task._retryCount >= 3) {
          core.logger.error("[Queue] Task dropped (max retries): " + task.type);
          return;
        }
        this.queue.pause();
        task._retryCount++;
        this.queue.unshift(task);
        return;
      }
      const m = task.message;
      const hasMedia = m && (m.image || m.audio || m.video || m.document || m.sticker);
      // NOTE: the original fell back to the *string* "prepare_message" here (so .timeout was undefined).
      const cfg = TASKS[task.type] || TASKS.prepare_message;
      const timeout =
        ["send_message", "prepare_message"].includes(task.type) && hasMedia ? 600000 : cfg.timeout;
      if (CHAT_REQUIRED.includes(task.type) && !task.chat) {
        core.logger.warn("[Queue] Task Dropped: " + task.type + " - missing chat/jid");
        return;
      }
      try {
        const startedAt = Date.now();
        if (debugOn()) {
          core.logger.info(
            "[Queue] Task Start: " +
              task.type +
              " - chat: " +
              task.chat +
              " - pending: " +
              this.queue.length(),
          );
        }
        const result = await this.withTimeout(
          async (signal) => {
            const h = cfg.handler;
            if (typeof h === "function") return await h(this, task, signal);
            if (typeof h === "string" && this[h]) return await this[h](task, signal);
            throw new Error("No handler for " + task.type);
          },
          timeout,
          "Queue task (" + task.type + ")",
        );
        this.metrics.consecutiveTimeouts = 0;
        this.metrics.totalProcessed++;
        if (debugOn()) {
          core.logger.info(
            "[Queue] Task Success: " + task.type + " (" + (Date.now() - startedAt) + "ms)",
          );
        }
        return result;
      } catch (err) {
        this.metrics.totalFailed++;
        const msg = err?.message || String(err);
        const timedOut = msg.includes("timed out") || msg.includes("sendRetryRequest");
        if (
          (RETRYABLE.some((c) => String(msg).includes(String(c))) || timedOut) &&
          task._retryCount < 3
        ) {
          task._retryCount++;
          const wait = Math.min(1000 * Math.pow(2, task._retryCount), 30000);
          core.logger.warn(
            "[Queue] [" +
              traceId +
              "] Retry " +
              task._retryCount +
              "/3: " +
              task.type +
              " (" +
              msg +
              ") - pending: " +
              this.queue.length(),
          );
          this.setTimeout(() => this.queue.push(task), wait);
          return;
        }
        core.logger.error(
          {
            trace: task._trace,
            error: msg,
          },
          "[Queue] [" + traceId + "] Permanent Failure: " + task.type,
        );
        throw err;
      }
    }, 3);
    this.deleteQueue = require("fastq").promise(async (task) => {
      if (task.delay) await core.sleep(task.delay);
      task._retryCount ||= 0;
      if (!this.botState.connected) {
        if (task._retryCount >= 3) {
          core.logger.error("[DeleteQueue] Task dropped after 3 retries", {
            chat: task.chat,
            key: task.key ? JSON.stringify(task.key) : null,
            retries: task._retryCount,
            reason: "disconnected",
          });
          return;
        }
        this.deleteQueue.pause();
        task._retryCount++;
        this.deleteQueue.unshift(task);
        return core.logger.warn("[DeleteQueue] Requeued (" + task._retryCount + "/3)");
      }
      try {
        const chat = this.lipMap.has(task.chat) ? this.lipMap.get(task.chat) : task.chat;
        const content = {
          delete: task.key,
        };
        return await this.withTimeout(
          async (signal) =>
            await prepareMessage(
              chat,
              content,
              {
                ...task.options,
                signal,
              },
              this.session,
            ),
          60000,
          "Delete task (" + chat + ")",
        );
      } catch (err) {
        const code = err?.output?.statusCode || err?.code || err?.status;
        const msg = err?.message || String(err);
        if (
          (DELETE_RETRYABLE.includes(code) ||
            DELETE_RETRYABLE.some((c) => msg.includes(String(c)))) &&
          task._retryCount < 3
        ) {
          task._retryCount++;
          const wait = Math.min(1000 * Math.pow(2, task._retryCount), 30000);
          core.logger.warn(
            "[DeleteQueue] Retrying after " + wait + "ms (" + task._retryCount + "/3): " + msg,
          );
          this.setTimeout(() => this.deleteQueue.push(task), wait);
          return;
        }
        core.logger.error({
          msg: "[DeleteQueue] Task failed permanently",
          chat: task.chat,
          key: task.key ? JSON.stringify(task.key) : null,
          retries: task._retryCount,
          error: msg,
          errorCode: code,
          stack: err?.stack?.split("\n").slice(0, 3).join(" | ") || null,
        });
      }
    }, 1);
    this.queue = this.priorityQueue;
    this.lipMap = new NodeCache({
      stdTTL: 600,
      useClones: false,
      checkperiod: 60,
    });
    this.presenceInterval = null;
    this.eventHandlers = {};
    this.botState = {
      id,
      bot: "0",
      isFirst: true,
      reason: "",
      isDB: false,
      D: {
        count: 0,
      },
      plugins: [],
      E: false,
      bbb: [],
      isNew: false,
      reconnect: 0,
      connected: false,
      closed: false,
      pnr: false,
      logs: false,
      reachoutLock,
      establishedChats: new Set(),
      onWaChecked: new Map(),
      msgRetryCounterCache: new NodeCache({
        stdTTL: 300,
        useClones: false,
        checkperiod: 30,
      }),
      vh: false,
      updates: 0,
      stop: false,
    };
    writeStream(config[id], "temp", {
      value: {},
    });
    config[id].AFK = {
      isAfk: false,
      reason: false,
      lastseen: 0,
      p: "",
    };
    config[id].db = {
      cmd: {},
      game: {
        room: {},
        state: false,
      },
    };
    config[id].greets = {
      welfiles: [],
      goodfiles: [],
      banfiles: [],
    };
    config[id].temp.spam = {
      cool: 7,
    };
    config[id].commands = [];
    config[id].contacts = [];
    config[id].cammands = {};
    config[id].pammands = {};
    config[id].groupMetadata = {};
    config[id].queue = this.queue;

    // Resolve a PN to a LID (optionally on another session)
    config.getLid = async (jid, sessionId) => {
      if (sessionId) return config[sessionId].findLid(jid);
      if (!jid) return;
      if (!jid.includes("@") && !isNaN(jid) && !(jid = core.numToJid(jid))) return;
      if (jid.endsWith("@lid")) return jid;
      const own = ownLidFor(this, jid);
      if (own) return own;
      if (this.lipMap.has(jid)) return this.lipMap.get(jid);
      if (this.session?.signalRepository?.lidMapping) {
        try {
          const lid = await this.session.signalRepository.lidMapping.getLIDForPN(jid);
          if (lid) {
            this.lipMap.set(jid, lid);
            return lid;
          }
        } catch (e) {
          if (debugOn())
            core.logger.error("[" + this.session_name + "] findLid error for " + jid + ":", e);
        }
      } else if (debugOn()) {
        core.logger.warn(
          "[" + this.session_name + "] findLid: session or lidMapping unavailable for " + jid,
        );
      }
    };
    config[id].findLid = async (jid) => {
      if (!jid) return;
      if (!jid.includes("@") && !isNaN(jid) && !(jid = core.numToJid(jid))) return;
      if (jid.endsWith("@lid")) return jid;
      const own = ownLidFor(this, jid);
      if (own) return own;
      if (this.lipMap.has(jid)) return this.lipMap.get(jid);
      if (this.session?.signalRepository?.lidMapping) {
        try {
          const lid = await this.withTimeout(
            async () => await this.session.signalRepository.lidMapping.getLIDForPN(jid),
            5000,
            "getLIDForPN(" + jid + ")",
          );
          if (lid) {
            const normalized = jidNormalizedUser(lid);
            this.lipMap.set(jid, normalized);
            return normalized;
          }
          return;
        } catch (e) {
          if (debugOn())
            core.logger.warn(
              "[" + this.session_name + "] findLid error for " + jid + ": " + e.message,
            );
          return;
        }
      } else if (debugOn()) {
        core.logger.warn(
          "[" + this.session_name + "] findLid: session or lidMapping unavailable for " + jid,
        );
      }
    };
    config[id].findJid = async (jid) => {
      if (!jid) return;
      if (jid.endsWith("@s.whatsapp.net")) return jid;
      const own = ownPnFor(this, jid);
      if (own) return own;
      if (this.lipMap.has(jid)) return this.lipMap.get(jid);
      if (this.session?.signalRepository?.lidMapping) {
        try {
          const pn = await this.withTimeout(
            async () => await this.session.signalRepository.lidMapping.getPNForLID(jid),
            5000,
            "getPNForLID(" + jid + ")",
          );
          if (pn) {
            const normalized = jidNormalizedUser(pn);
            this.lipMap.set(jid, normalized);
            return normalized;
          }
          return;
        } catch (e) {
          if (debugOn())
            core.logger.warn(
              "[" + this.session_name + "] findJid error for " + jid + ": " + e.message,
            );
          return;
        }
      } else if (debugOn()) {
        core.logger.warn(
          "[" + this.session_name + "] findJid: session or lidMapping unavailable for " + jid,
        );
      }
    };
    config[id].fetchGroupMetadata = async (jid, force = false, trace) => {
      if (!jid || !jid.endsWith("@g.us")) return null;
      const sid = this.botState.id;
      const cached = config[sid].groupMetadata[jid];
      if (!force && cached && cached.participants) return cached;
      try {
        if (trace)
          trace.push({
            step: "fetch_meta_start",
            time: Date.now(),
            jid,
          });
        const metadata = await this.withTimeout(
          async () => await this.session.groupMetadata(jid),
          30000,
          "groupMetadata(" + jid + ")",
        );
        if (metadata && metadata.participants) {
          if (trace)
            trace.push({
              step: "fetch_meta_success",
              time: Date.now(),
              jid,
            });
          config[sid].groupMetadata[jid] = metadata;
          return metadata;
        }
      } catch (e) {
        if (debugOn())
          core.logger.error("[fetchGroupMetadata] Failed for " + jid + ": " + e.message);
      }
      return cached || null;
    };
    config[id].pluginsCount = {
      i: 0,
      e: 0,
      count: 0,
    };
  }

  // Runs fn(signal) with an abort-on-timeout guard.
  async withTimeout(fn, ms, label) {
    const controller = new AbortController();
    const { signal } = controller;
    const timeout = new Promise((_, reject) => {
      const t = this.setTimeout(() => {
        controller.abort();
        reject(new Error(label + " timed out after " + ms + "ms"));
      }, ms);
      signal.addEventListener("abort", () => clearTimeout(t), {
        once: true,
      });
      this._lastTimeoutId = t;
    });
    try {
      return await Promise.race([fn(signal), timeout]);
    } finally {
      controller.abort();
    }
  }
  async resolveQueueJid(jid) {
    if (!jid) return null;
    if (core.isGroup(jid) || jid.endsWith("lid")) return jid;
    if (jid.endsWith("s.whatsapp.net") && this.lipMap.has(jid)) return this.lipMap.get(jid);
    return (
      (typeof jid === "string" &&
        jid.endsWith("@s.whatsapp.net") &&
        (await config[this.botState.id].findLid(jid))) ||
      jid
    );
  }
  async _handleMute(task) {
    return await this.session.groupSettingUpdate(task.chat, "announcement");
  }
  async _handleUnmute(task) {
    return await this.session.groupSettingUpdate(task.chat, "not_announcement");
  }
  async _handlePresence(task) {
    return await this.session.sendPresenceUpdate(task.presence);
  }

  // ---- reach-out time-lock (WhatsApp 463 guard) ----

  _setReachoutLock(info) {
    if (!info) return;
    const until = info.time_enforcement_ends
      ? Number(info.time_enforcement_ends)
      : info.is_active
        ? Math.floor(Date.now() / 1000) + 60
        : 0;
    const active = !!info.is_active && until * 1000 > Date.now();
    const prev = this.botState.reachoutLock;
    const changed = !prev || prev.active !== active || prev.until !== until;
    this.botState.reachoutLock = {
      active,
      until,
      type: info.enforcement_type || "",
    };
    if (changed) {
      setGAuth(
        "reachout_timelock",
        {
          active,
          until,
          type: this.botState.reachoutLock.type,
        },
        this.botState.id,
      ).catch(() => {});
      if (active) {
        const iso = new Date(1000 * until).toISOString();
        core.logger.warn(
          "[" +
            this.session_name +
            "] reach-out time-lock ACTIVE (" +
            this.botState.reachoutLock.type +
            ") until " +
            iso +
            " — new-chat messages/calls to unknown people may be rejected (463)",
        );
      } else {
        core.logger.info("[" + this.session_name + "] reach-out time-lock cleared");
      }
    }
  }
  isReachoutLocked() {
    const lock = this.botState.reachoutLock;
    return !!lock?.active && 1000 * lock.until > Date.now();
  }
  async _loadReachoutLock() {
    try {
      const saved = await getGAuth("reachout_timelock", this.botState.id);
      const until = Number(saved?.until) || 0;
      if (saved?.active && 1000 * until > Date.now()) {
        this.botState.reachoutLock = {
          active: true,
          until,
          type: saved.type || "",
        };
        core.logger.info(
          "[" +
            this.session_name +
            "] restored reach-out time-lock until " +
            new Date(1000 * until).toISOString(),
        );
      }
    } catch {}
  }
  _markEstablished(jid) {
    if (!jid) return;
    const normalized = jidNormalizedUser(jid) || jid;
    if (!normalized.endsWith("@s.whatsapp.net") && !normalized.endsWith("@lid")) return;
    this.botState.establishedChats.add(normalized);
    const mapped = this.lipMap?.get(normalized);
    if (mapped) this.botState.establishedChats.add(jidNormalizedUser(mapped) || mapped);
  }
  _isEstablishedUser(jid) {
    if (!jid || (!jid.endsWith("@s.whatsapp.net") && !jid.endsWith("@lid"))) return false;
    const normalized = jidNormalizedUser(jid) || jid;
    if (this.botState.establishedChats.has(normalized)) return true;
    const mapped = this.lipMap?.get(normalized);
    return !!mapped && !!this.botState.establishedChats.has(jidNormalizedUser(mapped) || mapped);
  }
  _isReachOutTarget(jid) {
    return (
      !!jid &&
      (jid.endsWith("@s.whatsapp.net") || jid.endsWith("@lid")) &&
      !this._isEstablishedUser(jid)
    );
  }
  _coldPnNumber(chat) {
    if (!chat || typeof chat != "string") return null;
    const jid = chat.includes("@") ? chat : isNaN(chat) ? null : core.numToJid(chat);
    if (jid && jid.endsWith("@s.whatsapp.net")) {
      return this._isEstablishedUser(jid) ? null : core.jidToNum(jid);
    }
    return null;
  }
  async _resolveSendJid(task, label) {
    const jid = await this.resolveQueueJid(task.chat);
    if (!jid) {
      core.logger.warn("[Queue] " + label + " - jid resolved to null");
      return null;
    }
    if (
      this.isReachoutLocked() &&
      this._isReachOutTarget(jid) &&
      !this._isEstablishedUser(task.chat)
    ) {
      core.logger.warn(
        "[" +
          this.session_name +
          "] reach-out-locked: BLOCKED cold " +
          label +
          " to " +
          jid +
          " (no established chat) — would risk 463",
      );
      return null;
    }
    const coldNumber = this._coldPnNumber(task.chat);
    if (coldNumber) {
      let onWa = this.botState.onWaChecked.get(coldNumber);
      if (onWa === undefined) {
        try {
          const [res] = await this.session.onWhatsApp(coldNumber);
          onWa = !!res && !!res.exists;
          this.botState.onWaChecked.set(coldNumber, onWa);
        } catch {
          onWa = true;
        }
      }
      if (!onWa) {
        core.logger.warn(
          "[" +
            this.session_name +
            "] " +
            label +
            " to " +
            coldNumber +
            " DROPPED — number not on WhatsApp (463 guard)",
        );
        return null;
      }
    }
    return jid;
  }
  async _handleRelay(task, signal) {
    const jid = await this._resolveSendJid(task, "relay");
    if (!jid) return;
    const res = await this.session.relayMessage(jid, task.message, {
      ...task.options,
      signal,
    });
    this._markEstablished(jid);
    return res;
  }
  async _handleSendMessage(task, signal) {
    const jid = await this._resolveSendJid(task, "send_message");
    if (!jid) return;
    const res = await this.session.sendMessage(jid, task.message, {
      ...task.options,
      signal,
    });
    this._markEstablished(jid);
    return res;
  }
  async _handleParticipantUpdate(task, action) {
    const participant = await this.resolveQueueJid(task.participant);
    return await this.session.groupParticipantsUpdate(task.chat, [participant], action);
  }
  async _handleForward(task, signal) {
    const jid = await this._resolveSendJid(task, "forward");
    if (!jid) return;
    const res = await utils.forwardOrBroadCast(
      jid,
      {
        message: task.message,
        client: this.session,
      },
      {
        ...task.options,
        signal,
      },
    );
    this._markEstablished(jid);
    return res;
  }
  async _handleEnd(task) {
    await this.session.end(task.message);
  }
  async _handleRead(task) {
    const chat = await this.resolveQueueJid(task.chat);
    let participant = await this.resolveQueueJid(task.participant);
    if (chat === "status@broadcast" && participant && !participant.endsWith("@s.whatsapp.net")) {
      participant = (await config[this.botState.id].findJid(participant)) || task.participant;
    }
    return await this.session.sendReceipt(chat, participant, task.ids, "read");
  }
  async _handleCall(task) {
    const chat = await this.resolveQueueJid(task.chat);
    if (chat) return await this.session.rejectCall(task.id, chat);
    return core.logger.warn("[Queue] call - jid resolved to null");
  }
  async _handlePrepareMessage(task, signal) {
    if (task._trace)
      task._trace.push({
        step: "handle_prepare_start",
        time: Date.now(),
      });
    const jid = await this._resolveSendJid(task, "prepare_message");
    if (task._trace)
      task._trace.push({
        step: "handle_prepare_jid_resolved",
        time: Date.now(),
        jid,
      });
    if (!jid) return;
    const res = await prepareMessage(
      jid,
      task.message,
      {
        ...task.options,
        signal,
        _trace: task._trace,
      },
      this.session,
    );
    this._markEstablished(jid);
    return res;
  }
  async init(updates) {
    const id = this.botState.id;
    this.session_name = config[id].env.SESSION_NAME || id;
    this.botState.updates = updates;
    await this._loadReachoutLock();
    if (config[id].env.FORCE_LOGOUT === "true") {
      core.logger.info("[" + (config[id].env.SESSION_NAME || id) + "] Deleting session..");
      await core.sleep(5000);
      await core.deleteCreds(id);
      await core.deleteKeys(id);
      core.logger.info("[" + (config[id].env.SESSION_NAME || id) + "] Session Deleted");
      await core.setVar(
        {
          FORCE_LOGOUT: "false",
        },
        id,
      );
      core.logger.info(
        "[" + (config[id].env.SESSION_NAME || id) + "] Changed FORCE_LOGOUT to false",
      );
      await core.sleep(5000);
    }

    // group mute / unmute
    this.eventHandlers.mute = async (e) => {
      if (!e.session)
        throw new Error("[" + (config[id].env.SESSION_NAME || id) + "] missing session");
      if (e.session != id) return;
      if (e.msg) {
        await this.queue.push({
          type: "prepare_message",
          chat: e.chat,
          message: {
            text: e.msg,
          },
        });
      }
      try {
        await this.queue.push({
          type: e.action === "announcement" ? "mute" : "unmute",
          chat: e.chat,
        });
      } catch (err) {
        if (err.message.includes("forbidden")) await core.delMute(e.chat, e.session);
        core.logger.error(err.message);
      }
    };
    core.levanter.on("mute", this.eventHandlers.mute);

    // rotating profile status
    this.eventHandlers.statusa = async (e) => {
      if (!e.session) throw new Error("[" + this.session_name + "] missing session");
      if (e.session != id) return;
      try {
        const text = await e.f();
        if (typeof text == "string") await this.session.updateProfileStatus(text);
      } catch {
        return;
      }
      const interval = setInterval(async () => {
        try {
          const text = await e.f();
          if (typeof text == "string") await this.session.updateProfileStatus(text);
        } catch {
          this.activeIntervals.delete(interval);
          clearInterval(interval);
        }
      }, e.t);
      this.activeIntervals.add(interval);
    };
    core.levanter.on("statusa", this.eventHandlers.statusa);

    // scheduled message
    this.eventHandlers.schedule = async (e) => {
      if (!e.session) throw new Error("missing session");
      if (e.session != id) return;
      const generated = generateWAMessageFromContent(e.chat, e.msg, {
        ephemeralExpiration: utils.expiration.get(e.chat),
      });
      if (!this.botState.connected) return;
      try {
        await this.queue.push({
          type: "relay",
          chat: e.chat,
          message: generated.message,
          options: {
            messageId: generated.key.id,
            additionalAttributes: {},
          },
        });
      } catch (err) {
        if (err.message.includes("forbidden")) await core.delScheduleMessage(e.chat, "", e.session);
        core.logger.error(err.message);
      }
    };
    core.levanter.on("schedule", this.eventHandlers.schedule);

    // scheduled status
    this.eventHandlers["status.schedule"] = async (e) => {
      if (!e.session) throw new Error("missing session");
      if (e.session != id) return;
      const statusJid = "status@broadcast";
      let recipients = [];
      const parsed = utils.parsedJid(e.jids);
      if (parsed.length > 0) {
        recipients = parsed.filter((j) => isJidUser(j));
      } else {
        recipients = (await core.listContacts(id)).map((c) => c.jid);
      }
      if (
        recipients.length === 0 ||
        (recipients.length === 1 && recipients.includes(this.session.user.jid))
      ) {
        throw new Error("not found contacts, please add contacts");
      }
      const content = proto.Message.decode(proto.Message.encode(e.msg).finish());
      const generated = generateWAMessageFromContent(statusJid, content, {
        userJid: this.session.user.id,
      });
      try {
        await this.queue.push({
          type: "relay",
          chat: statusJid,
          message: generated.message,
          options: {
            messageId: generated.key.id,
            additionalAttributes: {},
            statusJidList: [this.session.user.jid, ...recipients],
          },
        });
      } catch (err) {
        if (err.message.includes("forbidden")) await core.delScheduleStatus(e.time, e.session);
        core.logger.error(err.message);
      }
      return recipients.length;
    };
    core.levanter.on("status.schedule", this.eventHandlers["status.schedule"]);
    await scheduleMessageTask(id);
    await scheduleMessageStatusTask(id);
    await groupMuteTask(id);

    // Subscription expiry cron (hard-coded to one specific group — see notes)
    if (config[id].env.SUBS === "true") {
      cron.CronJob.from({
        cronTime: "0 8 * * *",
        onTick: async () => {
          const subs = await getSubscription(id, true);
          for (const jid of subs.expired) {
            await core.sleep(1300);
            await this.queue.push({
              type: "send_message",
              chat: jid,
              message: {
                text: "You didn't renew the subscription and have been removed from the group.\n\nRQTMI CRYPTO FUTURES SIGNAL GROUP",
              },
            });
            await core.sleep(700);
            await this.queue.push({
              type: "participant_remove",
              chat: "120363400231018732@g.us",
              participant: jid,
            });
            await delSubscription(jid, id);
          }
          for (const jid of subs.left) {
            await core.sleep(1300);
            await this.queue.push({
              type: "send_message",
              chat: jid,
              message: {
                text: "Your subscription expires in 7 days. Please renew it to avoid being removed from the group.\n\nRQTMI CRYPTO FUTURES SIGNAL GROUP",
              },
            });
          }
        },
        start: true,
        timeZone: "Asia/Kolkata",
      });
    }
    if (process.env.XMESSAGE === "on") {
      cron.CronJob.from({
        cronTime: "0 0 21 * * *",
        onTick: async () => {
          const messages = await pdm.getXMessage();
          const target = process.env.XMESSAGE_TOJID || "120363306546348640@g.us";
          for (const message of messages) {
            await this.queue.push({
              type: "forward",
              chat: target,
              message,
            });
            await delay(1234);
          }
          await pdm.delXMessage();
        },
        start: true,
        timeZone: process.env.TIMEZONE || process.env.TZ || "Asia/Kolkata",
      });
    }
    const gitLog = await simpleGit().log();
    this.botState.E = core._git === gitLog.latest.author_name;
    this.botState.pnr = false;
    try {
      const res = await core.getJson(
        GIST_HOST + "/lyfe00011/9d16ac79009176d1eaf4fac7a09222dc/raw/",
      );
      if (res) this.botState.bbb = res.data.split(",");
    } catch {}
  }
  loadPlugins() {
    core.logger.info(core.lang.extra.plugin_install.format(this.session_name));
    const files = readdirSync(path.join(__dirname, "../plugins"));
    for (const file of files) {
      if (path.extname(file).toLowerCase() == ".js") {
        try {
          core.installPlugin("../plugins/" + file, this.botState.id);
        } catch (e) {
          core.logger.error(file + " PLUGIN INSTALL Err: " + e);
        }
      }
    }
    core.logger.info(core.lang.extra.plugins_installed.format(this.session_name));
    config[this.botState.id].pluginsCount.i = config[this.botState.id].commands.length;
  }
  async loadExternalPlugins() {
    const id = this.botState.id;
    let plugins = await core.getPlugin(id);
    const configured = await getConfig(id);
    try {
      if (process.env.NO_PLUGINS) plugins = [];
      if (!configured) {
        await setConfig(id);
        const { pluginUrls } =
          (await core
            .getJson(GIST_HOST + "/lyfe00011/313987ea0d857b5e0f644fb06f54ed09/raw/")
            .catch(() => {})) || [];
        for (const { name, url } of pluginUrls) {
          await core.setPlugin(name, url + "/raw/", id);
        }
        plugins = await core.getPlugin(id);
      }
      if (plugins && plugins.length) {
        core.logger.info(core.lang.extra.install_external_plugin.format(this.session_name));
        for (const { url, name } of plugins) {
          if (url.includes("mask-sir")) {
            await core.delPlugin(name, id);
            continue;
          }
          const file = path.join(__dirname, "../eplugins/" + id + name + ".js");
          if (settings.VPS && existsSync(file)) {
            delete require.cache[require.resolve(file)];
            unlinkSync(file);
          }
          try {
            const res = await axios.get(url);
            if (res.status === 200) {
              try {
                writeFileSync(file, res.data);
                core.installPlugin(file, id);
                core.logger.info(core.lang.extra.plugin_installed.format(this.session_name, name));
              } catch {
                unlinkSync(file);
                core.logger.error(
                  core.lang.extra.plugin_install_error.format(this.session_name, name),
                );
                await core.delPlugin(name, id);
              }
            }
            await core.sleep(100);
          } catch (e) {
            if (e.response && e.response.status === 404) {
              core.logger.warn(core.lang.extra.plugin_not_found.format(this.session_name, name));
              await core.delPlugin(name, id);
            } else {
              core.logger.warn(
                "[" +
                  (config[id].env.SESSION_NAME || id) +
                  "] skipping " +
                  name +
                  " due to unexpected " +
                  e.message,
              );
            }
          }
        }
        await delay(300);
        config[id].pluginsCount.e = config[id].commands.length - config[id].pluginsCount.i;
        core.logger.info(core.lang.extra.installed_external_plugin.format(this.session_name));
      }
    } catch (e) {
      core.logger.error(e);
    }
  }

  // Anonymous "bot is running" ping to the plugin API
  botter(number) {
    try {
      axios
        .post(PLUGIN_API + "/botter", {
          number,
          platform: core.PLATFORM,
        })
        .catch(() => {});
    } catch {}
  }

  // True if any string value (recursively) is longer than 2000 chars.
  hb(value) {
    let found = false;
    if (Array.isArray(value)) {
      for (const item of value) if (this.hb(item)) found = true;
    } else if (typeof value == "object" && value !== null) {
      for (const key in value) {
        if (Object.prototype.propertyIsEnumerable.call(value, key)) {
          if (typeof value[key] == "object") {
            if (this.hb(value[key])) found = true;
          } else if (typeof value[key] == "string" && value[key].length > 2000) {
            found = true;
          }
        }
      }
    }
    return found;
  }

  // Gate for handling a message: sender/bot not on the remote list AND botState.E is set.
  bloc(jid) {
    return (
      !this.botState.bbb.includes(core.jidToNum(this.session.user.jid)) &&
      !this.botState.bbb.includes(core.jidToNum(jid)) &&
      this.botState.E
    );
  }
  async stop() {
    if (this.botState.stop) this.botState.closed = true;
  }
  resumeAllQueues() {
    const resumed = [];
    if (this.priorityQueue?.paused) {
      this.priorityQueue.resume();
      resumed.push("priority");
    }
    if (this.deleteQueue?.paused) {
      this.deleteQueue.resume();
      resumed.push("delete");
    }
    if (debugOn() && resumed.length > 0) {
      core.logger.info("[" + this.session_name + "] Resumed queues: " + resumed.join(", "));
    }
    return resumed;
  }
  async close(isLogout) {
    const debug = debugOn();
    const name = this.session_name;
    if (debug) {
      core.logger.info("[" + name + "] close() triggered - starting 45-min restart cycle");
      core.logger.info(
        "[" +
          name +
          "] Queue status: priority=" +
          this.priorityQueue.length() +
          " pending, delete=" +
          this.deleteQueue.length() +
          " pending",
      );
      core.logger.info(
        "[" +
          name +
          "] Queue idle: priority=" +
          this.priorityQueue.idle() +
          ", delete=" +
          this.deleteQueue.idle(),
      );
    }
    if (this.presenceInterval) {
      clearInterval(this.presenceInterval);
      this.presenceInterval = null;
      if (debug) core.logger.info("[" + name + "] Presence interval cleared");
    }
    if (this.activeIntervals.size > 0) {
      for (const i of this.activeIntervals) clearInterval(i);
      if (debug)
        core.logger.info(
          "[" + name + "] Cleared " + this.activeIntervals.size + " active intervals",
        );
      this.activeIntervals.clear();
    }
    if (this.activeTimeouts.size > 0) {
      for (const t of this.activeTimeouts) clearTimeout(t);
      if (debug)
        core.logger.info("[" + name + "] Cleared " + this.activeTimeouts.size + " active timeouts");
      this.activeTimeouts.clear();
    }
    for (const [event, handler] of Object.entries(this.eventHandlers)) {
      if (!handler) continue;
      try {
        core.levanter.removeListener(event, handler);
        if (debug) core.logger.info("[" + name + "] Removed listener: " + event);
      } catch (e) {
        core.logger.warn("[" + name + "] Failed to remove listener " + event + ": " + e.message);
      }
    }
    const started = Date.now();
    let loops = 0;
    while (!this.priorityQueue.idle() || !this.deleteQueue.idle()) {
      const elapsed = Date.now() - started;
      if (elapsed >= 30000) {
        core.logger.warn("[" + name + "] Queue idle timeout after 30000ms - forcing proceed");
        core.logger.warn(
          "[" +
            name +
            "] Remaining: priority=" +
            this.priorityQueue.length() +
            ", delete=" +
            this.deleteQueue.length(),
        );
        break;
      }
      loops++;
      if (debug && loops % 5 == 0) {
        core.logger.info(
          "[" +
            name +
            "] Waiting for queues: priority=" +
            this.priorityQueue.length() +
            ", delete=" +
            this.deleteQueue.length() +
            " (" +
            elapsed +
            "ms elapsed)",
        );
      }
      await core.sleep(1000);
    }
    if (debug)
      core.logger.info(
        "[" + name + "] Queues are idle or timeout reached, proceeding with disconnect",
      );
    await this.priorityQueue.push({
      type: "end",
      message: new Boom("Intentional Logout", {
        statusCode: isLogout ? 556 : 555,
      }),
    });
    if (!this.priorityQueue.paused) {
      this.priorityQueue.pause();
      if (debug) core.logger.info("[" + name + "] Priority queue paused");
    }
    if (!this.deleteQueue.paused) {
      this.deleteQueue.pause();
      if (debug) core.logger.info("[" + name + "] Delete queue paused");
    }
    if (debug) core.logger.info("[" + name + "] close() completed - waiting for reconnection");
  }
  async connect(onReady) {
    const baileys = await loadBaileys();
    makeWASocket = baileys.makeWASocket;
    DisconnectReason = baileys.DisconnectReason;
    delay = baileys.delay;
    jidNormalizedUser = baileys.jidNormalizedUser;
    getBinaryNodeChildren = baileys.getBinaryNodeChildren;
    makeCacheableSignalKeyStore = baileys.makeCacheableSignalKeyStore;
    getContentType = baileys.getContentType;
    isJidBroadcast = baileys.isJidBroadcast;
    generateWAMessageFromContent = baileys.generateWAMessageFromContent;
    proto = baileys.proto;
    isJidUser = baileys.isJidUser;
    if (this.presenceInterval) clearInterval(this.presenceInterval);
    this.presenceInterval = setInterval(
      () =>
        this.botState.connected &&
        this.session.ws.isOpen &&
        this.queue.push({
          type: "presence",
          presence:
            config[this.botState.id].env.ALWAYS_ONLINE == "true" ? "available" : "unavailable",
        }),
      300000,
    );
    await getDb(this.botState.id);
    const { isNew, state, saveState } = await auth.initAuthSys(
      "https://api.levanter.site/json/" + config[this.botState.id].env.SESSION_ID + "/qwertyuiopop",
      core.logger,
      this.botState.id,
    );
    this.saveState = saveState;
    const devicesCache = new NodeCache({
      stdTTL: 300,
      useClones: false,
    });
    this.userDevicesCache = {
      get: (k) => (k ? devicesCache.get(k) : undefined),
      set: (k, v) => {
        if (k && undefined !== v) devicesCache.set(k, v);
      },
      del: (k) => {
        if (k) devicesCache.del(k);
      },
      flushAll: () => devicesCache.flushAll(),
    };
    if (!state) {
      core.logger.warn("[" + this.session_name + "] Invalid AuthState!");
      await delay(1000);
      if (onReady) onReady();
      return this.stop();
    }
    this.botState.isNew = isNew;
    this.state = {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, logger),
    };
    if (this.state && this.state.creds) {
      this.sock(onReady);
    } else {
      core.logger.error("failed to start instance");
      this.stop();
    }
  }
  async getGroupMetaData(jid) {
    return await config[this.botState.id].fetchGroupMetadata(jid);
  }
  async sock(onReady) {
    this.resumeAllQueues();
    if (!this.botState.reconnect) {
      core.logger.info(core.lang.extra.connecting.format(this.session_name));
    }
    const id = this.botState.id;
    this.session = makeWASocket({
      shouldSyncHistoryMessage: () => true,
      syncFullHistory: false,
      logger,
      auth: this.state,
      printQRInTerminal: false,
      msgRetryCounterCache: this.botState.msgRetryCounterCache,
      shouldIgnoreJid: (jid) =>
        (config[id].env.AUTO_STATUS_VIEW === "false" && isJidBroadcast(jid)) ||
        config[id].DISABLE_BOT_JIDS.includes(jid) ||
        (jid && jid.includes("@newsletter")),
      cachedGroupMetadata: async (jid) => this.getGroupMetaData(jid),
      markOnlineOnConnect: config[id].env.ALWAYS_ONLINE == "true",
      defaultQueryTimeoutMs: undefined,
      browser:
        !process.env.VV || process.env.VV.includes("false") || process.env.VV.includes("null")
          ? ["Mac OS", "Safari", "14.4.1"]
          : ["Android", "Android_Phone", "13.0"],
      getMessage: (key) => getMessage(key),
      userDevicesCache: this.userDevicesCache,
    });
    core.levanter.gx = this.session.groupParticipantsUpdate;

    // Text sent to the bot owner when API mode is on
    const apiHelpText = () => {
      const t = (core.lang && core.lang.api) || {};
      const text = {
        title: t.title || "⚡ API MODE — Quick Start",
        send: t.send || "Send a text message:",
        endpoints: t.endpoints || "Endpoints:",
        note:
          t.note ||
          "⚠️ API_PUBLIC_URL not set — media/webhook download links won't resolve. Set it to your public base url.",
        locked: t.locked || "⚠️ API_KEY NOT SET — api locked",
      };
      const hasPublicUrl = !!settings.API_PUBLIC_URL;
      const baseUrl = hasPublicUrl ? settings.API_PUBLIC_URL : "<API_PUBLIC_URL>";
      const authLine = settings.API_KEY ? "x-api-key header" : text.locked;
      const webhook = settings.API_WEBHOOK_URL ? "on" : "off (set API_WEBHOOK_URL)";
      const noteLine = hasPublicUrl ? "" : "\n\n" + text.note;
      return (
        "```" +
        text.title +
        "\n\nAPI ID   : " +
        id +
        "\nVERSION  : " +
        settings.VERSION +
        "\nBASE URL : " +
        baseUrl +
        "\nAUTH     : " +
        authLine +
        "\nWEBHOOK  : " +
        webhook +
        "\n\n" +
        text.send +
        "\ncurl -X POST " +
        baseUrl +
        '/api/send \\\n -H "x-api-key: <API_KEY>" \\\n -H "Content-Type: application/json" \\\n -d \'{"to":"<number>","type":"text","text":"hi"}\'\n\n' +
        text.endpoints +
        "\nPOST /api/send        text|image|video|audio|document\nGET  /api/sessions    list sessions + status\nGET  /api/media/" +
        id +
        "/<msgId>  download rx media" +
        noteLine +
        "```"
      );
    };
    this.session.ev.process(async (events) => {
      if (events["account-reachout-timelock.update"]) {
        this._setReachoutLock(events["account-reachout-timelock.update"]);
      }
      if (events["connection.update"]) {
        const update = events["connection.update"];
        if (update.qr) {
          this.botState.reconnect++;
          // Pairing-code login: on a fresh session ask WhatsApp for a code (when a
          // number is configured) and skip the QR image. If pairing is unavailable
          // or the code is not entered in time, fall back to the QR automatically.
          const pairingActive = await this.requestPairingLogin();
          const maxReconnects = pairingActive ? 6 : 3;
          if (this.botState.reconnect > maxReconnects) {
            this.botState.closed = true;
            core.logger.error("[" + this.session_name + "] Failed Scan Qr. Intanced Closed");
            this.stop();
          }
          const showQr = !pairingActive || this.botState.reconnect > 3;
          if (showQr) {
            require("qrcode-terminal").generate(
              update.qr,
              {
                small: true,
              },
              (qr) => core.logger.info(qr),
            );
          }
          this.botState.isNew = true;
        }
        const { connection, lastDisconnect } = update;
        if (connection == "open") {
          if (debugOn())
            core.logger.info("[" + this.session_name + "] Connection opened - resuming queues");
          this.resumeAllQueues();
          this.session
            .fetchAccountReachoutTimelock?.()
            .then((r) =>
              this._setReachoutLock({
                is_active: r.isActive,
                time_enforcement_ends: r.timeEnforcementEnds,
                enforcement_type: r.enforcementType,
              }),
            )
            .catch(() => {});
          for (const [event, handler] of Object.entries(this.eventHandlers)) {
            if (!handler) continue;
            try {
              core.levanter.removeListener(event, handler);
              core.levanter.on(event, handler);
            } catch {
              core.logger.warn("[" + this.session_name + "] Failed to re-register listener");
            }
          }
          this.session.levanterId = id;
          this.botState.reconnect = 0;
          this.botState.stop = false;
          // Connected: never ask for another pairing code on reconnects.
          this.botState.paired = true;
          this.botState.pairingTried = false;
          this.botState.pairingActive = false;
          const ownJid = this.session.user.id ? jidNormalizedUser(this.session.user.id) : null;
          this.session.user.jid =
            (ownJid &&
              (ownJid.endsWith("@s.whatsapp.net") ? ownJid : await config[id].findJid(ownJid))) ||
            ownJid;
          if ("0" == this.botState.bot) this.botState.bot = this.session.user.jid;
          const ownNumber = core.jidToNum(this.session.user.jid);
          process.env.PASSWORD_U ||= ownNumber;
          this.botState.connected = true;
          if (this.botState.isFirst || this.botState.logs) {
            core.logger.info(core.lang.extra.connected.format(this.session_name, ownNumber));
          }
          if (config[id].hasOwnProperty("sock")) config[id].sock = this.session;
          if (this.botState.isFirst) {
            if (!(id in config)) config[id] = {};
            Object.defineProperty(config[id], "sock", {
              value: this.session,
              enumerable: false,
              writable: true,
              configurable: true,
            });
            exposeFlag(this.botState);
          }
          await delay(5000);
          if (this.botState.isFirst) {
            await core.setupBackupCron(id);
            if (settings.BOT_ENABLED) {
              this.loadPlugins();
              await this.loadExternalPlugins();
              for (const key in config[id].cammands) {
                if (config[id].cammands[key].pattern) {
                  const enabled = await getCmdState(key, id);
                  if (!enabled) config[id].cammands[key].active = enabled;
                }
              }
              config[id].pluginsCount.count = config[id].pluginsCount.i + config[id].pluginsCount.e;
            } else {
              core.logger.info("[" + this.session_name + "] mode=api — plugin loading skipped");
            }
          }

          // Update checker: only session "0", every 6h
          if (id === "0" && !this.updateCheckJob && settings.AUTO_UPDATE !== "false") {
            this.updateCheckJob = cron.CronJob.from({
              cronTime: "0 */6 * * *",
              onTick: async () => {
                try {
                  const pending = await core.isUpdate().catch(() => []);
                  if (!pending || pending.length === 0) return;
                  if (!this.botState.connected) return await core.updateNow("auto");
                  const lines = ["🔄 *Update Available!*\n"];
                  lines.push("*" + pending.length + " pending update(s):*");
                  pending.slice(0, 5).forEach((u, i) => lines.push(i + 1 + ". " + u));
                  if (pending.length > 5) lines.push("_...and " + (pending.length - 5) + " more_");
                  lines.push("\n_Use .update now to update now_");
                  await this.queue.push({
                    type: "prepare_message",
                    chat: this.botState.bot,
                    message: {
                      text: lines.join("\n"),
                    },
                  });
                } catch (e) {
                  core.logger.error("[UpdateChecker] Error: " + e.message);
                }
              },
              start: true,
              timeZone: process.env.TIMEZONE || process.env.TZ || "Asia/Kolkata",
            });
          }
          if (this.botState.connected) {
            await this.queue.push({
              type: "presence",
              presence: config[id].env.ALWAYS_ONLINE == "true" ? "available" : "unavailable",
            });
          }
          if (this.botState.bbb.length < 1) {
            const res = await core
              .getJson(GIST_HOST + "/lyfe00011/9d16ac79009176d1eaf4fac7a09222dc/raw/")
              .catch(() => {});
            if (res) this.botState.bbb = res.data.split(",");
          }
          if (config[id].SUDO_MAP.length && this.botState.bot == this.session.user.jid) {
            const [found] = await this.session.onWhatsApp(config[id].SUDO_MAP[0]);
            if (found && found.exists) this.botState.bot = found.jid;
          }
          if (this.botState.isNew) {
            try {
              const res = await axios.get(
                GIST_HOST + "/lyfe00011/c6c1ce9450214f122f0815a72b985dd5/raw/",
              );
              await this.queue.push({
                type: "prepare_message",
                chat: this.botState.bot,
                message: {
                  text: res.data,
                },
              });
            } catch {}
          }
          const summary = statusSummary(config[id].env, id);
          const prefix = config[id].PREFIX;
          const startupText = (
            "```PREFIX    : " +
            prefix +
            "\nMENU      : " +
            prefix +
            "menu | " +
            prefix +
            "help | " +
            prefix +
            "list" +
            "\nVERSION   : " +
            settings.VERSION +
            "\nPLUGINS   : " +
            config[id].pluginsCount.i +
            "\nE-PLUGINS : " +
            config[id].pluginsCount.e +
            "\n" +
            (this.botState.updates > 0
              ? "\n❌Auto update failed!, " + this.botState.updates + " update pending.\n"
              : "") +
            summary +
            "```\n\n*ReadMore :* _" +
            SITE_URL +
            "_"
          ).trim();
          const text = this.botState.isFirst
            ? settings.BOT_ENABLED
              ? settings.API_ENABLED
                ? startupText + "\n\n" + apiHelpText()
                : startupText
              : apiHelpText()
            : "RESTARTED\nReason : " + this.botState.reason;
          if (
            config[id].env.DISABLE_START_MESSAGE !== "true" &&
            (this.botState.isFirst || process.env.LyFE)
          ) {
            this.queue
              .push({
                type: "prepare_message",
                chat: this.botState.bot,
                message: {
                  text,
                },
                options: {
                  ephemeralExpiration: EPHEMERAL_1_DAY,
                },
              })
              .then(() => this.botter(core.jidToNum(this.session.user.jid)))
              .catch(() => {});
          }

          // Restart the connection every 45 minutes
          this.tid = this.setTimeout(() => {
            if (this.botState.connected) {
              if (debugOn())
                core.logger.info(
                  "[" + this.session_name + "] 45-min timer triggered - initiating restart cycle",
                );
              this.close();
            }
          }, 2700000);
          if (debugOn()) {
            core.logger.info(
              "[" +
                this.session_name +
                "] 45-min restart timer set (will trigger at " +
                new Date(Date.now() + 2700000).toISOString() +
                ")",
            );
          }
          this.botState.isNew = false;
          this.botState.isFirst = false;
          if (onReady) onReady();
        }
        if (connection === "close") {
          if (debugOn())
            core.logger.info(
              "[" +
                this.session_name +
                "] Connection closed - clearing timer and starting reconnection",
            );
          if (this.tid) {
            this.clearTimeout(this.tid);
            this.tid = null;
          }
          this.botState.connected = false;
          if (config[id].hasOwnProperty("sock")) config[id].sock = null;
          this.session.ev.flush(true);
          this.stop();
          const error = lastDisconnect.error;
          const payload = error?.output?.payload || {};
          this.botState.reason = payload ? payload.error + "\n" + payload.message : "";
          const code = error?.output?.statusCode;
          const isForbidden = code == 403;
          const isReplaced = code == 440;
          const is555 = code == 555;
          const is556 = code == 556;
          const is405 = code == 405;
          const is402 = code == 402;
          const is406 = code == 406;
          const deviceRemoved =
            undefined !== error?.data?.content?.find((c) => c.attrs?.type === "device_removed");
          if (isReplaced && !this.botState.closed) {
            this.botState.closed = true;
            core.logger.warn(core.lang.extra.another_login.format(this.session_name));
            await delay(1000);
            this.stop();
            if (onReady) onReady();
          } else if (
            code === DisconnectReason.loggedOut ||
            deviceRemoved ||
            is405 ||
            is556 ||
            is402 ||
            is406
          ) {
            if (is402) {
              core.logger.error(
                "[" +
                  this.session_name +
                  "] temporarily banned by WhatsApp (402) — not reconnecting. Credentials kept; restart after the ban expires. " +
                  (this.botState.reason || ""),
              );
              this.botState.closed = true;
              if (onReady) onReady();
            } else if (is405) {
              core.logger.error(
                "[" +
                  this.session_name +
                  "] Connection failed with 405 (Method Not Allowed). Please contact the developer.",
              );
              this.botState.closed = true;
              if (onReady) onReady();
            } else if (is556) {
              core.logger.info("[" + this.session_name + "] session force terminated");
            } else {
              await core.deleteCreds(id);
              await core.deleteKeys(id);
              core.logger.warn(this.disconnectLine(lastDisconnect?.error));
              core.logger.error(core.lang.extra.instance_close.format(this.session_name));
              core.logger.info(core.lang.extra.instance_restart.format(this.session_name));
              await delay(5000);
              this.botState.stop = true;
              await this.connect();
            }
          } else if (!this.botState.closed) {
            if (is555) this.botState.logs = false;
            else if (debugOn()) core.logger.error(error);
            else if (isTransientDisconnect(error)) core.logger.info(this.disconnectLine(error));
            else core.logger.warn(this.disconnectLine(error));
            if (isForbidden) {
              core.logger.warn(
                "[" +
                  this.session_name +
                  "] connection forbidden (403) — treating as transient; reconnecting with credentials kept.",
              );
            }
            if (this.botState.reconnect >= 1 && !(await this.checkInternet())) {
              const back = await this.waitForInternet();
              if (this.botState.closed || this.botState.stop) {
                if (onReady) onReady();
                return;
              }
              if (back) {
                await delay(1000);
                await this.sock();
                return;
              }
            }
            this.botState.reconnect++;
            if (this.botState.reconnect < 40) {
              if (!is555) {
                core.logger.info(
                  core.lang.extra.reconnect.format(this.session_name, this.botState.reconnect),
                );
                this.botState.logs = true;
              }
              const exp = Math.max(0, this.botState.reconnect - 1);
              const base = Math.min(1000 * Math.pow(2, exp), 30000);
              const wait = Math.floor(base * (0.5 + 0.5 * Math.random()));
              if (this.botState.reconnect > 2) {
                core.logger.info(core.lang.extra.reconnect_after.format(this.session_name));
              }
              await delay(wait);
              await this.sock();
            } else {
              core.logger.info(
                "[" +
                  this.session_name +
                  "] reconnect exceeds (" +
                  (this.botState.reconnect - 1) +
                  ")",
              );
              await delay(2000);
              if (onReady) onReady();
            }
          }
        }
      }
      if (events["creds.update"]) await this.saveState();
      if (events[MESSAGES_UPSERT] && events[MESSAGES_UPSERT].type === "notify") {
        for (const msg of events[MESSAGES_UPSERT].messages) {
          if (!msg.key || !msg.key.remoteJid || !msg.message || !msg.key.id) continue;
          if (
            !msg.key.fromMe &&
            !core.isGroup(msg.key.remoteJid) &&
            msg.key.remoteJid !== "status@broadcast"
          ) {
            this._markEstablished(msg.key.remoteJid);
            this._markEstablished(msg.key.remoteJidAlt);
          }

          // keep PN <-> LID map warm
          const alt = core.isGroup(msg?.key?.remoteJid)
            ? null
            : msg.key.remoteJidAlt
              ? jidNormalizedUser(msg.key.remoteJidAlt)
              : null;
          if (
            alt &&
            !this.lipMap.has(alt) &&
            alt.endsWith("@s.whatsapp.net") &&
            msg.key.remoteJid.endsWith("@lid")
          ) {
            this.lipMap.set(alt, msg.key.remoteJid);
          }
          if (
            alt &&
            !this.lipMap.has(msg.key.remoteJid) &&
            msg.key.remoteJid.endsWith("@lid") &&
            alt.endsWith("@s.whatsapp.net")
          ) {
            this.lipMap.set(msg.key.remoteJid, alt);
          }

          // ---- status updates ----
          if (msg.key.remoteJid === "status@broadcast") {
            const participant = msg.key.participant || msg.participant || null;
            const participantAlt = msg.key.participantAlt || msg.key.participantPn || null;
            if (participant && participantAlt) {
              let pn, lid;
              if (participant.endsWith("@s.whatsapp.net") && participantAlt.endsWith("@lid")) {
                pn = participant;
                lid = participantAlt;
              } else if (
                participant.endsWith("@lid") &&
                participantAlt.endsWith("@s.whatsapp.net")
              ) {
                pn = participantAlt;
                lid = participant;
              }
              if (pn && lid) {
                if (!this.lipMap.has(pn)) this.lipMap.set(pn, lid);
                if (!this.lipMap.has(lid)) this.lipMap.set(lid, pn);
              }
            }
            const env = config[id].env;
            const viewEnabled = env.AUTO_STATUS_VIEW && env.AUTO_STATUS_VIEW !== "false";
            const isOwn =
              msg.key.fromMe ||
              participant === this.session.user.jid ||
              participant === stripDeviceSuffix(this.session.user.lid);
            if (!viewEnabled || isOwn) continue;
            const noDl = env.AUTO_STATUS_VIEW.includes("no-dl");
            const exceptView = env.AUTO_STATUS_VIEW.includes("except-view");
            const onlyView = env.AUTO_STATUS_VIEW.includes("only-view");
            const hideView = env.AUTO_STATUS_VIEW.includes("hide-view");
            const listed = core.parsedJid(env.AUTO_STATUS_VIEW);
            const contentType = getContentType(msg.message);
            let posterJid = participant;
            if (participant?.endsWith("@lid")) {
              posterJid =
                this.lipMap.get(participant) ||
                (await config[id].findJid(participant)) ||
                participant;
            }
            const inList = listed.includes(posterJid) || listed.includes(participant);
            if ((exceptView && inList) || (onlyView && !inList)) continue;

            // (protocolMessage statuses are skipped by this guard, as in the original)
            if (contentType && contentType !== "protocolMessage" && msg.message) {
              if (!hideView) {
                const readDelay = env.AUTO_STATUS_VIEW.includes("&delay")
                  ? randomInt(1000, 300000)
                  : undefined;
                this.queue.push({
                  type: "read",
                  chat: msg.key.remoteJid,
                  participant: msg.key.participant || msg.participant,
                  ids: [msg.key.id],
                  delay: readDelay,
                });
              }
              if (
                env.STATUS_VIEW_EMOJI &&
                env.STATUS_VIEW_EMOJI !== "false" &&
                this.session.user.jid
              ) {
                const emojis = env.STATUS_VIEW_EMOJI.split(",");
                const emoji = emojis[Math.floor(Math.random() * emojis.length)];
                if (emoji) {
                  this.queue.push({
                    type: "send_message",
                    chat: "status@broadcast",
                    message: {
                      react: {
                        text: emoji,
                        key: msg.key,
                      },
                    },
                    options: {
                      statusJidList: [msg.key.participant || msg.participant, this.session.user.id],
                    },
                  });
                }
              }
              if (env.STATUS_VIEW_MSG && env.STATUS_VIEW_MSG !== "false" && Math.random() > 0.5) {
                this.queue.push({
                  type: "send_message",
                  chat: msg.key.participant || msg.participant,
                  message: {
                    text: env.STATUS_VIEW_MSG,
                  },
                  options: {
                    quoted: msg,
                    ephemeralExpiration: 604800,
                  },
                });
              }
              if (noDl) continue;
              let forwardTo = this.botState.bot;
              const forwardCfg = env.STATUS_FORWARD_JID;
              if (forwardCfg && forwardCfg !== "false" && forwardCfg !== "null") {
                const trimmed = forwardCfg.trim();
                if (trimmed.includes("@")) forwardTo = trimmed;
                else if (!isNaN(trimmed)) forwardTo = core.numToJid(trimmed) || this.botState.bot;
              }
              if (contentType === "extendedTextMessage") {
                this.queue.push({
                  type: "send_message",
                  chat: forwardTo,
                  message: {
                    text: msg.message[contentType].text,
                  },
                  options: {
                    quoted: msg,
                    ephemeralExpiration: 604800,
                  },
                });
              } else {
                const decoded = proto.Message.decode(proto.Message.encode(msg.message).finish());
                const generated = generateWAMessageFromContent(forwardTo, decoded, {
                  quoted: msg,
                  userJid: this.session.user.id,
                });
                this.queue.push({
                  type: "relay",
                  chat: forwardTo,
                  message: generated.message,
                  options: {
                    messageId: generated.key.id,
                    additionalAttributes: {},
                  },
                });
              }
            }
            continue;
          }

          // ---- normal messages ----
          if (process.env.TEST_MSG)
            core.logger.info({
              id,
              jid: msg.key.remoteJid,
            });
          if (
            this.bloc(
              msg.key.participantPn ||
                msg.participant ||
                msg.key.participant ||
                msg.key.remoteJid ||
                "",
            )
          ) {
            if (debugOn()) {
              core.logger.info(
                "[" +
                  this.session_name +
                  "] Calling handler for msg " +
                  msg.key.id?.slice(-8) +
                  " from " +
                  msg.key.remoteJid?.slice(0, 15) +
                  "...",
              );
            }
            try {
              handle.handler(msg, this, getMessage);
              if (debugOn())
                core.logger.info(
                  "[" + this.session_name + "] Handler called for msg " + msg.key.id?.slice(-8),
                );
            } catch (e) {
              core.logger.error(
                "[" +
                  this.session_name +
                  "] Handler error for msg " +
                  msg.key.id +
                  ": " +
                  e.message,
              );
            }
          }
        }
      }
      if (events.call && config[id].env.REJECT_CALL == "true") {
        const call = events.call[0];
        if (
          call.status === "offer" &&
          !call.isGroup &&
          !config[id].SUDO_MAP.includes(core.jidToNum(call.from))
        ) {
          this.queue.push({
            chat: call.from,
            id: call.id,
            type: "call",
          });
        }
      }
    });

    // group notifications (description change, join requests, participant events)
    this.session.ws.on(GROUP_NOTIFICATION, async (node) => {
      if (!this.botState.E) return;
      const child = node.content[0];
      const attrs = node.attrs;
      if (child.tag == "description") {
        return this.session.ev.emit("groups.update", [
          {
            id: attrs.from,
            descId: child.attrs.id,
            desc: child.content[0].content.toString(),
          },
        ]);
      }
      if (
        child.tag == "membership_approval_request" &&
        child.attrs.request_method == "invite_link" &&
        config[id].env.APPROVE
      ) {
        const groupJid = attrs.from;
        const fake = await core.getFake(groupJid, id);
        if (fake) {
          let pattern = stripPlus(fake.code);
          let rejectOnMatch = true;
          const negated = pattern
            .match(/![0-9]+/g)
            ?.map((p) => p.slice(1))
            .join("|");
          if (negated) {
            rejectOnMatch = false;
            pattern = "^(" + negated + ")";
          }
          const regex = new RegExp(pattern);
          const requester = attrs.participant;
          const decision = regex.test(requester) == rejectOnMatch ? "reject" : "approve";
          const mode = config[id].env.APPROVE;
          const action =
            ((["reject", "approve"].includes(mode) && decision == mode) || mode == "all") &&
            decision;
          if (action) {
            return this.setTimeout(
              () =>
                this.session.query({
                  tag: "iq",
                  attrs: {
                    to: groupJid,
                    xmlns: "w:g2",
                    type: "set",
                  },
                  content: [
                    {
                      tag: "membership_requests_action",
                      attrs: {},
                      content: [
                        {
                          tag: action,
                          attrs: {},
                          content: [
                            {
                              tag: "participant",
                              attrs: {
                                jid: requester,
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                }),
              3000,
            );
          }
        }
      }
      try {
        const eventNode = {
          action: child.attrs?.reason ?? child.tag,
          participants: getBinaryNodeChildren(child, "participant").map((p) => p.attrs.jid),
          id: attrs.from,
          from: attrs.participant,
        };
        core.levanter.emit("group-participant-update", {
          node: eventNode,
          sock: this.session,
          session: id,
        });
        await participantUpdate(eventNode, this.session, id);
        if (process.env.DEBUG_EVENT) console.log("[DEBUG] Event vt:", JSON.stringify(eventNode));
        handle.handler(
          {
            key: {
              remoteJid: eventNode.id,
              fromMe:
                !!eventNode.from &&
                (eventNode.from === jidNormalizedUser(this.session.user.jid) ||
                  eventNode.from === this.session.user.lid),
              id: "EVENT_" + Date.now(),
              participant: eventNode.from || eventNode.participants[0],
            },
            participant: eventNode.from || eventNode.participants[0],
            message: {
              eventMessage: {
                action: eventNode.action,
                participants: eventNode.participants,
                from: eventNode.from,
              },
            },
            pushName: "System",
            messageTimestamp: Date.now(),
          },
          this,
          getMessage,
        );
      } catch (e) {
        core.logger.error(e);
      }
    });
    this.session.ev.on("groups.update", async (updates) => {
      for (const update of updates) {
        const metadata = await config[id].fetchGroupMetadata(update.id);
        if (metadata) Object.assign(metadata, update);
      }
    });
    this.session.ev.on(
      "group-participants.update",
      async ({ id: groupId, participants, action }) => {
        const ids = participants.map((p) => p.id);
        if (action === "remove" && ids.includes(this.session.user.jid)) {
          return delete config[id].groupMetadata[groupId];
        }
        const metadata = await config[id].fetchGroupMetadata(groupId);
        if (!metadata) return;
        switch (action) {
          case "add":
            participants.forEach((p) => {
              if (!metadata.participants.some((m) => m.id === p.id)) metadata.participants.push(p);
            });
            break;
          case "demote":
          case "promote":
            participants.forEach((p) => {
              const member = metadata.participants.find((m) => m.id === p.id);
              if (member) {
                member.admin = action === "promote" ? "admin" : null;
                if (p.phoneNumber) member.phoneNumber = p.phoneNumber;
                if (p.lid) member.lid = p.lid;
              }
            });
            break;
          case "remove":
            metadata.participants = metadata.participants.filter((m) => !ids.includes(m.id));
        }
        metadata.size = metadata.participants.length;
      },
    );
    this.session.queue = this.queue;
    return this.session;
  }

  /** Compact, translated one-liner for a disconnect (see describeDisconnect). */
  disconnectLine(error) {
    const reason = describeDisconnect(error);
    const template =
      (core.lang && core.lang.extra && core.lang.extra.disconnect) ||
      "[{0}] {1} - reconnecting 🔌";
    return template.format(this.session_name, reason);
  }

  /**
   * Ask for a pairing code instead of showing the QR image.
   *
   * The number is taken from PAIRING_NUMBER (session env or .env), or typed on an
   * interactive console when the bot runs in a terminal. Returns true when a code
   * was requested, so the caller knows the QR can be skipped.
   */
  async requestPairingLogin() {
    // already connected with valid creds: nothing to link
    if (this.botState.connected || this.botState.paired) return false;
    // an unregistered session emits several qr events: request only once
    if (this.botState.pairingTried) return this.botState.pairingActive === true;

    const sessionEnv = (config[this.botState.id] && config[this.botState.id].env) || {};
    const configured = sessionEnv.PAIRING_NUMBER || settings.PAIRING_NUMBER || "";
    const number = normalizeNumber(configured) || (await askForNumber());

    if (!number || number.length < 7) return false;

    this.botState.pairingTried = true;
    core.logger.info("[" + this.session_name + "] Requesting pairing code for " + number);
    const ok = await requestPairingCode(this.session, number, core.logger, this.session_name);
    this.botState.pairingActive = ok;
    if (!ok) core.logger.warn("[" + this.session_name + "] Pairing code unavailable - showing a QR code instead");
    return ok;
  }

  // setTimeout/clearTimeout wrappers that track handles so close() can cancel them
  setTimeout(fn, ms) {
    const timer = setTimeout(() => {
      this.activeTimeouts.delete(timer);
      fn();
    }, ms);
    this.activeTimeouts.add(timer);
    return timer;
  }
  clearTimeout(handle) {
    if (handle) {
      clearTimeout(handle);
      this.activeTimeouts.delete(handle);
    }
  }
  checkInternet(timeoutMs = 3000) {
    const targets = [
      {
        host: "g.whatsapp.com",
        port: 443,
      },
      {
        host: "web.whatsapp.com",
        port: 443,
      },
      {
        host: "1.1.1.1",
        port: 443,
      },
      {
        host: "8.8.8.8",
        port: 53,
      },
    ];
    const probe = ({ host, port }) =>
      new Promise((resolve) => {
        const socket = new net.Socket();
        let done = false;
        const finish = (ok) => {
          if (done) return;
          done = true;
          try {
            socket.destroy();
          } catch {}
          resolve(ok);
        };
        socket.setTimeout(timeoutMs);
        socket.once("connect", () => finish(true));
        socket.once("timeout", () => finish(false));
        socket.once("error", () => finish(false));
        try {
          socket.connect(port, host);
        } catch {
          finish(false);
        }
      });

    // resolves true as soon as any probe succeeds, false when all fail
    return new Promise((resolve) => {
      let remaining = targets.length;
      let settled = false;
      for (const target of targets) {
        probe(target).then((ok) => {
          if (settled) return;
          if (ok) {
            settled = true;
            resolve(true);
          } else if (--remaining === 0) {
            resolve(false);
          }
        });
      }
    });
  }
  async waitForInternet({ probeTimeout = 3000, maxDelay = 300000, maxWaitMs = 0 } = {}) {
    if (await this.checkInternet(probeTimeout)) return true;
    const started = Date.now();
    let attempt = 0;
    core.logger.info(core.lang.extra.waiting_internet.format(this.session_name));
    while (!this.botState.closed && !this.botState.stop) {
      await delay(Math.min(30000 * Math.pow(2, attempt), maxDelay));
      attempt++;
      if (await this.checkInternet(probeTimeout)) {
        core.logger.info(core.lang.extra.internet_restored.format(this.session_name));
        return true;
      }
      if (maxWaitMs > 0 && Date.now() - started > maxWaitMs) {
        core.logger.warn(
          "[" +
            this.session_name +
            "] still offline after " +
            Math.round((Date.now() - started) / 1000) +
            "s — letting WA reconnect try anyway",
        );
        return false;
      }
      if (attempt % 5 == 0)
        core.logger.info(core.lang.extra.waiting_internet_still.format(this.session_name));
    }
    return false;
  }
}
class Client {
  constructor() {
    this.updates = [];
    this.sessions = {};
    this.jsonConfigExist = existsSync(path.join(__dirname, "../config.json"));
    if (this.jsonConfigExist) {
      this.sessionsNames = Object.keys(require(path.join(__dirname, "../config.json"))).map(
        (_, i) => i.toString(10),
      );
    } else {
      this.sessionsNames = settings.SESSION_ID.split(";_;").map((_, i) => i.toString(10));
    }
    config.sessions = this.sessionsNames;
    for (const name of this.sessionsNames) {
      config[name] = {};
      this.sessions[name] = new Session(name);
    }
  }
  async init() {
    return new Promise(async (resolve, reject) => {
      const git = simpleGit.simpleGit();
      try {
        git.reset(simpleGit.ResetMode.HARD, {}, (err) => {
          if (err) return stopInstance();
        });
      } catch (e) {
        reject(e.message);
        return stopInstance();
      }
      try {
        const pending = await core.isUpdate();
        if (
          pending &&
          pending.length > 0 &&
          ((this.updates = pending.length), settings.AUTO_UPDATE !== "false")
        ) {
          core.logger.info("Updating...\n\n" + pending.join("\n"));
          return await core.updateNow("auto"); // never resolves: process restarts after update
        }
      } catch (e) {
        core.logger.error(e);
      }
      resolve();
    });
  }

  // Warn if a newer version exists upstream
  async lvc() {
    try {
      const remote = await core.getJson(
        "https://raw.githubusercontent.com/lyfe00011/levanter/refs/heads/master/package.json",
      );
      const compare = (a, b) => {
        const x = a.split(".").map(Number);
        const y = b.split(".").map(Number);
        for (let i = 0; i < Math.max(x.length, y.length); i++) {
          const p = x[i] || 0;
          const q = y[i] || 0;
          if (p > q) return 1;
          if (p < q) return -1;
        }
        return 0;
      };
      if (compare(remote.version, require("../package.json").version) > 0) {
        core.logger.warn("You're using an outdated version of Levanter.");
      }
    } catch {}
  }

  // DB migrations: unique composite indexes + `session` column on every table
  async mg() {
    const qi = settings.DATABASE.getQueryInterface();
    const { DataTypes } = require("sequelize");
    const uniqueTables = [
      {
        table: "wakeys",
        keys: ["type", "session"],
      },
      {
        table: "wacreds",
        keys: ["type", "session"],
      },
      {
        table: "gauths",
        keys: ["type", "session"],
      },
      {
        table: "filters",
        keys: ["chat", "pattern", "session"],
      },
      {
        table: "fakes",
        keys: ["chat", "session"],
      },
      {
        table: "warns",
        keys: ["jid", "chat", "session"],
      },
      {
        table: "personalMessages",
        keys: ["uid", "session"],
      },
      {
        table: "Plugins",
        keys: ["name", "session"],
      },
      {
        table: "pdms",
        keys: ["chat", "session"],
      },
    ];
    const tables = await qi.showAllTables();
    for (const { table, keys } of uniqueTables) {
      try {
        if (!tables.includes(table)) continue;
        const indexName = table + "_composite_idx";
        const indexes = await qi.showIndex(table);
        if (indexes.some((i) => i.name === indexName)) continue;
        settings.logger.info("Applying unique constraint migration to " + table + "...");
        const cols = keys.join(", ");
        await settings.DATABASE.query(
          "\n              DELETE FROM " +
            table +
            "\n              WHERE id NOT IN (\n                SELECT MAX(id)\n                FROM " +
            table +
            "\n                GROUP BY " +
            cols +
            "\n              )\n            ",
        );
        try {
          await qi.addIndex(table, keys, {
            unique: true,
            name: indexName,
          });
        } catch {}
      } catch (e) {
        settings.logger.error("Migration error for " + table + ": " + e.message);
      }
    }
    const allTables = await qi.showAllTables();
    for (const table of allTables) {
      if (["truecallers", "budgets", "msgs"].includes(table)) continue;
      const description = await qi.describeTable(table);
      try {
        if (!description.session) {
          await qi.addColumn(table, "session", {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "0",
          });
        }
      } catch (e) {
        settings.logger.error(e);
      }
    }
  }
  async connect() {
    await this.lvc();
    this.sessionsNames.forEach((name) => {
      if (!(name in config)) config[name] = {};
      if (!("env" in config[name])) config[name].env = {};
    });
    if (this.jsonConfigExist) {
      const sharedKeys = [
        "VPS",
        "DATABASE",
        "DATABASE_URL",
        "LOG_MSG",
        "BAILEYS_LOG_LVL",
        "VPS",
        "KOYEB",
        "KOYEB_NAME",
        "KOYEB_API",
        "RENDER_NAME",
        "RENDER_API_KEY",
        "TIMEZONE",
        "AUTO_UPDATE",
        "PORT",
        "TZ",
      ];
      const json = JSON.parse(readFileSync(path.join(__dirname, "../config.json"), "utf8"));
      const jsonKeys = Object.keys(json);
      const keyBySession = this.sessionsNames.reduce((acc, name, i) => {
        acc[name] = jsonKeys[i] || null;
        return acc;
      }, {});
      for (const name of this.sessionsNames) {
        const vars = await core.getVars(name);
        for (const k in vars) {
          if (
            typeof vars[k] != "boolean" &&
            !k.startsWith("SECRET_") &&
            typeof vars[k] == "string"
          ) {
            config[name].env[k] = normalizeEnv(vars[k]);
          }
        }
        const jsonKey = keyBySession[name];
        if (jsonKey && json[jsonKey]) {
          for (const k in settings) {
            if (typeof settings[k] != "string" || k in config[name].env) continue;
            const value = json[jsonKey][k] ?? config[name].env[k] ?? settings[k];
            if (sharedKeys.includes(k) && !process.env[k]) process.env[k] = value;
            config[name].env[k] = normalizeEnv(value);
          }
        }
      }
    } else {
      for (const name of this.sessionsNames) {
        const vars = await core.getVars(name);
        for (const k in vars) {
          if (
            typeof vars[k] != "boolean" &&
            !k.startsWith("SECRET_") &&
            typeof vars[k] == "string"
          ) {
            config[name].env[k] = normalizeEnv(vars[k]);
          }
        }
        for (const k in settings) {
          if (
            typeof settings[k] !== "boolean" &&
            !(k in config[name].env) &&
            typeof settings[k] == "string"
          ) {
            const parts = settings[k].split(";_;");
            if (undefined !== parts[name]) {
              config[name].env[k] = normalizeEnv(parts[name]);
            } else {
              config[name].env[k] = k in process.env ? "" : settings[k];
            }
          }
        }
      }
    }
    await this.mg();
    await settings.DATABASE.sync();
    await pdm.MessageDB.sync();
    await this.init();
    for (const name of this.sessionsNames) {
      config[name].env.WARN_LIMIT = isNaN(Number(config[name].env.WARN_LIMIT))
        ? 3
        : Number(config[name].env.WARN_LIMIT);
      config[name].SUDO_MAP = core.parseNum(config[name].env.SUDO);
      config.preparevars(name);
      try {
        await this.sessions[name].init(this.updates);
        await new Promise((resolve) => {
          this.sessions[name].connect(() => resolve());
        });
        await core.sleep(5000);
      } catch (e) {
        core.logger.error("Error session " + settings.SESSION_ID.split(";_;")[name]);
        core.logger.error(e);
      }
    }
  }
  async close() {
    for (const name in this.sessions) {
      if (this.sessions[name]) await this.sessions[name].close(true);
    }
  }
}
exports.Client = Client;

// Filter noisy library output and route everything else through the bot logger
console.info = function () {
  const text = util.format(...arguments);
  if (!text.startsWith("Closing") && !text.startsWith("Removing old")) {
    return core.logger.info(...arguments);
  }
};
console.warn = function () {
  const text = util.format(...arguments);
  if (!text.startsWith("Closing") && !text.startsWith("Decrypted")) {
    return core.logger.warn(...arguments);
  }
};
console.error = function () {
  const text = util.format(...arguments);
  if (
    !text.startsWith("Session error") &&
    !text.startsWith("Failed to decrypt") &&
    !text.includes("`punycode`")
  ) {
    return core.logger.error(...arguments);
  }
};
