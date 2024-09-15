import React from 'react';

const products = [
  { id: 1, name: 'Producto 1', price: 29.99, description: 'Una experiencia de calidad a un precio accesible.', image: '/producto1.jpg', category: 'Electrónica' },
  { id: 2, name: 'Producto 2', price: 49.99, description: 'Innovación y diseño en cada detalle.', image: '/producto2.jpg', category: 'Hogar' },
  { id: 3, name: 'Producto 3', price: 19.99, description: 'Ideal para el día a día.', image: '/producto3.jpg', category: 'Moda' },
  // Añadir más productos aquí...
];

const categories = Array.from(new Set(products.map(product => product.category)));

const ProductList = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-black">Descubre Nuestros Productos</h1>
      {categories.map((category) => (
        <section key={category} className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-black">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.filter(product => product.category === category).map((product) => (
              <div key={product.id} className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <img src={product.image} alt={product.name} className="w-full md:w-1/2 h-64 object-cover transition-transform duration-300 hover:scale-110" />
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-black mb-2">{product.name}</h2>
                    <p className="text-gray-800 mb-4">{product.description}</p>
                  </div>
                  <div className="text-lg font-semibold">
                    <span className="bg-yellow-300 px-4 py-2 rounded-lg text-black">${product.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ProductList;
