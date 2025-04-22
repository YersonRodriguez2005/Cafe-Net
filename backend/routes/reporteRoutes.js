const express = require('express');
const router = express.Router();
const { generarReporte } = require('../controllers/reporteController');

// Ruta para generar el reporte
router.get('/reportes', generarReporte);

module.exports = router;
