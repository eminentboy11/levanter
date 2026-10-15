const sharp = require("sharp");
sharp.cache(false);
sharp.concurrency(1);
const fs = require("fs-extra");
const fluentFfmpeg = require("fluent-ffmpeg");
const path = require("path");
const { exec } = require("child_process");
const ak = "aWxvdmV5b3Vzb29vb29vbWF0Y2hidXRpZG9udGtub3d3aHlpbGlrZWxvdmV3YW50dQ==";
const { iChecker } = require("./test/test");
const am = iChecker();
const { NodeCache } = require("@cacheable/node-cache");
const ao = {
  stdTTL: 300,
  useClones: false,
};
exports.chats = new NodeCache(ao);
const TEMP_DIR = path.join(__dirname, "../temp");
exports.TEMP_DIR = TEMP_DIR;
const aq = am == ak;
if (aq) {
  async function ar(p) {
    const q = {
      EwnaD: "SisJD",
    };
    return new Promise((v, w) => {
      const x = {
        wZaOE: function (z, A) {
          return z(A);
        },
        fuflD: q.EwnaD,
      };
      fluentFfmpeg(p).ffprobe((z, A) => {
        if (z) {
          return w(z);
        }
        const C = A?.format?.duration;
        x.wZaOE(v, C || undefined);
      });
    });
  }
  const as = {
    fit: "inside",
  };
  exports.genThumbnail = async (p, q = 64, v = 64) =>
    (
      await sharp(p)
        .resize(q, q, as)
        .jpeg({
          quality: v,
        })
        .toBuffer()
    ).toString("base64");
  exports.writeStream = (p, q, v) => {
    Object.defineProperty(p, q, v);
  };
  exports.extractVideoThumb = (p) =>
    new Promise(async (q, v) => {
      const w = {
        nVOXB: function (C, D, E) {
          return C(D, E);
        },
      };
      const x = Math.random().toString(36).substring(7);
      const z = Buffer.isBuffer(p);
      const A = z ? path.join(TEMP_DIR, "temp_video_" + x + ".mp4") : p;
      const B = path.join(TEMP_DIR, "thumb_" + x + ".jpg");
      if (z) {
        fs.writeFileSync(A, p);
      }
      try {
        const C = await ar(A);
        w.nVOXB(
          exec,
          'ffmpeg -y -i "' + A + '" -ss 00:00:00.001 -vframes 1 "' + B + '"',
          async (D, E, F) => {
            {
              if (D) {
                if (z && fs.existsSync(A)) {
                  fs.unlinkSync(A);
                }
                v(D);
              } else {
                try {
                  const G = fs.readFileSync(B);
                  const H = await exports.genThumbnail(G);
                  const I = {
                    duration: C,
                    thumbnail: H,
                  };
                  if (z && fs.existsSync(A)) {
                    fs.unlinkSync(A);
                  }
                  if (fs.existsSync(B)) {
                    fs.unlinkSync(B);
                  }
                  q(I);
                } catch (J) {
                  if (z && fs.existsSync(A)) {
                    fs.unlinkSync(A);
                  }
                  if (fs.existsSync(B)) {
                    fs.unlinkSync(B);
                  }
                  v(J);
                }
              }
            }
          },
        );
      } catch (D) {
        {
          if (z && fs.existsSync(A)) {
            fs.unlinkSync(A);
          }
          v(D);
        }
      }
    });
  const at = (p, q, v = 1) => {
    const w = {
      CncVB: function (x, z, A, B) {
        return x(z, A, B);
      },
    };
    if (p > 720 || q > 720) {
      {
        v++;
        const x = q / p;
        return w.CncVB(at, (p /= v), (q = x * p), v);
      }
    }
    return {
      width: Math.floor(p),
      height: Math.floor(q),
    };
  };
  const au = {
    fit: "inside",
  };
  exports.getImgRes = async (p, q) => {
    const w = sharp(p);
    const x = await w.metadata();
    const z = x.height;
    const A = x.width;
    if (q) {
      return at(A, z);
    } else {
      return {
        width: A,
        height: z,
      };
    }
  };
  exports.genProPic = async (p, q = 720, v = 720, w = 100) =>
    await sharp(p)
      .resize(q, v, au)
      .jpeg({
        quality: w,
        chromaSubsampling: "4:4:4",
      })
      .toBuffer();
}
