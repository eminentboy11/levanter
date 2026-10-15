const { DataTypes } = require("sequelize");
const config = require("../../config");
const J = config.DATABASE.define("alive", {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "false",
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ext: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  session: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "0",
  },
});
exports.getAlive = async function (k) {
  const l = {
    session: k,
  };
  const m = {
    where: l,
  };
  const n = await J.findOne(m);
  return !!n && n.dataValues;
};
exports.setAlive = async function (
  p = "false",
  q = "```Hey I'm Here``` 🥰\nuptime : #uptime\nYou can change this by .alive your message",
  r = "text",
  v = "null",
  w,
) {
  try {
    {
      const z = {
        session: w,
      };
      const A = {
        where: z,
      };
      const B = await J.findOne(A);
      const C = {
        url: p,
        message: q,
        type: r,
        ext: v,
        session: w,
      };
      const K = {
        url: p,
        message: q,
        type: r,
        ext: v,
        session: w,
      };
      if (B) {
        return await B.update(C);
      } else {
        return await J.create(K);
      }
    }
  } catch (M) {}
};
