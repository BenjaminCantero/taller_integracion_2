"use client"; // Asegúrate de que esto esté al principio

import './globals.css'; // Importa tus estilos globales
import Sidebar from './components/sidebar'; // Importa el Sidebar
import { useState, useEffect } from 'react';

const Layout = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // o un spinner de carga
  }

  return (
    <html lang="es">
      <body className="flex h-screen bg-gray-100">
        <Sidebar /> {/* Asegúrate de que el Sidebar esté aquí */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 ml-64">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
};

export default Layout;
