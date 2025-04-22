const express = require('express');
const router = express.Router();
const { obtenerInventario } = require('../controllers/inventarioController');

// Ruta para consultar el inventario
router.get('/inventario', obtenerInventario);

module.exports = router;
