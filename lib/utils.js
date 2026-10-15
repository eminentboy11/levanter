const junkWrapperFactory = (function () {
  let flag = true;
  return function (a1, apply2) {
    {
      const a4 = flag
        ? function () {
            {
              if (apply2) {
                {
                  const apply = apply2.apply(a1, arguments);
                  apply2 = null;
                  return apply;
                }
              }
            }
          }
        : function () {};
      flag = false;
      return a4;
    }
  };
})();
const selfDefendingGuard = junkWrapperFactory(this, function () {
  const Z = {
    MuWkY: "(((.+)+)+)+$",
  };
  return selfDefendingGuard
    .toString()
    .search(Z.MuWkY)
    .toString()
    .constructor(selfDefendingGuard)
    .search(Z.MuWkY);
});
const axios = require("axios").default;
const fs = require("fs-extra");
const path = require("path");
const translateGoogleApi = require("translate-google-api");
const FormData = require("form-data");
const moment = require("moment");
const { loadBaileys } = require("./baileys");
const fluentFfmpeg = require("fluent-ffmpeg");
const config = require("./config");
const { getJson, getBuffer } = require("./fetch");
const { TEMP_DIR, genThumbnail, extractVideoThumb } = require("./constant");
const JID_REGEX = /[0-9]+(-[0-9]+|)(@g.us|@s.whatsapp.net|@lid|@newsletter)/g;
const ICHECKER_SECRET = "aWxvdmV5b3Vzb29vb29vbWF0Y2hidXRpZG9udGtub3d3aHlpbGlrZWxvdmV3YW50dQ==";
const { iChecker } = require("./test/test");
const checkerValue = iChecker();
const isCheckerValid = checkerValue == ICHECKER_SECRET;
const lang = require("./lang");
let fontsModule;
const loadFonts = () => (fontsModule ??= require("./fonts"));
const events = require("events");
const levanter = new events();
exports.levanter = levanter;
const store = {};
const crypto = require("crypto");
let ytApiBaseUrl = "";
const YT_API_URL = "https://right-annmaria-lev-8a3a4814.koyeb.app";
const YT_CLIENTS = [
  "YTMUSIC",
  "YTMUSIC_ANDROID",
  "IOS",
  "WEB",
  "MWEB",
  "ANDROID",
  "YTSTUDIO_ANDROID",
  "TV",
  "TV_EMBEDDED",
  "YTKIDS",
  "WEB_EMBEDDED",
  "WEB_CREATOR",
];
const initYtApi = async () => {
  ytApiBaseUrl = YT_API_URL;
};
initYtApi();
const getYtCookie = (index) => {
  if (!index) {
    return;
  }
  return config[index].env.YT_COOKIE;
};
async function bg(V, index) {
  const { isJidGroup: a0 } = await loadBaileys();
  if (!a0(V) || !index) {
    return "0";
  }
  const a1 = config[index]?.groupMetadata?.[V];
  if (a1 && a1.participants) {
    return a1.ephemeralDuration;
  }
  const groupMetadata = await config[index].fetchGroupMetadata(V);
  return groupMetadata?.ephemeralDuration;
}
const URL_REGEX =
  /((http|https):\/\/)?(www\.)?([a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/;
let isInitialized = false;
const { LRUCache } = require("./db/nr");
const expiration = new LRUCache(1000, 3600000);
exports.expiration = expiration;
if (isCheckerValid) {
  let youtubeiModule = null;
  (async () => {
    const Z = {
      LuPrz: "youtubei.js",
    };
    youtubeiModule = await import(Z.LuPrz);
    youtubeiModule.Log.setLevel();
  })();
  const { setFake, getFake } = require("./db");
  const { genThumbnail: bq, extractVideoThumb: br } = require("./constant");
  exports.parsedJid = (text) => text.match(JID_REGEX) || [];
  const uploadToImgur = async (X) => {
    const helpers = {
      xYDJM: "image",
      ZWTJC: "https://api.imgur.com/3/image",
      kOpGG: "Client-ID 224becfa2d16b53",
      hyroJ: function (a2, a3) {
        return a2 / a3;
      },
      yFMMm: function (a2, a3) {
        return a2 / a3;
      },
      CRVdo: function (a2, a3) {
        return a2 == a3;
      },
      USatd: "object",
      SlnHP: "string",
    };
    const helper = helpers;
    const formData = new FormData();
    formData.append(helper.xYDJM, fs.createReadStream(X));
    try {
      const post = await axios.post(helper.ZWTJC, formData, {
        headers: {
          Authorization: helper.kOpGG,
          ...formData.getHeaders(),
        },
        maxBodyLength: 1 / 0,
        maxContentLength: 1 / 0,
      });
      const a3 = post?.data?.data?.link;
      if (!a3) {
        throw new Error("imgur returned no link: " + JSON.stringify(post?.data).slice(0, 200));
      }
      if (fs.existsSync(X)) {
        fs.unlinkSync(X);
      }
      return a3;
    } catch (error) {
      if (fs.existsSync(X)) {
        fs.unlinkSync(X);
      }
      const a5 = error.response?.status;
      const a6 = helper.CRVdo(helper.USatd, typeof error.response?.data)
        ? JSON.stringify(error.response.data).slice(0, 200)
        : helper.CRVdo(helper.SlnHP, typeof error.response?.data)
          ? error.response.data.slice(0, 200)
          : "";
      throw new Error(
        "imgur upload failed" +
          (a5 ? " (HTTP " + a5 + ")" : "") +
          (a6 ? ": " + a6 : ": " + error.message),
      );
    }
  };
  const uploadToCatbox = async (X) => {
    const helpers = {
      Wtobg: "reqtype",
      xzJgm: "fileupload",
      gFlwT: "fileToUpload",
      RbohD: "https://catbox.moe/user/api.php",
      CvltM:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      eNStg: "*/*",
      EZVQq: "en-US,en;q=0.9",
      LRXpa: "https://catbox.moe",
      YYQvX: "https://catbox.moe/",
      wUDaN: function (a3, a4) {
        return a3 == a4;
      },
      KPFLa: "string",
      nazpt: "(empty body)",
    };
    const formData = new FormData();
    const readStream = fs.createReadStream(X);
    const payload = {
      filename: X,
    };
    formData.append(helpers.Wtobg, helpers.xzJgm);
    formData.append(helpers.gFlwT, readStream, payload);
    try {
      {
        const post = await axios.post(helpers.RbohD, formData, {
          headers: {
            "User-Agent": helpers.CvltM,
            Accept: helpers.eNStg,
            "Accept-Language": helpers.EZVQq,
            Origin: helpers.LRXpa,
            Referer: helpers.YYQvX,
            ...formData.getHeaders(),
          },
          maxBodyLength: 1 / 0,
          maxContentLength: 1 / 0,
        });
        const a4 = helpers.wUDaN(helpers.KPFLa, typeof post.data) ? post.data.trim() : "";
        if (!/^https?:\/\//.test(a4)) {
          throw new Error("catbox returned non-URL response: " + (a4 || helpers.nazpt));
        }
        if (fs.existsSync(X)) {
          fs.unlinkSync(X);
        }
        return a4;
      }
    } catch (error) {
      const a7 = error.response?.status;
      const a8 = helpers.wUDaN(helpers.KPFLa, typeof error.response?.data)
        ? error.response.data.slice(0, 200).trim()
        : "";
      const a9 =
        "catbox upload failed" +
        (a7 ? " (HTTP " + a7 + ")" : "") +
        (a8 ? ": " + a8 : ": " + error.message);
      try {
        return await uploadToImgur(X);
      } catch (error) {
        throw new Error(a9 + " | imgur fallback failed: " + error.message);
      }
    }
  };
  exports.getUrl = async (V, X = true) => {
    const helpers = {
      thtsW: "file",
      peesR: "post",
      Najwk: "https://levanter.onrender.com/image/",
      DUpIS: "imgur",
    };
    if (true === X) {
      const formData = new FormData();
      formData.append(helpers.thtsW, fs.createReadStream(V));
      const payload = {
        method: helpers.peesR,
        url: helpers.Najwk,
        headers: {
          ...formData.getHeaders(),
        },
        data: formData,
      };
      const { data: a2 } = await axios(payload).catch((a3) => {
        console.log(a3);
      });
      fs.unlinkSync(V);
      if (a2) {
        return "https://levanter.onrender.com/get/" + a2?.url;
      } else {
        return undefined;
      }
    }
    if (helpers.DUpIS === X) {
      return uploadToImgur(V);
    } else {
      return uploadToCatbox(V);
    }
  };
  const waWebVersion = async () => {
    const V = {
      IjMyS: "https://web.whatsapp.com/check-update?version=2.2228.6&platform=web",
    };
    let X = 10;
    return await (async () => {
      try {
        {
          let { currentVersion: a0 } = await getJson(V.IjMyS);
          X--;
          if (!a0 && X > 0) {
            return await waWebVersion();
          } else {
            a0 = a0.split(".");
            return [+a0[0], +a0[1], +a0[2]];
          }
        }
      } catch (error) {}
    })();
  };
  exports.waWebVersion = waWebVersion;
  exports.genButtonMessage = async (Z, a0, a1, text, client) => {
    const helpers = {
      GnXJE: "locationMessage",
      BSFfd: "documentMessage",
      joZRq: function (a8, a9) {
        return a8 == a9;
      },
      baDyo: "object",
      exqsY: function (callback, a9) {
        return callback(a9);
      },
      xOkll: function (callback, a9, aa) {
        return callback(a9, aa);
      },
      qgtpU: "image",
      vwEYE: "video",
      mGVSt: function (a8, a9) {
        return a8 != a9;
      },
      yuHKr: "imageMessage",
      NLZwJ: "videoMessage",
    };
    const items = [];
    for (const { id: a8, text: a9 } of Z) {
      items.push({
        buttonId: "" + selfDefendingGuard + a8,
        buttonText: {
          displayText: a9,
        },
        type: 1,
      });
    }
    const payload = {
      contentText: a0,
      footerText: a1,
      buttons: items,
      headerType: 1,
    };
    const a7 = payload;
    if (text?.location || text?.document) {
      {
        const aa = text.location ? helpers.GnXJE : helpers.BSFfd;
        a7.headerType = helpers.GnXJE == aa ? 6 : 3;
        text = text.location || text.document;
        a7[aa] = helpers.joZRq(helpers.baDyo, typeof text)
          ? text
          : {
              jpegThumbnail: await helpers.exqsY(
                bq,
                Buffer.isBuffer(text)
                  ? text
                  : (await helpers.xOkll(getBuffer, text, /ytimg/.test(text))).buffer,
              ),
            };
      }
    } else if (text) {
      const ac = {};
      const ad = helpers.qgtpU in text ? helpers.qgtpU : helpers.vwEYE;
      a7.headerType = helpers.qgtpU == ad ? 4 : 5;
      if (helpers.mGVSt(helpers.baDyo, typeof text[ad]) || Buffer.isBuffer(text[ad])) {
        if (!Buffer.isBuffer(text[ad])) {
          const { buffer: ah } = await helpers.xOkll(getBuffer, text[ad], /ytimg/.test(text));
          text[ad] = ah;
        }
        ac[ad] = text[ad];
        ac.jpegThumbnail = helpers.qgtpU == ad ? await bq(ac[ad]) : (await br(ac[ad])).thumbnail;
        const payload = {
          upload: client.client.waUploadToServer,
        };
        const { prepareWAMessageMedia: af } = await loadBaileys();
        const ag = await af(ac, payload);
        if (ag.imageMessage) {
          a7.imageMessage = ag.imageMessage;
        } else {
          a7.videoMessage = ag.videoMessage;
        }
      } else {
        a7[helpers.qgtpU == ad ? helpers.yuHKr : helpers.NLZwJ] = text[ad];
      }
    }
    return a7;
  };
  let youtubeClient;
  const downloadYoutubeMedia = async (value, X = "video", Z, a0, a1) => {
    const helpers = {
      sRFcM: "song",
      ziOsf: "m4a",
      XVoMO: "mp4",
      FdEIB: "audio",
      Jbhza: "video+audio",
      TCdsK: "best",
      zcbld: "Video is unplayable",
      PtFpx: "video",
      HzvZM: "false",
      LEUch: "non 2xx status code",
    };
    const ytCookie = getYtCookie(a1);
    if (isInitialized) {
      {
        if (!ytCookie) {
          throw new Error(lang.plugins.common.yt_cookie_needed);
        }
        return ytCookie(value, X, ytCookie, "");
      }
    }
    try {
      {
        const info = await youtubeClient.getInfo(value);
        if (!info.playability_status || "OK" != info.playability_status.status) {
          {
            isInitialized = true;
            if (!ytCookie) {
              throw new Error(
                lang.plugins.common.yt_cookie_needed + "\n" + info.playability_status.reason,
              );
            }
            return ytCookie(value, X, ytCookie, info.playability_status.reason);
          }
        }
        const a7 = helpers.sRFcM === X ? helpers.ziOsf : helpers.XVoMO;
        const payload = {
          type: helpers.sRFcM === X ? helpers.FdEIB : helpers.Jbhza,
          quality: helpers.TCdsK,
          format: helpers.XVoMO,
        };
        let a9;
        if (a0) {
          payload.type = a0;
        }
        for (const YT_CLIENTSItem of YT_CLIENTS) {
          payload.client = YT_CLIENTSItem;
          try {
            {
              const download = await youtubeClient.download(value, payload);
              const join = path.join(TEMP_DIR, value + "." + a7);
              const writeStream = fs.createWriteStream(join);
              for await (const item of youtubeiModule.Utils.streamToIterable(download)) {
                writeStream.write(item);
              }
              writeStream.end();
              return join;
            }
          } catch (error) {
            {
              a9 = error;
            }
          }
        }
        if (a9) {
          throw a9;
        }
      }
    } catch (error) {
      if (helpers.zcbld === error.message && helpers.PtFpx !== X) {
        return downloadYoutubeMedia(value, helpers.FdEIB, helpers.HzvZM, a0, a1);
      }
      if (error.message.includes(helpers.LEUch) && helpers.Jbhza !== a0) {
        return downloadYoutubeMedia(value, helpers.FdEIB, Z, helpers.Jbhza, a1);
      }
      if (!ytCookie) {
        throw new Error(lang.plugins.common.yt_cookie_needed + "\n" + error.message);
      }
      return ytCookie(value, X, ytCookie, error.message);
    }
  };
  const text = async (a0, count, a2) => {
    const helpers = {
      peBqu: "Songs",
      Aeksy: "DidYouMean",
      xPzcO: "ShowingResultsFor",
      YvwRq: "video",
    };
    const ytCookie = getYtCookie(a2);
    try {
      {
        const items = [];
        if (1 == count) {
          {
            const search = await youtubeClient.music.search(a0);
            const applyFilter = await search.applyFilter(helpers.peBqu);
            const [ab] = applyFilter.contents;
            if (!ab) {
              throw new Error(lang.plugins.common.yt_not_found.format(a0));
            }
            for (const item of ab.contents) {
              {
                if (helpers.Aeksy === item.type || helpers.xPzcO === item.type) {
                  return await text(item.corrected_query.text, count, a2);
                }
                if (item.title) {
                  {
                    const af = {
                      id: item.id,
                      title: item.title,
                      thumbnail: item?.thumbnail?.contents[0]?.url || "",
                      album: item?.album?.name || "",
                      duration: item.duration.text,
                      seconds: item.duration.seconds,
                      author: item?.artists?.map((name) => name.name).join(", ") || "",
                    };
                    items.push(af);
                  }
                }
              }
            }
            if (items.length) {
              return items;
            }
          }
        }
        const payload = {
          type: helpers.YvwRq,
        };
        const results = (await youtubeClient.search(a0, payload)).results;
        for (const item of results) {
          if (helpers.Aeksy === item.type) {
            return await text(item.corrected_query.text, count, a2);
          }
          if (item?.published?.text) {
            {
              const ai = {
                id: item.id,
                title: item.title.text,
                thumbnail: item?.thumbnails?.[0] || {
                  url: "",
                },
                author: item.author.name || "",
                published: item.published.text || "",
                view: item.short_view_count.text,
                duration: item.duration.text,
                seconds: item.duration.seconds,
              };
              const aj = ai;
              items.push(aj);
            }
          }
        }
        return items;
      }
    } catch (error) {
      if (!ytCookie) {
        throw new Error(lang.plugins.common.yt_cookie_needed);
      }
      return ytCookie3(a0, ytCookie, error.message);
    }
  };
  const downloadYtDirect = async (Z, a0) => {
    const info = await youtubeClient.getInfo(Z);
    const ytCookie = getYtCookie(a0);
    if ("OK" !== info.playability_status.status) {
      if (!ytCookie) {
        throw new Error(
          lang.plugins.common.yt_cookie_needed + "\n" + info.playability_status.reason,
        );
      }
      return ytCookie2(Z, ytCookie);
    }
    const primaryInfo = info.primary_info;
    const secondaryInfo = info.secondary_info;
    const a7 = {
      id: Z,
      title: primaryInfo.title.text,
      view: primaryInfo.view_count.text,
      published: primaryInfo.published.text,
      description: secondaryInfo.description.text || "",
      thumbnail: info.basic_info.thumbnail?.[0] || {
        url: "",
      },
      duration: info.basic_info.duration,
      author: info.basic_info.author,
    };
    return [a7];
  };
  const ytCookie = async (value, a0, a1, a2 = "") => {
    const a3 = {
      kixjL: "arraybuffer",
    };
    const a4 = process.env.PASSWORD_U;
    if (!a1) {
      throw new Error(lang.plugins.common.yt_cookie_needed);
    }
    try {
      {
        const a6 = {
          id: value,
          type: a0,
          cookie: a1,
          session: a4,
        };
        const payload = {
          responseType: a3.kixjL,
        };
        const post = await axios.post(ytApiBaseUrl + "/yt/download", a6, payload);
        const join = path.join(TEMP_DIR, value + ".mp4");
        fs.writeFileSync(join, post.data);
        return join;
      }
    } catch (error) {
      {
        throw new Error(a2);
      }
    }
  };
  const ytCookie2 = async (X, Z) => {
    const a0 = X;
    if (!Z) {
      throw new Error(lang.plugins.common.yt_cookie_needed);
    }
    const a1 = process.env.PASSWORD_U;
    let a2 = ytApiBaseUrl + "/yt/search";
    try {
      const a3 = {
        query: a0,
        id: "1",
        cookie: Z,
        session: a1,
      };
      return (await axios.post(a2, a3)).data.result;
    } catch (error) {}
  };
  const ytCookie3 = async (X, Z, a0 = "") => {
    if (!Z) {
      throw new Error(lang.plugins.common.yt_cookie_needed);
    }
    const a2 = process.env.PASSWORD_U;
    let a3 = ytApiBaseUrl + "/yt/search";
    try {
      {
        const a4 = {
          query: X,
          id: "",
          cookie: Z,
          session: a2,
        };
        return (await axios.post(a3, a4)).data.result;
      }
    } catch (error) {
      {
        throw new Error(a0);
      }
    }
  };
  const initYoutubeClient = async (V) => {
    if (youtubeClient) {
      return;
    }
    const ytCookie = getYtCookie(V);
    youtubeClient = await youtubeiModule.Innertube.create({
      cache: new youtubeiModule.UniversalCache(false),
      cookie: ytCookie,
      generate_session_locally: true,
    });
  };
  const yts = async (V, X = false, Z, a0) => {
    await initYoutubeClient(a0);
    if (X) {
      return downloadYtDirect(V, a0);
    } else {
      return text(V, Z, a0);
    }
  };
  exports.yts = yts;
  exports.song = async (value, X) => {
    const Z = {
      NmayU: "error",
      sCCif: "end",
      egIJa: "song",
    };
    await initYoutubeClient(X);
    const mediaFile = await downloadYoutubeMedia(value, Z.egIJa, undefined, undefined, X);
    return (
      !!mediaFile &&
      new Promise((callback, callback2) => {
        const join = path.join(TEMP_DIR, value + ".mp3");
        fluentFfmpeg(mediaFile)
          .audioBitrate(192)
          .audioFrequency(44100)
          .save(join)
          .on(Z.NmayU, (message) => callback2(new Error(message.message)))
          .on(Z.sCCif, () => {
            {
              const fileSync = fs.readFileSync(join);
              callback(fileSync);
              fs.unlinkSync(mediaFile);
              fs.unlinkSync(join);
            }
          });
      })
    );
  };
  exports.genListMessage = (a0, a1, a2, a3 = "", a4 = String.fromCharCode(8206)) => {
    const items = [];
    for (const { id: aa, text: ab, desc: ac } of a0) {
      items.push({
        title: ab,
        rowId: "" + config[0].PREFIX + aa,
        description: ac || "",
      });
    }
    const payload = {
      title: a3,
      rows: items,
    };
    const payload2 = {
      title: a1,
      buttonText: a2,
      description: a4,
      sections: [payload],
      listType: 1,
    };
    return payload2;
  };
  exports.video = async (value, X) => {
    const Z = {
      GZjpa: "error",
      wFYRI: "end",
      pDKtn: "video",
    };
    await initYoutubeClient(X);
    const mediaFile = await downloadYoutubeMedia(value, Z.pDKtn, undefined, undefined, X);
    const join = path.join(TEMP_DIR, value + "_out.mp4");
    return new Promise((callback, callback2) => {
      fluentFfmpeg(mediaFile)
        .save(join)
        .on(Z.GZjpa, (message) => callback2(new Error(message.message)))
        .on(Z.wFYRI, () => {
          const fileSync = fs.readFileSync(join);
          callback(fileSync);
          fs.rmSync(join);
          fs.rmSync(mediaFile);
        });
    });
  };
  const getEphemeralDuration = async (key, X) => {
    if (!key) {
      return;
    }
    const { isJidGroup: a0 } = await loadBaileys();
    if (!expiration.get(key) && a0(key)) {
      let a1 = await bg(key, X);
      expiration.set(key, a1);
    }
    return expiration.get(key);
  };
  exports.forwardOrBroadCast = async (V, client, Z = {}) => {
    const helpers = {
      oegdG: "quoted",
      QUHhH: "conversation",
      CLuRD: "extendedTextMessage",
      byLSl: function (callback, a8, a9) {
        return callback(a8, a9);
      },
      noFFW: "audioMessage",
    };
    const { proto: a1, generateWAMessageFromContent: a2, delay: a3 } = await loadBaileys();
    let a4 = client.reply_message?.message?.message || client.message?.message;
    if (!a4) {
      return;
    }
    a4 = a1.Message.decode(a1.Message.encode(a4).finish());
    if (helpers.oegdG in Z && !Z.quoted) {
      Z.quoted = client.message;
    }
    let a5 = Object.keys(a4)[0];
    if (helpers.QUHhH === a5) {
      a4.extendedTextMessage = {
        text: a4[a5],
      };
      delete a4.conversation;
      a5 = helpers.CLuRD;
    }
    if (helpers.QUHhH === a5) {
      a4.extendedTextMessage = {
        text: a4[a5],
      };
      delete a4.conversation;
      a5 = helpers.CLuRD;
    } else {
      a4[a5].contextInfo = {};
    }
    if (0 == Z.viewOnce) {
      delete a4[a5]?.viewOnce;
    }
    Object.assign(a4[a5], Z);
    Z.ephemeralExpiration = await helpers.byLSl(
      getEphemeralDuration,
      V,
      client.id || client.client.levanterId,
    );
    Z.userJid = client.client.user.id;
    const a6 = a2(V, a4, Z);
    if (helpers.noFFW == a5) {
      if (Z?.ptt) {
        if (a6.message.ephemeralMessage) {
          a6.message.ephemeralMessage.message[a5].ptt = Z.ptt;
        } else {
          a6.message[a5].ptt = Z.ptt;
        }
      }
      if (Z?.duration) {
        if (a6.message.ephemeralMessage) {
          a6.message.ephemeralMessage.message[a5].seconds = Z.duration;
        } else {
          a6.message[a5].seconds = Z.duration;
        }
      }
    }
    if (Z.linkPreview) {
      delete Z.linkPreview;
    }
    if (Z.contextInfo) {
      if (a6.message.ephemeralMessage) {
        a6.message.ephemeralMessage.message[a5].contextInfo = Object.assign(
          a6.message.ephemeralMessage.message[a5].contextInfo,
          {
            ...Z.contextInfo,
          },
        );
      } else {
        a6.message[a5].contextInfo = Object.assign(a6.message[a5].contextInfo, {
          ...Z.contextInfo,
        });
      }
    }
    try {
      {
        await client.client.relayMessage(V, a6.message, {
          messageId: a6.key.id,
          additionalAttributes: {},
        });
      }
    } catch (error) {
      throw error;
    }
    await a3(1654);
    return a6;
  };
  exports.ctt = (V) =>
    V.toString()
      .replace(V.toString().match(/(\W*)([A-Za-z0-9_ğüşiö ç]*)/)[2], "")
      .match(/(\W*)([A-Za-z0-9ğüşiö ç]*)/)[2]
      .trim();
  const addSpace = (V, X) => " ".repeat(("" + X).length - ("" + V).length);
  exports.addSpace = addSpace;
  const key = (text, index) => {
    let a0 = "";
    text.split("").forEach((index) => {
      {
        let a3 = loadFonts()[index][index];
        a0 += null == a3 ? index : a3;
      }
    });
    return a0;
  };
  exports.textToStylist = key;
  exports.escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  exports.stylishTextGen = (V) => {
    const X = {
      StuvK: function (value, a2) {
        return value + a2;
      },
      FYLlR: function (value, a2) {
        return value + a2;
      },
    };
    let Z = 1;
    let a0 = "";
    for (let key in loadFonts()) {
      a0 += X.StuvK(X.FYLlR(Z, addSpace(Z, 53)), " ");
      a0 += key(V, key);
      a0 += "\n";
      Z++;
    }
    return a0;
  };
  exports.formatTime = (V, X) =>
    X ? moment(V).format("hh:mm a D-M-YYYY") : moment.unix(V).format("hh:mm a D-M-YYYY");
  exports.clearFiles = () => fs.emptyDirSync(path.join(__dirname, "../media/mention/"));
  exports.isUrl = (X = "null") => {
    const Z = {
      DucCP: function (a2, a3) {
        return a2 != a3;
      },
      TbHpl: "string",
    };
    const a0 = Z;
    if (a0.DucCP(a0.TbHpl, typeof X)) {
      return false;
    }
    const match = X.match(URL_REGEX);
    return !!match && match[0];
  };
  const rmComma = (text) =>
    text
      .split(",")
      .filter((X) => X != "")
      .join(",");
  exports.rmComma = rmComma;
  exports.enableAntiFake = async (V, text, Z) => {
    const helpers = {
      WUKwa: "off",
      QzeUA: function (callback, a2) {
        return callback(a2);
      },
      SkzNo: function (callback, a2, a3, a4, a5) {
        return callback(a2, a3, a4, a5);
      },
      UmfwA: function (value, a2) {
        return value + a2;
      },
      KkyXh: function (callback, a2, a3, a4) {
        return callback(a2, a3, a4);
      },
    };
    if ("on" != text && helpers.WUKwa != text) {
      const { enabled: a1 } = await getFake(V, Z);
      text = helpers.QzeUA(rmComma, text.trim());
      await helpers.SkzNo(
        setFake,
        V,
        a1 ?? true,
        helpers.UmfwA(helpers.UmfwA("^(", text.replace(/,/g, "|")), ")"),
        Z,
      );
      const split = text.split(",");
      const filter = split.filter((text) => text.trim().startsWith("!"));
      return {
        allow: filter.map((text) => text.replace("!", "")),
        notallow: split.filter((a4) => !filter.includes(a4)),
      };
    }
    await helpers.KkyXh(setFake, V, "on" == text, Z);
  };
  const parseFakeList = (text) =>
    text
      .replace("\\b", "")
      .replace("\\b", "")
      .replace("(", "")
      .replace(")", "")
      .replace("^", "")
      .split("|");
  exports.antiList = async (V, X, Z) => {
    const a0 = {
      teUMF: "fake",
    };
    if (a0.teUMF === X) {
      const { code: a1 } = await getFake(V, Z);
      return !!a1 && parseFakeList(a1);
    }
  };
  exports.parseGistUrls = (text) => {
    const match = text.match(
      /https:\/\/gist.(githubusercontent|github).com\/([-_.0-9A-Za-z]{0,37})\/([-_0-9A-Za-z]{32})/gm,
    );
    return (
      !!match && match.filter((text) => !text.includes("mask-sir")).map((value) => value + "/raw")
    );
  };
  exports.pluginsList = (text) =>
    text.match(/pattern: ["'](.*)["'],/gm).map((text) =>
      text
        .match(/["'](.*)["'],/gm)[0]
        .split(" ")[0]
        .replace(/'|"/g, ""),
    );
  exports.getQuote = async () => {
    const V = {
      FrWcg: "http://levanter.onrender.com/quote",
    };
    try {
      return (await getJson(V.FrWcg).catch(() => {})).content || "";
    } catch (error) {
      {
        return "";
      }
    }
  };
  exports.trt = async (V, X, Z) =>
    (
      await translateGoogleApi(V, {
        tld: "co.in",
        to: X,
        from: Z,
      })
    )?.join();
  exports.secondsToHms = (V) => {
    const helpers = {
      hcyjo: function (a3, a4) {
        return a3 / a4;
      },
      tPOoo: function (a3, a4) {
        return a3 / a4;
      },
      MkfPT: function (value, a4) {
        return value + a4;
      },
      smMwD: function (value, a4) {
        return value + a4;
      },
      ozDAI: function (value, a4) {
        return value + a4;
      },
      xsWjL: function (value, a4) {
        return value + a4;
      },
    };
    V = Number(V);
    const floor = Math.floor(V / 86400);
    const floor2 = Math.floor(helpers.hcyjo(V % 86400, 3600));
    const floor3 = Math.floor(helpers.tPOoo(V % 3600, 60));
    const floor4 = Math.floor(V % 60);
    return helpers
      .MkfPT(
        helpers.MkfPT(
          helpers.MkfPT(
            floor > 0
              ? helpers.smMwD(
                  floor,
                  1 == floor ? lang.plugins.common.time_day : lang.plugins.common.time_days,
                )
              : "",
            floor2 > 0
              ? helpers.MkfPT(
                  floor2,
                  1 == floor2 ? lang.plugins.common.time_hour : lang.plugins.common.time_hours,
                )
              : "",
          ),
          floor3 > 0
            ? helpers.ozDAI(
                floor3,
                1 == floor3 ? lang.plugins.common.time_minute : lang.plugins.common.time_minutes,
              )
            : "",
        ),
        floor4 && !floor > 0
          ? helpers.xsWjL(
              floor4,
              1 == floor4 ? lang.plugins.common.time_second : lang.plugins.common.time_seconds,
            )
          : "",
      )
      .trim();
  };
  exports.isFeatureEnabled = (text, text2, a0) => {
    const helpers = {
      fMTWh: function (a6, a7) {
        return a6 === a7;
      },
      WdWsL: "null",
      KPfmW: "false",
      xiXHh: "true",
      NdFLd: function (a6, a7) {
        return a6 === a7;
      },
      GoJsZ: "@g.us",
      SnSGS: function (a6, a7) {
        return a6 === a7;
      },
      UXnCC: "status@broadcast",
      vAhEB: "status",
    };
    const helper = helpers;
    if (!text || helper.WdWsL === text || helper.KPfmW === text) {
      return false;
    }
    if (helper.xiXHh === text || "on" === text) {
      return true;
    }
    const map = text.split(",").map((text) => text.trim().toLowerCase());
    const endsWith = text2.endsWith(helper.GoJsZ);
    const a5 = helper.UXnCC === text2;
    return (
      (!!map.includes("p") && !endsWith && !a5) ||
      (!!map.includes("g") && !!endsWith) ||
      (!!map.includes(helper.vAhEB) && !!a5) ||
      !!map.includes(text2.toLowerCase())
    );
  };
  exports.genHydratedButtons = async (Z, a0, a1, client, text) => {
    const helpers = {
      GzGYd: function (a9, aa) {
        return a9 != aa;
      },
      tVItu: "locationMessage",
      YfcAv: "documentMessage",
      KmzTw: function (a9, aa) {
        return a9 == aa;
      },
      SXCTe: "object",
      kWtJI: function (callback, aa) {
        return callback(aa);
      },
      krsPm: "image",
      sHiHW: "video",
      zIHtc: function (callback, aa, ab) {
        return callback(aa, ab);
      },
      qOSZh: "imageMessage",
      dHazr: "videoMessage",
    };
    let a5 = 1;
    const items = [];
    for (const item of Z) {
      if (item.urlButton) {
        items.push({
          index: a5,
          urlButton: {
            displayText: item.urlButton.text,
            url: item.urlButton.url,
          },
        });
        a5++;
      }
      if (item.button) {
        items.push({
          index: a5,
          quickReplyButton: {
            displayText: item.button.text,
            id: item.button.text != item.button.id ? "." + item.button.id : item.button.id,
          },
        });
        a5++;
      }
      if (item.callButton) {
        items.push({
          index: a5,
          callButton: {
            displayText: item.callButton.text,
            phoneNumber: item.callButton.number,
          },
        });
        a5++;
      }
    }
    const payload = {
      hydratedButtons: items,
      hydratedContentText: a0,
      hydratedFooterText: a1,
      headerType: 1,
    };
    const a8 = payload;
    if (text?.location || text?.document) {
      const aa = text.location ? helpers.tVItu : helpers.YfcAv;
      a8.headerType = helpers.tVItu == aa ? 6 : 3;
      text = text.location || text.document;
      a8[aa] = helpers.KmzTw(helpers.SXCTe, typeof text)
        ? text
        : {
            jpegThumbnail: await helpers.kWtJI(
              bq,
              Buffer.isBuffer(text) ? text : (await getBuffer(text), /ytimg/.test(text)).buffer,
            ),
          };
    } else if (text) {
      const ab = {};
      const ac = helpers.krsPm in text ? helpers.krsPm : helpers.sHiHW;
      a8.headerType = helpers.krsPm == ac ? 4 : 5;
      if (helpers.GzGYd(helpers.SXCTe, typeof text[ac]) || Buffer.isBuffer(text[ac])) {
        {
          if (!Buffer.isBuffer(text[ac])) {
            {
              const { buffer: ah } = await helpers.zIHtc(getBuffer, text[ac], /ytimg/.test(text));
              text[ac] = ah;
            }
          }
          ab[ac] = text[ac];
          ab.jpegThumbnail = helpers.krsPm == ac ? await bq(ab[ac]) : (await br(ab[ac])).thumbnail;
          const payload = {
            upload: client.client.waUploadToServer,
          };
          const preparedMedia = await prepareWAMessageMedia(ab, payload);
          if (preparedMedia.imageMessage) {
            a8.imageMessage = preparedMedia.imageMessage;
          } else {
            a8.videoMessage = preparedMedia.videoMessage;
          }
        }
      } else {
        a8[helpers.krsPm == ac ? helpers.qOSZh : helpers.dHazr] = text[ac];
      }
    }
    return a8;
  };
}
exports.getFloor = (V) => Math.floor(V);
exports.store = store;
