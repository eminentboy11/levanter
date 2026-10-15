const { loadBaileys } = require("../baileys");
let Z;
const Base = require("./Base");
const { createWriteStream } = require("fs-extra");
const { join } = require("path");
const { TEMP_DIR } = require("../constant");
class a4 extends Base {
  constructor(l, n) {
    super(l);
    if (n) {
      this._patch(n);
    }
  }
  _patch(u) {
    const v = {
      PcdAM: "imageMessage",
      pQEmC: function (w, z) {
        return w !== z;
      },
      KyphI: "videoMessage",
      jRAMn: function (w, z) {
        return w !== z;
      },
      pRguH: function (w, x) {
        return w(x);
      },
      wHwWD: function (w, z) {
        return w / z;
      },
      sXmwv: "stickerMessage",
      IglmQ: "audioMessage",
      tIeMu: "documentMessage",
      INoHK: "conversation",
      OMXey: "extendedTextMessage",
    };
    this.key = u.key;
    this.id = u.key.id;
    this.jid = u.participant;
    this.msg = u.message[u.type];
    switch (u.type) {
      case v.PcdAM:
        const w = {
          key: u.key,
          message: u.message,
        };
        this.message = w;
        this.text = v.pQEmC(null, this.msg.caption) ? this.msg.caption : "";
        this.mimetype = this.msg.mimetype;
        this.height = this.msg.height;
        this.width = this.msg.width;
        this.image = true;
        break;
      case v.KyphI:
        const x = {
          key: u.key,
          message: u.message,
        };
        this.message = x;
        this.text = v.jRAMn(null, this.msg.caption) ? this.msg.caption : "";
        this.mimetype = this.msg.mimetype;
        this.height = this.msg.height;
        this.width = this.msg.width;
        this.seconds = this.msg.seconds;
        this.length = this.msg.fileLength
          ? v.pRguH(isNaN, this.msg.fileLength)
            ? v.wHwWD(this.msg.fileLength.low, 1000000)
            : this.msg.fileLength
          : 0;
        this.video = true;
        this.ptt = true;
        break;
      case v.sXmwv:
        const y = {
          key: u.key,
          message: u.message,
        };
        this.message = y;
        this.animated = this.msg.isAnimated;
        this.mimetype = this.msg.mimetype;
        this.sticker = true;
        break;
      case v.IglmQ:
        const z = {
          key: u.key,
          message: u.message,
        };
        this.message = z;
        this.mimetype = this.msg.mimetype;
        this.seconds = this.msg.seconds;
        this.ptt = this.msg.ptt;
        this.audio = true;
        break;
      case v.tIeMu:
        const A = {
          key: u.key,
          message: u.message,
        };
        this.message = A;
        this.mimetype = this.msg.mimetype;
        this.image = /image/.test(this.msg.mimetype) && !/image\/gif/.test(this.msg.mimetype);
        this.video = /video/.test(this.msg.mimetype) || /image\/gif/.test(this.msg.mimetype);
        this.audio = /audio/.test(this.msg.mimetype);
        this.pdf = /application\/pdf/.test(this.msg.mimetype);
        break;
      case v.INoHK:
      case v.OMXey:
        const B = {
          key: u.key,
          message: u.message,
        };
        this.message = B;
        this.text = u.text ? u.text : "";
        this.txt = true;
        break;
      default:
        this.text = u.text || "";
        this.message = {
          key: u.key,
          message: u.message,
        };
    }
    delete this.msg;
    this.type = u.type;
    return super._patch(u);
  }
  async downloadMediaMessage() {
    const l = {
      GHvjU: function (n, o, p) {
        return n(o, p);
      },
      PHegI: "buffer",
    };
    Z ||= (await loadBaileys()).downloadMediaMessage;
    return await l.GHvjU(Z, this.message, l.PHegI);
  }
  async downloadAndSaveMediaMessage(l) {
    const o = {
      LUewc: "finish",
      lUZOI: "error",
      wjMIb: function (q, r, u) {
        return q(r, u);
      },
      vzVtx: "stream",
    };
    try {
      Z ||= (await loadBaileys()).downloadMediaMessage;
      const q = await o.wjMIb(Z, this.message, o.vzVtx);
      const r = this.mimetype?.split(";")[0].split("/")[1];
      const u = o.wjMIb(join, TEMP_DIR, l + "." + r);
      const v = createWriteStream(u);
      return new Promise((w, x) => {
        {
          q.pipe(v);
          v.on(o.LUewc, () => w(u));
          v.on(o.lUZOI, (z) => {
            {
              x(z);
            }
          });
        }
      });
    } catch (w) {
      {
        throw w;
      }
    }
  }
}
module.exports = a4;
