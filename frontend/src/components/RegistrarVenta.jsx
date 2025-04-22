import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RegistrarVenta = () => {
    const [nombreCliente, setNombreCliente] = useState('');
    const [nombreProducto, setNombreProducto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [total, setTotal] = useState('');
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [loading, setLoading] = useState(false);

    // Obtener clientes y productos desde la base de datos
    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/clientes_distribuidores');
                setClientes(response.data);
            } catch (error) {
                console.error("Error al cargar los clientes:", error);
            }
        };

        const fetchProductos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/productos');
                setProductos(response.data);
            } catch (error) {
                console.error("Error al cargar los productos:", error);
            }
        };

        fetchClientes();
        fetchProductos();
    }, []);

    // Función para formatear números al estilo colombiano
    const formatNumber = (number) => {
        return new Intl.NumberFormat('es-CO').format(number);
    };

    // Función para quitar el formato (puntos)
    const removeFormatting = (formattedNumber) => {
        return formattedNumber.replace(/\./g, '').replace(',', '.');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar si los campos están vacíos
        if (!nombreCliente || !nombreProducto || !cantidad || !total) {
            setMensaje('Por favor, ingrese todos los datos requeridos (nombre_cliente, nombre_producto, cantidad, total).');
            return;
        }

        // Convertir el precio y la cantidad a números antes de enviarlos
        const cantidadSinFormato = removeFormatting(cantidad);
        const totalSinFormato = removeFormatting(total);

        setLoading(true);
        setMensaje('');

        try {
            const response = await axios.post('http://localhost:5000/api/ventas', {
                nombre_cliente: nombreCliente,
                nombre_producto: nombreProducto,
                cantidad: cantidadSinFormato,
                total: totalSinFormato
            });

            setMensaje(`Venta registrada exitosamente. ID de la venta: ${response.data.id_venta}`);
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setMensaje('Error al registrar la venta. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
            <h2 className="text-2xl font-bold text-center mb-6">Registrar Venta</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="nombreCliente" className="block text-sm font-medium text-gray-700">Seleccionar Cliente</label>
                    <select
                        id="nombreCliente"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={nombreCliente}
                        onChange={(e) => setNombreCliente(e.target.value)}
                    >
                        <option value="">Seleccione un cliente</option>
                        {clientes.map((cliente) => (
                            <option key={cliente.id_cliente} value={cliente.nombre}>
                                {cliente.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="nombreProducto" className="block text-sm font-medium text-gray-700">Seleccionar Producto</label>
                    <select
                        id="nombreProducto"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={nombreProducto}
                        onChange={(e) => setNombreProducto(e.target.value)}
                    >
                        <option value="">Seleccione un producto</option>
                        {productos.map((producto) => (
                            <option key={producto.id_producto} value={producto.nombre_producto}>
                                {producto.nombre_producto}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700">Cantidad</label>
                    <input
                        type="text"
                        id="cantidad"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Cantidad"
                        value={cantidad && formatNumber(cantidad)}
                        onChange={(e) => setCantidad(removeFormatting(e.target.value))}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="total" className="block text-sm font-medium text-gray-700">Total</label>
                    <input
                        type="text"
                        id="total"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Total"
                        value={total && formatNumber(total)}
                        onChange={(e) => setTotal(removeFormatting(e.target.value))}
                    />
                </div>

                {mensaje && <p className="text-center text-red-500 mb-4">{mensaje}</p>}

                <button
                    type="submit"
                    className={`w-full py-2 bg-blue-500 text-white rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                    disabled={loading}
                >
                    {loading ? 'Registrando...' : 'Registrar Venta'}
                </button>
            </form>
        </div>
    );
};

export default RegistrarVenta;
