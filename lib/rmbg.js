const FormData = require("form-data");
const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
exports.removeBg = async (j, k) => {
  const l = {
    jUigh: "size",
    wWDAq: "auto",
    NQuYV: "image_file",
    tXhOA: "post",
    BPPix: "https://api.remove.bg/v1.0/removebg",
    MYRgO: "arraybuffer",
  };
  const m = new FormData();
  m.append(l.jUigh, l.wWDAq);
  m.append(l.NQuYV, fs.createReadStream(j), path.basename(j));
  let n = {
    method: l.tXhOA,
    url: l.BPPix,
    headers: {
      "X-Api-Key": k,
      ...m.getHeaders(),
    },
    data: m,
    responseType: l.MYRgO,
  };
  try {
    {
      const { data: u } = await axios(n);
      return u;
    }
  } catch (v) {
    return v.message;
  }
};
