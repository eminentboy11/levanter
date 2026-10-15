const crypto = require("crypto");
const net = require("net");
const config = require("../config");
const config2 = require("./config");
const { NodeCache } = require("@cacheable/node-cache");
const { loadBaileys } = require("./baileys");
let b2;
let b3;
const b5 = {
  stdTTL: 600,
  useClones: false,
  checkperiod: 120,
  maxKeys: 5000,
};
const b6 = ["image", "video", "audio", "document"];
const b7 = ["text", ...b6];
const b8 = {
  conversation: "text",
  extendedTextMessage: "text",
  imageMessage: "image",
  videoMessage: "video",
  audioMessage: "audio",
  documentMessage: "document",
};
const b9 = new NodeCache(b5);
const ba = (j) => (String(j).includes("@") ? String(j) : j + "@s.whatsapp.net");
const bb = /^[\w.+-]+(@[\w.-]+)?$/;
const bc = (j) => {
  const z = {
    wgmnM: "localhost",
    RArEF: ".localhost",
    ACzDz: "0|3|4|2|1",
    EppQP: "0.0.0.0",
    FdfNp: "::1",
  };
  const D = String(j)
    .toLowerCase()
    .replace(/^\[|\]$/g, "");
  if (!D || z.wgmnM === D || D.endsWith(z.RArEF)) {
    return true;
  }
  if (net.isIP(D)) {
    const F = z.ACzDz.split("|");
    let Q = 0;
    while (true) {
      switch (F[Q++]) {
        case "0":
          if (z.EppQP === D || "::" === D || z.FdfNp === D) {
            return true;
          }
          continue;
        case "1":
          if (/^(fc|fd|fe80)/.test(D)) {
            return true;
          }
          continue;
        case "2":
          if (/^172\.(1[6-9]|2\d|3[01])\./.test(D)) {
            return true;
          }
          continue;
        case "3":
          if (/^127\./.test(D) || /^10\./.test(D) || /^192\.168\./.test(D)) {
            return true;
          }
          continue;
        case "4":
          if (/^169\.254\./.test(D)) {
            return true;
          }
          continue;
      }
      break;
    }
  }
  return false;
};
const bd = (j) => {
  const z = {
    vgNdU: "http:",
    eahHT: "https:",
  };
  let D;
  try {
    {
      D = new URL(String(j));
    }
  } catch (Q) {
    {
      return false;
    }
  }
  return (z.vgNdU === D.protocol || z.eahHT === D.protocol) && !bc(D.hostname);
};
const be = ({ type: F, text: Q, url: V, fileName: W, mimetype: X, ptt: Y } = {}) => {
  const Z = {
    WQcMW: "text",
    AZGWr: "text is required for type text",
    JDibK: "invalid or unsafe url",
  };
  if (Z.WQcMW === F) {
    if (!Q) {
      throw new Error(Z.AZGWr);
    }
    const a0 = {
      text: Q,
    };
    const a1 = {
      message: a0,
      options: {},
    };
    return a1;
  }
  if (b6.includes(F)) {
    if (!V) {
      throw new Error("url is required for type " + F);
    }
    if (!bd(V)) {
      throw new Error(Z.JDibK);
    }
    const a2 = {};
    const a3 = {
      url: V,
    };
    if (Q) {
      a2.caption = Q;
    }
    if (W) {
      a2.fileName = W;
    }
    if (X) {
      a2.mimetype = X;
    }
    if (Y) {
      a2.ptt = true;
    }
    return {
      message: {
        [F]: a3,
        ...a2,
      },
      options: a2,
    };
  }
  throw new Error("unsupported type: " + F);
};
const bf = (j) =>
  j == null
    ? 0
    : typeof j == "number"
      ? j
      : typeof j.toNumber == "function"
        ? j.toNumber()
        : Number(j) || 0;
