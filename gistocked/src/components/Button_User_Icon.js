// Button_User_Icon.js
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useState } from 'react'; // Importa el hook de estado

function Button_User_Icon({ nombreUsuario }) {
  const [asideVisible, setAsideVisible] = useState(false); // Estado para controlar la visibilidad del aside

  const cerrarSesion = () => {
    signOut({ callbackUrl: "/" });
  };

  const toggleAside = () => {
    setAsideVisible(!asideVisible); // Alterna el estado del aside
  };

  return (
    <div>
      {/* Botón para mostrar el aside */}
      <button onClick={toggleAside} className="hidden md:block">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
          <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
        </svg>
      </button>

      {/* Aside controlado por el estado */}
      <aside id="aside" className={`w-1/4 h-full fixed top-0 right-0 z-50 bg-gray-900 rounded-l-lg transition-transform duration-300 ${asideVisible ? 'translate-x-0' : 'translate-x-full'}`}>
        <ul className="flex flex-col gap-10 p-4">
          {/* Botón para cerrar el aside */}
          <li className="self-start">
            <button onClick={toggleAside}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-white bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </button>
          </li>

          {/* Información del usuario */}
          <li className="flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="text-white bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg>
            <p className="mt-2 text-white">{nombreUsuario}</p>
          </li>

          {/* Link al perfil de usuario */}
          <li className="flex flex-col items-center justify-center">
            <Link href="#">Perfil de usuario</Link>
          </li>

          {/* Botón para cerrar sesión */}
          <li className="flex flex-col items-center justify-center">
            <button onClick={cerrarSesion} className="bg-blue-700 text-white rounded-md px-4 py-2">
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default Button_User_Icon;
