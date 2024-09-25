"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-gray-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold">Mi Tienda</h1>
          <div className="flex items-center space-x-4">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="hover:text-gray-400 transition-colors focus:outline-none">Inicio</Link>
              <Link href="/products" className="hover:text-gray-400 transition-colors focus:outline-none">Productos</Link>
              <Link href="/sales" className="hover:text-gray-400 transition-colors focus:outline-none">Ventas</Link>
              <Link href="/inventory" className="hover:text-gray-400 transition-colors focus:outline-none">Inventario</Link>
              <Link href="/Grafics" className="hover:text-gray-400 transition-colors focus:outline-none">Graficos</Link>
              <Link href="/perfil" className="hover:text-gray-400 transition-colors focus:outline-none">Perfil</Link>
            </nav>

            {/* Login Button */}
            <Link href="/auth/UserLogin">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Iniciar Sesión</button>
            </Link>


            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle navigation"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden bg-gray-800">
            <Link href="/" className="block px-4 py-2 hover:bg-gray-700 transition-colors focus:outline-none">Inicio</Link>
            <Link href="/products" className="block px-4 py-2 hover:bg-gray-700 transition-colors focus:outline-none">Productos</Link>
            <Link href="/sales" className="block px-4 py-2 hover:bg-gray-700 transition-colors focus:outline-none">Ventas</Link>
            <Link href="/inventory" className="block px-4 py-2 hover:bg-gray-700 transition-colors focus:outline-none">Inventario</Link>
            <Link href="/login" className="block px-4 py-2 hover:bg-gray-700 transition-colors focus:outline-none">Iniciar Sesión</Link>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto p-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white shadow-md mt-8">
        <div className="max-w-7xl mx-auto py-4 text-center">
          <p className="text-sm">&copy; 2024 Mi Tienda. Todos los derechos reservados.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <a href="https://facebook.com" className="hover:text-blue-400 transition-colors focus:outline-none" aria-label="Facebook">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.988H7.898v-2.89h2.54v-2.19c0-2.506 1.492-3.89 3.774-3.89 1.095 0 2.24.194 2.24.194v2.459h-1.262c-1.243 0-1.63.772-1.63 1.563v1.863h2.773l-.443 2.89h-2.33V21.88C18.343 21.127 22 16.991 22 12z"/>
              </svg>
            </a>
            <a href="https://twitter.com" className="hover:text-blue-400 transition-colors focus:outline-none" aria-label="Twitter">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5.5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
              </svg>
            </a>
            <a href="https://instagram.com" className="hover:text-pink-400 transition-colors focus:outline-none" aria-label="Instagram">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 2C4.8 2 3 3.8 3 6v12c0 2.2 1.8 4 4 4h10c2.2 0 4-1.8 4-4V6c0-2.2-1.8-4-4-4H7zm8 2h1.2c.66 0 1.2.54 1.2 1.2V6.8c0 .66-.54 1.2-1.2 1.2H15V4zm-4 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zM16 14a2 2 0 11.001 3.999A2 2 0 0116 14z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
