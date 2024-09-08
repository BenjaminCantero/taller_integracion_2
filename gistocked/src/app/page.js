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

  const goToPage = (url) => {
    window.location.href = url;
  };

  return (
    <div className='min-h-screen grid grid-cols-6 bg-gray-100'>
      {/* Barra lateral */}
      <div className='col-span-1 bg-gray-800 text-white p-6 shadow-lg'>
        {/* Logotipo */}
        <div className='text-center mb-8'>
          <h1 className='uppercase font-bold text-3xl tracking-wider'>Mi Logotipo</h1>
        </div>

        {/* Menú de navegación */}
        <nav>
          <ul className='space-y-4'>
            <li>
              <button
                className='block w-full text-left py-3 px-5 rounded-lg hover:bg-gray-700 transition-colors duration-300'
                onClick={() => goToPage('/')}
              >
                Inicio
              </button>
            </li>
            <li>
              <button
                className='block w-full text-left py-3 px-5 rounded-lg hover:bg-gray-700 transition-colors duration-300'
                onClick={() => goToPage('/productos')}
              >
                Productos
              </button>
            </li>
            <li>
              <button
                className='block w-full text-left py-3 px-5 rounded-lg hover:bg-gray-700 transition-colors duration-300'
                onClick={() => goToPage('/estadisticas')}
              >
                Estadísticas
              </button>
            </li>
            <li>
              <button
                className='block w-full text-left py-3 px-5 rounded-lg hover:bg-gray-700 transition-colors duration-300'
                onClick={() => goToPage('/contacto')}
              >
                Contacto
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Contenido principal */}
      <div className='col-span-5 p-8'>
        <h2 className='text-3xl font-bold mb-8 text-gray-800'>Bienvenido a Nuestra Tienda</h2>
        
        {/* Sección de productos */}
        <div className='grid grid-cols-3 gap-8'>
          {[
            { name: 'Producto 1', description: 'Descripción del producto 1.', image: 'url-to-image-1' },
            { name: 'Producto 2', description: 'Descripción del producto 2.', image: 'url-to-image-2' },
            { name: 'Producto 3', description: 'Descripción del producto 3.', image: 'url-to-image-3' }
          ].map((product, index) => (
            <div key={index} className='border border-gray-300 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300'>
              <img src={product.image} alt={product.name} className='w-full h-48 object-cover mb-4 rounded-lg border border-gray-200' />
              <h3 className='text-xl font-semibold mb-2 text-gray-800'>{product.name}</h3>
              <p className='text-gray-600 mb-4'>{product.description}</p>
              <button 
                className='bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300'
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
        <div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50'>
          <div className='bg-white p-8 rounded-lg shadow-lg w-3/4 md:w-1/2'>
            <h2 className='text-3xl font-bold mb-4 text-gray-800'>{selectedProduct.name}</h2>
            <img src={selectedProduct.image} alt={selectedProduct.name} className='w-full h-72 object-cover mb-4 rounded-lg border border-gray-200' />
            <p className='text-gray-700 mb-4'>{selectedProduct.description}</p>
            <button 
              className='bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300'
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
