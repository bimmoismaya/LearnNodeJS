// index.js

// const pesan = "Selamat datang di dunia Node.js!";
// const tahunSaatIni = new Date().getFullYear();

// console.log(pesan);
// console.log(`Tahun sekarang adalah: ${tahunSaatIni}`);

// index.js

// Mengimpor module yang telah kita buat
// const { tambah, kali } = require('./fungsi');

// const hasilTambah = tambah(10, 5);
// const hasilKali = kali(4, 6);

// console.log(`Hasil Penambahan: ${hasilTambah}`); // 15
// console.log(`Hasil Perkalian: ${hasilKali}`);    // 24

// index.js (lanjutan)

// const os = require('os');

// console.log(`\nInformasi Sistem Operasi:`);
// console.log(`Platform: ${os.platform()}`);
// console.log(`CPU Architecture: ${os.arch()}`);
// console.log(`Memori Bebas: ${os.freemem()} bytes`);


// index.js

// Mengimpor module Lodash
// const _ = require('lodash');

// const angka = [1, 2, 3, 4, 5];

// // Menggunakan fungsi .chunk dari Lodash
// const hasilChunk = _.chunk(angka, 2);
// console.log("Array asli:", angka);
// console.log("Hasil chunk (dibagi 2):", hasilChunk); // Output: [[1, 2], [3, 4], [5]]


// index.js

// Fungsi yang meniru operasi asinkron (misalnya, mengambil data)
function ambilDataSetelah(detik) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Data diterima setelah ${detik} detik.`);
        }, detik * 1000);
    });
}

async function jalankanProses() {
    console.log("Mulai mengambil data...");

    // 'await' akan MENUNGGU Promise selesai sebelum melanjutkan
    const data1 = await ambilDataSetelah(2);
    console.log(data1);

    const data2 = await ambilDataSetelah(1);
    console.log(data2);

    console.log("Semua proses selesai.");
}

jalankanProses();