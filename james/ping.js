"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");
zokou({ nomCom: "test", reaction: "🧒", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    console.log("Commande saisie !!!s");
    let z = '*🌍𝙱𝙾𝚃 𝙸𝚂 𝙾𝙽𝙻𝙸𝙽𝙴🌍* 🙏 \n\n ' + "𝚃𝙷𝙴 𝙱𝙾𝚃 𝙸𝚂 𝚁𝚄𝙽𝙽𝙸𝙽𝙶 𝙾𝙽 𝙶𝙾 𝚂𝙿𝙴𝙴𝙳😉👍";
    let d = '                                                                           𝚃𝙴𝚂𝚃 𝚂𝚃𝙰𝚃𝚄𝚂✨';
    let varmess = z + d;
    var jpg = 'https://files.catbox.moe/uuye39.jpg';
    await zk.sendMessage(dest, { image: { url: jpg }, caption: varmess });
    //console.log("montest")

console.log("mon test");
