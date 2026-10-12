const os = require('os');
const { france } = require(__dirname + '/../framework/france');
const settings = require(__dirname + '/../set');

const STYLES = [
  {
    title: '╭━━━〔 ✦ SOURAJIT-VFX ✦ 〕━━━╮',
    divider: '━━━━━━━━━━━━━━━━━━━━',
    item: '  ✧',
    end: '╰━━━━━━━━━━━━━━━━━━━━╯'
  },
  {
    title: '┏━━━━━━━ ⚡ S O U R A J I T ⚡ ━━━━━━━┓',
    divider: '════════════════════',
    item: '  ▸',
    end: '┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛'
  },
  {
    title: '╔═══「 𝗦𝗢𝗨𝗥𝗔𝗝𝗜𝗧-𝗩𝗙𝗫 」═══╗',
    divider: '────────────────────',
    item: '  ◈',
    end: '╚════════════════════════╝'
  },
  {
    title: '▰▰▰ CYBER DASHBOARD // SOURAJIT ▰▰▰',
    divider: '▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰',
    item: '  ⌁',
    end: '▰▰▰ END OF MENU ▰▰▰'
  }
];

function runtime(seconds) {
  const s = Math.floor(seconds % 60);
  const m = Math.floor((seconds / 60) % 60);
  const h = Math.floor((seconds / 3600) % 24);
  const d = Math.floor(seconds / 86400);
  return [d && d + 'd', h && h + 'h', m && m + 'm', s + 's'].filter(Boolean).join(' ');
}

france({ nomCom: 'menu', categorie: 'General', reaction: '⚡' }, async (dest, sock, ctx) => {
  const { repondre, prefixe, nomAuteurMessage } = ctx;
  const { cm } = require(__dirname + '/../framework/france');
  const style = STYLES[Math.floor(Math.random() * STYLES.length)];
  const groups = new Map();

  for (const command of cm) {
    const category = command.categorie || 'Other';
    if (!groups.has(category)) groups.set(category, new Set());
    if (command.nomCom) groups.get(category).add(String(command.nomCom));
  }

  const lines = [
    style.title,
    style.divider,
    '  ✦ Bot     : SOURAJIT-VFX',
    '  ✦ Owner   : ' + (settings.OWNER_NAME || 'Sourajit VFX'),
    '  ✦ User    : ' + (nomAuteurMessage || 'User'),
    '  ✦ Prefix  : ' + (prefixe || settings.PREFIXE || '.'),
    '  ✦ Mode    : ' + (String(settings.MODE || 'public').toUpperCase()),
    '  ✦ Uptime  : ' + runtime(process.uptime()),
    '  ✦ Platform: ' + os.platform(),
    '  ✦ Commands: ' + cm.length,
    style.divider
  ];

  for (const [category, commands] of [...groups.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    lines.push('', '┌─〔 ' + category.toUpperCase() + ' 〕');
    for (const name of [...commands].sort((a, b) => a.localeCompare(b))) {
      lines.push(style.item + (prefixe || settings.PREFIXE || '.') + name);
    }
    lines.push('└' + style.divider);
  }

  lines.push('', '  Powered by 𝐒ꭷᴜʀᴀᴊɪᴛ メ 𝐕𝐅𝐗', style.end);
  return repondre(lines.join('\n'));
});
