const express = require('express');
const router = express.Router();
const db = require('./koneksi');

// Mendapatkan semua data Detail Transaksi
router.get('/detail_transaksi', (req, res) => {
    const sql = "SELECT * FROM Detail_Transaksi";
    db.query(sql, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// Menambahkan data Detail Transaksi
router.post('/detail_transaksi', (req, res) => {
    const { Id_transaksi, Id_Kendaraan } = req.body;
    const sql = "INSERT INTO Detail_Transaksi (Id_transaksi, Id_Kendaraan) VALUES (?, ?)";
    db.query(sql, [Id_transaksi, Id_Kendaraan], (error, result) => {
        if (error) throw error;
        res.send('Data Detail Transaksi berhasil ditambahkan.');
    });
});

// Mengambil data Detail Transaksi berdasarkan Id Transaksi
router.get('/detail_transaksi/:Id_transaksi', (req, res) => {
    const { Id_transaksi } = req.params;
    const sql = "SELECT * FROM Detail_Transaksi WHERE Id_transaksi = ?";
    db.query(sql, [Id_transaksi], (error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

// Mengedit data Detail Transaksi berdasarkan Id Transaksi
router.put('/detail_transaksi/:Id_transaksi', (req, res) => {
    const { Id_Kendaraan } = req.body;
    const { Id_transaksi } = req.params;
    const sql = "UPDATE Detail_Transaksi SET Id_Kendaraan = ? WHERE Id_transaksi = ?";
    db.query(sql, [Id_Kendaraan, Id_transaksi], (error, result) => {
        if (error) throw error;
        res.send('Data Detail Transaksi berhasil diubah.');
    });
});

// Menghapus data Detail Transaksi berdasarkan Id Transaksi
router.delete('/detail_transaksi/:Id_transaksi', (req, res) => {
    const { Id_transaksi } = req.params;
    const sql = "DELETE FROM Detail_Transaksi WHERE Id_transaksi = ?";
    db.query(sql, [Id_transaksi], (error, result) => {
        if (error) throw error;
        res.send('Data Detail Transaksi berhasil dihapus.');
    });
});

module.exports = router;
