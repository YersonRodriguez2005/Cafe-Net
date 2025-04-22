const db = require('../config/db');

// Controlador para registrar una nueva venta
const registrarVenta = (req, res) => {
  const { nombre_cliente, nombre_producto, cantidad, total } = req.body;

  // Verificar que los campos requeridos no estén vacíos
  if (!nombre_cliente || !nombre_producto || !cantidad || !total) {
    return res.status(400).json({ message: 'Por favor, ingrese todos los datos requeridos (nombre_cliente, nombre_producto, cantidad, total).' });
  }

  // Obtener el ID del cliente a partir del nombre
  db.query('SELECT id_cliente FROM clientes_distribuidores WHERE nombre = ?', [nombre_cliente], (err, clienteResult) => {
    if (err) {
      console.error('Error al consultar el cliente: ', err);
      return res.status(500).json({ message: 'Error al consultar el cliente.' });
    }

    if (clienteResult.length === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado.' });
    }

    const idCliente = clienteResult[0].id_cliente;

    // Obtener el ID del producto y su cantidad disponible
    db.query('SELECT id_producto, cantidad FROM productos WHERE nombre_producto = ?', [nombre_producto], (err, productoResult) => {
      if (err) {
        console.error('Error al consultar el producto: ', err);
        return res.status(500).json({ message: 'Error al consultar el producto.' });
      }

      if (productoResult.length === 0) {
        return res.status(404).json({ message: 'Producto no encontrado.' });
      }

      const idProducto = productoResult[0].id_producto;
      const cantidadDisponible = productoResult[0].cantidad; // Obtener la cantidad actual disponible

      // Verificar si hay suficiente stock para realizar la venta
      if (cantidad > cantidadDisponible) {
        return res.status(400).json({ message: 'No hay suficiente stock disponible para la venta.' });
      }

      // Obtener la fecha actual
      const fecha = new Date().toISOString().slice(0, 19).replace('T', ' ');

      // Insertar la nueva venta en la base de datos
      const queryVenta = `
        INSERT INTO ventas (id_cliente, id_producto, fecha, cantidad, total) 
        VALUES (?, ?, ?, ?, ?)
      `;

      db.query(queryVenta, [idCliente, idProducto, fecha, cantidad, total], (err, result) => {
        if (err) {
          console.error('Error al registrar la venta: ', err);
          return res.status(500).json({ message: 'Error en el servidor al registrar la venta.' });
        }

        // Actualizar la cantidad del producto en el inventario restando la cantidad vendida
        const queryUpdateInventario = `
          UPDATE productos
          SET cantidad = cantidad - ?
          WHERE id_producto = ?
        `;

        db.query(queryUpdateInventario, [cantidad, idProducto], (err) => {
          if (err) {
            console.error('Error al actualizar el inventario: ', err);
            return res.status(500).json({ message: 'Error al actualizar el inventario.' });
          }

          // Devolver respuesta exitosa con el ID de la venta registrada
          return res.status(201).json({
            message: 'Venta registrada exitosamente',
            id_venta: result.insertId
          });
        });
      });
    });
  });
};

module.exports = { registrarVenta };
