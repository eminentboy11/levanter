const {
  default: baileys,
  DisconnectReason,
  delay,
  jidNormalizedUser,
  fetchLatestBaileysVersion,
} = require("@adiwajshing/baileys");
const pino = require("pino");
const { initAuthSys } = require("./auth");
const {
  deleteCreds,
  deleteKeys,
  waWebVersion,
  PREFIX,
  jidToNum,
  numToJid,
  PLUGINS,
} = require("./index");
const { handleMsg } = require("./handle");
const fs = require("fs");
const path = require("path");
const { getPlugin, delPlugin, getDb, getPdm } = require("./db");
const got = require("got");
const { join } = require("path");
const { participantUpdate } = require("./participantUpdate");
const config = require("../config");
const { commands } = require("./events");
const store = require("./store");
let sudoJid = (config.SUDO.split(",")[0] && numToJid(config.SUDO.split(",")[0])) || "";
const { iChecker } = require("./test/test");
const { prepareMessage } = require("./sendMessage");
const { restartInstance } = require("./pm2");
exports.connect = async () => {
  const helpers = {
    pMVHh: function (left, right) {
      return left == right;
    },
    WRtqI: "connected",
    VViQG: "started",
    fbiNi: "demote",
    aOGKH: "demoted",
    oBgsB: "promoted",
    wLuPb: "messages.upsert",
    Eosfm: "creds.update",
    cSaVw: "../plugins",
    lqRWj: "../plugins/",
    WPeSh: ".js",
    IDHwh: function (callback, arg) {
      return callback(arg);
    },
    MWQza: function (callback, first, second) {
      return callback(first, second);
    },
    mNQSR: function (left, right) {
      return left - right;
    },
    CynOP: "\nExternal Plugins Installed",
  };
  const msgRetryCounterMap = {};
  const { state: authState, saveState: saveCreds } = await initAuthSys();
  await authState.keys.restore();
  const { version: waVersion, isLatest: isLatestVersion } = await fetchLatestBaileysVersion();
  console.log("using WA v" + waVersion.join(".") + ", isLatest: " + isLatestVersion);
  fs.readdirSync(path.join(__dirname, helpers.cSaVw)).forEach((pluginFile) => {
    if (helpers.pMVHh(path.extname(pluginFile).toLowerCase(), ".js")) {
      try {
        require("../plugins/" + pluginFile);
      } catch (error) {
        console.log(error);
      }
    }
  });
  if (PLUGINS.i == 0) {
    PLUGINS.i = commands.length - 1;
  }
  try {
    const externalPlugins = (await getPlugin()) || [];
    if (externalPlugins.length) {
      console.log("Installing External plugins\n");
      for await (const { url: pluginUrl, name: pluginName } of externalPlugins) {
        console.log(pluginName);
        if (!fs.existsSync(helpers.lqRWj + pluginName + helpers.WPeSh)) {
          try {
            const result = await got(pluginUrl);
            if (result.statusCode == 200) {
              try {
                fs.writeFileSync(join(__dirname, "../plugins/" + pluginName + ".js"), result.body);
                helpers.IDHwh(
                  require,
                  helpers.MWQza(join, __dirname, "../plugins/" + pluginName + ".js"),
                );
              } catch (error) {
                console.log("Deleting " + pluginName + ", due to error");
                await delPlugin(pluginName);
              }
            }
          } catch (error) {
            console.log("Deleting " + pluginName + ", due to error");
            await delPlugin(pluginName);
          }
        }
      }
      if (PLUGINS.e == 0) {
        PLUGINS.e = helpers.mNQSR(commands.length - PLUGINS.i, 1);
      }
      console.log(helpers.CynOP);
    }
  } catch (error) {
    console.log(error);
  }
  const startConnection = () => {
    const payload = {
      level: config.BAILEYS_LOG_LVL,
    };
    const sock = baileys({
      version: waVersion,
      printQRInTerminal: true,
      logger: pino(payload),
      auth: authState,
      msgRetryCounterMap,
      getMessage: async ({ id: messageId, remoteJid }) => {
        const storedMessage = chats[remoteJid]?.find(({ key: msgKey }) => msgKey.id == messageId);
        return storedMessage?.message;
      },
    });
    global.store = store.bind(sock);
    sock.ev.on(helpers.wLuPb, async ({ type: updateType, messages }) => {
      const incomingMessage = messages[1] || messages[0];
      if (updateType == "notify" && incomingMessage) {
        return handleMsg(incomingMessage, sock);
      }
    });
    sock.ev.on("connection.update", (update) => {
      const { connection, lastDisconnect } = update;
      if (connection == "open") {
        PLUGINS.count = PLUGINS.i + PLUGINS.e;
        console.log(helpers.WRtqI);
        const payload = {
          text: helpers.VViQG,
        };
        sock.sendMessage(sock.user.id, payload);
        sock.user.jid = jidNormalizedUser(sock.user.id);
      }
      const pMVHh = helpers.pMVHh(lastDisconnect?.error?.output.statusCode, 403);
      const deviceRemoved =
        lastDisconnect?.error?.data?.content?.find(
          (attrs) => attrs.attrs?.type === "device_removed",
        ) !== undefined;
      if (connection === "close") {
        if (
          lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut &&
          !deviceRemoved &&
          !pMVHh
        ) {
          startConnection();
        } else {
          console.log("Connection closed. You are logged out.");
          deleteCreds();
          deleteKeys();
          delay(3000).then(() => restartInstance());
        }
      }
    });
    sock.ev.on(helpers.Eosfm, saveCreds);
    sock.ev.on("group-participants.update", async (participantsUpdate) => {
      participantUpdate(participantsUpdate, sock);
    });
    sock.ws.on("CB:notification,type:w:gp2", async (notification) => {
      const { content, attrs } = notification;
      const from = attrs.from;
      const action = content[0]?.tag;
      if (action == "demote" || action == "promote") {
        const result = await getPdm(from);
        if (!result) {
          return;
        }
        const { announce, participants } = await sock.groupMetadata(from);
        const [selfParticipant] = participants.filter(
          (participant) => participant.id == sock.user.jid,
        );
        if (announce && !selfParticipant.admin) {
          return;
        }
        const actorJid = attrs?.participant;
        const targetJid = content[0]?.content[0]?.attrs?.jid;
        await prepareMessage(
          from,
          {
            text:
              "_@" +
              jidToNum(actorJid) +
              " " +
              (action == helpers.fbiNi ? helpers.aOGKH : helpers.oBgsB) +
              " @" +
              jidToNum(targetJid) +
              "_",
            mentions: [actorJid, targetJid],
          },
          {},
          sock,
        );
      }
    });
    return sock;
  };
  startConnection();
};
