"use client"; // Marcamos que este es un Client Component

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTachometerAlt, faUsers, faBoxes, faShoppingCart, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ( {usuarioInfo} ) => {
  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-gray-800 text-white flex flex-col justify-between p-6 shadow-lg overflow-y-auto">
      {/* Logo */}
      <div className="logo flex items-center mb-10">
        <img src="/logo.png" alt="Logo" className="w-12 h-12 mr-4 rounded-full" />
        <span className="text-yellow-400 font-bold text-lg">Gistocked</span>
      </div>

      {/* Navegación */}
      <nav className="flex-grow">
        <ul className="space-y-6">

          {/* Home */}
          <li>
            <Link href="/">
              <span className="flex items-center p-3 text-lg hover:bg-gray-700 hover:text-yellow-400 rounded-lg transition-colors">
                <FontAwesomeIcon icon={faHome} className="mr-4" /> Inicio
              </span>
            </Link>
          </li>

          {/* Dashboard */}
          <li>
            <Link href="/dashboard">
              <span className="flex items-center p-3 text-lg hover:bg-gray-700 hover:text-yellow-400 rounded-lg transition-colors">
                <FontAwesomeIcon icon={faTachometerAlt} className="mr-4" /> Dashboard
              </span>
            </Link>
          </li>

          {/* Usuarios */}
          <li>
            <Link href="/usuarios">
              <span className="flex items-center p-3 text-lg hover:bg-gray-700 hover:text-yellow-400 rounded-lg transition-colors">
                <FontAwesomeIcon icon={faUsers} className="mr-4" /> Usuarios
              </span>
            </Link>
          </li>

          {/* Productos */}
          <li>
            <Link href="/productos">
              <span className="flex items-center p-3 text-lg hover:bg-gray-700 hover:text-yellow-400 rounded-lg transition-colors">
                <FontAwesomeIcon icon={faBoxes} className="mr-4" /> Productos
              </span>
            </Link>
          </li>

          {/* Ventas */}
          <li>
            <Link href="/ventas">
              <span className="flex items-center p-3 text-lg hover:bg-gray-700 hover:text-yellow-400 rounded-lg transition-colors">
                <FontAwesomeIcon icon={faShoppingCart} className="mr-4" /> Ventas
              </span>
            </Link>
          </li>

          {/* Configuración */}
          <li>
            <Link href="/configuracion">
              <span className="flex items-center p-3 text-lg hover:bg-gray-700 hover:text-yellow-400 rounded-lg transition-colors">
                <FontAwesomeIcon icon={faCog} className="mr-4" /> Configuración
              </span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Información del usuario */}
      <div className="user-info mt-4">
        <p className="mb-4">Bienvenido, {usuarioInfo.nombre}</p>
        <button className="logout-btn flex items-center p-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
          <FontAwesomeIcon icon={faSignOutAlt}
          className="mr-2" 
          /> 
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
