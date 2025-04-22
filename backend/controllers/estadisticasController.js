// controllers/estadisticasController.js
const db = require('../config/db');

const obtenerEstadisticas = (req, res) => {
  // Obtener ventas del mes
  const queryVentas = `
    SELECT SUM(total * cantidad) AS ventas_mes
    FROM ventas
    WHERE MONTH(fecha) = MONTH(CURRENT_DATE)
  `;
  
  // Obtener compras del mes
  const queryCompras = `
    SELECT SUM(precio * cantidad) AS compras_mes
    FROM compras
    WHERE MONTH(fecha_compra) = MONTH(CURRENT_DATE)
  `;

  // Obtener productos en stock
  const queryProductosEnStock = `
    SELECT 
        p.id_producto,
        p.nombre_producto,
        IFNULL(SUM(c.cantidad), 0) - IFNULL(SUM(v.cantidad), 0) AS productos_en_stock
    FROM 
        productos p
    LEFT JOIN 
        compras c ON p.id_producto = c.id_producto
    LEFT JOIN 
        ventas v ON p.id_producto = v.id_producto
    GROUP BY 
        p.id_producto
  `;

  // Obtener alertas de inventario (productos con stock bajo, por ejemplo)
  const queryAlertasInventario = `
    SELECT COUNT(*) AS alertas_inventario
    FROM inventarios
    WHERE cantidad < 10
  `;

  db.query(queryVentas, (err, ventasResult) => {
    if (err) {
      console.error('Error al obtener ventas: ', err);
      return res.status(500).json({ message: 'Error al obtener ventas' });
    }

    db.query(queryCompras, (err, comprasResult) => {
      if (err) {
        console.error('Error al obtener compras: ', err);
        return res.status(500).json({ message: 'Error al obtener compras' });
      }

      db.query(queryProductosEnStock, (err, productosResult) => {
        if (err) {
          console.error('Error al obtener productos en stock: ', err);
          return res.status(500).json({ message: 'Error al obtener productos en stock' });
        }

        db.query(queryAlertasInventario, (err, alertasResult) => {
          if (err) {
            console.error('Error al obtener alertas de inventario: ', err);
            return res.status(500).json({ message: 'Error al obtener alertas de inventario' });
          }

          // Responder con los resultados
          res.status(200).json({
            ventas_mes: ventasResult[0].ventas_mes || 0,
            compras_mes: comprasResult[0].compras_mes || 0,
            productos_en_stock: productosResult[0].productos_en_stock || 0,
            alertas_inventario: alertasResult[0].alertas_inventario || 0
          });
        });
      });
    });
  });
};

module.exports = { obtenerEstadisticas };
