const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Lógica para manejar el login
const login = (req, res) => {
  const { correo, contraseña } = req.body;

  // Verificar que los campos no estén vacíos
  if (!correo || !contraseña) {
    return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
  }

  // Consultar el usuario en la base de datos
  db.query('SELECT * FROM usuarios WHERE correo = ?', [correo], (err, results) => {
    if (err) {
      console.error('Error en la consulta: ', err);
      return res.status(500).json({ message: 'Error en el servidor' });
    }

    // Si no se encuentra el usuario
    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const usuario = results[0];

    // Verificar si la contraseña está presente en los resultados
    if (!usuario.contraseña) {
      return res.status(500).json({ message: 'Error: la contraseña del usuario no está definida en la base de datos' });
    }

    // Eliminar espacios adicionales de la contraseña
    const contraseñaLimpiada = contraseña.trim();
    const contraseñaAlmacenada = usuario.contraseña.trim();

    // Comparar la contraseña proporcionada con la almacenada en la base de datos
    if (contraseñaLimpiada !== contraseñaAlmacenada) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Crear un JWT (JSON Web Token)
    const token = jwt.sign(
      { id_usuario: usuario.id_usuario, nombre: usuario.nombre, rol: usuario.rol },
      'tu_clave_secreta', // Cambia esto por una clave secreta segura
      { expiresIn: '1h' } // El token expirará en 1 hora
    );

    // Devolver el token al usuario
    return res.status(200).json({ message: 'Login exitoso', token });
  });
};

module.exports = { login };
