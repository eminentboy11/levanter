const ID3Writer = require("browser-id3-writer");
const { loadBaileys } = require("./baileys");
let baileysDelay;
let isJidGroup;
let isJidUser;
let getBinaryNodeChild;
let getBinaryNodeChildren;
loadBaileys()
  .then((delay) => {
    baileysDelay = delay.delay;
    isJidGroup = delay.isJidGroup;
    isJidUser = delay.isJidUser;
    getBinaryNodeChild = delay.getBinaryNodeChild;
    getBinaryNodeChildren = delay.getBinaryNodeChildren;
  })
  .catch((message) => {
    process.stderr.write("lib/index.js top-level load failed: " + message.message + "\n");
  });
const { default: axios } = require("axios");
const childProcess = require("child_process");
const pinoPretty = require("pino-pretty");
const os = require("os");
const path = require("path");
const simpleGit = require("simple-git");
const pino = require("pino");
const fsExtra = require("fs-extra");
const moment = require("moment");
const FormData = require("form-data");
exports.sleep = async (seconds = 1) => {
  baileysDelay ||= (await loadBaileys()).delay;
  await baileysDelay(seconds);
};
const config = require("../config");
exports.getDate = () => {
  const helpers = {
    nXblu: "moment-timezone",
    lLfii: "UTC",
    bhwBn: "hh:mm A",
    wQRlP: "DD/MM/YYYY",
  };
  const momentTz = require(helpers.nXblu);
  const timezone = config.TIMEZONE || process.env.TZ || helpers.lLfii;
  const zonedNow = momentTz.tz(new Date(), timezone);
  return [zonedNow.toDate(), zonedNow.format(helpers.bhwBn), zonedNow.format(helpers.wQRlP)];
};
const pinoPrettyOptions = {
  colorize: true,
  levelFirst: true,
  translateTime: "SYS:HH:MM:ss dd-mm-yy",
  ignore: "pid,hostname",
};
const pinoPrettyStream = pinoPretty(pinoPrettyOptions);
exports.logger = pino.pino(
  {
    level: "trace",
  },
  pinoPrettyStream,
);
process.on("uncaughtException", (message) => {
  const aa = {
    CUtxi: "Uncaught Exception",
    YRFpM: "EADDRINUSE",
  };
  const ab = message.message || message;
  exports.logger.error(message, aa.CUtxi);
  if (!ab.includes(aa.YRFpM)) {
    process.exit(1);
  }
});
process.on("unhandledRejection", (a8, a9) => {
  const ab = {
    mlBXF: "Unhandled Rejection",
  };
  exports.logger.error(a8, ab.mlBXF);
});
exports.lang = require("./lang");
const parseNewsLetterJId = (url) => {
  const match = url.match(/^https:\/\/whatsapp\.com\/channel\/([^\/]+)(?:\/([^\/]+))?\/?$/);
  if (match) {
    return {
      channelId: match[1],
      serverId: match[2],
    };
  } else {
    return null;
  }
};
exports.parseNewsLetterJId = parseNewsLetterJId;
const libConfig = require("./config");
const {
  getMention,
  enableMention,
  getMessage,
  setMessage,
  deleteMessage,
  mentionMessage,
  deleteCreds,
  deleteKeys,
  setPlugin,
  getPlugin,
  delPlugin,
  setPdm,
  setWarn,
  setMute,
  getMute,
  deleteWarn,
  getFilter,
  setFilter,
  deleteFilter,
  setLydia,
  getAntiLink,
  setAntiLink,
  getMsg,
  getSpam,
  setSpam,
  setAntiSpamLevel,
  setAntiSpamAction,
  setWord,
  getWord,
  addWord,
  removeWord,
  getGids,
  getFake,
  setFake,
  getDeletedMessage,
  getTMessage,
  setTMessage,
  updateTMessage,
  getBudget,
  setBudget,
  delBudget,
  delScheduleMessage,
  getScheduleMessage,
  zushi,
  yami,
  ope,
  logia,
  setAmenu,
  getAmenu,
  delAmenu,
  getTruecaller,
  setTruecaller,
  delTruecaller,
  setGroupMention,
  getGroupMention,
  setAntiGstatus,
  getAntiGstatus,
  addAntiGstatusFilter,
  removeAntiGstatusFilter,
  setAllowedUrl,
  addCode,
  removeCode,
} = require("./db/");
const backup = require("./backup");
const { getScheduleStatus, delScheduleStatus } = require("./db/mute");
const stripWhitespace = (input) => input.replace(/\s/g, "");
const { getName, resetMsgs, getMsgs, getContact, setContact, delContact } = require("./db/store");
exports.zushi = zushi;
exports.yami = yami;
exports.ope = ope;
exports.logia = logia;
exports.setAmenu = setAmenu;
exports.getAmenu = getAmenu;
exports.delAmenu = delAmenu;
exports.getTruecaller = getTruecaller;
config.logger = exports.logger;
const UPSTREAM_REPO_URL = "https://github.com/lyfe00011/levanter.git";
exports.sortObject = (source) => {
  const keys = Object.keys(source).sort();
  const sorted = {};
  keys.forEach((key) => {
    sorted[key] = source[key];
  });
  return sorted;
};
const {
  parsedJid,
  getUrl,
  waWebVersion,
  genButtonMessage,
  yts,
  forwardOrBroadCast,
  ctt,
  addSpace,
  textToStylist,
  stylishTextGen,
  formatTime,
  clearFiles,
  isUrl,
  rmComma,
  enableAntiFake,
  antiList,
  parseGistUrls,
  pluginsList,
  getQuote,
  secondsToHms,
  genHydratedButtons,
  genListMessage,
  trt,
  getFloor,
  levanter,
  store,
  song,
  escapeRegExp,
} = require("./utils");
const { downloadVideo, downloadAudio, getVideoInfo } = require("./youtube");
const { startYtLogin, clearYtCreds, isYtLoggedIn } = require("./yt-auth");
exports.startYtLogin = startYtLogin;
exports.clearYtCreds = clearYtCreds;
exports.isYtLoggedIn = isYtLoggedIn;
const YT_URL_REGEX =
  /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/;
