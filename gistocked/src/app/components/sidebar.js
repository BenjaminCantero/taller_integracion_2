
'use client';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTachometerAlt, faUsers, faBoxes, faShoppingCart, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ( {children, setUsuarioActivo, setUsuarioInfo, setPagina} ) => {
  const cambiarPagina = (pagina) => {
    console.log(pagina)
    setPagina(pagina);
  }

  const cerrarSesion = () => {
    setUsuarioInfo({});
    setUsuarioActivo(false);
    return
  }
  return (
    <div className='flex flex-row'>
            {/* SideBar */}
            <section className='h-screen flex flex-col justify-between text-white bg-gray-800 overflow-y-auto'>
                {/* Logo de la Empresa */}
                <div className='m-10 flex items-center logo'>
                    <Image src='/logo.png' alt='Logo' className='mr-4 rounded-full'  width={48} height={48}/>
                    <span className="text-yellow-400 font-bold text-xl">Gistocked</span>
                </div>

                <nav className='flex-grow'>
                    <ul className='space-y-6'>
                        {/* Redirección hacia Home */}
                        <li className='w-full'>
                            <button 
                              onClick={() => cambiarPagina('Home')}
                              className='w-full'
                              >
                                <span className='px-2 py-4 flex items-center hover:bg-gray-700 hover:text-yellow-400 transition-colors duration-700'>
                                    <FontAwesomeIcon icon={faHome} className='mx-5 text-lg' /> Inicio
                                </span>
                            </button>
                        </li>

                        {/* Redirección hacia Dashboard */}
                        <li className='w-full'>
                            <button 
                              onClick={() => cambiarPagina('Dashboard')}
                              className='w-full'
                              >
                                <span className='px-2 py-4 flex items-center hover:bg-gray-700 hover:text-yellow-400 transition-colors duration-700'>
                                    <FontAwesomeIcon icon={faTachometerAlt} className='mx-5 text-lg' /> Dashboard
                                </span>
                            </button>
                        </li>

                        {/* Redirección hacia Usuarios */}
                        <li className='w-full'>
                            <button 
                              onClick={() => cambiarPagina('Usuarios')}
                              className='w-full'
                              >
                                <span className='px-2 py-4 flex items-center hover:bg-gray-700 hover:text-yellow-400 transition-colors duration-700'>
                                    <FontAwesomeIcon icon={faUsers} className='mx-5 text-lg' /> Usuarios
                                </span>
                            </button>
                        </li>

                        {/* Redirección hacia Productos */}
                        <li className='w-full'>
                            <button 
                              onClick={() => cambiarPagina('Productos')}
                              className='w-full'
                              >
                                <span className='px-2 py-4 flex items-center hover:bg-gray-700 hover:text-yellow-400 transition-colors duration-700'>
                                    <FontAwesomeIcon icon={faBoxes} className='mx-5 text-lg' /> Productos
                                </span>
                            </button>
                        </li>

                        {/* Redirección hacia Ventas */}
                        <li className='w-full'>
                            <button 
                              onClick={() => cambiarPagina('Ventas')}
                              className='w-full'
                              >
                                <span className='px-2 py-4 flex items-center hover:bg-gray-700 hover:text-yellow-400 transition-colors duration-700'>
                                    <FontAwesomeIcon icon={faShoppingCart} className='mx-5 text-lg' /> Ventas
                                </span>
                            </button>
                        </li>

                        {/* Redirección hacia las Configuraciones */}
                        <li className='w-full'>
                            <button 
                              onClick={() => cambiarPagina('Configuraciones')}
                              className='w-full'
                              >
                                <span className='px-2 py-4 flex items-center hover:bg-gray-700 hover:text-yellow-400 transition-colors duration-700'>
                                    <FontAwesomeIcon icon={faCog} className='mx-5 text-lg' /> Configuración
                                </span>
                            </button>
                        </li>

                        {/* Cerrar Sesión */}
                        <li className='w-full'>
                            <div className='px-2 py-4 flex items-center hover:bg-gray-700 hover:text-red-500 transition-colors duration-700'> 
                                <button
                                type='submit'
                                onClick={cerrarSesion}
                                >
                                    <FontAwesomeIcon icon={faSignOutAlt} className='mx-5 text-lg'/>
                                    Cerrar sesión
                                </button>
                            </div>
                        </li>
                    </ul>
                </nav>
            </section>

            {/* Children */}
            <section className='grow w-10 bg-gray-100 overflow-y-auto'>
              {children}
            </section>
        </div>
  );
};

export default Sidebar;
