// fungsi.js

function tambah(a, b) {
    return a + b;
}

function kali(a, b) {
    return a * b;
}

// Export fungsi yang ingin diekspos ke file lain
module.exports = {
    tambah,
    kali
};