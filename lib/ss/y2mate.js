const ws = require("ws");
const a6 = {};
const a7 = "aWxvdmV5b3Vzb29vb29vbWF0Y2hidXRpZG9udGtub3d3aHlpbGlrZWxvdmV3YW50dQ==";
const { iChecker } = require("../test/test");
const a9 = iChecker();
const aa = a9 == a7;
if (aa) {
  const ab = "https://yt1d.io";
  const ac = ab + "/wp-admin/admin-ajax.php";
  const ad = "https://fpa-balancer.flashydl.space/get-server";
  const ae =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36";
  const af = /(?:v=|\/embed\/|\/shorts\/|youtu\.be\/|\/v\/)([-_0-9A-Za-z]{11})/;
  const ag = (A) => {
    if (/^[-_0-9A-Za-z]{11}$/.test(A)) {
      return A;
    }
    const C = String(A).match(af);
    if (C) {
      return C[1];
    } else {
      return A;
    }
  };
  const ah = (A) =>
    String(A || "video")
      .replace(/[\\/:*?"<>|]/g, "_")
      .slice(0, 100);
  async function ai() {
    const A = {
      uCCqV: function (D, E, F) {
        return D(E, F);
      },
      PfIOX: "text/html",
    };
    const B = await A.uCCqV(fetch, ab + "/", {
      headers: {
        "User-Agent": ae,
        Accept: A.PfIOX,
      },
    });
    const C = await B.text();
    return {
      path: new URL(B.url).pathname,
      nonce: (C.match(/name="yt1_nonce" value="([^"]+)"/) || [])[1],
      mergeNonce: (C.match(/"merge_nonce":"([^"]+)"/) || [])[1],
    };
  }
  async function aj(A) {
    const B = {
      YDQpe: "token",
      bBpZQ: "quality",
      sMmdV: function (G, H) {
        return G === H;
      },
      NjHjm: "has-audio",
      EBtHS: function (G, H, I) {
        return G(H, I);
      },
      WLIJd: "filesize",
      jRmVR: "title",
      qAljP: "merge-id",
      ODGGA: "merge-nonce",
      PnOvy: "no nonce on landing",
      UMvaS: function (G, H, I) {
        return G(H, I);
      },
      ADuxb: "POST",
      hzmoH: "application/x-www-form-urlencoded",
    };
    const { path: C, nonce: D, mergeNonce: E } = await ai();
    if (!D) {
      throw new Error(B.PnOvy);
    }
    const F = await B.UMvaS(fetch, ab + "/results/", {
      method: B.ADuxb,
      headers: {
        "User-Agent": ae,
        "content-type": B.hzmoH,
        Origin: ab,
        Referer: "" + ab + C,
      },
      body: new URLSearchParams({
        yt1_nonce: D,
        _wp_http_referer: C,
        yt_video_url: A,
      }),
    });
    return [...(await F.text()).matchAll(/<[^>]*data-token="[^"]*"[^>]*>/g)]
      .map((G) => {
        {
          const I = (J) => (G[0].match(new RegExp("data-" + J + '="([^"]*)"')) || [])[1];
          return {
            token: I(B.YDQpe),
            quality: I(B.bBpZQ),
            hasAudio: B.sMmdV("1", I(B.NjHjm)),
            size: B.EBtHS(parseInt, I(B.WLIJd), 10) || 0,
            title: I(B.jRmVR),
            mergeId: I(B.qAljP),
            mergeNonce: I(B.ODGGA) || E,
          };
        }
      })
      .filter((G) => G.token && G.quality);
  }
  async function ak(C) {
    const D = {
      VgIDQ: "action",
      fIDNX: "yt1_resolve_streams",
      NcxMO: "nonce",
      jGPGH: "token",
      OKvtp: "quality",
      TZcrK: function (J, K, L) {
        return J(K, L);
      },
      PsDgG: "POST",
      EdDio: "resolve failed",
    };
    const E = new FormData();
    E.append(D.VgIDQ, D.fIDNX);
    E.append(D.NcxMO, C.mergeNonce);
    E.append(D.jGPGH, C.token);
    E.append(D.OKvtp, C.quality);
    const F = {
      "User-Agent": ae,
      Referer: ab + "/results/",
    };
    const G = await D.TZcrK(fetch, ac, {
      method: D.PsDgG,
      headers: F,
      body: E,
    });
    const H = await G.json().catch(() => ({}));
    if (!H.success || !H.data) {
      throw new Error(D.EdDio);
    }
    const I = {
      videoUrl: H.data.video_url || "",
      audioUrl: H.data.audio_url || "",
    };
    return I;
  }
  async function al(B, C) {
    const D = {
      uSwYp: "action",
      SBdkN: "process_video_merge",
      HvAnz: "nonce",
      rXWPu: "request_data",
      oBRtZ: function (I, J, K) {
        return I(J, K);
      },
      XtgMZ: "POST",
      UzFhI: function (I, J) {
        return I + J;
      },
      psXjE: "merge start failed: ",
    };
    const E = new FormData();
    E.append(D.uSwYp, D.SBdkN);
    E.append(D.HvAnz, C);
    E.append(D.rXWPu, JSON.stringify(B));
    const F = {
      "User-Agent": ae,
      Referer: ab + "/results/",
    };
    const G = await D.oBRtZ(fetch, ac, {
      method: D.XtgMZ,
      headers: F,
      body: E,
    });
    const H = await G.json().catch(() => ({}));
    if (!H.success) {
      throw new Error(D.UzFhI(D.psXjE, JSON.stringify(H.data || H).slice(0, 120)));
    }
    return H;
  }
  async function am(C, D = 180000) {
    const E = {
      oESfa: "streams unavailable for this quality",
      lgvhw: "mp4",
      DkfEA: "header",
      CijFL: "m4a",
      oTJaw: "replace_audio_in_video",
      TDtAa: "CFgza",
      LQmfJ: "waSey",
      JparS: "render timeout",
      AMwRy: "aiQfD",
      OCnbi: "RRabZ",
      rcSox: "jEwKk",
      JhaeF: "jdMmo",
      yHOTw: "done",
      edhhO: function (I, J, K) {
        return I(J, K);
      },
      FRLNl: "message",
      kEjDh: "error",
      qtSRx: "no ws host",
    };
    const F = {
      "User-Agent": ae,
    };
    const G = {
      headers: F,
    };
    const H = (await (await fetch(ad, G)).text()).trim();
    if (!H) {
      throw new Error(E.qtSRx);
    }
    return new Promise((I, J) => {
      const K = {
        OnpWt: function (P, Q) {
          return P || Q;
        },
        MQBbQ: E.oESfa,
        QgSon: E.lgvhw,
        UEyEc: E.DkfEA,
        fRIXC: E.CijFL,
        HTlRU: function (P, Q) {
          return P(Q);
        },
        IrnVA: E.oTJaw,
        yCFFk: function (P, Q) {
          return P === Q;
        },
        oJSYg: E.TDtAa,
        OSOKv: E.LQmfJ,
        zAgnL: function (P, Q) {
          return P(Q);
        },
        iAbqq: E.JparS,
        VtFBi: E.AMwRy,
        aLqfg: E.OCnbi,
        QBQih: function (P, Q) {
          return P !== Q;
        },
        fGJMn: E.rcSox,
        dkBVI: E.JhaeF,
        tlDjD: function (P, Q) {
          return P === Q;
        },
        eoavF: E.yHOTw,
        nhWnV: function (P, Q) {
          return P(Q);
        },
        jfcPv: function (P, Q) {
          return P(Q);
        },
      };
      const L = {
        "User-Agent": ae,
      };
      const M = {
        headers: L,
      };
      const N = new ws("wss://" + H + "/pub/render/status_ws/" + C, M);
      const O = E.edhhO(
        setTimeout,
        () => {
          N.close();
          K.zAgnL(J, new Error(K.iAbqq));
        },
        D,
      );
      N.on(E.FRLNl, (P) => {
        let R;
        try {
          R = JSON.parse(P.toString());
        } catch {
          return;
        }
        if (K.eoavF === R.status && R.output?.url) {
          clearTimeout(O);
          N.close();
          I(R.output.url);
        } else if (R.error) {
          clearTimeout(O);
          N.close();
          K.jfcPv(J, new Error(JSON.stringify(R.error)));
        }
      });
      N.on(E.kEjDh, (P) => {
        clearTimeout(O);
        J(P);
      });
    });
  }
  async function an(F, G) {
    const H = {
      ATBvI: "no audio stream",
      CNqnP: "m4a",
      uaWce: "mp3",
      SfzPK: "no_process",
      JWgij: "video",
      ZHWnf: "audio",
      WIEeF: "NbDap",
      sgQdf: "streams unavailable for this quality",
      tGOGA: "mp4",
      QiCUg: "header",
      KYtnO: "replace_audio_in_video",
    };
    const { videoUrl: I, audioUrl: J } = await ak(F);
    if (H.JWgij === G && F.hasAudio && I) {
      return I;
    }
    const K = {
      size: 209715200,
      concurrency: 3,
    };
    const L = {
      id: F.mergeId + "_" + F.quality,
      ttl: 3600000,
      chunk: K,
    };
    const M = L;
    let N;
    if (H.ZHWnf === G) {
      {
        if (!J) {
          throw new Error(H.ATBvI);
        }
        const O = {
          url: J,
          ext: H.CNqnP,
        };
        N = {
          id: M.id,
          ttl: M.ttl,
          inputs: [O],
          output: {
            ext: H.uaWce,
            downloadName: ah(F.title) + "_MP3.mp3",
            chunkUpload: M.chunk,
          },
          operation: {
            type: H.SfzPK,
          },
        };
      }
    } else {
      if (!I || !J) {
        throw new Error(H.sgQdf);
      }
      const R = {
        url: I,
        ext: H.tGOGA,
        chunkDownload: {},
      };
      R.chunkDownload.type = H.QiCUg;
      R.chunkDownload.size = 52428800;
      R.chunkDownload.concurrency = 3;
      const S = {
        url: J,
        ext: H.CNqnP,
      };
      N = {
        id: M.id,
        ttl: M.ttl,
        inputs: [R, S],
        output: {
          ext: H.tGOGA,
          downloadName: ah(F.title) + "_" + F.quality + ".mp4",
          chunkUpload: M.chunk,
        },
        operation: {
          type: H.KYtnO,
        },
      };
    }
    await al(N, F.mergeNonce);
    return am(N.id);
  }
  exports.y2mate = {
    get: async function (B, C) {
      const D = {
        ccRuj: function (E, F) {
          return E(F);
        },
        JUYqH: "MP3",
        ulvGH: "128kbps mp3",
        kSaaB: "[y2mate.get]",
      };
      try {
        const E = ag(B);
        const F = await D.ccRuj(aj, "https://www.youtube.com/watch?v=" + E);
        if (!F.length) {
          return false;
        }
        const G = {};
        const H = {};
        for (const K of F) {
          if (D.JUYqH === K.quality) {
            H[D.ulvGH] = K;
          } else {
            G[K.quality] = K;
          }
        }
        const I = {
          title: F[0].title,
          thumbnail: "https://i.ytimg.com/vi/" + E + "/hqdefault.jpg",
          time: "",
          video: G,
          audio: H,
          id: E,
        };
        const J = I;
        a6[B] = J;
        return J;
      } catch (L) {
        {
          console.error(D.kSaaB, L.message);
          return false;
        }
      }
    },
    dl: async function (A, B, C) {
      const D = {
        dChxP: "audio",
        RmaXM: "128kbps mp3",
        lfroU: "video",
        tFKGI: "[y2mate.dl]",
      };
      try {
        const E = a6[A] || (await this.get(A), a6[A]);
        if (!E) {
          return false;
        }
        if (D.dChxP === B) {
          const G = E.audio[D.RmaXM] || Object.values(E.audio)[0];
          return !!G && (await an(G, D.dChxP));
        }
        const F = E.video[C] || E.video[Object.keys(E.video)[0]];
        return !!F && (await an(F, D.lfroU));
      } catch (H) {
        {
          console.error(D.tFKGI, H.message);
          return false;
        }
      }
    },
  };
}
