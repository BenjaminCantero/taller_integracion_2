
'use client'

import { useState } from "react"
import axios from "axios";

export default function Register( {setActual, setUsuariosAdminTemporales, usuariosAdminTemporales} ) {

    const [inputNombreForm, setInputNombreForm] = useState('');
    const [inputCorreoForm, setInputCorreoForm] = useState('');
    const [inputContrasenaForm, setInputContrasenaForm] = useState('');
    const [inputEmpresaForm, setInputEmpresaForm] = useState('');

    // -----------------------------------------------
    // ---- Creadores cuentas de Administradores -----
    // -----------------------------------------------
    const crearUsuarioAdministradorTemporal = (usuarioNuevo) => {
        setUsuariosAdminTemporales(prevUsuarios => [
            ...prevUsuarios,
            usuarioNuevo
        ]);
    };
    
    const crearUsuarioAdministradorApi = async (usuarioNuevo) => {
        try {
            const res = await axios.post('http://190.114.252.218:8000/api/usuarios/', {
                nombre_usuario: inputNombreForm,
                nombre_empresa: inputEmpresaForm,
                password: inputContrasenaForm,
                email: inputCorreoForm,
                pin: 123,
                id_rol: 1,
                id_admin: 1
            });
        } catch (error) {
            console.error('Error al agregar el usuario:', error);
        }
    };
    
    // Crear un nuevo usuario
    const crearUsuarioAdministrador = () => {
        const usuarioNuevo = {
            codigo_vendedor: usuariosAdminTemporales.length +1,
            nombre_usuario: inputNombreForm,
            nombre_empresa: inputEmpresaForm,
            email: inputCorreoForm,
            password: inputContrasenaForm,
            pin: 123,
            id_rol: 1,
            id_admin: 1
        };

        crearUsuarioAdministradorTemporal(usuarioNuevo);
        crearUsuarioAdministradorApi();
    
        cerrarFormulario();
    };

    // -----------------------------------------------
    // ------- Vuelve al comienzo de la pagina -------
    // -----------------------------------------------
    const cerrarFormulario = () => {
        setActual('Login');
      }

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
                      <button onClick={cerrarFormulario}>
                          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-x-lg' viewBox='0 0 16 16'>
                              <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z' stroke='currentColor' strokeWidth='1' fill='none'/>
                          </svg>
                      </button>
                  </div>

                  <form onSubmit={(e) => {
                      e.preventDefault();
                      crearUsuarioAdministrador();
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
                                  value={inputNombreForm}
                                  onChange={(e) => setInputNombreForm(e.target.value)}
                              />
                              <label
                                className={`absolute start-0 top-1/2 transform transition-all duration-500 
                                ${inputNombreForm ? '-translate-y-10' : '-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-translate-y-10'}`}
                              >
                                  Nombre
                              </label>
                          </li>

                          <li className='mx-10 font-racing_sans_one text-lg relative'>
                              <input 
                                  className='w-full bg-[#1F2937] focus:outline-none placeholder-transparent border-b-2 peer inputsLogin'
                                  type='email' 
                                  placeholder=' '
                                  value={inputCorreoForm}
                                  onChange={(e) => setInputCorreoForm(e.target.value)}
                              />
                              <label
                                className={`absolute start-0 top-1/2 transform transition-all duration-500 
                                ${inputCorreoForm ? '-translate-y-10' : '-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-translate-y-10'}`}
                              >
                                  Correo
                              </label>
                          </li>

                          <li className='mx-10 font-racing_sans_one text-lg relative'>
                              <input 
                                  className='w-full bg-[#1F2937] focus:outline-none placeholder-transparent border-b-2 peer inputsLogin'
                                  type='password' 
                                  placeholder=' '
                                  value={inputContrasenaForm}
                                  onInput={(e) => setInputContrasenaForm(e.target.value)}
                              />
                              <label
                                  className={`absolute start-0 top-1/2 transform transition-all duration-500
                                    ${inputContrasenaForm ? '-translate-y-10' : '-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-translate-y-10'}`}
                              >
                                  Contraseña
                              </label>
                          </li>

                          <li className='mx-10 font-racing_sans_one text-lg relative'>
                              <input 
                                  className='w-full bg-[#1F2937] focus:outline-none placeholder-transparent border-b-2 peer inputsLogin'
                                  type='text' 
                                  placeholder=' '
                                  value={inputEmpresaForm}
                                  onInput={(e) => setInputEmpresaForm(e.target.value)}
                              />
                              <label
                                  className={`absolute start-0 top-1/2 transform transition-all duration-500
                                    ${inputEmpresaForm ? '-translate-y-10' : '-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-translate-y-10'}`}
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