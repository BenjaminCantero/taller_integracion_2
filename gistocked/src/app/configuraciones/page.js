
'use client'
import { useState, useEffect } from 'react';

const Configuraciones = ({ usuarioInfo, setUsuarioInfo, usuariosAdminTemporales, setUsuariosAdminTemporales }) => {
    // Guardarán los cambios que quiera realizar el usuario
    const [nuevoNombre, setNuevoNombre] = useState('');
    const [nuevoCorreo, setNuevoCorreo] = useState('');

    // Variables gobales para todos los usuarios
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');

    const [aux, setAux] = useState(0);

    useEffect(() => {
    if (usuarioInfo) {
        if (usuarioInfo.id_rol === 1) {
            setNombre(usuarioInfo.nombre_usuario);
            setCorreo(usuarioInfo.email);
            setContrasena(usuarioInfo.password);
            
            for (let i=0; i<usuariosAdminTemporales.length; i++) {
                if ( nombre == usuariosAdminTemporales[i].nombre_usuario && correo == usuariosAdminTemporales[i].email && contrasena == usuariosAdminTemporales[i].password ) {
                    setAux(usuariosAdminTemporales[i].codigo_vendedor);
                }
            }

        } else {
            console.log('No hay un usuario activo');
        }
    }
}, [usuarioInfo]);

    const validarCorreo = (correo) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular básica para validar correos
        return regex.test(correo);
    };

    const editarInformacion = () => {
        // Validar el nuevo correo
        const correoValido = validarCorreo(nuevoCorreo);
        
        // Actualiza la bd ficticia
        setUsuariosAdminTemporales(prevState => {
            return prevState.map(usuario => 
                usuario.codigo_vendedor === aux
                    ? {
                        ...usuario,
                        ...(nuevoNombre && { nombre_usuario: nuevoNombre }),
                        ...(correoValido ? { email: nuevoCorreo } : {})
                        }
                    : usuario // Retorna el usuario sin cambios si no coincide
            );
        });

        // Actualiza el estado de usuarioInfo solo si el correo es válido
        setUsuarioInfo(prevState => ({
            ...prevState,
            ...(nuevoNombre && { nombre_usuario: nuevoNombre }),
            ...(correoValido ? { email: nuevoCorreo } : {}) // Cambia correo solo si es válido
        }));
        
        // Limpiar los campos
        setNuevoNombre('');
        setNuevoCorreo('');
    };

    // Elimina la información de los campos
    const cancelarEdicion = () => {
        setNuevoNombre('');
        setNuevoCorreo('');
        return;
    };

    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300'>
            <div className='flex mb-8'>
                <div className='w-full grid grid-cols-4'>
                    <div className='col-start-1 col-span-4'>
                        <h2 className='text-4xl font-bold text-indigo-600 text-center'>
                            Editar Perfil
                        </h2>
                    </div>
                </div>
            </div>

            <main className='flex flex-col justify-between rounded-lg shadow-xl bg-white md:flex-row overflow-hidden'>
                <section className='p-10 border border-r-gray-300 bg-gradient-to-br from-gray-100 to-indigo-50'>
                    <ul className='space-y-5'>
                        <li>
                            <label className='block font-bold text-indigo-700 text-lg'>Nombre actual</label>
                            <input
                                readOnly
                                type='text'
                                value={nombre}
                                className='my-2 px-4 py-2 block w-full text-lg rounded-lg bg-gray-100 border border-indigo-400 focus:outline-none'
                            />
                        </li>

                        <li>
                            <label className='block font-bold text-indigo-700 text-lg'>Correo actual</label>
                            <input
                                readOnly
                                type='text'
                                value={correo}
                                className='my-2 px-4 py-2 block w-full text-lg rounded-lg bg-gray-100 border border-indigo-400 focus:outline-none'
                            />
                        </li>
                    </ul>
                </section>

                <section className='p-10 border border-l-gray-300 bg-gradient-to-br from-gray-100 to-indigo-50'>
                    <form>
                        <ul className='space-y-5'>
                            <li>
                                <label className='block font-bold text-indigo-700 text-lg'>Cambiar Nombre</label>
                                <input
                                    type='text'
                                    placeholder={nombre}
                                    value={nuevoNombre}
                                    onChange={(e) => setNuevoNombre(e.target.value)}
                                    className='my-2 px-4 py-2 block w-full text-lg rounded-lg bg-gray-100 border border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                                />
                            </li>

                            <li>
                                <label className='block font-bold text-indigo-700 text-lg'>Cambiar Correo</label>
                                <input
                                    type='email'
                                    placeholder={correo}
                                    value={nuevoCorreo}
                                    onChange={(e) => setNuevoCorreo(e.target.value)}
                                    className='my-2 px-4 py-2 block w-full text-lg rounded-lg bg-gray-100 border border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                                />
                            </li>

                            <li>
                                <div className='flex justify-between items-center'>
                                    <button
                                        type='button'
                                        onClick={editarInformacion}
                                        className='px-6 py-2 text-lg text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors'
                                    >
                                        Aceptar
                                    </button>

                                    <button
                                        type='button'
                                        onClick={cancelarEdicion}
                                        className='px-6 py-2 text-lg text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors'
                                    >
                                        Cancelar
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
