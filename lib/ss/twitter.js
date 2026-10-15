const cheerio = require("cheerio");
const a0 = "aWxvdmV5b3Vzb29vb29vbWF0Y2hidXRpZG9udGtub3d3aHlpbGlrZWxvdmV3YW50dQ==";
const a1 = (...l) => import("node-fetch").then(({ default: m }) => m(...l));
const { iChecker } = require("../test/test");
const a3 = iChecker();
const a4 = a3 == a0;
const FormData = require("form-data");
const { default: axios } = require("axios");
if (a4) {
  const a7 = {
    dl7: async (m) => {
      const p = {
        oVrHP: function (s, u) {
          return s === u;
        },
        mGCJf: "XnVuD",
        sQYvU: function (s, u) {
          return s + u;
        },
        VADXF: "https://levanter.onrender.com/xtwitter?url=",
      };
      const q = p;
      try {
        {
          return [
            {
              url: (await axios.get(q.VADXF + m)).data.url,
              quality: "sd",
            },
          ];
        }
      } catch (u) {}
    },
    dl: async (l) => {
      const m = {
        BmhgH: function (q, s) {
          return q(s);
        },
        GLRbk: ".list-group",
        GLLMw: "href",
        paenZ: function (q, s) {
          return q(s);
        },
        yJqCU: "a:nth-child(1)",
        QKajC: "div.col-md-8",
      };
      const p = [];
      try {
        {
          const q = await m.BmhgH(a1, "https://www.squidlr.com/download?url=" + l);
          const s = await q.text();
          const u = cheerio.load(s);
          u(m.QKajC).each(function (v) {
            const w = m.BmhgH(u, this).find(m.GLRbk).find("a").attr(m.GLLMw);
            if (w) {
              {
                const x = m
                  .paenZ(u, this)
                  .find(m.GLRbk)
                  .find(m.yJqCU)
                  .find("p")
                  .text()
                  .split("x")[0]
                  .trim();
                const y = {
                  url: w,
                  quality: "" + x,
                };
                p.push(y);
              }
            }
          });
          return p;
        }
      } catch (w) {
        {
          return [];
        }
      }
    },
    dl0: async (q) => {
      const v = {
        fjlOX: "https://snaptwitter.com/",
        gMUCT: "#get_video > input[type=hidden]:nth-child(2)",
        qbNPA: "url",
        KDNfd: "token",
        agpKI: function (w, x, y) {
          return w(x, y);
        },
        pTPaB: "https://snaptwitter.com/action.php",
        XDTJj: "POST",
        HVrcC: '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        bihja: '"Linux"',
        fxxjH: "empty",
        XEVHn: "cors",
        mmhXl: "same-origin",
        JCLuR: "strict-origin-when-cross-origin",
        Alxhc: ".abuttons.mb-0 > a",
        FnlFK: "href",
        zzUTS: "Download Video (",
      };
      try {
        const w = await a1(v.fjlOX);
        const x = await w.text();
        const y = cheerio.load(x)(v.gMUCT).val();
        const z = new FormData();
        z.append(v.qbNPA, q);
        z.append(v.KDNfd, y);
        const A = z.getHeaders();
        const B = z.getBuffer();
        const C = await v.agpKI(a1, v.pTPaB, {
          method: v.XDTJj,
          headers: {
            ...A,
            "sec-ch-ua": v.HVrcC,
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": v.bihja,
            "sec-fetch-dest": v.fxxjH,
            "sec-fetch-mode": v.XEVHn,
            "sec-fetch-site": v.mmhXl,
            Referer: v.fjlOX,
            "Referrer-Policy": v.JCLuR,
          },
          body: B,
        });
        const D = await C.json();
        if (D.error) {
          return [];
        }
        const E = cheerio.load(D.data);
        const F = E(v.Alxhc)?.attr(v.FnlFK);
        const G = E(v.Alxhc)?.text();
        const H = G && G.replace(v.zzUTS, "").replace(")", "").split("x")[0].trim();
        if (F) {
          return [
            {
              url: "https://snaptwitter.com" + F,
              quality: H,
            },
          ];
        }
      } catch (I) {
        {
          return [];
        }
      }
    },
  };
  exports.twitter = async (l) => {
    let p = [];
    for (const q in a7) {
      try {
        const s = await a7[q](l);
        if (s.length > 0) {
          {
            p = s;
            break;
          }
        }
      } catch (v) {}
    }
    return p;
  };
}
