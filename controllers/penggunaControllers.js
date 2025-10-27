// controllers/penggunaController.js

const Pengguna = require('../models/Pengguna');

// 1. CREATE
exports.buatPengguna = async (req, res) => {
    try {
        const penggunaBaru = new Pengguna(req.body); 
        const hasilSimpan = await penggunaBaru.save();
        res.status(201).json(hasilSimpan);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// 2. READ All
exports.getAllPengguna = async (req, res) => {
    try {
        const pengguna = await Pengguna.find({}); 
        res.status(200).json(pengguna);
    } catch (err) {
        res.status(500).json({ error: 'Gagal mengambil data' });
    }
};

// 3. UPDATE
exports.updatePengguna = async (req, res) => {
    try {
        const id = req.params.id;
        const dataUpdate = req.body;
        const penggunaDiperbarui = await Pengguna.findByIdAndUpdate(id, dataUpdate, { new: true, runValidators: true });

        if (!penggunaDiperbarui) {
            return res.status(404).json({ error: 'Pengguna tidak ditemukan.' });
        }
        res.status(200).json(penggunaDiperbarui);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// 4. DELETE
exports.deletePengguna = async (req, res) => {
    try {
        const penggunaDihapus = await Pengguna.findByIdAndDelete(req.params.id);

        if (!penggunaDihapus) {
            return res.status(404).json({ error: 'Pengguna tidak ditemukan.' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// routes/penggunaRoutes.js

const express = require('express');
const router = express.Router();
const controller = require('../controllers/penggunaController');

// Route untuk /api/pengguna
router.route('/')
    .get(controller.getAllPengguna)   // GET /api/pengguna
    .post(controller.buatPengguna);  // POST /api/pengguna

// Route untuk /api/pengguna/:id
router.route('/:id')
    .put(controller.updatePengguna)   // PUT /api/pengguna/:id
    .delete(controller.deletePengguna); // DELETE /api/pengguna/:id

module.exports = router;

// controllers/penggunaController.js

const asyncHandler = require('express-async-handler'); // ⬅️ Impor Handler
const Pengguna = require('../models/Pengguna');

// 1. CREATE (Sebelumnya menggunakan try...catch)
exports.buatPengguna = asyncHandler(async (req, res) => {
    // Logika tanpa try...catch. Error akan ditangkap oleh asyncHandler
    const penggunaBaru = new Pengguna(req.body); 
    const hasilSimpan = await penggunaBaru.save();
    
    // Pastikan status 201
    res.status(201).json(hasilSimpan);
});

// 2. READ All
exports.getAllPengguna = asyncHandler(async (req, res) => {
    const pengguna = await Pengguna.find({}); 
    res.status(200).json(pengguna);
});

// 3. UPDATE
exports.updatePengguna = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const dataUpdate = req.body;

    const penggunaDiperbarui = await Pengguna.findByIdAndUpdate(id, dataUpdate, { new: true, runValidators: true });

    if (!penggunaDiperbarui) {
        // Jika tidak ditemukan, set status 404
        res.status(404);
        throw new Error('Pengguna tidak ditemukan.'); // ⬅️ Melemparkan error ke asyncHandler
    }

    res.status(200).json(penggunaDiperbarui);
});

// 4. DELETE
exports.deletePengguna = asyncHandler(async (req, res) => {
    const penggunaDihapus = await Pengguna.findByIdAndDelete(req.params.id);

    if (!penggunaDihapus) {
        res.status(404);
        throw new Error('Pengguna tidak ditemukan.'); // ⬅️ Melemparkan error ke asyncHandler
    }
    
    res.status(204).send(); 
});