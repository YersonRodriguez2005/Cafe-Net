import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GestionInventario = () => {
  const [inventario, setInventario] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState('');

  // Obtener los datos del inventario al cargar el componente
  useEffect(() => {
    const obtenerInventario = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/inventario');
        // Calcular la cantidad disponible directamente en el frontend
        const datosConDisponible = response.data.map((producto) => {
          const cantidadDisponible = producto.total_comprado - producto.total_vendido;
          return { ...producto, cantidad_disponible: cantidadDisponible };
        });
        setInventario(datosConDisponible);
      } catch (error) {
        setMensaje('Error al cargar el inventario');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    obtenerInventario();
  }, []);

  // Función para formatear números al estilo colombiano
  const formatNumber = (number) => {
    return new Intl.NumberFormat('es-CO').format(number);
  };

  if (loading) {
    return <p>Cargando inventario...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Gestión de Inventario</h2>
      {mensaje && <p className="text-center text-red-500 mb-4">{mensaje}</p>}

      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">Producto</th>
            <th className="border-b p-2">Comprado</th>
            <th className="border-b p-2">Vendido</th>
            <th className="border-b p-2">Disponible</th>
          </tr>
        </thead>
        <tbody>
          {inventario.length > 0 ? (
            inventario.map((producto) => (
              <tr key={producto.id_producto}>
                <td className="border-b p-2">{producto.nombre_producto}</td>
                <td className="border-b p-2">{formatNumber(producto.total_comprado)}</td>
                <td className="border-b p-2">{formatNumber(producto.total_vendido)}</td>
                <td className="border-b p-2">{formatNumber(producto.cantidad_disponible)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-2">No hay productos en inventario</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GestionInventario;
