const { loadBaileys } = require("./baileys");
let aj;
let ak;
let al;
let am;
let an;
let ao;
const ap = {
  stdTTL: 3600,
  useClones: false,
};
const { NodeCache } = require("@cacheable/node-cache");
const { genThumbnail, extractVideoThumb, chats, TEMP_DIR } = require("./constant");
const { join } = require("path");
const config = require("./config");
const ax = new NodeCache(ap);
const utils = require("./utils");
const config2 = require("../config");
const aA = async (A, B, C) => {
  if (!an(A) || !B) {
    return "0";
  }
  const E = await config[B].fetchGroupMetadata(A, false, C);
  return E?.ephemeralDuration;
};
const aB = async (F, G) => {
  const H = {
    TllAq: "require atleast 1 contact",
    ufykI: "canonical-url",
    JilrZ: "matched-text",
    BPpCL: "text",
    ZrTaE: function (J, K) {
      return J == K;
    },
    YqQyn: "string",
    ZZRqj: "contacts",
    POBRh: "location",
    cEVws: "button",
    thaea: "react",
    RMEdF: "list",
    SBlHG: "template",
    ifupe: "invite",
    LWXWL: "delete",
    sNKwr: "edit",
    BXMWg: "zgvSn",
    gwnKn: "aKXGW",
    DQzjm: "image",
    MbhMR: "video",
    kTKjd: "viewOnce",
    QmYlk: "contextInfo",
    UmPme: function (J, K) {
      return J || K;
    },
  };
  if (!aj) {
    const J = await loadBaileys();
    aj = J.WAProto;
    ak = J.generateWAMessageFromContent;
    al = J.prepareWAMessageMedia;
    am = J.extractUrlFromText;
    an = J.isJidGroup;
    ao = J.getUrlInfo;
  }
  if (G.linkPreview) {
    delete G.linkPreview;
  }
  let I = {};
  if (H.BPpCL in F) {
    const K = H.ZrTaE(H.YqQyn, typeof F.text) ? am(F.text) : undefined;
    const L = {
      ...F,
    };
    let M = G?.LinkPreview || ax.get(K);
    if (!M && K && !ax.has(K)) {
      try {
        {
          const O = {
            uploadImage: G.upload,
          };
          M = await ao(K, O);
        }
      } catch (P) {
        {
          ax.set(K, null);
        }
      }
    }
    if (M && M.title) {
      {
        L.canonicalUrl = M[H.ufykI];
        L.matchedText = M[H.JilrZ];
        L.jpegThumbnail = M.jpegThumbnail;
        L.description = M.description;
        L.title = M.title;
        L.previewType = 0;
        const S = M.highQualityThumbnail;
        if (S) {
          L.thumbnailDirectPath = S.directPath;
          L.mediaKey = S.mediaKey;
          L.mediaKeyTimestamp = S.mediaKeyTimestamp;
          L.thumbnailWidth = S.width;
          L.thumbnailHeight = S.height;
          L.thumbnailSha256 = S.fileSha256;
          L.thumbnailEncSha256 = S.fileEncSha256;
        }
      }
    }
    I.extendedTextMessage = L;
  } else if (H.ZZRqj in F) {
    {
      const T = F.contacts.contacts.length;
      if (!T) {
        throw new Error(H.TllAq);
      }
      if (1 === T) {
        I.contactMessage = aj.Message.ContactMessage.create(F.contacts.contacts[0]);
      } else {
        I.contactsArrayMessage = aj.Message.ContactsArrayMessage.create(F.contacts);
      }
    }
  } else if (H.POBRh in F) {
    I.locationMessage = aj.Message.LocationMessage.create(F.location);
  } else if (H.cEVws in F) {
    {
      const V = F.button;
      Object.assign(V, I);
      I = {
        buttonsMessage: V,
      };
    }
  } else if (H.thaea in F) {
    F.react.senderTimestampMs = Date.now();
    I.reactionMessage = aj.Message.ReactionMessage.create(F.react);
  } else if (H.RMEdF in F) {
    const X = {
      listMessage: F.list,
    };
    I = X;
  } else if (H.SBlHG in F) {
    const Y = {
      hydratedTemplate: F.template,
    };
    const Z = {
      templateMessage: Y,
    };
    I = Z;
  } else if (H.ifupe in F) {
    {
      I = {
        groupInviteMessage: aj.Message.GroupInviteMessage.create(F.invite),
      };
    }
  } else if (H.LWXWL in F) {
    I.protocolMessage = {
      key: F.delete,
      type: 0,
    };
  } else if (H.sNKwr in F) {
    I = {
      protocolMessage: {
        key: F.edit.key,
        type: 14,
        editedMessage: F.edit.message
          ? F.edit.message
          : {
              conversation: F.edit.text,
            },
      },
    };
  } else {
    if (H.DQzjm in F) {
      F.jpegThumbnail = await genThumbnail(F.image);
    } else if (H.MbhMR in F) {
      const { thumbnail: a2, duration: a3 } = await extractVideoThumb(F.video);
      F.jpegThumbnail = a2;
      F.seconds = a3;
    }
    const a1 = {
      ...F,
      ...G,
    };
    I = await al(a1, G);
  }
  if (H.kTKjd in G) {
    I = {
      viewOnceMessage: {
        message: I,
      },
    };
  }
  if (H.QmYlk in G) {
    const [a5] = Object.keys(I);
    I[a5].contextInfo = H.UmPme(
      {
        ...I[a5]?.contextInfo,
        ...G.contextInfo,
      },
      {},
    );
  }
  return I;
};
const aC = async (A, B, C) => {
  if (!A) {
    return;
  }
  let E = utils.expiration.get(A);
  if (undefined === E && an(A)) {
    {
      const F = await aA(A, B, C);
      utils.expiration.set(A, F);
      return F;
    }
  }
  return E;
};
exports.prepareMessage = async (E, F, G = {}, H) => {
  const I = {
    xccnT: "client_send_message_error",
    ptaXk: "prepare_msg_start",
    PAroW: "text",
    gOAgb: "load_baileys_start",
    YtpOx: "load_baileys_end",
    nwRov: function (N, O) {
      return N == O;
    },
    FwmlW: "string",
    LAONf: "link_preview_fetch_start",
    DMyZP: "link_preview_fetch_success",
    RWzzV: "link_preview_fetch_error",
    NjiYz: "poll",
    BQveZ: "fetch_expiration_start",
    ZBiGO: "fetch_expiration_end",
    JIAXy: "image",
    Pnxff: "process_image_start",
    pzuOI: "process_image_end",
    BsaCX: "video",
    zAvqI: "process_video_start",
    LCAlG: function (N, O) {
      return N == O;
    },
    rNJqU: "process_video_end",
    MJgxe: "client_send_message_start",
    ZtVUd: "client_send_message_success",
    OFAkO: "delete",
    wjeNU: function (N, O) {
      return N / O;
    },
    cuUUh: function (N, O) {
      return N * O;
    },
    IVaDv: "@g.us",
    cqzkZ: "template",
  };
  if (G._trace) {
    G._trace.push({
      step: I.ptaXk,
      time: Date.now(),
      type: I.PAroW in F ? I.PAroW : Object.keys(F)[0],
    });
  }
  if (!aj) {
    {
      if (G._trace) {
        G._trace.push({
          step: I.gOAgb,
          time: Date.now(),
        });
      }
      const O = await loadBaileys();
      aj = O.WAProto;
      ak = O.generateWAMessageFromContent;
      al = O.prepareWAMessageMedia;
      am = O.extractUrlFromText;
      an = O.isJidGroup;
      ao = O.getUrlInfo;
      if (G._trace) {
        G._trace.push({
          step: I.YtpOx,
          time: Date.now(),
        });
      }
    }
  }
  if (G.linkPreview) {
    delete G.linkPreview;
  }
  if (!F.contacts && !F.react && !F.invite && !F.delete && !F.edit) {
    {
      if (I.PAroW in F && !G.linkPreview) {
        const Q = I.nwRov(I.FwmlW, typeof F.text) ? am(F.text) : undefined;
        if (Q) {
          let R = ax.get(Q);
          if (!R && !ax.has(Q)) {
            {
              if (G._trace) {
                G._trace.push({
                  step: I.LAONf,
                  time: Date.now(),
                  url: Q,
                });
              }
              try {
                const T = new Promise((V, W) =>
                  setTimeout(() => W(new Error("Link preview timeout")), 15000),
                );
                const U = {
                  uploadImage: H.waUploadToServer,
                };
                R = await Promise.race([ao(Q, U), T]);
                if (R) {
                  if (G._trace) {
                    G._trace.push({
                      step: I.DMyZP,
                      time: Date.now(),
                    });
                  }
                  ax.set(Q, R);
                }
              } catch (V) {
                {
                  if (G._trace) {
                    G._trace.push({
                      step: I.RWzzV,
                      time: Date.now(),
                      error: V.message,
                    });
                  }
                  ax.set(Q, null);
                }
              }
            }
          }
          F.linkPreview = R;
        }
      }
      if (I.NjiYz in F) {
        F.poll.selectableCount = F.poll.selectableOptionsCount;
        F.poll.values = F.poll.options.map(({ optionName: X }) => X);
      }
      F.mentions = (!!G.contextInfo && G.contextInfo.mentionedJid) || [];
      F.caption = (!!G.caption && G.caption) || undefined;
      F.gifPlayback = (!!G.gifPlayback && G.gifPlayback) || undefined;
      if (!G.ephemeralExpiration) {
        if (G._trace) {
          G._trace.push({
            step: I.BQveZ,
            time: Date.now(),
          });
        }
        G.ephemeralExpiration = await aC(E, H.levanterId, G._trace);
        if (G._trace) {
          G._trace.push({
            step: I.ZBiGO,
            time: Date.now(),
          });
        }
      }
      if (I.JIAXy in F) {
        {
          if (G._trace) {
            G._trace.push({
              step: I.Pnxff,
              time: Date.now(),
            });
          }
          const Y = F.image.stream ? join(TEMP_DIR, G.fileName) : F.image;
          if (Buffer.isBuffer(Y) || I.nwRov(I.FwmlW, typeof Y)) {
            F.jpegThumbnail = await genThumbnail(Y);
          }
          if (G._trace) {
            G._trace.push({
              step: I.pzuOI,
              time: Date.now(),
            });
          }
        }
      } else if (I.BsaCX in F) {
        {
          if (G._trace) {
            G._trace.push({
              step: I.zAvqI,
              time: Date.now(),
            });
          }
          const Z = F.video.stream ? join(TEMP_DIR, G.fileName) : F.video;
          if (Buffer.isBuffer(Z) || I.LCAlG(I.FwmlW, typeof Z)) {
            {
              const { thumbnail: a1, duration: a2 } = await extractVideoThumb(Z);
              F.jpegThumbnail = a1;
              F.seconds = a2;
            }
          }
          if (G._trace) {
            G._trace.push({
              step: I.rNJqU,
              time: Date.now(),
            });
          }
        }
      }
      G.getUrlInfo = null;
      try {
        {
          if (G._trace) {
            G._trace.push({
              step: I.MJgxe,
              time: Date.now(),
            });
          }
          const a5 = await H.sendMessage(E, F, G);
          if (G._trace) {
            G._trace.push({
              step: I.ZtVUd,
              time: Date.now(),
            });
          }
          if (a5) {
            chats.set("" + a5.key.remoteJid + a5.key.id, a5);
          }
          if (process.env.EMIT_OWN_EVENT) {
            process.nextTick(() => {
              {
                const a7 = {
                  messages: [a5],
                  type: "notify",
                };
                H.processingMutex.mutex(() => H.ev.emit("messages.upsert", a7));
              }
            });
          }
          return a5;
        }
      } catch (a6) {
        {
          if (G._trace) {
            G._trace.push({
              step: I.xccnT,
              time: Date.now(),
              error: a6.message,
            });
          }
          throw a6;
        }
      }
    }
  }
  const J = {};
  if (I.OFAkO in F) {
    {
      if (!F.delete.fromMe && F.delete.me) {
        const a9 = F.delete.id;
        const aa = Math.floor(I.wjeNU(I.cuUUh(1, Date.now()), 1000));
        const ab = {
          id: a9,
          fromMe: false,
          timestamp: aa,
        };
        const ac = {
          messages: [ab],
        };
        const aD = {
          clear: ac,
        };
        return await H.chatModify(aD, E, []);
      }
      J.edit = !F.delete.fromMe && F.delete.remoteJid.endsWith(I.IVaDv) ? "8" : "7";
    }
  }
  G.ephemeralExpiration = G.ephemeralExpiration ?? (await aC(E, H.levanterId));
  G.upload = H.waUploadToServer;
  if (I.cqzkZ in F || I.NjiYz in F) {
    G.ephemeralExpiration = 0;
  }
  G.userJid = H.user.id;
  const K = await aB(F, G);
  const L = ak(E, K, G);
  try {
    await H.relayMessage(E, L.message, {
      messageId: L.key.id,
      additionalAttributes: J,
    });
    chats.set("" + L.key.remoteJid + L.key.id, L);
    if (process.env.EMIT_OWN_EVENT) {
      process.nextTick(() => {
        {
          const aE = {
            messages: [L],
            type: "notify",
          };
          H.processingMutex.mutex(() => H.ev.emit("messages.upsert", aE));
        }
      });
    }
    return L;
  } catch (aE) {
    config2.logger.error(aE);
  }
};
