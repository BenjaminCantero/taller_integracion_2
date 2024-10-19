
'use client'

import { useState } from "react"

export default function Login( {setUsuarioActivo, setUsuarioInfo} ) {
    
    /* 
  Tipos de Formularios soportados:
  0: Opciones del usuario
  1: Inicio de sesión con Google
  2: Crear sesión con un Correo
  */
    const [formulario, setFormulario] = useState('0');
    const [baseForm, setBaseForm] = useState(true);

    const [loginForm, setLoginForm] = useState(false);
    const [inputCorreoForm1, setInputCorreoForm1] = useState('');
    const [inputContrasenaForm1, setInputContrasenaForm1] = useState('');

    const [registerForm, setRegisterForm] = useState(false);
    const [inputNombreForm2, setInputNombreForm2] = useState('');
    const [inputCorreoForm2, setInputCorreoForm2] = useState('');
    const [inputContrasenaForm2, setInputContrasenaForm2] = useState('');

    const [usuariosValidos, setUsuariosValidos] = useState([
            { id: '1', rol: '1', nombre: 'admin1', correo: 'admin1@gmail.com', contrasena: '123' },
            { id: '2', rol: '2', nombre: 'vendedor1', correo: 'vendedor1@gmail.com', contrasena: '123' }
        ]);

    // Validaciones de usuarios
    const validarUsuario = ( event ) => {
        event.preventDefault();
        for (let i=0; i<usuariosValidos.length; i++) {
            if (inputCorreoForm1 == usuariosValidos[i].correo && inputContrasenaForm1 == usuariosValidos[i].contrasena) {
                setUsuarioInfo(usuariosValidos[i]);
                setUsuarioActivo(true);
                break;
            }
        }
    }

    // Crear un nuevo usuario
    const crearUsuario = () => {
        let idNuevo = usuariosValidos.length + 1;
        let usuarioNuevo = {
            id: String(idNuevo),
            rol: '1',
            nombre: inputNombreForm2,
            correo: inputCorreoForm2,
            contrasena: inputContrasenaForm2
        };
    
        setUsuariosValidos(prevUsuarios => [
            ...prevUsuarios,
            usuarioNuevo
        ]);

        console.log(usuariosValidos)
    
        // Limpiar los campos del formulario
        setInputNombreForm2('');
        setInputCorreoForm2('');
        setInputContrasenaForm2('');

        cerrarFormularios();
    };

    // Muestra el formulario de Inicio de Session
    const iniciarSesionCorreo = () => {
        setBaseForm(false);
        setLoginForm(true); 
    
        /* 
        setTimeout(() => {
            id.classList.add('transition', 'duration-2000', 'ease-linear', 'delay-150', 'opacity-100');
        }, 10);
        */
        setFormulario('1');

    };

    // Muestra el formulario de Crear Nueva Session
    const crearCuentaNueva = () => {
        setBaseForm(false);
        setRegisterForm(true); 
    
        /* 
        setTimeout(() => {
            id.classList.add('transition', 'duration-2000', 'ease-linear', 'delay-150', 'opacity-100');
        }, 10);
        */
        setFormulario('2');
        return
    }

    // Cierra Formularios
    const cerrarFormularios = () => {
        if (formulario == '1') {
            setBaseForm(true);
            setLoginForm(false);
            setFormulario('0');

        } else if (formulario == '2') {
            setBaseForm(true);
            setRegisterForm(false);
            setFormulario('0');

        } else {
            console.log('A ocurrido un error')
        }
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
                              onClick={iniciarSesionCorreo}
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
              {/* ------------ Formulario Inicio de sesion con Correo---------- */}
              {/* ------------------------------------------------------------- */}
              <div id='Login' className={loginForm ? 'p-5 rounded-md' : 'invisible hidden'}>
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
              {/* -------------- Formulario Crear sesion con Correo------------ */}
              {/* ------------------------------------------------------------- */}
              <div id='Register' className={registerForm ? 'p-5 rounded-md' : 'invisible hidden'}>
                  <div className='text-white text-right'>
                      <button type='button' onClick={cerrarFormularios}>
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