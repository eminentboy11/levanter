const { DataTypes } = require("sequelize");
const config = require("../../config");
const fs = require("fs-extra");
const { join } = require("path");
const a8 = config.DATABASE.define("men", {
  enabled: {
    type: DataTypes.BOOLEAN,
  },
  text: {
    type: DataTypes.TEXT,
  },
  session: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "0",
  },
});
const a9 = {};
const getMention = async (q) => {
  if (q in a9) {
    return a9[q];
  }
  const x = {
    session: q,
  };
  const y = {
    where: x,
  };
  const z = await a8.findOne(y);
  if (z) {
    a9[q] = z.dataValues;
    return z.dataValues;
  } else {
    a9[q] = false;
    return false;
  }
};
exports.getMention = getMention;
exports.mentionMessage = async (k) => (await getMention(k))?.text;
exports.enableMention = async (p, q, v) => {
  const w = {
    nDDnr: "../../media/mention",
    GciSP: function (B, C) {
      return B == C;
    },
    xNOaT: "string",
  };
  const x = join(__dirname, w.nDDnr);
  if (fs.existsSync(x)) {
    fs.emptyDirSync(x);
  }
  delete a9[q];
  if (w.GciSP(w.xNOaT, typeof p)) {
    const B = await getMention(q);
    v = p;
    p = B?.enabled ?? true;
  }
  const y = {
    session: q,
  };
  const z = {
    where: y,
  };
  const A = await a8.findOne(z);
  if (A) {
    return await A.update({
      session: q,
      enabled: p,
      text: v || A.dataValues.text,
    });
  } else {
    return await a8.create({
      enabled: p,
      text: v || "Hi",
      session: q,
    });
  }
};
const ab = {
  type: DataTypes.STRING,
  allowNull: false,
  unique: "compositeIndex",
};
const ac = {
  type: DataTypes.STRING,
  allowNull: false,
  defaultValue: "0",
  unique: "compositeIndex",
};
const ad = {
  uid: ab,
  session: ac,
};
const ae = config.DATABASE.define("personalMessage", ad);
const getPmMessage = async (k, m) =>
  !!(await ae.findOne({
    where: {
      uid: k,
      session: m,
    },
  }));
const setPmMessage = async (q, v) => {
  const w = {
    uid: q,
    session: v,
  };
  const x = {
    where: w,
  };
  const y = {
    uid: q,
    session: v,
  };
  if (!(await ae.findOne(x))) {
    await ae.create(y);
  }
};
exports.getPmMessage = getPmMessage;
exports.setPmMessage = setPmMessage;
