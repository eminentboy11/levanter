const G = {};
function bind(h) {
  const j = {
    kPsOl: "participants",
    ZHxNg: "remove",
    Chvxv: "add",
    fNSAH: "demote",
    usFwK: "promote",
    thWDM: "admin",
    OuCXI: "groups.update",
    JRuMt: "group-participants.update",
  };
  const k = async (l) => {
    if (l in G && j.kPsOl in G[l] && undefined !== G[l].participants) {
      return G[l];
    }
    try {
      {
        G[l] = await h.groupMetadata(l);
      }
    } catch (n) {
      {
        throw n;
      }
    }
    return G[l];
  };
  h.ev.on(j.OuCXI, async (l) => {
    for (const m of l) {
      const n = await k(m.id);
      if (n) {
        Object.assign(n, m);
      }
    }
  });
  h.ev.on(j.JRuMt, async ({ id: l, participants: m, action: o }) => {
    if (j.ZHxNg === o && m.includes(h.user.jid)) {
      return delete G[l];
    }
    let p = await k(l);
    if (p) {
      switch (o) {
        case j.Chvxv:
          p.participants.push(
            ...m.map((q) => ({
              id: q,
              admin: null,
            })),
          );
          break;
        case j.fNSAH:
        case j.usFwK:
          for (const q of p.participants) {
            if (m.includes(q.id)) {
              q.admin = j.usFwK === o ? j.thWDM : null;
            }
          }
          break;
        case j.ZHxNg:
          p.participants = p.participants.filter((u) => !m.includes(u.id));
      }
      p.size = p.participants.length;
    }
  });
  return {
    groupMetadata: G,
    fetchGroupMetadata: k,
    sync: false,
  };
}
exports.bind = bind;
