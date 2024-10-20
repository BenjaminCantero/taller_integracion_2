
'use client';  // Esto indica que este archivo es un Client Component
import React from 'react';
import ProductManager from './product'; // Asegúrate de que la ruta sea correcta

const Page = () => {
  return (
    <div>
      <ProductManager />
    </div>
  );
};

export default Page;