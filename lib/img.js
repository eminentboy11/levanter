const cheerio = require("cheerio");
const a0 = "http://images.google.com/search";
const a1 = [".jpg", ".jpeg", ".png"];
const a2 =
  /\["https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)"/gm;
const a3 = (b) => b.replace(/\"|\[/g, "");
const a4 = "aWxvdmV5b3Vzb29vb29vbWF0Y2hidXRpZG9udGtub3d3aHlpbGlrZWxvdmV3YW50dQ==";
const a5 = (b) => /\.\w{3,4}($|\?)/.test(b) && !b.includes(".html") && !b.includes(".svg");
const { iChecker } = require("./test/test");
const { default: axios } = require("axios");
const a8 = iChecker();
const a9 = a8 == a4;
const aa = {
  accept: "text/html",
  "accept-encoding": "gzip, deflate",
  "accept-language": "en-US,en",
  referer: "https://www.google.com/",
  "upgrade-insecure-requests": 1,
  "user-agent":
    "Mozilla/5.0 (Linux; Android 12; SAMSUNG SM-S908B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/17.0 Chrome/96.0.4664.104 Mobile Safari/537.36",
};
if (a9) {
  async function ab(v) {
    const w = {
      rRzwS: "Tvmte",
      JbvlT: "kXBHq",
      MXEhb: "dIsFd",
      zkgtV: "KiOhf",
      lokuQ: "(((.+)+)+)+$",
      FPQJP: function (z, A, B) {
        return z(A, B);
      },
      zyAwK: "searchTerm is missing.",
      NvGeD: "text/html",
      WfqTR: "gzip, deflate",
      lCCWV: "en-US,en",
      yuCbR: "https://www.google.com/",
      lvwtH:
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.0.0 Safari/537.36",
      qbrBN: "script",
    };
    const x = (function () {
      const z = {
        pTCMT: w.rRzwS,
        eUJbM: w.JbvlT,
        rYjHq: w.MXEhb,
        gYeGS: w.zkgtV,
      };
      let A = true;
      return function (B, C) {
        const E = A
          ? function () {
              if (C) {
                const G = C.apply(B, arguments);
                C = null;
                return G;
              }
            }
          : function () {};
        A = false;
        return E;
      };
    })();
    const y = w.FPQJP(x, this, function () {
      return y.toString().search(w.lokuQ).toString().constructor(y).search(w.lokuQ);
    });
    y();
    if (!v) {
      throw new TypeError(w.zyAwK);
    }
    try {
      {
        const A = {
          accept: w.NvGeD,
          "accept-encoding": w.WfqTR,
          "accept-language": w.lCCWV,
          referer: w.yuCbR,
          "upgrade-insecure-requests": 1,
          "user-agent": w.lvwtH,
        };
        const B = {
          headers: A,
        };
        const C = a0 + "?tbm=isch&q=" + v;
        const { data: D } = await axios.get(C, B).catch(() => {});
        const E = cheerio.load(D)(w.qbrBN);
        const F = [];
        const G = [];
        for (const H of E) {
          if (H.children?.length) {
            const I = H.children[0].data;
            if (a1.some((J) => I.toLowerCase().includes(J))) {
              F.push(I);
            }
          }
        }
        for (const J of F) {
          J.match(a2)?.map((K) => {
            const L = a3(K);
            if (L && a5(L) && !/gstatic\.com|encrypted-/.test(L)) {
              G.push(L);
            }
          });
        }
        return G;
      }
    } catch (K) {
      {
        throw new Error(K);
      }
    }
  }
  async function ac(q) {
    const v = {
      TAwln: "BSLIg",
      gjQsc: "return (function() ",
      ddAnZ: '{}.constructor("return this")( )',
      afVtK: "log",
      aAbzT: "warn",
      AuGFO: "info",
      fEntR: "error",
      FLrlg: "exception",
      oTfrE: "table",
      MnXmt: "trace",
      LQYET: function (y, z) {
        return y(z);
      },
      crmXj: function (z, A) {
        return z + A;
      },
      slzXf: function (y, z, A) {
        return y(z, A);
      },
      Qvgjj: "yDYNvb",
      zeoHY: "MUxGbd yDYNvb",
      zYpRw: "C8nzq BmP5tf",
      ijmZF: "yUTMj MBeuO ynAwRc gsrt PpBGzd YcUVQe",
      nilKJ: "PpBGzd YcUVQe",
      mPlhh: "yUTMj MBeuO",
      usSIT: "ynAwRc gsrt PpBGzd",
      pAEbN: "a.C8nzq.BmP5tf",
    };
    const w = (function () {
      const y = {
        TToTl: v.TAwln,
      };
      {
        let A = true;
        return function (B, C) {
          const D = {
            HskVO: y.TToTl,
          };
          const E = A
            ? function () {
                if (C) {
                  const G = C.apply(B, arguments);
                  C = null;
                  return G;
                }
              }
            : function () {};
          A = false;
          return E;
        };
      }
    })();
    const x = v.slzXf(w, this, function () {
      let z;
      try {
        {
          const C = v.LQYET(Function, v.crmXj(v.gjQsc + v.ddAnZ, ");"));
          z = C();
        }
      } catch (E) {
        z = window;
      }
      const A = (z.console = z.console || {});
      const B = [v.afVtK, v.aAbzT, v.AuGFO, v.fEntR, v.FLrlg, v.oTfrE, v.MnXmt];
      for (let F = 0; F < B.length; F++) {
        const G = w.constructor.prototype.bind(w);
        const H = B[F];
        const I = A[H] || G;
        G.__proto__ = w.bind(w);
        G.toString = I.toString.bind(I);
        A[H] = G;
      }
    });
    x();
    try {
      {
        const z = {
          headers: aa,
        };
        const A = await axios.get("https://www.google.com/searchbyimage?image_url=" + q, z);
        const B = cheerio.load(
          A.data
            .replace(/N6jJud MUxGbd lyLwlc/g, "")
            .replace(/YjtGef ExmHv MUxGbd/g, "")
            .replace(/MUxGbd lyLwlc aLF0Z/g, "")
            .replace(/yDYNvb lEBKkf/g, v.Qvgjj)
            .replace(/VwiC3b MUxGbd yDYNvb/g, v.zeoHY)
            .replace(/cz3goc BmP5tf/g, v.zYpRw)
            .replace(/yUTMj MBeuO ynAwRc PpBGzd YcUVQe/g, v.ijmZF)
            .replace(/oewGkc LeUQr/g, v.nilKJ)
            .replace(/q8U8x MBeuO/g, v.mPlhh)
            .replace(/ynAwRc PpBGzd/g, v.usSIT),
        );
        return B(v.pAEbN)
          .map((C, D) => B(D).attr("href"))
          .get();
      }
    } catch (C) {
      {
        return [];
      }
    }
  }
  exports.img = async (b, f) => (f ? await ac(b) : await ab(b));
}
