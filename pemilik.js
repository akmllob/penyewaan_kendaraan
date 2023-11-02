const express = require('express');
const router = express.Router();
const db = require('./koneksi');

// Mendapatkan semua data Pemilik
router.get('/pemilik', (req, res) => {
    const sql = "SELECT * FROM Pemilik";
    db.query(sql, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// Menambahkan data Pemilik
router.post('/pemilik', (req, res) => {
    const { NIK_Pemilik, Nama, Username, Password } = req.body;
    const sql = "INSERT INTO Pemilik (NIK_Pemilik, Nama, Username, Password) VALUES (?, ?, ?, ?)";
    db.query(sql, [NIK_Pemilik, Nama, Username, Password], (error, result) => {
        if (error) throw error;
        res.send('Data Pemilik berhasil ditambahkan.');
    });
});

// Mengambil data Pemilik berdasarkan NIK
router.get('/pemilik/:NIK_Pemilik', (req, res) => {
    const { NIK_Pemilik } = req.params;
    const sql = "SELECT * FROM Pemilik WHERE NIK_Pemilik = ?";
    db.query(sql, [NIK_Pemilik], (error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

// Mengedit data Pemilik berdasarkan NIK
router.put('/pemilik/:NIK_Pemilik', (req, res) => {
    const { Nama, Username, Password } = req.body;
    const { NIK_Pemilik } = req.params;
    const sql = "UPDATE Pemilik SET Nama = ?, Username = ?, Password = ? WHERE NIK_Pemilik = ?";
    db.query(sql, [Nama, Username, Password, NIK_Pemilik], (error, result) => {
        if (error) throw error;
        res.send('Data Pemilik berhasil diubah.');
    });
});

// Menghapus data Pemilik berdasarkan NIK
router.delete('/pemilik/:NIK_Pemilik', (req, res) => {
    const { NIK_Pemilik } = req.params;
    const sql = "DELETE FROM Pemilik WHERE NIK_Pemilik = ?";
    db.query(sql, [NIK_Pemilik], (error, result) => {
        if (error) throw error;
        res.send('Data Pemilik berhasil dihapus.');
    });
});

db.query(insertTransaksiSewaSql, [Waktu_sewa, NIK_Pemilik, NIK_Penyewa], (error, result) => {
    if (error) throw error;
    const idTransaksiSewa = result.insertId;

    // Mengubah status kendaraan menjadi 'Disewa'
    const updateKendaraanSql = "UPDATE Kendaraan SET Status = 'Disewa' WHERE Id_Kendaraan = ?";
    db.query(updateKendaraanSql, [Id_Kendaraan], (error, result) => {
        if (error) throw error;

        // Mengambil harga kendaraan dari database atau variabel lainnya
        const hargaSewa = 500; // Contoh harga sewa

        // Mengupdate saldo pemilik
        const updateSaldoPemilikSql = "UPDATE Pemilik SET Saldo = Saldo + ? WHERE NIK_Pemilik = ?";
        db.query(updateSaldoPemilikSql, [hargaSewa, NIK_Pemilik], (error, result) => {
            if (error) throw error;
            res.send('Data Transaksi Sewa berhasil ditambahkan, status kendaraan diperbarui, dan saldo pemilik diperbarui.');
        });
    });
});

module.exports = router;
