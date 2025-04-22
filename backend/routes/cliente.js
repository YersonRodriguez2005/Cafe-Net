const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Ruta para obtener todos los clientes_distribuidores
router.get('/clientes_distribuidores', (req, res) => {
  db.query('SELECT * FROM clientes_distribuidores', (err, results) => {
    if (err) {
      console.error('Error al obtener clientes_distribuidores:', err);
      return res.status(500).json({ message: 'Error al obtener clientes_distribuidores' });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
