const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

zokou({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }


    
 cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('EAT');

// Créer une date et une heure en EAT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
 ❐  ⌜ 🕳️ᴊᴀᴍᴇꜱ-𝙼𝙳🕳️⌟  ❐
┃
┃    ᴊᴀᴍᴇꜱ-𝙼𝙳 𝙰 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿 𝙱𝙾𝚃 
┃ᴅᴇꜱɪɢɴᴇᴅ ʙʏ ᴊᴀᴍᴇꜱ 
┃
┃ 𝙼𝚘𝚍𝚎: ${mode}
┃ 𝚄𝚜𝚎𝚛: ${s.OWNER_NAME} 
┃ 
┗❐\n\n`;

    let menuMsg=`  
  *ᴊᴀᴍᴇꜱ-𝙼𝙳 𝙲𝙾𝙼𝙼𝙰𝙽𝙳𝚂*
`;

    for (const cat in coms) {
        menuMsg += `❐  ⌜ 🕳️ *${cat}*🕳️⌟  ❐`;
        for (const cmd of coms[cat]) {
            menuMsg += `  
*┊❍* ${cmd}`;
        }
        menuMsg += `
*═══════════* \n`
    }

    menuMsg += `
◇            ◇
*✩░▒▓▆▅▃▂▁𝐉𝐀𝐌𝐄𝐒-𝐌𝐃▁▂▃▅▆▓▒░✩*

  *✩░▒▓▆▅▃▂▁𝐉𝐀𝐌𝐄𝐒-𝐌𝐃▁▂▃▅▆▓▒░✩*                                         
*═══════════*
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *James-MD*, développé par Djalega++" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "*James*" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(infoMsg + menuMsg);
    
}

});
