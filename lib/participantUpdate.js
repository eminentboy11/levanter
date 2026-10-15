const { isAdmin, jidToNum, logger, lang } = require(".");
const config = require("./config");
const { getMessage, getFake, getPdm } = require("./db");
const { resetMsgs } = require("./db/store");
const { download, getBuffer } = require("./fetch");
const { genGreetings } = require("./greetings");
const { isUrl } = require("./utils");
const path = require("path");
const fs = require("fs-extra");
const { setSubscription } = require("./db/antilink");
const al = (F) => F.replace(/\+/g, "");
const am = async (G, H, I, J) => {
  const K = {
    avMNd: "120363400231018732@g.us",
    zafqp: "true",
  };
  if (K.avMNd !== G || K.zafqp !== config[J].env.SUBS) {
    return;
  }
  const L =
    "Hello, your subscription has now started and will expire on " +
    (await setSubscription(H, J, false)) +
    ". Please remember to renew before then to avoid being removed from the group.\n\nRQTMI CRYPTO FUTURES SIGNAL GROUP";
  const M = {
    text: L,
  };
  await I.sendMessage(H, M);
};
exports.participantUpdate = async (F, G, H) => {
  const I = {
    jRUSa: "add",
    zVBIT: "invite",
    ERMPa: "linked_group_join",
    LWQub: "remove",
    BNsFd: "promote",
    bTUNe: "demote",
  };
  if (0 === F.participants.length) {
    return;
  }
  const J = await config[H].findJid(F.participants[0]);
  try {
    {
      switch (F.action) {
        case I.jRUSa:
          await an(F, G, H, J);
          break;
        case I.zVBIT:
        case I.ERMPa:
          am(F.id, J, G, H);
          await an(F, G, H, J);
          break;
        case I.LWQub:
          await ao(F, G, H, J);
          break;
        case I.BNsFd:
        case I.bTUNe:
          await ap(F, G, H);
      }
    }
  } catch (L) {
    logger.error(L);
  }
};
const an = async (G, H, I, J) => {
  const K = {
    eWWYI: "add",
    ysZjs: "participant_remove",
  };
  const L = await getFake(G.id, I);
  if (K.eWWYI !== G.action && shift && L?.enabled && true === L.enabled) {
    {
      const M = await aq(G.id, I);
      if (!M) {
        return;
      }
      const { participants: N } = M;
      const O = G.participants[0];
      if (shouldRemoveParticipant(L, J)) {
        {
          if (!(await isAdmin(N, H.user.jid))) {
            return;
          }
          const Q = {
            type: K.ysZjs,
            chat: G.id,
            participant: O,
          };
          return await H.queue.push(Q);
        }
      }
    }
  }
  await as(G, H, I);
};
const ao = async (G, H, I, J) => {
  const K = {
    JGflM: function (V, W, X) {
      return V(W, X);
    },
    jpezG: "goodbye",
    xLimi: "goodFolder",
    ENGro: "prepare_message",
    ypJBN: "text",
  };
  J = J || G.participants[0];
  K.JGflM(resetMsgs, G.id, J === H.user.jid ? undefined : J);
  const L = await getMessage(G.id, K.jpezG, I);
  if (!L?.enabled) {
    return;
  }
  const M = await aq(G.id, I);
  if (!M) {
    return;
  }
  const { participants: N, subject: O, desc: P } = M;
  let Q = L.message;
  Q = at(Q, P, O, N.length);
  const R = await au(Q, K.xLimi, L.chat, G.participants[0], H);
  const T = await genGreetings(R.buff, R.text, G.participants[0], R.mtype, H);
  try {
    {
      const W = {
        type: K.ENGro,
        chat: G.id,
        message: {
          [T.type || K.ypJBN]: T.msg,
          ...T.options,
        },
        options: T.options,
      };
      await H.queue.push(W);
    }
  } catch (X) {
    {
      logger.error(X);
    }
  }
};
const ap = async (F, G, H) => {
  const I = {
    onnuw: "prepare_message",
    KCFXM: "demote",
  };
  if (!(await getPdm(F.id, H))) {
    return;
  }
  const J = await config[H].fetchGroupMetadata(F.id);
  if (!J.announce || !!(await isAdmin(J.participants, G.user.jid))) {
    try {
      await G.queue.push({
        type: I.onnuw,
        chat: F.id,
        message: {
          text:
            "_@" +
            jidToNum(F.from) +
            " " +
            (I.KCFXM === F.action ? lang.extra.demoted : lang.extra.promoted) +
            " @" +
            jidToNum(F.participants[0]) +
            "_",
          contextInfo: {
            mentionedJid: [F.from, F.participants[0]],
          },
        },
      });
    } catch (K) {
      {
        logger.error(K);
      }
    }
  }
};
const aq = async (G, H) => {
  const J = {
    hgnQS: "error fetching group metadata:",
  };
  try {
    let K = await config[H].fetchGroupMetadata(G);
    K ||= await config[H].fetchGroupMetadata(G);
    return K;
  } catch (L) {
    logger.error(J.hgnQS, G);
    return null;
  }
};
const shouldRemoveParticipant = (F, G) => {
  const H = {
    VYVCt: function (M, N) {
      return M === N;
    },
    jiqVc: "^()",
  };
  let I = al(F.code);
  let J = true;
  const K = I.match(/![0-9]+/g)
    ?.map((M) => M.slice(1))
    .join("|");
  if (K) {
    J = false;
    I = "^(" + K + ")";
  }
  if (!I || H.jiqVc === I) {
    return false;
  }
  const L = new RegExp(I, "g");
  return F.enabled && H.VYVCt(L.test(G), J);
};
exports.shouldRemoveParticipant = shouldRemoveParticipant;
const as = async (G, H, I) => {
  const J = {
    XibLm: "welcome",
    bfNGk: "welFolder",
    JMArt: "prepare_message",
    LOgGz: "text",
  };
  const K = await getMessage(G.id, J.XibLm, I);
  if (!K?.enabled) {
    return;
  }
  const L = await aq(G.id, I);
  if (!L) {
    return;
  }
  const { participants: M, subject: N, desc: O } = L;
  let P = K.message;
  P = at(P, O, N, M.length);
  const Q = await au(P, J.bfNGk, K.chat, G.participants[0], H);
  const R = await genGreetings(Q.buff, Q.text, G.participants[0], Q.mtype, H);
  const T = {
    type: J.JMArt,
    chat: G.id,
    message: {
      [R.type || J.LOgGz]: R.msg,
      ...R.options,
    },
    options: R.options,
  };
  if (shift) {
    await H.queue.push(T);
  }
};
const at = (F, G, H, I) =>
  F.replace("&desc", G?.toString() || "")
    .replace("&name", H)
    .replace("&size", I);
