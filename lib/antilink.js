const { getAntiLink, getWord } = require("./db");
const config = require("./config");
const axios = require("axios");
const b7 =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|ftp:\/\/[a-zA-Z0-9]+\.[^\s]{2,}|[a-zA-Z0-9-]+\.[a-zA-Z]{2,})/gi;
const b8 = (v, x) => {
  const y = {
    HTHJE: function (z, A) {
      return z === A;
    },
    iNlFO: "http",
    EpXXY: function (z, A) {
      return z + A;
    },
    ofeiV: function (z, A) {
      return z + A;
    },
    kdHKE: function (z, A) {
      return z === A;
    },
    qjiFs: function (z, A) {
      return z === A;
    },
    ciTVV: function (z, A) {
      return z === A;
    },
  };
  try {
    {
      const z = new URL(v.startsWith(y.iNlFO) ? v : "http://" + v);
      const A = z.hostname.toLowerCase();
      const B = y.EpXXY(z.pathname + z.search, z.hash);
      const C = x
        .toLowerCase()
        .replace(/^https?:\/\//, "")
        .replace(/^www\./, "");
      if (C.includes("/")) {
        const [D, ...E] = C.split("/");
        const F = y.ofeiV("/", E.join("/"));
        return (
          (!!(A === D) || !!y.HTHJE(A, "www." + D) || !!y.kdHKE("www." + A, D)) &&
          B.toLowerCase().startsWith(F.toLowerCase())
        );
      }
      {
        {
          const H = C;
          if (A === H) {
            return true;
          }
          if (H.startsWith("*.")) {
            {
              const I = H.slice(2);
              return A.endsWith(I);
            }
          }
          return y.qjiFs(A, "www." + H) || y.ciTVV("www." + A, H);
        }
      }
    }
  } catch (L) {
    return false;
  }
};
const b9 = async (x) => {
  const y = {
    KXxMm: "http",
  };
  try {
    {
      const B = await axios.head(x.startsWith(y.KXxMm) ? x : "https://" + x, {
        timeout: 3000,
      });
      return B.status >= 200 && B.status < 404;
    }
  } catch (C) {
    {
      return false;
    }
  }
};
const normalizeUrl = (x) => {
  const y = {
    fwucx: function (A, B) {
      return A === B;
    },
  };
  const z = y;
  try {
    let A = x.trim().toLowerCase();
    A = A.replace(/^https?:\/\//, "");
    A = A.replace(/^ftp:\/\//, "");
    A = A.replace(/^www\./, "");
    if (!A.includes("?") && A.endsWith("/") && z.fwucx(2, A.split("/").length)) {
      A = A.slice(0, -1);
    }
    return A;
  } catch (B) {
    return x.trim().toLowerCase();
  }
};
exports.normalizeUrl = normalizeUrl;
exports.isAntiLink = async function (v, x, y) {
  const z = {
    YsxAf: "null",
  };
  const A = v.match(b7);
  if (!A || !A.length) {
    return false;
  }
  const B = await getAntiLink(x, y);
  if (!B || !B.enabled) {
    return false;
  }
  const { action: C, allowedUrls: D } = B;
  let E = [];
  let F = [];
  let G = false;
  if (D && z.YsxAf !== D) {
    const H = D.split(",")
      .map((I) => I.trim())
      .filter((I) => I);
    E = H.filter((I) => !I.startsWith("!"));
    F = H.filter((I) => I.startsWith("!")).map((I) => I.slice(1));
    G = H.length > 0;
  }
  if (!G && A && A.length > 0) {
    return C;
  }
  for (const I of A) {
    {
      if (!I.match(/^https?:\/\//) && !I.match(/^www\./)) {
        {
          if (!(await b9(I))) {
            continue;
          }
        }
      }
      let J = false;
      for (const L of E) {
        if (b8(I, L)) {
          J = true;
          break;
        }
      }
      if (!J) {
        for (const M of F) {
          if (b8(I, M)) {
            return C;
          }
        }
        if (E.length > 0) {
          return C;
        }
      }
    }
  }
  return false;
};
exports.isWords = async (v, x, y) => {
  const A = await getWord(x, y);
  if (!A || !A.enabled || !A.words) {
    return false;
  }
  const B = A.words
    .split(",")
    .map((C) => C.trim())
    .filter((C) => C);
  if (!B.length) {
    return false;
  }
  for (const C of B) {
    if (new RegExp("\\b" + escapeRegExp(C) + "\\b", "i").test(v)) {
      return A.action;
    }
  }
  return false;
};
const { getFloor, escapeRegExp } = require("./utils");
const { SPAM_LEVELS, BASE_SCORES, SCORE_MODIFIERS } = require("./constants/spam");
function bg(v = "medium") {
  return SPAM_LEVELS[v] || SPAM_LEVELS.medium;
}
function bh(x, y, z, A) {
  const B = {
    hbTLf: function (E, F) {
      return E === F;
    },
    rvYbX: "text",
    Pgbtk: function (E, F) {
      return E === F;
    },
    FkSkw: "TWiJK",
    LOqML: "URIyX",
    hkTLR: function (E, F) {
      return E < F;
    },
    zwaPC: function (E, F) {
      return E < F;
    },
    BplhA: function (E, F) {
      return E / F;
    },
    lYlzF: "sticker",
    AyJGR: function (E, F) {
      return E > F;
    },
    XQsNR: function (E, F) {
      return E > F;
    },
  };
  const C = B;
  let D = 0;
  if (C.rvYbX === x) {
    {
      const F = y?.length || 0;
      D = F < 50 ? BASE_SCORES.textShort : F < 200 ? BASE_SCORES.textMedium : F / 100;
    }
  } else {
    D = C.lYlzF === x ? BASE_SCORES.sticker : BASE_SCORES.image;
  }
  if (y) {
    if (y.length > 10) {
      if (C.AyJGR(C.BplhA((y.match(/[A-Z]/g) || []).length, y.length), 0.8)) {
        D *= SCORE_MODIFIERS.allCaps;
      }
    }
    if (A && A.length > 0) {
      D *= SCORE_MODIFIERS.mentions;
    }
    if (
      C.XQsNR(
        (
          y.match(
            /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu,
          ) || []
        ).length,
        5,
      )
    ) {
      D *= SCORE_MODIFIERS.manyEmojis;
    }
    if (z) {
      D *= SCORE_MODIFIERS.hasUrls;
    }
  }
  return D;
}
exports.spamCheck = (z, B, C, D, E, G, H, I, J) => {
  const K = {
    DPlhm: function (U, V) {
      return U(V);
    },
    DdCzm: function (U, V) {
      return U / V;
    },
    miYUW: function (U, V) {
      return U * V;
    },
    lSHZy: function (U, V) {
      return U > V;
    },
  };
  const L = K.DPlhm(getFloor, K.DdCzm(K.miYUW(1, new Date()), 1000));
  const M = bg(I);
  const N = {
    cool: L,
    keys: [],
    score: 0,
    index: 0,
    prev: "",
  };
  if (!(z in config[J].temp.spam)) {
    config[J].temp.spam[z] = {};
  }
  if (!(B in config[J].temp.spam[z])) {
    config[J].temp.spam[z][B] = N;
  }
  const O = config[J].temp.spam[z][B];
  let P = bh(D, E, H, G);
  const Q = E?.trim().toLowerCase() || "";
  const R = O.prev?.trim().toLowerCase() || "";
  if (Q && R === Q) {
    P *= M.repeatPenalty;
  }
  O.prev = E || "";
  if (K.lSHZy(L - O.cool, M.timeWindow)) {
    {
      const U = {
        ...C,
      };
      U.participant = B;
      const V = U;
      config[J].temp.spam[z][B] = {
        cool: L,
        keys: [V],
        score: P,
        index: 1,
        prev: E || "",
      };
      return false;
    }
  }
  O.cool = L;
  const S = {
    ...C,
  };
  S.participant = B;
  const T = S;
  O.keys.push(T);
  if (O.keys.length > 50) {
    O.keys = O.keys.slice(-50);
  }
  O.score += P;
  O.index++;
  return O.score > M.scoreThreshold || O.index > M.messageThreshold;
};
