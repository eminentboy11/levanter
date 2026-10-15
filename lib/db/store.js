const { DataTypes } = require("sequelize");
const config = require("../../config");
const utils = require("../utils");
const config2 = require("../config");
const ad = config.DATABASE.define("db", {
  db: {
    type: DataTypes.TEXT,
    defaultValue: "{}",
  },
  session: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "0",
  },
});
exports.setDb = async (q) => {
  const u = {
    session: q,
  };
  const v = {
    where: u,
  };
  const w = await ad.findOne(v);
  if (w) {
    await w.update({
      db: JSON.stringify(config2[q].db),
      session: q,
    });
  } else {
    await ad.create({
      db: JSON.stringify(config2[q].db),
      session: q,
    });
  }
};
exports.getDb = async (q) => {
  const u = {
    session: q,
  };
  const v = {
    where: u,
  };
  const w = await ad.findOne(v);
  if (w) {
    config2[q].db = JSON.parse(w.db);
  }
  return config2[q].db;
};
const ae = {
  type: DataTypes.STRING,
  allowNull: false,
};
const af = {
  type: DataTypes.STRING,
  allowNull: false,
};
const ag = {
  type: DataTypes.TEXT,
  allowNull: false,
  defaultValue: "{}",
};
const ah = {
  gid: ae,
  uid: af,
  data: ag,
};
const ai = config.DATABASE.define("msg", ah);
const aj = (m) => {
  const p = {};
  const q = Object.keys(m).sort((u, v) => m[v].total - m[u].total);
  for (const u of q) {
    p[u] = m[u];
  }
  return p;
};
function ak(q, u, v, w) {
  const x = {
    SGsHC: function (C, D) {
      return C === D;
    },
    gwKem: "extended",
    OpFIJ: "text",
    iPrgS: function (C, D) {
      return C + D;
    },
  };
  const y = x;
  v = y.gwKem === v ? y.OpFIJ : v;
  const z = Date.now();
  const A = {
    name: w,
    time: z,
    total: 0,
    items: {},
  };
  let B = A;
  if (u) {
    B = {
      ...B,
      ...JSON.parse(u),
    };
  }
  B.time = z;
  B.name = w;
  B.items[v] = y.iPrgS(B.items[v] || 0, 1);
  B.total++;
  Object.assign(q, B);
}
exports.setMsgs = async function (q, u, v, w) {
  const x = {
    BKcJI: function (C, D, E, F, G) {
      return C(D, E, F, G);
    },
  };
  const y = {
    gid: q,
    uid: u,
  };
  const z = {
    where: y,
  };
  const A = await ai.findOne(z);
  const B = {};
  x.BKcJI(ak, B, A?.data, v, w);
  if (A) {
    await A.update({
      gid: q,
      uid: u,
      data: JSON.stringify(B),
    });
  } else {
    await ai.create({
      gid: q,
      uid: u,
      data: JSON.stringify(B),
    });
  }
};
exports.getMsgs = async function (v, w) {
  if (v && !w) {
    {
      const B = {
        gid: v,
      };
      const C = {
        where: B,
      };
      const D = await ai.findAll(C);
      if (D.length < 1) {
        return false;
      }
      const E = D.reduce((F, { uid: G, data: H }) => {
        F[G] = JSON.parse(H);
        return F;
      }, {});
      return aj(E);
    }
  }
  const y = {
    gid: v,
    uid: w,
  };
  const z = {
    where: y,
  };
  const A = await ai.findOne(z);
  return !!A && JSON.parse(A.data);
};
exports.delMsgs = async function (q, u) {
  const v = {
    gid: q,
    uid: u,
  };
  const w = {
    where: v,
  };
  const x = await ai.findOne(w);
  return !!x && (await x.destroy());
};
exports.getName = async (q, u, v) => {
  if (!q && !u) {
    return "";
  }
  if (!u && q) {
    return (await config2[v].fetchGroupMetadata(q)).subject;
  }
  if (u && !q) {
    {
      const x = {
        uid: u,
      };
      const y = {
        where: x,
      };
      const z = await ai.findOne(y);
      if (z) {
        return JSON.parse(z.data).name;
      } else {
        return "";
      }
    }
  }
  return (await exports.getMsgs(q, u)).name;
};
exports.resetMsgs = async (w, x) => {
  if (w && !x) {
    const D = {
      gid: w,
    };
    const E = {
      where: D,
    };
    const F = await ai.findAll(E);
    for (const G of F) {
      await G.destroy();
    }
    return 1;
  }
  const A = {
    gid: w,
    uid: x,
  };
  const B = {
    where: A,
  };
  const C = await ai.findOne(B);
  if (!C) {
    return false;
  }
  await C.destroy();
};
const al = {
  type: DataTypes.TEXT,
  defaultValue: "{}",
};
const am = {
  type: DataTypes.TEXT,
  allowNull: false,
  defaultValue: "{}",
};
const an = {
  type: DataTypes.STRING,
  allowNull: false,
  defaultValue: "0",
};
const ao = {
  env: al,
  plugins: am,
  session: an,
};
const ap = config.DATABASE.define("config", ao);
exports.setConfig = async (v) => {
  const w = {
    session: v,
  };
  const x = {
    where: w,
  };
  const y = await ap.findOne(x);
  const z = {
    session: v,
    plugins: "{}",
  };
  const A = {
    session: v,
    plugins: "{}",
  };
  if (y) {
    return await y.update(z);
  } else {
    await ap.create(A);
    return false;
  }
};
exports.getConfig = async (m) =>
  !!(await ap.findOne({
    where: {
      session: m,
    },
  }));
const aq = {
  type: DataTypes.STRING,
};
const ar = {
  type: DataTypes.STRING,
  allowNull: false,
};
const as = {
  type: DataTypes.STRING,
  allowNull: false,
  defaultValue: "0",
};
const at = {
  name: aq,
  jid: ar,
  session: as,
};
const au = config.DATABASE.define("vcf", at);
exports.setContact = async (q, u) => {
  for (const v of q) {
    const { name: w, jid: x } = v;
    const y = await au.findOne({
      where: {
        jid: x,
        session: u,
      },
    });
    const z = {
      name: w,
      jid: x,
      session: u,
    };
    const A = {
      name: w,
      jid: x,
      session: u,
    };
    if (y) {
      await y.update(z);
    } else {
      await au.create(A);
    }
  }
  return q;
};
exports.getContact = async (w, x) => {
  const y = {
    EhMpv: function (C, D) {
      return C !== D;
    },
    CuIEK: "all",
  };
  const z = y;
  if (w && z.CuIEK !== w) {
    const C = {
      jid: w,
      session: x,
    };
    const D = {
      where: C,
    };
    return await au.findOne(D);
  }
  const A = {
    session: x,
  };
  const B = {
    where: A,
  };
  return await au.findAll(B);
};
exports.delContact = async (w, x) => {
  const y = {
    nMllR: function (F, G) {
      return F === G;
    },
    eGtgv: "all",
  };
  const z = y;
  const A = {
    session: x,
  };
  const B = {
    where: A,
  };
  if (z.eGtgv === w) {
    await au.destroy(B);
    return true;
  }
  const C = {
    jid: w,
    session: x,
  };
  const D = {
    where: C,
  };
  const E = await au.findOne(D);
  return !!E && (await E.destroy(), true);
};
