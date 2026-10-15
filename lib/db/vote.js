const config = require("../../config");
const { DataTypes } = require("sequelize");
const J = config.DATABASE.define("vote", {
  vote: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  session: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "0",
  },
});
exports.setVotes = async (j, k) => {
  const l = {
    LSMok: "Error setting votes:",
  };
  try {
    {
      const m = {
        session: k,
      };
      const n = {
        where: m,
      };
      const p = await J.findOne(n);
      j = JSON.stringify(j);
      if (p) {
        await p.update({
          vote: j,
          session: k,
        });
        return p;
      } else {
        return await J.create({
          vote: j,
          session: k,
        });
      }
    }
  } catch (r) {
    {
      console.error(l.LSMok, r);
      throw r;
    }
  }
};
exports.getVotes = async (k) => {
  const l = {
    tznKh: "(((.+)+)+)+$",
    FIedv: function (n, o) {
      return n === o;
    },
    Eucfu: "tmsWi",
    OVxmY: "TUUwC",
    ApVlI: "Error getting votes:",
  };
  const m = l;
  try {
    {
      const o = {
        session: k,
      };
      const p = {
        where: o,
      };
      const q = await J.findOne(p);
      if (q) {
        return JSON.parse(q.vote);
      } else {
        return {};
      }
    }
  } catch (r) {
    console.error(m.ApVlI, r);
    throw r;
  }
};
