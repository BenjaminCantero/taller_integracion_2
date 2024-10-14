'use client'
import { useState } from "react";

const Configuraciones = ({ usuarioInfo, setUsuarioInfo }) => {
    const [nuevoNombre, setNuevoNombre] = useState('');
    const [nuevoCorreo, setNuevoCorreo] = useState('');

    const validarCorreo = (correo) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular básica para validar correos
        return regex.test(correo);
    };

    const aceptar = () => {
        // Validar el nuevo correo
        const correoValido = validarCorreo(nuevoCorreo);

        // Actualiza el estado de usuarioInfo solo si el correo es válido
        setUsuarioInfo(prevState => ({
            ...prevState,
            ...(nuevoNombre && { nombre: nuevoNombre }),
            ...(correoValido ? { correo: nuevoCorreo } : {}) // Cambia correo solo si es válido
        }));

        // Limpiar los campos
        setNuevoNombre('');
        setNuevoCorreo('');
    };

    const cancelar = () => {
        setNuevoNombre('');
        setNuevoCorreo('');
        return;
    };

    return (
        <div className='min-h-screen min-w-[800px] flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300'>
            <div className='flex mb-8'>
                <div className='w-full grid grid-cols-4'>
                    <div className='col-start-1 col-span-4'>
                        <h2 className='text-4xl font-bold text-indigo-600 text-center'>
                            Editar Perfil
                        </h2>
                    </div>
                </div>
            </div>

            <main className='flex flex-col md:flex-row rounded-lg shadow-xl bg-white overflow-hidden w-full max-w-5xl'>
                <section className='p-10 bg-gradient-to-br from-gray-100 to-indigo-50'>
                    <ul className='space-y-5'>
                        <li>
                            <label className='block font-bold text-indigo-700 text-lg'>Nombre actual</label>
                            <input
                                readOnly
                                type='text'
                                value={usuarioInfo.nombre}
                                className='my-2 px-4 py-2 block w-full text-lg rounded-lg bg-gray-200 border border-indigo-400 focus:outline-none'
                            />
                        </li>

                        <li>
                            <label className='block font-bold text-indigo-700 text-lg'>Correo actual</label>
                            <input
                                readOnly
                                type='text'
                                value={usuarioInfo.correo}
                                className='my-2 px-4 py-2 block w-full text-lg rounded-lg bg-gray-200 border border-indigo-400 focus:outline-none'
                            />
                        </li>
                    </ul>
                </section>

                <section className='p-10 bg-gradient-to-br from-gray-100 to-indigo-50'>
                    <form>
                        <ul className='space-y-5'>
                            <li>
                                <label className='block font-bold text-indigo-700 text-lg'>Cambiar Nombre</label>
                                <input
                                    type='text'
                                    placeholder={usuarioInfo.nombre}
                                    value={nuevoNombre}
                                    onChange={(e) => setNuevoNombre(e.target.value)}
                                    className='my-2 px-4 py-2 block w-full text-lg rounded-lg bg-gray-100 border border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                                />
                            </li>

                            <li>
                                <label className='block font-bold text-indigo-700 text-lg'>Cambiar Correo</label>
                                <input
                                    type='email'
                                    placeholder={usuarioInfo.correo}
                                    value={nuevoCorreo}
                                    onChange={(e) => setNuevoCorreo(e.target.value)}
                                    className='my-2 px-4 py-2 block w-full text-lg rounded-lg bg-gray-100 border border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                                />
                            </li>

                            <li>
                                <div className='flex justify-between items-center'>
                                    <button
                                        type='button'
                                        onClick={cancelar}
                                        className='px-6 py-2 text-lg text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors'
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        type='button'
                                        onClick={aceptar}
                                        className='px-6 py-2 text-lg text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors'
                                    >
                                        Aceptar
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default Configuraciones;
