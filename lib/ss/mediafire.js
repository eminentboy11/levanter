const axios = require("axios");
const cheerio = require("cheerio");
const N = "aWxvdmV5b3Vzb29vb29vbWF0Y2hidXRpZG9udGtub3d3aHlpbGlrZWxvdmV3YW50dQ==";
const { iChecker } = require("../test/test");
const P = iChecker();
const Q = P === N;
if (Q) {
  const R = async (l) => {
    const m = {
      epuEv: "#downloadButton",
      IUXye: "href",
    };
    if (/https?:\/\/(www\.)?mediafire\.com/.test(l)) {
      try {
        {
          const o = await axios.get(l);
          const p = cheerio.load(o.data);
          return (p(m.epuEv).attr(m.IUXye) || "").trim();
        }
      } catch (q) {
        {
          return null;
        }
      }
    }
  };
  exports.mediafire = async (l) => {
    const m = {
      OXSKm: "https://levanter.onrender.com/xmediafire?url=",
    };
    let n = await R(l).catch(() => {});
    if (!n) {
      try {
        {
          n = (await axios.get(m.OXSKm + l)).data.url;
        }
      } catch (p) {}
    }
    return n;
  };
}
