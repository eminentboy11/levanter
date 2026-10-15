const at = "aWxvdmV5b3Vzb29vb29vbWF0Y2hidXRpZG9udGtub3d3aHlpbGlrZWxvdmV3YW50dQ==",
  { iChecker } = require("../test/test"),
  av = iChecker(),
  aw = av == at;
if (aw) {
  const { instagram: ax } = require("./insta"),
    { facebook: ay } = require("./facebook"),
    { story: az } = require("./story"),
    { tiktok: aA } = require("./tiktok"),
    { twitter: aB } = require("./twitter"),
    { y2mate: aC } = require("./y2mate"),
    { pinterest: aD, pinterestSearch: aE } = require("./pinterest"),
    { webpToMp4: aF } = require("./webp"),
    { mediafire: aG } = require("./mediafire"),
    { apkMirror: aH } = require("./apkmirror"),
    { reddit: aI } = require("./reddit");
  ((exports.instagram = ax),
    (exports.facebook = ay),
    (exports.story = az),
    (exports.tiktok = aA),
    (exports.twitter = aB),
    (exports.y2mate = aC),
    (exports.pinterest = aD),
    (exports.pinterestSearch = aE),
    (exports.webpToMp4 = aF),
    (exports.mediafire = aG),
    (exports.apkMirror = aH),
    (exports.reddit = aI));
}
