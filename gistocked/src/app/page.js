'use client';
import { useState, useEffect } from "react";

const Home = ({ usuarioInfo }) => {
  const [nombre, setNombre] = useState('');
  const [rol, setRol] = useState('');
  const [correo, setCorreo] = useState('');
  const [rut, setRut] = useState('');
  const [aux, setAux] = useState('');

  useEffect(() => {
    if (usuarioInfo) {
      if (usuarioInfo.id_rol === 1) {
        setNombre(usuarioInfo.nombre_usuario);
        setCorreo(usuarioInfo.email);
        setRol('Administrador');
        setAux('Correo');
      } else if (usuarioInfo.rut) {
        let rutFormateado = formatearRut(usuarioInfo.rut);
        setNombre(usuarioInfo.nombres);
        setRut(rutFormateado);
        setRol('Vendedor');
        setAux('Rut');
      } else {
        console.log('No hay un usuario activo');
      }
    }
  }, [usuarioInfo]);

  const formatearRut = (rut) => {
    const soloNumeros = rut.replace(/[^\dK]/g, '');
    const digitoVerificador = soloNumeros.charAt(soloNumeros.length - 1);
    const rutNumerico = soloNumeros.slice(0, -1);
    const rutFormateado = rutNumerico
      .split('')
      .reverse()
      .join('')
      .replace(/(\d{3})(?=\d)/g, '$1.')
      .split('')
      .reverse()
      .join('');

    return `${rutFormateado}-${digitoVerificador}`;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-200 to-blue-300">
      <div className="min-h-screen flex flex-col">
        {/* Barra superior */}
        <div className="bg-white shadow-lg border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {nombre.charAt(0)}
                  </span>
                </div>
                <span className="ml-3 text-gray-900 font-medium">{nombre}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {rol}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="bg-white shadow-lg rounded-lg max-w-2xl w-full p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                Panel de Usuario
              </h1>
              <p className="text-sm text-gray-500">
                Gestione su información personal
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo
                </label>
                <input 
                  type="text" 
                  value={nombre} 
                  readOnly 
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {aux}
                </label>
                <input 
                  type="text" 
                  value={correo || rut}
                  readOnly 
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rol del Sistema
                </label>
                <input 
                  type="text" 
                  value={rol} 
                  readOnly 
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Última actualización: {new Date().toLocaleDateString()}</span>
                  <span>ID: {usuarioInfo?.id_rol || '2'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="text-center text-sm text-gray-500">
              Sistema de Gestión Privada Gistocked © {new Date().getFullYear()}
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default Home;
