const fs = require('fs');
const path = require('path');

const dbFile = path.join(__dirname, 'database.json');
const apikey = 'jarrdb'; // harus sama dengan yang lain

function loadDB() {
  if (!fs.existsSync(dbFile)) fs.writeFileSync(dbFile, JSON.stringify({ nomorakses: [] }, null, 2));
  return JSON.parse(fs.readFileSync(dbFile));
}

function saveDB(data) {
  fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
}

module.exports = async (req, res) => {
  const { key, nomor } = req.query;

  if (key !== apikey) return res.status(403).json({ status: false, message: 'API Key salah!' });
  if (!nomor) return res.status(400).json({ status: false, message: 'Parameter nomor wajib diisi!' });

  let db = loadDB();
  const index = db.nomorakses.indexOf(nomor);

  if (index === -1) {
    return res.status(404).json({ status: false, message: 'Nomor tidak ditemukan di database.' });
  }

  db.nomorakses.splice(index, 1);
  saveDB(db);

  return res.json({ status: true, message: 'Nomor berhasil dihapus.', nomor });
};