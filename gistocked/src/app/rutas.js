'use client'

import './globals.css';
import Sidebar from './components/sidebar';
import Login from './auth/UserLogin/page';

import { useState, useEffect } from 'react';

const Rutas = ({ children }) => {
  const [usuarioActivo, setUsuarioActivo] = useState(false);
  const [usuarioInfo, setUsuarioInfo] = useState({});
  const [mostrarUsuarioActivo, setMostrarUsuarioActivo] = useState(false);

  useEffect(() => {
    if (usuarioActivo) {
      const timer = setTimeout(() => {
        setMostrarUsuarioActivo(true);
      }, 1000); // Delay de 1000 ms

      return () => clearTimeout(timer);
    } else {
      setMostrarUsuarioActivo(false);
    }
  }, [usuarioActivo]);

  return (
      <>
        {mostrarUsuarioActivo ? (
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
              {children}
            </div>
          </div>
        ) : (
          <Login
            setUsuarioActivo={setUsuarioActivo}
            setUsuarioInfo={setUsuarioInfo}
          />
        )}
      </>
  );
};

export default Rutas;