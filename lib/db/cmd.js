const config = require("../../config");
const { DataTypes } = require("sequelize");
const V = config.DATABASE.define("cmdd", {
  cmd: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  session: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "0",
  },
});
exports.getCmdState = async (h, i) =>
  !(await V.findOne({
    where: {
      cmd: h,
      session: i,
    },
  }));
exports.setCmdState = async (m, n, o) => {
  const p = {
    wroSD: function (z, A) {
      return z != A;
    },
    QOpzb: "off",
    wIVLg: function (z, A) {
      return z != A;
    },
  };
  const q = p;
  const r = {
    cmd: m,
    session: o,
  };
  const u = {
    where: r,
  };
  const v = await V.findOne(u);
  const w = {
    cmd: m,
    session: o,
  };
  if (v || q.QOpzb != n) {
    if (q.QOpzb != n && v) {
      v.destroy();
    }
  } else {
    await V.create(w);
  }
};
