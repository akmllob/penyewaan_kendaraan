const express = require('express');
const router = express.Router();
const db = require('./koneksi');

// Mendapatkan semua data Penyewa
router.get('/penyewa', (req, res) => {
    const sql = "SELECT * FROM Penyewa";
    db.query(sql, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// Menambahkan data Penyewa
router.post('/penyewa', (req, res) => {
    const { NIK_Penyewa, Nama_penyewa, Alamat_penyewa, No_Tlpn, Username, Password } = req.body;
    const sql = "INSERT INTO Penyewa (NIK_Penyewa, Nama_penyewa, Alamat_penyewa, No_Tlpn, Username, Password) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [NIK_Penyewa, Nama_penyewa, Alamat_penyewa, No_Tlpn, Username, Password], (error, result) => {
        if (error) throw error;
        res.send('Data Penyewa berhasil ditambahkan.');
    });
});

// Mengambil data Penyewa berdasarkan NIK
router.get('/penyewa/:NIK_Penyewa', (req, res) => {
    const { NIK_Penyewa } = req.params;
    const sql = "SELECT * FROM Penyewa WHERE NIK_Penyewa = ?";
    db.query(sql, [NIK_Penyewa], (error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

// Mengedit data Penyewa berdasarkan NIK
router.put('/penyewa/:NIK_Penyewa', (req, res) => {
    const { Nama_penyewa, Alamat_penyewa, No_Tlpn, Username, Password } = req.body;
    const { NIK_Penyewa } = req.params;
    const sql = "UPDATE Penyewa SET Nama_penyewa = ?, Alamat_penyewa = ?, No_Tlpn = ?, Username = ?, Password = ? WHERE NIK_Penyewa = ?";
    db.query(sql, [Nama_penyewa, Alamat_penyewa, No_Tlpn, Username, Password, NIK_Penyewa], (error, result) => {
        if (error) throw error;
        res.send('Data Penyewa berhasil diubah.');
    });
});

// Menghapus data Penyewa berdasarkan NIK
router.delete('/penyewa/:NIK_Penyewa', (req, res) => {
    const { NIK_Penyewa } = req.params;
    const sql = "DELETE FROM Penyewa WHERE NIK_Penyewa = ?";
    db.query(sql, [NIK_Penyewa], (error, result) => {
        if (error) throw error;
        res.send('Data Penyewa berhasil dihapus.');
    });
});

module.exports = router;
