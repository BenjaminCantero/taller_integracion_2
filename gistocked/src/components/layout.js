
/*
"use client";

import React, { useState } from 'react';

*/
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

async function Layout({ children }){

  const session = await getServerSession(authOptions);
  console.log(session.user.name);


  /*
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const cerrarAside = () => {
    const elemento = document.getElementById('aside')
    elemento.classList.toggle('hide_element');
    elemento.classList.toggle('show_input');
  }

  */
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-gray-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold">Mi Tienda</h1>
          <h2> Hola {session.user.name} </h2>

          <div className="flex items-center space-x-4">

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="hover:text-gray-400 transition-colors focus:outline-none">Inicio</Link>
              <Link href="/products/" className="hover:text-gray-400 transition-colors focus:outline-none">Productos</Link>
              <Link href="/sales/" className="hover:text-gray-400 transition-colors focus:outline-none">Ventas</Link>
              <Link href="/inventory/" className="hover:text-gray-400 transition-colors focus:outline-none">Inventario</Link>
            </nav>



            {/* Login Button */}
            <Link href="/auth/UserLogin">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors" >Iniciar Sesión</div>
            </Link>

            <Link href="/worker_management">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors" >Worker</div>
            </Link>

            <button /* onClick={cerrarAside} */ >
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
              </svg>
            </button>

            { /* Barra Lateral */}
            <aside id="aside" className="w-1/4 h-full fixed top-0 right-0 z-50 bg-gray-900 rounded-l-lg hide_element">
              <ul className="flex flex-col gap-10">
                <li className="self-start"> {/* Esto coloca el primer elemento en la esquina superior izquierda */}
                    <button /* onClick={cerrarAside} */ className="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-white bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" stroke="currentColor" strokeWidth="2" fill="none"/>
                        </svg>
                    </button>
                </li>
                
                <li className="flex flex-col items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="text-white bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                    </svg>
                    <p className="mt-2 text-white">Nombre de Usuario</p>
                </li>

                <div className="m-auto w-6/12"> {/* Alinea a la izquierda */}
                  <li className="text-white w-full mb-1">
                      <Link href="#"> Perfil de usuario</Link>
                  </li>
                  
                  <li className="text-white w-full mb-1">
                      <Link href="#"> Gestion de vendedores</Link>
                  </li>
                </div>

                <li className="flex flex-col items-center justify-center">
                    <button /* onClick={() => signOut()} */  className="bg-blue-700 text-white rounded-md">
                      Cerrar Sesión
                    </button>
                </li>
              </ul>
            </aside>


    
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white focus:outline-none"
              /*
              onClick={toggleMenu}
              */
              aria-label="Toggle navigation"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" /* d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} */  />
              </svg>
            </button>
          </div>
        </div>




        {/* Mobile Menu */}
        {/*
        {isMenuOpen && (
          <nav className="md:hidden bg-gray-800">
            <Link href="/" className="block px-4 py-2 hover:bg-gray-700 transition-colors focus:outline-none">Inicio</Link>
            <Link href="/products" className="block px-4 py-2 hover:bg-gray-700 transition-colors focus:outline-none">Productos</Link>
            <Link href="/sales" className="block px-4 py-2 hover:bg-gray-700 transition-colors focus:outline-none">Ventas</Link>
            <Link href="/inventory" className="block px-4 py-2 hover:bg-gray-700 transition-colors focus:outline-none">Inventario</Link>
            <Link href="/login" className="block px-4 py-2 hover:bg-gray-700 transition-colors focus:outline-none">Iniciar Sesión</Link>
          </nav>
        )}
        */}
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

export default Layout