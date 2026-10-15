const { DataTypes } = require("sequelize");
const config = require("../../config");
const a1 = config.DATABASE.define("groupstatus", {
  enabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  filter: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
const a2 = (k) =>
  (k || "")
    .split(",")
    .map((m) => m.trim())
    .filter(Boolean);
const setAntiGstatus = async ({ enabled: m, filter: o }) => {
  let u = await a1.findOne();
  if (u) {
    if (undefined !== m) {
      u.enabled = m;
    }
    if (undefined !== o) {
      u.filter = o;
    }
    await u.save();
  } else {
    u = await a1.create({
      enabled: undefined === m || m,
      filter: o || "",
    });
  }
  return u;
};
const getAntiGstatus = async () => {
  const o = {
    enabled: false,
    filter: "",
  };
  const p = (await a1.findOne()) || o;
  const q = p.dataValues || p;
  return {
    ...q,
    jids: a2(q.filter),
  };
};
const addAntiGstatusFilter = async (k) => {
  const m = {
    wZBHG: function (v, w) {
      return v(w);
    },
  };
  const o = a2(k);
  const p = await getAntiGstatus();
  const q = a2(p.filter);
  const u = Array.from(new Set([...q, ...o]));
  return await m.wZBHG(setAntiGstatus, {
    filter: u.join(","),
  });
};
const removeAntiGstatusFilter = async (k) => {
  const m = {
    LLQDe: function (u, v) {
      return u(v);
    },
  };
  const o = new Set(a2(k));
  const p = await getAntiGstatus();
  const q = a2(p.filter).filter((u) => !o.has(u));
  return await m.LLQDe(setAntiGstatus, {
    filter: q.join(","),
  });
};
exports.setAntiGstatus = setAntiGstatus;
exports.getAntiGstatus = getAntiGstatus;
exports.addAntiGstatusFilter = addAntiGstatusFilter;
exports.removeAntiGstatusFilter = removeAntiGstatusFilter;
