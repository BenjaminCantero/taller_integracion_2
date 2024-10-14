
'use client'
import { useState } from "react";

const Configuraciones = ( {usuarioInfo, setUsuarioInfo} ) => {
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
        return
    }

    return (
        <div className='min-h-screen min-h-[500px] min-w-[700px] flex flex-col items-center justify-center'>
            <div className='flex'>
                <div className='w-full grid grid-cols-4'>
                    <div className='col-start-1 col-span-1'>
                        <h2 className='text-black text-2xl  '>
                            Editar Perfil
                        </h2>
                    </div>  
                </div>
            </div>
            
            

            <main className='flex flex-row rounded-lg shadow-sm shadow-gray-800 bg-gradient-to-r from-gray-50 to-gray-200'>
                <section className='p-10'>
                    <ul className='space-y-5'>
                        <li>
                            <label className='block font-medium text-gray-700'>Nombre actual</label>
                            <input 
                              readOnly
                              type='text'
                              value={usuarioInfo.nombre}
                              className='my-2 px-4 py-1 block rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                              ></input>
                        </li>

                        <li>
                            <label className='block font-medium text-gray-700'>Correo actual</label>
                            <input 
                              readOnly
                              type='text'
                              value={usuarioInfo.correo}
                              className='my-2 px-4 py-1 block rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                              ></input>
                        </li>
                    </ul>
                </section>

                <section className='p-10'>
                    <form>
                        <ul className='space-y-5'>
                            <li>
                                <label className='block font-medium text-gray-700'>Cambiar Nombre</label>
                                <input 
                                type='text'
                                placeholder={usuarioInfo.nombre}
                                value={nuevoNombre}
                                onChange={(e) => setNuevoNombre(e.target.value)}
                                className='my-2 px-4 py-1 block rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                ></input>
                            </li>

                            <li>
                                <label className='block font-medium text-gray-700'>Cambiar Correo</label>
                                <input 
                                type='email'
                                placeholder={usuarioInfo.correo}
                                value={nuevoCorreo}
                                onChange={(e) => setNuevoCorreo(e.target.value)}
                                className='my-2 px-4 py-1 block rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                ></input>
                            </li>

                            <li>
                                <div className='flex flex-row-reverse justify-between'>
                                   <button
                                     type='button'
                                     onClick={cancelar} 
                                     className='px-5 py-1 text-md text-center text-white rounded-lg bg-red-500'>
                                        cancelar
                                    </button>

                                    <button
                                      type='button'
                                      onClick={aceptar} 
                                      className='px-6 py-1 text-md text-center text-white rounded-lg bg-blue-600'>
                                        aceptar    
                                    </button> 
                                </div>
                            </li>
                        </ul>
                    </form>
                </section>
            </main>
        </div>
    )
};
export default Configuraciones;