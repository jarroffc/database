const fs = require('fs');
const db = require('./database.json');

module.exports = async (m, sock, { isOwner, text }) => {
  if (!isOwner) return m.reply('Fitur ini khusus untuk Owner bot!');
  if (!text) return m.reply('Contoh: *.aksesnomor* 6281234567890');

  const nomor = text.replace(/\D/g, '');

  if (db.nomorAkses.includes(nomor)) {
    return m.reply('Nomor ini sudah punya akses.');
  }

  db.nomorAkses.push(nomor);
  fs.writeFileSync('./database.json', JSON.stringify(db, null, 2));
  m.reply(`Nomor ${nomor} berhasil diberi akses!`);
};