const config = require("./config");
const { getLydia } = require("./db/lydia");
const { getJson } = require("./fetch");
const N = async (l, m, n) => {
  const o = {
    qnUzx: function (q, s, u) {
      return q(s, u);
    },
    sAtxC: "https://levanter.onrender.com/chat",
    hWscf: "post",
    AmaQz: "application/json",
  };
  if (!l) {
    return;
  }
  const p = n ? "" + m + n : m;
  try {
    {
      const q = {
        message: l,
        id: p,
      };
      const s = await o.qnUzx(fetch, o.sAtxC, {
        method: o.hWscf,
        body: JSON.stringify(q),
        headers: {
          "content-type": o.AmaQz,
        },
      });
      return (await s.json()).result;
    }
  } catch (v) {
    throw new Error(v.message);
  }
};
const chatBot = async (k) => {
  const l = {
    nRUgm: function (n, o, p, q) {
      return n(o, p, q);
    },
  };
  if (
    (!k.isGroup || !k.reply_message || !(k.reply_message.jid == k.client.user.jid)) &&
    !!k.isGroup
  ) {
    return;
  }
  let m = await getLydia(k.jid, k.id);
  m ||= await getLydia(k.jid, k.id, k.participant);
  if (!m) {
    return;
  }
  return await l.nRUgm(N, k.text, k.jid, k.isGroup && k.participant);
};
exports.chatBot = chatBot;
exports.lydia = async (k) => {
  const l = {
    hYpHX: function (x, y) {
      return x(y);
    },
  };
  const m =
    (k.isGroup && k.reply_message && k.reply_message.jid == k.client.user.jid) || !k.isGroup;
  if (!m) {
    return m;
  }
  let q = false;
  q = await getLydia(k.jid, k.id);
  q ||= await getLydia(k.jid, k.id, k.participant);
  if (!q) {
    return false;
  }
  if (
    /<% RGI_Emoji %>|\p{Emoji_Presentation}|\p{Emoji}\uFE0F|\p{Emoji_Modifier_Base}/gu.test(k.text)
  ) {
    k.text = k.text.replace(
      /<% RGI_Emoji %>|\p{Emoji_Presentation}|\p{Emoji}\uFE0F|\p{Emoji_Modifier_Base}/gu,
      "",
    );
  }
  const [u, v] = config[k.id].env.BRAINSHOP.split(",");
  let w = await l.hYpHX(
    getJson,
    "http://api.brainshop.ai/get?bid=" +
      u +
      "&key=" +
      v +
      "&uid=[" +
      k.participant +
      "]&msg=[" +
      k.text +
      "]",
  );
  return !!w && w.cnt;
};
