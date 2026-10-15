const { DataTypes } = require("sequelize");
let ab;
const ac = {
  type: DataTypes.STRING,
  unique: "compositeIndex",
};
const ad = {
  type: DataTypes.TEXT,
};
const ae = {
  type: DataTypes.STRING,
  allowNull: false,
  defaultValue: "0",
  unique: "compositeIndex",
};
const af = {
  type: ac,
  value: ad,
  session: ae,
};
const ag = {
  type: DataTypes.STRING,
  unique: "compositeIndex",
};
const ah = {
  type: DataTypes.TEXT,
};
const ai = {
  type: DataTypes.STRING,
  allowNull: false,
  defaultValue: "0",
  unique: "compositeIndex",
};
const aj = {
  type: ag,
  value: ah,
  session: ai,
};
const ak = {
  type: DataTypes.STRING,
  unique: "compositeIndex",
};
const al = {
  type: DataTypes.TEXT,
};
const am = {
  type: DataTypes.STRING,
  allowNull: false,
  defaultValue: "0",
  unique: "compositeIndex",
};
const an = {
  type: ak,
  value: al,
  session: am,
};
const config = require("../../config");
const KeysDB = config.DATABASE.define("wakey", af);
const CredsDB = config.DATABASE.define("wacred", aj);
const GAuthDB = config.DATABASE.define("gauth", an);
const as = {
  where: {},
};
exports.getCount = async () => {
  const m = {
    count: 0,
  };
  try {
    m.count = await KeysDB.count();
  } catch (o) {}
  return m;
};
exports.setCreds = async (u, v, w) => {
  const x = {
    WZBBE: "../baileys",
    Qicpm: "wacreds",
  };
  ab ||= (await require(x.WZBBE).loadBaileys()).BufferJSON;
  const y = {
    type: x.Qicpm,
    session: v,
  };
  const z = {
    where: y,
    transaction: w,
  };
  const A = JSON.stringify(u, ab.replacer);
  const B = await CredsDB.findOne(z);
  const C = {
    value: A,
  };
  const D = {
    transaction: w,
  };
  const E = {
    type: x.Qicpm,
    session: v,
    value: A,
  };
  const F = {
    transaction: w,
  };
  if (B) {
    await B.update(C, D);
  } else {
    await CredsDB.create(E, F);
  }
};
exports.getCreds = async (m) => {
  const o = {
    uaDKF: "../baileys",
    WevBy: "wacreds",
  };
  ab ||= (await require(o.uaDKF).loadBaileys()).BufferJSON;
  const p = {
    type: o.WevBy,
    session: m,
  };
  const q = {
    where: p,
  };
  const r = await CredsDB.findOne(q);
  if (r) {
    return JSON.parse(r.dataValues.value, ab.reviver);
  }
};
exports.deleteCreds = async (k) =>
  await CredsDB.destroy({
    where: {
      session: k,
    },
  });
exports.getKeys = async (k, l, m) => {
  const o = {
    vRDzS: "../baileys",
  };
  ab ||= (await require(o.vRDzS).loadBaileys()).BufferJSON;
  const p = "" + k + l;
  const q = await KeysDB.findOne({
    where: {
      type: p,
      session: m,
    },
  });
  if (q) {
    return JSON.parse(q.dataValues.value, ab.reviver);
  } else {
    return null;
  }
};
exports.setKeys = async (v, w, x, y, z) => {
  const A = {
    KTeUV: "../baileys",
  };
  ab ||= (await require(A.KTeUV).loadBaileys()).BufferJSON;
  const B = "" + v + w;
  const C = JSON.stringify(x, ab.replacer);
  const D = await KeysDB.findOne({
    where: {
      type: B,
      session: y,
    },
    transaction: z,
  });
  const E = {
    value: C,
  };
  const F = {
    transaction: z,
  };
  const G = {
    type: B,
    session: y,
    value: C,
  };
  const H = {
    transaction: z,
  };
  if (D) {
    await D.update(E, F);
  } else {
    await KeysDB.create(G, H);
  }
};
exports.delKeys = async (k, l, m) => {
  const o = "" + k + l;
  const p = await KeysDB.findOne({
    where: {
      type: o,
      session: m,
    },
  });
  if (p) {
    await p.destroy();
  }
};
exports.deleteKeys = async (k) =>
  await KeysDB.destroy({
    where: {
      session: k,
    },
  });
exports.restoreKeys = async () => await KeysDB.findAll(as);
exports.setGAuth = async (p, q, r) => {
  const u = {
    type: p,
    session: r,
  };
  const v = {
    where: u,
  };
  const w = JSON.stringify(q);
  const x = await GAuthDB.findOne(v);
  const y = {
    value: w,
  };
  const z = {
    type: p,
    session: r,
    value: w,
  };
  if (x) {
    await x.update(y);
  } else {
    await GAuthDB.create(z);
  }
};
exports.getGAuth = async (m, o) => {
  const p = {
    type: m,
    session: o,
  };
  const q = {
    where: p,
  };
  const r = await GAuthDB.findOne(q);
  if (r) {
    return JSON.parse(r.dataValues.value);
  } else {
    return null;
  }
};
exports.deleteGAuth = async (k) =>
  await GAuthDB.destroy({
    where: {
      session: k,
    },
  });
exports.KeysDB = KeysDB;
exports.CredsDB = CredsDB;
exports.GAuthDB = GAuthDB;
