import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Dashboard from './components/dashboard';
import RegistrarCompra from './components/RegistrarCompra';
import RegistrarVenta from './components/RegistrarVenta';
import GestionInventario from './components/GestionInventario';
import GenerarReportes from './components/GenerarReportes';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/registrar-compra" element={<RegistrarCompra />} />
        <Route path="/registrar-venta" element={<RegistrarVenta />} />
        <Route path="/gestion-inventario" element={<GestionInventario />} />
        <Route path="/generar-reportes" element={<GenerarReportes />} />
      </Routes>
    </Router>
  );
};

export default App;