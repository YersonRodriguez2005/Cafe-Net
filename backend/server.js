const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const comprasRoutes = require('./routes/compras');
const ventasRoutes = require('./routes/ventas');
const inventarioRoutes = require('./routes/inventario');
const reporteRoutes = require('./routes/reporteRoutes');
const proveedorRoutes = require('./routes/proveedor');
const productoRoutes = require('./routes/producto');
const clienteRoutes = require('./routes/cliente');
const estadisticaRoutes = require('./routes/estadisticas');

// Crear una instancia de la aplicación Express
const app = express();

// Middleware para parsear los datos en formato JSON
app.use(bodyParser.json());
app.use(cors());

// Rutas de autenticación
app.use('/api', authRoutes);
// Rutas de compras
app.use('/api', comprasRoutes);
// Rutas de ventas
app.use('/api', ventasRoutes);
// Rutas de inventario
app.use('/api', inventarioRoutes);
// Rutas de reportes
app.use('/api', reporteRoutes);
// Rutas de proveedores
app.use('/api', proveedorRoutes);
// Rutas de productos
app.use('/api', productoRoutes);
// Rutas de cliente
app.use('/api', clienteRoutes);
// Rutas de estadistica
app.use('/api', estadisticaRoutes);

// Configurar el puerto del servidor
const PORT = process.env.PORT || 5000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});