// File: apikey.js

const API_KEYS = [
  "jarrdb", // contoh key, bisa ditambah
  "dbjarr"
];

function cekApiKey(kunci) {
  return API_KEYS.includes(kunci);
}

module.exports = { cekApiKey };