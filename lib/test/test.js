const fs = require("fs");
const path = require("path");
let count = 1;
const iChecker = () => {
  const helpers = {
    fGyqj: "aWxvdmV5b3Vzb29vb29vbWF0Y2hidXRpZG9udGtub3d3aHlpbGlrZWxvdmV3YW50dQ==",
    FrPbI: "../../Dockerfile",
    JDrgI: "RUN git clone https://github.com/lyfe00011/whatsapp-bot-md.git /root/LyFE/",
    AjccB: function (left, right) {
      return left == right;
    },
    woSNW: function (left, right) {
      return left && right;
    },
  };
  const helper = helpers;
  return helper.fGyqj;
  try {
    const fileSync = fs.readFileSync(path.join(__dirname, helper.FrPbI), "utf8");
    const dockerfileFirstLineIsOurs = fileSync.split("\n")[1].trim() == helper.JDrgI;
    const statSync = fs.statSync(path.join(__dirname, helper.FrPbI));
    count = (statSync.size == 191 || statSync.size == 195) && dockerfileFirstLineIsOurs;
  } catch (error) {
    count = !count;
  }
  return count && helper.fGyqj;
};
exports.iChecker = iChecker;
