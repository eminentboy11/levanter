const axios = require("axios");
const ws = require("ws");
const crypto = require("crypto");
const { genHeader } = require("./constants/spam.js");
class b7 {
  constructor(i) {
    this.axios = axios.create();
    this.baseHeaders = genHeader();
    this.conversation = null;
    this.cookies = i || "";
  }
  _logError(j, k) {
    const m = {
      fYaoL: "  Request    : No response received from server.",
    };
    if (j.response) {
      console.error("  Status Code: " + j.response.status);
      console.error("  Data       : " + JSON.stringify(j.response.data, null, 2));
    } else if (j.request) {
      console.error(m.fYaoL);
    } else {
      console.error("  Pesan      : " + j.message);
    }
  }
  _getImageType(j) {
    const k = {
      rlFQC: "hex",
      wxGvn: "FFD8FF",
      CWNEA: "image/jpeg",
      UqoRO: "89504E47",
      gqhQa: "image/png",
      wBovf: "47494638",
      GivIb: "image/gif",
      NQuPB: "52494646",
      ZTOnt: function (n, p) {
        return n === p;
      },
      qkfYF: "WEBP",
      HFepf: "ascii",
      FANho: "image/webp",
      bjKmB: "424D",
      LscGF: "image/bmp",
    };
    const l = k;
    const m = j.toString(l.rlFQC, 0, 4).toUpperCase();
    if (m.startsWith(l.wxGvn)) {
      return l.CWNEA;
    }
    if (m.startsWith(l.UqoRO)) {
      return l.gqhQa;
    }
    if (m.startsWith(l.wBovf)) {
      return l.GivIb;
    }
    if (m.startsWith(l.NQuPB)) {
      if (l.ZTOnt(l.qkfYF, j.toString(l.HFepf, 8, 12))) {
        return l.FANho;
      }
    }
    if (m.startsWith(l.bjKmB)) {
      return l.LscGF;
    } else {
      return l.CWNEA;
    }
  }
  async genConversation() {
    const j = {
      GqAlf: "Invalid imageUrl format (must be URL or Buffer).",
      UTiEw: function (l, m) {
        return l === m;
      },
      uPLRw: "bkabg",
      yEjTT: "LClBS",
      POZbK: "https://copilot.microsoft.com/c/api/conversations",
      hTiwF: "application/json",
      BmyVA: "set-cookie",
      fWBEL: "genConversation()",
      KseTp: "Failed to create conversation.",
    };
    const k = j;
    try {
      {
        const m = await this.axios.post(k.POZbK, null, {
          headers: {
            ...this.baseHeaders,
            "Content-Type": k.hTiwF,
          },
        });
        const n = m.headers[k.BmyVA];
        if (n) {
          this.cookies = n.map((p) => p.split(";")[0]).join("; ");
        }
        this.conversation = m.data;
        this.conversation;
        return this.conversation;
      }
    } catch (p) {
      this._logError(p, k.fWBEL);
      throw new Error(k.KseTp);
    }
  }
  async genImage(l) {
    const m = {
      XGyNj: "[ERROR] Failed to parse JSON message from WebSocket:",
      LGfjG: "Session not initialized. Call genConversation() first.",
      HwtJI: "image/jpeg",
      vAQRw: function (p, q) {
        return p == q;
      },
      hbtRy: "string",
      OnAzT: "http",
      iZWch: "arraybuffer",
      KRBYf: "content-type",
      iacRK: function (p, q) {
        return p !== q;
      },
      pSXlH: "fIfBh",
      gIPYX: "zBMpj",
      egQWD: "Invalid imageUrl format (must be URL or Buffer).",
      GFbOA: "User-Agent",
      NoGis: "*/*",
      zPjhY: "en-US,en;q=0.9",
      dBGGy: "https://copilot.microsoft.com/c/api/attachments",
      EOYbe: function (p, q) {
        return p / q;
      },
      KrzHo: function (p, q) {
        return p === q;
      },
      ImFLx: "bUpot",
      tAycl: "aggeU",
      xKqbY: "genImage()",
      eIVGc: "Failed to upload image.",
    };
    const n = m;
    if (!this.conversation?.id) {
      throw new Error(n.LGfjG);
    }
    try {
      let p;
      let q = n.HwtJI;
      if (n.vAQRw(n.hbtRy, typeof l) && l.startsWith(n.OnAzT)) {
        const w = {
          responseType: n.iZWch,
        };
        const x = await axios.get(l, w);
        p = Buffer.from(x.data);
        q = x.headers[n.KRBYf] || this._getImageType(p);
      } else {
        if (!Buffer.isBuffer(l)) {
          throw new Error(n.egQWD);
        }
        p = l;
        q = this._getImageType(p);
      }
      const u = {
        "Content-Type": q,
        "User-Agent": this.baseHeaders[n.GFbOA],
        Referer: "https://copilot.microsoft.com/chats/" + this.conversation.id,
        Cookie: this.cookies,
        Accept: n.NoGis,
        "Accept-Language": n.zPjhY,
      };
      const v = u;
      return (
        await this.axios.post(n.dBGGy, p, {
          headers: v,
          maxContentLength: 1 / 0,
          maxBodyLength: 1 / 0,
        })
      ).data;
    } catch (z) {
      {
        this._logError(z, n.xKqbY);
        throw new Error(n.eIVGc);
      }
    }
  }
  async chat({ prompt: i, imageUrl: j, mode: k, conversationId: l, ...m }) {
    const p = {
      Ugioc: "return (function() ",
      eoyxO: '{}.constructor("return this")( )',
      ZtZar: "sPhvN",
      hWuGi: "iAlwi",
      vZaYO: "rMeiA",
      RxBkf: "connected",
      zubFF: "uZWKw",
      ksZCR: "MPbiI",
      sxcDB: "image",
      jyxhG: "text",
      aFuFR: "No content (prompt or image) to send.",
      uyXHD: "send",
      PhHeh: "KLJLs",
      RmpjA: "dTOWL",
      SiIfq: "received",
      tOmUK: "startMessage",
      dNndN: "modeSelected",
      OySGw: "appendText",
      hTIvx: "chainOfThought",
      rLoiE: "done",
      TDyAy: "Streaming Finished",
      WPtYp: "[ERROR] Failed to parse JSON message from WebSocket:",
      MeUes: "hex",
      DZuBp: "FFD8FF",
      MwNnI: "image/jpeg",
      JwpGa: "89504E47",
      jnjsU: "image/png",
      LUXaL: "47494638",
      OKkmy: "image/gif",
      ktJZV: "52494646",
      WOUIh: "WEBP",
      SLeLD: "ascii",
      rMieK: "image/webp",
      TrgGg: "424D",
      LOCMe: "image/bmp",
      WRtJW: "kEiXr",
      kYjGJ: "YlvKF",
      OJAuC: "WebSocket",
      kOBLD: "WebSocket connection error.",
      TOmKd: "genImage()",
      InZDk: "Failed to upload image.",
      muRdi: "chat",
      seRqF: "smart",
      tUBOC: "reasoning",
      VZPfI: "wss://copilot.microsoft.com/c/api/chat",
      vjEZw: "-,ncedge,edgepagecontext",
      NUUAK: "message",
      PxpxY: "error",
    };
    return new Promise(async (x, y) => {
      const z = {
        IZLKp: function (A, B) {
          return A(B);
        },
        CYNEh: p.Ugioc,
        vdzCA: p.eoyxO,
        cIaXA: p.ZtZar,
        qTnee: p.hWuGi,
        dpTZo: p.vZaYO,
        Zxesn: p.RxBkf,
        NHSqt: p.zubFF,
        ZGQDN: p.ksZCR,
        MrWHX: p.sxcDB,
        moApS: p.jyxhG,
        eMoyc: p.aFuFR,
        qukGv: p.uyXHD,
        ZjymT: p.PhHeh,
        DOAlX: p.RmpjA,
        yVAaq: p.SiIfq,
        lIHWm: p.tOmUK,
        UoRmz: p.dNndN,
        rjRMW: p.OySGw,
        nJXHr: p.hTIvx,
        iSvsa: p.rLoiE,
        VUvHp: p.TDyAy,
        nurLi: function (A, B) {
          return A(B);
        },
        XSiHk: p.WPtYp,
        BwWiZ: p.MeUes,
        CsUDh: p.DZuBp,
        RkEdZ: p.MwNnI,
        rFlzA: p.JwpGa,
        EpSgP: p.jnjsU,
        pQksJ: p.LUXaL,
        LrhdH: p.OKkmy,
        XPdhE: p.ktJZV,
        gQCOK: function (A, B) {
          return A === B;
        },
        WosYg: p.WOUIh,
        RVoKR: p.SLeLD,
        DRNvG: p.rMieK,
        VQYUr: p.TrgGg,
        mjNcq: p.LOCMe,
        VYNEV: p.WRtJW,
        IQqEy: p.kYjGJ,
        NLXon: p.OJAuC,
        DznBZ: function (A, B) {
          return A(B);
        },
        TJLLy: p.kOBLD,
      };
      {
        try {
          {
            if (l) {
              this.conversation = {
                id: l,
              };
            } else if (!this.conversation?.id) {
              try {
                {
                  await this.genConversation();
                }
              } catch (N) {
                {
                  const O = crypto.randomUUID();
                  const P = {
                    id: O,
                  };
                  this.conversation = P;
                  console.warn(
                    "[WARN] HTTP session initiation failed. Using fallback conversation ID from crypto: " +
                      O,
                  );
                }
              }
            }
            let B = p.muRdi;
            if (k && [p.muRdi, p.seRqF, p.tUBOC].includes(k)) {
              B = k;
            } else if (k) {
              console.warn('[WARN] Mode "' + k + "\" invalid. Using default mode 'chat'.");
            }
            let C = null;
            if (j) {
              try {
                {
                  C = await this.genImage(j);
                }
              } catch (S) {
                console.warn("[WARN] " + S.message + ". Proceeding with text prompt only.");
              }
            }
            const D = new URL(p.VZPfI);
            const E = {
              "api-version": "2",
              features: p.vjEZw,
              setflight: p.vjEZw,
              ncedge: "1",
            };
            D.search = new URLSearchParams(E).toString();
            const F = {
              ...this.baseHeaders,
            };
            F.Cookie = this.cookies;
            const G = F;
            const H = new ws(D.href, {
              headers: G,
            });
            const I = {
              conversationId: this.conversation.id,
              messageId: null,
              mode: B,
              createdAt: null,
              requestId: null,
              attachment: C,
              events: [],
            };
            let J = false;
            let K = "";
            let L = I;
            H.on(p.NUUAK, (T) => {
              try {
                const W = JSON.parse(T.toString());
                L.events.push(W);
                if (!J && z.Zxesn === W.event) {
                  J = true;
                  L.requestId = W.requestId;
                  const Y = [];
                  if (C?.url) {
                    Y.push({
                      type: z.MrWHX,
                      url: C.url,
                    });
                  }
                  if (i) {
                    Y.push({
                      type: z.moApS,
                      text: i,
                    });
                  }
                  if (0 === Y.length) {
                    H.close();
                    return z.IZLKp(y, new Error(z.eMoyc));
                  }
                  const Z = {
                    ...m,
                  };
                  const a0 = {
                    event: z.qukGv,
                    conversationId: this.conversation.id,
                    content: Y,
                    mode: B,
                    context: Z,
                  };
                  const a1 = a0;
                  H.send(JSON.stringify(a1));
                  return;
                }
                if (J) {
                  if (!(z.yVAaq !== W.event) || !(z.lIHWm !== W.event)) {
                    L.messageId = W.messageId;
                    L.createdAt = W.createdAt;
                  }
                  if (z.UoRmz === W.event) {
                    L.mode = W.mode;
                  }
                  const a2 = z.rjRMW === W.event || z.nJXHr === W.event ? W.text : "";
                  K += a2;
                  if (z.iSvsa === W.event) {
                    H.close(1000, z.VUvHp);
                    z.nurLi(x, {
                      result: K.trim().replaceAll("**", "*"),
                      metadata: {
                        conversationId: L.conversationId,
                        messageId: L.messageId,
                        mode: L.mode,
                        createdAt: L.createdAt,
                        requestId: L.requestId,
                        attachment: L.attachment,
                        totalEvents: L.events.length,
                        timestamp: new Date().toISOString(),
                      },
                      raw: {
                        events: L.events,
                      },
                    });
                  }
                }
              } catch (a4) {
                console.error(z.XSiHk, a4.message);
              }
            });
            H.on(p.PxpxY, (T) => {
              this._logError(T, z.NLXon);
              z.DznBZ(y, new Error(z.TJLLy));
            });
          }
        } catch (U) {
          y(U);
        }
      }
    });
  }
  getCurrentConversationId() {
    return this.conversation?.id || null;
  }
  resetConversation() {
    this.conversation = null;
    this.cookies = "";
  }
}
module.exports = b7;