const au = async (G, H, I, J, K) => {
  const L = {
    dKfTu: "../media",
    DOXca: "text",
    LxRWZ: "mp4",
    FamAz: "video",
    LOlMF: "image",
    KSHBA: "&pp",
  };
  let M = fs.readdirSync(path.join(__dirname, L.dKfTu, H)).find((T) => T.startsWith(I));
  let N = null;
  let O = L.DOXca;
  let P = /&pp/.test(G);
  const Q = !P && av(G);
  if (Q) {
    G = G.replace(Q, "");
    if (M) {
      N = fs.readFileSync(path.join(__dirname, "../media/" + H + "/" + M));
      O = M.endsWith(L.LxRWZ) ? L.FamAz : L.LOlMF;
    } else {
      const T = await download(Q, I);
      if (!T.error) {
        G = G.replace(Q, "");
        fs.writeFileSync(path.join(__dirname, L.dKfTu, H, I + "." + T.ext), T.buffer);
        O = T.type;
        N = T.buffer;
      }
    }
  }
  if (P) {
    G = G.replace(L.KSHBA, "");
    try {
      const V = await K.profilePictureUrl(J, L.LOlMF);
      const { buffer: W } = await getBuffer(V);
      if (W) {
        N = W;
        O = L.LOlMF;
      }
    } catch (X) {}
  }
  const R = {
    buff: N,
    mtype: O,
    text: G,
  };
  return R;
};
const av = (F) => {
  const G = {
    THKLH: "http",
  };
  let H = isUrl(F);
  return !!H && !!H.startsWith(G.THKLH) && H;
};
