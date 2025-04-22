const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

// Definir la ruta de login
router.post('/login', login);

module.exports = router;