const bg = (j, z, D = "") => {
  if (!j || j.fromMe || j.isBot) {
    return null;
  }
  const Q = b8[j.type];
  if (!Q) {
    return null;
  }
  const V = j.key && j.key.id;
  const W = {
    session: String(z),
    id: V,
    from: j.key && j.key.remoteJid,
    sender: j.participant,
    pushName: j.pushName,
    isGroup: !!j.isGroup,
    timestamp: bf(j.messageTimestamp),
    type: Q,
    text: j.text || "",
    media: undefined,
    quoted: j.quoted
      ? {
          id: j.quoted.key && j.quoted.key.id,
          sender: j.quoted.participant,
          text: j.quoted.text || "",
        }
      : null,
  };
  if (b6.includes(Q)) {
    const X = j.message && j.message[j.type];
    W.media = {
      mimetype: X && X.mimetype,
      fileName: X && X.fileName,
      url: D + "/api/media/" + W.session + "/" + V,
    };
  }
  return W;
};
const bh = (z) => {
  const D = {
    pYmIt: "x-api-key",
    uKrIB: function (X, Y) {
      return X != Y;
    },
    PymBj: "string",
    udJmo: function (X, Y) {
      return X === Y;
    },
  };
  const F = D;
  const Q = z.headers[F.pYmIt];
  if (!config.API_KEY || F.uKrIB(F.PymBj, typeof Q)) {
    return false;
  }
  const V = Buffer.from(Q);
  const W = Buffer.from(config.API_KEY);
  return V.length === W.length && crypto.timingSafeEqual(V, W);
};
let bi = null;
async function bj() {
  const V = {
    wBUiM: "./index",
    kvdDc: "XCTAy",
    KkyGX: "xesIp",
    OvUKc: "download failed",
    eexIA: "body too large",
    NmKLL: "(((.+)+)+)+$",
    pbCwV: "LfuLj",
    RNrbV: "sJSMB",
    kozkU: "vsMgt",
    pKUui: "return (function() ",
    ZEkev: '{}.constructor("return this")( )',
    VdFcD: "SUngU",
    zyMbM: "log",
    Zotwf: "warn",
    ZPFov: "info",
    urebv: "error",
    ASXfd: "exception",
    uWCQq: "table",
    bAkNE: "trace",
    YkNEk: function (a0, a1, a2) {
      return a0(a1, a2);
    },
    JuDcv: function (a0, a1, a2) {
      return a0(a1, a2);
    },
    hSgSR: "axios",
    jVdLP: "https://api.ipify.org",
  };
  const W = (function () {
    {
      let a1 = true;
      return function (a2, a3) {
        const a4 = {
          oNFez: V.wBUiM,
          XAkxf: V.kvdDc,
          FWqpP: V.KkyGX,
        };
        {
          const a6 = a1
            ? function () {
                if (a3) {
                  const a8 = a3.apply(a2, arguments);
                  a3 = null;
                  return a8;
                }
              }
            : function () {};
          a1 = false;
          return a6;
        }
      };
    }
  })();
  const X = V.YkNEk(W, this, function () {
    {
      return X.toString().search(V.NmKLL).toString().constructor(X).search(V.NmKLL);
    }
  });
  X();
  const Y = (function () {
    const a0 = {
      ifyLq: function (a2, a3) {
        return a2(a3);
      },
      fDLfF: function (a2, a3) {
        return a2 === a3;
      },
      yOZmd: V.pbCwV,
      jgcoG: V.RNrbV,
    };
    let a1 = true;
    return function (a2, a3) {
      const a5 = a1
        ? function () {
            if (a3) {
              const a6 = a3.apply(a2, arguments);
              a3 = null;
              return a6;
            }
          }
        : function () {};
      a1 = false;
      return a5;
    };
  })();
  const Z = V.JuDcv(Y, this, function () {
    const a0 = {
      gfasG: V.kozkU,
      WJaLP: function (a1, a2) {
        return a1(a2);
      },
      EIWTy: function (a1, a2) {
        return a1 + a2;
      },
      UstAX: V.pKUui,
      BetBI: V.ZEkev,
      FBGZB: V.VdFcD,
    };
    {
      const a2 = function () {
        const a6 = {};
        let a7;
        try {
          a7 = a0.WJaLP(Function, a0.EIWTy(a0.UstAX + a0.BetBI, ");"))();
        } catch (a9) {
          a7 = window;
        }
        return a7;
      };
      const a3 = a2();
      const a4 = (a3.console = a3.console || {});
      const a5 = [V.zyMbM, V.Zotwf, V.ZPFov, V.urebv, V.ASXfd, V.uWCQq, V.bAkNE];
      for (let a6 = 0; a6 < a5.length; a6++) {
        const a7 = Y.constructor.prototype.bind(Y);
        const a8 = a5[a6];
        const a9 = a4[a8] || a7;
        a7.__proto__ = Y.bind(Y);
        a7.toString = a9.toString.bind(a9);
        a4[a8] = a7;
      }
    }
  });
  Z();
  try {
    b3 ||= require(V.hSgSR).default || require(V.hSgSR);
    const { data: a1 } = await b3.get(V.jVdLP, {
      timeout: 5000,
    });
    if (a1) {
      bi = String(a1).trim();
    }
  } catch (a2) {}
}
const bk = () => {
  const z = (F) => String(F).replace(/\/+$/, "");
  const D = process.env.PORT || 3000;
  if (config.API_PUBLIC_URL) {
    return z(config.API_PUBLIC_URL);
  } else if (process.env.RENDER_EXTERNAL_URL) {
    return z(process.env.RENDER_EXTERNAL_URL);
  } else if (config.HEROKU_APP_NAME) {
    return "https://" + config.HEROKU_APP_NAME + ".herokuapp.com";
  } else if (bi) {
    return "http://" + bi + ":" + D;
  } else {
    return "http://localhost:" + D;
  }
};
const bl =
  config.API_ENABLED &&
  !config.API_PUBLIC_URL &&
  !process.env.RENDER_EXTERNAL_URL &&
  !config.HEROKU_APP_NAME;
