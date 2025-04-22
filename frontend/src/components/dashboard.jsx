import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [estadisticas, setEstadisticas] = useState({
    ventas_mes: 0,
    compras_mes: 0,
    productos_en_stock: 0,
    alertas_inventario: 0
  });

  // Cargar las estadísticas del backend
  useEffect(() => {
    const fetchEstadisticas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/estadisticas');
        setEstadisticas(response.data);
      } catch (error) {
        console.error('Error al obtener las estadísticas:', error);
      }
    };

    fetchEstadisticas();
  }, []);

  // Función para formatear números como moneda en Colombia
  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return "$0";
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f4e6] to-[#d9c7a1] p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#5c4033] mb-3">Bienvenido al Dashboard</h2>
        <p className="text-center text-[#8a6d5b] mb-8">Gestión integral de inventario y ventas</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Registro de compra */}
          <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-md border border-[#e2d7bf] hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-opacity-100">
            <Link to="/registrar-compra" className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-[#5c4033]">Registro de compra</h3>
                <div className="bg-[#f0e6d2] p-2 rounded-full flex items-center justify-center w-10 h-10">
                  <span className="text-[#8a6d5b] text-lg">🛒</span>
                </div>
              </div>
              <p className="text-[#5c4033] mb-3">Gestiona las compras realizadas en el sistema.</p>
              <div className="mt-auto">
                <span className="text-sm font-medium text-[#8a6d5b] bg-[#f7f4e6] px-3 py-1 rounded-full">Gestión</span>
              </div>
            </Link>
          </div>

          {/* Card 2: Registro de venta */}
          <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-md border border-[#e2d7bf] hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-opacity-100">
            <Link to="/registrar-venta" className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-[#5c4033]">Registro de venta</h3>
                <div className="bg-[#f0e6d2] p-2 rounded-full flex items-center justify-center w-10 h-10">
                  <span className="text-[#8a6d5b] text-lg">🏷️</span>
                </div>
              </div>
              <p className="text-[#5c4033] mb-3">Registra las ventas realizadas en el sistema.</p>
              <div className="mt-auto">
                <span className="text-sm font-medium text-[#8a6d5b] bg-[#f7f4e6] px-3 py-1 rounded-full">Ventas</span>
              </div>
            </Link>
          </div>

          {/* Card 3: Consulta de inventario */}
          <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-md border border-[#e2d7bf] hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-opacity-100">
            <Link to="/gestion-inventario" className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-[#5c4033]">Consulta de inventario</h3>
                <div className="bg-[#f0e6d2] p-2 rounded-full flex items-center justify-center w-10 h-10">
                  <span className="text-[#8a6d5b] text-lg">📦</span>
                </div>
              </div>
              <p className="text-[#5c4033] mb-3">Consulta el estado actual del inventario disponible.</p>
              <div className="mt-auto">
                <span className="text-sm font-medium text-[#8a6d5b] bg-[#f7f4e6] px-3 py-1 rounded-full">Inventario</span>
              </div>
            </Link>
          </div>

          {/* Card 4: Generación de reportes */}
          <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-md border border-[#e2d7bf] hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-opacity-100">
            <Link to="/generar-reportes" className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-[#5c4033]">Generación de reportes</h3>
                <div className="bg-[#f0e6d2] p-2 rounded-full flex items-center justify-center w-10 h-10">
                  <span className="text-[#8a6d5b] text-lg">📄</span>
                </div>
              </div>
              <p className="text-[#5c4033] mb-3">Genera reportes de compras, ventas e inventario.</p>
              <div className="mt-auto">
                <span className="text-sm font-medium text-[#8a6d5b] bg-[#f7f4e6] px-3 py-1 rounded-full">Informes</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Card 1: Ventas del mes */}
          <div className="bg-white bg-opacity-80 p-6 rounded-xl shadow-md border border-[#e2d7bf]">
            <h4 className="text-sm font-medium text-[#8a6d5b] mb-1">Ventas del mes</h4>
            <p className="text-2xl font-bold text-[#5c4033]">{formatCurrency(estadisticas.ventas_mes)}</p>
          </div>

          {/* Card 2: Compras del mes */}
          <div className="bg-white bg-opacity-80 p-6 rounded-xl shadow-md border border-[#e2d7bf]">
            <h4 className="text-sm font-medium text-[#8a6d5b] mb-1">Compras del mes</h4>
            <p className="text-2xl font-bold text-[#5c4033]">{formatCurrency(estadisticas.compras_mes)}</p>
          </div>

          {/* Card 3: Productos en stock */}
          <div className="bg-white bg-opacity-80 p-6 rounded-xl shadow-md border border-[#e2d7bf]">
            <h4 className="text-sm font-medium text-[#8a6d5b] mb-1">Productos en stock</h4>
            <p className="text-2xl font-bold text-[#5c4033]">{estadisticas.productos_en_stock.toLocaleString()}</p>
          </div>

          {/* Card 4: Alertas de inventario */}
          <div className="bg-white bg-opacity-80 p-6 rounded-xl shadow-md border border-[#e2d7bf]">
            <h4 className="text-sm font-medium text-[#8a6d5b] mb-1">Alertas de inventario</h4>
            <p className="text-2xl font-bold text-[#5c4033]">{estadisticas.alertas_inventario}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
