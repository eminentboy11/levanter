const axios = require("axios"),
  cheerio = require("cheerio"),
  Q = "aWxvdmV5b3Vzb29vb29vbWF0Y2hidXRpZG9udGtub3d3aHlpbGlrZWxvdmV3YW50dQ==",
  { iChecker } = require("../test/test"),
  S = iChecker(),
  T = S == Q;
T &&
  ((exports.pinterest = async (l) => {
    const m = {
      riJKe: function (w, x) {
        return w(x);
      },
      OWYjW: "href",
      GLNUi: "http",
      WsKrJ: function (w, z) {
        return w != z;
      },
      EndMe: function (w, x) {
        return w(x);
      },
      YaaaJ: function (w, x) {
        return w(x);
      },
      ojISV: "www.pinterest.com/pin/",
      PywYn: "https://pinterestvideodownloader.com/",
      Qzzae: "application/x-www-form-urlencoded",
      liNrq:
        "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4209.3 Mobile Safari/537.36",
      yBAFW:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      jkHQa: "div.col-sm-12 > a",
      ZhyGD: "table > tbody > tr",
      qSIKN: "VStvN",
      jrZrd: "bgPue",
    };
    try {
      {
        if (!l.includes(m.ojISV)) {
          {
            l = (await axios.get(l)).request.res.responseUrl || l;
          }
        }
      }
    } catch (y) {}
    const n = {};
    n.url = l;
    const p = [],
      q = await axios.post(m.PywYn, new URLSearchParams(n), {
        headers: {
          "Content-Type": m.Qzzae,
          "User-Agent": m.liNrq,
          Accept: m.yBAFW,
        },
        maxRedirects: 0x5,
      }),
      u = cheerio.load(q.data);
    u(m.jkHQa).each(function () {
      const z = m.riJKe(u, this).attr(m.OWYjW);
      z && z.startsWith(m.GLNUi) && p.push(z);
    });
    const v = {};
    u(m.ZhyGD).each(function (z, A) {
      {
        if (m.WsKrJ("", m.YaaaJ(u, u(A).find("td")[0]).text())) {
          {
            const E = m.EndMe(u, u(A).find("td")[0]).find("a").attr(m.OWYjW),
              F = E.split("/").pop();
            !(F in v) && E.startsWith(m.GLNUi) && (v[F] = E);
          }
        }
      }
    });
    for (const z in v) {
      m.qSIKN !== m.jrZrd
        ? p.find((A) => A == v[z]) || p.push(v[z])
        : q.find((C) => C == z[A]) || w.push(x[y]);
    }
    return p;
  }),
  (exports.pinterestSearch = async (m) => {
    const p = {
      WqmWU: "https://www.pinterest.com/",
      TFugR:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
      hVFEl: "set-cookie",
      ZousZ: "---",
      KlpEQ: "typed",
      DoIog: "pins",
      ksacp: function (q, u) {
        return q + u;
      },
      JuniG: "/search/pins/?q=",
      ALUoa: "&rs=typed",
      tojwF: "https://www.pinterest.com/resource/BaseSearchResource/get/",
      EKykz: "application/json, text/javascript, */*, q=0.01",
      bEqCP: "en-GB,en;q=0.9",
      EvEnF: "no-cache",
      AArby: "empty",
      hpOVg: "cors",
      KKVZR: "same-origin",
      mveFa: "active",
      RIHrV: "www/search/[scope].js",
      GvCGK: "XMLHttpRequest",
    };
    try {
      const q = (
        await axios.get(p.WqmWU, {
          headers: {
            "User-Agent": p.TFugR,
          },
        })
      ).headers[p.hVFEl];
      let u = [];
      q &&
        q.forEach((C) => {
          u.push(C.split(";")[0]);
        });
      let v = u.join("; ");
      const w = {};
      ((w.article = null),
        (w.appliedProductFilters = p.ZousZ),
        (w.rs = p.KlpEQ),
        (w.scope = p.DoIog),
        (w.query = m));
      const x = {};
      ((x.options = w), (x.context = {}));
      const y = x,
        z = p.ksacp(p.ksacp(p.JuniG, encodeURIComponent(m)), p.ALUoa),
        A = p.tojwF;
      let B = await axios.get(A, {
        params: {
          source_url: z,
          data: JSON.stringify(y),
          _: Date.now(),
        },
        headers: {
          accept: p.EKykz,
          "accept-language": p.bEqCP,
          "cache-control": p.EvEnF,
          pragma: p.EvEnF,
          "sec-fetch-dest": p.AArby,
          "sec-fetch-mode": p.hpOVg,
          "sec-fetch-site": p.KKVZR,
          "User-Agent": p.TFugR,
          "x-pinterest-appstate": p.mveFa,
          "x-pinterest-pws-handler": p.RIHrV,
          "x-pinterest-source-url": z,
          "x-requested-with": p.GvCGK,
          Cookie: v,
          Referer: p.WqmWU,
        },
      });
      return B.data.resource_response.data.results
        .map((C) => C.images?.["orig"]?.["url"])
        .filter(Boolean);
    } catch (C) {
      return [];
    }
  }));