exports.YT_URL_REGEX = YT_URL_REGEX;
const extractFileNameFromHeader = (headerValue) => {
  const helpers = {
    ruPZc: "filename[^;=\\n]*=(([\"']).*?\\2|[^;\\n]*)",
    OlToi: function (ac, ad) {
      return ac != ad;
    },
  };
  const helper = helpers;
  const match = new RegExp(helper.ruPZc).exec(headerValue);
  if (null != match && match[1]) {
    return match[1].replace(/['"]/g, "");
  } else {
    return headerValue;
  }
};
exports.takeScreenshot = async (url, fullSize) => {
  const strings = {
    WekhB: "http",
    roNgL: "&full=true",
    eXHEc: "arraybuffer",
  };
  if (!url.startsWith(strings.WekhB)) {
    url = "https://" + url;
  }
  let endpoint = "https://levanter.onrender.com/ss?url=" + encodeURIComponent(url);
  if (fullSize) {
    endpoint += strings.roNgL;
  }
  try {
    const requestOptions = {
      responseType: strings.eXHEc,
    };
    return (await axios.get(endpoint, requestOptions)).data;
  } catch (error) {
    throw new Error(exports.lang.extra.screenshot_error);
  }
};
exports.secondsToHms = secondsToHms;
exports.getQuote = getQuote;
exports.isUrl = isUrl;
exports.levanter = levanter;
exports.fetch = (...args) =>
  import("node-fetch").then(({ default: nodeFetch }) => nodeFetch(...args));
const { nameFromUrl, getBuffer, getJson, download } = require("./fetch");
exports.download = download;
const mute = require("./mute");
const events = require("./events");
const { stopInstance, restartInstance } = require("./pm2");
const { removeBg } = require("./rmbg");
const { iChecker } = require("./test/test");
const truecaller = {};
const copilot = require("./copilot");
let copilotSessions = {};
let copilotIdleTimers = {};
const COPILOT_IDLE_RESET_MS = 900000;
exports.bing = async (prompt, session) => {
  const helpers = {
    dpGpk: function (callback, ac, ad) {
      return callback(ac, ad);
    },
  };
  try {
    copilotSessions[session] ||= new copilot(libConfig[session].env.BING_COOKIE);
    if (copilotIdleTimers[session]) {
      clearTimeout(copilotIdleTimers[session]);
    }
    copilotIdleTimers[session] = helpers.dpGpk(
      setTimeout,
      () => {
        if (copilotSessions[session]) {
          copilotSessions[session].resetConversation();
          delete copilotSessions[session];
          delete copilotIdleTimers[session];
        }
      },
      COPILOT_IDLE_RESET_MS,
    );
    const payload = {
      prompt,
    };
    return (await copilotSessions[session].chat(payload)).result;
  } catch (error) {
    {
      throw new Error(error.message);
    }
  }
};
const isSpotifyUrl = (url) => {
  const strings = {
    gBNio: "https://open.spotify.com/(playlist|track)/([a-zA-Z0-9]+)?",
  };
  const pattern = new RegExp(strings.gBNio);
  const match = url.match(pattern);
  return !!match && !!match[2] && match[1];
};
exports.IsSpotify = (url) => isSpotifyUrl(url);
const truecallerLoginState = {
  number: "",
  otp: "",
  login: false,
  id: "",
  token: "",
};
const truecallerLoginSession = truecallerLoginState;
const spotifyApiUrl = "https://right-annmaria-lev-8a3a4814.koyeb.app";
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
exports.dowloadTrack = async (url) => {
  const helpers = {
    UEDoA: "arraybuffer",
    jscJF: function (callback, ab) {
      return callback(ab);
    },
    rplsq: "content-disposition",
    yWZdu: "http",
    XMRWI: "track.mp3",
  };
  try {
    const requestOptions = {
      responseType: helpers.UEDoA,
    };
    const response = await axios.get(
      spotifyApiUrl + "/spotify/download/?url=" + url,
      requestOptions,
    );
    return {
      title:
        helpers.jscJF(extractFileNameFromHeader, response.headers[helpers.rplsq]) ||
        (url.startsWith(helpers.yWZdu) ? helpers.XMRWI : url + ".mp3"),
      buffer: response.data,
    };
  } catch (error) {
    throw new Error(exports.lang.plugins.common.spotify_download_failed);
  }
};
exports.getSpotifyPlaylist = async (url) => {
  try {
    {
      return (await axios.get(spotifyApiUrl + "/spotify/playlist/?url=" + url)).data.result;
    }
  } catch (error) {
    throw new Error(exports.lang.plugins.common.spotify_playlist_failed);
  }
};
exports.parseSchedule = (text) => {
  const helpers = {
    jingF: function (value, ak) {
      return value + ak;
    },
    NYjYD: "once",
    hlUmz: "repeat",
    qnBta: "every",
  };
  const helper = helpers;
  const jidRegex = /[\w-]+@(s\.whatsapp\.net|g\.us)/g;
  const jids = text.match(jidRegex) || [];
  const rest = text.replace(jidRegex, "").trim().replace(/^,|,$/g, "").trim();
  const timeMatch = rest.match(/^([0-9*\/\- ,:]+)/);
  const time = timeMatch ? timeMatch[0].trim() : null;
  let scheduleText = time
    ? rest
        .slice(helper.jingF(rest.indexOf(time), time.length))
        ?.replace(/^[, ]+/, "")
        .trim()
    : null;
  let repeatMode = helper.NYjYD;
  if (
    scheduleText &&
    (scheduleText.includes(helper.hlUmz) || scheduleText.includes(helper.qnBta))
  ) {
    repeatMode = helper.hlUmz;
  }
  return {
    jids,
    time,
    once: repeatMode,
  };
};
exports.nlpSchedule = async (text, session) => {
  const helpers = {
    YLftY: "once",
    VYOas: function (ah, ai) {
      return ah === ai;
    },
    KblZW: "pARCO",
    FwpHa: "dnsBy",
  };
  const helper = helpers;
  const [date, timeText] = exports.getDate();
  const prompt =
    "You are a helpful assistant that extracts schedule details from natural language for a WhatsApp bot.\nCurrent local time: " +
    timeText +
    " (" +
    new Date(date).toDateString() +
    ').\n\nIMPORTANT: The user may write in ANY language — English, Hindi/Urdu (Romanized or native script), Arabic, Bengali, Malayalam, Spanish, French, Turkish, Indonesian, Russian, or mixed. Understand all of them.\n\n### Instructions:\n1. **Time Format**: Convert the schedule to a dash-separated string: "minute-hour-day-month-dayOfWeek".\n   - minute: 0-59\n   - hour: 0-23 (24-hour format)\n   - day: 1-31\n   - month: 1-12\n   - dayOfWeek: 0-6 (0 is Sunday)\n   - Use \'*\' for any field that repeats (e.g., "every day at 10am" -> "0-10-*-*-*").\n2. **JIDs**: Extract mentioned WhatsApp JIDs.\n   - User JIDs: Often look like "919876543210@s.whatsapp.net".\n   - Group JIDs: Often look like "1234567890-5678@g.us" or "1234567890@g.us".\n3. **Repetition**: Detect if it\'s a one-time thing ("once") or recurring ("repeat").\n   - Recurring keywords: every, daily, weekly, each, always\n     Hindi/Urdu: har din, har roz, haftay mein, har hafte\n     Arabic: يومياً, أسبوعياً, كل يوم, كل أسبوع\n     Bengali: প্রতিদিন, প্রতি সপ্তাহে, সবসময়\n     Spanish: cada día, diariamente, semanalmente, siempre\n     French: chaque jour, quotidien, hebdomadaire, toujours\n     Turkish: her gün, günlük, haftalık, her zaman\n     Indonesian: setiap hari, harian, mingguan, selalu\n     Russian: каждый день, ежедневно, еженедельно, всегда\n   - One-time keywords: once, tomorrow, next, on (date)\n     Hindi/Urdu: kal, agla, ek baar, sirf ek baar\n     Arabic: مرة واحدة, غداً, القادم\n     Bengali: একবার, আগামীকাল, পরের\n     Spanish: una vez, mañana, próximo\n     French: une fois, demain, prochain\n     Turkish: bir kez, yarın, gelecek\n     Indonesian: sekali, besok, depan\n     Russian: один раз, завтра, следующий\n\nRespond ONLY with a JSON object:\n{\n  "time": "min-hour-day-month-dayOfWeek",\n  "jids": ["jid1", "jid2"],\n  "once": "once" | "repeat"\n}';
  try {
    const rawResponse = (
      await exports.nlpComplete(prompt + '\n\nUser input: "' + text + '"', session)
    ).data
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    const parsed = JSON.parse(rawResponse);
    const result = {
      time: parsed.time,
      jids: parsed.jids || [],
      once: parsed.once || helper.YLftY,
    };
    return result;
  } catch (error) {
    {
      return null;
    }
  }
};
exports.nlpBudget = async (text, session) => {
  const helpers = {
    oNDls: "income",
    gyoJb: "expense",
  };
  const [date, , dateText] = exports.getDate();
  const prompt =
    "You are a helpful assistant that extracts budget/financial transaction details from natural language for a WhatsApp bot.\nCurrent date: " +
    dateText +
    " (" +
    new Date(date).toDateString() +
    ').\n\nIMPORTANT: The user may write in ANY language — English, Hindi (Romanized or Devanagari), Urdu, Arabic, Bengali, Malayalam (Romanized or script), Spanish, French, Turkish, Indonesian, Russian, or mixed. Understand all of them.\n\n### Instructions:\n1. **Type**: Determine if the transaction is "income" or "expense".\n   - Income: salary, earned, received, got paid, freelance, bonus, refund, cashback, sold, profit\n     Hindi/Urdu: mili, aaya, kamaya, tankhwah, salary mili\n     Arabic: راتب, استلمت, دخل, بعت\n     Bengali: পেয়েছি, বেতন, আয়\n     Spanish: recibí, salario, ingreso, gané\n     French: reçu, salaire, revenu, gagné\n     Turkish: aldım, maaş, gelir\n     Indonesian: dapat, gaji, terima\n     Russian: получил, зарплата, доход\n   - Expense: spent, paid, bought, cost, bill, rent, food, taxi, coffee, subscription, fee\n     Hindi/Urdu: kharch, diya, liya, kharida, bhara\n     Arabic: صرفت, دفعت, اشتريت, حساب\n     Bengali: খরচ, দিয়েছি, কিনেছি\n     Spanish: gasté, pagué, compré\n     French: dépensé, payé, acheté\n     Turkish: harcadım, ödedim, aldım\n     Indonesian: habis, bayar, beli\n     Russian: потратил, заплатил, купил\n   - If ambiguous, default to "expense".\n\n2. **Amount**: Extract the numeric amount. Must be a positive number.\n   - Handle currency symbols ($, Rs, ₹, USD, ر.س, ₽, €, ₺, Rp, etc.) — extract only the number.\n\n3. **Category**: Classify into one of these categories:\n   food, transport, shopping, entertainment, bills, rent, salary, freelance, investment, health, education, groceries, subscriptions, travel, gifts, utilities, other\n   - Pick the most specific match. If none fits, use "other".\n\n4. **Remark**: A brief description (max 5 words) in the SAME language the user used.\n   - If no extra context, use empty string "".\n\nRespond ONLY with a JSON object:\n{\n  "type": "income" | "expense",\n  "amount": <number>,\n  "category": "<string>",\n  "remark": "<string>"\n}';
  try {
    {
      const rawResponse = (
        await exports.nlpComplete(prompt + '\n\nUser input: "' + text + '"', session)
      ).data
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      const parsed = JSON.parse(rawResponse);
      if (parsed.type && parsed.amount && !isNaN(parsed.amount) && parsed.category) {
        return {
          type: helpers.oNDls === parsed.type ? helpers.oNDls : helpers.gyoJb,
          amount: Math.abs(Number(parsed.amount)),
          category: parsed.category.toLowerCase(),
          remark: parsed.remark || "",
        };
      } else {
        return null;
      }
    }
  } catch (error) {
    return null;
  }
};
const {
  addExif,
  getFfmpegBuffer,
  cropsticker,
  sticker,
  audioCut,
  avm,
  videoHeightWidth,
  videoTrim,
  mergeVideo,
  blackVideo,
  cropVideo,
  SpeachToText,
  videoToGif,
  circleSticker,
} = require("./fFmpeg");
const { aliveMessage, getUptime, uptimeQuoteReplace } = require("./alive");
const { setCmd, getCmd, delCmd, phonesList } = require("./cmd");
const { participateInVote, newVote } = require("./vote");
const { greetingsPreview, genGreetings, enableGreetings, clearGreetings } = require("./greetings");
const {
  getImgUrl,
  buttonMessage,
  toPdf,
  getCommon,
  getGPTResponse,
  getDallEResponse,
} = require("./misc");
const eL = {};
const pdfkit = require("pdfkit");
const { setVar, getVars, delVar, upKoyeb, updateRender } = require("./vars");
const { setData, getData, delData } = require("./db");
const { fontType } = require("./fancy");
const { ticTacToe, isGameActive, deleteTicTacToe } = require("./tictactoe");
const { setCmdState } = require("./db/cmd");
const { textMaker } = require("./textmaker");
const { genThumbnail, extractVideoThumb, TEMP_DIR } = require("./constant");
exports.genThumbnail = genThumbnail;
exports.extractVideoThumb = extractVideoThumb;
exports.TEMP_DIR = TEMP_DIR;
exports.setBudget = setBudget;
exports.delBudget = delBudget;
const { photoEditor } = require("./editors");
const { img } = require("./img");
exports.isValidDate = (dateString) => moment(dateString, "D MMMM YYYY").isValid();
const TRUECALLER_LOGIN_PROMPT = exports.lang.plugins.common.truecaller_login_prompt;
const {
  instagram,
  facebook,
  story,
  tiktok,
  twitter,
  y2mate,
  pinterest,
  pinterestSearch,
  webpToMp4,
  mediafire,
  apkMirror,
  reddit,
} = require("./ss/");
const { lydia, chatBot } = require("./lydia");
exports.bot = events.addCommand;
exports.chainCmd = async (command, message, session) => {
  if (events.cammands[command]) {
    await events.cammands[command].function(message, session);
  }
};
const parsePluginHooks = (source) => {
  const matches = [...source.matchAll(/on:\s*['"]([^'"]+)['"],\s*[^}]*type:\s*['"]([^'"]+)['"]/g)];
  if (matches.length > 0) {
    return matches.map((match, index) => ({
      on: match[1],
      type: match[2],
    }));
  } else {
    return [];
  }
};
exports.removePlugin = (pluginName, session) => {
  const helpers = {
    ZuUFX: function (value, ai) {
      return value + ai;
    },
    vAIdW: function (value, ai) {
      return value + ai;
    },
    IODOf: "../eplugins/",
    myXqk: ".js",
    MRfRR: "utf-8",
  };
  const filePath = path.join(
    __dirname,
    helpers.ZuUFX(helpers.vAIdW(helpers.IODOf + session, pluginName), helpers.myXqk),
  );
  if (!fsExtra.existsSync(filePath)) {
    return;
  }
  const readOptions = {
    encoding: helpers.MRfRR,
  };
  const source = fsExtra.readFileSync(filePath, readOptions);
  const commands = pluginsList(source);
  const hooks = parsePluginHooks(source);
  for (const commandName of commands) {
    if (libConfig[session]?.cammands) {
      delete libConfig[session].cammands[commandName];
    }
  }
  for (const hook of hooks) {
    if (libConfig[session]?.cammands) {
      delete libConfig[session].cammands["" + hook.on + hook.type];
    }
  }
  delete require.cache[require.resolve(filePath)];
  fsExtra.unlinkSync(filePath);
};
exports.installPlugin = (pluginPath, session) => {
  const helpers = {
    TXtQh: "/eplugin",
  };
  try {
    libConfig.plc = session;
    libConfig.pt = pluginPath.includes(helpers.TXtQh);
    require(pluginPath);
  } finally {
    {
      libConfig.plc = null;
      libConfig.pt = null;
    }
  }
};
exports.addTask = mute.addTask;
exports.getGPTResponse = getGPTResponse;
const ICHECKER_SECRET = "aWxvdmV5b3Vzb29vb29vbWF0Y2hidXRpZG9udGtub3d3aHlpbGlrZWxvdmV3YW50dQ==";
exports.getDallEResponse = getDallEResponse;
exports.setupBackupCron = backup.setupBackupCron;
exports.escapeRegExp = escapeRegExp;
const checkerValue = iChecker();
const GROQ_API_KEY_FALLBACK = Buffer.from(
  "Z3NrX0NNWHpRTXRwSVlSODNIRDhxWmsxV0dkeWIzRllzWjEydFBYN0xhTFpRMlVNUTVmSW9aWU0=",
  "base64",
).toString("utf-8");
class PDFDocument extends pdfkit {
  constructor(a7) {
    super(a7);
  }
  create(payload) {
    const helpers = {
      qUjJU: "justify",
      DKiKe: function (aj, ak) {
        return aj > ak;
      },
      gbhHc: function (value, ak) {
        return value + ak;
      },
      maoLG: "black",
      OtlNm: "green",
      DsFIn: "red",
      zdZcT: "nckdv",
      VajYw: function (aj, ak) {
        return aj < ak;
      },
      CUDoH: function (value, ak) {
        return value + ak;
      },
      VhjWV: function (aj, ak) {
        return aj * ak;
      },
      HBBLP: "Helvetica",
      TQXON: function (aj, ak) {
        return aj - ak;
      },
      DUmCF: function (aj, ak) {
        return aj - ak;
      },
      AERGN: function (aj, ak) {
        return aj - ak;
      },
      GErpt: "pageAdded",
      iRNag: "Helvetica-Bold",
      poctf: function (value, ak) {
        return value + ak;
      },
    };
    let left = this.page.margins.left;
    let aa = this.y;
    const length = payload.headers.length;
    const TQXON = helpers.TQXON(
      helpers.DUmCF(this.page.width, this.page.margins.left),
      this.page.margins.right,
    );
    const headers = (aj) => {
      let count = 0;
      aj.forEach((al) => {
        {
          const payload = {
            width: AERGN,
            align: helpers.qUjJU,
          };
          const heightOfString = this.heightOfString(al, payload);
          count = Math.max(count, heightOfString);
        }
      });
      return count + 5;
    };
    let AERGN = helpers.AERGN(TQXON / length, 15);
    const AERGN2 = helpers.AERGN(this.page.height, this.page.margins.bottom);
    let count = 0;
    this.on(helpers.GErpt, () => {
      {
        aa = this.page.margins.top;
        count = 0;
      }
    });
    this.font(helpers.iRNag);
    if (helpers.DKiKe(helpers.poctf(aa, helpers.VhjWV(3, headers(payload.headers))), AERGN2)) {
      this.addPage();
    }
    aa = Math.max(aa, 100);
    const ai = 80;
    payload.headers.forEach((aj, count) => {
      const al = 0 == count ? ai : 1 == count ? 135 : 2 == count ? 280 : 450;
      const payload = {
        width: AERGN,
        align: helpers.qUjJU,
      };
      this.text(aj, al, aa, payload);
    });
    count = Math.max(helpers.gbhHc(aa, headers(payload.headers)), count);
    this.moveTo(left, count - 2.5)
      .lineTo(left + TQXON, count - 2.5)
      .lineWidth(1.5)
      .stroke();
    payload.rows.forEach((aj, ak) => {
      const al = {
        erYvP: helpers.zdZcT,
        BrRfN: function (am, an) {
          return am - an;
        },
        aNDGV: helpers.maoLG,
        ivqMj: helpers.OtlNm,
        anDRr: helpers.DsFIn,
        cAalV: helpers.qUjJU,
      };
      {
        let am = headers(aj);
        if (helpers.VajYw(helpers.CUDoH(aa, 3 * am), AERGN2)) {
          aa = count + 5;
        } else {
          this.addPage();
        }
        this.font(helpers.HBBLP).fontSize(11);
        aj.forEach((text, count) => {
          const au = text.length > 20 ? 20 : al.BrRfN(25, 3 * text.length);
          const av = 0 == count ? ai : 1 == count ? 120 : 2 == count ? 210 : 450 + au;
          AERGN = 2 == count ? 220 : AERGN;
          am = headers(aj);
          let aw = al.aNDGV;
          if (3 == count && text.startsWith("+")) {
            aw = al.ivqMj;
            text = text.replace("+", "");
          } else if (3 == count && text.startsWith("-")) {
            aw = al.anDRr;
            text = text.replace("-", "");
          }
          this.fillColor(aw);
          this.text(text, av, aa, {
            width: AERGN,
            align: al.cAalV,
          });
        });
        count = Math.max(aa + am, count);
        this.moveTo(left, count - 2.5)
          .lineTo(left + TQXON, count - 2.5)
          .lineWidth(1)
          .dash(1, {
            space: 0.5,
          })
          .opacity(0.1)
          .stroke()
          .opacity(1);
      }
    });
    this.x = left;
    this.moveDown();
    return this;
  }
}
const isCheckerValid = checkerValue == ICHECKER_SECRET;
const jidToNum = (a7 = "") =>
  a7.replace(/@s\.whatsapp\.net|@lid/g, "").replace(/[()\@\+\-\.a-zA-Z ]/g, "");
exports.isAdmin = async (participants, jid) => {
  const roles = {
    othym: "admin",
    hxLJL: "superadmin",
  };
  let member = participants.find((ab) => ab.phoneNumber === jid || ab.id === jid);
  if (!member) {
    const lid = await libConfig.getLid(jid);
    if (lid) {
      member = participants.find((ac) => ac.id === lid);
    }
    if (!member) {
      {
        const participantsSample = JSON.stringify(participants.slice(0, 3));
        throw new Error(
          exports.lang.plugins.common.group_not_found.format(jidToNum(jid), participantsSample),
        );
      }
    }
  }
  return roles.othym === member.admin || roles.hxLJL === member.admin;
};
exports.getImgUrl = getImgUrl;
exports.buttonMessage = buttonMessage;
exports.PDF = toPdf;
exports.getCommon = getCommon;
exports.textMaker = textMaker;
exports.genGreetings = genGreetings;
exports.enableGreetings = enableGreetings;
exports.greetingsPreview = greetingsPreview;
exports.clearGreetings = clearGreetings;
exports.setData = setData;
exports.getData = getData;
exports.delData = delData;
exports.setVar = setVar;
exports.getVars = getVars;
exports.delVar = delVar;
const numToJid = (number) => {
  const helpers = {
    jpRYa: function (left, right) {
      return left != right;
    },
    XDbUv: "string",
  };
  const helper = helpers;
  if (helper.jpRYa(helper.XDbUv, typeof number)) {
    return null;
  }
  return number.replace(/[\+\s\-\(\)]/g, "") + "@s.whatsapp.net";
};
exports.numToJid = numToJid;
exports.getJid = async (jid, session) =>
  (jid && session && jid.endsWith("@lid") && (await libConfig[session]?.findJid?.(jid))) || jid;
const parseVCard = (vcardText) => {
  const markers = {
    fXOtH: "TEL",
    bfTHZ: "END:VCARD",
  };
  const text = vcardText.toString();
  const contacts = [];
  text.split(markers.bfTHZ).forEach((block) => {
    {
      if (!block.trim()) {
        return;
      }
      const contact = {};
      block.split(/\r?\n/).forEach((line) => {
        {
          if (line.startsWith("FN")) {
            contact.name = line.substring(3);
          } else if (line.startsWith(markers.fXOtH)) {
            const digits = line.replace(/\D/g, "");
            if (/^\d+$/.test(digits)) {
              contact.phone = digits;
            }
          }
        }
      });
      if (contact.name && contact.phone) {
        contact.jid = numToJid(contact.phone);
        contacts.push(contact);
      }
    }
  });
  return contacts;
};
const queryUsync = async (users, contactNode, queryFn, sid) => {
  const helpers = {
    TQgPh: function (callback, ah) {
      return callback(ah);
    },
    WgaSj: "@s.whatsapp.net",
    JZlow: "get",
    hxlMd: "usync",
    BGpaO: "query",
    nbEkO: "true",
    OLAfa: "interactive",
    DsuCO: "list",
    rdJOJ: "user",
  };
  if (!getBinaryNodeChild) {
    {
      const baileys = await loadBaileys();
      getBinaryNodeChild = baileys.getBinaryNodeChild;
      getBinaryNodeChildren = baileys.getBinaryNodeChildren;
    }
  }
  const iqResponse = await helpers.TQgPh(queryFn, {
    tag: "iq",
    attrs: {
      to: helpers.WgaSj,
      type: helpers.JZlow,
      xmlns: helpers.hxlMd,
    },
    content: [
      {
        tag: helpers.hxlMd,
        attrs: {
          sid,
          mode: helpers.BGpaO,
          last: helpers.nbEkO,
          index: "0",
          context: helpers.OLAfa,
        },
        content: [
          {
            tag: helpers.BGpaO,
            attrs: {},
            content: [contactNode],
          },
          {
            tag: helpers.DsuCO,
            attrs: {},
            content: users,
          },
        ],
      },
    ],
  });
  const usyncNode = getBinaryNodeChild(iqResponse, helpers.hxlMd);
  const listNode = getBinaryNodeChild(usyncNode, helpers.DsuCO);
  return getBinaryNodeChildren(listNode, helpers.rdJOJ);
};
const resolveContactJids = async (numbers, session) => {
  const helpers = {
    aIlVU: "contact",
    MzDWt: function (callback, ac, ad, af, ag) {
      return callback(ac, ad, af, ag);
    },
  };
  if (!getBinaryNodeChild) {
    const baileys = await loadBaileys();
    getBinaryNodeChild = baileys.getBinaryNodeChild;
    getBinaryNodeChildren = baileys.getBinaryNodeChildren;
  }
  if (!Array.isArray(numbers)) {
    numbers = [numbers];
  }
  const userNodes = numbers.map((text) => ({
    tag: "user",
    attrs: {},
    content: [
      {
        tag: "contact",
        attrs: {},
        content: "+" + text.replace("+", ""),
      },
    ],
  }));
  return (
    await helpers.MzDWt(
      queryUsync,
      userNodes,
      {
        tag: helpers.aIlVU,
        attrs: {},
      },
      libConfig[session].sock.query,
      libConfig[session].sock.generateMessageTag(),
    )
  )
    .map((attrs) => {
      {
        const binaryNodeChild = getBinaryNodeChild(attrs, helpers.aIlVU);
        if (binaryNodeChild && "in" === binaryNodeChild.attrs.type) {
          return attrs.attrs.jid;
        } else {
          return null;
        }
      }
    })
    .filter((ac) => ac !== null);
};
exports.importContacts = async (vcard, sock) => {
  if (!sock) {
    throw new Error(exports.lang.extra.id_missing);
  }
  const parsedContacts = parseVCard(vcard);
  const onWhatsappJids = (await sock.onWhatsapp(parsedContacts.map((entry) => entry.phone)))
    .filter((exists) => exists.exists)
    .map((jid) => jid.jid);
  const jidSet = new Set(onWhatsappJids);
  const existingContacts = parsedContacts.filter((jid) => jidSet.has(jid.jid));
  if (existingContacts.length > 0) {
    libConfig[sock.id].contacts = existingContacts;
  }
  return existingContacts;
};
exports.flushContacts = async (session) => {
  const helpers = {
    QKAji: "all",
  };
  if (!session) {
    throw new Error(exports.lang.extra.id_missing);
  }
  libConfig[session].contacts = [];
  return delContact(helpers.QKAji, session);
};
exports.addContacts = async (name, number, session) => {
  const helpers = {
    LVTCC: function (callback, ag, ah) {
      return callback(ag, ah);
    },
    VXLgR: function (callback, ag, ah) {
      return callback(ag, ah);
    },
  };
  if (!session) {
    throw new Error(exports.lang.extra.id_missing);
  }
  const resolved = await helpers.LVTCC(resolveContactJids, [number], session);
  if (0 === resolved.length) {
    throw new Error(exports.lang.extra.not_on_whatsapp.format(number));
  }
  const newContact = {
    name,
    jid: resolved[0].jid,
  };
  return helpers.VXLgR(setContact, [newContact], session);
};
exports.removeContacts = async (number, session) => {
  const helpers = {
    RHAig: function (callback, ab, ac) {
      return callback(ab, ac);
    },
    ueCGo: "all",
  };
  if (!session) {
    throw new Error(exports.lang.extra.id_missing);
  }
  return helpers.RHAig(delContact, helpers.ueCGo === number ? number : numToJid(number), session);
};
exports.saveContacts = async (index) => {
  if (!index) {
    throw new Error(exports.lang.extra.id_missing);
  }
  if (0 === libConfig[index].contacts.length) {
    throw new Error(exports.lang.plugins.common.import_contacts_first);
  }
  return setContact(libConfig[index].contacts, index);
};
exports.listContacts = async (a7) => {
  const helpers = {
    vDWRC: "all",
  };
  if (!a7) {
    throw new Error(exports.lang.extra.id_missing);
  }
  return getContact(helpers.vDWRC, a7);
};
exports.existContacts = async (a7, a8) => {
  const helpers = {
    CzuTK: function (callback, ab, ac) {
      return callback(ab, ac);
    },
  };
  if (!a8) {
    throw new Error(exports.lang.extra.id_missing);
  }
  return helpers.CzuTK(getContact, numToJid(a7), a8);
};
exports.jidToNum = jidToNum;
exports.genThumbnail = genThumbnail;
exports.extractVideoThumb = extractVideoThumb;
exports.photoEditor = photoEditor;
exports.parseNum = (number = "") => {
  if (!number) {
    return [];
  }
  const digits = (number = number.replace(/[+\s]+/g, "")).match(/\d+/g);
  return digits || [];
};
exports.lydia = lydia;
exports.chatBot = chatBot;
exports.TogCmd = async function (index, a8, index2) {
  if (index in libConfig[index2].cammands) {
    libConfig[index2].cammands[index].active = "on" == a8;
  }
  await setCmdState(index, a8, index2);
};
exports.setAfk = (isAfk, reason, lastSeen, phone, session) => {
  const afkState = {
    isAfk,
    reason,
    lastseen: lastSeen,
    p: phone,
  };
  libConfig[session].AFK = afkState;
};
exports.cached = {};
let listIdCounter = 100;
exports.getFake = getFake;
exports.addCode = addCode;
exports.removeCode = removeCode;
exports.setFake = setFake;
exports.getGids = getGids;
exports.setWord = setWord;
exports.getWord = getWord;
exports.addWord = addWord;
exports.removeWord = removeWord;
exports.setSpam = setSpam;
exports.getSpam = getSpam;
exports.setAntiSpamLevel = setAntiSpamLevel;
exports.setAntiSpamAction = setAntiSpamAction;
exports.getMsg = getMsgs;
exports.getName = getName;
exports.setAntiLink = setAntiLink;
exports.getAntiLink = getAntiLink;
exports.setAllowedUrl = setAllowedUrl;
exports.normalizeUrl = require("./antilink").normalizeUrl;
exports.setLydia = setLydia;
exports.getFilter = getFilter;
exports.deleteFilter = deleteFilter;
exports.setFilter = setFilter;
exports.deleteWarn = deleteWarn;
exports.getMute = getMute;
exports.setMute = setMute;
exports.delMute = require("./db/").delMute;
exports.setWarn = setWarn;
exports.setPdm = setPdm;
exports.getMention = getMention;
exports.enableMention = enableMention;
exports.setMessage = setMessage;
exports.deleteMessage = deleteMessage;
exports.mentionMessage = mentionMessage;
exports.getMessage = getMessage;
exports.deleteCreds = deleteCreds;
exports.deleteKeys = deleteKeys;
exports.setPlugin = setPlugin;
exports.getPlugin = getPlugin;
exports.delPlugin = delPlugin;
exports.resetMsgs = resetMsgs;
exports.setTMessage = setTMessage;
exports.getTMessage = getTMessage;
exports.updateTMessage = updateTMessage;
exports.getDeletedMessage = getDeletedMessage;
exports.filteredArray = (value, separator = ",") => {
  if (!Array.isArray(value)) {
    value = value.split(separator);
  }
  return Array.from(new Set(value));
};
const genNumb = (template, onMatch, placeholder) => {
  const token = placeholder || "x";
  const attempts = template.includes(token) ? 10 : 1;
  const tokenRegex = new RegExp(token);
  for (let index = 0; index < attempts; index++) {
    const candidate = template.replace(token, index);
    if (!tokenRegex.test(candidate)) {
      onMatch(candidate, index);
    }
    if (tokenRegex.test(candidate)) {
      genNumb(candidate, onMatch, placeholder);
    }
  }
};
exports.getFloor = getFloor;
exports.trt = trt;
exports.genListMessage = genListMessage;
exports.rmComma = rmComma;
exports.parsedJid = parsedJid;
exports.getUrl = getUrl;
exports.genButtonMessage = genButtonMessage;
exports.yts = yts;
exports.video = async (url, session, options = {}) => await downloadVideo(url, session, options);
exports.forwardOrBroadCast = forwardOrBroadCast;
exports.ctt = ctt;
exports.addSpace = addSpace;
exports.textToStylist = textToStylist;
exports.stylishTextGen = stylishTextGen;
exports.formatTime = formatTime;
exports.clearFiles = clearFiles;
exports.enableAntiFake = enableAntiFake;
exports.antiList = antiList;
exports.waWebVersion = waWebVersion;
exports.parseGistUrls = parseGistUrls;
exports.pluginsList = pluginsList;
exports.genHydratedButtons = genHydratedButtons;
exports.setGroupMention = setGroupMention;
exports.getGroupMention = getGroupMention;
exports.setAntiGstatus = setAntiGstatus;
exports.getAntiGstatus = getAntiGstatus;
exports.addAntiGstatusFilter = addAntiGstatusFilter;
exports.removeAntiGstatusFilter = removeAntiGstatusFilter;
const levanterTimeout = async (file, timeoutMs) => {
  const a9 = {
    TTcgG: "statusa",
  };
  const MIN_TIMEOUT_MS = 60000;
  if (!timeoutMs || !!isNaN(timeoutMs)) {
    timeoutMs = MIN_TIMEOUT_MS;
  }
  if (timeoutMs < MIN_TIMEOUT_MS) {
    timeoutMs = MIN_TIMEOUT_MS;
  }
  levanter.emit(a9.TTcgG, {
    f: file,
    t: timeoutMs,
  });
};
const TOKEN_XOR_KEY = 4599;
function decodeToken(encoded) {
  const helpers = {
    jRkbA: function (ac, ad) {
      return ac < ad;
    },
    Ubqhk: function (ac, ad) {
      return ac - ad;
    },
  };
  const helper = helpers;
  let decoded = "";
  for (let index = 0; index < encoded.length; index++) {
    decoded += String.fromCharCode(helper.Ubqhk(encoded.charCodeAt(index), TOKEN_XOR_KEY));
  }
  return decoded;
}
const isRetryableError = (error) => {
  const helpers = {
    HSNHZ: function (ac, ad) {
      return ac === ad;
    },
    TELtP: "ECONNABORTED",
    oOFsW: function (ac, ad) {
      return ac >= ad;
    },
  };
  const helper = helpers;
  if (!error) {
    return false;
  }
  if (helper.TELtP === error.code) {
    return true;
  }
  if (!error.response) {
    return true;
  }
  const status = error.response.status;
  return 429 === status || status >= 500;
};
const sleep = (a7) => new Promise((a8) => setTimeout(a8, a7));
const formatError = (a7) => {
  const helpers = {
    fPIOh: "unknown",
    cuoiE: "utf8",
    DvaJG: function (a9, aa) {
      return a9 == aa;
    },
    UkdOc: "object",
    hojTy: function (value, aa) {
      return value + aa;
    },
    DOpEl: "ECONNABORTED",
    lBkBA: "timeout",
  };
  if (!a7) {
    return helpers.fPIOh;
  }
  if (a7.response) {
    {
      let responseData = a7.response.data;
      responseData = Buffer.isBuffer(responseData)
        ? responseData.toString(helpers.cuoiE)
        : responseData && helpers.DvaJG(helpers.UkdOc, typeof responseData)
          ? responseData.error?.message || JSON.stringify(responseData)
          : null == responseData
            ? ""
            : String(responseData);
      return ("" + a7.response.status + (responseData ? " " + responseData : "")).slice(0, 240);
    }
  }
  if (helpers.DOpEl === a7.code) {
    return helpers.lBkBA;
  } else {
    return helpers.hojTy(a7.code ? a7.code + ": " : "", a7.message || String(a7));
  }
};
const aiSessions = new Map();
const AI_SESSION_TTL_MS = 1800000;
const aiSessionSet = (key, entry) => {
  const helpers = {
    uXkIJ: function (callback, ab, ac) {
      return callback(ab, ac);
    },
  };
  if (entry.timeoutId) {
    clearTimeout(entry.timeoutId);
  }
  entry.timeoutId = helpers.uXkIJ(setTimeout, () => aiSessions.delete(key), AI_SESSION_TTL_MS);
  entry.timeoutId.unref?.();
  aiSessions.set(key, entry);
};
const aiSessionDelete = (key) => {
  const entry = aiSessions.get(key);
  if (entry) {
    if (entry.timeoutId) {
      clearTimeout(entry.timeoutId);
    }
    aiSessions.delete(key);
  }
};
let geminiModelCache = {
  model: null,
  expires: 0,
};
const isModelUnavailable = (error) => {
  const helpers = {
    RGOIz: function (ad, af) {
      return ad === af;
    },
    sVFRK: "not available",
    qyDjS: "not found",
    SjNaH: "no longer available",
    AmgHC: "is not supported",
  };
  const helper = helpers;
  const status = error && error.response && error.response.status;
  const message = (
    (error &&
      error.response &&
      error.response.data &&
      error.response.data.error &&
      error.response.data.error.message) ||
    ""
  ).toLowerCase();
  return (
    404 === status ||
    message.includes(helper.sVFRK) ||
    message.includes(helper.qyDjS) ||
    message.includes(helper.SjNaH) ||
    message.includes(helper.AmgHC)
  );
};
const resolveGeminiModel = async (apiKey) => {
  const helpers = {
    biEit: function (ai, aj) {
      return ai < aj;
    },
    YJBwS: "https://generativelanguage.googleapis.com/v1beta/models?pageSize=200",
    pXTVK: "gemini-flash-latest",
    XsdRe: function (value, aj) {
      return value + aj;
    },
  };
  const helper = helpers;
  if (geminiModelCache.model && helper.biEit(Date.now(), geminiModelCache.expires)) {
    return geminiModelCache.model;
  }
  const headers = {
    "x-goog-api-key": apiKey,
  };
  const requestOptions = {
    timeout: 15000,
    headers,
  };
  const models = ((await axios.get(helper.YJBwS, requestOptions)).data.models || [])
    .filter((ai) => (ai.supportedGenerationMethods || []).includes("generateContent"))
    .map((name) => name.name.replace("models/", ""))
    .map((text) => {
      const match = text.match(/^gemini-(\d+)(?:\.(\d+))?-flash$/);
      if (match) {
        return {
          n: text,
          major: +match[1],
          minor: +(match[2] || 0),
        };
      } else {
        return null;
      }
    })
    .filter(Boolean)
    .sort((major, major2) => major2.major - major.major || major2.minor - major.minor);
  const ah = (models[0] && models[0].n) || helper.pXTVK;
  geminiModelCache = {
    model: ah,
    expires: helper.XsdRe(Date.now(), 21600000),
  };
  exports.logger.info("gemini: auto-discovered model " + ah);
  return ah;
};
exports.gemini = async function (text, session, media, options) {
  const helpers = {
    ctqBi: "/eplugin",
    cAvmy: function (callback, ax) {
      return callback(ax);
    },
    OLWNP: "iYghU",
    sdZUd: "yHOYv",
    LbcMn: function (aw, ax) {
      return aw || ax;
    },
    bPdsT: "low",
    TLtqR: "application/json",
    cMfet: "gemini-3.6-flash",
    ocnKE: function (value, ax) {
      return value + ax;
    },
    pxZTB: "base64",
    ivMVq: "user",
    LSVMa: "empty",
    btdGW: "model",
  };
  const env = (libConfig[session] && libConfig[session].env) || {};
  const apiKey = env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(exports.lang.plugins.common.gemini_missing_api_key);
  }
  let model = env.GEMINI_MODEL || geminiModelCache.model || helpers.cMfet;
  const requestBody = {
    text,
  };
  const hasImage = media && Buffer.isBuffer(media.image);
  const requestTimeoutMs = hasImage ? 90000 : 50000;
  const sessionKey = helpers.ocnKE(apiKey + session, options ? Date.now() : "");
  const parts = [requestBody];
  let generatedImage;
  if (hasImage) {
    parts.push({
      inline_data: {
        mime_type: media.mimetype,
        data: Buffer.from(media.image).toString(helpers.pxZTB),
      },
    });
  }
  try {
    const userMessage = {
      role: helpers.ivMVq,
      parts,
    };
    const existingSession = aiSessions.get(sessionKey);
    const history = [...(existingSession ? existingSession.history : []), userMessage];
    const model = async (aJ) => {
      const aK = {
        cJSWg: helpers.ctqBi,
        WKysM: function (aO, aP) {
          return aO >= aP;
        },
        mwuNA: function (callback, aP, aQ) {
          return callback(aP, aQ);
        },
        mijlH: helpers.OLWNP,
        cokXp: helpers.sdZUd,
        REMMy: helpers.bPdsT,
      };
      const payload = {
        contents: history,
      };
      const aM = payload;
      const aN = ((text) => {
        const aP = {
          TcZQL: aK.cJSWg,
        };
        if (aK.WKysM(aK.mwuNA(parseInt, (text.match(/gemini-(\d+)/) || [])[1], 10) || 3, 3)) {
          let aS;
          if (env.GEMINI_THINKING_LEVEL) {
            aS = String(env.GEMINI_THINKING_LEVEL).trim();
          } else if (options || hasImage) {
            aS = aK.REMMy;
          }
          if (aS) {
            return {
              thinkingLevel: aS,
            };
          } else {
            return undefined;
          }
        }
        let aQ;
        if (options) {
          aQ = 0;
        } else if (undefined !== env.GEMINI_THINKING_BUDGET && "" !== env.GEMINI_THINKING_BUDGET) {
          aQ = env.GEMINI_THINKING_BUDGET;
        } else if (hasImage) {
          aQ = 2048;
        }
        if (undefined === aQ) {
          return;
        }
        const int = parseInt(aQ, 10);
        if (Number.isNaN(int)) {
          return undefined;
        } else {
          return {
            thinkingBudget: int,
          };
        }
      })(aJ);
      if (aN) {
        aM.generationConfig = {
          thinkingConfig: aN,
        };
      }
      for (let index = 0; ; index++) {
        try {
          const aP = {
            "Content-Type": helpers.TLtqR,
            "x-goog-api-key": apiKey,
          };
          const payload = {
            timeout: requestTimeoutMs,
            headers: aP,
          };
          return await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/" + aJ + ":generateContent",
            aM,
            payload,
          );
        } catch (error) {
          if (index >= 2 || !isRetryableError(error)) {
            throw error;
          }
          await helpers.cAvmy(sleep, 0 === index ? 1000 : 2500);
        }
      }
    };
    let aA;
    try {
      {
        aA = await model(model);
      }
    } catch (error) {
      if (!isModelUnavailable(error)) {
        throw error;
      }
      const aL = await resolveGeminiModel(apiKey).catch(() => null);
      if (!aL || aL === model) {
        throw error;
      }
      model = aL;
      aA = await model(model);
    }
    const aB = aA.data?.promptFeedback?.blockReason;
    if (aB) {
      throw new Error("blocked:" + aB);
    }
    const aC = aA.data?.candidates?.[0];
    const join = (aC?.content?.parts || [])
      .map((text) => text.text)
      .filter(Boolean)
      .join("");
    if (!join) {
      throw new Error(helpers.ocnKE(helpers.LSVMa, aC?.finishReason ? ":" + aC.finishReason : ""));
    }
    const LbcMn = helpers.LbcMn(existingSession, {
      history: [],
    });
    const payload = {
      role: helpers.ivMVq,
      parts,
    };
    const payload2 = {
      role: helpers.btdGW,
      parts: aC.content.parts,
    };
    const payload3 = {
      data: join,
    };
    LbcMn.history.push(payload, payload2);
    aiSessionSet(sessionKey, LbcMn);
    return payload3;
  } catch (error) {
    generatedImage = formatError(error);
    aiSessionDelete(sessionKey);
    throw new Error(exports.lang.plugins.common.gemini_error + ": " + generatedImage);
  }
};
exports.upscale = async function (a9) {
  const aa = {
    szGcu: "arraybuffer",
  };
  try {
    const url2 = await getUrl(a9, true);
    if (!url2) {
      throw new Error(exports.lang.plugins.common.upscale_upload_failed);
    }
    const payload = {
      imageUrl: url2,
    };
    const url =
      "https://api.nekolabs.web.id/tools/pxpic/upscale?" + new URLSearchParams(payload).toString();
    const session = await axios.get(url);
    if (!session.data || !session.data.result) {
      throw new Error(exports.lang.plugins.common.upscale_invalid_response);
    }
    const payload2 = {
      responseType: aa.szGcu,
    };
    const get = await axios.get(session.data.result, payload2);
    return Buffer.from(get.data);
  } catch (error) {
    {
      throw new Error(exports.lang.plugins.common.upscale_failed);
    }
  }
};
const listCacheKey = (a7, a8) => "" + a7 + a8;
exports.generateList = function (text, value, ad, af, index, ah) {
  const helpers = {
    kBbOQ: "poll",
    MSYnp: function (value, ak) {
      return value + ak;
    },
    GQFut: "&id",
    RTRyU: function (callback, ak, al) {
      return callback(ak, al);
    },
    kGEeZ: "text",
    vylpr: function (callback, ak, al) {
      return callback(ak, al);
    },
  };
  if (Array.isArray(text) && value && ad && af) {
    {
      if (helpers.kBbOQ !== libConfig[index].env.LIST_TYPE || ah) {
        if (listIdCounter > 300) {
          listIdCounter = 100;
        }
        let aj = value + "\n";
        for (let item of text) {
          {
            aj += item._id
              ? helpers.MSYnp(item._id.replace(helpers.GQFut, listIdCounter), item.text)
              : listIdCounter + " - " + item.text + "\n";
            const cacheKey = listCacheKey(listIdCounter, index);
            const an = {
              id: listIdCounter,
              text: item.id,
              gid: ad,
              uid: af,
            };
            exports.cached[cacheKey] = an;
            helpers.RTRyU(setTimeout, () => delete exports.cached[cacheKey], 660000);
            listIdCounter++;
          }
        }
        return {
          message: aj.trimEnd(),
          type: helpers.kGEeZ,
        };
      }
      {
        text = text.slice(0, 12);
        let items = [];
        for (let item of text) {
          {
            const trimEnd = item.text.trimEnd();
            const payload = {
              optionName: trimEnd,
            };
            items.push(payload);
            exports.cached[trimEnd] = {
              id: trimEnd,
              text: item.id,
              gid: ad,
              uid: af,
            };
            helpers.vylpr(setTimeout, () => delete exports.cached[trimEnd], 660000);
          }
        }
        const payload = {
          name: value,
          options: items,
          selectableOptionsCount: 1,
        };
        const payload2 = {
          message: payload,
          type: helpers.kBbOQ,
        };
        return payload2;
      }
    }
  }
};
exports.levanterTimeout = levanterTimeout;
exports.googleImageSearch = img;
exports.nameFromUrl = nameFromUrl;
exports.getBuffer = getBuffer;
exports.getJson = getJson;
exports.apkMirror = apkMirror;
exports.instagram = instagram;
exports.facebook = facebook;
exports.story = story;
exports.tiktok = tiktok;
exports.twitter = twitter;
exports.y2mate = y2mate;
exports.pinterest = pinterest;
exports.pinterestSearch = pinterestSearch;
exports.webpToMp4 = webpToMp4;
exports.mediafire = mediafire;
exports.reddit = reddit;
exports.delTruecaller = async () => {
  truecallerLoginSession.token = "";
  truecallerLoginSession.number = "";
  truecallerLoginSession.otp = "";
  truecallerLoginSession.id = "";
  truecallerLoginSession.login = false;
  await delTruecaller();
};
exports.dall3 = async function (a8, index) {
  const aa = {
    VhslK: "https://levanter.onrender.com/dall3",
  };
  try {
    const payload = {
      prompt: a8,
      cookie: libConfig[index].env.BING_COOKIE,
    };
    return (await axios.post(aa.VhslK, payload)).data;
  } catch (error) {
    {
      throw new Error((error.response && error.response.data) || error.message);
    }
  }
};
exports.videoToGif = videoToGif;
exports.circleSticker = circleSticker;
exports.tts = SpeachToText;
exports.sticker = sticker;
exports.addExif = addExif;
exports.getFfmpegBuffer = getFfmpegBuffer;
exports.cropsticker = cropsticker;
exports.cropVideo = cropVideo;
exports.getSongName = async (text, a8) => {
  const a9 = {
    vvwFF: function (ab, ac) {
      return ab != ac;
    },
    lyeXt: "string",
  };
  if (a9.vvwFF(a9.lyeXt, typeof text)) {
    return text;
  }
  const match = text.match(YT_URL_REGEX);
  if (match) {
    {
      return (await getVideoInfo(match[1], a8)).title;
    }
  }
  return text;
};
exports.song = async (text, aa, ab = {}) => {
  const helpers = {
    CIKLu: function (aj, ak) {
      return aj == ak;
    },
    JlLmi: "string",
    smAjx: function (aj, ak) {
      return aj == ak;
    },
    yWKUD: "Invalid ID or URL provided.",
  };
  let ad;
  let af = {};
  const ag = helpers.CIKLu(helpers.JlLmi, typeof text) && text.match(YT_URL_REGEX);
  const ah = ag
    ? ag[1]
    : helpers.smAjx(helpers.JlLmi, typeof text) && 11 === text.length
      ? text
      : null;
  if (!ah) {
    throw new Error(helpers.yWKUD);
  }
  {
    {
      const videoInfo = await getVideoInfo(ah, aa);
      const payload = {
        title: videoInfo.title,
        author: videoInfo.author,
        thumbnail: videoInfo.thumbnail,
      };
      ad = await downloadAudio(ah, aa, ab);
      af = payload;
    }
  }
  const payload = {
    buffer: ad,
    ...af,
  };
  return payload;
};
exports.audioCut = audioCut;
exports.avm = avm;
exports.videoHeightWidth = videoHeightWidth;
exports.videoTrim = videoTrim;
exports.mergeVideo = mergeVideo;
exports.blackVideo = blackVideo;
exports.cropVideo = cropVideo;
exports.aliveMessage = aliveMessage;
exports.getUptime = getUptime;
exports.uptimeQuoteReplace = uptimeQuoteReplace;
const git = simpleGit.simpleGit();
git.log().then((latest) => {
  exports.formatter.n = latest.latest.author_name;
});
const clearTempDir = async () => {
  try {
    fsExtra.emptyDirSync(TEMP_DIR);
  } catch (error) {
    exports.logger.error("Failed to clear temp directory: " + error.message);
  }
};
exports.clearTempDir = clearTempDir;
setInterval(clearTempDir, 43200000);
exports.setCmd = setCmd;
exports.getCmd = getCmd;
exports.delCmd = delCmd;
exports.validateTime = mute.validateTime;
exports.participateInVote = participateInVote;
exports.createSchedule = mute.createSchedule;
exports.createStatusSchedule = mute.createStatusSchedule;
exports.getScheduleStatus = getScheduleStatus;
exports.delScheduleStatus = delScheduleStatus;
exports.deleteScheduleTask = mute.deleteScheduleTask;
exports.deleteScheduleStatusTask = mute.deleteScheduleStatusTask;
exports.newVote = newVote;
exports.delScheduleMessage = delScheduleMessage;
exports.getScheduleMessage = getScheduleMessage;
exports.getRam = () =>
  Math.floor(os.freemem() / 1048576) + "/" + Math.floor(os.totalmem() / 1048576) + "MB";
