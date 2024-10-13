"use client"; // Asegúrate de que esto esté al principio

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTachometerAlt, faUsers, faBoxes, faShoppingCart, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation'; // Cambia a 'next/navigation'

const navigationItems = [
  { icon: faHome, label: 'Inicio', href: '/' },
  { icon: faTachometerAlt, label: 'Dashboard', href: '/dashboard' },
  { icon: faUsers, label: 'Usuarios', href: '/usuarios' },
  { icon: faBoxes, label: 'Productos', href: '/productos' },
  { icon: faShoppingCart, label: 'Ventas', href: '/ventas' },
  { icon: faCog, label: 'Configuración', href: '/configuracion' }
];

const Sidebar = () => {
  const router = useRouter(); // Obtiene el enrutador

  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-gray-800 text-white flex flex-col justify-between p-6 shadow-lg overflow-y-auto">
      {/* Logo */}
      <div className="logo flex items-center mb-10">
        <img src="/Logo.png" alt="Logo" className="w-12 h-12 mr-4 rounded-full" />
        <span className="text-yellow-400 font-bold text-lg">Gistocked</span>
      </div>

      {/* Navegación */}
      <nav className="flex-grow">
        <ul className="space-y-6">
          {navigationItems.map((item, index) => (
            <li key={index}>
              <Link href={item.href} passHref>
                <span className={`flex items-center p-3 text-lg hover:bg-gray-700 hover:text-yellow-400 rounded-lg transition-colors ${router.asPath === item.href ? 'bg-gray-700 text-yellow-400' : ''}`}>
                  <FontAwesomeIcon icon={item.icon} className="mr-4" /> {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Información del usuario */}
      <div className="user-info mt-4">
        <p className="mb-4">Bienvenido, Admin</p>
        <button className="logout-btn flex items-center p-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
