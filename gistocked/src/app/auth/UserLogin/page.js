
'use client'

import { useState, useEffect } from 'react'
import axios from 'axios';

export default function Login( {setUsuarioActivo, setUsuarioInfo, setActual} ) {
    const [baseForm, setBaseForm] = useState(true);
    const [tipoLogin, setTipoLogin] = useState(false);
    const [loginAdmin, setLoginAdmin] = useState(false);
    const [loginVendedor, setLoginVendedor] = useState(false);

    const [inputCorreoForm1, setInputCorreoForm1] = useState('');
    const [inputContrasenaForm1, setInputContrasenaForm1] = useState('');
    const [inputEmpresaForm1, setInputEmpresaForm1] = useState('');

    const [usuariosApi, setusuariosApi] = useState({});
    const [usuariosTemporales, setUsuariosTemporales] = useState({});

    // Carga la información de todos los Usuarios Registrados
    useEffect(() => {
        const cargaUsuariosTemporales = () => {
           setUsuariosTemporales(
                [
                    { codigo_vendedor:0 , nombre_usuario: 'admin1'   , nombre_empresa: 'Empresa 0', password:'123', email:'admin1@gmail.com'   , id_rol:1, id_admin:0},
                    { codigo_vendedor:-1, nombre_usuario: 'vendedor1', nombre_empresa: 'Empresa 0', password:'123', email:'vendedor1@gmail.com', id_rol:2, id_admin:0}
                ]
            );
        }

        const cargaUsuariosApi = async () => {
            try {
                const res = await axios.get('http://190.114.252.218:8000/api/usuarios/', {});
                setusuariosApi(res.data);
            } catch (error) {
                console.error('Error al conectar con la api:', error);
            }
        }

        cargaUsuariosTemporales();
        cargaUsuariosApi();
    }, []);

    console.log(usuariosTemporales);
    console.log('---------------------')
    console.log(usuariosApi);

    // Validaciones de los Usuarios
    const validarUsuarioTemporal = (event) => {
        event.preventDefault();
        for (let i = 0; i < usuariosTemporales.length; i++) {
            if (inputCorreoForm1 === usuariosTemporales[i].email && inputContrasenaForm1 === usuariosTemporales[i].password && inputEmpresaForm1 === usuariosTemporales[i].nombre_empresa) {
                setUsuarioInfo(usuariosTemporales[i]);
                setUsuarioActivo(true);
                return true;
            }
        }
        return false;
    };
    
    const validarUsuarioApi = (event) => {
        event.preventDefault();
        for (let i = 0; i < usuariosApi.length; i++) {
            if (inputCorreoForm1 === usuariosApi[i].email && inputContrasenaForm1 === usuariosApi[i].password && inputEmpresaForm1 === usuariosApi[i].nombre_empresa) {
                setUsuarioInfo(usuariosApi[i]);
                setUsuarioActivo(true);
                return true;
            }
        }
        return false;
    };
    
    const validarUsuario = async (event) => {
        const usuarioValido = validarUsuarioApi(event);
        if (!usuarioValido) {
            validarUsuarioTemporal(event);
        }
    };

    // Muestra los tipo de logins disponobles   
    const selecionarTipoLogin = () => {
        setBaseForm(false);
        setLoginAdmin(false);
        setLoginVendedor(false);
        setTipoLogin(true);
    };

    const formLoginAdmins = () => {
        setBaseForm(false);
        setLoginVendedor(false);
        setTipoLogin(false);
        setLoginAdmin(true);
    }

    const formLoginVendedores = () => {
        setBaseForm(false);
        setTipoLogin(false);
        setLoginAdmin(false);
        setLoginVendedor(true);
    }

    // Redirige al formulario de Register (Solo para crear Administradores)
    const crearCuentaNueva = () => {
        setActual('Register')
        return
    }

    // Vuelve al comienzo de la pagina
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
              <div id='tipoSesion' className={baseForm ? 'visible p-8' : 'invisible hidden'}>
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
              <div id='tipoUsuario' className={tipoLogin ? 'visible p-4' : 'invisible hidden'}>
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
              <div id='Login' className={loginAdmin ? 'p-5 rounded-md' : 'invisible hidden'}>
                  <div className='text-white text-right'>
                      <button type='button' onClick={cerrarFormularios}>
                          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-x-lg' viewBox='0 0 16 16'>
                              <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z' stroke='currentColor' strokeWidth='1' fill='none'/>
                          </svg>
                      </button>
                  </div>

                  <form onSubmit={validarUsuario}>
                      <ul className='space-y-9 text-white'>
                          <li className='mx-10 font-racing_sans_one text-center'>
                              <h3 className='text-4xl'>Iniciando sesión en Gistocked</h3>
                          </li>

                          <li className='mx-10 font-racing_sans_one text-lg relative'>
                            <input
                                className='w-full bg-[#1F2937] focus:outline-none placeholder-transparent border-b-2 peer inputsLogin'
                                type='email'
                                placeholder=' '
                                value={inputCorreoForm1}
                                onChange={(e) => setInputCorreoForm1(e.target.value)}
                            />
                            <label
                                className={`absolute start-0 top-1/2 transform transition-all duration-500 
                                ${inputCorreoForm1 ? '-translate-y-10' : '-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-translate-y-10'}`}
                            >
                                Correo
                            </label>
                          </li>

                          <li className='mx-10 font-racing_sans_one text-lg relative'>
                              <input 
                                  className='w-full bg-[#1F2937] focus:outline-none placeholder-transparent border-b-2 peer inputsLogin'
                                  type='password' 
                                  placeholder=' '
                                  onInput={(e) => setInputContrasenaForm1(e.target.value)}
                              />
                              <label
                                  className={`absolute start-0 top-1/2 transform transition-all duration-500
                                  ${inputContrasenaForm1 ? '-translate-y-10' : '-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-translate-y-10'}`}
                              >
                                  Contraseña
                              </label>
                          </li>

                          <li className='mx-10 font-racing_sans_one text-lg relative'>
                              <input 
                                  className='w-full bg-[#1F2937] focus:outline-none placeholder-transparent border-b-2 peer inputsLogin'
                                  type='text' 
                                  placeholder=' '
                                  onInput={(e) => setInputEmpresaForm1(e.target.value)}
                              />
                              <label
                                  className={`absolute start-0 top-1/2 transform transition-all duration-500
                                  ${inputEmpresaForm1 ? '-translate-y-10' : '-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:-translate-y-10'}`}
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
              <div id='Login' className={loginVendedor ? 'p-5 rounded-md' : 'invisible hidden'}>
                  <div className='text-white text-right'>
                      <button type='button' onClick={cerrarFormularios}>
                          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-x-lg' viewBox='0 0 16 16'>
                              <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z' stroke='currentColor' strokeWidth='1' fill='none'/>
                          </svg>
                      </button>
                  </div>
              </div>
          </main>
      </div>
  )
}