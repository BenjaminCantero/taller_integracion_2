
import Link from 'next/link';
import { useState } from 'react';

export default function Login() {
    /* 
    Tipos de Formularios soportados:
    1: Inicio de sesión con Google
    2: Inicio de sesión con correo
    */
    const [formulario, setFormulario] = useState('')

    // Muestra el formulario de Inicio de Session
    const iniciarSesionGoogle = () => {
        let id = document.getElementById('Google')
        if (id.classList.contains('invisible')) {
            id.classList.remove('invisible');
            id.classList.add('visible');
            setFormulario('1');
        } else {
            id.classList.remove('visible');
            id.classList.add('invisible');
            setFormulario('');
        }
        return
    }

    // Muestra el formulario de Inicio de Session
    const iniciarSesionCorreo = () => {
        let id = document.getElementById('Correo');
        if (id.classList.contains('invisible')) {
            id.classList.remove('invisible');
            id.classList.add('visible');
            setFormulario('2');
        } else {
            id.classList.remove('visible');
            id.classList.add('invisible');
            setFormulario('');
        }
        return
    }

    const cerrarFormularios = () => {
        if (formulario == '1') {
            let id = document.getElementById('Google');
            if (id.classList.contains('visible')) {
                id.classList.remove('visible');
                id.classList.add('invisible');
                setFormulario('');
            }

        } else if (formulario == '2') {
            console.log('funciona')
            let id = document.getElementById('Correo');
            if (id.classList.contains('visible')) {
                id.classList.remove('visible');
                id.classList.add('invisible');
                setFormulario('');
            }
        }
        return
    }

    return (
        
        <div className='h-screen bg-gray-100'>
            <main className='h-screen container mx-auto flex items-center justify-center'>
                <div className='p-5 border border-black rounded-md'>
                    <ul className='space-y-6 text-black'>

                        {/* ------------------------------------------------------------- */}
                        {/* ------------------- Nombre de la Empresa -------------------- */}
                        {/* ------------------------------------------------------------- */}
                        {/*
                        <li className='font-racing_sans_one text-center'>
                            <h1 className='text-4xl '>
                                GISTOKED
                            </h1>

                        </li>
                        */}

                        {/* ------------------------------------------------------------- */}
                        {/* ------------------- Bienvenida al Cliente ------------------- */}
                        {/* ------------------------------------------------------------- */}
                        <li className='font-racing_sans_one text-center'>
                            <div>
                                <h2 
                                    className='text-4xl'> 
                                    Bienvenido de vuelta
                                </h2>
                            </div>
                        </li>

                        {/* ------------------------------------------------------------- */}
                        {/* --------------------- Inicio con Google --------------------- */}
                        {/* ------------------------------------------------------------- */}
                        <li className='font-racing_sans_one text-center text-lg'>
                            <div className='py-1 border border-black rounded-xl'> 
                                <button onClick={iniciarSesionGoogle}>
                                    Iniciar sesión con Google
                                </button>
                            </div>
                        </li>

                        {/* ------------------------------------------------------------- */}
                        {/* --------------------- Inicio con Correo --------------------- */}
                        {/* ------------------------------------------------------------- */}
                        <li className='font-racing_sans_one text-center text-lg'>
                            <div className='py-1 border border-black rounded-xl'>
                                <button onClick={iniciarSesionCorreo}>
                                    Iniciar sesión con Correo
                                </button>
                            </div> 
                        </li>

                        {/* ------------------------------------------------------------- */}
                        {/* --------------------- Crear Cuenta nueva -------------------- */}
                        {/* ------------------------------------------------------------- */}
                        <li className='font-racing_sans_one text-center text-lg'>
                            <div>
                                <p className='inline-block'>No tienes una cuenta?</p>
                                <Link
                                    href='#' 
                                    className='ml-2 inline-block text-blue-700'>
                                    Crea una
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* ----------- Formulario Inicio de sesion con Google ---------- */}
                {/* ------------------------------------------------------------- */}
                <div id='Google' className='p-5 fixed border border-black rounded-md bg-red-500 invisible'>
                    <form className='space-y-6 text-black'>
                        <h1>
                            Google
                        </h1>
                    </form>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* ------------ Formulario Inicio de sesion con Correo---------- */}
                {/* ------------------------------------------------------------- */}
                <div id='Correo' className='p-2 fixed flex items-center justify-center border border-black rounded-md bg-green-500 invisible'>
                    <div className='text-black text-right'>
                        <button type='button' onClick={cerrarFormularios} className=''>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" stroke="currentColor" strokeWidth="1" fill="none"/>
                            </svg>
                        </button>
                    </div>

                    <form className='space-y-6 text-white'>
                        <ul>
                            <li className='mx-10 font-racing_sans_one text-center text-4xl'>
                                <h3>Iniciando sesión con un Correo</h3>
                            </li>

                            <li className='mx-10 font-racing_sans_one'>
                                <label className='block'>Correo</label>
                                <input 
                                className='block w-full bg-[#22C55E] rounded-md px-4 py-2 focus:outline-none placeholder-white' 
                                type="email" 
                                placeholder="Correo"
                                />
                            </li>

                            <li className='font-racing_sans_one text-center text-lg'>
                            </li>

                            <li className='font-racing_sans_one text-center text-lg'> 
                            </li>

                            <li className='font-racing_sans_one text-center text-lg'>
                            </li>
                        </ul>
                    </form>
                </div>
            </main>
        </div>
    )
}