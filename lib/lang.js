const fs = require("fs-extra");
const path = require("path");
const langCode = process.env.BOT_LANG || "en";
const fallbackLangPath = path.join(__dirname, "..", "lang", "en.json");
const langPath = path.join(__dirname, "..", "lang", langCode + ".json");
const langFile = fs.existsSync(langPath) ? langPath : fallbackLangPath;
module.exports = require(langFile);
