const axios = require("axios");
const cheerio = require("cheerio");
const K = async (j) => {
  const k = {
    TmODO: function (n, o) {
      return n === o;
    },
    VJxXO: "svXPO",
    fvJOa: ".card-body > a",
    DdsBj: "href",
  };
  const l = k;
  let m = "";
  try {
    {
      const n = await axios.get("https://savemp4.red/backend.php?url=" + j);
      m = cheerio.load(n.data)(l.fvJOa).attr(l.DdsBj);
    }
  } catch (p) {}
  return m;
};
exports.reddit = async (i) => {
  let k = await K(i);
  if (!k) {
    try {
      k = (await axios.get("https://levanter.onrender.com/xreddit?url=" + i)).data.url;
    } catch (l) {}
  }
  return k;
};
