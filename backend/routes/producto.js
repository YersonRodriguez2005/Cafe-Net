const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Ruta para obtener todos los productos
router.get('/productos', (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      console.error('Error al obtener productos:', err);
      return res.status(500).json({ message: 'Error al obtener productos' });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
