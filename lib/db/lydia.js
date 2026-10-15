const config = require("../../config");
const { DataTypes } = require("sequelize");
const L = config.DATABASE.define("lydia", {
  chat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  context: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  session: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "0",
  },
});
const M = config.DATABASE.define("truecaller", {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  num: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
const N = new Map();
exports.setLydia = async (q, u, v, w) => {
  const z = v || q;
  const A = q + "-" + z + "-" + w;
  N.delete(A);
  const B = {
    chat: q,
    session: w,
  };
  const C = {
    where: B,
  };
  let D = await L.findOne(C);
  const E = {
    chat: q,
    context: "{}",
    session: w,
  };
  D ||= await L.create(E);
  const O = JSON.parse(D.context);
  if (false === u && (undefined === O[z] || false === O[z])) {
    throw new Error("lydia not active on " + z + "\n");
  }
  if (true === u && true === O[z]) {
    throw new Error("lydia already active on " + z + "\n");
  }
  O[z] = u;
  await D.update({
    context: JSON.stringify(O),
    session: w,
  });
};
exports.getLydia = async (p, q, u) => {
  const x = u || p;
  const y = p + "-" + x + "-" + q;
  if (N.has(y)) {
    return N.get(y);
  }
  const z = {
    chat: p,
    session: q,
  };
  const A = {
    where: z,
  };
  const B = await L.findOne(A);
  if (!B) {
    N.set(y, false);
    return false;
  }
  const C = JSON.parse(B.context)[x] ?? false;
  N.set(y, C);
  return C;
};
exports.setTruecaller = async (k, l) => {
  const m = await M.findOne();
  const p = {
    token: k,
    num: l,
  };
  const q = {
    token: k,
    num: l,
  };
  if (m) {
    m.update(p);
  } else {
    await M.create(q);
  }
};
exports.getTruecaller = async (i) => {
  const j = await M.findOne();
  if (i) {
    return j && j.token;
  } else {
    return j && "number : " + j.num + "\ntoken : " + j.token;
  }
};
exports.delTruecaller = async () => {
  const i = await M.findOne();
  if (i) {
    await i.destroy();
    return true;
  } else {
    return i;
  }
};
