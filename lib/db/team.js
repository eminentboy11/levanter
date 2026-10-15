const config = require("../../config");
const { DataTypes } = require("sequelize");
const wortColumn = {
  type: DataTypes.STRING,
  allowNull: false,
};
const wortAttributes = {
  wort: wortColumn,
};
const WortModel = config.DATABASE.define("Wort", wortAttributes);
exports.setWort = async function (wort) {
  const filter = {
    wort,
  };
  const query = {
    where: filter,
  };
  const rows = await WortModel.findAll(query);
  if (rows.length) {
    return;
  }
  const createValues = {
    wort,
  };
  return await WortModel.create(createValues);
};
exports.delWort = async function (wort) {
  const filter = {
    wort,
  };
  const query = {
    where: filter,
  };
  const rows = await WortModel.findAll(query);
  if (!rows.length) {
    return;
  }
  return await rows[0].destroy();
};
exports.getWorts = async function () {
  const rows = await WortModel.findAll({
    where: {},
  });
  const wortList = rows.map((wort) => wort.wort);
  return wortList;
};
const afkUidColumn = {
  type: DataTypes.STRING,
  allowNull: false,
};
const afkReasonColumn = {
  type: DataTypes.TEXT,
  allowNull: false,
};
const afkAttributes = {
  uid: afkUidColumn,
  reason: afkReasonColumn,
};
const AfkModel = config.DATABASE.define("afk", afkAttributes);
exports.setAfk = async function (uid, reason) {
  const filter = {
    uid,
  };
  const query = {
    where: filter,
  };
  const rows = await AfkModel.findAll(query);
  if (rows.length) {
    const updateValues = {
      uid,
      reason,
    };
    return rows[0].update(updateValues);
  }
  const createValues = {
    uid,
    reason,
  };
  return await AfkModel.create(createValues);
};
exports.getAfk = async function () {
  const rows = await AfkModel.findAll({
    where: {},
  });
  return rows;
};
exports.delAfk = async function (uid) {
  const filter = {
    uid,
  };
  const query = {
    where: filter,
  };
  const rows = await AfkModel.findAll(query);
  if (!rows.length) {
    return;
  }
  return await rows[0].destroy();
};
const zahlenGidColumn = {
  type: DataTypes.STRING,
  allowNull: false,
};
const zahlenUidColumn = {
  type: DataTypes.STRING,
  allowNull: false,
};
const zahlenWortColumn = {
  type: DataTypes.STRING,
  allowNull: false,
};
const zahlenCountColumn = {
  type: DataTypes.INTEGER,
  allowNull: false,
};
const wortCountAttributes = {
  gid: zahlenGidColumn,
  uid: zahlenUidColumn,
  wort: zahlenWortColumn,
  count: zahlenCountColumn,
};
const ZahlenModel = config.DATABASE.define("zahlen", wortCountAttributes);
exports.setWortCount = async function (gid, uid, wort) {
  const filter = {
    gid,
    uid,
    wort,
  };
  const query = {
    where: filter,
  };
  const rows = await ZahlenModel.findAll(query);
  if (rows.length) {
    return await rows[0].update({
      gid,
      uid,
      wort,
      count: rows[0].count + 1,
    });
  }
  const createValues = {
    gid,
    uid,
    wort,
    count: 1,
  };
  return await ZahlenModel.create(createValues);
};
exports.getWortCount = async function (wort, gid, uid) {
  if (!wort) {
    const worts = await exports.getWorts();
    const countsByWort = {};
    for (const wortName of worts) {
      const entries = await exports.getWortCount(wortName, gid, uid);
      for (const entry of entries) {
        const entryWort = entry.wort;
        if (!countsByWort[entryWort]) {
          countsByWort[entryWort] = {};
        }
        if (!countsByWort[entryWort][entry.gid]) {
          countsByWort[entryWort][entry.gid] = {};
        }
        countsByWort[entryWort][entry.gid][entry.uid] = entry.count;
      }
    }
    return countsByWort;
  }
  const filter = {
    wort,
  };
  const whereFilter = filter;
  if (gid) {
    whereFilter.gid = gid;
  }
  if (uid) {
    whereFilter.uid = uid;
  }
  const query = {
    where: whereFilter,
  };
  const rows = await ZahlenModel.findAll(query);
  return rows;
};
exports.delWortCount = async function (gid, uid, wort) {
  const filter = {};
  if (gid) {
    filter.gid = gid;
  }
  if (uid) {
    filter.uid = uid;
  }
  if (wort) {
    filter.wort = wort;
  }
  const query = {
    where: filter,
  };
  const rows = await ZahlenModel.findAll(query);
  if (!rows.length) {
    return;
  }
  for (const row of rows) {
    await row.destroy();
  }
};
