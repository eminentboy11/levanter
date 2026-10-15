const fs = require("fs-extra");
const path = require("path");
const fluentFfmpeg = require("fluent-ffmpeg");
const { SabrStream } = require("googlevideo/sabr-stream");
const { buildSabrFormat } = require("googlevideo/utils");
const { BG } = require("bgutils-js");
const { JSDOM } = require("jsdom");
const config = require("./config");
const { TEMP_DIR } = require("./constant");
const { getYtCreds, saveYtCreds } = require("./yt-auth");
const lang = require("./lang");
(async () => {
  const H = {
    LrmCO: function (K, L) {
      return K == L;
    },
    MhmWC: "string",
    dHrNs: "youtubei.js",
  };
  const J = H;
  try {
    const K = (await import(J.dHrNs)).Platform;
    K.load({
      ...K.shim,
      eval: (L) => {
        const M = J.LrmCO(J.MhmWC, typeof L) ? L : L.output;
        return new Function(M)();
      },
    });
  } catch (L) {}
})();
let aC = null;
const loadYoutube = async () => aC || ((aC = await import("youtubei.js")), aC);
async function aE(K, L) {
  const M = {
    XAfCO: "Could not get visitor data",
    hLqCz: "O43z0dpjhgX20SCx4KAo",
    OSEUp: "Could not get challenge",
    HkOZN: "Could not load VM",
    RhHbh: "Failed to generate PO Token",
    gmgoM: "base64",
    gLNEo: "utf8",
  };
  if (!K) {
    throw new Error(M.XAfCO);
  }
  const N = new JSDOM();
  const P = globalThis.window;
  const Q = globalThis.document;
  const R = {
    window: N.window,
    document: N.window.document,
  };
  Object.assign(globalThis, R);
  try {
    const U = {
      fetch: (a0, a1) => fetch(a0, a1),
      globalObj: globalThis,
      identifier: K,
      requestKey: M.hLqCz,
    };
    const V = await BG.Challenge.create(U);
    if (!V) {
      throw new Error(M.OSEUp);
    }
    const W = V.interpreterJavascript?.privateDoNotAccessOrElseSafeScriptWrappedValue;
    if (!W) {
      throw new Error(M.HkOZN);
    }
    new Function(W)();
    const X = {
      program: V.program,
      globalName: V.globalName,
      bgConfig: U,
    };
    const Y = await BG.PoToken.generate(X);
    if (!Y || !Y.poToken) {
      throw new Error(M.RhHbh);
    }
    const Z = {
      visitorData: K,
      poToken: Y.poToken,
    };
    return Z;
  } catch (a0) {
    {
      let a2 = K;
      if (K && K.length > 20) {
        try {
          const a3 = Buffer.from(
            K.replace(/-/g, "+").replace(/_/g, "/").replace(/%3D/g, "="),
            M.gmgoM,
          );
          if (10 === a3[0]) {
            {
              const a4 = a3[1];
              const a5 = a3.slice(2, 2 + a4).toString(M.gLNEo);
              if (a5.length < 118) {
                a2 = a5;
              }
            }
          }
        } catch (a7) {}
      }
      return {
        visitorData: K,
        poToken: BG.PoToken.generateColdStartToken(a2),
      };
    }
  } finally {
    {
      if (undefined === P) {
        delete globalThis.window;
      } else {
        globalThis.window = P;
      }
      if (undefined === Q) {
        delete globalThis.document;
      } else {
        globalThis.document = Q;
      }
    }
  }
}
const aF = ["1080p", "720p", "480p", "360p", "240p", "144p"];
const aG = ["AUDIO_QUALITY_HIGH", "AUDIO_QUALITY_MEDIUM", "AUDIO_QUALITY_LOW"];
const aH = (H, J, K) => {
  if (J.includes(H)) {
    return H;
  }
  const N = K.indexOf(H);
  if (-1 === N) {
    return J[0];
  }
  for (let P = N + 1; P < K.length; P++) {
    if (J.includes(K[P])) {
      return K[P];
    }
  }
  for (let Q = N - 1; Q >= 0; Q--) {
    if (J.includes(K[Q])) {
      return K[Q];
    }
  }
  return J[0];
};
const aI = (G) => {
  if (G) {
    return config[G]?.env?.YT_COOKIE;
  }
};
const aJ = {};
const aK = async (G, H = "WEB") => {
  const J = {
    WAHJy: function (P, Q) {
      return P + Q;
    },
    JSgzD: "default",
  };
  const K = await loadYoutube();
  const L = J.WAHJy(J.WAHJy(G || J.JSgzD, "_"), H);
  if (aJ[L]) {
    return aJ[L];
  }
  const M = aI(G);
  const N = await K.Innertube.create({
    cache: new K.UniversalCache(false),
    cookie: M,
    generate_session_locally: true,
    client_type: H,
  });
  aJ[L] = N;
  return N;
};
const aL = async (K, L, M) => {
  const P = {
    uNcKB: "/player",
  };
  const Q = {
    pyv: true,
  };
  const R = K.actions.execute.bind(K.actions, P.uNcKB);
  const U = {
    videoId: L,
    playbackContext: {
      adPlaybackContext: Q,
      contentPlaybackContext: {
        vis: 0,
        splay: false,
        lactMilliseconds: "-1",
        signatureTimestamp: K.session.player?.signature_timestamp,
      },
    },
    serviceIntegrityDimensions: M
      ? {
          poToken: M,
        }
      : undefined,
    contentCheckOk: true,
    racyCheckOk: true,
  };
  const V = {
    ...U,
  };
  V.parse = true;
  return await R.call(K.actions, V);
};
const aM = async (H, J) => {
  const K = {
    EaqkO: "audio",
    VZYyk: "libmp3lame",
    GKdUo: "error",
    iqHyk: "end",
    SSUAc: "binary",
    MRJJz: function (P, Q) {
      return P === Q;
    },
  };
  const L = {
    flags: "w",
    encoding: K.SSUAc,
  };
  const M = fs.createWriteStream(J, L);
  const N = new WritableStream({
    write: (P) =>
      new Promise((Q, R) => {
        M.write(P, (V) => {
          if (V) {
            R(V);
          } else {
            Q();
          }
        });
      }),
    close() {
      {
        M.end();
      }
    },
  });
  await H.pipeTo(N);
  if (K.MRJJz(0, fs.statSync(J).size)) {
    throw new Error("Downloaded file is empty: " + J);
  }
};
const aN = (G, H, J) =>
  new Promise((K, L) => {
    const M = {
      XexFB: function (P, Q) {
        return P(Q);
      },
      KAmHR: "audio",
      nKaGQ: "libmp3lame",
      dhTBM: "error",
      MFrzK: "end",
    };
    const N = fluentFfmpeg(G);
    if (M.KAmHR === J) {
      N.audioBitrate(192).audioFrequency(44100).audioCodec(M.nKaGQ);
    }
    N.save(H)
      .on(M.dhTBM, (P, Q, R) => L(new Error("FFmpeg error: " + P.message + ". Stderr: " + R)))
      .on(M.MFrzK, () => {
        {
          try {
            const R = fs.readFileSync(H);
            K(R);
          } catch (U) {
            {
              M.XexFB(L, new Error("Failed to read output file: " + U.message));
            }
          }
        }
      });
  });
