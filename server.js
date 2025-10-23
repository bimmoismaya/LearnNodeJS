// // server.js

// // 1. Impor Express
// const express = require('express');

// // 2. Buat instance aplikasi Express
// const app = express();
// const port = 3000; // Tentukan port server Anda

// // 3. Definisikan Route (Rute) Pertama
// // Route ini akan menangani permintaan HTTP GET ke alamat dasar (root: /)
// app.get('/', (req, res) => {
//     // res.send() mengirim respons kembali ke client (browser)
//     res.send('Halo Dunia! Ini Server Express Pertama Saya!');
// });

// // 4. Jalankan Server
// app.listen(port, () => {
//     console.log(`Server sedang berjalan di http://localhost:${port}`);
//     console.log('Tekan Ctrl+C untuk menghentikan server.');
// });


// server.js (di bagian atas)
const app = express();

// Middleware: Ini memungkinkan Express membaca JSON yang dikirimkan di body request
app.use(express.json()); 

const port = 3000;
// ... (lanjutan kode)
// server.js (lanjutan)

// Definisikan array data sederhana (simulasi database)
let daftarPengguna = [
    { id: 1, nama: 'Budi' },
    { id: 2, nama: 'Ani' }
];

// Rute GET untuk mengambil SEMUA pengguna
app.get('/pengguna', (req, res) => {
    // Express otomatis mengkonversi objek JavaScript menjadi JSON
    res.json(daftarPengguna); 
});

// Rute GET untuk mengambil pengguna berdasarkan ID (Parameter Routing)
// :id adalah parameter dinamis yang bisa diakses via req.params
app.get('/pengguna/:id', (req, res) => {
    const userId = parseInt(req.params.id); // Ambil ID dari URL
    const pengguna = daftarPengguna.find(u => u.id === userId);

    if (pengguna) {
        res.json(pengguna);
    } else {
        res.status(404).send('Pengguna tidak ditemukan.');
    }
});

