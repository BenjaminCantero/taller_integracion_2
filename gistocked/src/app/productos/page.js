"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    netPrice: "",
    iva: "",
    stock: "",
  });
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products"); // Consulta a la API
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalPrice =
      parseFloat(formData.netPrice) +
      (parseFloat(formData.netPrice) * parseFloat(formData.iva)) / 100;

    try {
      await axios.post("/api/products", { ...formData, totalPrice });
      fetchProducts(); // Actualiza la lista después de agregar
      setModalOpen(false); // Cierra el modal
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      fetchProducts(); // Actualiza la lista
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex-grow p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => setModalOpen(true)}
        >
          Agregar Producto
        </button>

        {/* Modal para agregar productos */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
              <span
                className="text-gray-600 cursor-pointer float-right text-xl"
                onClick={() => setModalOpen(false)}
              >
                &times;
              </span>
              <h2 className="text-xl font-bold mb-4">Agregar Nuevo Producto</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Nombre del Producto</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Categoría</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Precio Neto</label>
                  <input
                    type="number"
                    name="netPrice"
                    value={formData.netPrice}
                    onChange={handleInputChange}
                    step="0.01"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">IVA (%)</label>
                  <input
                    type="number"
                    name="iva"
                    value={formData.iva}
                    onChange={handleInputChange}
                    step="0.01"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Cantidad en Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded w-full"
                >
                  Guardar
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Tabla de productos */}
        <table className="min-w-full bg-white border mt-6">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Producto</th>
              <th className="border px-4 py-2">Categoría</th>
              <th className="border px-4 py-2">Precio Neto</th>
              <th className="border px-4 py-2">IVA</th>
              <th className="border px-4 py-2">Precio Total</th>
              <th className="border px-4 py-2">Stock</th>
              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border px-4 py-2">{product.id}</td>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{product.category}</td>
                <td className="border px-4 py-2">{product.netPrice}</td>
                <td className="border px-4 py-2">{product.iva}</td>
                <td className="border px-4 py-2">{product.totalPrice}</td>
                <td className="border px-4 py-2">{product.stock}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(product.id)}
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
  );
};

export default ProductManager;
