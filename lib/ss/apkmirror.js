const a6 = (...p) => import("node-fetch").then(({ default: q }) => q(...p));
const cheerio = require("cheerio");
const a8 = "aWxvdmV5b3Vzb29vb29vbWF0Y2hidXRpZG9udGtub3d3aHlpbGlrZWxvdmV3YW50dQ==";
const a9 = {
  headers: {
    "User-Agent": "APKUpdater-v1",
    Authorization: "Basic YXBpLWFwa3VwZGF0ZXI6cm01cmNmcnVVakt5MDRzTXB5TVBKWFc4",
    "Content-Type": "application/json",
  },
};
const { iChecker } = require("../test/test");
const ab = iChecker();
const ac = ab == a8;
const ad = "https://www.apkmirror.com";
const ae = async (p, q) => {
  const u = {
    YGIcg: "href",
    UsfZu: "title",
    HqGao: function (z, A, B) {
      return z(A, B);
    },
    GmIeE:
      "div.appRow > div.table-row > div.table-cell:nth-child(2) > div > h5.appRowTitle.wrapText.marginZero.block-on-mobile",
  };
  p = p.trim();
  const v = [];
  const w = await u.HqGao(
    a6,
    q
      ? ad + "/?post_type=app_release&searchtype=apk&s=" + p
      : ad + "/?post_type=app_release&searchtype=apk&s=" + p + "&bundles%5B%5D=apk_files",
    a9,
  );
  if (!w.ok) {
    throw new Error("Failed to fetch data: " + w.statusText);
  }
  const x = await w.text();
  const y = cheerio.load(x);
  y(u.GmIeE).each((z, A) => {
    const B = y(A).find("a").attr(u.YGIcg);
    const C = {
      title: y(A).attr(u.UsfZu),
      url: ad + B,
    };
    v.push(C);
  });
  return {
    result: v,
    status: 405,
  };
};
const af = async (q) => {
  const u = {
    EvFbp: "href",
    QTOZV: ".apkm-badge:first",
    uXQMo: "div.table-cell.rowheight.addseparator.expand.pad.dowrap:nth-child(2)",
    MpKpr:
      "#content > div.card-with-tabs.unroll > div.tab-content.unroll > div.tab-pane.noPadding > div > div > div:nth-child(2) > div:nth-child(1)",
    TWknR: "noarch",
    puKfh: "download",
  };
  const v = await a6(q, a9);
  if (!v.ok) {
    throw new Error("Failed to fetch data: " + v.statusText);
  }
  const w = await v.text();
  const x = cheerio.load(w);
  const y = {};
  const z = x(u.uXQMo);
  const A = x(u.MpKpr);
  A.each((C, D) => {
    const E = x(z[C]).text();
    const F = x(D).find("a").attr(u.EvFbp);
    const G = x(D).find(u.QTOZV).text();
    if (!(E in y) && G) {
      y[E] = {
        title: E + " [" + G + "]",
        url: ad + F,
      };
    }
  });
  if (0 === A.length) {
    const C = await a6(q, a9);
    y.noarch = {
      title: u.TWknR,
      url: C.url + u.puKfh,
    };
  }
  const B = {
    result: y,
    status: 301,
  };
  return B;
};
const ag = async (p, q) => {
  const u = {
    otXTN: "-download/",
    HPcyb: function (A, B) {
      return A + B;
    },
    xKrah: ".center.f-sm-50 > div > a",
    RwZrp: "href",
    WPGXZ: "#download-link",
    yMGlX: 'a[rel="nofollow"]',
    XmUHW: "download.php?id=",
    KgNdl: "download/?key=",
  };
  if (p.endsWith(u.otXTN)) {
    const A = await a6(p, a9);
    const B = await A.text();
    const C = cheerio.load(B);
    p = u.HPcyb(ad, C(u.xKrah).attr(u.RwZrp));
  }
  const v = await a6(p, a9).catch((D) => console.log(D.message));
  const w = await v.text();
  const x = cheerio.load(w);
  let y = x(u.xKrah).attr(u.RwZrp);
  y ||= x(u.WPGXZ).attr(u.RwZrp);
  y ||= x(u.yMGlX).attr(u.RwZrp);
  const z = ad + y;
  if (z.includes(u.XmUHW) || !z.includes(u.KgNdl) || q) {
    return {
      result: z,
      status: 200,
    };
  } else {
    return ag(z, 1);
  }
};
if (ac) {
  exports.apkMirror = async (p, q) => {
    const u = {
      vuYZJ: "405",
      Jgeay: "301",
    };
    const [v, w] = p.split(";;");
    if (!w && v) {
      return await ae(v, q);
    } else if (u.vuYZJ == v) {
      return await af(w);
    } else if (u.Jgeay == v) {
      return await ag(w);
    } else {
      return undefined;
    }
  };
}
