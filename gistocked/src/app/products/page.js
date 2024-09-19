import React from 'react';

const products = [
  // Termometría
  { id: 1, name: 'Termómetro Digital', price: 15000, description: 'Termómetro digital de alta precisión.', image: '/termometro.jpg', category: 'Termometría' },
  { id: 2, name: 'Termómetro Infrarrojo', price: 25000, description: 'Termómetro infrarrojo sin contacto.', image: '/termometro-infrarrojo.jpg', category: 'Termometría' },
  { id: 3, name: 'Termómetro Clínico', price: 12000, description: 'Termómetro clínico con sonda digital.', image: '/termometro-clinico.jpg', category: 'Termometría' },

  // Protección Personal
  { id: 4, name: 'Mascarillas N95', price: 5000, description: 'Mascarillas N95 de alta calidad para protección respiratoria.', image: '/mascarillas.jpg', category: 'Protección Personal' },
  { id: 5, name: 'Guantes de Latex', price: 6000, description: 'Guantes de latex para procedimientos médicos.', image: '/guantes.jpg', category: 'Protección Personal' },
  { id: 6, name: 'Protector Facial', price: 12000, description: 'Protector facial de acrílico para protección completa.', image: '/protector-facial.jpg', category: 'Protección Personal' },

  // Higiene
  { id: 7, name: 'Desinfectante de Manos', price: 8000, description: 'Desinfectante de manos con 70% de alcohol.', image: '/desinfectante.jpg', category: 'Higiene' },
  { id: 8, name: 'Jabón Antibacterial', price: 4500, description: 'Jabón antibacterial en barra.', image: '/jabón-antibacterial.jpg', category: 'Higiene' },
  { id: 9, name: 'Toallas Desechables', price: 3500, description: 'Toallas desechables para uso médico.', image: '/toallas-desechables.jpg', category: 'Higiene' },

  // Monitoreo
  { id: 10, name: 'Tensiómetro', price: 25000, description: 'Tensiómetro digital para medir la presión arterial.', image: '/tensiometro.jpg', category: 'Monitoreo' },
  { id: 11, name: 'Oxímetro de Pulso', price: 22000, description: 'Oxímetro de pulso para medir oxígeno en sangre.', image: '/oxímetro.jpg', category: 'Monitoreo' },
  { id: 12, name: 'Glucómetro', price: 18000, description: 'Glucómetro para medición de glucosa en sangre.', image: '/glucometro.jpg', category: 'Monitoreo' },

  // Primeros Auxilios
  { id: 13, name: 'Venda Elástica', price: 3500, description: 'Venda elástica para soporte y compresión.', image: '/venda.jpg', category: 'Primeros Auxilios' },
  { id: 14, name: 'Kit de Primeros Auxilios', price: 30000, description: 'Kit completo de primeros auxilios con diversos suministros.', image: '/kit-primeros-auxilios.jpg', category: 'Primeros Auxilios' },
  { id: 15, name: 'Alcohol en Gel', price: 5000, description: 'Alcohol en gel para desinfección de manos.', image: '/alcohol-gel.jpg', category: 'Primeros Auxilios' },
];

const categories = Array.from(new Set(products.map(product => product.category)));

const ProductList = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-black"></h1>
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
                    <span className="bg-yellow-300 px-4 py-2 rounded-lg text-black">${product.price.toLocaleString('es-CL')}</span>
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