const isUpdate = async () => {
  const helpers = {
    NcmJP: "levanter",
    TtjaN: "master",
    hjCFM: "master..levanter/master",
    bsdqV: function (value, aa) {
      return value + aa;
    },
    Qcmss: "..origin/",
  };
  let a8;
  try {
    {
      if (process.env.HEROKU_TEST) {
        {
          const find = (await git.getRemotes(true)).find((name) => name.name === "levanter");
          if (find) {
            if (find.refs !== UPSTREAM_REPO_URL) {
              await git.removeRemote(helpers.NcmJP).catch(() => {});
              await git.addRemote(helpers.NcmJP, UPSTREAM_REPO_URL);
            }
          } else {
            await git.addRemote(helpers.NcmJP, UPSTREAM_REPO_URL);
          }
          await git.fetch(helpers.NcmJP, helpers.TtjaN);
          a8 = await git.log([helpers.hjCFM]);
        }
      } else {
        await git.fetch().catch(() => {});
        a8 = await git.log([helpers.bsdqV(config.BRANCH + helpers.Qcmss, config.BRANCH)]);
      }
      if (0 === a8.total) {
        return [];
      } else {
        return a8.all.map((message) => message.message).reverse();
      }
    }
  } catch (error) {
    exports.logger.error(error.message);
    stopInstance();
  }
};
const antilinkTracker = new Map();
const ANTILINK_WINDOW_MS = 900000;
const ANTILINK_MAX_MESSAGES = 10;
const setWithExpiry = (map, key, key2, aa) => {
  const ab = {
    YIRXR: function (callback, ad, af) {
      return callback(ad, af);
    },
  };
  if (key2.timeoutId) {
    clearTimeout(key2.timeoutId);
  }
  key2.timeoutId = ab.YIRXR(setTimeout, () => map.delete(key), aa);
  key2.timeoutId.unref?.();
  map.set(key, key2);
};
exports.groqResponse = async (ab, ac = "0") => {
  const helpers = {
    Edmsr: "system",
    QXTGh: "user",
    bvYUn: function (ak, al) {
      return ak === al;
    },
    xyXWf: "https://api.groq.com/openai/v1/chat/completions",
    UfMkG: function (callback, al) {
      return callback(al);
    },
    qAqtq: function (ak, al) {
      return ak > al;
    },
  };
  const ag = antilinkTracker.get(ac) || {
    messages: [],
  };
  if (0 === ag.messages.length && process.env.GROQ_SYSTEM_MSG) {
    ag.messages.push({
      role: helpers.Edmsr,
      content: process.env.GROQ_SYSTEM_MSG,
    });
  }
  ag.messages.push({
    role: helpers.QXTGh,
    content: ab,
  });
  const ah = helpers.bvYUn(helpers.Edmsr, ag.messages[0]?.role) ? [ag.messages[0]] : [];
  const slice = ag.messages.slice(ah.length).slice(-10);
  const items = [...ah, ...slice];
  try {
    let ak;
    for (let index = 0; ; index++) {
      try {
        {
          const payload = {
            messages: items,
            model: config.GROQ_MODEL,
          };
          const aq = {
            Authorization: "Bearer " + (config.GROQ_API_KEY || GROQ_API_KEY_FALLBACK),
          };
          const payload2 = {
            timeout: 40000,
            headers: aq,
          };
          ak = await axios.post(helpers.xyXWf, payload, payload2);
          break;
        }
      } catch (error) {
        {
          if (index >= 2 || !isRetryableError(error)) {
            throw error;
          }
          await helpers.UfMkG(sleep, 0 === index ? 1000 : 2500);
        }
      }
    }
    const [al] = ak.data.choices;
    ag.messages.push(al.message);
    if (helpers.qAqtq(ag.messages.length, ANTILINK_MAX_MESSAGES + ah.length)) {
      ag.messages = [...ah, ...ag.messages.slice(ah.length).slice(-10)];
    }
    setWithExpiry(antilinkTracker, ac, ag, ANTILINK_WINDOW_MS);
    return al.message.content.replace(/\*\*/g, "*");
  } catch (error) {
    const get = antilinkTracker.get(ac);
    if (get?.timeoutId) {
      clearTimeout(get.timeoutId);
    }
    antilinkTracker.delete(ac);
    throw new Error(
      (error.response && error.response.data && error.response.data.error.message) || error.message,
    );
  }
};
const antispamTracker = new Map();
const ANTISPAM_WINDOW_MS = 900000;
exports.openRouter = async (a9, aa = "0") => {
  const helpers = {
    AYzZb: function (al, am) {
      return al === am;
    },
    yjvwV: "system",
    AvYRc: "user",
    CBGUc: function (al, am) {
      return al > am;
    },
    vsTnW: "https://openrouter.ai/api/v1/chat/completions",
    BhbAE: "https://github.com/lyfe00011/levanter",
    Vfbpn: "Levanter",
    QQEZP: "error",
    NLZoH: "empty response from OpenRouter",
    HaBVO: function (callback, am) {
      return callback(am);
    },
  };
  const ac = config.OPENROUTER_API_KEY;
  if (!ac) {
    throw new Error(exports.lang.plugins.common.openrouter_missing_api_key);
  }
  const af = antispamTracker.get(aa) || {
    messages: [],
  };
  if (0 === af.messages.length && process.env.OPENROUTER_SYSTEM_MSG) {
    af.messages.push({
      role: helpers.yjvwV,
      content: process.env.OPENROUTER_SYSTEM_MSG,
    });
  }
  af.messages.push({
    role: helpers.AvYRc,
    content: a9,
  });
  const ag = helpers.AYzZb(helpers.yjvwV, af.messages[0]?.role) ? [af.messages[0]] : [];
  const slice = af.messages.slice(ag.length).slice(-10);
  const items = [...ag, ...slice];
  const filter = String(config.OPENROUTER_MODEL)
    .split(",")
    .map((text) => text.trim())
    .filter(Boolean);
  const payload = {
    messages: items,
  };
  if (filter.length > 1) {
    payload.models = filter;
  } else {
    payload.model = filter[0];
  }
  try {
    let al;
    for (let index = 0; ; index++) {
      try {
        al = await axios.post(helpers.vsTnW, payload, {
          timeout: 40000,
          headers: {
            Authorization: "Bearer " + ac,
            "HTTP-Referer": helpers.BhbAE,
            "X-Title": helpers.Vfbpn,
          },
        });
        const ap = al.data?.error;
        if (ap) {
          const error = new Error(ap.metadata?.raw || ap.message || helpers.QQEZP);
          const payload = {
            status: ap.code || al.status,
            data: al.data,
          };
          error.response = payload;
          throw error;
        }
        if (!al.data?.choices?.length) {
          throw new Error(helpers.NLZoH);
        }
        break;
      } catch (error) {
        {
          if (index >= 2 || !isRetryableError(error)) {
            throw error;
          }
          await helpers.HaBVO(sleep, 0 === index ? 1000 : 2500);
        }
      }
    }
    const [am] = al.data.choices;
    af.messages.push(am.message);
    if (helpers.CBGUc(af.messages.length, ANTILINK_MAX_MESSAGES + ag.length)) {
      af.messages = [...ag, ...af.messages.slice(ag.length).slice(-10)];
    }
    setWithExpiry(antispamTracker, aa, af, ANTISPAM_WINDOW_MS);
    return am.message.content.replace(/\*\*/g, "*");
  } catch (error) {
    {
      const get = antispamTracker.get(aa);
      if (get?.timeoutId) {
        clearTimeout(get.timeoutId);
      }
      antispamTracker.delete(aa);
      const aA = error.response && error.response.data && error.response.data.error;
      throw new Error((aA && (aA.metadata?.raw || aA.message)) || error.message);
    }
  }
};
const callAiEndpoint = async ({
  url: aa,
  apiKey: ab,
  model: ac,
  models: ad,
  prompt: af,
  extraHeaders: ag,
}) => {
  const helpers = {
    fNWPU: "user",
    rGffB: function (am, an) {
      return am || an;
    },
    LwgEt: "error",
    aAeFW: "empty response",
    OcwFR: function (callback, an) {
      return callback(an);
    },
  };
  const payload = {
    role: helpers.fNWPU,
    content: af,
  };
  const payload2 = {
    messages: [payload],
  };
  const ak = payload2;
  let al;
  if (ad && ad.length > 1) {
    ak.models = ad;
  } else {
    ak.model = ac || (ad && ad[0]);
  }
  for (let index = 0; ; index++) {
    try {
      al = await axios.post(aa, ak, {
        timeout: 40000,
        headers: {
          Authorization: "Bearer " + ab,
          ...helpers.rGffB(ag, {}),
        },
      });
      const an = al.data?.error;
      if (an) {
        const error = new Error(an.metadata?.raw || an.message || helpers.LwgEt);
        const payload = {
          status: an.code || al.status,
          data: al.data,
        };
        error.response = payload;
        throw error;
      }
      if (!al.data?.choices?.length) {
        throw new Error(helpers.aAeFW);
      }
      break;
    } catch (error) {
      {
        if (index >= 2 || !isRetryableError(error)) {
          throw error;
        }
        await helpers.OcwFR(sleep, 0 === index ? 1000 : 2500);
      }
    }
  }
  return al.data.choices[0].message.content;
};
exports.nlpComplete = async (a7, a8 = "0") => {
  const helpers = {
    cwgls: function (value, ac) {
      return value + ac;
    },
    zmkfx: function (callback, ac) {
      return callback(ac);
    },
    pZKHn: "gemini: ",
    KDRnb: "https://api.groq.com/openai/v1/chat/completions",
    wWPGC: function (value, ac) {
      return value + ac;
    },
    WIpBp: "groq: ",
    BXRZE: function (callback, ac) {
      return callback(ac);
    },
    hfPQn: "https://openrouter.ai/api/v1/chat/completions",
    ClUJu: "https://github.com/lyfe00011/levanter",
    nxhrr: "Levanter",
    CGXib: "openrouter: ",
    GzOXx: "nlp: all providers failed [",
    DDcWN: " | ",
  };
  const items = [];
  if (((libConfig[a8] && libConfig[a8].env) || {}).GEMINI_API_KEY) {
    try {
      {
        return await exports.gemini(a7, a8, null, true);
      }
    } catch (error) {
      {
        items.push(helpers.pZKHn + error.message);
      }
    }
  }
  try {
    {
      return {
        data: await helpers.zmkfx(callAiEndpoint, {
          url: helpers.KDRnb,
          apiKey: config.GROQ_API_KEY || GROQ_API_KEY_FALLBACK,
          model: config.GROQ_MODEL,
          prompt: a7,
        }),
      };
    }
  } catch (error) {
    {
      items.push(helpers.WIpBp + error.message);
    }
  }
  if (config.OPENROUTER_API_KEY) {
    try {
      const filter = String(config.OPENROUTER_MODEL)
        .split(",")
        .map((text) => text.trim())
        .filter(Boolean);
      return {
        data: await helpers.BXRZE(callAiEndpoint, {
          url: helpers.hfPQn,
          apiKey: config.OPENROUTER_API_KEY,
          model: filter[0],
          models: filter,
          prompt: a7,
          extraHeaders: {
            "HTTP-Referer": helpers.ClUJu,
            "X-Title": helpers.nxhrr,
          },
        }),
      };
    } catch (error) {
      {
        items.push(helpers.CGXib + error.message);
      }
    }
  }
  throw new Error(helpers.wWPGC(helpers.cwgls(helpers.GzOXx, items.join(helpers.DDcWN)), "]"));
};
exports.isUpdate = isUpdate;
const updateNow = async (a7) => {
  const a8 = {
    PJONG:
      "Please set VPS = true, or open an issue with proper information\n\nhttps://github.com/lyfe00011/levanter/wiki/platform",
  };
  try {
    {
      if (config.VPS && !process.env.KOYEB) {
        await syncAndRebuild(a7);
      } else if (config.HEROKU_API_KEY && config.HEROKU_APP_NAME) {
        await deployToHeroku();
      } else if (config.KOYEB_NAME && config.KOYEB_API) {
        await upKoyeb("0");
      } else if (config.RENDER_NAME && config.RENDER_API_KEY) {
        await updateRender();
      } else if (!a7) {
        throw new Error(a8.PJONG);
      }
      if (a7 && !config.VPS) {
        stopInstance();
      }
    }
  } catch (error) {
    throw error;
  }
};
const syncAndRebuild = async (a7) => {
  const helpers = {
    QKcfY: "origin",
    lzKvK: "merge",
    OiKdI: "--abort",
    FQyCP: "rebase",
    VyjNe: "master",
    icqRb: "--hard",
    FuNjy: "origin/master",
    zIsMy: "yarn install --network-concurrency 3",
    vgVJA: "inherit",
    aXUJm: "yarn cache clean",
  };
  const gitRepo = simpleGit();
  try {
    await gitRepo.fetch(helpers.QKcfY);
    await gitRepo.raw([helpers.lzKvK, helpers.OiKdI]).catch(() => {});
    await gitRepo.raw([helpers.FQyCP, helpers.OiKdI]).catch(() => {});
    await gitRepo.checkout(helpers.VyjNe);
    await gitRepo.reset([helpers.icqRb, helpers.FuNjy]);
  } catch (error) {
    {
      exports.logger.error(error);
      if (a7) {
        stopInstance();
      }
      return false;
    }
  }
  try {
    childProcess.execSync(helpers.zIsMy, {
      shell: true,
      stdio: helpers.vgVJA,
    });
  } catch {
    {
      try {
        childProcess.execSync(helpers.aXUJm, {
          shell: true,
          stdio: helpers.vgVJA,
        });
        childProcess.execSync(helpers.zIsMy, {
          shell: true,
          stdio: helpers.vgVJA,
        });
      } catch (error) {
        exports.logger.error(error);
        if (a7) {
          stopInstance();
        }
        return false;
      }
    }
  }
  const aa = a7 ? 0 : 4000;
  await exports.sleep(5000);
  setTimeout(restartInstance, aa);
  return true;
};
const deployToHeroku = async () => {
  const helpers = {
    GqQFT: "Please provide HEROKU_API_KEY and HEROKU_APP_NAME in the config",
    UiNUf: "origin",
    TFsoV: "levanter",
    NkQvf: "master",
    CPEoA: "true",
    wLekD: "heroku",
    WLqEq: "Error adding Heroku remote:",
  };
  try {
    if (!config.HEROKU_API_KEY || !config.HEROKU_APP_NAME) {
      throw new Error(helpers.GqQFT);
    }
    const gitRepo = simpleGit();
    try {
      {
        await gitRepo.reset(gitRepo.ResetMode.HARD);
        if (process.env.HEROKU_TEST) {
          await gitRepo.fetch(helpers.UiNUf, config.BRANCH);
        } else {
          const find = (await gitRepo.getRemotes(true)).find((name) => name.name === "levanter");
          if (find) {
            if (find.refs !== UPSTREAM_REPO_URL) {
              await gitRepo.removeRemote(helpers.TFsoV);
              await gitRepo.addRemote(helpers.TFsoV, UPSTREAM_REPO_URL);
            }
          } else {
            await gitRepo.addRemote(helpers.TFsoV, UPSTREAM_REPO_URL);
          }
          await gitRepo.fetch(helpers.TFsoV, helpers.NkQvf);
          await gitRepo.pull(helpers.TFsoV, helpers.NkQvf, {
            "--rebase": helpers.CPEoA,
          });
        }
      }
    } catch (error) {
      throw new Error(error.message || error);
    }
    const a9 =
      "https://api:" + config.HEROKU_API_KEY + "@git.heroku.com/" + config.HEROKU_APP_NAME + ".git";
    try {
      {
        await gitRepo.addRemote(helpers.wLekD, a9);
      }
    } catch (error) {
      exports.logger.error(helpers.WLqEq, error);
    }
    try {
      await gitRepo.push(helpers.wLekD, config.BRANCH);
    } catch (error) {
      throw new Error(error.message || error);
    }
  } catch (error) {
    exports.logger.error(error);
    throw error;
  }
};
const { computeBudgetStats } = require("./budgetStats");
function generatePdfReport(rows, a8, a9) {
  const helpers = {
    HAPSD: function (value, ac) {
      return value + ac;
    },
    uTzvo: "openrouter: ",
    gxHpV: "summary.pdf",
    SHQzV: "error",
    INoyh: "Helvetica-Oblique",
    gEIes: "center",
    hJOJl: "Helvetica",
    DCHpy: "black",
    CQyCs: "green",
    qoNCE: "red",
    gUAWi: "Helvetica-Bold",
    DNZyK: "Income",
    IFkrp: function (ab, ac) {
      return ab - ac;
    },
    NEdkA: "Expense",
    Qtete: function (ab, ac) {
      return ab - ac;
    },
    WBvzv: "Earn",
    OJXMD: "Savings",
    sBwyr: "gray",
    JiKNI: "Top Expense Categories",
    jCpnR: function (value, ac) {
      return value + ac;
    },
    ZIqsd: "Top Income Categories",
    FuKJK: "Date",
    FUNIv: "Category",
    bVtpw: "Amount",
    EGgjz: "finish",
  };
  return new Promise((callback, callback2) => {
    const pDFDocument = new PDFDocument({
      size: "A4",
    });
    const join = path.join(TEMP_DIR, helpers.gxHpV);
    const writeStream = fsExtra.createWriteStream(join);
    writeStream.on(helpers.SHQzV, (message) => callback2(message.message));
    pDFDocument.pipe(writeStream);
    pDFDocument.moveTo(72, 25).lineTo(525, 25).lineWidth(0.5).stroke().opacity(1);
    pDFDocument
      .font(helpers.INoyh)
      .text("Summary For The Period Of " + a8 + " to " + a9, 100, 28, {
        width: 404,
        align: helpers.gEIes,
        height: 15,
      })
      .font(helpers.hJOJl);
    pDFDocument.moveTo(72, 40).lineTo(525, 40).lineWidth(0.5).stroke().opacity(1);
    const aj = rows.totalIncome + "";
    const ak = rows.totalExpense + "";
    const netEarnText = helpers.HAPSD(Math.abs(rows.netEarn), "");
    const am =
      0 === rows.netEarn ? helpers.DCHpy : rows.netEarn > 0 ? helpers.CQyCs : helpers.qoNCE;
    pDFDocument.font(helpers.gUAWi).fontSize(10);
    pDFDocument.text(helpers.DNZyK, 100, 50);
    pDFDocument.moveTo(90, 63).opacity(0.4).lineTo(155, 63).lineWidth(0.5).stroke().opacity(1);
    pDFDocument
      .fillColor(helpers.CQyCs)
      .font(helpers.hJOJl)
      .text(aj, helpers.IFkrp(120, 3 * aj.length), 66)
      .fillColor(helpers.DCHpy);
    pDFDocument.font(helpers.gUAWi).text(helpers.NEdkA, 230, 50);
    pDFDocument.moveTo(220, 63).opacity(0.4).lineTo(290, 63).lineWidth(0.5).stroke().opacity(1);
    pDFDocument
      .fillColor(helpers.qoNCE)
      .font(helpers.hJOJl)
      .text(ak, helpers.Qtete(255, 3 * ak.length), 66)
      .fillColor(helpers.DCHpy);
    pDFDocument.font(helpers.gUAWi).text(helpers.WBvzv, 370, 50);
    pDFDocument.moveTo(360, 63).opacity(0.4).lineTo(410, 63).lineWidth(0.1).stroke().opacity(1);
    pDFDocument
      .fillColor(am)
      .font(helpers.hJOJl)
      .text(netEarnText, helpers.IFkrp(385, 3 * netEarnText.length), 66)
      .fillColor(helpers.DCHpy);
    pDFDocument.font(helpers.gUAWi).text(helpers.OJXMD, 460, 50);
    pDFDocument.moveTo(450, 63).opacity(0.4).lineTo(510, 63).lineWidth(0.5).stroke().opacity(1);
    const an = rows.savingsRate + "%";
    const ap = rows.savingsRate >= 0 ? helpers.CQyCs : helpers.qoNCE;
    pDFDocument
      .fillColor(ap)
      .font(helpers.hJOJl)
      .text(an, helpers.IFkrp(475, 3 * an.length), 66)
      .fillColor(helpers.DCHpy);
    pDFDocument.moveTo(72, 80).lineTo(525, 80).lineWidth(0.5).opacity(0.3).stroke().opacity(1);
    let count = 87;
    pDFDocument.fontSize(9).font(helpers.hJOJl);
    pDFDocument
      .fillColor(helpers.sBwyr)
      .text("Daily Avg Income: " + rows.dailyAvgIncome, 90, count)
      .text("Daily Avg Expense: " + rows.dailyAvgExpense, 230, count)
      .text("Days Tracked: " + rows.dayCount, 400, count)
      .fillColor(helpers.DCHpy);
    count += 16;
    if (rows.topExpenseCategories.length > 0) {
      pDFDocument
        .moveTo(72, count)
        .lineTo(525, count)
        .lineWidth(0.5)
        .opacity(0.3)
        .stroke()
        .opacity(1);
      count += 7;
      pDFDocument.font(helpers.gUAWi).fontSize(10).text(helpers.JiKNI, 90, count);
      count += 15;
      pDFDocument.font(helpers.hJOJl).fontSize(9);
      for (const item of rows.topExpenseCategories) {
        const jCpnR = helpers.jCpnR(item.category.charAt(0).toUpperCase(), item.category.slice(1));
        const repeat = "|".repeat(Math.max(1, Math.round(item.percentage / 5)));
        pDFDocument.fillColor(helpers.qoNCE).text(repeat, 90, count).fillColor(helpers.DCHpy);
        pDFDocument.text("" + jCpnR, 170, count);
        pDFDocument.text("" + item.amount, 310, count);
        pDFDocument
          .fillColor(helpers.sBwyr)
          .text(item.percentage + "%", 370, count)
          .fillColor(helpers.DCHpy);
        count += 13;
      }
      count += 5;
    }
    if (rows.topIncomeCategories.length > 0) {
      {
        pDFDocument
          .moveTo(72, count)
          .lineTo(525, count)
          .lineWidth(0.5)
          .opacity(0.3)
          .stroke()
          .opacity(1);
        count += 7;
        pDFDocument.font(helpers.gUAWi).fontSize(10).text(helpers.ZIqsd, 90, count);
        count += 15;
        pDFDocument.font(helpers.hJOJl).fontSize(9);
        for (const item of rows.topIncomeCategories) {
          {
            const categoryLabel = helpers.HAPSD(
              item.category.charAt(0).toUpperCase(),
              item.category.slice(1),
            );
            const repeat = "|".repeat(Math.max(1, Math.round(item.percentage / 5)));
            pDFDocument.fillColor(helpers.CQyCs).text(repeat, 90, count).fillColor(helpers.DCHpy);
            pDFDocument.text("" + categoryLabel, 170, count);
            pDFDocument.text("" + item.amount, 310, count);
            pDFDocument
              .fillColor(helpers.sBwyr)
              .text(item.percentage + "%", 370, count)
              .fillColor(helpers.DCHpy);
            count += 13;
          }
        }
        count += 5;
      }
    }
    const payload = {
      headers: ["Id", helpers.FuKJK, helpers.FUNIv, helpers.bVtpw],
      rows: rows.rows,
    };
    pDFDocument
      .moveTo(72, count)
      .lineTo(525, count)
      .lineWidth(0.5)
      .opacity(0.3)
      .stroke()
      .opacity(1);
    count += 5;
    pDFDocument.y = count;
    pDFDocument.create(payload);
    pDFDocument.end();
    writeStream.on(helpers.EGgjz, function () {
      callback(join);
    });
  });
}
async function sendTruecallerOtp(country, manufacturer, callback) {
  const helpers = {
    MuTpJ: "POST",
    YxIwT: "application/json; charset=UTF-8",
    iVRJp: "gzip",
    VLTnT: "Truecaller/11.75.5 (Android;10)",
    UYTia: "lvc22mp3l1sfv6ujg83rd17btt",
    qTxZg: "https://account-asia-south1.truecaller.com/v2/sendOnboardingOtp",
    xwwaa: "GOOGLE_PLAY",
    MjEAt: "Android",
    UbyZB: "GMS",
    wFsbR: "region-2",
  };
  const payload = {
    method: helpers.MuTpJ,
    headers: {
      "content-type": helpers.YxIwT,
      "accept-encoding": helpers.iVRJp,
      "user-agent": helpers.VLTnT,
      clientsecret: helpers.UYTia,
    },
    url: helpers.qTxZg,
    data: {
      countryCode: country.country,
      dialingCode: Number(country.countryCallingCode),
      installationDetails: {
        app: {
          buildVersion: 5,
          majorVersion: 11,
          minorVersion: 7,
          store: helpers.xwwaa,
        },
        device: {
          deviceId: callback(),
          language: "en",
          manufacturer: manufacturer.manufacturer,
          model: manufacturer.model,
          osName: helpers.MjEAt,
          osVersion: "10",
          mobileServices: [helpers.UbyZB],
        },
        language: "en",
      },
      phoneNumber: country.nationalNumber,
      region: helpers.wFsbR,
      sequenceNo: "NG" === country.country ? 3 : 2,
    },
  };
  try {
    {
      return (await axios(payload)).data;
    }
  } catch (error) {
    {
      throw new Error(error.message);
    }
  }
}
function generateInstallationId() {
  const a8 = {
    iHsln: "abcdefghijklmnopqrstuvwxyz0123456789",
    LoAxS: function (ac, ad) {
      return ac < ad;
    },
    Xmcsq: function (ac, ad) {
      return ac * ad;
    },
  };
  const a9 = a8;
  let aa = "";
  const ab = a9.iHsln;
  for (let index = 0; index < 16; index++) {
    aa += ab.charAt(Math.floor(a9.Xmcsq(36, Math.random())));
  }
  return aa;
}
exports.computeBudgetStats = computeBudgetStats;
exports.updateNow = updateNow;
exports.getNumbers = function (a7 = "") {
  const a8 = {
    RYYvW: function (callback, ab, ac) {
      return callback(ab, ac);
    },
  };
  const items = [];
  a8.RYYvW(genNumb, a7, function (value) {
    {
      if (!items.includes(value)) {
        items.push(value);
      }
    }
  });
  return items;
};
exports.summary = async function (a7, text, text2) {
  const aa = {
    evQVl: function (callback, am, an, ap) {
      return callback(am, an, ap);
    },
  };
  let ab;
  if (text && text2) {
    ab = {
      from: text.trim(),
      to: text2.trim(),
    };
  }
  const date = new Date();
  const date2 = date.getDate();
  const af = MONTH_NAMES[date.getMonth()];
  const fullYear = date.getFullYear();
  const budget = await getBudget(a7, af, undefined, fullYear, ab);
  const budgetStats = computeBudgetStats(budget);
  const evQVl = await aa.evQVl(
    generatePdfReport,
    budgetStats,
    text || "1 " + af + " " + fullYear,
    text2 || date2 + " " + af + " " + fullYear,
  );
  const fileSync = fsExtra.readFileSync(evQVl);
  fsExtra.unlinkSync(evQVl);
  return fileSync;
};
truecaller.search = async (text) => {
  const helpers = {
    TVMYn: "https://search5-noneu.truecaller.com/v2/search",
    vydwg: "SEARCHRESULTS,HISTORY,DETAILS",
    pEhYW: "json",
    ZljaB: "application/json; charset=UTF-8",
    uLFFq: "gzip",
    DLfIu: "Truecaller/11.75.5 (Android;10)",
    USNnX: "lvc22mp3l1sfv6ujg83rd17btt",
    vSBhh: "https://nobitaaahha-6103f058b087.herokuapp.com/truecaller",
    tOAKw: "true",
    XPFtw: function (callback, ah, ai) {
      return callback(ah, ai);
    },
    HHSnt: function (callback, ah, ai, aj) {
      return callback(ah, ai, aj);
    },
    stfpL: "Sent",
  };
  text = stripWhitespace(text);
  {
    const ag = config.TRUECALLER || (await getTruecaller("t"));
    if (ag) {
      truecallerLoginSession.token = decodeToken(ag);
    }
  }
  if (truecallerLoginSession.token) {
    let ah;
    let ai;
    try {
      const phoneNumber = eL.parsePhoneNumber("+" + text.replace("+", ""));
      text = phoneNumber.nationalNumber;
      ah = phoneNumber.country;
    } catch (error) {
      const payload = {
        message: exports.lang.plugins.common.truecaller_invalid_mobile,
      };
      return payload;
    }
    try {
      if (process.versions.node.startsWith("16")) {
        {
          ai = (
            await axios.get(helpers.TVMYn, {
              params: {
                q: text,
                countryCode: ah,
                type: 4,
                locAddr: "",
                placement: helpers.vydwg,
                encoding: helpers.pEhYW,
              },
              headers: {
                "content-type": helpers.ZljaB,
                "accept-encoding": helpers.uLFFq,
                "user-agent": helpers.DLfIu,
                Authorization: "Bearer " + truecallerLoginSession.token,
                clientsecret: helpers.USNnX,
              },
            })
          ).data.data[0];
        }
      } else {
        const payload = {
          number: text,
          countryCode: ah,
          token: truecallerLoginSession.token,
        };
        ai = (await axios.post(helpers.vSBhh, payload)).data.data[0];
      }
    } catch (error) {
      {
        throw new Error(error.message);
      }
    }
    const payload = {
      name: ai.name,
      gender: ai.gender,
      numberType: ai.phones[0].numberType,
      type: ai.phones[0].type,
      carrier: ai.phones[0].carrier,
      dialingCode: ai.phones[0].dialingCode,
      countryCode: ai.addresses[0].countryCode,
      city: ai.addresses[0].city,
      number: ai.phones[0].e164Format,
      email: ai.internetAddresses[0] && ai.internetAddresses[0].id,
    };
    return payload;
  }
  const payload = {
    message: TRUECALLER_LOGIN_PROMPT,
  };
  {
    truecallerLoginSession.otp = helpers.tOAKw;
    helpers.XPFtw(setTimeout, () => (truecallerLoginSession.otp = ""), 60000);
    return payload;
  }
  {
    {
      let ay;
      try {
        {
          ay = eL.parsePhoneNumber("+" + text.replace("+", ""));
        }
      } catch (error) {
        const payload = {
          message: exports.lang.plugins.common.truecaller_invalid_number,
        };
        return payload;
      }
      const HHSnt = await helpers.HHSnt(
        sendTruecallerOtp,
        ay,
        exports.getRandom(phonesList),
        generateInstallationId,
      );
      truecallerLoginSession.id = HHSnt.requestId;
      truecallerLoginSession.number = ay.number;
      truecallerLoginSession.login = !truecallerLoginSession.login;
      helpers.XPFtw(
        setTimeout,
        () => (truecallerLoginSession.login = !truecallerLoginSession.login),
        300000,
      );
      return {
        message:
          helpers.stfpL === HHSnt.message
            ? exports.lang.plugins.common.truecaller_sent
            : HHSnt.message,
      };
    }
  }
};
exports.addAudioMetaData = async (a7, value, a9, aa, ab) => {
  const helpers = {
    CgsAE: function (callback, ag) {
      return callback(ag);
    },
    xiLrO: "missing title",
    teMhb: "TIT2",
    YjxTR: "TPE1",
    bXraY: "APIC",
  };
  let ad;
  if (ab) {
    ad = (await getBuffer(ab, false)).buffer;
  }
  return new Promise((af, ag) => {
    if (!(a7 || value)) {
      helpers.CgsAE(ag, new Error(helpers.xiLrO));
    }
    const iD3Writer = new ID3Writer(a7);
    if (value) {
      iD3Writer.setFrame(helpers.teMhb, value);
    }
    if (a9) {
      iD3Writer.setFrame(helpers.YjxTR, [a9]);
    }
    if (ad) {
      iD3Writer.setFrame(helpers.bXraY, {
        type: 3,
        data: ad,
        description: aa || "",
      });
    }
    iD3Writer.addTag();
    const ai = value + ".mp3";
    const from = Buffer.from(iD3Writer.arrayBuffer);
    fsExtra.writeFileSync(ai, from);
    helpers.CgsAE(af, fsExtra.readFileSync(ai));
    fsExtra.rmSync(ai);
  });
};
exports.genNum = (a7) => a7 != "iloveyoulyfebewithmeforeverdontleavemeplsplspls";
exports._git = "lyfe00011";
exports.formatter = {};
exports.genNumb = genNumb;
const calendar = require("./calendar");
const googleAuth = require("./google-auth");
const gdrive = require("./gdrive");
exports.addCalendarEvent = calendar.addCalendarEvent;
exports.listCalendarEvents = calendar.listCalendarEvents;
exports.deleteCalendarEvent = calendar.deleteCalendarEvent;
exports.listDriveFiles = gdrive.listDriveFiles;
exports.deleteDriveFile = gdrive.deleteDriveFile;
exports.downloadDriveFile = gdrive.downloadDriveFile;
exports.uploadFile = gdrive.uploadFile;
exports.refreshUserToken = googleAuth.refreshUserToken;
exports.initiateUserToken = googleAuth.initiateUserToken;
exports.validateUserCode = googleAuth.validateUserCode;
exports.setGAuthCredentials = googleAuth.setGAuthCredentials;
exports.clearGAuth = googleAuth.clearGAuth;
exports.backupFilesToDrive = backup.backup;
exports.extractExif = require("./extractExif").extractExif;
exports.removeBg = removeBg;
exports.getTelegramStickers = async (a7) =>
  (
    await axios.post("https://levanter.onrender.com/sticker", {
      url: a7,
    })
  ).data;
