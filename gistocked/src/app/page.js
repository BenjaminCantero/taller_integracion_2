"use client";

import { useState } from 'react';

export default function Home() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className='min-h-screen grid grid-cols-6'>
      <div className='bg-green-300 col-span-1'>Hola1</div>
      <div className='bg-blue-400 col-span-5'>Hola2</div>
    </div>
  );
}
