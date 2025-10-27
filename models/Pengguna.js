// models/Pengguna.js

const mongoose = require('mongoose');

// Definisikan struktur (schema) data Pengguna
const PenggunaSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true,
        trim: true // Hapus spasi di awal/akhir input
    },
    email: {
        type: String,
        required: true,
        unique: true // Pastikan setiap email unik
    },
    tanggalDibuat: {
        type: Date,
        default: Date.now
    }
});

// Buat Model dari schema, yang akan berinteraksi dengan koleksi 'penggunas'
const Pengguna = mongoose.model('Pengguna', PenggunaSchema);

module.exports = Pengguna;