const webpmux = require("node-webpmux");
const extractExif = async (j) => {
  const k = {
    VfrlK: "sticker-pack-id",
    WVauH: "sticker-pack-name",
    daXLE: "sticker-pack-publisher",
    iriVA: function (m, o) {
      return m !== o;
    },
    LLuDS: "UBhdn",
    MFBlM: "HSHwT",
  };
  const l = k;
  try {
    const m = new webpmux.Image();
    await m.load(j);
    if (!m.exif?.length) {
      return null;
    }
    const o = m.exif.toString().match(/{.*}/s);
    if (!o) {
      return null;
    }
    const p = JSON.parse(o[0]);
    return {
      packId: p?.[l.VfrlK] || "",
      packname: p?.[l.WVauH] || "",
      author: p?.[l.daXLE] || "",
      emojis: p?.emojis?.length ? p.emojis.join(", ") : "",
    };
  } catch {
    {
      return null;
    }
  }
};
exports.extractExif = extractExif;
