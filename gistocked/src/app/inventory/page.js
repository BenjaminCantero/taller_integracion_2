"use client";

import { useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([
    { name: "Guantes de Látex", category: "Protección", quantity: 100, price: 5.0 },
    { name: "Mascarillas N95", category: "Protección", quantity: 200, price: 1.2 },
  ]);

  const [newProduct, setNewProduct] = useState({ name: "", category: "", quantity: "", price: "" });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const productWithNumberPrice = {
      ...newProduct,
      quantity: Number(newProduct.quantity),
      price: Number(newProduct.price),
    };

    if (editingIndex === null) {
      setProducts([...products, productWithNumberPrice]);
    } else {
      const updatedProducts = [...products];
      updatedProducts[editingIndex] = productWithNumberPrice;
      setProducts(updatedProducts);
      setEditingIndex(null);
    }
    setNewProduct({ name: "", category: "", quantity: "", price: "" });
  };

  const deleteProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const editProduct = (index) => {
    setNewProduct({
      ...products[index],
      price: products[index].price.toString(),
      quantity: products[index].quantity.toString(),
    });
    setEditingIndex(index);
  };

  return (
    <main className="flex flex-col min-h-screen items-center p-12 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-black text-center">Gestión de Insumos Médicos</h1>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Formulario de agregar/editar producto */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-black">
            {editingIndex === null ? "Agregar Insumo Médico" : "Editar Insumo Médico"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              placeholder="Nombre del Insumo"
              className="w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <select
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Seleccione Categoría</option>
              <option value="Protección">Protección</option>
              <option value="Desinfección">Desinfección</option>
              <option value="Instrumental Médico">Instrumental Médico</option>
              <option value="Mobiliario Médico">Mobiliario Médico</option>
            </select>
            <input
              type="number"
              value={newProduct.quantity}
              onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
              placeholder="Cantidad"
              className="w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              placeholder="Precio"
              className="w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              {editingIndex === null ? "Agregar Insumo" : "Guardar Cambios"}
            </button>
          </form>
        </div>

        {/* Tabla de productos */}
        <div className="bg-white p-6 rounded-lg shadow-lg overflow-hidden">
          <h2 className="text-2xl font-semibold mb-4 text-black">Listado de Insumos Médicos</h2>
          <div className="max-h-64 overflow-y-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-4 text-left text-black">Insumo</th>
                  <th className="border p-4 text-left text-black">Categoría</th>
                  <th className="border p-4 text-left text-black">Cantidad</th>
                  <th className="border p-4 text-left text-black">Precio</th>
                  <th className="border p-4 text-left text-black">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index} className="text-center even:bg-gray-100">
                    <td className="border p-4 text-black">{product.name}</td>
                    <td className="border p-4 text-black">{product.category}</td>
                    <td className="border p-4 text-black">{product.quantity}</td>
                    <td className="border p-4 text-black">${Number(product.price).toFixed(2)}</td>
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
      </div>

      {/* Alerta de productos con bajo stock */}
      <div className="mt-8 w-full max-w-6xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-black">Insumos con Bajo Stock</h2>
        <ul className="list-disc pl-6 text-black">
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
