//configuracion de base de datos
const mysql = require('mysql2');

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cafenet'
});

// Conexión a la base de datos
db.connect(err => {
  if (err) {
    console.error('Error de conexión: ', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

module.exports = db;
