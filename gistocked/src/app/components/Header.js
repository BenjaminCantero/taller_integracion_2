import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center py-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">Gistocked</Link>
        </div>

        {/* Barra de búsqueda */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="px-4 py-2 rounded-md bg-gray-700 text-white w-64 focus:outline-none"
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Buscar
          </button>
        </div>

        {/* Navegación */}
        <nav className="flex space-x-6">
          <Link href="/stock" className="hover:text-blue-400">Ver Stock</Link>
          <Link href="/orders" className="hover:text-blue-400">Pedidos</Link>
          <Link href="/suppliers" className="hover:text-blue-400">Proveedores</Link>
          <Link href="/settings" className="hover:text-blue-400">Configuración</Link>
        </nav>
      </div>
    </header>
  );
}
