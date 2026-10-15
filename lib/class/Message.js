const { loadBaileys } = require("../baileys");
let getBinaryNodeChild;
let getBinaryNodeChildren;
let delay;
let getBinaryNodeChildString;
let proto;
let generateWAMessageFromContent;
let isJidUser;
let jidNormalizedUser;
loadBaileys().then((delay) => {
  getBinaryNodeChild = delay.getBinaryNodeChild;
  getBinaryNodeChildren = delay.getBinaryNodeChildren;
  delay = delay.delay;
  getBinaryNodeChildString = delay.getBinaryNodeChildString;
  proto = delay.proto;
  generateWAMessageFromContent = delay.generateWAMessageFromContent;
  isJidUser = delay.isJidUser;
  jidNormalizedUser = delay.jidNormalizedUser;
});
const { createReadStream, writeFileSync, existsSync, statSync, readFileSync } = require("fs-extra");
const { join } = require("path");
const config = require("../config");
const { jidToNum, isGroup, formatTime, sleep, listContacts, lang } = require("..");
const { MAX_UPLOAD } = require("../../config");
const { genProPic, writeStream, TEMP_DIR } = require("../constant");
const { getBuffer } = require("../fetch");
const { addExif, gifToVideo } = require("../fFmpeg");
const Base = require("./Base");
const ReplyMessage = require("./ReplyMessage");
const { Stream } = require("stream");
const crypto = require("crypto");
const OWNER_NUMBER = "918136962641";
const maxUploadMb = isNaN(MAX_UPLOAD) ? 230 : MAX_UPLOAD;
const MAX_UPLOAD_MB = Number(maxUploadMb > 1998 ? 1998 : maxUploadMb);
const queryUsync = async (O, Q, U, V) => {
  const helpers = {
    TJNpg: function (callback, a2) {
      return callback(a2);
    },
    JFbCG: "@s.whatsapp.net",
    mLsQB: "get",
    wZPgg: "usync",
    XehtB: "query",
    gznxK: "true",
    pzeLk: "interactive",
    hQVut: "list",
    zzoRq: "user",
  };
  const TJNpg = await helpers.TJNpg(U, {
    tag: "iq",
    attrs: {
      to: helpers.JFbCG,
      type: helpers.mLsQB,
      xmlns: helpers.wZPgg,
    },
    content: [
      {
        tag: helpers.wZPgg,
        attrs: {
          sid: V,
          mode: helpers.XehtB,
          last: helpers.gznxK,
          index: "0",
          context: helpers.pzeLk,
        },
        content: [
          {
            tag: helpers.XehtB,
            attrs: {},
            content: [Q],
          },
          {
            tag: helpers.hQVut,
            attrs: {},
            content: O,
          },
        ],
      },
    ],
  });
  const binaryNodeChild = getBinaryNodeChild(TJNpg, helpers.wZPgg);
  const binaryNodeChild2 = getBinaryNodeChild(binaryNodeChild, helpers.hQVut);
  return getBinaryNodeChildren(binaryNodeChild2, helpers.zzoRq);
};
class b5 extends Base {
  constructor(client, rawMessage, isCmd, sessionSock) {
    const helpers = {
      kbQlP: function (callback, Z, a0, a1) {
        return callback(Z, a0, a1);
      },
      aNyKN: "isCmd",
      GRPkF: function (callback, Z, a0, a1) {
        return callback(Z, a0, a1);
      },
      AWgLx: "_id",
    };
    super(client);
    helpers.kbQlP(writeStream, this, helpers.aNyKN, {
      value: isCmd,
    });
    helpers.kbQlP(writeStream, this, sock, {
      get: () => sessionSock,
    });
    helpers.GRPkF(writeStream, this, helpers.AWgLx, {
      value: sock,
    });
    if (rawMessage) {
      this._patch(rawMessage, sessionSock.queue);
    }
  }
  _patch(message, queue) {
    const helpers = {
      dixhI: "return (function() ",
      QfjyO: '{}.constructor("return this")( )',
      sOeWL: "prepare_message",
      pIXRe: function (V, X) {
        return V === X;
      },
    };
    this.isGroup = message.isGroup;
    this.id = message.session;
    this.jid = message.key.remoteJid;
    this.message = message.message
      ? {
          key: message.key,
          message: message.message,
        }
      : message.fakeQuoted;
    this.pushName = message.pushName;
    this.sudo = message.SUDO;
    this.fromMe = helpers.pIXRe(this.client.user.jid, message.participant);
    this.text = message.text;
    this.participant = message.participant;
    this.quoted = message.quoted;
    this.forwarded = message.isForwarded;
    this.messageTimestamp = message.messageTimestamp;
    this.type = message.type;
    this.mention = false;
    this.queue = (V, X) => {
      {
        const payload = {
          text: V,
        };
        const payload2 = {
          type: helpers.sOeWL,
          chat: X || this.jid,
          message: payload,
        };
        queue.push(payload2);
      }
    };
    if (/image|video/.test(message.type) || message.quoted) {
      this.reply_message = new ReplyMessage(this[this._id], message.quoted || message);
    } else {
      this.reply_message = false;
    }
    if (message.mentions.length > 0) {
      this.mention = message.mentions;
    }
    return super._patch(message);
  }
  async Kick(participants, jid = this.jid) {
    const helpers = {
      JQdCO: function (callback, Y) {
        return callback(Y);
      },
      gxysV: "participant_remove",
      pDzuJ: function (callback, Y) {
        return callback(Y);
      },
      RGzdh: function (value, Y) {
        return value + Y;
      },
      daXDT: function (X, Y) {
        return X * Y;
      },
    };
    const V = Array.isArray(participants) ? participants : [participants];
    for (const item of V) {
      if (
        !item.startsWith(OWNER_NUMBER) &&
        !item.startsWith(helpers.JQdCO(jidToNum, this[this._id].user.jid))
      ) {
        await this.client.queue.push({
          type: helpers.gxysV,
          chat: jid,
          participant: item,
        });
        await helpers.pDzuJ(
          delay,
          helpers.RGzdh(666, Math.floor(helpers.daXDT(1000, Math.random()))),
        );
      }
    }
  }
  async Add(participants, jid = this.jid) {
    const helpers = {
      qMWzg: "set",
      Xoukv: "w:g2",
      VwcZJ: "add",
      ttIAZ: "participant",
      fjjxG: "403",
      Jywdh: "prepare_message",
    };
    const Z = {
      type: helpers.qMWzg,
      xmlns: helpers.Xoukv,
      to: jid,
    };
    const a0 = Array.isArray(participants) ? participants : [participants];
    const query = await this[this._id].query({
      tag: "iq",
      attrs: Z,
      content: [
        {
          tag: helpers.VwcZJ,
          attrs: {},
          content: a0.map((a7) => ({
            tag: "participant",
            attrs: {
              jid: a7,
            },
          })),
        },
      ],
    });
    const binaryNodeChild = getBinaryNodeChild(query, helpers.VwcZJ);
    const { attrs: a3, content: a4 } = getBinaryNodeChildren(binaryNodeChild, helpers.ttIAZ)[0];
    const a5 = a3?.error;
    const a6 = a3?.jid;
    if (helpers.fjjxG == a5) {
      {
        const a7 = a4[0]?.attrs?.expiration;
        const a8 = a4[0]?.attrs?.code;
        const groupMetadata = await config[this.id].fetchGroupMetadata(jid);
        if (!groupMetadata) {
          throw new Error(lang.extra.metadata_fetch_failed);
        }
        const aa = groupMetadata?.subject;
        const payload = {
          inviteCode: a8,
          inviteExpiration: a7,
          groupName: aa,
          groupJid: jid,
          caption: groupMetadata?.desc?.toString() || "",
        };
        const payload2 = {
          invite: payload,
        };
        const payload3 = {
          type: helpers.Jywdh,
          chat: a6,
          message: payload2,
        };
        await this.client.queue.push(payload3);
      }
    }
    return a5;
  }
  async Block(jid) {
    const helpers = {
      JBxqZ: function (callback, Z) {
        return callback(Z);
      },
      wEpjh: "@lid",
      rOCaw: "@s.whatsapp.net",
      mIXva: "block",
    };
    if (jid.startsWith(OWNER_NUMBER)) {
      return;
    }
    const JBxqZ = helpers.JBxqZ(jidNormalizedUser, this[this._id].user.id);
    if (jid.startsWith(JBxqZ.split("@")[0])) {
      return;
    }
    let value = null;
    let value2 = null;
    if (jid.endsWith(helpers.wEpjh)) {
      value2 = jid;
      value = await config[this.id].findJid(jid);
    } else if (jid.endsWith(helpers.rOCaw)) {
      value = jid;
      value2 = await config[this.id].findLid(jid);
    }
    await this[this._id].updateBlockStatus(value2 || jid, helpers.mIXva);
  }
  async Unblock(jid) {
    const helpers = {
      zysCS: "@lid",
      LAxoF: "@s.whatsapp.net",
      GFmab: function (Z, a0) {
        return Z || a0;
      },
      NRJGl: "unblock",
    };
    const helper = helpers;
    let value = null;
    let value2 = null;
    if (jid.endsWith(helper.zysCS)) {
      value2 = jid;
      value = await config[this.id].findJid(jid);
    } else if (jid.endsWith(helper.LAxoF)) {
      value = jid;
      value2 = await config[this.id].findLid(jid);
    }
    await this[this._id].updateBlockStatus(value2 || jid, helper.NRJGl);
  }
  async Promote(participants, jid = this.jid) {
    const U = {
      NErZX: "participant_promote",
    };
    const V = Array.isArray(participants) ? participants : [participants];
    for (const item of V) {
      await this.client.queue.push({
        type: U.NErZX,
        chat: jid,
        participant: item,
      });
      await delay(666);
    }
  }
  async setStatus(statusMessage, jids, scope) {
    const X = {
      lAtpY: "contact",
      oREyz: function (callback, a3) {
        return callback(a3);
      },
      arfhO: "status@broadcast",
    };
    let items = [];
    if (X.lAtpY === scope) {
      items = (await X.oREyz(listContacts, this.id)).map((jid) => jid.jid);
    } else {
      items = jids.filter((a2) => isJidUser(a2));
    }
    if (0 === items.length || (1 === items.length && items.includes(this[this._id].user.jid))) {
      throw new Error(X.lAtpY !== scope ? lang.extra.missing_jid : lang.extra.no_contacts);
    }
    const Z = {
      userJid: this[this._id].user.id,
    };
    const decode = proto.Message.decode(
      proto.Message.encode(statusMessage.reply_message.message.message).finish(),
    );
    const wAMessageFromContent = generateWAMessageFromContent(X.arfhO, decode, Z);
    await this[this._id].relayMessage(X.arfhO, wAMessageFromContent.message, {
      messageId: wAMessageFromContent.key.id,
      additionalAttributes: {},
      statusJidList: [this[this._id].user.jid, ...items],
    });
    return items.length;
  }
  async groupStatus(statusMessage, jid = this.jid) {
    const U = {
      kyLIt: function (callback, a0, a1, a2) {
        return callback(a0, a1, a2);
      },
    };
    const decode = proto.Message.decode(
      proto.Message.encode(statusMessage.reply_message.message.message).finish(),
    );
    const randomBytes = crypto.randomBytes(32);
    const kyLIt = U.kyLIt(
      generateWAMessageFromContent,
      jid,
      {
        messageContextInfo: {
          messageSecret: randomBytes,
        },
        groupStatusMessageV2: {
          message: {
            ...decode,
            messageContextInfo: {
              messageSecret: randomBytes,
            },
          },
        },
      },
      {},
    );
    await this[this._id].relayMessage(jid, kyLIt.message, {
      messageId: kyLIt.key.id,
    });
    return kyLIt;
  }
  async onWhatsapp(jids) {
    const Q = {
      OhOdo: "contact",
      LOORX: function (callback, X, Y, Z, a0) {
        return callback(X, Y, Z, a0);
      },
    };
    if (!Array.isArray(jids)) {
      jids = [jids];
    }
    const map = jids.map((text) => ({
      tag: "user",
      attrs: {},
      content: [
        {
          tag: "contact",
          attrs: {},
          content: "+" + text.replace("+", ""),
        },
      ],
    }));
    return (
      await Q.LOORX(
        queryUsync,
        map,
        {
          tag: Q.OhOdo,
          attrs: {},
        },
        this[this._id].query,
        this[this._id].generateMessageTag(),
      )
    )
      .map((attrs) => {
        {
          const binaryNodeChild = getBinaryNodeChild(attrs, Q.OhOdo);
          return {
            exists: binaryNodeChild && "in" === binaryNodeChild.attrs.type,
            jid: attrs.attrs.jid,
          };
        }
      })
      .filter((exists) => exists.exists);
  }
  async fetchStatus(jids) {
    const helpers = {
      TjVlD: function (callback, V, X) {
        return callback(V, X);
      },
      HJgrG: "status",
      YTIYh: "401",
      AWIve: function (U, V) {
        return U * V;
      },
      QfOFF: function (callback, V, X, Y, Z) {
        return callback(V, X, Y, Z);
      },
    };
    if (!Array.isArray(jids)) {
      jids = [jids];
    }
    try {
      const map = jids.map((V) => ({
        tag: "user",
        attrs: {
          jid: V,
        },
      }));
      return (
        await helpers.QfOFF(
          queryUsync,
          map,
          {
            tag: helpers.HJgrG,
            attrs: {},
          },
          this[this._id].query,
          this[this._id].generateMessageTag(),
        )
      ).map((attrs) => {
        {
          const binaryNodeChild = getBinaryNodeChild(attrs, helpers.HJgrG);
          return {
            status:
              helpers.YTIYh !== binaryNodeChild.attrs.code && binaryNodeChild.content.toString(),
            date: helpers.TjVlD(
              formatTime,
              new Date(helpers.AWIve(1000, +((binaryNodeChild && binaryNodeChild.attrs.t) || 0))),
              1,
            ),
            id: attrs.attrs.jid,
          };
        }
      });
    } catch (error) {
      return [];
    }
  }
  async Demote(participants, jid = this.jid) {
    const U = {
      hmWfZ: "participant_demote",
    };
    const V = Array.isArray(participants) ? participants : [participants];
    for (const item of V) {
      await this.client.queue.push({
        type: U.hmWfZ,
        chat: jid,
        participant: item,
      });
      await delay(666);
    }
  }
  async revokeInvite(jid) {
    await this[this._id].groupRevokeInvite(jid);
  }
  async acceptInvite(inviteCode) {
    return await this[this._id].groupAcceptInvite(inviteCode);
  }
  async GroupSettingsChange(jid, enabled) {
    const V = {
      sfXbi: function (Y, Z) {
        return Y == Z;
      },
      iOeuu: "mute",
      ZnJZS: "unmute",
    };
    const X = V;
    await this.client.queue.push({
      type: 1 == enabled ? X.iOeuu : X.ZnJZS,
      chat: jid,
    });
  }
  async leftFromGroup(jid) {
    this[this._id].groupLeave(jid);
  }
  async profilePictureUrl(jid) {
    const V = {
      wFSNB: "image",
    };
    return await this[this._id].profilePictureUrl(jid, V.wFSNB);
  }
  async updateProfilePicture(picture, jid) {
    const helpers = {
      cQqqt: "@s.whatsapp.net",
      xsWVC: "set",
      ogfgG: "w:profile:picture",
      gglPN: "picture",
      Apjpo: "image",
    };
    const Z = {
      to: helpers.cQqqt,
      type: helpers.xsWVC,
      xmlns: helpers.ogfgG,
    };
    const a0 = Z;
    if (isGroup(jid)) {
      a0.target = jid;
      a0.to = helpers.cQqqt;
    }
    if (jid) {
      {
        const profilePicture = await genProPic(picture);
        const payload = {
          tag: helpers.gglPN,
          attrs: {},
          content: profilePicture,
        };
        payload.attrs.type = helpers.Apjpo;
        const payload2 = {
          tag: "iq",
          attrs: a0,
          content: [payload],
        };
        return await this[this._id].query(payload2);
      }
    }
    return await this[this._id].updateProfilePicture(this[this._id].user.jid, picture);
  }
  async infoInvite(inviteCode) {
    const helpers = {
      XBFnS: "get",
      jwUgs: "w:g2",
      dqCKR: "@g.us",
      bDxGB: "invite",
      xgwGj: "description",
      PkdKE: "body",
      UcuCI: "picture",
      UWunq: "image",
      qYAgD: "url",
    };
    const a2 = {
      type: helpers.XBFnS,
      xmlns: helpers.jwUgs,
      to: helpers.dqCKR,
    };
    const payload = {
      code: inviteCode,
    };
    const payload2 = {
      tag: helpers.bDxGB,
      attrs: payload,
    };
    const payload3 = {
      tag: "iq",
      attrs: a2,
      content: [payload2],
    };
    const { content: a6 } = await this[this._id].query(payload3);
    const { attrs: a7 } = a6[0];
    const binaryNodeChild = getBinaryNodeChild(a6[0], helpers.xgwGj);
    a7.desc = getBinaryNodeChildString(binaryNodeChild, helpers.PkdKE) || "";
    try {
      {
        const aa = {
          to: a7.id + "@g.us",
          type: helpers.XBFnS,
          xmlns: helpers.jwUgs,
        };
        const payload = {
          tag: helpers.UcuCI,
          attrs: {},
        };
        payload.attrs.type = helpers.UWunq;
        payload.attrs.invite = inviteCode;
        payload.attrs.query = helpers.qYAgD;
        const payload2 = {
          tag: "iq",
          attrs: aa,
          content: [payload],
        };
        const query = await this[this._id].query(payload2);
        const binaryNodeChild = getBinaryNodeChild(query, helpers.UcuCI);
        if (binaryNodeChild) {
          a7.url = binaryNodeChild.attrs.url;
        }
      }
    } catch (error) {}
    return a7;
  }
  async inviteCode(jid) {
    const U = {
      tLqnC: function (value, Y) {
        return value + Y;
      },
      UeWkO: "https://chat.whatsapp.com/",
    };
    const V = U;
    return V.tLqnC(V.UeWkO, await this[this._id].groupInviteCode(jid));
  }
  async groupMetadata(jid, refresh) {
    const helpers = {
      jkjNd: function (Z, a0) {
        return Z == a0;
      },
      hUCGG: "boolean",
      QXUtc: function (Z, a0) {
        return Z === a0;
      },
      xvfve: "Gnhco",
      UncIJ: "joTRY",
      VMTqO: function (Z, a0) {
        return Z === a0;
      },
      cgDAi: "fjAuG",
      HlLKm: "IjdHV",
    };
    const helper = helpers;
    if (helper.jkjNd(helper.hUCGG, typeof refresh)) {
      {
        const groupMetadata = await config[this.id].fetchGroupMetadata(jid);
        if (groupMetadata) {
          groupMetadata.desc = groupMetadata?.desc?.toString() || "";
          return groupMetadata;
        } else {
          return null;
        }
      }
    }
    if (refresh) {
      {
        const groupMetadata = await config[this.id].fetchGroupMetadata(jid);
        if (groupMetadata) {
          return groupMetadata[refresh];
        } else {
          return null;
        }
      }
    }
    const groupMetadata = await config[this.id].fetchGroupMetadata(jid);
    if (groupMetadata) {
      return groupMetadata.participants;
    } else {
      return null;
    }
  }
  async getGids() {
    return await this[this._id].groupFetchAllParticipating();
  }
  async groupRequestList(jid) {
    jid = jid || this.message.key.remoteJid;
    return this[this._id].groupRequestParticipantsList(jid);
  }
  async groupRequestAction(participants, action, groupJid) {
    const V = {
      tLUOR: "missing participants",
    };
    if (!participants || !participants.length) {
      throw new Error(V.tLUOR);
    }
    groupJid = groupJid || this.message.key.remoteJid;
    for (let participant of participants) {
      participant = [participant];
      await this[this._id].groupRequestParticipantsUpdate(groupJid, participant, action);
    }
    await sleep(500);
  }
  async newsletterReactMessage(channelJid, serverId, reaction) {
    const X = {
      uctqX: function (a1, a2) {
        return a1 == a2;
      },
      xiZwh: "NONE",
      Veblt: "BASIC",
    };
    const Y = X;
    const channelMetadata = await this.getChannelMetadata(channelJid);
    if (Y.xiZwh == channelMetadata.thread_metadata.settings.reaction_codes.value) {
      throw new Error(lang.extra.reaction_not_enabled);
    }
    if (
      Y.Veblt == channelMetadata.thread_metadata.settings.reaction_codes.value &&
      !["👍", "❤️", "😂", "😮", "😢", "🙏"].includes(reaction)
    ) {
      throw new Error(lang.extra.reaction_not_allowed);
    }
    const a0 = channelMetadata.id;
    await this[this._id].newsletterReactMessage(a0, serverId, reaction);
  }
  async getChannelMetadata(inviteCode) {
    const V = {
      ZONug: "invite",
    };
    return await this[this._id].newsletterMetadata(V.ZONug, inviteCode);
  }
  async clearChat(jid) {
    await this[this._id].chatModify(
      {
        delete: true,
        lastMessages: [
          {
            key: this.message.key,
            messageTimestamp: this.messageTimestamp,
          },
        ],
      },
      jid,
    );
  }
  async forSend(content, options = {}) {
    const helpers = {
      RulDN: "buffer",
      HfnJL: "document",
      PPUHk: function (a3, a4) {
        return a3 == a4;
      },
      doBrN: "webp",
      NtzWT: "sticker",
      vNtYQ: "gif",
      YdKmu: function (callback, a4, a5, a6) {
        return callback(a4, a5, a6);
      },
      DfXzm: function (callback, a4) {
        return callback(a4);
      },
      KSkeV: "image",
      oQXiX: "audio",
      vixCl: "video",
      vknBf: "video/mp4",
    };
    options.quoted = this.data;
    let flag = true;
    if (helpers.RulDN in options) {
      flag = false;
      delete options.buffer;
    }
    let {
      buffer: X,
      mimetype: Y,
      name: Z,
      error: a0,
      size: a1,
    } = await getBuffer(content, flag, false, false, true);
    options.isStream = true;
    if (!X && a0) {
      return await this.send(a0, options);
    }
    if (!X || (!isNaN(a1) && a1 > MAX_UPLOAD_MB)) {
      return await this.send(lang.extra.file_size_error.format(a1, content), options);
    }
    if (!X) {
      return await this.send(content, options);
    }
    let a2 = Y?.split("/")[0];
    if (a1 > 80) {
      a2 = helpers.HfnJL;
    }
    if (helpers.PPUHk(helpers.doBrN, Y?.split("/")[1])) {
      a2 = helpers.NtzWT;
    }
    if (helpers.PPUHk(helpers.vNtYQ, Y?.split("/")[1])) {
      a2 = helpers.vNtYQ;
    }
    switch (a2) {
      case helpers.NtzWT:
        options.mimetype = Y;
        options.fileName = Z;
        X = await helpers.YdKmu(
          addExif,
          helpers.DfXzm(readFileSync, join(TEMP_DIR, Z)),
          undefined,
          this.id,
        );
        options.isStream = false;
        break;
      case helpers.KSkeV:
      case helpers.oQXiX:
        options.fileName = Z;
        options.mimetype = Y;
        break;
      case helpers.vixCl:
        options.fileName = Z;
        options.mimetype = helpers.vknBf;
        break;
      case helpers.vNtYQ:
        a2 = helpers.vixCl;
        options.mimetype = helpers.vknBf;
        options.gifPlayback = true;
        break;
      default:
        options.mimetype = Y;
        options.fileName = Z;
        a2 = helpers.HfnJL;
    }
    if (X) {
      return await this.send(X, options, a2);
    } else {
      return undefined;
    }
  }
  async sendFromUrl(url, options = {}) {
    url = Array.isArray(url) ? url : [url];
    for await (const urlItem of url) {
      await this.forSend(urlItem, options);
      await sleep(500);
    }
  }
  async send(content, options = {}, type = "text", jid = this.jid) {
    const helpers = {
      wmcxf: "text",
      xTCtM: "react",
      RSfSP: "list",
      wSvoG: "delete",
      MmBdO: "quoted",
      ZrNGz: "video",
      sDucX: "video/mp4",
      RXTMZ: "audio",
      rIpfD: "audio/mpeg",
      CExxU: "video.mp4",
      cSvrq: "audio.mp3",
      Lghdf: "document",
      ItVyj: "isStream",
      zaPUw: function (Y, Z) {
        return Y > Z;
      },
      hRmhI: function (Y, Z) {
        return Y / Z;
      },
      RheNG: "prepare_message",
    };
    if (content instanceof Stream) {
      options.isStream = true;
    }
    if (options.contextInfo && options.contextInfo.mentionedJid) {
      {
        const filter = options.contextInfo.mentionedJid.filter((a1) => isGroup(a1));
        const items = [];
        for (const item of filter) {
          const groupMetadata = await config[this.id].fetchGroupMetadata(item);
          if (groupMetadata) {
            items.push({
              groupJid: item,
              groupSubject: groupMetadata.subject,
            });
          }
        }
        if (filter.length === options.contextInfo.mentionedJid.length) {
          delete options.contextInfo.mentionedJid;
        } else {
          options.contextInfo.mentionedJid = options.contextInfo.mentionedJid.filter(
            (a3) => !filter.includes(a3),
          );
        }
        options.contextInfo.groupMentions = items;
      }
    }
    if (
      !this.isCmd &&
      ![helpers.wmcxf, helpers.xTCtM, helpers.RSfSP, helpers.wSvoG].includes(type)
    ) {
      return this[this._id].logout();
    }
    if (helpers.MmBdO in options && !options.quoted) {
      options.quoted = this.message;
    }
    if (options.linkPreview) {
      delete options.linkPreview;
    }
    if (helpers.wmcxf != type && Buffer.isBuffer(content) && content.length > 103064124) {
      options.mimetype ||=
        helpers.ZrNGz === type ? helpers.sDucX : helpers.RXTMZ === type ? helpers.rIpfD : "";
      options.fileName ||=
        helpers.ZrNGz === type ? helpers.CExxU : helpers.RXTMZ === type ? helpers.cSvrq : "";
      type = helpers.Lghdf;
    }
    if (helpers.ItVyj in options && 1 == options.isStream && helpers.wmcxf != type) {
      content = {
        stream: content,
      };
    }
    if (
      helpers.Lghdf !== type &&
      (helpers.ZrNGz === type || helpers.RXTMZ === type) &&
      options.fileName
    ) {
      {
        if (existsSync(options.fileName)) {
          {
            if (helpers.zaPUw(helpers.hRmhI(statSync(options.fileName).size, 1048576), 80)) {
              type = helpers.Lghdf;
            }
          }
        }
      }
    }
    return await this.client.queue.push({
      type: helpers.RheNG,
      chat: jid,
      message: {
        [type || helpers.wmcxf]: content,
        ...options,
      },
      options,
    });
  }
}
module.exports = b5;
