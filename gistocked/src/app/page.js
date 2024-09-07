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
    <div className='min-h-screen grid grid-cols-6'>
      {/* Barra lateral */}
      <div className='col-span-1 bg-gray-200 p-4'>
        {/* Logotipo */}
        <div className='text-center mb-6'>
          <h1 className='uppercase font-bold text-xl tracking-[4px]'>Mi Logotipo</h1>
        </div>
        
        {/* Menú de navegación */}
        <nav>
          <ul className='space-y-4'>
            <li><a href="#" className='text-gray-700 hover:text-blue-500'>Inicio</a></li>
            <li><a href="#" className='text-gray-700 hover:text-blue-500'>Productos</a></li>
            <li><a href="#" className='text-gray-700 hover:text-blue-500'>Ofertas</a></li>
            <li><a href="#" className='text-gray-700 hover:text-blue-500'>Contacto</a></li>
          </ul>
        </nav>
      </div>
      
      {/* Contenido principal */}
      <div className='col-span-5 p-8'>
        <h2 className='text-2xl font-bold mb-6'>Bienvenido a Nuestra Tienda</h2>
        
        {/* Sección de productos */}
        <div className='grid grid-cols-3 gap-6'>
          {/* Productos */}
          {[
            { name: 'Producto 1', description: 'Descripción del producto 1.', image: 'url-to-image-1' },
            { name: 'Producto 2', description: 'Descripción del producto 2.', image: 'url-to-image-2' },
            { name: 'Producto 3', description: 'Descripción del producto 3.', image: 'url-to-image-3' }
          ].map((product, index) => (
            <div key={index} className='border p-4 rounded'>
              <img src={product.image} alt={product.name} className='w-full h-48 object-cover mb-4' />
              <h3 className='text-lg font-semibold'>{product.name}</h3>
              <p className='text-gray-600'>{product.description}</p>
              <button 
                className='mt-4 bg-green-500 text-white px-4 py-2 rounded'
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
          <div className='bg-white p-6 rounded-lg w-1/2'>
            <h2 className='text-2xl font-bold mb-4'>{selectedProduct.name}</h2>
            <img src={selectedProduct.image} alt={selectedProduct.name} className='w-full h-64 object-cover mb-4' />
            <p className='text-gray-700 mb-4'>{selectedProduct.description}</p>
            <button 
              className='bg-red-500 text-white px-4 py-2 rounded'
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
