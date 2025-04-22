import React, { useState } from 'react';
import axios from 'axios';

const GenerarReportes = () => {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [idProveedor, setIdProveedor] = useState('');
  const [tipoCafe, setTipoCafe] = useState('');
  const [reporte, setReporte] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    setMensaje('');

    try {
      const response = await axios.get('http://localhost:5000/api/reportes', {
        params: {
          fecha_inicio: fechaInicio,
          fecha_fin: fechaFin,
          id_proveedor: idProveedor,
          tipo_cafe: tipoCafe
        }
      });

      setReporte(response.data);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMensaje('Error al generar el reporte. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Generar Reportes</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        {/* Filtros de fecha */}
        <div>
          <label htmlFor="fechaInicio" className="block text-sm font-medium text-gray-700">Fecha Inicio</label>
          <input
            type="date"
            id="fechaInicio"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="fechaFin" className="block text-sm font-medium text-gray-700">Fecha Fin</label>
          <input
            type="date"
            id="fechaFin"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Filtro de proveedor */}
        <div>
          <label htmlFor="idProveedor" className="block text-sm font-medium text-gray-700">ID del Proveedor</label>
          <input
            type="number"
            id="idProveedor"
            value={idProveedor}
            onChange={(e) => setIdProveedor(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Ingrese ID del proveedor (opcional)"
          />
        </div>

        {/* Filtro de tipo de café */}
        <div>
          <label htmlFor="tipoCafe" className="block text-sm font-medium text-gray-700">Tipo de Café</label>
          <input
            type="text"
            id="tipoCafe"
            value={tipoCafe}
            onChange={(e) => setTipoCafe(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Ingrese nombre del café (opcional)"
          />
        </div>

        {/* Botón de generar reporte */}
        <button
          type="submit"
          className={`w-full py-2 bg-blue-500 text-white rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          disabled={loading}
        >
          {loading ? 'Generando reporte...' : 'Generar Reporte'}
        </button>
      </form>

      {/* Mensaje de error */}
      {mensaje && <p className="text-center text-red-500 mb-4">{mensaje}</p>}

      {/* Tabla de resultados */}
      {reporte.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border-b p-2">Producto</th>
                <th className="border-b p-2">Fecha Compra</th>
                <th className="border-b p-2">Cantidad Comprada</th>
                <th className="border-b p-2">Precio</th>
                <th className="border-b p-2">Total Compra</th>
                <th className="border-b p-2">Fecha Venta</th>
                <th className="border-b p-2">Cantidad Vendida</th>
                <th className="border-b p-2">Total Venta</th>
              </tr>
            </thead>
            <tbody>
              {reporte.map((item, index) => (
                <tr key={index}>
                  <td className="border-b p-2">{item.nombre_producto}</td>
                  <td className="border-b p-2">{item.fecha_compra}</td>
                  <td className="border-b p-2">{item.cantidad}</td>
                  <td className="border-b p-2">${item.precio}</td>
                  <td className="border-b p-2">${item.total_compra}</td>
                  <td className="border-b p-2">{item.fecha_venta}</td>
                  <td className="border-b p-2">{item.cantidad_vendida}</td>
                  <td className="border-b p-2">${item.total_venta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GenerarReportes;
