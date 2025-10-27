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