const bm = bl ? bj() : Promise.resolve();
let bn = null;
const bo = () => (bn ||= bk());
const bp = (D, F, Q) => {
  const W = {
    qzXFw: "application/json",
  };
  const X = {
    "Content-Type": W.qzXFw,
  };
  D.writeHead(F, X);
  D.end(JSON.stringify(Q));
};
const bq = 1048576;
const br = (j) =>
  new Promise((z, D) => {
    const F = {
      sVKWS: "return (function() ",
      zDBNZ: '{}.constructor("return this")( )',
      VHEOE: "body too large",
      ZvufF: "utf8",
      fvoUC: function (X, Y) {
        return X(Y);
      },
      zAbKK: "incoming.message",
      NllPJ: "data",
      bxgGk: "end",
      MZcyZ: "error",
    };
    const Q = [];
    let V = 0;
    let W = false;
    j.on(F.NllPJ, (X) => {
      {
        if (W) {
          return;
        }
        const a0 = Buffer.isBuffer(X) ? X : Buffer.from(String(X));
        V += a0.length;
        if (V > bq) {
          W = true;
          const a1 = new Error(F.VHEOE);
          a1.statusCode = 413;
          if (j.resume) {
            j.resume();
          }
          return D(a1);
        }
        Q.push(a0);
      }
    });
    j.on(F.bxgGk, () => {
      {
        if (W) {
          return;
        }
        W = true;
        const X = Buffer.concat(Q).toString(F.ZvufF);
        try {
          F.fvoUC(z, X ? JSON.parse(X) : {});
        } catch (Y) {
          {
            D(Y);
          }
        }
      }
    });
    j.on(F.MZcyZ, (X) => {
      {
        if (!W) {
          W = true;
          D(X);
        }
      }
    });
  });
