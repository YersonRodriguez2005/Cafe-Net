// routes/estadisticasRoutes.js
const express = require('express');
const router = express.Router();
const { obtenerEstadisticas } = require('../controllers/estadisticasController');

router.get('/estadisticas', obtenerEstadisticas);

module.exports = router;
