"use client";

import { useState } from 'react';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const showProductDetails = (product) => {
    setSelectedProduct(product);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen grid grid-cols-6 bg-gradient-to-r from-blue-50 via-white to-blue-50">
      {/* Barra lateral */}
      <div className="col-span-1 bg-gradient-to-b from-gray-800 to-gray-900 text-white p-6 shadow-2xl">
        {/* Logotipo */}
        <div className="text-center mb-12">
          <h1 className="uppercase font-extrabold text-4xl tracking-widest text-yellow-400">Mi Logotipo</h1>
        </div>

        {/* Menú de navegación */}
        <nav>
          <ul className="space-y-6 text-lg">
            <li>
              <a href="#" className="block py-3 px-6 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-center shadow-lg transition-all transform hover:scale-105">
                Inicio
              </a>
            </li>
            <li>
              <a href="#" className="block py-3 px-6 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-center shadow-lg transition-all transform hover:scale-105">
                Productos
              </a>
            </li>
            <li>
              <a href="#" className="block py-3 px-6 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-center shadow-lg transition-all transform hover:scale-105">
                Estadísticas
              </a>
            </li>
            <li>
              <a href="#" className="block py-3 px-6 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-center shadow-lg transition-all transform hover:scale-105">
                Contacto
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Contenido principal */}
      <div className="col-span-5 p-10">
        <h2 className="text-5xl font-extrabold mb-12 text-gray-900 text-center">Bienvenido a Nuestra Tienda</h2>

        {/* Sección de productos */}
        <div className="grid grid-cols-3 gap-12">
          {/* Productos */}
          {[
            { name: 'Producto 1', description: 'Descripción del producto 1.', image: 'url-to-image-1' },
            { name: 'Producto 2', description: 'Descripción del producto 2.', image: 'url-to-image-2' },
            { name: 'Producto 3', description: 'Descripción del producto 3.', image: 'url-to-image-3' }
          ].map((product, index) => (
            <div key={index} className="bg-white border border-gray-200 p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all">
              {/* Imagen del producto con bordes redondeados */}
              <img src={product.image} alt={product.name} className="w-full h-60 object-cover mb-6 rounded-xl border border-gray-200" />
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">{product.name}</h3>
              <p className="text-gray-600 mb-6">{product.description}</p>
              {/* Botón de "Ver detalles" con estilo hover */}
              <button 
                className="bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700 transition-all transform hover:scale-105"
                onClick={() => showProductDetails(product)}
              >
                Ver detalles
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de detalles del producto */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-12 rounded-2xl shadow-2xl w-3/4 md:w-1/2">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">{selectedProduct.name}</h2>
            {/* Imagen del producto en el modal con bordes redondeados */}
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-80 object-cover mb-6 rounded-xl border border-gray-200" />
            <p className="text-gray-700 mb-8 text-lg">{selectedProduct.description}</p>
            {/* Botón de cerrar el modal con estilo hover */}
            <button 
              className="bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-700 transition-all transform hover:scale-105"
              onClick={closeProductDetails}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
