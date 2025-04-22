const db = require('../config/db');

// Controlador para obtener el inventario
const obtenerInventario = (req, res) => {
  const query = `
    SELECT 
      p.id_producto, 
      p.nombre_producto, 
      IFNULL(SUM(c.cantidad), 0) AS total_comprado, 
      IFNULL(SUM(v.cantidad), 0) AS total_vendido, 
      (IFNULL(SUM(c.cantidad), 0) - IFNULL(SUM(v.cantidad), 0)) AS cantidad_disponible
    FROM 
      productos p
    LEFT JOIN 
      compras c ON p.id_producto = c.id_producto
    LEFT JOIN 
      ventas v ON p.id_producto = v.id_producto
    GROUP BY 
      p.id_producto
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al consultar el inventario: ', err);
      return res.status(500).json({ message: 'Error en el servidor al consultar el inventario.' });
    }

    // Devolver los resultados
    res.status(200).json(results);
  });
};

module.exports = { obtenerInventario };
