const { DataTypes } = require("sequelize");
const config = require("../../config");
const StoreDB = config.DATABASE.define("store_data", {
  key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: "compositeIndex",
  },
  value: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  session: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "0",
    unique: "compositeIndex",
  },
});
const N = {};
function O(j) {
  try {
    return JSON.parse(j);
  } catch {
    {
      return j;
    }
  }
}
exports.setData = async function (o, p, q = "0") {
  const u = {
    key: o,
    session: q,
  };
  const v = {
    where: u,
  };
  const w = JSON.stringify(p);
  const x = await StoreDB.findOne(v);
  const y = {
    value: w,
  };
  const z = {
    key: o,
    value: w,
    session: q,
  };
  if (x) {
    await x.update(y);
  } else {
    await StoreDB.create(z);
  }
  N[q] ||= {};
  N[q][o] = p;
};
exports.getData = async function (o, p = "0") {
  if (o) {
    {
      if (N[p] && undefined !== N[p][o]) {
        return N[p][o];
      }
      const z = {
        key: o,
        session: p,
      };
      const A = {
        where: z,
      };
      const B = await StoreDB.findOne(A);
      if (B) {
        const C = O(B.value);
        N[p] ||= {};
        N[p][o] = C;
        return C;
      }
      return false;
    }
  }
  if (N[p]) {
    return N[p];
  }
  const u = {
    session: p,
  };
  const v = {
    where: u,
  };
  const w = await StoreDB.findAll(v);
  const x = {};
  N[p] ||= {};
  w.forEach((D) => {
    const E = O(D.value);
    x[D.key] = E;
    N[p][D.key] = E;
  });
  return x;
};
exports.delData = async function (l, m = "0") {
  const o = {
    key: l,
    session: m,
  };
  const p = {
    where: o,
  };
  const q = await StoreDB.findOne(p);
  return !!q && (await q.destroy(), N[m] && delete N[m][l], true);
};
exports.StoreDB = StoreDB;
