const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSU5lK3FYaWRiWGpTZnZMdCt4dEdMMXFmT0dVNDlHeWJIQklpSG1GTE5FZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY1Biby92OWo2RmdiRE9UZ2duUXdqREozcW4rdDBybTY2aC9FM2EyMTFtST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvRVh0QlZwNlBXWGd5UzNCcDY4YkdVN3o5cHl6VXBCTGVJODFFLzBDb0ZjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJMMXg2OFVndVY1TTd3OWtrUi8xUExDa1Bsa3h4ODhvNzVxNWJvZU4zYWxrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFEekh6dXB5eTR4ZUJxWTUrYTNnenlpV2xDWElsYllvZ1hHTG5kbjhjazQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImQ5MU1za0hyWXYvZTZ0L1FuVXdwTUxJNmx5bjJPWnRwNGNQakp1d2JMQjg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNktrNkxzMWFtYi9SbGM3NDVIamc2cVM4SXBsZUJRbjF3aDJIQWdaUjRXND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRk9jdHg4UVNlU2pERTlFc0ZEbDVSczNySE9yS1FTcnF4SHljL1VQQTRDcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJiSVQ1QkUyeEZ2M2FtTDMxM2VXbUFDZjFra3FzNk0zRlRPY09SSHdYNUxWSVN3eHVuaTc1SDlHYXcxYmxEelJENHVvRnJySHBLSmlJVFVMTGsyUmh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTcyLCJhZHZTZWNyZXRLZXkiOiJIQk9lM2tycnZPRFNreGVoU1JTYkdHNm9BVHJFckp4UUJsMDEvcTJnMStBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NTYyODQ3MDUwN0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI0QUZEQjU1NTQzQUM2NDhDMTFFNThCMUVFQTExMENGOSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzM0NzkwNzg0fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTU2Mjg0NzA1MDdAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMDVDNjAzQTQ4QzVDNTU4RkEyOENCNEI4QzFBNkQ1QjQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTczNDc5MDc4NX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiMER5TFcwUGxUSVduZFRrMF9ESjh6dyIsInBob25lSWQiOiJmYjkyYjNlYS1kNjhmLTQ5NDYtOThlOC1kYjA0ZGJlMzk3NGUiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibDZid2dJanNpOER1NG1EdnB4OERrbmRWR0FFPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlpIZWNPY0lxQVkyaVhlOUg0a1l2N2pFejRXUT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJZRjJYV1NOWCIsIm1lIjp7ImlkIjoiMjU1NjI4NDcwNTA3OjcwQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IuygnOyehOyKpCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS1diN3Y4RkVPK2NtN3NHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiQXQ5Szg4RTJGL2EveEN0OXJBOSt4eFAybFVoWEpLTjRBL0tlbjg0enFGOD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiWmZrQ2JOY0xZWDlQYU5vQXhwZ2Mya0RYWGtydUFvNVpyNzBObC9vZlUyMFFIaW1UQkVWK1hFbXVsWEJhY1lBckNzV09uNGY4YVY4b0dUdTBNODJlQnc9PSIsImRldmljZVNpZ25hdHVyZSI6InBMc2NyckViTTNxY3NtM1FDWk9SUlQ5STIrdEE1cVlUSkJOWWNwL1VJdVNITVg2dU14OHBDV1BlU2VIVzZ2VlhZRTFZRFd5WDFwRnNkeWxwTThBd2h3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU1NjI4NDcwNTA3OjcwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlFMZlN2UEJOaGYydjhRcmZhd1Bmc2NUOXBWSVZ5U2plQVB5bnAvT002aGYifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzQ3OTA3ODAsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTUtRIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "James",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255628470507",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Phantom-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/uuye39.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
