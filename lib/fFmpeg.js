const fluentFfmpeg = require("fluent-ffmpeg");
const fs = require("fs-extra");
const { exec } = require("child_process");
const webpmux = require("node-webpmux");
const { join, basename } = require("path");
const config = require("./config");
const aX = "aWxvdmV5b3Vzb29vb29vbWF0Y2hidXRpZG9udGtub3d3aHlpbGlrZWxvdmV3YW50dQ==";
const { iChecker } = require("./test/test");
const aZ = iChecker();
const googleTts = require("google-tts-api");
const sharp = require("sharp");
sharp.cache(false);
sharp.concurrency(1);
const { TEMP_DIR } = require("./constant");
const b3 = aZ == aX;
const b5 = (y) => {
  const A = {
    oWtFU: "mention",
  };
  if (y && !y.includes(A.oWtFU)) {
    fs.unlink(y, () => {});
  }
};
if (b3) {
  const b6 = async function (y, z, A, B, C = ["🥰"], D = {}) {
    const E = {
      qmvwb: "false",
      slzso: "a855bd1fa49c0a05940f8ec2f47dca0b64bbd801e3b2d29e1f654574d4b294c5",
      gJvKA: "utf8",
    };
    const [F, G] =
      E.qmvwb == config[A].env.STICKER_PACKNAME ? [] : config[A].env.STICKER_PACKNAME.split(",");
    B = B || G;
    if (!Array.isArray(C)) {
      C = [C];
    }
    if (z) {
      {
        const [N, O, P] = z.split(",");
        z = N;
        B = O;
        C = P;
      }
    } else {
      z = F;
    }
    let H = new webpmux.Image();
    const I = {
      "sticker-pack-id": E.slzso,
      "sticker-pack-name": z,
      "sticker-pack-publisher": B,
      emojis: C,
      ...D,
    };
    const J = I;
    let K = Buffer.from([73, 73, 42, 0, 8, 0, 0, 0, 1, 0, 65, 87, 7, 0, 0, 0, 0, 0, 22, 0, 0, 0]);
    let L = Buffer.from(JSON.stringify(J), E.gJvKA);
    let M = Buffer.concat([K, L]);
    M.writeUIntLE(L.length, 14, 4);
    await H.load(y);
    H.exif = M;
    return await H.save(null);
  };
  exports.addExif = b6;
  const b8 = {
    nonanimated: [
      "-y",
      "-vcodec libwebp",
      "-vf",
      "scale=2006:2006:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2006:2006:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1",
    ],
    newnonanimated: [
      "-vcodec",
      "libwebp",
      "-vf",
      "crop=w='min(min(iw,ih),512)':h='min(min(iw,ih),512)',scale=2006:2006,setsar=1",
    ],
    animated2: [
      "-t",
      "15",
      "-vf",
      "scale=512:512:force_original_aspect_ratio=decrease,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=white@0,fps=15",
      "-c:v",
      "libwebp",
      "-lossless",
      "0",
      "-loop",
      "1",
      "-preset",
      "default",
      "-an",
      "-pix_fmt",
      "yuva420p",
    ],
    animated1: [
      "-y",
      "-vf",
      "scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1,fps=20",
      "-lossless 0",
      "-preset default",
      "-loop 0",
      "-an",
      "-vsync 0",
      "-s 512:512",
    ],
    newanimated1: [
      "-vcodec",
      "libwebp",
      "-vf",
      "crop=w='min(min(iw,ih),512)':h='min(min(iw,ih),512)',scale=512:512,setsar=1",
      "-loop",
      "0",
      "-lossless 1",
      "-preset",
      "default",
      "-an",
      "-vsync",
      "0",
      "-s",
      "512:512",
    ],
    newanimated2: [
      "-vcodec",
      "libwebp",
      "-vf",
      "crop=w='min(min(iw,ih),512)':h='min(min(iw,ih),512)',scale=512:512,setsar=1,fps=20",
      "-loop",
      "0",
      "-lossless 0",
      "-preset",
      "default",
      "-an",
      "-vsync",
      "0",
      "-s",
      "512:512",
    ],
    left: ["-vf", "transpose=2"],
    right: ["-vf", "transpose=1"],
    flip: ["-vf", "transpose=2,transpose=2"],
    videor: ["-y", "-vf", "reverse", "-af", "areverse"],
    audior: ["-y", "-af", "areverse"],
    compress: ["-vcodec", "libx265", "-crf", "28"],
    mp3: ["-vn", "-acodec", "libmp3lame", "-q:a", "2"],
    wamp4: ["-c:v", "copy", "-c:a", "aac", "-movflags", "+faststart"],
    opus: [
      "-vn",
      "-map_metadata",
      "-1",
      "-acodec",
      "libopus",
      "-ac",
      "1",
      "-ar",
      "48000",
      "-b:a",
      "64k",
      "-f",
      "ogg",
    ],
    m4a: ["-vn", "-c:a", "copy"],
    mp3_high: ["-vn", "-acodec", "libmp3lame", "-b:a", "256k"],
    tts: ["-vn", "-acodec", "libopus"],
    photo: [],
    lowmp3: ["-y", "-af", "asetrate=44100*1.3", "-c:a", "libmp3lame", "-q:a", "2"],
    avec: [
      "-y",
      "-filter_complex",
      "[0:a]avectorscope=s=720x1280:rf=5:gf=25:bf=5:draw=line,format=yuv420p[v]",
      "-map",
      "[v]",
      "-map 0:a",
    ],
    pitch: ["-y", "-af", "asetrate=44100*0.9", "-c:a", "libmp3lame", "-q:a", "2"],
    bass: ["-y", "-af", "bass=g=10"],
    treble: ["-y", "-af", "treble=g=10"],
    histo: [
      "-filter_complex",
      "[0:a]ahistogram=s=hd480:slide=scroll:scale=log,format=yuv420p[v]",
      "-map",
      "[v]",
      "-map",
      "0:a",
      "-b:a",
      "360k",
    ],
    vector: [
      "-filter_complex",
      "[0:a]avectorscope=s=512x512:zoom=1.5:rc=0:gc=200:bc=0:rf=0:gf=40:bf=0,format=yuv420p[v]",
      "-map",
      "[v]",
      "-map",
      "0:a",
      "-b:v",
      "700k",
      "-b:a",
      "360k",
    ],
    crop: ["-y", "-vf", "crop=cw:ch:w:h"],
  };
  exports.getFfmpegBuffer = async (x, y, z) => {
    const A = {
      nXxdt: function (G, H) {
        return G(H);
      },
      FIAgA: function (G, H) {
        return G + H;
      },
      PSsIy: function (G, H) {
        return G + H;
      },
      hoabl: "return (function() ",
      VQpIt: '{}.constructor("return this")( )',
      twdPC: function (G) {
        return G();
      },
      KLXwf: function (G, H) {
        return G(H);
      },
      RedRl: function (G, H) {
        return G(H);
      },
      OVUIt: function (G, H) {
        return G !== H;
      },
      KYwGV: "RkseO",
      JUswI: "DWQwK",
      BWmfo: function (G, H) {
        return G(H);
      },
      BGwbH: function (G, H) {
        return G(H);
      },
      yYRCM: function (G, H) {
        return G === H;
      },
      WJoKr: "BYqpr",
      yJHSa: "error",
      tJSvQ: "end",
      xpFxT: "false",
      OOJoo: function (G, H) {
        return G != H;
      },
      TtPLz: function (G, H, I) {
        return G(H, I);
      },
    };
    let B = A.xpFxT;
    let C = A.xpFxT;
    if (/bass,/.test(z)) {
      B = z.split(",")[1];
      z = z.split(",")[0];
    }
    if (/treble,/.test(z)) {
      C = z.split(",")[1];
      z = z.split(",")[0];
    }
    let D = [...b8[z]];
    if (A.xpFxT != B) {
      D[2] = "bass=g=" + B;
    }
    if (A.xpFxT != C) {
      D[2] = "treble=g=" + C;
    }
    let E = fluentFfmpeg(x);
    const F = join(TEMP_DIR, y);
    return await new Promise(function (G, H) {
      const I = {
        tcHkc: function (J, K) {
          return J(K);
        },
        DhwCo: A.KYwGV,
        XBWsv: A.JUswI,
      };
      {
        E.outputOptions(D)
          .save(F)
          .on(A.yJHSa, (J, K, L) => {
            b5(x);
            b5(F);
            I.tcHkc(H, new Error("FFmpeg error: " + J.message + ". Stderr: " + L));
          })
          .on(A.tJSvQ, async () => {
            b5(x);
            const J = fs.readFileSync(F);
            b5(F);
            G(J);
          });
      }
    });
  };
  const b9 = (x) =>
    new Promise((y) => {
      fluentFfmpeg.ffprobe(x, (A, B) => {
        {
          y(B);
        }
      });
    });
  exports.cropsticker = (x, y, z = 1, A, B = "🥰") => {
    const C = {
      wOMGb: "black failed",
      hDRbV: "azpNI",
      wHuYF: "DCUie",
      KgXyT: "error",
      HOLWL: "end",
      eEovN: function (F, G, H) {
        return F(G, H);
      },
    };
    A = A ?? "0";
    let D = b8.newnonanimated;
    if (2 == z) {
      D = b8.newanimated1;
    }
    if (3 == z) {
      D = b8.newanimated2;
    }
    const E = C.eEovN(join, TEMP_DIR, x + "c.webp");
    return new Promise(function (F, G) {
      const H = {
        aysZo: function (I, J) {
          return I(J);
        },
        QcpmJ: C.wOMGb,
        GOtqm: function (I, J) {
          return I(J);
        },
        DsCLM: function (I, J) {
          return I(J);
        },
        veLKa: function (I, J) {
          return I(J);
        },
        VcDQV: function (I, J) {
          return I !== J;
        },
        inEHW: C.hDRbV,
        pWiQW: C.wHuYF,
        KXwTM: function (I, J, K, L, M, N) {
          return I(J, K, L, M, N);
        },
      };
      {
        fluentFfmpeg(y)
          .outputOptions(D)
          .save(E)
          .on(C.KgXyT, (J) => G(new Error(J.message)))
          .on(C.HOLWL, async () => {
            const J = await H.KXwTM(b6, E, undefined, A, undefined, [B]).catch(
              (K) => new Error(K.message),
            );
            b5(y);
            b5(E);
            F(J);
          });
      }
    });
  };
  exports.sticker = (x, y, z = 1, A, B = "🥰") => {
    const C = {
      rCssW: "error",
      KovZw: "webp",
      MLASz: "end",
      QHTdF: function (F, G, H) {
        return F(G, H);
      },
    };
    A = A ?? "0";
    let D = b8.nonanimated;
    if (2 == z) {
      D = b8.animated2;
    }
    if (3 == z) {
      D = b8.animated1;
    }
    const E = C.QHTdF(join, TEMP_DIR, x + ".webp");
    return new Promise((F, G) => {
      const H = {
        lSuLW: function (I, J, K, L, M, N) {
          return I(J, K, L, M, N);
        },
      };
      fluentFfmpeg(y)
        .addOutputOptions(D)
        .save(E)
        .on(C.rCssW, (I) => G(I.message))
        .toFormat(C.KovZw)
        .on(C.MLASz, async () => {
          const I = await H.lSuLW(b6, fs.readFileSync(E), undefined, A, undefined, [B]).catch((J) =>
            G(J.message),
          );
          b5(y);
          b5(E);
          F(I);
        });
    });
  };
  exports.audioCut = (x, y, z, A = "cut") => {
    const B = {
      tdqZh: "PAOCd",
      vmpyG: "ijwkN",
      bwavR: "error",
      kBsUE: "end",
      ivvqv: function (D, E, F) {
        return D(E, F);
      },
    };
    const C = B.ivvqv(join, TEMP_DIR, A + ".mp3");
    return new Promise(function (D, E) {
      const F = {
        tcNPq: B.tdqZh,
        WPzUY: B.vmpyG,
      };
      fluentFfmpeg(x)
        .setStartTime(y)
        .setDuration(z)
        .save(C)
        .on(B.bwavR, (G) => E(new Error(G.message)))
        .on(B.kBsUE, () => {
          const G = fs.readFileSync(C);
          D(G);
          b5(x);
          b5(C);
        });
    });
  };
  exports.avm = (x) => {
    const y = {
      YJoDK: "-map",
      yMaGm: "0:v",
      BKLvY: "1:a",
      ghOBc: "-c:v",
      TOUNB: "copy",
      ztzyR: "-shortest",
      EUTwJ: "error",
      crVLK: "end",
      ulCNu: "audvid.mp4",
      cVVaP: "avm",
    };
    x = x.reverse();
    const z = join(TEMP_DIR, y.ulCNu);
    const A = join(TEMP_DIR, y.cVVaP);
    return new Promise(function (B, C) {
      const D = {
        FJfIw: function (E, F) {
          return E(F);
        },
      };
      {
        let E = fluentFfmpeg();
        x.forEach((F) => E.input(join(A, F)));
        E.outputOptions([y.YJoDK, y.yMaGm, y.YJoDK, y.BKLvY, y.ghOBc, y.TOUNB, y.ztzyR]);
        E.save(z);
        E.on(y.EUTwJ, (F) => C(new Error(F.message)));
        E.on(y.crVLK, () => {
          fs.emptyDirSync(A);
          D.FJfIw(B, fs.readFileSync(z));
          b5(z);
        });
      }
    });
  };
  exports.videoHeightWidth = async (y) => {
    const { streams: A } = await b9(y);
    const B = {
      width: A[0].width,
      height: A[0].height,
    };
    return B;
  };
  exports.videoTrim = (x, y, z) => {
    const A = {
      BWAtQ: "copy",
      Cfwkz: "error",
      BIiRL: "end",
      sDxXt: "videotrim.mp4",
    };
    const B = join(TEMP_DIR, A.sDxXt);
    return new Promise(function (C, D) {
      {
        fluentFfmpeg(x)
          .setStartTime(y.trim())
          .setDuration(z.trim())
          .withVideoCodec(A.BWAtQ)
          .withAudioCodec(A.BWAtQ)
          .on(A.Cfwkz, (F) => D(new Error(F.message)))
          .save(B)
          .on(A.BIiRL, async () => {
            let F = fs.readFileSync(B);
            b5(B);
            b5(x);
            C(F);
          });
      }
    });
  };
  const ba = (x) =>
    new Promise((y, z) => {
      const A = {
        fepGS: function (B, C, D) {
          return B(C, D);
        },
        uXdhU: function (B, C) {
          return B(C);
        },
        nvmyv: "-map",
        lRtGN: "0:v",
        OSZMn: "1:a",
        qgUdi: "-c:v",
        fDiXf: "copy",
        KGGBr: "-shortest",
        PVShE: "error",
        QpgKT: "end",
      };
      A.fepGS(exec, x, (B, C, D) => {
        {
          if (B) {
            A.uXdhU(z, new Error(D || B.message));
          } else {
            y(C);
          }
        }
      });
    });
  const bb = async (x) => {
    const y = {
      Wabbn: function (z, A) {
        return z > A;
      },
      UrGNK: function (z, A) {
        return z(A);
      },
    };
    try {
      return y.Wabbn(
        (
          await y.UrGNK(
            ba,
            'ffprobe -v error -select_streams a -show_entries stream=index -of csv=p=0 "' + x + '"',
          )
        ).trim().length,
        0,
      );
    } catch {
      {
        return false;
      }
    }
  };
  const bc = async (x) => {
    const y = {
      WmOxz: function (I, J) {
        return I(J);
      },
      OlWEb: function (I, J) {
        return I - J;
      },
      fQveM: function (I, J) {
        return I - J;
      },
    };
    const z = await y.WmOxz(
      ba,
      'ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate -of csv=p=0:s=x "' +
        x +
        '"',
    );
    const [A, B, C] = z.trim().split("x");
    const [D, E] = C.split("/").map((I) => parseInt(I, 10));
    const F = E ? D / E : D;
    const G = parseInt(A, 10);
    const H = parseInt(B, 10);
    return {
      width: y.OlWEb(G, G % 2),
      height: y.fQveM(H, H % 2),
      fps: F,
    };
  };
  exports.mergeVideo = async () => {
    const x = {
      xTZXw: function (H, I) {
        return H(I);
      },
      BBqzB: "video.txt",
      unCgz: "merge.mp4",
      CpLSW: "merge",
      LDknb: "No videos to merge",
      XxbSP: function (H, I, J) {
        return H(I, J);
      },
      UIaGN: function (H, I) {
        return H(I);
      },
      BwXhV: function (H, I) {
        return H + I;
      },
    };
    const y = join(TEMP_DIR, x.BBqzB);
    const z = join(TEMP_DIR, x.unCgz);
    const A = join(TEMP_DIR, x.CpLSW);
    const B = fs.readdirSync(A).sort((H, I) => parseInt(H, 10) - parseInt(I, 10));
    if (0 === B.length) {
      throw new Error(x.LDknb);
    }
    const C = [];
    for (const H of B) {
      C.push(await x.xTZXw(bc, join(A, H)));
    }
    const D = C.reduce((I, J) => (J.width * J.height > I.width * I.height ? J : I));
    const E = D.width;
    const F = D.height;
    const G =
      "scale=" +
      E +
      ":" +
      F +
      ":force_original_aspect_ratio=decrease,pad=" +
      E +
      ":" +
      F +
      ":(ow-iw)/2:(oh-ih)/2,setsar=1,fps=" +
      Math.round(Math.max(...C.map((I) => I.fps)));
    try {
      const I = [];
      for (let J = 0; J < B.length; J++) {
        const K = join(A, B[J]);
        const L = x.XxbSP(join, A, "norm_" + J + ".mp4");
        const M = (await bb(K))
          ? 'ffmpeg -y -i "' +
            K +
            '" -vf "' +
            G +
            '" -map 0:v:0 -map 0:a:0 -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -c:a aac -ar 48000 -ac 2 -b:a 192k "' +
            L +
            '"'
          : 'ffmpeg -y -i "' +
            K +
            '" -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=48000 -vf "' +
            G +
            '" -map 0:v:0 -map 1:a:0 -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -c:a aac -ar 48000 -ac 2 -b:a 192k -shortest "' +
            L +
            '"';
        await ba(M);
        I.push(L);
      }
      fs.writeFileSync(y, x.BwXhV(I.map((N) => "file '" + N + "'").join("\n"), "\n"));
      await x.UIaGN(ba, 'ffmpeg -y -f concat -safe 0 -i "' + y + '" -c copy "' + z + '"');
      return fs.readFileSync(z);
    } finally {
      {
        fs.emptyDirSync(A);
        if (fs.existsSync(z)) {
          fs.unlinkSync(z);
        }
        if (fs.existsSync(y)) {
          fs.unlinkSync(y);
        }
      }
    }
  };
  exports.blackVideo = (x) => {
    const y = {
      ElNIi: "black failed",
      MQMNS: function (B, C, D) {
        return B(C, D);
      },
      OLTZx: "../media/black.jpg",
      lFQvq: "copy",
      mvSEg: "error",
      uFgix: "end",
      fYhZn: "toblack.aac",
      lLVcL: "black.mp4",
    };
    const z = join(TEMP_DIR, y.fYhZn);
    const A = join(TEMP_DIR, y.lLVcL);
    return new Promise(function (B, C) {
      {
        y.MQMNS(exec, 'ffmpeg -y -i "' + x + '" "' + z + '"', () => {
          const F = {
            Mybuw: function (G, H) {
              return G(H);
            },
            hdaGu: y.ElNIi,
          };
          y.MQMNS(
            exec,
            'ffmpeg -y -loop 1 -framerate 1 -i "' +
              join(__dirname, y.OLTZx) +
              '" -i "' +
              z +
              '" -map 0 -map 1:a -c:v libx264 -preset ultrafast -profile:v baseline -tune stillimage -vf "scale=\'min(360,iw)\':-2,format=yuv420p" -c:a copy -shortest "' +
              A +
              '"',
            (G) => {
              if (G) {
                F.Mybuw(C, new Error(F.hdaGu));
              } else {
                const H = fs.readFileSync(A);
                b5(x);
                b5(A);
                b5(z);
                B(H);
              }
            },
          );
        });
      }
    });
  };
  exports.cropVideo = (x, y, z, A, B) => {
    const C = {
      uTMgz: function (E, F) {
        return E(F);
      },
      qZqLX: "copy",
      HEpGh: "error",
      EYAGm: "end",
      gjbrd: function (E, F, G) {
        return E(F, G);
      },
      lwZEJ: "videotrim.mp4",
      AqpwM: "crop failed",
      GxdYx: "Nixcv",
      dyyoj: "lPWeY",
      CLZlh: "croped.mp4",
    };
    const D = join(TEMP_DIR, C.CLZlh);
    return new Promise(function (E, F) {
      C.gjbrd(
        exec,
        'ffmpeg -y -i "' +
          x +
          '" -vf "crop=' +
          y +
          ":" +
          z +
          ":" +
          A +
          ":" +
          B +
          '" -c:v libx264 -crf 1 -c:a copy "' +
          D +
          '"',
        (G) => {
          const H = {};
          {
            if (G) {
              C.uTMgz(F, new Error(C.AqpwM));
            } else {
              const J = fs.readFileSync(D);
              b5(D);
              b5(x);
              E(J);
            }
          }
        },
      );
    });
  };
}
exports.gifToVideo = async (x) => {
  const y = {
    zaGtj: "-pix_fmt yuv420p",
    gRktK: "-c:v libx264",
    lUCJk: "-movflags +faststart",
    hiPYv: "-filter:v crop='floor(in_w/2)*2:floor(in_h/2)*2'",
    kavEy: "error",
    nFYsK: "end",
    qUMbz: function (A, B, C) {
      return A(B, C);
    },
  };
  const z = y.qUMbz(join, TEMP_DIR, basename(x) + ".mp4");
  return new Promise(function (A, B) {
    {
      fluentFfmpeg(x)
        .save(z)
        .outputOptions([y.zaGtj, y.gRktK, y.lUCJk, y.hiPYv])
        .on(y.kavEy, (C) => B(new Error(C.message)))
        .on(y.nFYsK, function () {
          {
            const E = fs.readFileSync(z);
            A(E);
            b5(x);
            b5(z);
          }
        });
    }
  });
};
exports.videoToGif = async (x) => {
  const y = {
    GYcAx: "lIiWP",
    sjnSk: "error",
    amoCn: "end",
    qfziI: function (A, B, C) {
      return A(B, C);
    },
  };
  const z = y.qfziI(join, TEMP_DIR, basename(x) + ".gif");
  return new Promise(function (A, B) {
    const C = {
      VXFZQ: y.GYcAx,
    };
    fluentFfmpeg(x)
      .save(z)
      .on(y.sjnSk, (D) => B(new Error(D.message)))
      .on(y.amoCn, function () {
        const D = {
          QAKtB: function (E, F) {
            return E(F);
          },
        };
        const E = fs.readFileSync(z);
        A(E);
        b5(x);
        b5(z);
      });
  });
};
exports.circleSticker = async (y, z, A) => {
  const B = {
    VXHow: "cover",
    peJoa:
      '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">\n\t<circle cx="256" cy="256" r="254" fill="rgba(0, 0, 0, 0)"/>\n\t\t\t</svg>',
    VaYgC: "dest-in",
    kniBM:
      '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">\n\t\t\t  <circle cx="256" cy="256" r="254" fill="rgba(255, 255, 255, 0)" stroke="rgba(110, 110, 110, 1)" stroke-width="2" />\n\t\t\t</svg>',
    yKFvC: "over",
  };
  A = A ?? "0";
  const C = z ? await exports.videoToGif(y) : fs.readFileSync(y);
  const D = {
    quality: 100,
    lossless: false,
  };
  b5(y);
  return await exports.addExif(
    await sharp(C)
      .resize(512, 512, {
        fit: B.VXHow,
      })
      .composite([
        {
          input: Buffer.from(B.peJoa),
          blend: B.VaYgC,
        },
        {
          input: Buffer.from(B.kniBM),
          blend: B.yKFvC,
        },
      ])
      .webp(D)
      .toBuffer(),
    undefined,
    A,
    undefined,
    [],
  );
};
exports.SpeachToText = async (y, z) => {
  const A = {
    gBebg: function (D, E) {
      return D(E);
    },
    QDSub: "mention",
    ClASI: "libopus",
    JysRq: "end",
    qVrWy: "tts.mp3",
    dNzVA: "tts.opus",
    bJkFA: "https://translate.google.com",
    CQiMK: "base64",
  };
  const B = join(TEMP_DIR, A.qVrWy);
  const C = join(TEMP_DIR, A.dNzVA);
  try {
    const D = {
      lang: y,
      slow: false,
      host: A.bJkFA,
    };
    const E = await googleTts.getAllAudioBase64(z, D);
    fs.writeFileSync(B, Buffer.from(E.map((F) => F.base64).join(), A.CQiMK), {
      encoding: A.CQiMK,
    });
    return new Promise(function (F) {
      fluentFfmpeg(B)
        .audioCodec(A.ClASI)
        .save(C)
        .on(A.JysRq, async () => {
          {
            b5(B);
            A.gBebg(F, fs.readFileSync(C));
            b5(C);
          }
        });
    });
  } catch (F) {
    throw new Error(F.message);
  }
};
