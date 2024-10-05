"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-200 ease-in-out md:relative md:translate-x-0`}
      >
        <nav className="space-y-2">
          <Link href="/" className="block px-4 py-2 hover:bg-gray-700 transition-colors focus:outline-none">
            Inicio
          </Link>
          <Link href="/products" className="block px-4 py-2 hover:bg-gray-700 transition-colors focus:outline-none">
            Productos
          </Link>
          <Link href="/sales" className="block px-4 py-2 hover:bg-gray-700 transition-colors focus:outline-none">
            Ventas
          </Link>
          <Link href="/inventory" className="block px-4 py-2 hover:bg-gray-700 transition-colors focus:outline-none">
            Inventario
          </Link>
          <Link href="/Grafics" className="block px-4 py-2 hover:bg-gray-700 transition-colors focus:outline-none">
            Graficos
          </Link>
          <Link href="/perfil" className="block px-4 py-2 hover:bg-gray-700 transition-colors focus:outline-none">
            Perfil
          </Link>
          <Link href="/Prueba" className="block px-4 py-2 hover:bg-gray-700 transition-colors focus:outline-none">
            Prueba
          </Link>
          <Link href="/auth/UserLogin" className="block px-4 py-2 mt-4 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none">
            Iniciar Sesión
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col">
        {/* Header */}
        <header className="bg-gray-900 text-white shadow-md p-4 flex items-center md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={isSidebarOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-grow max-w-7xl mx-auto p-6">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white shadow-md mt-8">
          <div className="max-w-7xl mx-auto py-4 text-center">
            <p className="text-sm">&copy; 2024 Mi Tienda. Todos los derechos reservados.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
