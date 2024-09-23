"use client";

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Link from 'next/link';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const cerrarAside = () => {
    const elemento = document.getElementById('aside')
    elemento.classList.toggle('hide_element');
    elemento.classList.toggle('show_input');
  }

  const cambiarVisibilidadCorreo = () => {
    const elemento = document.getElementById('new_email');
    elemento.classList.toggle('hide_element');
    elemento.classList.toggle('show_input');
  };

  const cambiarVisibilidadContrasena = () => {
    const elemento_1 = document.getElementById('new_password_1');
    const elemento_2 = document.getElementById('new_password_2');

    elemento_1.classList.toggle('hide_element');
    elemento_1.classList.toggle('show_element');

    elemento_2.classList.toggle('hide_element');
    elemento_2.classList.toggle('show_element');
  };

  const { register, handleSubmit } = useForm();

  const onSubmit_Correo = handleSubmit( async (data) => {
    // Envia los datos en formato JSON 
    const res = await fetch("/api/usuario_main_2/cony", {method: "PUT", body: JSON.stringify({correo:data.correo}), headers: {"Content-Type":"application/json"}});
  });

  const onSubmit_Contrasena = handleSubmit( async (data) => {
    // Envia los datos en formato JSON
    try {
      if (data.contrasena_1 == data.contrasena_2) {
        const res = await fetch("../api/usuario_main_2/cony", {method: "PUT", body: JSON.stringify({contrasena:data.contrasena_1}), headers: {"Content-Type":"application/json"}});
      }
    } catch {
      return new Error("Las Contraseñas No Coinciden")
    }
  });

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
            </nav>



            {/* Login Button */}
            <Link href="/auth/UserLogin">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors" >Iniciar Sesión</div>
            </Link>

            <button onClick={cerrarAside}>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
              </svg>
            </button>

            <aside id="aside" className="w-1/2 h-full flex justify-center items-center fixed top-0 right-0 bg-white z-50 hide_element">
              <div className="modal-content">
                <button onClick={cerrarAside} className="absolute top-4 left-4 close">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-black bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                </button>
                

                    <div className="p-10 bg-gray-900 text-white rounded-lg flex flex-col items-center">
                        <div className="flex flex-col items-center">

                          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                          </svg>

                          <p className="mt-2">Nombre de Usuario</p>
                        </div>

                        <div>
                          <from>
                            <ul className="w-full">
                              <li className="my-2">
                                  <label htmlFor="email">Correo</label>
                              </li>

                              <li className="my-2 bg-white text-black rounded-sm">
                                  <label>Correo Actual</label>
                              </li>

                              <li id="new_email" className="my-2 text-black hide_element">
                                  <input {...register("correo", {require: true})} type="text" placeholder="Correo Nuevo" className="w-full rounded-sm"></input>
                              </li>

                              <li>
                                <div className="my-2">
                                  <button type="button" onClick={cambiarVisibilidadCorreo} className="px-1 mr-2 bg-blue-600 rounded-md">Cambiar Correo</button>
                                  <button type="button" onClick={onSubmit_Correo} className="px-1 ml-2 bg-red-600 rounded-md">Cancelar</button>
                                </div>
                              </li>
                            </ul>
                          </from>

                          <form>
                            <ul className="w-full">
                              <li className="my-2">
                                  <label htmlFor="password">Contraseña</label>
                              </li>

                              <li className="my-2 bg-white text-black rounded-sm">
                              <label>Contraseña Actual</label>
                              </li>

                              <li id="new_password_1" className="my-2 hide_element">
                                  <input {...register("contrasena_1", {require: true})} type="password" placeholder="Ingresar Contraseña Nueva" className="w-full text-black rounded-sm"></input>
                              </li>

                              <li id="new_password_2" className="my-2 hide_element">
                                  <input {...register("contrasena_2", {require: true})} type="password" placeholder="Ingresar Contraseña Nueva" className="w-full text-black rounded-sm"></input>
                                </li>

                              <li className="my-2">
                                <div>
                                  <button type="button" onClick={cambiarVisibilidadContrasena} className="px-1 mr-2 bg-blue-600 rounded-md">Cambiar Contraseña</button>
                                  <button type="button" onClick={onSubmit_Contrasena} className="px-1 ml-2 bg-red-600 rounded-md">Cancelar</button>
                                </div>
                              </li>
                            </ul>
                          </form>
                        </div>
                        
                    </div>
              </div>
          </aside>


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