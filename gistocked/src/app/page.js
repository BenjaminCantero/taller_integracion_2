'use client';
import { useState, useEffect } from "react";
import { User, Mail, Shield, Calendar, Hash } from 'lucide-react';

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
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="min-h-screen flex flex-col">
        {/* Barra superior elegante */}
        <div className="bg-white/70 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl shadow-lg shadow-indigo-200/50 flex items-center justify-center transform hover:rotate-12 transition-all duration-300">
                  <span className="text-white text-lg font-semibold">
                    {nombre.charAt(0)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-900 font-semibold">Bienvenido,</span>
                  <span className="text-indigo-600 font-medium">{nombre}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-200/50 hover:shadow-lg hover:scale-105 transition-all duration-300">
                  {rol}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido principal mejorado */}
        <div className="flex-grow flex items-center justify-center p-8">
          <div className="max-w-4xl w-full">
            {/* Cabecera con mensaje personalizado */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Su Espacio Personal
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Nos complace tenerle como parte de la familia Gistocked. Este es su espacio personalizado donde puede gestionar su información.
              </p>
            </div>

            {/* Tarjeta principal con efecto de cristal */}
            <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-500">
              <div className="grid gap-8">
                {/* Información del usuario con iconos y efectos */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100/50 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <User className="w-5 h-5 text-indigo-600" />
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Nombre Completo
                        </label>
                        <input 
                          type="text" 
                          value={nombre} 
                          readOnly 
                          className="w-full px-4 py-3 bg-white/80 border border-indigo-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100/50 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <Mail className="w-5 h-5 text-indigo-600" />
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          {aux}
                        </label>
                        <input 
                          type="text" 
                          value={correo || rut} 
                          readOnly 
                          className="w-full px-4 py-3 bg-white/80 border border-indigo-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100/50 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <Shield className="w-5 h-5 text-indigo-600" />
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Rol del Sistema
                        </label>
                        <input 
                          type="text" 
                          value={rol} 
                          readOnly 
                          className="w-full px-4 py-3 bg-white/80 border border-indigo-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Información adicional con diseño elegante */}
                <div className="border-t border-gray-100 pt-6 mt-6">
                  <div className="flex items-center justify-between text-sm text-gray-500 px-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Actualizado: {new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Hash className="w-4 h-4" />
                      <span>ID: {usuarioInfo?.id_rol || '2'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mensaje de apreciación */}
            <div className="text-center mt-8">
              <p className="text-gray-600 text-sm italic">
                "Valoramos su confianza y compromiso con nosotros"
              </p>
            </div>
          </div>
        </div>

        {/* Footer elegante */}
        <footer className="bg-white/70 backdrop-blur-md border-t border-gray-100">
          <div className="max-w-7xl mx-auto py-6 px-6">
            <div className="text-center">
              <p className="text-gray-600 font-medium">
                Sistema de Gestión Privada Gistocked
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Innovando juntos desde {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default Home;
