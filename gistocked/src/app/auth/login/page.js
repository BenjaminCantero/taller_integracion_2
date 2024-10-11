
export default function Login() {
    /* 
    Tipos de Formularios soportados:
    0: Formularios ocultos
    1: Inicio de sesión con Google
    2: Crear sesión con un Correo
    */
    let formulario = '0'

    // Muestra el formulario de Inicio de Session
    const iniciarSesionCorreo = () => {
        let id = document.getElementById('Login');
        let sesion = document.getElementById('tipoSesion');
    
        // Muestra el formulario
        if (id.classList.contains('invisible') && id.classList.contains('hidden')) {
            id.classList.remove('invisible', 'hidden');
            id.classList.add('visible', 'opacity-0');
    
            setTimeout(() => {
                id.classList.add('transition', 'duration-1000', 'ease-linear', 'opacity-100');
            }, 10);
    
            // Oculta los métodos de inicio de sesión
            if (sesion.classList.contains('visible')) {
                sesion.classList.remove('visible');
                sesion.classList.add('invisible', 'hidden');
            }
    
            formulario = '1';
        }
    };

    // Muestra el formulario de Crear Nueva Session
    const crearCuentaNueva = () => {
        let id = document.getElementById('Register');
        let sesion = document.getElementById('tipoSesion')

        // Muestra el formulario
        if (id.classList.contains('invisible') && id.classList.contains('hidden')) {
            id.classList.remove('invisible', 'hidden');
            id.classList.add('visible', 'opacity-0');
    
            setTimeout(() => {
                id.classList.add('transition', 'duration-1000', 'ease-linear', 'opacity-100');
            }, 10);
    
            if (sesion.classList.contains('visible')) {
                sesion.classList.remove('visible');
                sesion.classList.add('invisible', 'hidden');
            }
            formulario = '2';
        }
        return
    }

    // Cierra Formularios
    const cerrarFormularios = () => {
        if (formulario == '1') {
            let id = document.getElementById('Login');
            let sesion = document.getElementById('tipoSesion');

            if (id.classList.contains('visible') && id.classList.contains('opacity-100')) {
                id.classList.remove('visible', 'transition', 'duration-1000', 'ease-linear', 'opacity-100');
                id.classList.add('invisible', 'hidden');

                if (sesion.classList.contains('invisible') && sesion.classList.contains('hidden')) {
                    sesion.classList.remove('invisible', 'hidden');
                    sesion.classList.add('visible');
                    }
                formulario = '0';
            }
        } else if (formulario == '2') {
            let id = document.getElementById('Register');
            let sesion = document.getElementById('tipoSesion');

            if (id.classList.contains('visible') && id.classList.contains('opacity-100')) {
                id.classList.remove('visible', 'transition', 'duration-1000', 'ease-linear', 'opacity-100');
                id.classList.add('invisible', 'hidden');

                if (sesion.classList.contains('invisible') && sesion.classList.contains('hidden')) {
                    sesion.classList.remove('invisible', 'hidden');
                    sesion.classList.add('visible');
                    }
                formulario = '0';
            }
        } else {
            console.log('A ocurrido un error')
        }
        return
    }

    // Animaciones de los formularios
    const moverLabel = () => {
        if (formulario == '1') {
            let inputCorreo = document.getElementById('inputCorreoForm1');
            let inputContrasena = document.getElementById('inputContrasenaForm1');
            let correo = document.getElementById('correoForm1');
            let contrasena = document.getElementById('contrasenaForm1');

            // Realiza la animación
            if (inputCorreo.value) {
                correo.classList.add('-translate-y-10');
            } else {
                correo.classList.remove('-translate-y-10');
            }

            if (inputContrasena.value) {
                contrasena.classList.add('-translate-y-10');
            } else {
                contrasena.classList.remove('-translate-y-10');
            }


        } else if (formulario == '2') {
            let inputNombre = document.getElementById('inputNombreForm2');
            let inputCorreo = document.getElementById('inputCorreoForm2');
            let inputContrasena = document.getElementById('inputContrasenaForm2');
            let nombre = document.getElementById('nombreForm2');
            let correo = document.getElementById('correoForm2');
            let contrasena = document.getElementById('contrasenaForm2');

            // Realiza la animación
            if (inputNombre.value) {
                nombre.classList.add('-translate-y-10');
            } else {
                nombre.classList.remove('-translate-y-10');
            }

            if (inputCorreo.value) {
                correo.classList.add('-translate-y-10');
            } else {
                correo.classList.remove('-translate-y-10');
            }

            if (inputContrasena.value) {
                contrasena.classList.add('-translate-y-10');
            } else {
                contrasena.classList.remove('-translate-y-10');
            }

        } else {
            console.log('A ocurrido un error');
        }
        
        return
    }
    return (
        
        <div className='h-screen flex items-center justify-center bg-gray-100'>
            <main className='p-5 border border-black rounded-md bg-white'>
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
                        {/* --------------------- Inicio de Sesion  --------------------- */}
                        {/* ------------------------------------------------------------- */}
                        <li className='font-racing_sans_one text-center text-lg'>
                            <div className='py-1 border border-black rounded-xl'>
                                <button
                                onClick={iniciarSesionCorreo}
                                className='w-full'
                                >
                                    Iniciar sesión
                                </button>
                            </div> 
                        </li>

                        {/* ------------------------------------------------------------- */}
                        {/* --------------------- Crear nueva Cuenta -------------------- */}
                        {/* ------------------------------------------------------------- */}
                        <li className='font-racing_sans_one text-center text-lg'>
                            <div className='py-1 border border-black rounded-xl'>
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
                <div id='Login' className='p-5 rounded-md bg-green-500 invisible hidden'>
                    <div className='text-white text-right'>
                        <button type='button' onClick={cerrarFormularios}>
                            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-x-lg' viewBox='0 0 16 16'>
                                <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z' stroke='currentColor' strokeWidth='1' fill='none'/>
                            </svg>
                        </button>
                    </div>

                    <form>
                        <ul className='space-y-9 text-white'>
                            <li className='mx-10 font-racing_sans_one text-center'>
                                <h3 className='text-4xl'>Iniciando sesión en Gistocked</h3>
                            </li>

                            <li className='mx-10 font-racing_sans_one text-lg relative'>
                                <input 
                                    className='w-full bg-[#22C55E] focus:outline-none placeholder-transparent border-b-2 peer'
                                    id='inputCorreoForm1'
                                    type='email' 
                                    placeholder=' '
                                    onInput={moverLabel}
                                />
                                <label
                                    id='correoForm1'
                                    className='absolute start-0 top-1/2 transform -translate-y-1/2 transition-all duration-500 peer-placeholder-shown:top-1/2 peer-focus:-translate-y-10'
                                >
                                    Correo
                                </label>
                            </li>

                            <li className='mx-10 font-racing_sans_one text-lg relative'>
                                <input 
                                    className='w-full bg-[#22C55E] focus:outline-none placeholder-transparent border-b-2 peer'
                                    id='inputContrasenaForm1'
                                    type='password' 
                                    placeholder=' '
                                    onInput={moverLabel}
                                />
                                <label
                                    id='contrasenaForm1'
                                    className='absolute start-0 top-1/2 transform -translate-y-1/2 transition-all duration-500 peer-placeholder-shown:top-1/2 peer-focus:-translate-y-10'
                                >
                                    Contraseña
                                </label>
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
                            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-x-lg' viewBox='0 0 16 16'>
                                <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z' stroke='currentColor' strokeWidth='1' fill='none'/>
                            </svg>
                        </button>
                    </div>

                    <form>
                        <ul className='space-y-9 text-white'>
                            <li className='mx-10 font-racing_sans_one text-center'>
                                <h3 className='text-4xl'>Creando cuenta para Gistocked</h3>
                            </li>

                            <li className='mx-10 font-racing_sans_one text-lg relative'>
                                <input 
                                    className='w-full bg-[#3B82F6] focus:outline-none placeholder-transparent border-b-2 peer'
                                    id='inputNombreForm2'
                                    type='text' 
                                    placeholder=' '
                                    onInput={moverLabel}
                                />
                                <label
                                    id='nombreForm2'
                                    className='absolute start-0 top-1/2 transform -translate-y-1/2 transition-all duration-500 peer-placeholder-shown:top-1/2 peer-focus:-translate-y-10'
                                >
                                    Nombre
                                </label>
                            </li>

                            <li className='mx-10 font-racing_sans_one text-lg relative'>
                                <input 
                                    className='w-full bg-[#3B82F6] focus:outline-none placeholder-transparent border-b-2 peer'
                                    id='inputCorreoForm2'
                                    type='email' 
                                    placeholder=' '
                                    onInput={moverLabel}
                                />
                                <label
                                    id='correoForm2'
                                    className='absolute start-0 top-1/2 transform -translate-y-1/2 transition-all duration-500 peer-placeholder-shown:top-1/2 peer-focus:-translate-y-10'
                                >
                                    Correo
                                </label>
                            </li>

                            <li className='mx-10 font-racing_sans_one text-lg relative'>
                                <input 
                                    className='w-full bg-[#3B82F6] focus:outline-none placeholder-transparent border-b-2 peer'
                                    id='inputContrasenaForm2'
                                    type='password' 
                                    placeholder=' '
                                    onInput={moverLabel}
                                />
                                <label
                                    id='contrasenaForm2'
                                    className='absolute start-0 top-1/2 transform -translate-y-1/2 transition-all duration-500 peer-placeholder-shown:top-1/2 peer-focus:-translate-y-10'
                                >
                                    Contraseña
                                </label>
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