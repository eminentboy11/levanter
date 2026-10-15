const { default: axios } = require("axios");
const {
  createWriteStream,
  createReadStream,
  statSync,
  readFileSync,
  writeFileSync,
  existsSync,
  writeFile,
} = require("fs-extra");
const path = require("path");
const aL = "lv_9f3c1a7e2b8d4c6f0a1e5b7d9c2f4a6e";
const { TEMP_DIR } = require("./constant");
const config = require("../config");
const aO = isNaN(config.MAX_UPLOAD) ? 230 : config.MAX_UPLOAD;
const aP = Number(aO > 1998 ? 1998 : aO);
const aQ = {
  mp4: "video/mp4",
  mp3: "audio/mpeg",
  png: "image/png",
  pdf: "application/pdf",
  zip: "application/zip",
  apk: "application/vnd.android.package-archive",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
  bmp: "image/bmp",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  txt: "text/plain",
  csv: "text/csv",
  json: "application/json",
  xml: "application/xml",
  tar: "application/x-tar",
  gz: "application/gzip",
  rar: "application/vnd.rar",
  mpeg: "video/mpeg",
  avi: "video/x-msvideo",
  mov: "video/quicktime",
  flv: "video/x-flv",
  wmv: "video/x-ms-wmv",
  m4v: "video/x-m4v",
  mkv: "video/x-matroska",
  ogg: "audio/ogg",
  wav: "audio/wav",
  aac: "audio/aac",
  flac: "audio/flac",
  opus: "audio/opus",
};
const aR = "aWxvdmV5b3Vzb29vb29vbWF0Y2hidXRpZG9udGtub3d3aHlpbGlrZWxvdmV3YW50dQ==";
const { iChecker } = require("./test/test");
const aT = iChecker();
const aU = aT == aR;
function aV(P) {
  try {
    new URL(P);
  } catch (Q) {
    throw new Error("invalid url: " + P);
  }
}
const aW = (P = "") =>
  P.replace(/\s+/g, "_")
    .replace(/[\/\\?%*:|"<>]/g, "")
    .replace(/^(?:[a-z0-9-]+\.[a-z]{2,}[_\-\s]+)+/i, "")
    .substring(0, 255);
if (aU) {
  const aX = "https://levanter.onrender.com/url";
  const aY = require("https");
  const aZ = require("http");
  const b0 = async (P) => {
    const Q = {
      yfXbN: "file-type",
    };
    const { fileTypeFromBuffer: Y } = await import(Q.yfXbN);
    const Z = await Y(P);
    return Z?.mime;
  };
  const b1 = async (P) => {
    const Q = P.split(".").pop();
    return aQ[Q];
  };
  const b2 = (Q) => {
    const Y = {
      mUymf: "filename[^;=\\n]*=(([\"']).*?\\2|[^;\\n]*)",
      RYtjY: function (a1, a2) {
        return a1 != a2;
      },
    };
    const Z = Y;
    const a0 = new RegExp(Z.mUymf).exec(Q);
    if (null != a0 && a0[1]) {
      return a0[1].replace(/['"]/g, "");
    } else {
      return Q;
    }
  };
  const b3 = new Set();
  const b4 = (P) => {
    let Q = new URL(P);
    return path.basename(Q.pathname);
  };
  function b5(Q) {
    const Z = {
      sPIck: "data",
      eagsD: "end",
      xFxyc: "error",
    };
    return new Promise((a0, a1) => {
      const a2 = [];
      Q.on(Z.sPIck, (a3) => a2.push(a3));
      Q.on(Z.eagsD, () => a0(Buffer.concat(a2)));
      Q.on(Z.xFxyc, (a3) => a1(a3));
    });
  }
  exports.nameFromUrl = b4;
  const b8 = {
    headers: {
      "User-Agent": "APKUpdater-v1",
      Authorization: "Basic YXBpLWFwa3VwZGF0ZXI6cm01cmNmcnVVakt5MDRzTXB5TVBKWFc4",
      "Content-Type": "application/json",
    },
  };
  const b9 = async (P, Q, Y, Z, a0) => {
    const a1 = {
      yIaZx: function (a9, aa, ab, ac, ad) {
        return a9(aa, ab, ac, ad);
      },
      FsODl: "finish",
      BxtKy: "error",
      fcLwr: function (a9, aa) {
        return a9(aa);
      },
      YLxhB: "content-length",
    };
    const a2 = bc(P);
    const a3 = await axios(a2);
    if (200 != a3.status) {
      return {
        error: a1.BxtKy,
      };
    }
    const a4 = a1.fcLwr(bd, a3.headers[a1.YLxhB]);
    if (a4 > aP) {
      return {
        buffer: false,
        size: a4,
      };
    }
    const { mimetype: a5, name: a6 } = await be(a3);
    const a7 = path.join(TEMP_DIR, a0 || a6);
    let a8 = createWriteStream(a7);
    a3.data.pipe(a8);
    if (Q) {
      bi();
    }
    return new Promise((a9, aa) => {
      {
        a8.on(a1.FsODl, () => {
          const ab = a1.yIaZx(bj, a5, a4, path.basename(a7), createReadStream(a7));
          a9(ab);
          a8 = null;
        });
        a8.on(a1.BxtKy, aa);
      }
    });
  };
  const ba = async (P, Q = false, Y, Z, a0 = false, a1, a2, a3) => {
    const a4 = {
      cbOhB: "error",
      BGysU: function (a5, a6) {
        return a5 + a6;
      },
      ZebEb: function (a5, a6) {
        return a5(a6);
      },
      jXvLR: "content-length",
      CFnPi: function (a5, a6, a7, a8, a9, aa, ab, ac, ad) {
        return a5(a6, a7, a8, a9, aa, ab, ac, ad);
      },
    };
    aV(P);
    try {
      {
        if (a0) {
          return await b9(P, Y, Z, a0, a1);
        }
        const a6 = path.join(TEMP_DIR, a4.BGysU(b4(P), a3 || ""));
        if (Q && existsSync(a6)) {
          return bb(a6);
        }
        const a7 = bc(P);
        const a8 = await axios(a7);
        if (200 != a8.status) {
          return {
            error: a4.cbOhB,
          };
        }
        const a9 = a4.ZebEb(bd, a8.headers[a4.jXvLR]);
        if (a9 > aP) {
          return {
            buffer: false,
            size: a9,
          };
        }
        const { mimetype: aa, name: ab } = await be(a8);
        if (ab && aa && a9 > 80) {
          return {
            data: true,
            buffer: a8.data,
            name: ab,
            size: a9,
            mimetype: aa,
            type: aa?.split("/")[0],
          };
        }
        const ac = await b5(a8.data);
        const ad = await bf(aa, ac, ab);
        if (Q && bg(ab)) {
          bh(ab, ac, a3);
        }
        if (Y) {
          bi();
        }
        return bj(ad, a9, ab, ac);
      }
    } catch (ae) {
      {
        return await a4.CFnPi(bk, a2 || ae, P, Q, Y, Z, a0, a1, a3);
      }
    }
  };
  const bb = async (P) => {
    const Y = readFileSync(P);
    const Z = await b0(Y);
    return {
      buffer: Y,
      name: path.basename(P),
      mimetype: Z,
      type: Z?.split("/")[0],
    };
  };
  const bc = (a0) => {
    const a1 = {
      mVWll: "apkmirror",
      YpMRm: function (a6, a7) {
        return a6 !== a7;
      },
      zPJjz: "ijOoL",
      kzDYc: "Krkju",
      FHpUd: '"Linux"',
      oqHtt: "document",
      ECPmk: "navigate",
      gNiSc: "none",
      qoAtA:
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      COqih: "ssscdn.io/fget",
      xvSdE: "ssstik.top/fget",
      IQdUU: "https://fget.io/",
      Pvuxp: "/json/",
      LoaIa: "x-session-guard",
      ZUhKM: "get",
      nwQoH: "stream",
      HlEvv: function (a6, a7) {
        return a6 == a7;
      },
      Uxmgz: "http:",
    };
    const a2 = a1;
    let a3;
    if (a0.includes(a2.mVWll)) {
      a3 = b8;
    } else {
      const a6 = {
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": a2.FHpUd,
        "sec-fetch-dest": a2.oqHtt,
        "sec-fetch-mode": a2.ECPmk,
        "sec-fetch-site": a2.gNiSc,
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "User-Agent": a2.qoAtA,
      };
      const a7 = a6;
      if (a0.includes(a2.COqih) || a0.includes(a2.xvSdE)) {
        a7.Referer = a2.IQdUU;
      }
      if (a0.includes(a2.Pvuxp)) {
        a7[a2.LoaIa] = aL;
      }
      a3 = {
        headers: a7,
      };
    }
    const a4 = {
      rejectUnauthorized: false,
      keepAlive: true,
    };
    const a5 = {
      rejectUnauthorized: false,
      keepAlive: true,
    };
    return {
      method: a2.ZUhKM,
      url: a0,
      responseType: a2.nwQoH,
      agent: a2.HlEvv(a2.Uxmgz, new URL(a0).protocol) ? new aZ.Agent(a4) : new aY.Agent(a5),
      rejectUnauthorized: false,
      ...a3,
    };
  };
  const bd = (P) => (P / 1000000).toFixed(2);
  const be = async (P) => {
    const Q = {
      pVpfI: "content-type",
      mpgUx: "content-disposition",
      drEfa: "application",
      FaOFY: "application/octet-stream",
    };
    let Y = P.headers[Q.pVpfI]?.split(";")[0];
    const Z = P.headers[Q.mpgUx];
    const a0 = Z ? b2(Z) : b4(P.request.res.responseUrl);
    let a1;
    if (Y && a0 && Y.startsWith(Q.drEfa)) {
      a1 = a0.split(".").pop();
      Y = aQ[a1] || Y;
    }
    if (!Y && a0) {
      a1 = a0.split(".").pop();
      Y = aQ[a1] || Q.FaOFY;
    }
    return {
      mimetype: Y,
      name: aW(a0),
      ext: a1,
    };
  };
  const bf = async (P, Q, Y) => {
    if (!!/octet/.test(P) || !P) {
      P = await b0(Q);
    }
    if (/application/.test(P)) {
      {
        const a1 = await b1(Y);
        if (a1) {
          P = a1;
        }
      }
    }
    return P;
  };
  const bg = (P) => P && P.split(".").length > 1;
  const bh = (P, Q, Y) => {
    const Z = {
      SdPJT: function (a1, a2) {
        return a1 + a2;
      },
      WcSGr: function (a1, a2, a3, a4) {
        return a1(a2, a3, a4);
      },
    };
    const a0 = path.join(TEMP_DIR, Z.SdPJT(P, Y || ""));
    Z.WcSGr(writeFile, a0, Q, () => {
      b3.add(P);
    });
  };
  const bi = () => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 1;
  };
  const bj = (P, Q, Y, Z) => ({
    type: P?.split("/")[0],
    size: Q,
    name: Y,
    buffer: Z,
    mimetype: P,
    data: false,
  });
  const bk = async (P, Q, Y, Z, a0, a1, a2, a3) =>
    P.message && P.message.includes("unable to verify") && !Z
      ? ((process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0), await ba(Q, Y, true, a0, a1, a2, null, a3))
      : !a0 && P.request && P.request.path && (Q.includes("cdninstagram") || Q.includes("fbcdn"))
        ? ((Q = "https://scontent.cdninstagram.com" + P.request.path),
          await ba(Q, Y, false, true, a1, a2, null, a3))
        : Q.startsWith(aX) || Q.includes("levanter.onrender")
          ? (Q.startsWith(aX) && (Q = Q.replace(aX + "?url=", "")),
            {
              error:
                "```status : " +
                (P?.response?.status || P) +
                "\nreason : " +
                (P?.response?.statusText || P.message) +
                "\nurl : " +
                Q +
                "```",
            })
          : await ba(aX + "?url=" + Q, false, Z, a0, a1, a2, P, a3);
  exports.getBuffer = ba;
  exports.getJson = async (P) => {
    const Q = {
      gOreZ: function (Y, Z) {
        return Y(Z);
      },
      qRdXn: "get",
      QQVEa: "json",
    };
    try {
      return (
        await Q.gOreZ(axios, {
          method: Q.qRdXn,
          url: P,
          responseType: Q.QQVEa,
          timeout: 32000,
          rejectUnauthorized: false,
        })
      ).data;
    } catch (Y) {
      throw new Error(Y.message);
    }
  };
  exports.download = async (Y, Z) => {
    const a0 = {
      vRkTH: "video",
      ZxbBo: "image",
      FCDWm: "Downloading %s Failed",
    };
    const a1 = {
      error: true,
      ext: "",
      type: "",
    };
    if (b3.has(Y)) {
      return a1;
    }
    const { buffer: a2, name: a3, type: a4 } = await ba(Y, false, false, false, false, Z);
    const a5 = {
      error: true,
      ext: "",
      type: "",
    };
    if (0 == a2 || (a0.vRkTH != a4 && a0.ZxbBo != a4)) {
      b3.add(Y);
      console.log(a0.FCDWm, Y);
      return a5;
    } else {
      return {
        ext: a3.split(".").pop(),
        type: a4,
        error: false,
        buffer: a2,
      };
    }
  };
}
