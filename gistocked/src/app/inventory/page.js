"use client";

import { useState } from "react";

export default function Home() {
  // Estado inicial de los productos
  const [products, setProducts] = useState([
    { name: "Leche", category: "Bebidas", quantity: 20, price: 1.50 },
    { name: "Pan", category: "Alimentos", quantity: 50, price: 0.50 },
  ]);

  // Estados para manejar el formulario de agregar/editar productos
  const [newProduct, setNewProduct] = useState({ name: "", category: "", quantity: "", price: "" });
  const [editingIndex, setEditingIndex] = useState(null);

  // Función para agregar o editar un producto
  const handleSubmit = (e) => {
    e.preventDefault();
    const productWithNumberPrice = {
      ...newProduct,
      quantity: Number(newProduct.quantity),
      price: Number(newProduct.price)
    };

    if (editingIndex === null) {
      setProducts([...products, productWithNumberPrice]); // Agregar nuevo producto
    } else {
      const updatedProducts = [...products];
      updatedProducts[editingIndex] = productWithNumberPrice; // Editar producto existente
      setProducts(updatedProducts);
      setEditingIndex(null);
    }
    setNewProduct({ name: "", category: "", quantity: "", price: "" }); // Limpiar formulario
  };

  // Función para eliminar un producto
  const deleteProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  // Función para cargar datos en el formulario para edición
  const editProduct = (index) => {
    setNewProduct({
      ...products[index],
      price: products[index].price.toString(),
      quantity: products[index].quantity.toString()
    });
    setEditingIndex(index);
  };

  return (
    <main className="flex flex-col min-h-screen items-center p-12 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center">Gestión de Stock</h1>

      <div className="w-full max-w-6xl grid grid-cols-2 gap-8">
        {/* Formulario de agregar/editar producto */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">{editingIndex === null ? "Agregar Producto" : "Editar Producto"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              placeholder="Nombre del Producto"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <select
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Seleccione Categoría</option>
              <option value="Alimentos">Alimentos</option>
              <option value="Bebidas">Bebidas</option>
            </select>
            <input
              type="number"
              value={newProduct.quantity}
              onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
              placeholder="Cantidad"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              placeholder="Precio"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              {editingIndex === null ? "Agregar Producto" : "Guardar Cambios"}
            </button>
          </form>
        </div>

        {/* Tabla de productos */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Listado de Productos</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-4 text-left">Producto</th>
                <th className="border p-4 text-left">Categoría</th>
                <th className="border p-4 text-left">Cantidad</th>
                <th className="border p-4 text-left">Precio</th>
                <th className="border p-4 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index} className="text-center even:bg-gray-100">
                  <td className="border p-4">{product.name}</td>
                  <td className="border p-4">{product.category}</td>
                  <td className="border p-4">{product.quantity}</td>
                  <td className="border p-4">${Number(product.price).toFixed(2)}</td>
                  <td className="border p-4 flex justify-center">
                    <button
                      onClick={() => editProduct(index)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-yellow-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteProduct(index)}
                      className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alerta de productos con bajo stock */}
      <div className="mt-8 w-full max-w-6xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Productos con Bajo Stock</h2>
        <ul className="list-disc pl-6">
          {products
            .filter((product) => product.quantity < 10)
            .map((product, index) => (
              <li key={index} className="mb-2">
                {product.name} - Cantidad: {product.quantity}
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
}