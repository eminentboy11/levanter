const cheerio = require("cheerio");
const a2 = (...m) => import("node-fetch").then(({ default: p }) => p(...m));
const FormData = require("form-data");
const cookie = require("cookie");
const a5 = "aWxvdmV5b3Vzb29vb29vbWF0Y2hidXRpZG9udGtub3d3aHlpbGlrZWxvdmV3YW50dQ==";
const { iChecker } = require("./test/test");
const a7 = iChecker();
const a8 = a7 == a5;
if (a8) {
  exports.textMaker = async (z, A, B = "") => {
    const C = {
      Fzdht: function (ab, ac, ad) {
        return ab(ac, ad);
      },
      iAJpH: "GET",
      rRPig: "GoogleBot",
      VUyZC: "set-cookie",
      CBNXs: 'input[name="token"]',
      QIKFN: "value",
      TtXWq: 'input[name="build_server"]',
      heSKy: 'input[name="build_server_id"]',
      Eacze: "submit",
      npVOP: "radio0[radio]",
      toJGY: "token",
      NvEiP: "build_server",
      Lbqex: "build_server_id",
      OSLkz: "POST",
      iHASf: "*/*",
      EgWZv: "en-US,en;q=0.9",
      eMWtG: "https://en.ephoto360.com/",
      knyEx: 'input[name="form_value_input"]',
      Fkhbh: "#form_value",
      zIdTW: "radio0",
      cEpxm: "textmaker: failed image processing",
    };
    A = A.split(";");
    const D = "https://" + new URL(z).host + "/";
    const E = await C.Fzdht(a2, z, {
      method: C.iAJpH,
      headers: {
        "User-Agent": C.rRPig,
      },
    });
    const F = await E.text();
    let G = E.headers
      .get(C.VUyZC)
      .split(",")
      .map((ab) => cookie.parse(ab))
      .reduce(
        (ab, ac) => ({
          ...ab,
          ...ac,
        }),
        {},
      );
    G = {
      __cfduid: G.__cfduid,
      PHPSESSID: G.PHPSESSID,
    };
    G = Object.entries(G)
      .map(([ab, ac]) => cookie.serialize(ab, ac))
      .join("; ");
    const H = cheerio.load(F);
    const I = H(C.CBNXs).attr(C.QIKFN);
    const J = H(C.TtXWq).attr(C.QIKFN);
    const K = H(C.heSKy).attr(C.QIKFN);
    const L = new FormData();
    A.forEach((ab) => L.append("text[]", ab.trim()));
    L.append(C.Eacze, "Go");
    if (B) {
      L.append(C.npVOP, B);
    }
    L.append(C.toJGY, I);
    L.append(C.NvEiP, J);
    L.append(C.Lbqex, K);
    const M = await C.Fzdht(a2, z, {
      method: C.OSLkz,
      headers: {
        Accept: C.iHASf,
        "Accept-Language": C.EgWZv,
        "User-Agent": C.rRPig,
        Cookie: G,
        ...L.getHeaders(),
      },
      body: L.getBuffer(),
    });
    const N = await M.text();
    const O = cheerio.load(N);
    let P;
    P = C.eMWtG == D ? O(C.knyEx).attr(C.QIKFN) : O(C.Fkhbh).first().text();
    if (!P) {
      return {
        status: false,
      };
    }
    let R = JSON.parse(P);
    const T = new FormData();
    T.append("id", R.id);
    R.text.forEach((ab) => T.append("text[]", ab));
    T.append(C.toJGY, R.token);
    T.append(C.NvEiP, R.build_server);
    T.append(C.Lbqex, R.build_server_id);
    if (R.hasOwnProperty(C.zIdTW)) {
      T.append(C.npVOP, R.radio0.radio);
    }
    const U = await C.Fzdht(a2, D + "effect/create-image", {
      method: C.OSLkz,
      headers: {
        Accept: C.iHASf,
        "Accept-Language": C.EgWZv,
        "User-Agent": C.rRPig,
        Cookie: G,
        ...T.getHeaders(),
      },
      body: T.getBuffer(),
    });
    const V = await U.json();
    if (!V.image) {
      throw new Error(C.cEpxm);
    }
    const aa = {
      status: V.success,
      url: "" + J + V.image,
    };
    return aa;
  };
}
