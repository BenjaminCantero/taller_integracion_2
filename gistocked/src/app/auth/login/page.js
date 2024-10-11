
export default function Login() {
    /* 
    Tipos de Formularios soportados:
    1: Inicio de sesión con Google
    2: Crear sesión con un Correo
    */
    let formulario = '0'

    // Muestra el formulario de Inicio de Session
    const iniciarSesionCorreo = () => {
        let id = document.getElementById('Login');
        let sesion = document.getElementById('tipoSesion')

        // Muestra el formulario
        if (id.classList.contains('invisible') && id.classList.contains('hidden')) {
            id.classList.remove('invisible');
            id.classList.remove('hidden');
            id.classList.add('visible');

             // Oculta los metodos de inicio de sesión
            if (sesion.classList.contains('visible')) {
            sesion.classList.remove('visible');
            sesion.classList.add('invisible');
            sesion.classList.add('hidden');
            }

            formulario = '1';

        } else {
            id.classList.remove('visible');
            id.classList.add('invisible');
            formulario = '0';
        }
        return
    }

    // Muestra el formulario de Crear Nueva Session
    const crearCuentaNueva = () => {
        let id = document.getElementById('Register');
        let sesion = document.getElementById('tipoSesion')

        // Muestra el formulario
        if (id.classList.contains('invisible') && id.classList.contains('hidden')) {
            id.classList.remove('invisible');
            id.classList.remove('hidden');
            id.classList.add('visible');

            // Oculta los metodos de inicio de sesión
            if (sesion.classList.contains('visible')) {
            sesion.classList.remove('visible');
            sesion.classList.add('invisible');
            sesion.classList.add('hidden');
            }
            formulario = '2';

        } else {
            id.classList.remove('visible');
            id.classList.add('invisible');
            formulario = '0';
        }
        return
    }

    // Cierra Formularios
    const cerrarFormularios = () => {
        if (formulario == '1') {
            let id = document.getElementById('Login');
            let sesion = document.getElementById('tipoSesion');

            // Muestra las acciones al usuario
            if (id.classList.contains('visible')) {
                id.classList.remove('visible');
                id.classList.add('invisible');
                id.classList.add('hidden');

                // Oculta los metodos de inicio de sesión
                if (sesion.classList.contains('invisible') && sesion.classList.contains('hidden')) {
                    sesion.classList.remove('invisible');
                    sesion.classList.remove('hidden');
                    sesion.classList.add('visible');
                    }
                formulario = '0';
            }

        } else if (formulario == '2') {
            let id = document.getElementById('Register');
            let sesion = document.getElementById('tipoSesion');

            // Muestra las acciones al usuario
            if (id.classList.contains('visible')) {
                id.classList.remove('visible');
                id.classList.add('invisible');
                id.classList.add('hidden');

                // Oculta los metodos de inicio de sesión
                if (sesion.classList.contains('invisible') && sesion.classList.contains('hidden')) {
                    sesion.classList.remove('invisible');
                    sesion.classList.remove('hidden');
                    sesion.classList.add('visible');
                    }
                formulario = '0';
            }
        }
        return
    }

    return (
        
        <div className='h-screen flex items-center justify-center bg-gray-100'>
            <main className='p-5 border border-black rounded-md'>
                <div id='tipoSesion' className='visible'>
                    <ul className='space-y-6 text-black'>
                        {/* ------------------------------------------------------------- */}
                        {/* ------------------- Bienvenida al Cliente ------------------- */}
                        {/* ------------------------------------------------------------- */}
                        <li className='font-racing_sans_one text-center'>
                            <div>
                                <h2 className='text-4xl'>Bienvenido a Gistocked</h2>
                            </div>
                        </li>

                        {/* ------------------------------------------------------------- */}
                        {/* --------------------- Inicio con Correo --------------------- */}
                        {/* ------------------------------------------------------------- */}
                        <li className='font-racing_sans_one text-center text-lg'>
                            <div className='py-1 border border-black rounded-xl'>
                                <button
                                onClick={iniciarSesionCorreo}
                                className='w-full'
                                >
                                    Iniciar sesión con Correo
                                </button>
                            </div> 
                        </li>

                        {/* ------------------------------------------------------------- */}
                        {/* --------------------- Crear Cuenta nueva -------------------- */}
                        {/* ------------------------------------------------------------- */}
                        <li className='font-racing_sans_one text-center text-lg'>
                            <div className='py-1 border border-black rounded-xl'>
                                <button
                                onClick={crearCuentaNueva}
                                className='w-full'
                                >
                                    Crear sesión con Correo
                                </button>
                            </div> 
                        </li>
                    </ul>
                </div>


                {/* ------------------------------------------------------------- */}
                {/* ------------ Formulario Inicio de sesion con Correo---------- */}
                {/* ------------------------------------------------------------- */}
                <div id='Login' className='p-5 rounded-md bg-green-500 invisible hidden'>
                    <div className='text-white text-right'>
                        <button type='button' onClick={cerrarFormularios}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" stroke="currentColor" strokeWidth="1" fill="none"/>
                            </svg>
                        </button>
                    </div>

                    <form>
                        <ul className='space-y-8 text-white'>
                            <li className='mx-10 font-racing_sans_one text-center'>
                                <h3 className='text-4xl'>Iniciando sesión con un Correo</h3>
                            </li>

                            <li className='mx-10 font-racing_sans_one text-lg'>
                                <label className='block'>Correo</label>
                                <input 
                                className='block w-full bg-[#22C55E] rounded-md focus:outline-none placeholder-white' 
                                type='email' 
                                placeholder='Ingrese su correo'
                                />
                            </li>

                            <li className='mx-10 font-racing_sans_one text-lg'>
                                <label className='block'>Contraseña</label>
                                <input 
                                className='block w-full bg-[#22C55E] rounded-md focus:outline-none placeholder-white' 
                                type='password' 
                                placeholder='Ingrese su contraseña'
                                />
                            </li>

                            <li className='mx-10 font-racing_sans_one text-lg text-center'>
                                <button>
                                    <p>Aceptar</p>
                                </button>
                            </li>
                        </ul>
                    </form>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* -------------- Formulario Crear sesion con Correo------------ */}
                {/* ------------------------------------------------------------- */}
                <div id='Register' className='p-5 rounded-md bg-blue-500 invisible hidden'>
                    <div className='text-white text-right'>
                        <button type='button' onClick={cerrarFormularios}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" stroke="currentColor" strokeWidth="1" fill="none"/>
                            </svg>
                        </button>
                    </div>

                    <form>
                        <ul className='space-y-8 text-white'>
                            <li className='mx-10 font-racing_sans_one text-center'>
                                <h3 className='text-4xl'>Creando sesión con un Correo</h3>
                            </li>

                            <li className='mx-10 font-racing_sans_one text-lg'>
                                <label className='block'>Nombre</label>
                                <input 
                                className='block w-full bg-[#3B82F6] rounded-md focus:outline-none placeholder-white' 
                                type='text' 
                                placeholder='Ingrese un nombre de usuario'
                                />
                            </li>

                            <li className='mx-10 font-racing_sans_one text-lg'>
                                <label className='block'>Correo</label>
                                <input 
                                className='block w-full bg-[#3B82F6] rounded-md focus:outline-none placeholder-white' 
                                type='email' 
                                placeholder='Ingrese su correo'
                                />
                            </li>

                            <li className='mx-10 font-racing_sans_one text-lg'>
                                <label className='block'>Contraseña</label>
                                <input 
                                className='block w-full bg-[#3B82F6] rounded-md focus:outline-none placeholder-white' 
                                type='password' 
                                placeholder='Ingrese su contraseña'
                                />
                            </li>

                            <li className='mx-10 font-racing_sans_one text-lg text-center'>
                                <button>
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