const bs = (j) => {
  const D = String(j);
  const F = config2.sessions;
  if (Array.isArray(F) && F.includes(D)) {
    return config2[D];
  }
};
const bt = (j) => !!j && !!j.sock;
async function bu(Q, V) {
  const W = {
    PluDl: function (a9, aa, ab, ac) {
      return a9(aa, ab, ac);
    },
    jyUFu: function (a9, aa, ab, ac) {
      return a9(aa, ab, ac);
    },
    EDZws: "body too large (max 1MB)",
    iIrEP: "invalid json",
    NOdPJ: function (a9, aa) {
      return a9 != aa;
    },
    wxBRf: "object",
    PmcIQ: function (a9, aa, ab, ac) {
      return a9(aa, ab, ac);
    },
    iqPol: "body must be a json object",
    KhQGQ: "to and type are required",
    mZqGL: "invalid to",
    kTiCN: "bot is starting, try again shortly",
    CiTiH: "session not connected",
    lIuqB: "prepare_message",
    jifOD: function (a9, aa, ab, ac) {
      return a9(aa, ab, ac);
    },
    jHQDz: "send failed",
  };
  let X;
  try {
    {
      X = await br(Q);
    }
  } catch (aa) {
    if (413 === aa.statusCode) {
      return W.jyUFu(bp, V, 413, {
        error: W.EDZws,
      });
    } else {
      return W.jyUFu(bp, V, 400, {
        error: W.iIrEP,
      });
    }
  }
  if (!X || W.NOdPJ(W.wxBRf, typeof X) || Array.isArray(X)) {
    return W.PmcIQ(bp, V, 400, {
      error: W.iqPol,
    });
  }
  const { to: Y, type: Z, quoted: a0 } = X;
  const a1 = undefined === X.session || null === X.session ? "0" : X.session;
  if (!Y || !Z) {
    return W.PluDl(bp, V, 400, {
      error: W.KhQGQ,
    });
  }
  if (!bb.test(String(Y))) {
    return W.PmcIQ(bp, V, 400, {
      error: W.mZqGL,
    });
  }
  if (!b7.includes(Z)) {
    return W.PmcIQ(bp, V, 400, {
      error: "unsupported type: " + Z,
    });
  }
  if (!Array.isArray(config2.sessions)) {
    return W.PmcIQ(bp, V, 503, {
      error: W.kTiCN,
    });
  }
  const a2 = bs(a1);
  const a3 = {
    error: "unknown session: " + a1,
  };
  if (!a2 || !a2.queue) {
    return bp(V, 400, a3);
  }
  if (!bt(a2)) {
    return W.PmcIQ(bp, V, 503, {
      error: W.CiTiH,
    });
  }
  let a4;
  try {
    a4 = be(X);
  } catch (ab) {
    {
      const ac = {
        error: ab.message,
      };
      return bp(V, 400, ac);
    }
  }
  const a5 = a4.options;
  if (a0) {
    const ae = b9.get(String(a1) + ":" + a0);
    if (ae && ae.msg) {
      a5.quoted = ae.msg;
    }
  }
  const a6 = ba(Y);
  let a7;
  try {
    {
      const af = {
        type: W.lIuqB,
        chat: a6,
        message: a4.message,
        options: a5,
      };
      a7 = await a2.queue.push(af);
    }
  } catch (ah) {
    {
      return W.jifOD(bp, V, 500, {
        error: W.jHQDz,
      });
    }
  }
  const a8 = {
    status: 200,
    id: a7 && a7.key ? a7.key.id : undefined,
  };
  return bp(V, 200, a8);
}
const bv = 30000;
async function bw(z, D, F, Q) {
  const V = {
    xWvGS: function (X, Y, Z, a0) {
      return X(Y, Z, a0);
    },
    VdrND: "media not found or expired",
    ZUHDl: "buffer",
    sYPPN: "application/octet-stream",
    Excqz: "download failed",
  };
  const W = b9.get(String(F) + ":" + Q);
  if (!W || !W.msg || !W.mimetype) {
    return V.xWvGS(bp, D, 404, {
      error: V.VdrND,
    });
  }
  try {
    b2 ||= (await loadBaileys()).downloadMediaMessage;
    const X = await Promise.race([
      b2(W.msg, V.ZUHDl),
      new Promise((Z, a0) => setTimeout(() => a0(new Error("media download timeout")), bv)),
    ]);
    const Y = {
      "Content-Type": W.mimetype || V.sYPPN,
    };
    D.writeHead(200, Y);
    D.end(X);
  } catch (Z) {
    {
      V.xWvGS(bp, D, 500, {
        error: V.Excqz,
      });
    }
  }
}
let bx;
const by = (j) => {
  const z = {
    kEeYZ: "./index",
  };
  const D = j && j.sock && j.sock.user;
  const F = D && (D.jid || D.id);
  if (F) {
    bx ||= require(z.kEeYZ).jidToNum;
    return bx(F).split(":")[0] || null;
  } else {
    return null;
  }
};
function bz(z, D) {
  const F = {
    EgXIE: function (W, X, Y, Z) {
      return W(X, Y, Z);
    },
    uJJqt: "bot is starting, try again shortly",
  };
  if (!Array.isArray(config2.sessions)) {
    return F.EgXIE(bp, D, 503, {
      error: F.uJJqt,
    });
  }
  const Q = (config2.sessions || []).map((W) => {
    const X = config2[W] || {};
    return {
      id: W,
      name: (X.env && X.env.SESSION_NAME) || W,
      connected: bt(X),
      number: by(X),
    };
  });
  const V = {
    count: Q.length,
    sessions: Q,
  };
  bp(D, 200, V);
}
async function bA(j, z) {
  const D = {
    wpzAl: function (F, Q, V, W) {
      return F(Q, V, W);
    },
    FCKqN: function (F, Q, V, W) {
      return F(Q, V, W);
    },
    pGxIc: "Unauthorized",
    wCQQy: "POST",
    wpJZa: "send",
    xtHWg: "GET",
    wBVBc: "media",
    sfJRt: "sessions",
    dMvYc: "Not Found",
    KZili: function (F, Q, V, W) {
      return F(Q, V, W);
    },
    VVkgb: "internal error",
  };
  try {
    if (!bh(j)) {
      return D.wpzAl(bp, z, 401, {
        status: 401,
        error: D.pGxIc,
      });
    }
    const F = j.url.split("?")[0].split("/").filter(Boolean);
    const Q = F[1];
    if (D.wCQQy === j.method && D.wpJZa === Q) {
      return await bu(j, z);
    } else if (D.xtHWg === j.method && D.wBVBc === Q) {
      return await bw(j, z, F[2], F[3]);
    } else if (D.xtHWg === j.method && D.sfJRt === Q) {
      return bz(j, z);
    } else {
      return D.FCKqN(bp, z, 404, {
        error: D.dMvYc,
      });
    }
  } catch (V) {
    {
      if (!z.headersSent) {
        D.KZili(bp, z, 500, {
          error: D.VVkgb,
        });
      }
    }
  }
}
function bB(z, D) {
  const F = {
    JFbIk: "AxZve",
    ALonR: "MCzmp",
    lKEFK: "VSBQU",
    OEFWF: "PUEbv",
    KlRuQ: "./index",
    zPqaJ: function (Q, V, W, X) {
      return Q(V, W, X);
    },
    UDlfG: "axios",
  };
  try {
    if (!z || z.fromMe || z.isBot) {
      return;
    }
    const Q = b8[z.type];
    if (!Q) {
      return;
    }
    const V = z.key && z.key.id;
    if (V && z.message) {
      const W = z.message[z.type];
      try {
        {
          const Y = {
            key: z.key,
            message: z.message,
          };
          b9.set(String(D) + ":" + V, {
            msg: Y,
            mimetype: b6.includes(Q) ? W && W.mimetype : undefined,
          });
        }
      } catch (Z) {}
    }
    if (!config.API_WEBHOOK_URL) {
      return;
    }
    bm.then(() => {
      const a0 = {
        qqfHi: function (a2, a3) {
          return a2(a3);
        },
        JtGkX: F.JFbIk,
        GZoUD: F.ALonR,
        FjewC: F.lKEFK,
        sGxpM: F.OEFWF,
        UcInC: F.KlRuQ,
      };
      const a1 = F.zPqaJ(bg, z, D, bo());
      if (a1) {
        b3 ||= require(F.UDlfG).default || require(F.UDlfG);
        b3.post(config.API_WEBHOOK_URL, a1, {
          headers: {
            "x-api-key": config.API_KEY,
          },
          timeout: 15000,
        }).catch((a2) => {
          try {
            require(a0.UcInC).logger.debug("api webhook post failed: " + a2.message);
          } catch (a4) {}
        });
      }
    });
  } catch (a0) {}
}
function bC(j) {
  const z = {
    SMrWV: "incoming.message",
  };
  j.on(z.SMrWV, (D) => {
    bB(D, D.session);
  });
}
const bD = {
  resolveJid: ba,
  buildContent: be,
  buildWebhookPayload: bg,
  authOk: bh,
  resolvePublicUrl: bk,
  handle: bA,
  onIncoming: bB,
  subscribe: bC,
  msgCache: b9,
};
module.exports = bD;
