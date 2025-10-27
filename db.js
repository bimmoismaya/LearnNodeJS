// db.js

const mongoose = require('mongoose');

// Ganti URL ini dengan connection string MongoDB Anda (lokal atau Atlas)
const DB_URI = 'mongodb://localhost:27017/LearnNodeJS'; 
// Jika menggunakan Atlas, URL akan jauh lebih panjang

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log('✅ Koneksi ke MongoDB berhasil!');
    } catch (err) {
        console.error('❌ Gagal terhubung ke MongoDB:', err.message);
        // Hentikan aplikasi jika gagal terhubung
        process.exit(1); 
    }
};

module.exports = connectDB;