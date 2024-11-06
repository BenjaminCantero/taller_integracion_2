
'use client'

import { useState, useEffect } from 'react'
import axios from 'axios';

export default function Login({
                                    usuariosAdminTemporales, 
                                    usuariosVendedoresTemporales, 
                                    usuarioActivo, setUsuarioActivo, 
                                    setUsuarioInfo, 
                                    setActual, 
                                    setUsuarioActivoTemporal, 
                                    setUsuarioActivoApi
                            }) {
                                
    const [baseForm, setBaseForm] = useState(true);
    const [tipoLogin, setTipoLogin] = useState(false);
    const [loginAdmin, setLoginAdmin] = useState(false);
    const [loginVendedor, setLoginVendedor] = useState(false);

    const [inputCorreoFormAdmins, setInputCorreoFormAdmins] = useState('');
    const [inputContrasenaFormAdmins, setInputContrasenaFormAdmins] = useState('');
    const [inputEmpresaFormAdmins, setInputEmpresaFormAdmins] = useState('');

    const [inputRutFormVendedores, setInputRutFormVendedores] = useState('');
    const [inputContrasenaFormVendedores, setInputContrasenaFormVendedores] = useState('');
    const [inputEmpresaFormVendedores, setInputEmpresaFormVendedores] = useState('');

    const [usuariosAdminApi, setUsuariosAdminApi] = useState({});
    const [usuariosVendedoresApi, setUsuariosVendedoresApi] = useState({});

    const [mensaje, setMensaje] = useState('');

    // -----------------------------------------------
    // ----- Validaciones de los Administradores -----
    // -----------------------------------------------
    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const res = await axios.get('http://190.114.252.218:8000/api/usuarios/');
                setUsuariosAdminApi(res.data);
                console.log(res.data);
            } catch (error) {
                console.error('Error al conectar con la api:', error);
                setMensaje('Error al conectar con la API');
            }
        };

        fetchUsuarios();
    }, [loginAdmin]);

    const validarUsuarioAdminTemporal = (event) => {
        event.preventDefault();
        for (let i = 0; i < usuariosAdminTemporales.length; i++) {
            if (inputCorreoFormAdmins === usuariosAdminTemporales[i].email && inputContrasenaFormAdmins === usuariosAdminTemporales[i].password && inputEmpresaFormAdmins === usuariosAdminTemporales[i].nombre_empresa &&  1 === usuariosAdminTemporales[i].id_rol) {
                setUsuarioInfo(usuariosAdminTemporales[i]);
                setUsuarioActivoTemporal(true);
                setUsuarioActivo(true);
                setMensaje('');
                return true;
            }
        }
        return false;
    };
    
    const validarUsuarioAdminApi = (event) => {
        event.preventDefault();
        for (let i = 0; i < usuariosAdminApi.length; i++) {
            if (inputCorreoFormAdmins === usuariosAdminApi[i].email && inputContrasenaFormAdmins === usuariosAdminApi[i].password && inputEmpresaFormAdmins === usuariosAdminApi[i].nombre_empresa && 1 === usuariosAdminApi[i].id_rol) {
                setUsuarioInfo(usuariosAdminApi[i]);
                setUsuarioActivoApi(true);
                setUsuarioActivo(true);
                setMensaje('');
                return true;
            }
        }
        return false;
    };
    
    const validarUsuarioAdmin = async (event) => {
        event.preventDefault();

        const usuarioValido = validarUsuarioAdminApi(event);
        if (!usuarioValido) {
            setMensaje('Usuario no encontrado');
            validarUsuarioAdminTemporal(event);
        }
    };

    // -----------------------------------------------
    // ------- Validaciones de los Vendedores --------
    // -----------------------------------------------
    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const res = await axios.get('http://190.114.252.218:8000/api/vendedores/', {});
                setUsuariosVendedoresApi(res.data);
            } catch (error) {
                console.error('Error al conectar con la api:', error);
                setMensaje('Error al conectar con la API');
            }
        };

        fetchUsuarios();
    }, [loginVendedor]);

    const validarUsuarioVendedorTemporal = (event) => {
        event.preventDefault();
        console.log(usuariosVendedoresTemporales);
        for (let i = 0; i < usuariosVendedoresTemporales.length; i++) {
            if (inputRutFormVendedores === usuariosVendedoresTemporales[i].rut && inputContrasenaFormVendedores === usuariosVendedoresTemporales[i].contraseña && inputEmpresaFormVendedores === usuariosVendedoresTemporales[i].nombre_empresa) {
                setUsuarioInfo(usuariosVendedoresTemporales[i]);
                setUsuarioActivo(true);
                return true;
            }
        }
        return false;
    };

    const validarUsuarioVendedorApi = (event) => {
        event.preventDefault();
        for (let i = 0; i < usuariosVendedoresApi.length; i++) {
            if (inputRutFormVendedores === usuariosVendedoresApi[i].rut && inputContrasenaFormVendedores === usuariosVendedoresApi[i].contraseña && inputEmpresaFormVendedores === usuariosVendedoresApi[i].nombre_empresa) {
                setUsuarioInfo(usuariosVendedoresApi[i]);
                setUsuarioActivo(true);
                return true;
            }
        }
        return false;
    };

    const validarUsuarioVendedor = async (event) => {
        event.preventDefault();

        const usuarioValido = validarUsuarioVendedorApi(event);
        if (!usuarioValido) {
            setMensaje('Usuario no encontrado');
            validarUsuarioVendedorTemporal(event);
        } else if (usuarioActivo) {
            setMensaje('');
        }
    };

    // -----------------------------------------------
    // --- Muestra los tipo de logins disponobles ----
    // --------- (Administrador o Vendedor) ---------- 
    // ----------------------------------------------- 
    const selecionarTipoLogin = () => {
        setBaseForm(false);
        setLoginAdmin(false);
        setLoginVendedor(false);
        setTipoLogin(true);
    };

    // -----------------------------------------------
    // --- Muestra el Login de los Administradores ---
    // -----------------------------------------------
    const formLoginAdmins = () => {
        setBaseForm(false);
        setLoginVendedor(false);
        setTipoLogin(false);
        setLoginAdmin(true);
    }

    // -----------------------------------------------
    // ----- Muestra el Login de los Vendedores ------
    // -----------------------------------------------
    const formLoginVendedores = () => {
        setBaseForm(false);
        setTipoLogin(false);
        setLoginAdmin(false);
        setLoginVendedor(true);
    }

    // -----------------------------------------------
    // ------------ Redirige al Register -------------
    // ------ (Solo para crear Administradores) ------
    // -----------------------------------------------
    const crearCuentaNueva = () => {
        setActual('Register')
        return
    }

    // -----------------------------------------------
    // ------- Vuelve al comienzo de la pagina -------
    // -----------------------------------------------
    const cerrarFormularios = () => {
        setTipoLogin(false);
        setLoginAdmin(false);
        setLoginVendedor(false);
        setBaseForm(true);
        return
    }

  return (
      
      <div
      className='h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat'
      style={{backgroundImage: 'url("/images/laptop.jpg")'}}
      >
          <main className='p-5 shadow-lg shadow-blue-950 rounded-md bg-gray-800'>
              {/* ------------------------------------------------------------- */}
              {/* -------------------- Aciones del usuario -------------------- */}
              {/* ------------------------------------------------------------- */}
              <div className={baseForm ? 'visible p-8' : 'invisible hidden'}>
                  <ul className='space-y-6 text-white'>
                       {/* ------------------ Bienvenida al cliente ------------------- */}
                      <li className='font-racing_sans_one text-center'>
                          <div>
                              <h2 className='text-4xl'>Bienvenido a Gistocked</h2>
                          </div>
                      </li>

                      {/* --------------------- Inicio de Sesion  --------------------- */}
                      <li className='font-racing_sans_one text-center text-lg'>
                          <div className='py-1 border border-white rounded-xl'>
                              <button
                              onClick={selecionarTipoLogin}
                              className='w-full'
                              >
                                  Iniciar sesión
                              </button>
                          </div> 
                      </li>

                      {/* --------------------- Crear nueva Cuenta -------------------- */}
                      <li className='font-racing_sans_one text-center text-lg'>
                          <div className='py-1 border border-white rounded-xl'>
                              <button
                              onClick={crearCuentaNueva}
                              className='w-full'
                              >
                                  Crear cuenta
                              </button>
                          </div> 
                      </li>
                  </ul>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* --------------- Ingresar como Admin o Vendedor -------------- */}
              {/* ------------------------------------------------------------- */}
              <div className={tipoLogin ? 'visible p-4' : 'invisible hidden'}>
                  <ul className='my-2 space-y-6 text-white'>
                       {/* ------------------ Bienvenida al cliente ------------------- */}
                      <li className='mx-6 font-racing_sans_one text-center'>
                          <div>
                              <h2 className='text-4xl'>Bienvenido a Gistocked</h2>
                          </div>
                      </li>

                      {/* ------------ Inicio de Sesion como administrador ------------ */}
                      <li className='mx-6 font-racing_sans_one text-center text-lg'>
                          <div className='py-1 border border-white rounded-xl'>
                              <button
                              onClick={formLoginAdmins}
                              className='w-full'
                              >
                                  Iniciar sesión como administrador
                              </button>
                          </div> 
                      </li>

                      {/* -------------- Inicio de Sesion como vendedor --------------- */}
                      <li className='mx-6 font-racing_sans_one text-center text-lg'>
                          <div className='py-1 border border-white rounded-xl'>
                              <button
                              onClick={formLoginVendedores}
                              className='w-full'
                              >
                                  Iniciar sesión como vendedor
                              </button>
                          </div> 
                      </li>                      
                  </ul>

                  <div className='w-full flex items-end justify-end'>
                    <button 
                    onClick={cerrarFormularios}
                    className='mr-10 font-racing_sans_one text-white'>
                        volver
                    </button>
                  </div>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* ------------- Formulario Inicio de sesion Admims ------------ */}
              {/* ------------------------------------------------------------- */}
              <div className={loginAdmin ? 'p-5 rounded-md' : 'invisible hidden'}>
                  <div className='text-white text-right'>
                      <button type='button' onClick={cerrarFormularios}>
                          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-x-lg' viewBox='0 0 16 16'>
                              <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z' stroke='currentColor' strokeWidth='1' fill='none'/>
                          </svg>
                      </button>
                  </div>

                  <form onSubmit={validarUsuarioAdmin}>
                      <ul className='space-y-9 text-white'>
                          <li className='mx-10 font-racing_sans_one text-center'>
                              <h3 className='text-4xl'>Iniciando sesión en Gistocked</h3>
                              <p className='text-gray-300 text-lg'>'Administradores'</p>
                          </li>

                          {mensaje && 
                            <li className='py-2 mx-10 font-racing_sans_one text-lg bg-red-600 text-center rounded-lg'>
                                <p>{mensaje}</p>
                            </li>
                          }

                          <li className='mx-10 font-racing_sans_one text-lg relative'>
                            <input
                                className='w-full bg-[#1F2937] focus:outline-none placeholder-transparent border-b-2 peer inputsLogin'
                                type='email'
                                placeholder=' '
                                value={inputCorreoFormAdmins}
                                onChange={(e) => setInputCorreoFormAdmins(e.target.value)}
                            />
                            <label
                                className={`absolute start-0 top-1/2 transform transition-all duration-500 
                                ${inputCorreoFormAdmins ? '-translate-y-10' : '-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-translate-y-10'}`}
                            >
                                Correo
                            </label>
                          </li>

                          <li className='mx-10 font-racing_sans_one text-lg relative'>
                              <input 
                                  className='w-full bg-[#1F2937] focus:outline-none placeholder-transparent border-b-2 peer inputsLogin'
                                  type='password' 
                                  placeholder=' '
                                  onInput={(e) => setInputContrasenaFormAdmins(e.target.value)}
                              />
                              <label
                                  className={`absolute start-0 top-1/2 transform transition-all duration-500
                                  ${inputContrasenaFormAdmins ? '-translate-y-10' : '-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-translate-y-10'}`}
                              >
                                  Contraseña
                              </label>
                          </li>

                          <li className='mx-10 font-racing_sans_one text-lg relative'>
                              <input 
                                  className='w-full bg-[#1F2937] focus:outline-none placeholder-transparent border-b-2 peer inputsLogin'
                                  type='text' 
                                  placeholder=' '
                                  onInput={(e) => setInputEmpresaFormAdmins(e.target.value)}
                              />
                              <label
                                  className={`absolute start-0 top-1/2 transform transition-all duration-500
                                  ${inputEmpresaFormAdmins ? '-translate-y-10' : '-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-translate-y-10'}`}
                              >
                                  Empresa
                              </label>
                          </li>

                          <li className='mx-10 font-racing_sans_one text-lg text-center'>
                              <button 
                              type='submit'
                              >
                                  <p>Aceptar</p>
                              </button>
                          </li>
                      </ul>
                  </form>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* ------------ Formulario Inicio de sesion Vendedores---------- */}
              {/* ------------------------------------------------------------- */}
              <div className={loginVendedor ? 'p-5 rounded-md' : 'invisible hidden'}>
                  <div className='text-white text-right'>
                      <button type='button' onClick={cerrarFormularios}>
                          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-x-lg' viewBox='0 0 16 16'>
                              <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z' stroke='currentColor' strokeWidth='1' fill='none'/>
                          </svg>
                      </button>
                  </div>

                  <form onSubmit={validarUsuarioVendedor}>
                      <ul className='space-y-9 text-white'>
                          <li className='mx-10 font-racing_sans_one text-center'>
                              <h3 className='text-4xl'>Iniciando sesión en Gistocked</h3>
                              <p className='text-gray-300 text-lg'>'Vendedores'</p>
                          </li>

                          {mensaje && 
                            <li className='py-2 mx-10 font-racing_sans_one text-lg bg-red-600 text-center rounded-lg'>
                                <p>{mensaje}</p>
                            </li>
                          }

                          <li className='mx-10 font-racing_sans_one text-lg relative'>
                            <input
                                className='w-full bg-[#1F2937] focus:outline-none placeholder-transparent border-b-2 peer inputsLogin'
                                type='text'
                                placeholder=' '
                                value={inputRutFormVendedores}
                                onChange={(e) => setInputRutFormVendedores(e.target.value)}
                            />
                            <label
                                className={`absolute start-0 top-1/2 transform transition-all duration-500 
                                ${inputRutFormVendedores ? '-translate-y-10' : '-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-translate-y-10'}`}
                            >
                                Rut
                            </label>
                          </li>

                          <li className='mx-10 font-racing_sans_one text-lg relative'>
                              <input 
                                  className='w-full bg-[#1F2937] focus:outline-none placeholder-transparent border-b-2 peer inputsLogin'
                                  type='password' 
                                  placeholder=' '
                                  onInput={(e) => setInputContrasenaFormVendedores(e.target.value)}
                              />
                              <label
                                  className={`absolute start-0 top-1/2 transform transition-all duration-500
                                  ${inputContrasenaFormVendedores ? '-translate-y-10' : '-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-translate-y-10'}`}
                              >
                                  Contraseña
                              </label>
                          </li>

                          <li className='mx-10 font-racing_sans_one text-lg relative'>
                              <input 
                                  className='w-full bg-[#1F2937] focus:outline-none placeholder-transparent border-b-2 peer inputsLogin'
                                  type='text' 
                                  placeholder=' '
                                  onInput={(e) => setInputEmpresaFormVendedores(e.target.value)}
                              />
                              <label
                                  className={`absolute start-0 top-1/2 transform transition-all duration-500
                                  ${inputEmpresaFormVendedores ? '-translate-y-10' : '-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-translate-y-10'}`}
                              >
                                  Empresa
                              </label>
                          </li>

                          <li className='mx-10 font-racing_sans_one text-lg text-center'>
                              <button 
                              type='submit'
                              >
                                  <p>Aceptar</p>
                              </button>
                          </li>
                      </ul>
                  </form>
              </div>
          </main>
      </div>
  )
}