const express = require('express');
const router = express.Router();
const db = require('./koneksi');

// Mendapatkan semua data Transaksi Sewa
router.get('/transaksi_sewa', (req, res) => {
    const sql = "SELECT * FROM Transaksi_Sewa";
    db.query(sql, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

db.query(insertTransaksiSewaSql, [Waktu_sewa, NIK_Pemilik, NIK_Penyewa], (error, result) => {
    if (error) throw error;
    const idTransaksiSewa = result.insertId;

    // Mengubah status kendaraan menjadi 'Disewa'
    const updateKendaraanSql = "UPDATE Kendaraan SET Status = 'Disewa' WHERE Id_Kendaraan = ?";
    db.query(updateKendaraanSql, [Id_Kendaraan], (error, result) => {
        if (error) throw error;
        res.send('Data Transaksi Sewa berhasil ditambahkan dan status kendaraan diperbarui.');
    });
});


// Menambahkan data Transaksi Sewa
router.post('/transaksi_sewa', (req, res) => {
    const { Waktu_sewa, NIK_Pemilik, NIK_Penyewa, Id_Kendaraan } = req.body;
    const insertTransaksiSewaSql = "INSERT INTO Transaksi_Sewa (Waktu_sewa, NIK_Pemilik, NIK_Penyewa) VALUES (?, ?, ?)";
    
    db.query(insertTransaksiSewaSql, [Waktu_sewa, NIK_Pemilik, NIK_Penyewa], (error, result) => {
        if (error) throw error;
        const idTransaksiSewa = result.insertId;
        const updateKendaraanSql = "UPDATE Kendaraan SET Status = 'Disewa' WHERE Id_Kendaraan = ?";
        db.query(updateKendaraanSql, [Id_Kendaraan], (error, result) => {
            if (error) throw error;
            res.send('Data Transaksi Sewa berhasil ditambahkan dan status kendaraan diperbarui.');
        });
    });
});

// Mengambil data Transaksi Sewa berdasarkan ID Transaksi Sewa
router.get('/transaksi_sewa/:Id_transaksi_sewa', (req, res) => {
    const { Id_transaksi_sewa } = req.params;
    const sql = "SELECT * FROM Transaksi_Sewa WHERE Id_transaksi_sewa = ?";
    db.query(sql, [Id_transaksi_sewa], (error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

// Mengedit data Transaksi Sewa berdasarkan ID Transaksi Sewa
router.put('/transaksi_sewa/:Id_transaksi_sewa', (req, res) => {
    const { Waktu_sewa, NIK_Pemilik, NIK_Penyewa } = req.body;
    const { Id_transaksi_sewa } = req.params;
    const sql = "UPDATE Transaksi_Sewa SET Waktu_sewa = ?, NIK_Pemilik = ?, NIK_Penyewa = ? WHERE Id_transaksi_sewa = ?";
    db.query(sql, [Waktu_sewa, NIK_Pemilik, NIK_Penyewa, Id_transaksi_sewa], (error, result) => {
        if (error) throw error;
        res.send('Data Transaksi Sewa berhasil diubah.');
    });
});

// Menghapus data Transaksi Sewa berdasarkan ID Transaksi Sewa
router.delete('/transaksi_sewa/:Id_transaksi_sewa', (req, res) => {
    const { Id_transaksi_sewa } = req.params;
    const sql = "DELETE FROM Transaksi_Sewa WHERE Id_transaksi_sewa = ?";
    db.query(sql, [Id_transaksi_sewa], (error, result) => {
        if (error) throw error;
        res.send('Data Transaksi Sewa berhasil dihapus.');
    });
});

module.exports = router;
