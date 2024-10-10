// components/Sidebar.js
"use client"; // Indica que este es un componente de cliente
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="sidebar w-64 h-screen bg-gray-800 text-white flex flex-col justify-between p-6 shadow-lg">
      {/* Logo */}
      <div className="logo flex items-center mb-10">
        <img src="/logo.png" alt="Logo" className="w-12 h-12 mr-4 rounded-full" />
        <span className="text-yellow-400 font-bold text-lg">Gistocked</span>
      </div>

      {/* Navegación */}
      <nav className="flex-grow">
        <ul className="space-y-6">
          <li>
            <Link href="/">
              <span className="flex items-center p-3 text-lg hover:bg-gray-700 hover:text-yellow-400 rounded-lg transition-colors">
                <i className="fas fa-home mr-4"></i> Inicio
              </span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard">
              <span className="flex items-center p-3 text-lg hover:bg-gray-700 hover:text-yellow-400 rounded-lg transition-colors">
                <i className="fas fa-tachometer-alt mr-4"></i> Dashboard
              </span>
            </Link>
          </li>
          <li>
            <Link href="/usuarios">
              <span className="flex items-center p-3 text-lg hover:bg-gray-700 hover:text-yellow-400 rounded-lg transition-colors">
                <i className="fas fa-users mr-4"></i> Usuarios
              </span>
            </Link>
          </li>
          <li>
            <Link href="/productos">
              <span className="flex items-center p-3 text-lg hover:bg-gray-700 hover:text-yellow-400 rounded-lg transition-colors">
                <i className="fas fa-boxes mr-4"></i> Productos
              </span>
            </Link>
          </li>
          <li>
            <Link href="/ventas">
              <span className="flex items-center p-3 text-lg hover:bg-gray-700 hover:text-yellow-400 rounded-lg transition-colors">
                <i className="fas fa-shopping-cart mr-4"></i> Ventas
              </span>
            </Link>
          </li>
          <li>
            <Link href="/configuracion">
              <span className="flex items-center p-3 text-lg hover:bg-gray-700 hover:text-yellow-400 rounded-lg transition-colors">
                <i className="fas fa-cog mr-4"></i> Configuración
              </span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Información del usuario */}
      <div className="user-info">
        <p className="mb-4">Bienvenido, Admin</p>
        <button className="logout-btn flex items-center p-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
          <i className="fas fa-sign-out-alt mr-2"></i> Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
