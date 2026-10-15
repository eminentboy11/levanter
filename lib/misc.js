const aj = (...D) => import("node-fetch").then(({ default: F }) => F(...D));
const cheerio = require("cheerio");
const { join } = require("path");
const pdfkit = require("pdfkit");
const {
  readFileSync,
  emptyDirSync,
  readdirSync,
  createWriteStream,
  ensureDirSync,
  existsSync,
} = require("fs-extra");
const at = require("axios").default;
const ws = require("ws");
const config = require("./config");
const { genButtonMessage, getUrl } = require("./utils");
const { getSpam } = require("./db");
const { spamCheck } = require("./antilink");
const { TEMP_DIR } = require("./constant");
const aB =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";
const aC = 600000;
let aD = null;
function aE() {
  const F = () => Math.floor(Math.random() * 256);
  let G;
  while (true) {
    {
      G = F() + "." + F() + "." + F() + "." + F();
      const [H] = G.split(".").map(Number);
      if (!(0 === H) && !(10 === H) && !(127 === H) && !(H >= 224)) {
        break;
      }
    }
  }
  return G;
}
exports.getImgUrl = async (D) => {
  const F = {
    wrhDv: "#il_fi",
    BLlnp: "src",
  };
  const G = await aj(D);
  if (!G.ok) {
    throw new Error("Failed to fetch data: " + G.statusText);
  }
  const H = await G.text();
  return cheerio.load(H)(F.wrhDv).attr(F.BLlnp);
};
exports.getCommon = function (F, G) {
  const H = {
    GBoWJ: function (J, K) {
      return J === K;
    },
    pbZYv: "sRYqj",
    FUDoY: function (J, K) {
      return J + K;
    },
    FyaVA: function (J, K) {
      return J > K;
    },
  };
  const I = H;
  if (G) {
    {
      const J = new Map();
      for (const L of F) {
        for (const M of L) {
          J.set(M, I.FUDoY(J.get(M) || 0, 1));
        }
      }
      const K = [];
      for (const [N, O] of J.entries()) {
        if (O > 1) {
          K.push(N);
        }
      }
      return K;
    }
  }
  return F.reduce((Q, R) => Q.filter((S) => R.includes(S)));
};
exports.buttonMessage = async (D, F) => {
  const G = {
    LawVB: "image",
    DuENa: "video",
    OwITO: "document",
  };
  let H;
  const I = [];
  const J = D[0];
  const K = D[1];
  for (let L = 2; L < D.length; L++) {
    if (D[L].length > 0) {
      I.push({
        id: D[L],
        text: D[L],
      });
    }
  }
  if (F.reply_message && F.reply_message.mimetype) {
    H = {
      [F.reply_message.image ? G.LawVB : F.reply_message.video ? G.DuENa : G.OwITO]:
        F.reply_message.message.message[F.reply_message.type],
    };
  }
  return await genButtonMessage(I, J, K, H, F);
};
exports.toPdf = async function () {
  const D = {
    RoCll: function (I, J) {
      return I(J);
    },
    HOEGj: "center",
    NhoyQ: function (I, J) {
      return I != J;
    },
    DPkfJ: "finish",
    TxgSc: "pdf",
    KBXYT: "Not added pages, Use page command",
    btORK: "pdf.pdf",
  };
  const F = join(TEMP_DIR, D.TxgSc);
  ensureDirSync(F);
  const G = existsSync(F) ? readdirSync(F) : [];
  if (0 == G.length) {
    throw new Error(D.KBXYT);
  }
  const H = join(TEMP_DIR, D.btORK);
  return await new Promise((I) => {
    const J = [841.89, 1190.55];
    const K = new pdfkit({
      margin: 0,
      size: J,
    });
    for (let L = 0; L < G.length; L++) {
      K.image(join(F, G[L]), 0, 0, {
        fit: J,
        align: D.HOEGj,
        valign: D.HOEGj,
      });
      if (D.NhoyQ(G.length, L + 1)) {
        K.addPage();
      }
    }
    K.end();
    K.pipe(createWriteStream(H)).on(D.DPkfJ, function () {
      emptyDirSync(F);
      D.RoCll(I, readFileSync(H));
    });
  });
};
exports.isSpam = async (D, F, G, H, I, J, K, L) => {
  const M = {
    qlohp: function (Q, R, S, T, U, V, W, X, Y, Z) {
      return Q(R, S, T, U, V, W, X, Y, Z);
    },
    CWmco: "medium",
    ILpBz: "kick",
  };
  const N = await getSpam(D, L);
  if (!N || !N.enabled) {
    return false;
  }
  const { level: O, action: P } = N;
  return {
    isSpam: M.qlohp(spamCheck, D, F, G, H, I, J, K, O || M.CWmco, L),
    action: P || M.ILpBz,
  };
};
const aG = {
  messages: [],
  t: 0,
};
exports.getGPTResponse = async function (H, I, J) {
  const K = {
    SRWhm: function (P, Q) {
      return P(Q);
    },
    uByeU: "init",
    zmVuF: function (P, Q) {
      return P(Q);
    },
    BSEYN: "set_ip",
    aSXFM: function (P, Q) {
      return P(Q);
    },
    NUmYo: "set_client_info",
    GaaLE: "https://www.hotbot.com/",
    RMBHY: "check_auth",
    KlqVi: function (P, Q) {
      return P(Q);
    },
    nsQAX: "key",
    lAkzB: "assert_act",
    yvuTJ: "ack_act",
    SbJCn: function (P, Q) {
      return P(Q);
    },
    PEVsw: "get_histories",
    hFkai: "histories",
    csixI: function (P, Q) {
      return P(Q);
    },
    DtQvF: "get_history",
    JFKUz: function (P, Q) {
      return P(Q);
    },
    HWoaV: "new_history",
    qPeMQ: "history",
    ijall: "chat_delta",
    OOHav: function (P, Q) {
      return P == Q;
    },
    UadVc: "string",
    NyTgt: "chat_full",
    VnbAV: function (P, Q, R) {
      return P(Q, R);
    },
    teHDZ: "comp_done",
    GQHcC: "limit_reached",
    wswxo: "limitreached",
    qBSeF: "RATE_LIMIT",
    pgtHp: "ack_auth",
    dnNzV: "SERVICE_UNAVAILABLE",
    vCznO: "return (function() ",
    RmpJj: '{}.constructor("return this")( )',
    XzdSO: "new_chat",
    NBCuY: "image_url",
    doLOO: "low",
    ZWSIZ: "text",
    rHEAn: "new_chat_img",
    NnhOm: "wss://assistant.hotbot.com/",
    OCFgy: "https://www.hotbot.com",
    RlvNY: "en-US,en;q=0.9",
    DJZmx: "message",
    DAwbA: "error",
    FLsam: "close",
    EyxUN: "missing session",
    HsWEm: function (P, Q) {
      return P / Q;
    },
    cmvTm: function (P, Q) {
      return P > Q;
    },
    uVlWo: "user",
    OpJae: function (P, Q) {
      return P >= Q;
    },
    Ikhuw: "free",
    cdtid: "https://www.hotbot.com/chat",
    EZDEt: "text/html",
    pEcxU: "set-cookie",
    wcKaT: "assistant",
    BBasn: "Rate limit reached. Please try again in a few minutes.",
    ZxvTr: "TIMEOUT",
    DRfKR: "GPT request timed out. Please try again.",
    EJnpU: "Failed to get GPT response. Please try again later.",
    bRSUO: "https://api.openai.com/v1/chat/completions",
    yMref: "post",
    xwriI: "application/json",
  };
  if (!I) {
    throw new Error(K.EyxUN);
  }
  const L = K.HsWEm(new Date().getTime(), 1000);
  let M;
  if (K.cmvTm(L - aG.t, 600)) {
    aG.messages = [];
  }
  aG.t = L;
  if (J) {
    M = await getUrl(J, true);
    H = [
      {
        type: K.ZWSIZ,
        text: H,
      },
      {
        type: K.NBCuY,
        image_url: {
          url: M,
        },
      },
    ];
  }
  aG.messages.push({
    role: K.uVlWo,
    content: H,
  });
  if (aG.messages.length >= 10) {
    aG.messages.shift();
  }
  if (K.Ikhuw === config[I].env.GPT) {
    {
      const P = K.OOHav(K.UadVc, typeof H) ? H : H[0]?.text || "";
      try {
        const Q = Date.now();
        if (!aD || K.OpJae(Q - aD.lastActivity, aC)) {
          let T;
          try {
            {
              T = await at.get(K.cdtid, {
                headers: {
                  "User-Agent": aB,
                  Accept: K.EZDEt,
                  "Accept-Language": K.RlvNY,
                },
                timeout: 15000,
              });
            }
          } catch {
            throw new Error(K.dnNzV);
          }
          const U = T.data;
          const V = (T.headers[K.pEcxU] || []).map((a0) => a0.split(";")[0]).join("; ");
          const W = (U.match(/hbai\.setAuth\(['"]([a-f0-9]+)['"]\)/) || [])[1];
          const X = (U.match(/hbai\.actor\s*=\s*['"]([a-f0-9-]+)['"]/) || [])[1];
          const Y = (U.match(/hbai\.init\(['"]([a-f0-9-]+)['"]/) || [])[1];
          if (!W || !X || !Y) {
            throw new Error(K.dnNzV);
          }
          aD = {
            cookies: V,
            auth: W,
            actor: X,
            appKey: Y,
            histId: null,
            lastActivity: Q,
            ip: aE(),
          };
        } else {
          aD.lastActivity = Q;
        }
        const R = await new Promise((a0, a1) => {
          const a2 = {
            wYCOk: K.XzdSO,
            RFWYc: K.NBCuY,
            pruVo: K.doLOO,
            SYKeK: K.ZWSIZ,
            hOyED: K.rHEAn,
            vxjoj: function (ac, ad) {
              return ac(ad);
            },
            fSRTH: K.dnNzV,
          };
          const a3 = new ws(K.NnhOm, {
            headers: {
              "User-Agent": aB,
              Origin: K.OCFgy,
              Cookie: aD.cookies,
              "Accept-Language": K.RlvNY,
            },
            handshakeTimeout: 15000,
          });
          let a4 = null;
          let a5 = aD.histId || null;
          let a6 = "";
          let a7 = false;
          let a8 = false;
          const a9 = (ac, ad) => {
            {
              if (!a7) {
                a7 = true;
                try {
                  a3.close();
                } catch {}
                if (ac) {
                  a1(ac);
                } else {
                  a0(ad);
                }
              }
            }
          };
          const aa = K.VnbAV(setTimeout, () => a9(new Error("TIMEOUT")), 90000);
          const ab = (ac) => {
            if (a4) {
              ac.con_id = a4;
            }
            try {
              a3.send(JSON.stringify(ac));
            } catch (ad) {
              {
                a9(ad);
              }
            }
          };
          a3.on(K.DJZmx, (ac) => {
            {
              let aI;
              try {
                {
                  aI = JSON.parse(ac.toString());
                }
              } catch {
                return;
              }
              switch (aI.type) {
                case K.uByeU:
                  a4 = aI.con;
                  K.zmVuF(ab, {
                    type: K.BSEYN,
                    ip: aD.ip,
                  });
                  K.aSXFM(ab, {
                    type: K.NUmYo,
                    info: {
                      ip: aD.ip,
                      ref: K.GaaLE,
                      xff: null,
                      ua: aB,
                    },
                  });
                  K.zmVuF(ab, {
                    type: K.RMBHY,
                    auth_key: aD.auth,
                  });
                  K.KlqVi(ab, {
                    type: K.nsQAX,
                    k: aD.appKey,
                  });
                  K.zmVuF(ab, {
                    type: K.lAkzB,
                    replace: aI.new_act,
                    actor_id: aD.actor,
                  });
                  break;
                case K.yvuTJ:
                  K.SbJCn(ab, {
                    type: K.PEVsw,
                    def_settings: false,
                  });
                  break;
                case K.hFkai: {
                  {
                    const aK = Object.keys(aI.hist || {});
                    if (a5 && aK.includes(a5)) {
                      K.csixI(ab, {
                        type: K.DtQvF,
                        id: a5,
                      });
                    } else if (aK.length) {
                      a5 = aK[0];
                      aD.histId = a5;
                      K.SRWhm(ab, {
                        type: K.DtQvF,
                        id: a5,
                      });
                    } else {
                      K.JFKUz(ab, {
                        type: K.HWoaV,
                      });
                    }
                    break;
                  }
                }
                case K.qPeMQ:
                  if (aI.id && !a5) {
                    a5 = aI.id;
                  }
                  if (a5) {
                    aD.histId = a5;
                  }
                  if (a5 && !a8) {
                    a8 = true;
                    K.SRWhm(
                      ab,
                      (() => {
                        const aM = {
                          type: a2.wYCOk,
                          msg: P,
                          id: a5,
                          block_search: true,
                        };
                        if (!M) {
                          return aM;
                        }
                        const aN = {
                          type: a2.RFWYc,
                          image_url: {},
                        };
                        aN.image_url.url = M;
                        aN.image_url.detail = a2.pruVo;
                        const aO = [aN];
                        if (P) {
                          aO.unshift({
                            type: a2.SYKeK,
                            text: P,
                          });
                        }
                        return {
                          type: a2.hOyED,
                          msg: aO,
                          id: a5,
                          block_search: true,
                        };
                      })(),
                    );
                  }
                  break;
                case K.ijall:
                  if (K.OOHav(K.UadVc, typeof aI.delta)) {
                    a6 += aI.delta;
                  }
                  break;
                case K.NyTgt:
                  K.VnbAV(a9, null, K.OOHav(K.UadVc, typeof aI.msg) ? aI.msg.trim() : a6.trim());
                  break;
                case K.teHDZ:
                  K.VnbAV(a9, null, a6.trim());
                  break;
                case K.GQHcC:
                case K.wswxo:
                  K.SRWhm(a9, new Error(K.qBSeF));
                  break;
                case K.pgtHp:
                  if (false === aI.status) {
                    K.zmVuF(a9, new Error(K.dnNzV));
                  }
              }
            }
          });
          a3.on(K.DAwbA, () => a9(new Error("SERVICE_UNAVAILABLE")));
          a3.on(K.FLsam, () => {
            clearTimeout(aa);
            if (!a7) {
              a2.vxjoj(a9, new Error(a2.fSRTH));
            }
          });
        });
        const S = {
          role: K.wcKaT,
          content: R,
        };
        aG.messages.push(S);
        return (R || "").trim().replaceAll("**", "*");
      } catch (a0) {
        {
          const a1 = a0 && a0.message;
          if (K.qBSeF === a1) {
            throw new Error(K.BBasn);
          }
          if (K.ZxvTr === a1) {
            aD = null;
            throw new Error(K.DRfKR);
          }
          aD = null;
          throw new Error(K.EJnpU);
        }
      }
    }
  }
  const N = {
    messages: aG.messages,
    model: config[I].env.MODEL,
    temperature: 0.5,
  };
  const O = JSON.stringify(N);
  try {
    const a4 = await K.VnbAV(aj, K.bRSUO, {
      method: K.yMref,
      headers: {
        "Content-Type": K.xwriI,
        Authorization: "Bearer " + config[I].env.GPT,
      },
      body: O,
    });
    const a5 = await a4.json();
    if (a5.error) {
      throw new Error(a5.error.message);
    }
    const a6 = a5.choices[0].message.content.trim();
    const a7 = {
      role: K.wcKaT,
      content: a6,
    };
    aG.messages.push(a7);
    return a6;
  } catch (a8) {
    throw new Error(a8.message);
  }
};
exports.getDallEResponse = async function (G, H, I = "512x512") {
  const J = {
    RYFhg: "missing session",
    Nnxsw: "free",
    shspS: "1:1",
    FeXAK: function (K, L, M) {
      return K(L, M);
    },
    UwOhy: "GET",
    XpZyg: "API request failed",
    gUPzV: "Failed to generate image. Please try again later.",
    wrJjU: "https://api.openai.com/v1/images/generations",
    ctCJy: "post",
    NFEHV: "application/json",
  };
  if (!H) {
    throw new Error(J.RYFhg);
  }
  if (J.Nnxsw === config[H].env.GPT) {
    {
      const L = {
        prompt: G,
        ratio: J.shspS,
      };
      const M = new URLSearchParams(L);
      try {
        {
          const N =
            "https://api.nekolabs.web.id/image-generation/imagen/4.0-fast?prompt=" + M.toString();
          const O = await J.FeXAK(aj, N, {
            method: J.UwOhy,
          });
          const P = await O.json();
          if (!P || P.error) {
            throw new Error(J.XpZyg);
          }
          return P.result || P.url || P.image;
        }
      } catch (R) {
        throw new Error(J.gUPzV);
      }
    }
  }
  try {
    {
      const S = {
        prompt: G,
        n: 1,
        size: I,
      };
      const T = await J.FeXAK(aj, J.wrJjU, {
        method: J.ctCJy,
        headers: {
          "Content-Type": J.NFEHV,
          Authorization: "Bearer " + config[H].env.GPT,
        },
        body: JSON.stringify(S),
      });
      const U = await T.json();
      if (U.error) {
        throw new Error(U.error.message);
      }
      return U.data[0].url;
    }
  } catch (W) {
    throw new Error(W.message);
  }
};