const aO = async (H) => {
  for (const L of H) {
    try {
      {
        if (fs.existsSync(L)) {
          fs.unlinkSync(L);
        }
      }
    } catch (N) {}
  }
};
const aP = ["WEB", "MWEB", "TV", "ANDROID", "ANDROID_VR", "TV_EMBEDDED", "IOS"];
let aQ = null;
const aR = (G) =>
  aQ ||
  ((aQ = Object.keys(G.Constants.CLIENTS).sort((H, J) => {
    const M = aP.indexOf(H);
    const N = aP.indexOf(J);
    if (-1 !== M && -1 !== N) {
      return M - N;
    } else if (-1 !== M) {
      return -1;
    } else if (-1 !== N) {
      return 1;
    } else {
      return 0;
    }
  })),
  aQ);
const aS = async (G, H, J, K = {}) => {
  const L = {
    JgNcA: function (W, X, Y) {
      return W(X, Y);
    },
    sNcTj: function (W, X) {
      return W(X);
    },
    FUGvG: "-c:v copy",
    CNjmk: "-c:a aac",
    jxRpm: "-map 0:v:0",
    umkDg: "-map 1:a:0",
    byyGg: "end",
    hmhFm: "error",
    zGbvC: "WEB",
    ruzxY: "update-credentials",
    xwEQm: "Unknown Video",
    OKPGY: "reloadPlayerResponse",
    venxL: "480p",
    ALuQJ: "AUDIO_QUALITY_MEDIUM",
    eSKTO: "audio",
    uIjHm: "video+audio",
    zyhPW: "best",
    plWgc: "mp4",
    nJRSj: "TV_EMBEDDED",
    HKvUb: "decipher",
    ssXzP: "cipher",
    uIJdn: "n function",
    BDNGQ: "{0}",
    FnDlz: "Unknown",
    NRFqU: "Unknown error",
  };
  const M = await loadYoutube();
  const N = aR(M);
  let P;
  const Q = async (W, X) => {
    const Z = M.Constants.CLIENTS[W].NAME;
    const a0 = await aK(H, Z);
    if (!a0.session.player) {
      await a0.session.upgradeToFullPlayer();
    }
    const a1 = a0.session.context.client.visitorData || G;
    const a2 = await aE(a1, G);
    const a3 = await M.Innertube.create({
      client_type: Z,
      cookie: aI(H),
      visitor_data: a1,
      po_token: L.zGbvC === Z ? a2.poToken : undefined,
      generate_session_locally: true,
      cache: new M.UniversalCache(false),
    });
    if (X) {
      a3.session.on(L.ruzxY, ({ credentials: af }) => {
        {
          L.JgNcA(saveYtCreds, H || "0", af).catch(() => {});
        }
      });
      await a3.session.signIn(X).catch(() => {});
    }
    const a4 = await a3.getBasicInfo(G);
    const a5 = a4.page;
    const a6 = Array.isArray(a5) ? a5[0] : a5;
    const a7 = {
      title: a4.basic_info?.title || L.xwEQm,
      duration: a4.basic_info?.duration,
      views: a4.basic_info?.view_count,
      author: a4.basic_info?.author,
      id: a4.basic_info?.id,
    };
    const { Constants: a8 } = M;
    const a9 = a6.streaming_data?.server_abr_streaming_url;
    const aa = a9 ? await a3.session.player?.decipher(a9) : null;
    const ab = (a6.streaming_data?.adaptive_formats || []).map(buildSabrFormat);
    let ac;
    let ad;
    if (a9) {
      {
        const ag = a6.player_config || a6.playerConfig;
        const ah = ag?.media_common_config || ag?.mediaCommonConfig;
        const ai = ah?.media_ustreamer_request_config || ah?.mediaUstreamerRequestConfig;
        const aj = new SabrStream({
          formats: ab,
          serverAbrStreamingUrl: aa,
          videoPlaybackUstreamerConfig:
            ai?.video_playback_ustreamer_config || ai?.videoPlaybackUstreamerConfig,
          poToken: a2.poToken,
          clientInfo: {
            clientName: L.sNcTj(
              parseInt,
              M.Constants.CLIENT_NAME_IDS[a3.session.context.client.clientName],
            ),
            clientVersion: a3.session.context.client.clientVersion,
          },
          fetch: (aY, aZ) => a3.session.http.fetch(aY, aZ),
        });
        aj.on(L.OKPGY, async (aY) => {
          const aZ = await aL(a3, G, a2.poToken);
          const b0 = aZ.streaming_data?.server_abr_streaming_url;
          const b1 = b0 ? await a3.session.player?.decipher(b0) : null;
          const b2 =
            aZ.player_config?.media_common_config.media_ustreamer_request_config
              ?.video_playback_ustreamer_config;
          if (b1 && b2) {
            aj.setStreamingURL(b1);
            aj.setUstreamerConfig(b2);
          }
        });
        const ak = [
          ...new Set(
            ab
              .filter((aY) => aY.mimeType?.includes("video"))
              .map((aY) => aY.qualityLabel)
              .filter(Boolean),
          ),
        ];
        const al = [
          ...new Set(
            ab
              .filter((aY) => aY.mimeType?.includes("audio"))
              .map((aY) => aY.audioQuality)
              .filter(Boolean),
          ),
        ];
        const aU = K.videoQuality || L.venxL;
        const aV = K.audioQuality || L.ALuQJ;
        const aW = {
          preferWebM: false,
          preferOpus: false,
          videoQuality: ak.length > 0 ? aH(aU, ak, aF) : aU,
          audioQuality: al.length > 0 ? aH(aV, al, aG) : aV,
          enabledTrackTypes: L.eSKTO === J ? 1 : 0,
        };
        const aX = await aj.start(aW);
        ac = aX.videoStream;
        ad = aX.audioStream;
      }
    } else {
      const aY = {
        type: L.eSKTO === J ? L.eSKTO : L.uIjHm,
        quality: L.zyhPW,
        format: L.plWgc,
      };
      const aZ = await a3.download(G, aY);
      if (L.eSKTO === J) {
        ad = aZ;
      } else {
        ac = aZ;
        ad = null;
      }
    }
    const ae = [];
    if (L.eSKTO === J) {
      const b0 = path.join(TEMP_DIR, G + "_audio.m4a");
      ae.push(b0);
      await aM(ad, b0);
      return {
        audioPath: b0,
        metadata: a7,
        tempFiles: ae,
      };
    }
    {
      {
        const b2 = path.join(TEMP_DIR, G + "_video.mp4");
        const b3 = path.join(TEMP_DIR, G + "_audio.m4a");
        ae.push(b2, b3);
        if (ad) {
          await Promise.all([aM(ac, b2), aM(ad, b3)]);
        } else {
          await aM(ac, b2);
          fs.copySync(b2, b3);
        }
        return {
          videoPath: b2,
          audioPath: b3,
          metadata: a7,
          tempFiles: ae,
        };
      }
    }
  };
  const R = await L.sNcTj(getYtCreds, H || "0").catch(() => null);
  if (R) {
    {
      const W = ["TV", L.nJRSj].filter((X) => M.Constants.CLIENTS[X]);
      for (const X of W) {
        try {
          return await Q(X, R);
        } catch (Y) {
          P = Y;
        }
      }
    }
  }
  for (const a0 of N) {
    try {
      return await Q(a0, null);
    } catch (a1) {
      P = a1;
    }
  }
  const U = !!aI(H) || !!R;
  const V =
    P?.message?.toLowerCase().includes(L.HKvUb) ||
    P?.message?.toLowerCase().includes(L.ssXzP) ||
    P?.message?.toLowerCase().includes(L.uIJdn);
  if (!U && V) {
    throw new Error(lang.extra.yt_auth_required.replace(L.BDNGQ, P?.message || L.FnDlz));
  }
  throw new Error("All clients failed to download. Last error: " + (P?.message || L.NRFqU));
};
const aT = (G, H, J) =>
  new Promise((K, L) => {
    const M = {
      PVmYs: "-c:v copy",
      EXwZa: "-c:a aac",
      vKDNt: "-map 0:v:0",
      WUSgf: "-map 1:a:0",
      KEUVv: "end",
      lZtmV: "error",
    };
    fluentFfmpeg()
      .input(G)
      .input(H)
      .outputOptions([M.PVmYs, M.EXwZa, M.vKDNt, M.WUSgf])
      .on(M.KEUVv, () => K())
      .on(M.lZtmV, (N, P, Q) =>
        L(new Error("Error merging files: " + N.message + ". Stderr: " + Q)),
      )
      .save(J);
  });
