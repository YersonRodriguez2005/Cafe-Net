import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RegistrarCompra = () => {
    const [nombreProveedor, setNombreProveedor] = useState('');
    const [nombreProducto, setNombreProducto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [precio, setPrecio] = useState('');
    const [proveedores, setProveedores] = useState([]);
    const [productos, setProductos] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [loading, setLoading] = useState(false);

    // Obtener proveedores y productos desde la base de datos
    useEffect(() => {
        const fetchProveedores = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/proveedores');
                setProveedores(response.data);
            } catch (error) {
                console.error("Error al cargar los proveedores:", error);
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

        fetchProveedores();
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
        if (!nombreProveedor || !nombreProducto || !cantidad || !precio) {
            setMensaje('Por favor, ingrese todos los datos requeridos (proveedor, producto, cantidad, precio).');
            return;
        }

        // Convertir el precio y la cantidad a números antes de enviarlos
        const cantidadSinFormato = removeFormatting(cantidad);
        const precioSinFormato = removeFormatting(precio);

        setLoading(true);
        setMensaje('');

        try {
            const response = await axios.post('http://localhost:5000/api/compras', {
                nombre_proveedor: nombreProveedor,
                nombre_producto: nombreProducto,
                cantidad: cantidadSinFormato,
                precio: precioSinFormato
            });

            setMensaje(`Compra registrada exitosamente. ID de la compra: ${response.data.id_compra}`);
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setMensaje('Error al registrar la compra. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
            <h2 className="text-2xl font-bold text-center mb-6">Registrar Compra</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="nombreProveedor" className="block text-sm font-medium text-gray-700">Seleccionar Proveedor</label>
                    <select
                        id="nombreProveedor"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={nombreProveedor}
                        onChange={(e) => setNombreProveedor(e.target.value)}
                    >
                        <option value="">Seleccione un proveedor</option>
                        {proveedores.map((proveedor) => (
                            <option key={proveedor.id_proveedor} value={proveedor.nombre}>
                                {proveedor.nombre}
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
                    <label htmlFor="precio" className="block text-sm font-medium text-gray-700">Precio</label>
                    <input
                        type="text"
                        id="precio"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Precio"
                        value={precio && formatNumber(precio)}
                        onChange={(e) => setPrecio(removeFormatting(e.target.value))}
                    />
                </div>

                {mensaje && <p className="text-center text-red-500 mb-4">{mensaje}</p>}

                <button
                    type="submit"
                    className={`w-full py-2 bg-blue-500 text-white rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                    disabled={loading}
                >
                    {loading ? 'Registrando...' : 'Registrar Compra'}
                </button>
            </form>
        </div>
    );
};

export default RegistrarCompra;
