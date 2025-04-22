const express = require('express');
const router = express.Router();
const { registrarVenta } = require('../controllers/ventasController');

// Ruta para registrar una venta
router.post('/ventas', registrarVenta);

module.exports = router;
