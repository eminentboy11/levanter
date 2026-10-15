const { lang } = require(".");
const { setVotes, getVotes } = require("./db/vote");
const al = /[0-9]+(-[0-9]+|)(@g\.us|@s\.whatsapp\.net)/g;
const am = (m) => [...m].map((p) => p.codePointAt(0).toString(16)).join("-");
const an = (p) => {
  const w = new Set();
  return (p = p.toLowerCase()).split("\n").reduce((x, y) => {
    if (y.startsWith("o")) {
      const [, z, A] = y.split("|");
      if (z && A && !w.has(z.trim())) {
        x.push({
          emoji: z.trim(),
          option: A.trim(),
        });
        w.add(z.trim());
      }
    }
    return x;
  }, []);
};
const ao = (m) => {
  const q = {};
  for (const v of m) {
    q[am(v.emoji)] = {
      v: [],
      e: v.emoji,
      o: v.option,
    };
  }
  return q;
};
const ap = (m, p, q, v) => ({
  question: m,
  options: p,
  voted: ao(p),
  msg: q,
  force: v,
  total: [],
});
const aq = (m) => {
  const p = (m = m.toLowerCase()).split("\n").find((v) => v.startsWith("q|"));
  if (!p) {
    throw new Error(lang.plugins.vote.question_required);
  }
  const [, q] = p.split("|");
  return q.trim();
};
const ar = (m) => {
  const p = {
    eUzXH: function (w, z) {
      return w * z;
    },
  };
  const q = m.total.length;
  let v = m.question + "\n";
  for (const w in m.voted) {
    {
      const { e: x, v: y, o: z } = m.voted[w];
      v += z + " (" + x + ") *" + p.eUzXH(y.length / q, 100).toFixed(0) + "%*\n";
    }
  }
  v += "\n" + lang.plugins.vote.total_vote.format(q) + "\n\n" + lang.plugins.vote.vote;
  return v;
};
let as;
exports.newVote = async function (m, q) {
  const v = {
    NCPRS: "result",
    jnMYT: function (z, A) {
      return z * A;
    },
    CDLQz: "delete",
    idTvd: "--force",
  };
  let w;
  as = await getVotes(m.id);
  if (al.test(q)) {
    const x = q.match(al);
    if (x.length > 1) {
      w = x;
    } else {
      m.jid = x[0];
    }
  }
  if (m.jid in as && !q) {
    return [as[m.jid].msg];
  }
  if (q.startsWith(v.NCPRS)) {
    {
      if (!(m.jid in as)) {
        return [lang.plugins.vote.no_vote];
      }
      const y = as[m.jid].total.length;
      if (0 === y) {
        return [lang.plugins.vote.total_vote.format(0)];
      }
      let z = as[m.jid].question + "\n";
      for (const A in as[m.jid].voted) {
        {
          const { e: B, v: C } = as[m.jid].voted[A];
          const D = as[m.jid].options.find((F) => F.emoji === B);
          const E = C.length;
          z += D.option + "(" + E + ") *" + v.jnMYT(E / y, 100).toFixed(0) + "%*\n";
        }
      }
      z += "\n" + lang.plugins.vote.total_vote.format(y);
      return [z];
    }
  }
  if (q.startsWith(v.CDLQz)) {
    if (al.test(q)) {
      const H = q.match(al);
      for (const I of H) {
        delete as[I];
      }
    } else {
      if (!as[m.jid]) {
        return [lang.plugins.vote.no_vote];
      }
      delete as[m.jid];
    }
    await setVotes(as, m.id);
    return [lang.plugins.vote.vote_deleted];
  }
  if (m.jid in as) {
    return [lang.plugins.vote.delete_vote];
  }
  {
    if (!q) {
      return [lang.plugins.vote.usage];
    }
    const J = an(q);
    if (J.length < 2) {
      throw new Error(lang.plugins.vote.option_required);
    }
    const K = aq(q);
    if (!K) {
      throw new Error(lang.plugins.vote.question_required);
    }
    const L =
      K +
      "\n\n" +
      J.map((N) => N.emoji + " - " + N.option).join("\n") +
      "\n\n*" +
      lang.plugins.vote.vote +
      "*";
    const M = q.includes(v.idTvd);
    if (w && w.length > 1) {
      for (const N of w) {
        as[N] = ap(K, J, L, M);
      }
    } else {
      as[m.jid] = ap(K, J, L, M);
    }
    await setVotes(as, m.id);
    return [L, w];
  }
};
exports.participateInVote = async (x, y, z, A, B) => {
  const C = {
    BZaXJ: "3|1|0|2|4",
    XNXFE: "@s.whatsapp.net",
  };
  if (A) {
    const K = C.BZaXJ.split("|");
    let L = 0;
    while (true) {
      switch (K[L++]) {
        case "0":
          if (!as[x].voted[y] || as[x].voted[y].v.includes(z)) {
            return;
          }
          continue;
        case "1":
          y = am(y);
          continue;
        case "2":
          as[x].voted[y].v.push(z);
          as[x].total.push(z);
          await setVotes(as, B);
          continue;
        case "3":
          as ||= await getVotes(B);
          if (!(x in as) || !y || as[x].total.includes(z)) {
            return;
          }
          continue;
        case "4":
          return ar(as[x]);
      }
      break;
    }
  }
  const D = x;
  x = D.jid;
  z = D.participant;
  B = D.id;
  as ||= await getVotes(B);
  if (!D.isGroup || !(D.jid in as) || as[x].total.includes(z)) {
    return;
  }
  if (
    (!D.reply_message ||
      !D.reply_message.text ||
      !D.text ||
      !D.reply_message.text.includes(as[x].question)) &&
    !as[x].force
  ) {
    return;
  }
  y = am(D.text);
  let E = as[x].voted[y];
  if (!E) {
    const M = D.text.toLowerCase();
    const N = as[x].options.find((O) => O.option === M);
    if (N) {
      D.text = N.emoji;
      y = am(D.text);
      E = as[x].voted[y];
    }
  }
  if (!E) {
    if (as[x].force) {
      return {
        text: as[x].msg,
        option: {
          quoted: null,
        },
      };
    } else {
      return undefined;
    }
  }
  as[x].voted[y].v = E.v.concat(z);
  as[x].total.push(z);
  await setVotes(as, B);
  const G = {
    mentionedJid: [D.participant],
  };
  const H = {
    contextInfo: G,
  };
  const I = ar(as[x]);
  const J = H;
  return {
    text: lang.plugins.vote.voted.format(D.participant.replace(C.XNXFE, ""), D.text, I),
    option: J,
  };
};
