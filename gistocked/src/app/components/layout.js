import React from 'react';
import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Mi Tienda</h1>
          <nav className="space-x-4">
            <Link href="/" className="hover:text-gray-300">
              Inicio
            </Link>
            <Link href="/products" className="hover:text-gray-300">
              Productos
            </Link>
            <Link href="/sales" className="hover:text-gray-300">
              Ventas
            </Link>
            <Link href="/inventory" className="hover:text-gray-300">
              Inventario
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto p-6">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2024 Mi Tienda. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
