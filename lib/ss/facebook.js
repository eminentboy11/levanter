const cheerio = require("cheerio"),
  ay = "aWxvdmV5b3Vzb29vb29vbWF0Y2hidXRpZG9udGtub3d3aHlpbGlrZWxvdmV3YW50dQ==",
  { iChecker } = require("../test/test"),
  { default: axios } = require("axios"),
  aB = iChecker(),
  aC = aB == ay;
if (aC) {
  function aD(...k) {
    const l = {
      YTaZj: function (p, q) {
        return p !== q;
      },
      YqvHC: function (p, q) {
        return p + q;
      },
      VJFIg: function (p, q) {
        return p * q;
      },
      hTmEz: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/",
      gNsoi: function (p, q) {
        return p + q;
      },
      tEDdH: function (p, q) {
        return p / q;
      },
      EcvpG: function (p, q) {
        return p - q;
      },
      kZIUS: function (p, q) {
        return p(q);
      },
    };
    function m(p, q, u) {
      {
        const w = l.hTmEz.split(""),
          x = w.slice(0, q),
          y = w.slice(0, u);
        let z = p
            .split("")
            .reverse()
            .reduce(function (B, C, D) {
              {
                if (l.YTaZj(-1, x.indexOf(C)))
                  return l.YqvHC(B, l.VJFIg(x.indexOf(C), Math.pow(q, D)));
              }
            }, 0),
          A = "";
        for (; z > 0;) ((A = l.gNsoi(y[z % u], A)), (z = l.tEDdH(l.EcvpG(z, z % u), u)));
        return A || "0";
      }
    }
    return (function (p, q, u, v, w, x) {
      x = "";
      for (let y = 0, z = p.length; y < z; y++) {
        let A = "";
        for (; p[y] !== u[w];) ((A += p[y]), y++);
        for (let B = 0; B < u.length; B++) A = A.replace(new RegExp(u[B], "g"), B.toString());
        x += String.fromCharCode(l.EcvpG(m(A, w, 10), v));
      }
      return l.kZIUS(decodeURIComponent, encodeURIComponent(x));
    })(...k);
  }
  const aE = {
    fget: async (l) => {
      const m = {
        wnanX: "href",
        EHlKN: "class",
        nVuSg: "locale",
        QkJdW: "https://fget.io/process",
        dZvNd: "*/*",
        fulXX: "application/x-www-form-urlencoded",
        XZOzJ: "https://fget.io/",
        isvya: "true",
        mDwvS: "target",
        LPHvS: "form",
        DtITk:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36",
        zutES: 'a[class*="download-result"]',
        kZPYr: "data-id",
        kMxhu: "base64",
        KQsjH: "https://r.ssstik.top/fb_mp3.sh",
        lcakR: function (p, q) {
          return p + q;
        },
        iikay: "url=",
        ZGiQn: "application/x-www-form-urlencoded; charset=UTF-8",
        lXuZB: "https://fget.io",
        tpWkJ: "fb_convert",
        GiAXB: "hx-redirect",
        XoJZP: "Audio",
        Fqtqg: "ZqVCo",
        fPMFd: "mmwZl",
      };
      try {
        const p = new URLSearchParams();
        (p.append("id", l), p.append(m.nVuSg, "en"));
        const q = await axios.post(m.QkJdW, p, {
            headers: {
              accept: m.dZvNd,
              "content-type": m.fulXX,
              "hx-current-url": m.XZOzJ,
              "hx-request": m.isvya,
              "hx-target": m.mDwvS,
              "hx-trigger": m.LPHvS,
              referer: m.XZOzJ,
              "user-agent": m.DtITk,
            },
          }),
          u = cheerio.load(q.data),
          v = [];
        let w;
        if (
          (u(m.zutES).each((x, y) => {
            const z = u(y).attr(m.wnanX),
              A = u(y).attr(m.EHlKN) || "";
            z &&
              /^https?:\/\//.test(z) &&
              (/\bhd\b/.test(A)
                ? v.push({
                    url: z,
                    quality: "HD",
                  })
                : /\bsd\b/.test(A)
                  ? v.push({
                      url: z,
                      quality: "SD",
                    })
                  : /\bmp3\b/.test(A) && (w = y));
          }),
          w)
        )
          try {
            {
              const y = u(w).attr(m.kZPYr),
                z = u(w).attr(m.wnanX);
              if (y && z) {
                {
                  const A = {};
                  ((A.id = y), (A.video = z));
                  const B = Buffer.from(JSON.stringify(A)).toString(m.kMxhu),
                    C = (
                      await axios.post(m.KQsjH, m.lcakR(m.iikay, encodeURIComponent(B)), {
                        headers: {
                          accept: m.dZvNd,
                          "content-type": m.ZGiQn,
                          "hx-current-url": m.lXuZB,
                          "hx-request": m.isvya,
                          "hx-target": m.tpWkJ,
                          "hx-trigger": m.tpWkJ,
                          origin: m.lXuZB,
                          referer: m.XZOzJ,
                          "user-agent": m.DtITk,
                        },
                        timeout: 0x7530,
                        validateStatus: () => true,
                      })
                    ).headers[m.GiAXB];
                  C &&
                    v.push({
                      url: C,
                      quality: m.XoJZP,
                    });
                }
              }
            }
          } catch (E) {}
        return v;
      } catch (F) {
        return m.Fqtqg === m.fPMFd ? [] : [];
      }
    },
    fbdown: async (k) => {
      const m = {
        zxMvz: "href",
        WBzjK: "a.download-link-fb",
        uWbFt: "https://fbdown.to/",
        bdSMV:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36",
        cUemg: "https://fbdown.to/api/ajaxSearch",
        mQKLC: "*/*",
        MvGZz: "application/x-www-form-urlencoded; charset=UTF-8",
        FhOjo: "XMLHttpRequest",
        qBYMn: "table tr",
      };
      try {
        {
          const u = await axios.get(m.uWbFt, {
              headers: {
                "user-agent": m.bdSMV,
              },
            }),
            v = u.data.match(/k_token\s*=\s*['"]([a-f0-9]{32,})['"]/),
            w = u.data.match(/k_exp\s*=\s*['"](\d{10})['"]/);
          if (!v || !w) return [];
          const x = v[1],
            y =
              "k_exp=" +
              w[1] +
              "&k_token=" +
              x +
              "&p=home&q=" +
              encodeURIComponent(k) +
              "&lang=en&v=v2&w=",
            z = await axios.post(m.cUemg, y, {
              headers: {
                accept: m.mQKLC,
                "content-type": m.MvGZz,
                "x-requested-with": m.FhOjo,
                referer: m.uWbFt,
                "user-agent": m.bdSMV,
              },
            });
          if (!z.data || "ok" !== z.data.status || !z.data.data) return [];
          const A = cheerio.load(z.data.data),
            B = [];
          return (
            A(m.qBYMn).each((C, D) => {
              {
                const F = A(D).find("td");
                if (F.length < 3) return;
                const G = A(F[0]).text().trim(),
                  H = A(F[2]).find(m.WBzjK).first().attr(m.zxMvz);
                if (!H || !/^https?:\/\//.test(H)) return;
                let I = G;
                (/HD/i.test(G) ? (I = "HD") : /SD/i.test(G) && (I = "SD"),
                  B.push({
                    url: H,
                    quality: I,
                  }));
              }
            }),
            B
          );
        }
      } catch (C) {
        {
          return [];
        }
      }
    },
    dl1: async (k) => {
      const l = {
        bRkaL: function (m, q) {
          return m(q);
        },
        uHdzh: "a[href]",
        vIJSd: "href",
        gGwKS: function (m, q) {
          return m(q);
        },
        zcgZJ: "lang",
        bckOM: "url",
        INvVT: "https://snapsave.app/action.php",
        YNjUd:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        rdXoH: "gzip, deflate, br",
        maPaW: "en-US,en;q=0.9",
        mSDkZ: "application/x-www-form-urlencoded",
        bNIbR: "https://snapsave.app",
        ovlll: "https://snapsave.app/",
        tcBSu:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML,like Gecko) Chrome/96.0.4664.110 Safari/537.36",
        ETFkT: 'decodeURIComponent(escape(r))}("',
        XidHs: "</style>",
        VUiWT: function (m, q) {
          return m == q;
        },
        mCTQa: "string",
        SuSyJ: "table.table > tbody > tr",
      };
      try {
        {
          const m = new URLSearchParams();
          (m.append(l.zcgZJ, "en"), m.append(l.bckOM, encodeURI(k)));
          const q = (
              await axios.post(l.INvVT, m, {
                headers: {
                  accept: l.YNjUd,
                  "accept-encoding": l.rdXoH,
                  "accept-language": l.maPaW,
                  "content-type": l.mSDkZ,
                  origin: l.bNIbR,
                  referer: l.ovlll,
                  "user-agent": l.tcBSu,
                },
              })
            ).data,
            u = q
              .split(l.ETFkT)[1]
              ?.["split"](",")
              ?.["map"]((y) => y.replace(/^"/, "").replace(/"$/, "").trim());
          let v;
          if (Array.isArray(u) && 6 === u.length) {
            {
              const z = l.gGwKS(aD, ...u);
              v = z.split(l.XidHs)[1]?.["replace"](/\\(\\)?/g, "");
            }
          } else v = (l.VUiWT(l.mCTQa, typeof q) ? JSON.parse(q) : q)?.["data"];
          const w = [];
          if (!v) return w;
          const x = cheerio.load(v);
          return (
            x(l.SuSyJ).each(function () {
              const A = l.bRkaL(x, this).find("td");
              if (/tidak|no/i.test(A.eq(1).text())) {
                const B = A.eq(0).text().split("(")?.[0]?.["trim"](),
                  C = A.eq(2).find(l.uHdzh).attr(l.vIJSd);
                C &&
                  w.push({
                    quality: B,
                    url: C,
                  });
              }
            }),
            w
          );
        }
      } catch (B) {
        return [];
      }
    },
  };
  exports.facebook = async (k) => {
    let m = [];
    for (const p in aE) {
      {
        const u = await aE[p](k);
        if (u.length > 0) {
          {
            m = u;
            break;
          }
        }
      }
    }
    return m;
  };
}
