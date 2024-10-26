
'use client'

import { useState, useEffect } from "react"
import axios from "axios";

export default function Register( {setActual} ) {

    const [inputNombreForm2, setInputNombreForm2] = useState('');
    const [inputCorreoForm2, setInputCorreoForm2] = useState('');
    const [inputContrasenaForm2, setInputContrasenaForm2] = useState('');
    const [inputEmpresaForm2, setInputEmpresaForm2] = useState('');

    const volverAtras = () => {
      setActual('Login');
    }

    const crearUsuarioEstatico = (usuarioNuevo) => {
        setUsuariosTemporales(prevUsuarios => [
            ...prevUsuarios,
            usuarioNuevo
        ]);
    };
    
    const crearUsuarioBaseDeDatos = async (usuarioNuevo) => {
        try {
            console.log(usuarioNuevo);
            const res = await fetch("/api/usuario/", {
                method: "POST",
                body: JSON.stringify({
                    tipoForm: '2',
                    codigo_vendedor: 0,
                    nombre_usuario: usuarioNuevo.nombre_usuario,
                    nombre_empresa: usuarioNuevo.nombre_empresa,
                    password: usuarioNuevo.password,
                    email: usuarioNuevo.email,
                    id_rol: 1,
                    id_admin: -1,
                }),
                headers: { "Content-Type": "application/json" },
            });
    
            if (res.ok) {
                const usuario = await res.json(); // Aquí obtienes la información del usuario
                cerrarFormularios();
            } else {
                throw new Error('Error al crear el usuario en la base de datos');
            }
        } catch (error) {
            console.error(error);
            // Aquí es donde manejamos el error guardando el usuario en la lista estática
            crearUsuarioEstatico(usuarioNuevo);
        }
    };
    
    // Crear un nuevo usuario
    const crearUsuario = async () => {
        let usuarioNuevo = {
            codigo_vendedor: 200,
            nombre_usuario: inputNombreForm2,
            nombre_empresa: inputEmpresaForm2,
            password: inputContrasenaForm2,
            email: inputCorreoForm2,
            id_rol: 1,
            id_admin: -1,
        };
    
        // Intentamos crear el usuario en la base de datos
        await crearUsuarioBaseDeDatos(usuarioNuevo);
    
        // Limpiar los campos del formulario
        setInputNombreForm2('');
        setInputCorreoForm2('');
        setInputContrasenaForm2('');
        setInputEmpresaForm2('');
    
        cerrarFormularios();
    };

  return (
      
      <div
      className='h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat'
      style={{backgroundImage: 'url("/images/laptop.jpg")'}}
      >
          <main className='p-5 shadow-lg shadow-blue-950 rounded-md bg-gray-800'>
              {/* ------------------------------------------------------------- */}
              {/* -------------- Formulario Crear sesion con Correo------------ */}
              {/* ------------------------------------------------------------- */}
              <div id='Register' className={'p-5 rounded-md'}>
                  <div className='text-white text-right'>
                      <button onClick={volverAtras}>
                          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-x-lg' viewBox='0 0 16 16'>
                              <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z' stroke='currentColor' strokeWidth='1' fill='none'/>
                          </svg>
                      </button>
                  </div>

                  <form onSubmit={(e) => {
                      e.preventDefault();
                      crearUsuario();
                  }}>
                      <ul className='space-y-9 text-white'>
                          <li className='mx-10 font-racing_sans_one text-center'>
                              <h3 className='text-4xl'>Creando cuenta para Gistocked</h3>
                          </li>

                          <li className='mx-10 font-racing_sans_one text-lg relative'>
                              <input 
                                  className='w-full bg-[#1F2937] focus:outline-none placeholder-transparent border-b-2 peer inputsLogin'
                                  type='text' 
                                  placeholder=' '
                                  value={inputNombreForm2}
                                  onChange={(e) => setInputNombreForm2(e.target.value)}
                              />
                              <label
                                className={`absolute start-0 top-1/2 transform transition-all duration-500 
                                ${inputNombreForm2 ? '-translate-y-10' : '-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-translate-y-10'}`}
                              >
                                  Nombre
                              </label>
                          </li>

                          <li className='mx-10 font-racing_sans_one text-lg relative'>
                              <input 
                                  className='w-full bg-[#1F2937] focus:outline-none placeholder-transparent border-b-2 peer inputsLogin'
                                  type='email' 
                                  placeholder=' '
                                  value={inputCorreoForm2}
                                  onChange={(e) => setInputCorreoForm2(e.target.value)}
                              />
                              <label
                                className={`absolute start-0 top-1/2 transform transition-all duration-500 
                                ${inputCorreoForm2 ? '-translate-y-10' : '-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-translate-y-10'}`}
                              >
                                  Correo
                              </label>
                          </li>

                          <li className='mx-10 font-racing_sans_one text-lg relative'>
                              <input 
                                  className='w-full bg-[#1F2937] focus:outline-none placeholder-transparent border-b-2 peer inputsLogin'
                                  type='password' 
                                  placeholder=' '
                                  value={inputContrasenaForm2}
                                  onInput={(e) => setInputContrasenaForm2(e.target.value)}
                              />
                              <label
                                  className={`absolute start-0 top-1/2 transform transition-all duration-500
                                    ${inputContrasenaForm2 ? '-translate-y-10' : '-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-translate-y-10'}`}
                              >
                                  Contraseña
                              </label>
                          </li>

                          <li className='mx-10 font-racing_sans_one text-lg relative'>
                              <input 
                                  className='w-full bg-[#1F2937] focus:outline-none placeholder-transparent border-b-2 peer inputsLogin'
                                  type='text' 
                                  placeholder=' '
                                  value={inputEmpresaForm2}
                                  onInput={(e) => setInputEmpresaForm2(e.target.value)}
                              />
                              <label
                                  className={`absolute start-0 top-1/2 transform transition-all duration-500
                                    ${inputEmpresaForm2 ? '-translate-y-10' : '-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-translate-y-10'}`}
                              >
                                  Empresa
                              </label>
                          </li>

                          <li className='mx-10 font-racing_sans_one text-lg text-center'>
                              <button
                              type='submit'
                              >
                                  <p>Registrarse</p>
                              </button>
                          </li>
                      </ul>
                  </form>
              </div>
          </main>
      </div>
  )
}