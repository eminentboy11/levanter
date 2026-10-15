const axios = require("axios");
const FormData = require("form-data");
const cheerio = require("cheerio");
const fs = require("fs-extra");
const R = "aWxvdmV5b3Vzb29vb29vbWF0Y2hidXRpZG9udGtub3d3aHlpbGlrZWxvdmV3YW50dQ==";
const { iChecker } = require("../test/test");
const T = iChecker();
const U = T == R;
if (U) {
  exports.webpToMp4 = async (k) => {
    const m = {
      sJORU: "new-image-url",
      uyReJ: "new-image",
      WtZIY: function (C, D) {
        return C(D);
      },
      vGhdH: "post",
      zDbPi: "https://ezgif.com/webp-to-mp4",
      xlDne: 'input[name="file"]',
      tqQob: "value",
      uMvZC: 'input[name="token"]',
      LJmQL: "file",
      sOzZD: "token",
      PrJTj: "convert",
      bRaUn: function (C, D) {
        return C(D);
      },
      JsueH: "https://ezgif.com/webp-to-mp4/",
      czAKG: function (C, D) {
        return C + D;
      },
      iQqqn: "https:",
      tNxol: "div#output > p.outfile > video > source",
      QmZew: "src",
    };
    const q = new FormData();
    q.append(m.sJORU, "");
    q.append(m.uyReJ, fs.createReadStream(k));
    let { data: v } = await m.WtZIY(axios, {
      method: m.vGhdH,
      url: m.zDbPi,
      data: q,
      headers: {
        ...q.getHeaders(),
      },
    });
    const w = new FormData();
    let x = cheerio.load(v);
    const y = x(m.xlDne).attr(m.tqQob);
    const z = x(m.uMvZC).attr(m.tqQob);
    const A = {
      file: y,
      token: z,
      convert: x(m.xlDne).attr(m.tqQob),
    };
    w.append(m.LJmQL, A.file);
    if (z) {
      w.append(m.sOzZD, A.token);
    }
    w.append(m.PrJTj, A.convert);
    let B = await m.bRaUn(axios, {
      method: m.vGhdH,
      url: m.JsueH + A.file,
      data: w,
      headers: {
        ...w.getHeaders(),
      },
    });
    x = cheerio.load(B.data);
    return m.czAKG(m.iQqqn, x(m.tNxol).attr(m.QmZew));
  };
}
