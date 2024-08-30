import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Header */}
      <header className="flex w-full justify-between items-center p-6 bg-gray-800 text-white">
        <h1 className="text-3xl font-bold">Gistocked</h1>
        <nav className="flex gap-4">
          <a href="#" className="hover:text-gray-300">Inicio</a>
          <a href="#" className="hover:text-gray-300">Inventario</a>
          <a href="#" className="hover:text-gray-300">Stock</a>
          <a href="#" className="hover:text-gray-300">Detalles</a>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="relative w-full h-[500px] flex items-center justify-center bg-gray-200">
        <Image
          src="/hero-image.jpg" // Reemplaza con la ruta de la imagen del héroe
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
          className="opacity-80"
        />
        <div className="absolute text-center text-white">
          <h2 className="text-5xl font-bold">¡Bienvenido a Gistocked!</h2>
          <p className="mt-4 text-xl">Gestor de inventario para tiendas</p>
          <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full">Ver Ofertas</button>
        </div>
      </div>

      {/* Categories Section */}
      <section className="my-16 w-full max-w-6xl">
        <h3 className="text-3xl font-semibold mb-8 text-center">Categorías</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md">
            <Image src="/category1.jpg" alt="Categoría 1" width={150} height={150} />
            <h4 className="mt-4 text-xl font-medium">Inventario</h4>
          </div>
          <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md">
            <Image src="/category2.jpg" alt="Categoría 2" width={150} height={150} />
            <h4 className="mt-4 text-xl font-medium">Stock</h4>
          </div>
          <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md">
            <Image src="/category3.jpg" alt="Categoría 3" width={150} height={150} />
            <h4 className="mt-4 text-xl font-medium">Ventas</h4>
          </div>
          <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md">
            <Image src="/category4.jpg" alt="Categoría 4" width={150} height={150} />
            <h4 className="mt-4 text-xl font-medium">Detalles</h4>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="my-16 w-full max-w-6xl">
        <h3 className="text-3xl font-semibold mb-8 text-center">Detalles recientes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
            <Image src="/product1.jpg" alt="Producto 1" width={150} height={150} />
            <h4 className="mt-4 text-xl font-medium">Producto 1</h4>
            <p className="text-lg font-semibold text-blue-600 mt-2">$99.99</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">Ver Detalles</button>
          </div>
          <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
            <Image src="/product2.jpg" alt="Producto 2" width={150} height={150} />
            <h4 className="mt-4 text-xl font-medium">Producto 2</h4>
            <p className="text-lg font-semibold text-blue-600 mt-2">$89.99</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">Ver Detalles</button>
          </div>
          <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
            <Image src="/product3.jpg" alt="Producto 3" width={150} height={150} />
            <h4 className="mt-4 text-xl font-medium">Producto 3</h4>
            <p className="text-lg font-semibold text-blue-600 mt-2">$79.99</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">Ver Detalles</button>
          </div>
          <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
            <Image src="/product4.jpg" alt="Producto 4" width={150} height={150} />
            <h4 className="mt-4 text-xl font-medium">Producto 4</h4>
            <p className="text-lg font-semibold text-blue-600 mt-2">$69.99</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">Ver Detalles</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-white p-6 mt-16">
        <div className="flex flex-col items-center">
          <p>&copy; 2024 Gistocked. Todos los derechos reservados.</p>
          <p className="mt-2">Siguenos en:</p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-gray-400">Facebook</a>
            <a href="#" className="hover:text-gray-400">Instagram</a>
            <a href="#" className="hover:text-gray-400">Twitter</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
