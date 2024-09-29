"use client";

import { useState } from "react";
import { signOut } from 'next-auth/react';


import Link from "next/link"; // Asegúrate de importar Link

function Button_Navigation_Menu({ nombreUsuario, rolUsuario }) { 

  const cerrarSesion = () => {
    signOut({ callbackUrl: "/" });
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <div>
      <button className="md:hidden text-white focus:outline-none" onClick={toggleMenu} aria-label="Toggle navigation">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {isMenuOpen && (
        <nav className="md:hidden w-1/2 h-full bg-gray-900 rounded-l-md fixed top-0 right-0 z-50">
          <button onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mt-2 ml-2 text-white bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </button>

          <div className="flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="text-white bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg>

            <p className="mt-2 text-white">{nombreUsuario}</p>
          </div>
          

          <Link href="/" className="block px-4 py-2 hover:bg-gray-700 transition-colors focus:outline-none">Inicio</Link>
          <Link href="/products" className="block px-4 py-2 hover:bg-gray-700 transition-colors focus:outline-none">Productos</Link>
          <Link href="/sales" className="block px-4 py-2 hover:bg-gray-700 transition-colors focus:outline-none">Ventas</Link>
          <Link href="/inventory" className="block px-4 py-2 hover:bg-gray-700 transition-colors focus:outline-none">Inventario</Link>

          {rolUsuario === 1 && (
            <>
              <Link href="/worker_management/" className="block px-4 py-2 hover:bg-gray-700 transition-colors focus:outline-none">Gestion de Trabajadores</Link>
            </>
          )}
          
          <button onClick={ cerrarSesion } className="w-full text-white text-start rounded-md block px-4 py-2 hover:bg-gray-700 transition-colors focus:outline-none">
            Cerrar Sesión
          </button>
          
        </nav>
      )}
    </div>
  );
}

export default Button_Navigation_Menu;