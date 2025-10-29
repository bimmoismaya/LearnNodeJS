// models/Pengguna.js

const mongoose = require('mongoose');

const penggunaSchema = mongoose.Schema(
    {
        nama: {
            type: String,
            required: [true, 'Nama wajib diisi'], // Tambahkan Validasi Required
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email wajib diisi'],
            unique: true, // ⬅️ Pastikan Email UNIK (tidak ada duplikat)
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, 'Password wajib diisi'],
            minlength: [6, 'Password minimal harus 6 karakter'], // ⬅️ Panjang Minimum
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true, // Otomatis menambahkan createdAt dan updatedAt
    }
);

// models/Pengguna.js (Tambahkan di bagian bawah, di atas generateToken)

// Method untuk membandingkan password yang dimasukkan dengan hash di DB
penggunaSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// models/Pengguna.js (Tambahkan di bagian bawah, sebelum module.exports)

const bcrypt = require('bcryptjs');

// Middleware PRE-SAVE (Fungsi ini akan dijalankan SEBELUM data disimpan ke DB)
penggunaSchema.pre('save', async function (next) {
    // Jika password tidak dimodifikasi, lewati hashing
    if (!this.isModified('password')) {
        next();
    }

    // Hashing Password
    const salt = await bcrypt.genSalt(10); // Membuat salt (nilai acak)
    this.password = await bcrypt.hash(this.password, salt); // Meng-hash password
    next();
});

// models/Pengguna.js (Tambahkan di bagian bawah, sebelum module.exports)

const jwt = require('jsonwebtoken'); // ⬅️ Impor JWT

// ... (schema dan pre-save middleware Anda di atas)

// Tambahkan method untuk membuat JWT
penggunaSchema.methods.generateToken = function () {
    // Gunakan SECRET KEY yang kuat dan disarankan disimpan di environment (.env)
    // Untuk saat ini, kita gunakan string sederhana
    return jwt.sign(
        { id: this._id }, // Payload: Data yang disimpan dalam token (ID pengguna)
        'RAHASIA_ANDA_SUPER_KUAT', // ⬅️ Ganti dengan kunci rahasia yang kuat!
        {
            expiresIn: '30d', // Token kadaluarsa dalam 30 hari
        }
    );
};


// ... (lanjutkan ke module.exports)
module.exports = mongoose.model('Pengguna', penggunaSchema);