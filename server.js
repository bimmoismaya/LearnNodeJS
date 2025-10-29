const express = require('express');
const app = express();
const port = 8080;
const connectDB = require('./db'); // Impor fungsi koneksi
const Pengguna = require('./models/Pengguna'); // Impor Model

// Jalankan koneksi database
connectDB();

// Middleware penting untuk membaca JSON body
app.use(express.json());
// ... (kode port dan listen di bawah)

// server.js (lanjutan)

// Rute GET untuk mengambil SEMUA pengguna dari database
app.get('/api/pengguna', async (req, res) => {
    try {
        // Pengguna.find({}) akan mengambil semua dokumen
        const pengguna = await Pengguna.find({});
        res.status(200).json(pengguna);
    } catch (err) {
        res.status(500).json({ error: 'Gagal mengambil data' });
    }
});

// server.js (lanjutan)

// Rute POST untuk MENAMBAH pengguna baru ke database
// server.js (di bagian ROUTE CRUD)

// Rute POST untuk REGISTRASI Pengguna BARU
app.post('/api/pengguna/register', async (req, res, next) => {
    const { nama, email, password } = req.body;

    try {
        // 1. Cek apakah pengguna sudah ada
        let userExists = await Pengguna.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error('Pengguna dengan email ini sudah terdaftar.');
        }

        // 2. Buat pengguna baru (password akan otomatis di-hash oleh pre-save middleware)
        const penggunaBaru = await Pengguna.create({
            nama,
            email,
            password, 
        });

        // 3. Kirim respons sukses dan token JWT
        if (penggunaBaru) {
            res.status(201).json({
                _id: penggunaBaru._id,
                nama: penggunaBaru.nama,
                email: penggunaBaru.email,
                token: penggunaBaru.generateToken(), // ⬅️ Membuat token
            });
        } else {
            res.status(400);
            throw new Error('Data pengguna tidak valid.');
        }

    } catch (err) {
        next(err);
    }
});

// server.js (lanjutan)

// Rute PUT untuk MEMPERBARUI Pengguna berdasarkan ID
app.put('/api/pengguna/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const dataUpdate = req.body;

        // Gunakan findByIdAndUpdate:
        // 1. ID dokumen
        // 2. Data yang akan diperbarui (req.body)
        // 3. Opsi: { new: true } mengembalikan dokumen yang SUDAH diperbarui
        const penggunaDiperbarui = await Pengguna.findByIdAndUpdate(id, dataUpdate, { new: true, runValidators: true });

        // Cek apakah dokumen ditemukan sebelum diperbarui
        if (!penggunaDiperbarui) {
            return res.status(404).json({ error: 'Pengguna tidak ditemukan.' });
        }

        res.status(200).json(penggunaDiperbarui);
    } catch (err) {
        // Tangani error jika ID tidak valid atau validasi gagal
        res.status(400).json({ error: err.message });
    }
});

// server.js (lanjutan)

// Rute DELETE untuk MENGHAPUS Pengguna berdasarkan ID
app.delete('/api/pengguna/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Gunakan findByIdAndDelete untuk mencari dan menghapus dokumen
        const penggunaDihapus = await Pengguna.findByIdAndDelete(id);

        if (!penggunaDihapus) {
            return res.status(404).json({ error: 'Pengguna tidak ditemukan.' });
        }

        // Respon sukses tanpa konten (204 No Content)
        res.status(204).send();
    } catch (err) {
        // Tangani error server atau ID yang salah format
        res.status(500).json({ error: err.message });
    }
});

// server.js (Bagian Akhir, sebelum app.listen)

// ... (semua route Anda di sini: app.use('/api/pengguna', penggunaRoutes);)

// 4. Impor dan Gunakan Error Handler
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler); // ⬅️ Ini harus diletakkan PALING BAWAH
// (setelah semua app.use dan app.get/post/dll.)

// 5. Jalankan Server
app.listen(port, () => {
    console.log(`✅ Server berjalan di http://localhost:${port}`);
});

// server.js (di bagian ROUTE CRUD)

// Rute POST untuk LOGIN Pengguna
app.post('/api/pengguna/login', async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // 1. Cari pengguna berdasarkan email
        const pengguna = await Pengguna.findOne({ email });

        // 2. Cek apakah pengguna ada DAN password cocok
        if (pengguna && (await pengguna.matchPassword(password))) {
            // Login sukses, kirim token
            res.json({
                _id: pengguna._id,
                nama: pengguna.nama,
                email: pengguna.email,
                token: pengguna.generateToken(), // ⬅️ Membuat token
            });
        } else {
            res.status(401); // Unauthorized
            throw new Error('Email atau password tidak valid.');
        }

    } catch (err) {
        next(err);
    }
});

//nambah comment aja

