import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  // Definimos el estado para correo, contraseña y los mensajes de error
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();

  // Función para manejar el submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificamos que los campos no estén vacíos
    if (!correo || !contraseña) {
      toast.error('Por favor, ingrese el correo y la contraseña.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: "light",
      });
      return;
    }

    try {
      // Hacemos la solicitud POST al backend para hacer login
      const response = await axios.post('http://localhost:5000/api/login', {
        correo,
        contraseña
      });

      // Si la respuesta es exitosa, almacenamos el token
      toast.success('Login exitoso', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: "light",
      });

      // Retrasar la redirección para mostrar el toast
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);

      console.log('Token recibido:', response.data.token);

    } catch (error) {
      // Si ocurre un error, mostramos el mensaje correspondiente
      if (error.response && error.response.status === 401) {
        toast.error('Contraseña incorrecta', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          theme: "light",
        });
      } else if (error.response && error.response.status === 404) {
        toast.error('Usuario no encontrado', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          theme: "light",
        });
      } else {
        toast.error('Error en el servidor. Intente más tarde.', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          theme: "light",
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#f7f4e6] to-[#d9c7a1] animate-fade-in">
      <div className="bg-white p-8 rounded-xl shadow-xl w-80">
        <h2 className="text-3xl font-semibold text-center text-[#5c4033] mb-6">Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="correo" className="block text-sm font-medium text-[#5c4033]">Correo electrónico</label>
            <input
              type="email"
              id="correo"
              className="w-full px-4 py-3 border border-[#d9c7a1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5c4033] text-[#5c4033] placeholder-[#5c4033]"
              placeholder="Correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="contraseña" className="block text-sm font-medium text-[#5c4033]">Contraseña</label>
            <input
              type="password"
              id="contraseña"
              className="w-full px-4 py-3 border border-[#d9c7a1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5c4033] text-[#5c4033] placeholder-[#5c4033]"
              placeholder="Contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#5c4033] text-white rounded-lg hover:bg-[#4b2f1c] transition duration-300 ease-in-out"
          >
            Iniciar sesión
          </button>
        </form>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Login;
