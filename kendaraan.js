const express = require('express');
const router = express.Router();
const db = require('./koneksi');

// Mendapatkan semua data Kendaraan
router.get('/kendaraan', (req, res) => {
    const sql = "SELECT * FROM Kendaraan";
    db.query(sql, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// Menambahkan data Kendaraan
router.post('/kendaraan', (req, res) => {
    const { Plat_Nomor, Merk_Kendaraan } = req.body;
    const sql = "INSERT INTO Kendaraan (Plat_Nomor, Merk_Kendaraan) VALUES (?, ?)";
    db.query(sql, [Plat_Nomor, Merk_Kendaraan], (error, result) => {
        if (error) throw error;
        res.send('Data Kendaraan berhasil ditambahkan.');
    });
});

// Mengambil data Kendaraan berdasarkan Plat Nomor
router.get('/kendaraan/:Plat_Nomor', (req, res) => {
    const { Plat_Nomor } = req.params;
    const sql = "SELECT * FROM Kendaraan WHERE Plat_Nomor = ?";
    db.query(sql, [Plat_Nomor], (error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

// Mengedit data Kendaraan berdasarkan Plat Nomor
router.put('/kendaraan/:Plat_Nomor', (req, res) => {
    const { Merk_Kendaraan } = req.body;
    const { Plat_Nomor } = req.params;
    const sql = "UPDATE Kendaraan SET Merk_Kendaraan = ? WHERE Plat_Nomor = ?";
    db.query(sql, [Merk_Kendaraan, Plat_Nomor], (error, result) => {
        if (error) throw error;
        res.send('Data Kendaraan berhasil diubah.');
    });
});

// Menghapus data Kendaraan berdasarkan Plat Nomor
router.delete('/kendaraan/:Plat_Nomor', (req, res) => {
    const { Plat_Nomor } = req.params;
    const sql = "DELETE FROM Kendaraan WHERE Plat_Nomor = ?";
    db.query(sql, [Plat_Nomor], (error, result) => {
        if (error) throw error;
        res.send('Data Kendaraan berhasil dihapus.');
    });
});

module.exports = router;
