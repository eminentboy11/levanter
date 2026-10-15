const { getGAuth, setGAuth, GAuthDB } = require("./db");
let Y = null;
const Z = async () => (Y ??= await import("youtubei.js"));
const a0 = (l = "0", m) => setGAuth("yt_token", m, l);
const a1 = (l = "0") => getGAuth("yt_token", l);
const a2 = (l = "0") =>
  GAuthDB.destroy({
    where: {
      type: "yt_token",
      session: l,
    },
  });
const a3 = async (l = "0") => !!(await a1(l));
const a4 = async (l = "0", m) => {
  const p = {
    VCBUK: "jxuQw",
    gSiWe: "TeRrT",
    RoCcD: "return (function() ",
    gxSBR: '{}.constructor("return this")( )',
    IdKFz: "pbaNu",
    bTsXV: "auth-pending",
    kBWtu: "auth",
    fTYhX: "auth-error",
  };
  const q = await Z();
  const v = await q.Innertube.create({
    cache: new q.UniversalCache(false),
    generate_session_locally: true,
  });
  return await new Promise((w, x) => {
    const y = {
      FffEK: function (z, A) {
        return z(A);
      },
      txkuz: function (z, A) {
        return z !== A;
      },
      EiJdP: p.VCBUK,
      drvXH: function (z, A) {
        return z * A;
      },
      MboZI: function (z, A) {
        return z + A;
      },
      gKpcy: function (z, A) {
        return z(A);
      },
      YkvJN: function (z, A, B) {
        return z(A, B);
      },
      wvAly: p.gSiWe,
      awwVp: function (z, A) {
        return z(A);
      },
      GthlY: function (z, A) {
        return z(A);
      },
      NLpSW: function (z, A) {
        return z + A;
      },
      MdtqD: function (z, A) {
        return z + A;
      },
      fMfdF: p.RoCcD,
      GMkJb: p.gxSBR,
      SlrBS: function (z, A) {
        return z === A;
      },
      DQzTc: p.IdKFz,
      coBLy: function (z, A, B) {
        return z(A, B);
      },
      NihgH: function (z, A, B) {
        return z(A, B);
      },
    };
    {
      let A = false;
      let B = null;
      const C = (D, E) => {
        if (!A) {
          A = true;
          if (B) {
            clearTimeout(B);
          }
          D(E);
        }
      };
      v.session.once(p.bTsXV, (D) => {
        const F = y.drvXH(1000, y.MboZI(y.gKpcy(Number, D?.expires_in) || 1800, 15));
        B = y.YkvJN(
          setTimeout,
          () => C(x, new Error("Login timed out — code expired. Run .ytlogin again.")),
          F,
        );
        try {
          if (m) {
            m(D);
          }
        } catch (H) {}
      });
      v.session.once(p.kBWtu, async ({ credentials: D }) => {
        try {
          await a0(l, D);
        } catch (F) {}
        C(w, D);
      });
      v.session.once(p.fTYhX, (D) => C(x, D));
      v.session.signIn().catch((D) => C(x, D));
    }
  });
};
const a5 = {
  startYtLogin: a4,
  getYtCreds: a1,
  saveYtCreds: a0,
  clearYtCreds: a2,
  isYtLoggedIn: a3,
};
module.exports = a5;
