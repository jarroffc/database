const fs = require('fs');
const path = require('path');

const dbFile = path.join(__dirname, 'database.json');
const apikey = 'jarrdb'; // samain dengan yang di aksesnomor.js

function loadDB() {
  if (!fs.existsSync(dbFile)) fs.writeFileSync(dbFile, JSON.stringify({ nomorakses: [] }, null, 2));
  return JSON.parse(fs.readFileSync(dbFile));
}

module.exports = async (req, res) => {
  const { key } = req.query;

  if (key !== apikey) return res.status(403).json({ status: false, message: 'API Key salah!' });

  const db = loadDB();
  const list = db.nomorakses || [];

  return res.json({
    status: true,
    jumlah: list.length,
    nomorakses: list
  });
};