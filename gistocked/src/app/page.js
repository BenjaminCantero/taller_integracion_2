<<<<<<< HEAD
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.js</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
=======
"use client";

import { useState, useEffect } from "react";
import "./style.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ id: "", name: "", provider: "", type: "", stock: "", orders: "", value: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    if (storedProducts) {
      setProducts(storedProducts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación de campos
    if (!newProduct.name || !newProduct.provider || !newProduct.type || isNaN(newProduct.stock) || isNaN(newProduct.orders) || isNaN(newProduct.value)) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    const productWithNumberValues = {
      ...newProduct,
      stock: Number(newProduct.stock),
      orders: Number(newProduct.orders),
      value: Number(newProduct.value),
    };

    if (editingIndex === null) {
      setProducts([...products, productWithNumberValues]);
    } else {
      const updatedProducts = [...products];
      updatedProducts[editingIndex] = productWithNumberValues;
      setProducts(updatedProducts);
      setEditingIndex(null);
    }

    setNewProduct({ id: "", name: "", provider: "", type: "", stock: "", orders: "", value: "" });
  };

  const deleteProduct = (index) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      setProducts(products.filter((_, i) => i !== index));
    }
  };

  const editProduct = (index) => {
    setNewProduct({
      ...products[index],
      stock: products[index].stock.toString(),
      orders: products[index].orders.toString(),
      value: products[index].value.toString(),
    });
    setEditingIndex(index);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <h1 className="text-3xl font-bold mb-6">Gestión de Stock</h1>

      {/* Formulario de agregar/editar producto */}
      <div className="mb-8 w-full max-w-md">
        <h2 className="text-xl mb-4">{editingIndex === null ? "Agregar Producto" : "Editar Producto"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            placeholder="Nombre del Producto"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            value={newProduct.provider}
            onChange={(e) => setNewProduct({ ...newProduct, provider: e.target.value })}
            placeholder="Proveedor"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <select
            value={newProduct.type}
            onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Seleccione Tipo</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Bebidas">Bebidas</option>
          </select>
          <input
            type="number"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            placeholder="Stock actual"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="number"
            value={newProduct.orders}
            onChange={(e) => setNewProduct({ ...newProduct, orders: e.target.value })}
            placeholder="Encargos"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="number"
            value={newProduct.value}
            onChange={(e) => setNewProduct({ ...newProduct, value: e.target.value })}
            placeholder="Valor"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
            {editingIndex === null ? "Agregar Producto" : "Guardar Cambios"}
          </button>
        </form>
      </div>

      {/* Tabla de productos */}
      <div className="w-full max-w-5xl">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Producto</th>
              <th className="border p-2">Proveedor</th>
              <th className="border p-2">Tipo</th>
              <th className="border p-2">Stock</th>
              <th className="border p-2">Encargos</th>
              <th className="border p-2">Valor</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{product.id}</td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">{product.provider}</td>
                <td className="border p-2">{product.type}</td>
                <td className="border p-2">{product.stock}</td>
                <td className="border p-2">{product.orders}</td>
                <td className="border p-2">${Number(product.value).toFixed(2)}</td>
                <td className="border p-2">
                  <button
                    onClick={() => editProduct(index)}
                    className="bg-yellow-500 text-white p-1 rounded mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteProduct(index)}
                    className="bg-red-600 text-white p-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginación */}
        <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
>>>>>>> 6e10c59 (Descripcion)
    </main>
  );
}
