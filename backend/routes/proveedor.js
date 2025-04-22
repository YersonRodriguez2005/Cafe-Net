const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Ruta para obtener todos los proveedores
router.get('/proveedores', (req, res) => {
  db.query('SELECT * FROM proveedores', (err, results) => {
    if (err) {
      console.error('Error al obtener proveedores:', err);
      return res.status(500).json({ message: 'Error al obtener proveedores' });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
