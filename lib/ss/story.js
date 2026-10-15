const axios = require("axios");
const cheerio = require("cheerio");
const az = "aWxvdmV5b3Vzb29vb29vbWF0Y2hidXRpZG9udGtub3d3aHlpbGlrZWxvdmV3YW50dQ==";
const { iChecker } = require("../test/test");
const aB = iChecker();
const aC = aB == az;
const FormData = require("form-data");
function aE(...l) {
  const m = {
    OwtDl: function (p, q) {
      return p !== q;
    },
    vKMHI: function (p, q) {
      return p + q;
    },
    CiKdq: function (p, q) {
      return p * q;
    },
    XRTPw: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/",
    YxdIW: function (p, q) {
      return p + q;
    },
    gcEbc: function (p, q) {
      return p / q;
    },
    syVIX: function (p, q) {
      return p - q;
    },
    jvBYp: function (p, q) {
      return p(q);
    },
  };
  function o(p, q, u) {
    {
      const w = m.XRTPw.split("");
      const x = w.slice(0, q);
      const y = w.slice(0, u);
      let z = p
        .split("")
        .reverse()
        .reduce(function (B, C, D) {
          {
            if (m.OwtDl(-1, x.indexOf(C))) {
              return m.vKMHI(B, m.CiKdq(x.indexOf(C), Math.pow(q, D)));
            }
          }
        }, 0);
      let A = "";
      while (z > 0) {
        A = m.YxdIW(y[z % u], A);
        z = m.gcEbc(m.syVIX(z, z % u), u);
      }
      return A || "0";
    }
  }
  return (function (p, q, u, v, w, x) {
    {
      x = "";
      for (let z = 0, A = p.length; z < A; z++) {
        let B = "";
        while (p[z] !== u[w]) {
          B += p[z];
          z++;
        }
        for (let C = 0; C < u.length; C++) {
          B = B.replace(new RegExp(u[C], "g"), C.toString());
        }
        x += String.fromCharCode(m.syVIX(o(B, w, 10), v));
      }
      return m.jvBYp(decodeURIComponent, encodeURIComponent(x));
    }
  })(...l);
}
if (aC) {
  const aF = [
    async (l) => {
      const m = {
        nyLyP: function (u, v) {
          return u(v);
        },
        IMgTe: "href",
        pNXdr: "url",
        SVmFt: "https://snapsave.app/action.php?lang=en",
        CSfGU: "*/*",
        qLoZj: "en-GB,en-US;q=0.9,en;q=0.8",
        bQJjy: "u=1, i",
        OouFu: '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
        NyvPa: '"Linux"',
        ycKtQ: "empty",
        Mysmz: "cors",
        UUzBl: "same-origin",
        sZGRz:
          "_ga=GA1.1.1168386173.1743935003; _cc_id=c8387a19ff7b97e8fdc5cb93653d8333; panoramaId_expiry=1744021408700; panoramaId=27d690c42c0626d00de9e3228abea9fb927a1ec495960dadcc69505553aa8b41; panoramaIdType=panoDevice; cto_bidid=V2Y_mV9RZUNLQ1BtNFhzUWZ1N3AzbEJ0YlJEM3oxQ2lvbkZrSENlWUlMVUhZUlp6UndkU1h0MGZxc2ZJOUY1JTJGcnViNW50c1NjREcxejAwMERjMWJuaE9rejdzVVlYVTlIRlR6WTFiN2dKbSUyRnJ2cmslM0Q; _pubcid=b4b7976c-80fb-45f8-baeb-a5329b4e30e4; _pubcid_cst=zix7LPQsHA%3D%3D; __gads=ID=d012958a75a4778b:T=1743935005:RT=1743940898:S=ALNI_MY8X5yyKEUPZP_OhqTIeP6tbavubg; __gpi=UID=0000108dbc2bb880:T=1743935005:RT=1743940898:S=ALNI_Ma7qKMTCTZDkNpwDa3KNgQkwW7lOg; __eoi=ID=63f69581536b6339:T=1743935005:RT=1743940898:S=AA-AfjYw5HNshwG0IHvQuOOh2H_O; FCNEC=%5B%5B%22AKsRol912aXQsSt5iZfaTGNIm6Ie_Dl5Etz-Vei2Fu1nHI2RQ8g8bcfSELem5VGWdYlPRyVUlM_2V-gi2h41HiLm-p4IuLGG0wVg7CT3OHILvW3iQIbcvK_VMwnDg9IFsIZ1Ex9c18-3Isnsv-Mqks5RmgLik8zjeA%3D%3D%22%5D%5D; __jscuActive=true; cto_bundle=AzALg19FaXI5YWkxbW9OeVlGblRVTHVaQU9YakdlTGQ4JTJCQjRZV3lWNVdUOEVHJTJCdUY5cXZTaExTY0Y3VWp0aDBxWDNOSW9ZVGQ1TVdPQ0k0MnVnJTJCV1pETyUyRlRYSE1DbEdiV2V6cmFjZHJLMGU5QlVDUUFjRHMlMkZ2VE9mJTJCNkZaYTl6dFFUcTlRamVvamQwQVRYYmxZZU5JQ0Z0VkElM0QlM0Q; _ga_WNPZGVDWE9=GS1.1.1743940895.2.1.1743940951.4.0.0",
        kBkRr: "https://snapsave.app/",
        wLjWM: "strict-origin-when-cross-origin",
        NcBjc: 'decodeURIComponent(escape(r))}("',
        OgZpD: function (u, ...v) {
          return u(...v);
        },
        MWwsR: "</style>",
        GtEdj: ".download-items__btn",
      };
      const q = new FormData();
      q.append(m.pNXdr, "https://instagram.com/stories/" + l);
      try {
        const { data: u } = await axios.post(m.SVmFt, q, {
          headers: {
            ...q.getHeaders(),
            accept: m.CSfGU,
            "accept-language": m.qLoZj,
            priority: m.bQJjy,
            "sec-ch-ua": m.OouFu,
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": m.NyvPa,
            "sec-fetch-dest": m.ycKtQ,
            "sec-fetch-mode": m.Mysmz,
            "sec-fetch-site": m.UUzBl,
            cookie: m.sZGRz,
            Referer: m.kBkRr,
            "Referrer-Policy": m.wLjWM,
          },
        });
        const v = u
          .split(m.NcBjc)[1]
          ?.split(",")
          ?.map((A) => A.replace(/^"/, "").replace(/"$/, "").trim());
        const w = m.OgZpD(aE, ...v);
        const x = w.split(m.MWwsR)[1]?.replace(/\\(\\)?/g, "");
        const y = cheerio.load(x);
        const z = [];
        y(m.GtEdj).each(function () {
          let A = m.nyLyP(y, this).find("a").attr(m.IMgTe);
          if (A) {
            z.push(A);
          }
        });
        return z;
      } catch (A) {
        return [];
      }
    },
    async (l) => {
      const m = {
        AZSlN: "(((.+)+)+)+$",
        vnqbp: function (q, u) {
          return q(u);
        },
        tPEjL: ".download-items__btn > a[href]",
        kjzdm: "href",
        XgMwk: "https://snapsave.app/action.php",
        HYtaX: "post",
        Mfflg: "application/x-www-form-urlencoded",
        vCwiG: "https://snapsave.app",
        iuocx: "https://snapsave.app/download-video-instagram",
        CUKaP: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
        ePXtQ: 'decodeURIComponent(escape(r))}("',
        NikQh: function (q, ...u) {
          return q(...u);
        },
        bASUx: "</style>",
        YHGrL: "div.download-items__btn",
      };
      try {
        {
          const q = [];
          const { data: u } = await axios.post(
            m.XgMwk,
            new URLSearchParams({
              url: "https://instagram.com/stories/" + l + "/",
              action: m.HYtaX,
            }),
            {
              headers: {
                "content-type": m.Mfflg,
                origin: m.vCwiG,
                referer: m.iuocx,
                "user-agent": m.CUKaP,
              },
            },
          );
          const v = u
            .split(m.ePXtQ)[1]
            ?.split(",")
            ?.map((z) => z.replace(/^"/, "").replace(/"$/, "").trim());
          const w = m.NikQh(aE, ...v);
          const x = w.split(m.bASUx)[1]?.replace(/\\(\\)?/g, "");
          const y = cheerio.load(x);
          m.NikQh(y, m.YHGrL).each(function () {
            {
              let C = m.vnqbp(y, this).find(m.tPEjL).attr(m.kjzdm);
              if (C) {
                q.push(C);
              }
            }
          });
          return q;
        }
      } catch {
        return [];
      }
    },
  ];
  exports.story = async (l) => {
    const m = {
      HAbjA: "/stories/",
      VqIBe: function (o, p) {
        return o + p;
      },
    };
    if (l.includes(m.HAbjA)) {
      {
        const o = m.VqIBe(l.indexOf(m.HAbjA), 9);
        const p = l.lastIndexOf("/");
        l = l.substring(o, p);
      }
    }
    for await (const u of aF) {
      {
        const v = await u(l);
        if (v.length > 0) {
          return v;
        }
      }
    }
    return [];
  };
}
