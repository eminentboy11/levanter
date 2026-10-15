const fs = require("fs-extra");
const path = require("path");
const N = process.env.BOT_LANG || "en";
const O = path.join(__dirname, "..", "lang", "en.json");
const P = path.join(__dirname, "..", "lang", N + ".json");
const Q = fs.existsSync(P) ? P : O;
module.exports = require(Q);
