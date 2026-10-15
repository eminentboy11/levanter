const ax = "aWxvdmV5b3Vzb29vb29vbWF0Y2hidXRpZG9udGtub3d3aHlpbGlrZWxvdmV3YW50dQ==",
  test = require("../test/test"),
  az = test.iChecker(),
  aA = az == ax,
  cheerio = require("cheerio"),
  { default: axios } = require("axios");
if (aA) {
  function aD(...k) {
    const l = {
      LnyHV: function (p, q) {
        return p !== q;
      },
      wuPJd: function (p, q) {
        return p + q;
      },
      zgDtw: function (p, q) {
        return p * q;
      },
      fypjC: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/",
      ONEBy: function (p, q) {
        return p + q;
      },
      ZdLth: function (p, q) {
        return p / q;
      },
      wmoaw: function (p, q) {
        return p - q;
      },
      FnEsy: function (p, q) {
        return p - q;
      },
      WuDHK: function (p, q) {
        return p(q);
      },
    };
    function m(p, q, u) {
      {
        const w = l.fypjC.split(""),
          x = w.slice(0, q),
          y = w.slice(0, u);
        let z = p
            .split("")
            .reverse()
            .reduce(function (B, C, D) {
              {
                if (l.LnyHV(-1, x.indexOf(C)))
                  return l.wuPJd(B, l.zgDtw(x.indexOf(C), Math.pow(q, D)));
              }
            }, 0),
          A = "";
        for (; z > 0;) ((A = l.ONEBy(y[z % u], A)), (z = l.ZdLth(l.wmoaw(z, z % u), u)));
        return A || "0";
      }
    }
    return (function (p, q, u, v, w, x) {
      {
        x = "";
        for (let z = 0, A = p.length; z < A; z++) {
          {
            let C = "";
            for (; p[z] !== u[w];) ((C += p[z]), z++);
            for (let D = 0; D < u.length; D++) C = C.replace(new RegExp(u[D], "g"), D.toString());
            x += String.fromCharCode(l.FnEsy(m(C, w, 10), v));
          }
        }
        return l.WuDHK(decodeURIComponent, encodeURIComponent(x));
      }
    })(...k);
  }
  const aE = {
    ssstik: async (k) => {
      const m = {
        Jmwle: "href",
        ERgMD: "class",
        xjLGe: "music",
        cyDId: "Audio",
        nGMWK: "without_watermark",
        xChwL: "https://ssstik.io/en",
        rSSKD: "set-cookie",
        lbaIM: "locale",
        ETeLs: "https://ssstik.io/abc?url=dl",
        idpxk: "application/x-www-form-urlencoded; charset=UTF-8",
        qBWIT: "true",
        MisKK: "target",
        fpTPh: "_gcaptcha_pt",
        QkHNE: "https://ssstik.io",
        FCANI:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537",
        aYWAD: "a.pure-button",
      };
      try {
        {
          const q = await axios.get(m.xChwL),
            u = q.headers[m.rSSKD]?.["map"]((B) => B.split(";")[0])["join"]("; "),
            v = q.data.match(/s_tt\s*=\s*['"]([^'"]+)['"]/);
          if (!v) return [];
          const w = v[1],
            x = new URLSearchParams();
          (x.append("id", encodeURI(k)), x.append(m.lbaIM, "en"), x.append("tt", w));
          const y = await axios.post(m.ETeLs, x, {
              headers: {
                "content-type": m.idpxk,
                cookie: u || "",
                "hx-current-url": m.xChwL,
                "hx-request": m.qBWIT,
                "hx-target": m.MisKK,
                "hx-trigger": m.fpTPh,
                origin: m.QkHNE,
                referer: m.xChwL,
                "user-agent": m.FCANI,
              },
            }),
            z = cheerio.load(y.data),
            A = [];
          return (
            z(m.aYWAD).each((B, C) => {
              const D = z(C).attr(m.Jmwle),
                E = z(C).attr(m.ERgMD) || "";
              D &&
                "#" !== D &&
                /^https?:\/\//.test(D) &&
                (E.includes(m.xjLGe)
                  ? A.push({
                      url: D,
                      quality: m.cyDId,
                    })
                  : E.includes(m.nGMWK) &&
                    A.push({
                      url: D,
                      quality: "SD",
                    }));
            }),
            A
          );
        }
      } catch (C) {
        {
          return [];
        }
      }
    },
    snaptik: async (x) => {
      const y = {
        qxiGH: "https://snaptik.app/en2",
        ojPNl:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36",
        Ehmjj: "set-cookie",
        uRXHk: 'input[name="token"]',
        OEeBr: "url",
        boqus: "lang",
        CXiGp: "en2",
        OEpxm: "token",
        hidnC: "https://snaptik.app/abc2.php",
        IyoxB: "application/x-www-form-urlencoded; charset=UTF-8",
        fbzpw: "))</script>",
        MRgfn: "decodeURIComponent(escape(r))}(",
        pxOkN: function (z, ...A) {
          return z(...A);
        },
        NDtdU: ".innerHTML =",
        lcIeu: '$(".contents")',
        JLAaB: "div.video-links a",
        klTXB: "href",
        ANycs: "button.btn-download-hd",
        FNMSM: "data-tokenhd",
        floBR: "data-backup",
      };
      try {
        {
          const z = await axios.get(y.qxiGH, {
              headers: {
                "user-agent": y.ojPNl,
              },
            }),
            A = z.headers[y.Ehmjj]?.["map"]((N) => N.split(";")[0])["join"]("; "),
            B = cheerio.load(z.data)(y.uRXHk).val();
          if (!B) return [];
          const C = new URLSearchParams();
          (C.append(y.OEeBr, x), C.append(y.boqus, y.CXiGp), C.append(y.OEpxm, B));
          const D = (
              await axios.post(y.hidnC, C, {
                headers: {
                  "content-type": y.IyoxB,
                  cookie: A || "",
                  referer: y.qxiGH,
                  "user-agent": y.ojPNl,
                },
              })
            ).data,
            E = D.split(y.fbzpw)[0]
              .split(y.MRgfn)[1]
              ?.["split"](",")
              ?.["map"]((N) => N.replace(/^"/, "").replace(/"$/, "").trim());
          if (!Array.isArray(E) || 6 !== E.length) return [];
          const F = y.pxOkN(aD, ...E),
            G = F.split(y.NDtdU)?.[1]
              ?.["split"](y.lcIeu)?.[0]
              ?.["replace"](/\\(\\)?/g, "");
          if (!G) return [];
          const H = cheerio.load(G);
          let I = H(y.JLAaB).eq(0).attr(y.klTXB);
          (("/" !== I && "#" !== I) || (I = void 0),
            I && !/^https?:\/\//.test(I) && (I = "https://snaptik.app" + I));
          const J = H(y.ANycs).first(),
            K = J.attr(y.FNMSM),
            L = J.attr(y.floBR),
            M = [];
          if (K)
            try {
              const N = {};
              N["user-agent"] = y.ojPNl;
              const O = {};
              ((O.headers = N), (O.timeout = 0x1f40));
              const P = await axios.get(K, O);
              P.data && !P.data.error && P.data.url
                ? M.push({
                    url: P.data.url,
                    quality: "HD",
                  })
                : L &&
                  M.push({
                    url: L,
                    quality: "HD",
                  });
            } catch (Q) {
              L &&
                M.push({
                  url: L,
                  quality: "HD",
                });
            }
          return (
            I &&
              M.push({
                url: I,
                quality: "SD",
              }),
            M
          );
        }
      } catch (S) {
        {
          return [];
        }
      }
    },
    tikmate: async (l) => {
      const m = {};
      m.meMqY = function (q, u) {
        return q === u;
      };
      ((m.cSwJS = "dPwUY"), (m.JdMBJ = "url"), (m.MbhhV = "https://api.tikmate.app/api/lookup"));
      ((m.JajyT = "*/*"), (m.VkxIa = "en-GB,en;q=0.9"));
      ((m.FGmOa = "application/x-www-form-urlencoded; charset=UTF-8"),
        (m.DIbpb =
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36"));
      ((m.lJeMq = function (q, u) {
        return q !== u;
      }),
        (m.rZicJ = "KPweP"));
      const p = m;
      try {
        const q = new URLSearchParams();
        q.append(p.JdMBJ, l);
        const u = (
          await axios.post(p.MbhhV, q, {
            headers: {
              accept: p.JajyT,
              "accept-language": p.VkxIa,
              "content-type": p.FGmOa,
              "user-agent": p.DIbpb,
            },
          })
        ).data;
        return u && u.success && u.id && u.token
          ? [
              {
                url: "https://tikmate.app/download/" + u.token + "/" + u.id + ".mp4",
                quality: "SD",
              },
            ]
          : [];
      } catch (w) {
        return [];
      }
    },
  };
  exports.tiktok = async (l) => {
    const m = {};
    m.potjM = function (q, u) {
      return q > u;
    };
    const p = m;
    for (const q in aE) {
      const u = await aE[q](l);
      if (u && p.potjM(u.length, 0)) return u;
    }
    return [];
  };
}
