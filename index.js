// index.js 
const express = require("express");  
const app = express(); 
const port = process.env.PORT || 3000; 
const fs = require("fs"); 
const cors = require("cors");

const { cekKey } = require("./apikey.js"); 
const { addNomor } = require("./aksesnomor.js"); 
const { getList } = require("./listnomor.js"); 
const { deleteNomor } = require("./delnomor.js");

app.use(cors()); app.use(express.json());

app.get("/aksesnomor", (req, res) => { const { apikey, nomor } = req.query; if (!apikey || !nomor) return res.json({ status: false, msg: "Parameter apikey & nomor wajib!" }); if (!cekKey(apikey)) return res.json({ status: false, msg: "APIKEY tidak valid!" }); const result = addNomor(nomor); res.json(result); });

app.get("/listnomor", (req, res) => { const { apikey } = req.query; if (!apikey) return res.json({ status: false, msg: "Parameter apikey wajib!" }); if (!cekKey(apikey)) return res.json({ status: false, msg: "APIKEY tidak valid!" }); const result = getList(); res.json({ status: true, data: result }); });

app.get("/delnomor", (req, res) => { const { apikey, nomor } = req.query; if (!apikey || !nomor) return res.json({ status: false, msg: "Parameter apikey & nomor wajib!" }); if (!cekKey(apikey)) return res.json({ status: false, msg: "APIKEY tidak valid!" }); const result = deleteNomor(nomor); res.json(result); });

app.listen(port, () => console.log("Server jalan di port", port));