exports.getVideoInfo = async (H, J) => {
  const K = {
    COGDz: "Unknown",
  };
  const L = await aK(J);
  const M = await aL(L, H);
  const N = {
    id: H,
    title: M.video_details?.title || K.COGDz,
    duration: M.video_details?.duration,
    views: M.video_details?.view_count,
    author: M.video_details?.author,
    thumbnail: M.video_details?.thumbnails?.[0] || null,
  };
  return N;
};
exports.downloadAudio = async (G, H, J = {}) => {
  const K = {
    xLVnA: "audio",
  };
  try {
    const { audioPath: L, tempFiles: M } = await aS(G, H, K.xLVnA, J);
    const N = path.join(TEMP_DIR, G + ".mp3");
    M.push(N);
    const P = await aN(L, N, K.xLVnA);
    await aO(M);
    return P;
  } catch (Q) {
    {
      throw new Error("Failed to download audio: " + Q.message);
    }
  }
};
exports.downloadVideo = async (G, H, J = {}) => {
  const K = {
    TsLzP: function (L, M) {
      return L === M;
    },
    gjjfK: "video",
    JYFmE: function (L, M) {
      return L === M;
    },
  };
  try {
    {
      const { videoPath: L, audioPath: M, tempFiles: N } = await aS(G, H, K.gjjfK, J);
      const P = path.join(TEMP_DIR, G + "_merged.mp4");
      const Q = path.join(TEMP_DIR, G + "_out.mp4");
      N.push(P, Q);
      if (!fs.existsSync(L) || K.TsLzP(0, fs.statSync(L).size)) {
        throw new Error("Video file is missing or empty: " + L);
      }
      if (!fs.existsSync(M) || K.JYFmE(0, fs.statSync(M).size)) {
        throw new Error("Audio file is missing or empty: " + M);
      }
      await aT(L, M, P);
      const R = await aN(P, Q, K.gjjfK);
      await aO(N);
      return R;
    }
  } catch (V) {
    {
      throw new Error("Failed to download video: " + V.message);
    }
  }
};
exports.loadYoutube = loadYoutube;
