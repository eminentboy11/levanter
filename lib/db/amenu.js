const { DataTypes } = require("sequelize");
const config = require("../../config");
const config2 = require("../config");
const { LRUCache } = require("./nr");
const a1 = config.DATABASE.define("amenu", {
  chat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cmd: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  session: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "0",
  },
});
const a2 = new RegExp("\\b\\w+\\b", "g");
const a3 = parseInt(process.env.AMENU_CACHE_SIZE) || 1000;
const a4 = parseInt(process.env.AMENU_CACHE_TTL) || 3600000;
const a5 = new LRUCache(a3, a4);
setInterval(() => a5.cleanup(), 600000);
const a6 = {
  valid: false,
  error: "Command string too long (max 5000 characters)",
};
const a7 = {
  valid: true,
};
const a8 = {
  valid: false,
  error: "Session must be a non-empty string",
};
const a9 = {
  valid: false,
  error: "Chat must be a non-empty string",
};
const aa = {
  valid: false,
  error: "Command must be a non-empty string",
};
const ab = (q, v) => q + "-" + v;
const ac = (q, v, w) =>
  q && typeof q == "string" && q.trim().length !== 0
    ? v && typeof v == "string" && v.trim().length !== 0
      ? w && typeof w == "string"
        ? q.length > 5000
          ? a6
          : a7
        : a8
      : a9
    : aa;
const ad = (q) => {
  const v = q.match(a2) || [];
  return Array.from(new Set(v));
};
const ae = (q, v) =>
  config2[v] && config2[v].cammands ? q.filter((w) => !!config2[v].cammands[w]) : [];
exports.setAmenu = async (x, y, z) => {
  const A = {
    QOXXI: "No valid commands provided",
    gKEBa: "Commands already added",
    sHWKj: "[AMENU DB] Error in setAmenu:",
    YQQbH: "Database error: ",
  };
  try {
    const B = ac(y, x, z);
    if (!B.valid) {
      return {
        error: B.error,
      };
    }
    a5.delete(ab(z, x));
    y = y.toLowerCase().trim();
    const C = {
      chat: x,
      session: z,
    };
    const D = {
      chat: x,
      cmd: "",
      session: z,
    };
    const E = {
      where: C,
      defaults: D,
    };
    const [F, G] = await a1.findOrCreate(E);
    let H = ad(y);
    H = ae(H, z);
    if (0 === H.length) {
      return {
        error: A.QOXXI,
        invalidCommands: ad(y),
      };
    }
    if (G) {
      await F.update({
        cmd: H.join(","),
      });
      return H;
    }
    const I = F.dataValues.cmd.split(",").filter(Boolean);
    const J = H.filter((L) => I.includes(L));
    if (J.length > 0) {
      return {
        error: A.gKEBa,
        duplicates: J,
        existing: I,
      };
    }
    const K = [...I, ...H];
    await F.update({
      cmd: K.join(","),
    });
    return H;
  } catch (L) {
    console.error(A.sHWKj, L.message);
    return {
      error: A.YQQbH + L.message,
    };
  }
};
exports.delAmenu = async (x, y, z) => {
  const A = {
    LKVoP: "No menu found for this group",
    UIUWH: "all",
    nyFUk: "clear",
    TVXlA: "Command not found",
    DjvrM: "[AMENU DB] Error in delAmenu:",
    pGnTF: "Database error: ",
  };
  try {
    const B = ac(y, x, z);
    if (!B.valid) {
      return {
        error: B.error,
      };
    }
    a5.delete(ab(z, x));
    y = y.toLowerCase().trim();
    const C = {
      chat: x,
      session: z,
    };
    const D = {
      where: C,
    };
    const E = await a1.findOne(D);
    const F = {
      error: A.LKVoP,
    };
    if (!E) {
      return F;
    }
    if (A.UIUWH === y || A.nyFUk === y) {
      await E.destroy();
      return A.UIUWH;
    }
    const G = E.dataValues.cmd.split(",").filter(Boolean);
    const H = new Set(ad(y));
    const I = G.filter((K) => !H.has(K));
    const J = G.filter((K) => H.has(K));
    if (0 === J.length) {
      return {
        error: A.TVXlA,
        notFound: Array.from(H),
        existing: G,
      };
    } else {
      if (0 === I.length) {
        await E.destroy();
      } else {
        await E.update({
          cmd: I.join(","),
        });
      }
      return J;
    }
  } catch (K) {
    {
      console.error(A.DjvrM, K.message);
      return {
        error: A.pGnTF + K.message,
      };
    }
  }
};
exports.getAmenu = async (w, x) => {
  const y = {
    qUews: function (z, A) {
      return z === A;
    },
    diECZ: "[AMENU DB] Error in getAmenu:",
  };
  try {
    {
      if (!w || !x) {
        return null;
      }
      const z = ab(x, w);
      if (y.qUews(undefined, a5.get(z))) {
        {
          const B = {
            chat: w,
            session: x,
          };
          const C = {
            where: B,
          };
          const D = await a1.findOne(C);
          const E = D && D.dataValues.cmd.length ? ad(D.dataValues.cmd) : null;
          a5.set(z, E);
        }
      }
      const A = a5.get(z);
      if (A && A.length) {
        return ae(A, x);
      } else {
        return null;
      }
    }
  } catch (H) {
    {
      console.error(y.diECZ, H.message);
      return null;
    }
  }
};
