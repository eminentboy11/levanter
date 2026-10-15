// auth.js — deobfuscated rewrite.
// Removed: self-defending wrapper, console patching, and fake opaque-predicate branches.

const { Op } = require("sequelize");
const { loadBaileys } = require("./baileys");
const config = require("./config");
const { getBuffer } = require("./fetch");
const { setKeys, getCreds, setCreds, KeysDB } = require("./db/session");
const settings = require("../config");
const { lang } = require(".");

// Returns the first http(s) URL found in `text`, or false.
// (Only used by the original's invalid-session path, where its result was never read.)
const extractUrl = (text = "null") => {
  const matches = text.match(
    /(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/g
  );
  return !!matches && matches[0];
};

/**
 * Builds the Baileys auth state for one session.
 * @param {string} url        where to download the saved session JSON from
 * @param {object} logger
 * @param {string} sessionId  session index ("0", "1", ...)
 * @returns {{state: object|false, saveState?: Function, isNew?: boolean}}
 */
const initAuthSys = async (url, logger, sessionId) => {
  const { BufferJSON, initAuthCreds, WAProto } = await loadBaileys();

  if (!sessionId) {
    throw new Error("[" + sessionId + "] missing session");
  }

  let creds;
  let isNew = false;

  const savedCreds = await getCreds(sessionId);
  if (!savedCreds) {
    logger.info(lang.extra.init_session.format(sessionId));
  }

  if (savedCreds || config[sessionId].env.SESSION_ID || !settings.VPS) {
    if (!savedCreds && config[sessionId].env.SESSION_ID) {
      // First run: import the session from the remote SESSION_ID
      logger.info(lang.extra.load_session.format(sessionId));

      let buffer = false;
      try {
        const res = await getBuffer(url, false);
        if (res.buffer) buffer = res.buffer;
      } catch (e) {
        logger.error("Failed to get session: " + e.message);
      }

      if (!buffer) {
        logger.error(lang.extra.invalid_session.format(sessionId, config[sessionId].env.SESSION_ID));
        return { state: false };
      }

      isNew = true;
      const parsed = JSON.parse(buffer.toString(), BufferJSON.reviver);
      if (!parsed.creds || !parsed.keys) {
        logger.error(lang.extra.invalid_session.format(sessionId, "CORRUPT DATA"));
        return { state: false };
      }

      creds = parsed.creds;
      for (const type in parsed.keys) {
        for (const keyId in parsed.keys[type]) {
          await setKeys(type, keyId, parsed.keys[type][keyId], sessionId);
        }
      }
      await setCreds(creds, sessionId);
      logger.info(lang.extra.success_session.format(sessionId));
    } else {
      // Already stored in the DB
      if (!savedCreds) return { state: false };
      creds = savedCreds;
    }
  } else {
    // No session anywhere and running on a VPS: start fresh and show a QR
    logger.info("Generating Qr...");
    creds = initAuthCreds();
  }

  return {
    state: {
      creds,
      keys: {
        get: async (type, ids) => {
          const result = {};
          const rows = await KeysDB.findAll({
            where: {
              session: sessionId,
              type: { [Op.in]: ids.map((id) => "" + type + id) },
            },
          });
          for (const row of rows) {
            const id = row.type.replace(type, "");
            try {
              let value = JSON.parse(row.value, BufferJSON.reviver);
              if (type === "app-state-sync-key" && value) {
                value = WAProto.Message.AppStateSyncKeyData.fromObject(value);
              }
              result[id] = value;
            } catch (e) {
              logger.error("Error parsing key " + type + ": " + e.message);
            }
          }
          return result;
        },

        set: async (data) => {
          const upserts = [];
          const deletions = [];
          for (const type in data) {
            for (const id in data[type]) {
              const value = data[type][id];
              const rowType = "" + type + id;
              if (value) {
                upserts.push({
                  type: rowType,
                  session: sessionId,
                  value: JSON.stringify(value, BufferJSON.replacer),
                });
              } else {
                deletions.push(rowType);
              }
            }
          }

          const ops = [];
          if (upserts.length) {
            ops.push(KeysDB.bulkCreate(upserts, { updateOnDuplicate: ["value"] }));
          }
          if (deletions.length) {
            ops.push(
              KeysDB.destroy({
                where: { session: sessionId, type: { [Op.in]: deletions } },
              })
            );
          }
          await Promise.all(ops);
        },
      },
    },
    saveState: () => setCreds(creds, sessionId),
    isNew,
  };
};

exports.initAuthSys = initAuthSys;
