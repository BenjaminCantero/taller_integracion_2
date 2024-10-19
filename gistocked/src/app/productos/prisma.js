import React from 'react';
import ProductManager from '../components/ProductManager';

const Page = ({ products }) => {
  return (
    <div>
      <ProductManager initialProducts={products} />
    </div>
  );
};

export async function getServerSideProps() {
  const products = await prisma.product.findMany();  // Asumiendo que tienes un modelo de "product" en tu esquema de Prisma
  return {
    props: {
      products,
    },
  };
}

export default Page;
