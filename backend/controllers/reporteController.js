const db = require('../config/db');

// Controlador para generar los reportes
const generarReporte = (req, res) => {
  const { fecha_inicio, fecha_fin, id_proveedor, tipo_cafe } = req.query;

  // Construir la consulta de compras con filtros
  let query = `
    SELECT p.nombre_producto, c.fecha_compra, c.cantidad, c.precio, (c.cantidad * c.precio) AS total_compra,
           v.fecha AS fecha_venta, v.cantidad AS cantidad_vendida, v.total AS total_venta
    FROM compras c
    LEFT JOIN productos p ON c.id_producto = p.id_producto
    LEFT JOIN ventas v ON p.id_producto = v.id_producto
    WHERE 1=1
  `;

  // Agregar los filtros de fecha
  if (fecha_inicio && fecha_fin) {
    query += ` AND c.fecha_compra BETWEEN ? AND ?`;
  }

  // Agregar el filtro de proveedor
  if (id_proveedor) {
    query += ` AND c.id_proveedor = ?`;
  }

  // Agregar el filtro de tipo de café
  if (tipo_cafe) {
    query += ` AND p.nombre_producto LIKE ?`;
  }

  // Ejecutar la consulta
  db.query(query, [fecha_inicio, fecha_fin, id_proveedor, `%${tipo_cafe}%`], (err, results) => {
    if (err) {
      console.error('Error al generar el reporte: ', err);
      return res.status(500).json({ message: 'Error en el servidor al generar el reporte.' });
    }

    // Enviar la respuesta con los resultados
    return res.status(200).json(results);
  });
};

module.exports = { generarReporte };
