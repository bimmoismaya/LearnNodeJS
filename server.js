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
app.post('/api/pengguna', async (req, res) => {
    try {
        // Buat instance model baru dari data yang dikirim client (req.body)
        const penggunaBaru = new Pengguna(req.body);

        // Simpan ke database
        const hasilSimpan = await penggunaBaru.save();

        res.status(201).json(hasilSimpan);
    } catch (err) {
        // Tangani error validasi (misalnya email duplikat)
        res.status(400).json({ error: err.message });
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

