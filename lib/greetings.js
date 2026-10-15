const { loadBaileys } = require("./baileys");
let a0;
const fs = require("fs-extra");
const path = require("path");
const config = require("./config");
const { getMessage, setMessage } = require("./db");
const { getBuffer } = require("./fetch");
const { isUrl, genHydratedButtons, store } = require("./utils");
const aa = "aWxvdmV5b3Vzb29vb29vbWF0Y2hidXRpZG9udGtub3d3aHlpbGlrZWxvdmV3YW50dQ==";
const { iChecker } = require("./test/test");
const ac = iChecker();
const ad = ac == aa;
if (ad) {
  const ae = (z) =>
    (z.match(/#button\\(.|\n)*?#/gm) || []).map((A) => A.split("\\")[1].replace(/#/, ""));
  exports.getButtons = ae;
  const af = (z) =>
    (z.match(/#ubutton\\(.|\n)*?#/gm) || []).map((A) => A.split("\\")[1].replace("#", ""));
  exports.getUrlButtons = af;
  const ag = (z) =>
    (z.match(/#cbutton\\(.|\n)*?#/gm) || []).map((A) => A.split("\\")[1].replace("#", ""));
  exports.getCallButtons = ag;
  const ah = (z) =>
    (z.match(/#num\\(.|\n)*?#/gm) || []).map((A) => A.split("\\")[1].replace("#", ""));
  exports.getBunNums = ah;
  const ai = (z) =>
    (z.match(/#url\\(.|\n)*?#/gm) || []).map((A) => A.split("\\")[1].replace("#", ""));
  exports.getBunUrls = ai;
  const aj = (z) =>
    (z.match(/#header\\(.|\n)*?#/gm) || []).map((A) => A.split("\\")[1].replace("#", ""));
  exports.getHeader = aj;
  const ak = async (D, E, F, G, H) => {
    const I = {
      OcsEd: "template",
      ahnnB: function (aq, ar, as) {
        return aq(ar, as);
      },
      MYWar: "video",
      QKjhq: "button",
      hXAqA: "image",
    };
    let J = false;
    let K = "";
    let L = "";
    let N = {};
    const O = [];
    const P = {};
    const Q = {
      mentionedJid: [F],
    };
    a0 ||= (await loadBaileys()).prepareWAMessageMedia;
    if (/&mention/.test(E)) {
      P.contextInfo = Q;
      E = E.replace(/&mention/g, "@" + F.split("@")[0]);
    }
    const R = ae(E);
    const S = aj(E);
    const T = af(E);
    const an = ai(E);
    const ao = ag(E);
    const ap = ah(E);
    if ((T.length > 0 && an.length > 0) || (ao.length > 0 && ap.length > 0)) {
      J = true;
      const aq = [];
      for (let ar = 0; ar < T.length; ar++) {
        E = E.replace("#ubutton\\" + T[ar] + "#", "")
          .trim()
          .replace("#url\\" + an[ar] + "#", "")
          .trim();
        aq.push({
          urlButton: {
            text: T[ar],
            url: an[ar],
          },
        });
      }
      for (let as = 0; as < ao.length; as++) {
        E = E.replace("#cbutton\\" + ao[as] + "#", "")
          .trim()
          .replace("#num\\" + ap[as] + "#", "")
          .trim();
        aq.push({
          callButton: {
            text: ao[as],
            number: ap[as],
          },
        });
      }
      for (let at = 0; at < R.length; at++) {
        E = E.replace("#button\\" + R[at] + "#", "").trim();
        aq.push({
          button: {
            text: R[at],
            id: R[at],
          },
        });
      }
      if (S.length > 0) {
        E = E.replace("#header\\" + S[0] + "#", "").trim();
      }
      L = await genHydratedButtons(aq, E, S);
      K = I.OcsEd;
      if (/image|video/.test(G)) {
        const au = {
          upload: H.waUploadToServer,
        };
        const av = await I.ahnnB(
          a0,
          {
            [G]: D,
            gifPlayback: I.MYWar == G,
          },
          au,
        );
        N = av.videoMessage || av.imageMessage;
        if (av.videoMessage) {
          L.videoMessage = N;
        } else {
          L.imageMessage = N;
        }
      }
    } else if (R.length > 0 && S.length > 0) {
      K = I.QKjhq;
      J = true;
      R.forEach((ax) =>
        O.push({
          buttonId: ax,
          buttonText: {
            displayText: ax,
          },
          type: 1,
        }),
      );
      for (const ax of R) {
        E = E.replace("#button\\" + ax + "#", "").trim();
      }
      const aw = {
        contentText: (E = E.replace("#header\\" + S[0] + "#", "").trim()).trim(),
        footerText: S[0],
        buttons: O,
        headerType: I.hXAqA == G ? 4 : I.MYWar == G ? 5 : 1,
      };
      if (/image|video/.test(G)) {
        const ay = {
          upload: H.waUploadToServer,
        };
        const az = await I.ahnnB(
          a0,
          {
            [G]: D,
            gifPlayback: I.MYWar == G,
          },
          ay,
        );
        N = az.videoMessage || az.imageMessage;
        if (az.videoMessage) {
          aw.videoMessage = N;
        } else {
          aw.imageMessage = N;
        }
      }
      L = aw;
    }
    P.gifPlayback = I.MYWar == G;
    if (!J && /image|video/.test(G)) {
      L = D;
      K = G;
      P.caption = E.trim();
    }
    L ||= E.trim();
    return {
      msg: L,
      options: P,
      type: K,
    };
  };
  exports.genGreetings = ak;
  exports.greetingsPreview = async (z, A, B) => {
    const C = {
      ikKIi: "http",
      ofegL: "&desc",
      JuHuB: "&name",
      rMYIc: "&size",
      jqrxG: "&pp",
      OOCEZ: "image",
      ayPno: function (I, J, K, L, M) {
        return I(J, K, L, M);
      },
      MDSSS: "text",
      MvqgR: "video",
      AlEuY: function (I, J, K, L, M, N) {
        return I(J, K, L, M, N);
      },
    };
    const D = await getMessage(z.jid, A, B);
    if (!D) {
      return false;
    }
    let E = D.message;
    let F = isUrl(E);
    const G = /&pp/.test(E);
    F = !(G || !F) && !!F.startsWith(C.ikKIi) && F;
    if (/&desc|&name|&size/.test(E)) {
      {
        const J = await config[B].fetchGroupMetadata(z.jid);
        if (J) {
          const { participants: K, subject: L, desc: M } = J;
          E = E.replace(C.ofegL, M?.toString() || "")
            .replace(C.JuHuB, L)
            .replace(C.rMYIc, K.length);
        }
      }
    }
    if (G) {
      E = E.replace(C.jqrxG, "");
      try {
        F = await z.client.profilePictureUrl(z.participant, C.OOCEZ);
      } catch (N) {}
    }
    const H = F && (await getBuffer(F));
    if (!A && H?.buffer) {
      await C.ayPno(setMessage, D.chat, H?.type || C.MDSSS, D.message, D.enabled);
    }
    if ([C.MvqgR, C.OOCEZ].includes(H?.type)) {
      E = E.replace(F, "");
    }
    return await C.AlEuY(ak, H?.buffer, E, z.participant, H?.type || C.MDSSS, z.client);
  };
  exports.enableGreetings = async (z, A, B, C) => {
    const D = {
      dnpiY: function (G, H, I, J, K, L) {
        return G(H, I, J, K, L);
      },
    };
    const { message: E, type: F } = await getMessage(z, A, C);
    return await D.dnpiY(setMessage, z, F, E, "on" == B, C);
  };
  const am = {
    welcome: "welFolder",
    goodbye: "goodFolder",
    banbye: "banFolder",
  };
  exports.clearGreetings = (B, C) => {
    const D = {
      kmyhQ: "../media",
      kKXkM: function (H, I) {
        return H !== I;
      },
      WfESl: "hhmkj",
    };
    const E = D;
    const F = path.join(__dirname, E.kmyhQ, am[C]);
    const G = fs.readdirSync(F).find((H) => H.startsWith(B));
    if (G) {
      {
        const I = path.join(F, G);
        const J = {
          force: true,
        };
        fs.rmSync(I, J);
      }
    }
  };
}
