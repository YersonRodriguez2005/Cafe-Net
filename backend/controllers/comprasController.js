const db = require('../config/db');

// Controlador para registrar una nueva compra
const registrarCompra = (req, res) => {
  const { nombre_proveedor, nombre_producto, cantidad, precio } = req.body;

  // Verificar que los campos requeridos no estén vacíos
  if (!nombre_proveedor || !nombre_producto || !cantidad || !precio) {
    return res.status(400).json({ message: 'Por favor, ingrese todos los datos requeridos (nombre_proveedor, nombre_producto, cantidad, precio).' });
  }

  // Obtener el ID del proveedor a partir del nombre
  db.query('SELECT id_proveedor FROM proveedores WHERE nombre = ?', [nombre_proveedor], (err, proveedorResult) => {
    if (err) {
      console.error('Error al consultar el proveedor: ', err);
      return res.status(500).json({ message: 'Error al consultar el proveedor.' });
    }

    if (proveedorResult.length === 0) {
      return res.status(404).json({ message: 'Proveedor no encontrado.' });
    }

    const idProveedor = proveedorResult[0].id_proveedor;

    // Obtener el ID del producto a partir del nombre
    db.query('SELECT id_producto FROM productos WHERE nombre_producto = ?', [nombre_producto], (err, productoResult) => {
      if (err) {
        console.error('Error al consultar el producto: ', err);
        return res.status(500).json({ message: 'Error al consultar el producto.' });
      }

      if (productoResult.length === 0) {
        return res.status(404).json({ message: 'Producto no encontrado.' });
      }

      const idProducto = productoResult[0].id_producto;

      // Insertar la nueva compra en la base de datos
      const queryCompra = `
        INSERT INTO compras (id_proveedor, id_producto, cantidad, precio)
        VALUES (?, ?, ?, ?)
      `;

      db.query(queryCompra, [idProveedor, idProducto, cantidad, precio], (err, result) => {
        if (err) {
          console.error('Error al registrar la compra: ', err);
          return res.status(500).json({ message: 'Error en el servidor al registrar la compra.' });
        }

        // Calcular la cantidad disponible después de la compra y las ventas
        const queryInventario = `
          SELECT 
            IFNULL(SUM(c.cantidad), 0) AS total_comprado, 
            IFNULL((SELECT SUM(cantidad) FROM ventas WHERE id_producto = ?), 0) AS total_vendido
          FROM compras c
          WHERE id_producto = ?
        `;
        
        db.query(queryInventario, [idProducto, idProducto], (err, inventarioResult) => {
          if (err) {
            console.error('Error al calcular el inventario: ', err);
            return res.status(500).json({ message: 'Error al calcular el inventario.' });
          }

          const totalComprado = inventarioResult[0].total_comprado;
          const totalVendido = inventarioResult[0].total_vendido;
          const cantidadDisponible = totalComprado - totalVendido;

          // Aquí ya no actualizamos la tabla de productos, simplemente devolvemos los resultados
          // Enviar respuesta exitosa con el ID de la compra registrada
          return res.status(201).json({
            message: 'Compra registrada exitosamente',
            id_compra: result.insertId,
            cantidad_disponible: cantidadDisponible // Devolvemos la cantidad disponible
          });
        });
      });
    });
  });
};

module.exports = { registrarCompra };