exports.fontType = fontType;
exports.isGroup = (a7) => isJidGroup(a7);
exports.isUser = (a7) => isJidUser(a7);
exports.PLUGINS = {
  count: 0,
  i: 0,
  e: 0,
};
exports.ticTacToe = ticTacToe;
exports.isTactacToe = isGameActive;
exports.delTicTacToe = deleteTicTacToe;
exports.getRandom = (a7) => a7[exports.getFloor(Math.random() * a7.length)];
exports.formatDate = (a7) => {
  const a8 = {
    AIoHX: "moment-timezone",
    QjhJD: "UTC",
    qROib: "DD/MM/YYYY",
  };
  const momentTz = require(a8.AIoHX);
  const aa = config.TIMEZONE || process.env.TZ || a8.QjhJD;
  return momentTz.tz(a7, aa).format(a8.qROib);
};
exports.c24to12 = (text) => {
  if (
    (text = text.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [text]).length > 1
  ) {
    (text = text.slice(1))[5] = +text[0] < 12 ? " AM" : " PM";
    text[0] = +text[0] % 12 || 12;
  }
  return text.join("");
};
const wcg = require("./wcg");
exports.truecaller = truecaller;
exports.store = store;
exports.wcg = wcg.wcg;
exports.PLATFORM =
  config.HEROKU_API_KEY && config.HEROKU_APP_NAME
    ? "heroku"
    : config.KOYEB_API && config.KOYEB_NAME
      ? "koyeb"
      : config.RENDER_NAME && config.RENDER_API_KEY
        ? "render"
        : config.VPS
          ? "vps"
          : "unknown";
const KERNEL_RELEASE_RE = new RegExp("(\\d+\\.\\d+\\.\\d+)-\\d+-(\\w+)");
exports.getPlatform = () => {
  const match = os.release().match(KERNEL_RELEASE_RE);
  return exports.PLATFORM + " (" + os.type() + (match ? " " + match[2] : "") + ")";
};
const {
  addTask,
  listTasks,
  deleteTask,
  updateTask,
  completeTask,
  getTaskLists,
  setTaskList,
  getTaskList,
} = require("./task");
exports.addGoogleTask = addTask;
exports.listGoogleTasks = listTasks;
exports.deleteGoogleTask = deleteTask;
exports.updateGoogleTask = updateTask;
exports.completeGoogleTask = completeTask;
exports.getGoogleTaskLists = getTaskLists;
exports.setGoogleTaskList = setTaskList;
exports.getGoogleTaskList = getTaskList;
