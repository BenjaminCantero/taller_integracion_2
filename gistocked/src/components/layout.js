"use client";

import Link from "next/link";
import Button_User_Icon from "./Button_User_Icon";
import Button_Navigation_Menu from "./Button_Navigation_Menu";
import { useUser } from "@/app/globalsUsers"; // Asegúrate de que la ruta sea correcta
import MenuItem from "./MenuItem"; // Importa el componente del menú

function Layout({ children }) {
  const { rolState, userInfo } = useUser(); // Usar el hook para acceder al contexto

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 h-screen bg-gradient-to-b from-indigo-900 to-indigo-800 text-white p-6 shadow-2xl">
        {/* Logo y Título */}
        <div className="text-center mb-10">
          <div className="text-4xl font-extrabold tracking-wider">
            <i className="fas fa-layer-group text-blue-300"></i> Gistocked
          </div>
          <p className="text-sm text-indigo-300 mt-2">Administra tu negocio</p>
        </div>

        {/* Botón de inicio de sesión si no hay usuario autenticado */}
        {!userInfo && (
          <div className="mb-4">
            <Link href="/auth/UserLogin">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-700 transition-colors">
                Iniciar Sesión
              </button>
            </Link>
          </div>
        )}

        {/* Menú cuando el usuario está autenticado */}
        {userInfo && (
          <>
            {(rolState === 1) && (
              <nav className="space-y-5">
                <MenuItem 
                  href="/Grafics" 
                  iconClass="fas fa-chart-bar" 
                  text="Gráficos"
                  className="block py-3 px-5 rounded-lg hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out"
                />
                <MenuItem 
                  href="/products" 
                  iconClass="fas fa-box" 
                  text="Productos"
                  className="block py-3 px-5 rounded-lg hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out"
                />
                <MenuItem 
                  href="/sales" 
                  iconClass="fas fa-shopping-cart" 
                  text="Ventas"
                  className="block py-3 px-5 rounded-lg hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out"
                />
                <MenuItem 
                  href="/inventory" 
                  iconClass="fas fa-warehouse" 
                  text="Inventario"
                  className="block py-3 px-5 rounded-lg hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out"
                />
                <MenuItem 
                  href="/worker_management" 
                  iconClass="fas fa-users-cog" 
                  text="Gestión de Trabajadores"
                  className="block py-3 px-5 rounded-lg hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out"
                />
              </nav>
            )}

            {(rolState === 2) && (
              <nav className="space-y-5">
                <MenuItem 
                  href="/" 
                  iconClass="fas fa-home" 
                  text="Inicio"
                  className="block py-3 px-5 rounded-lg hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out"
                />
                <MenuItem 
                  href="/products/" 
                  iconClass="fas fa-box" 
                  text="Productos"
                  className="block py-3 px-5 rounded-lg hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out"
                />
                <MenuItem 
                  href="/sales/" 
                  iconClass="fas fa-shopping-cart" 
                  text="Ventas"
                  className="block py-3 px-5 rounded-lg hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out"
                />
                <MenuItem 
                  href="/inventory/" 
                  iconClass="fas fa-warehouse" 
                  text="Inventario"
                  className="block py-3 px-5 rounded-lg hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out"
                />
              </nav>
            )}
          </>
        )}
      </aside>

      <div className="flex flex-col flex-grow">
        {/* Header */}
        <header className="bg-gray-900 text-white shadow-md">
          <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
            <h1 className="text-2xl font-bold">Mi Tienda</h1>

            <div className="flex items-center space-x-4">
              {!userInfo ? (
                <Link href="/auth/UserLogin">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Iniciar Sesión
                  </div>
                </Link>
              ) : (
                <>
                  <Button_User_Icon nombreUsuario={userInfo.name} />
                  <Button_Navigation_Menu nombreUsuario={userInfo.name} rolUsuario={userInfo.rol} />
                </>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow w-full h-full p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
