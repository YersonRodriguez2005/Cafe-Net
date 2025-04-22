const express = require('express');
const router = express.Router();
const { registrarCompra } = require('../controllers/comprasController');

// Ruta para registrar una compra
router.post('/compras', registrarCompra);

module.exports = router;
