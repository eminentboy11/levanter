const { DataTypes } = require("sequelize");
const config = require("../../config");
const K = config.DATABASE.define("Plugin", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: "compositeIndex",
  },
  url: {
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
exports.setPlugin = async function (o, p, q) {
  const r = {
    name: o,
    session: q,
  };
  const u = {
    where: r,
  };
  const v = await K.findOne(u);
  const w = {
    name: o,
    url: p,
    session: q,
  };
  const x = {
    name: o,
    url: p,
    session: q,
  };
  if (v) {
    return await v.update(w);
  } else {
    return await K.create(x);
  }
};
exports.delPlugin = async function (o, p) {
  if (o) {
    {
      const t = {
        name: o,
        session: p,
      };
      const u = {
        where: t,
      };
      const v = await K.findOne(u);
      return !!v && (await v.destroy(), true);
    }
  }
  {
    const w = {
      session: p,
    };
    const x = {
      where: w,
    };
    const y = await K.findAll(x);
    for (const z of y) {
      await z.destroy();
    }
  }
};
exports.getPlugin = async function (o, p) {
  if (p) {
    const w = {
      name: p,
      session: o,
    };
    const x = {
      where: w,
    };
    const y = await K.findOne(x);
    return !!y && y.dataValues;
  }
  const q = {
    session: o,
  };
  const r = {
    where: q,
  };
  const u = await K.findAll(r);
  let v = [];
  u.map((z) => {
    const A = {
      name: z.dataValues.name,
      url: z.dataValues.url,
    };
    v.push(A);
  });
  return v;
};
