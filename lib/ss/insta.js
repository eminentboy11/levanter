const cheerio = require("cheerio"),
  { default: axios } = require("axios"),
  cryptoJs = require("crypto-js"),
  aE = "aWxvdmV5b3Vzb29vb29vbWF0Y2hidXRpZG9udGtub3d3aHlpbGlrZWxvdmV3YW50dQ==",
  { iChecker } = require("../test/test"),
  aG = iChecker(),
  aH = aG == aE;
if (aH) {
  const aI = "qwertyuioplkjhgf";
  function aJ(q) {
    const u = cryptoJs.enc.Utf8.parse(aI),
      v = cryptoJs.enc.Utf8.parse(q);
    return cryptoJs.AES.encrypt(v, u, {
      mode: cryptoJs.mode.ECB,
      padding: cryptoJs.pad.Pkcs7,
    }).ciphertext.toString(cryptoJs.enc.Hex);
  }
  function aK(...q) {
    const u = {
      SZSiK: function (w, z) {
        return w + z;
      },
      lxjjC: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/",
      RAfOv: function (w, z) {
        return w / z;
      },
      CifnW: function (w, z) {
        return w - z;
      },
      jJdgG: function (w, x) {
        return w(x);
      },
    };
    function v(w, x, y) {
      const z = {
        kxQlT: function (F, G) {
          return F !== G;
        },
        qCztq: function (F, G) {
          return F + G;
        },
        aExLj: function (F, G) {
          return F * G;
        },
      };
      const A = u.lxjjC.split(""),
        B = A.slice(0, x),
        C = A.slice(0, y);
      let D = w
          .split("")
          .reverse()
          .reduce(function (F, G, H) {
            if (z.kxQlT(-1, B.indexOf(G))) return z.qCztq(F, z.aExLj(B.indexOf(G), Math.pow(x, H)));
          }, 0),
        E = "";
      for (; D > 0;) ((E = u.SZSiK(C[D % y], E)), (D = u.RAfOv(u.CifnW(D, D % y), y)));
      return E || "0";
    }
    return (function (w, x, y, z, A, B) {
      B = "";
      for (let C = 0, D = w.length; C < D; C++) {
        let E = "";
        for (; w[C] !== y[A];) ((E += w[C]), C++);
        for (let F = 0; F < y.length; F++) E = E.replace(new RegExp(y[F], "g"), F.toString());
        B += String.fromCharCode(u.CifnW(v(E, A, 10), z));
      }
      return u.jJdgG(decodeURIComponent, encodeURIComponent(B));
    })(...q);
  }
  const aL = {
      dl13: async (q) => {
        const u = {
          PuGwt: "https://api.videodropper.app/allinone",
          GqqXZ: "*/*",
          KgHUy: "en-GB,en;q=0.9",
          GSRPA: "u=1, i",
          SzfgR: '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
          vfGPC: '"Linux"',
          xNThQ: "empty",
          VZArn: "cors",
          rAXFR: "cross-site",
          EuvhW: "https://instavideosave.net/",
          NpiUh: "strict-origin-when-cross-origin",
          dUWSJ: "image",
          WTxNW: "video",
        };
        try {
          const { data: v } = await axios.get(u.PuGwt, {
              headers: {
                accept: u.GqqXZ,
                "accept-language": u.KgHUy,
                priority: u.GSRPA,
                "sec-ch-ua": u.SzfgR,
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": u.vfGPC,
                "sec-fetch-dest": u.xNThQ,
                "sec-fetch-mode": u.VZArn,
                "sec-fetch-site": u.rAXFR,
                url: aJ(q),
                Referer: u.EuvhW,
                "Referrer-Policy": u.NpiUh,
              },
            }),
            w = [];
          if (u.dUWSJ in v) {
            for (const x of v.image) w.push(x);
          }
          if (u.WTxNW in v) {
            for (const y of v.video) w.push(y.video);
          }
          return w;
        } catch (z) {
          return [];
        }
      },
      dl1: async (q) => {
        const u = {
          RuQMO: function (v, w) {
            return v(w);
          },
          gLuVO: ".download-items__btn > a[href]",
          xpQTJ: "href",
          SFXWL: "url",
          jJWyU: "action",
          LTPky: "post",
          CgFGl: "https://snapsave.app/action.php?lang=en",
          NeuTM: "application/x-www-form-urlencoded",
          AvsoL: "https://snapsave.app",
          oiknk: "https://snapsave.app/",
          mfaLX:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
          uAMPJ: function (v, ...w) {
            return v(...w);
          },
          NsmWH: "))</script>",
          fwlTx: "decodeURIComponent(escape(r))}(",
          QJsHo: '("download-section").innerHTML = "',
          xLvoS: '"; parent.document.getElementById("inputData").remove();',
          RlLtO: '</style><section class=\\"section\\">',
          rLqlf: "</section>",
          ccrCD: "div.download-items__btn",
        };
        try {
          const v = [],
            w = new URLSearchParams();
          (w.append(u.SFXWL, q), w.append(u.jJWyU, u.LTPky));
          const { data: x } = await axios.post(u.CgFGl, w, {
              headers: {
                "content-type": u.NeuTM,
                origin: u.AvsoL,
                referer: u.oiknk,
                "user-agent": u.mfaLX,
              },
            }),
            y = u.uAMPJ(
              aK,
              ...x
                .split(u.NsmWH)[0]
                .split(u.fwlTx)[1]
                .split(",")
                .map((B) => B.replace(/^"/, "").replace(/"$/, "").trim()),
            ),
            z =
              y
                .split(u.QJsHo)[1]
                ?.["split"](u.xLvoS)[0]
                ?.["split"](u.RlLtO)[1]
                ?.["split"](u.rLqlf)[0]
                ?.["replace"](/\\(\\)?/g, "") || "",
            A = cheerio.load(z);
          return (
            A(u.ccrCD).each(function () {
              let B = u.RuQMO(A, this).find(u.gLuVO).attr(u.xpQTJ);
              B && v.push(B);
            }),
            v
          );
        } catch (B) {
          return [];
        }
      },
      dl2: async (q) => {
        const u = {
          onlcU: function (v, w) {
            return v(w);
          },
          uywbw: "href",
          KZuhU: "http",
          sJnZl: "https://api.downloadgram.org/media",
          enDXK: "*/*",
          sdeuJ: "en-GB,en;q=0.9",
          jdqAa: "no-cache",
          AmSIL: "application/x-www-form-urlencoded",
          URvku: "u=1, i",
          CLKHr: '"Chromium";v="146", "Not-A.Brand";v="24", "Google Chrome";v="146"',
          LzaxH: '"Windows"',
          IuuYz: "empty",
          tAzor: "cors",
          jBfow: "same-site",
          Ogvyd: "https://downloadgram.org/",
          pQHJc: "['innerHTML']='",
          gYUjv: "',downloadMore()",
        };
        try {
          {
            const v = encodeURIComponent(q),
              { data: w } = await axios.post(u.sJnZl, "url=" + v + "&v=3&lang=en", {
                headers: {
                  accept: u.enDXK,
                  "accept-language": u.sdeuJ,
                  "cache-control": u.jdqAa,
                  "content-type": u.AmSIL,
                  pragma: u.jdqAa,
                  priority: u.URvku,
                  "sec-ch-ua": u.CLKHr,
                  "sec-ch-ua-mobile": "?0",
                  "sec-ch-ua-platform": u.LzaxH,
                  "sec-fetch-dest": u.IuuYz,
                  "sec-fetch-mode": u.tAzor,
                  "sec-fetch-site": u.jBfow,
                  Referer: u.Ogvyd,
                },
              }),
              x = (w.split(u.pQHJc)[1]?.["split"](u.gYUjv)[0] || "")
                .replace(/\\x20/g, " ")
                .replace(/\\x22/g, '"')
                .replace(/\\'/g, "'"),
              y = cheerio.load(x),
              z = [];
            return (
              y("a").each(function () {
                const A = u.onlcU(y, this).attr(u.uywbw);
                A && A.startsWith(u.KZuhU) && z.push(A);
              }),
              z
            );
          }
        } catch (B) {
          return [];
        }
      },
      dl4: async (q) => {
        const u = {
          CGyGS: function (v, w) {
            return v(w);
          },
          KcPjU: "href",
          CmHIA: "http",
          jkmyZ: "https://api.downloadgram.app/media",
          PqsaF: "application/x-www-form-urlencoded",
          AfQFR: '"Chromium";v="146", "Not-A.Brand";v="24", "Google Chrome";v="146"',
          bfmwS: '"Windows"',
          wKwCg: "https://www.downloadgram.app/",
          wpvmM: "['innerHTML']='",
          JOGvh: "',document[",
          rxfUi: "',downloadMore(",
          MjizS: "',showAd(",
          zcheq: "oJKrR",
        };
        try {
          const v = encodeURIComponent(q),
            { data: w } = await axios.post(u.jkmyZ, "url=" + v + "&lang=en", {
              headers: {
                "content-type": u.PqsaF,
                "sec-ch-ua": u.AfQFR,
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": u.bfmwS,
                Referer: u.wKwCg,
              },
            });
          let x = w.split(u.wpvmM)[1] || "";
          x.includes(u.JOGvh)
            ? (x = x.split(u.JOGvh)[0])
            : x.includes(u.rxfUi)
              ? (x = x.split(u.rxfUi)[0])
              : x.includes(u.MjizS) && (x = x.split(u.MjizS)[0]);
          const y = x.replace(/\\x20/g, " ").replace(/\\x22/g, '"').replace(/\\'/g, "'"),
            z = cheerio.load(y),
            A = [];
          return (
            z("a").each(function () {
              {
                const D = u.CGyGS(z, this).attr(u.KcPjU);
                D && D.startsWith(u.CmHIA) && A.push(D);
              }
            }),
            A
          );
        } catch (B) {
          return u.zcheq !== u.zcheq ? [] : [];
        }
      },
    },
    aM = /(https?:\/\/(?:www\.)?instagram\.com\/(?:.*\/|)(reel|p|tv)\/([-_0-9A-Za-z]+))/;
  exports.instagram = async (u) => {
    const v = {};
    ((v.VACRz = function (z, A) {
      return z > A;
    }),
      (v.kJiRC = function (z, A) {
        return z > A;
      }));
    const w = v;
    u = u.split("?")[0];
    const x = aM.exec(u);
    if (!x) return [];
    if (w.VACRz(x[3].length, 11)) return 301;
    u = "https://www.instagram.com/" + x[2] + "/" + x[3] + "/";
    for (const y in aL)
      try {
        const z = await aL[y](u);
        if (z && w.kJiRC(z.length, 0)) return z;
      } catch (A) {}
    return [];
  };
}
