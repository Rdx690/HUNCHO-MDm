const fs = require('fs-extra');
const path = require('path');

if (fs.existsSync(path.join(__dirname, 'set.env'))) {
  require('dotenv').config({ path: path.join(__dirname, 'set.env') });
}

const databasePath = path.join(__dirname, 'database.db');
const DATABASE_URL = process.env.DATABASE_URL || databasePath;

module.exports = {
  session: process.env.SESSION_ID || '',
  PREFIXE: process.env.PREFIX || '.',
  OWNER_NAME: process.env.OWNER_NAME || 'Sourajit VFX',
  NUMERO_OWNER: process.env.OWNER_NUMBER || '',
  AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || 'yes',
  AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
  BOT: process.env.BOT_NAME || 'SOURAJIT-VFX',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  URL: process.env.BOT_MENU_LINKS || '',
  MODE: process.env.PUBLIC_MODE || 'yes',
  PM_PERMIT: process.env.PM_PERMIT || 'no',
  WARN_COUNT: process.env.WARN_COUNT || '3',
  ETAT: process.env.PRESENCE || '',
  DP: process.env.STARTING_BOT_MESSAGE || 'yes',
  ADM: process.env.ANTI_DELETE_MESSAGE || 'no',
  DATABASE_URL,
  // Keep database credentials in the deployment environment, never in source control.
  DATABASE: process.env.DATABASE_URL || '',
};

const file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(`Configuration changed: ${__filename}`);
  delete require.cache[file];
  require(file);
});
