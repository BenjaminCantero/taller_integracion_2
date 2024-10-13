"use client"; // Asegúrate de que esto esté presente
import React, { useState, useEffect } from "react";
import axios from "axios";

const SalesManager = () => {
  const [sales, setSales] = useState([]);
  const [formData, setFormData] = useState({
    customerName: "",
    productId: "",
    quantity: "",
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // Mensajes de éxito/error

  useEffect(() => {
    fetchSales();
    fetchProducts();
  }, []);

  const fetchSales = async () => {
    setLoading(true); // Inicia el indicador de carga
    try {
      const response = await axios.get("/api/sales");
      setSales(response.data);
    } catch (error) {
      console.error("Error fetching sales:", error);
      setMessage("Error al obtener las ventas");
    } finally {
      setLoading(false); // Detiene el indicador de carga
    }
  };

  const fetchProducts = async () => {
    setLoading(true); // Inicia el indicador de carga
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setMessage("Error al obtener los productos");
    } finally {
      setLoading(false); // Detiene el indicador de carga
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
    setLoading(true); // Inicia el indicador de carga

    try {
      await axios.post("/api/sales", formData);
      fetchSales();
      setModalOpen(false);
      setFormData({ customerName: "", productId: "", quantity: "" });
      setMessage("Venta agregada con éxito");
    } catch (error) {
      console.error("Error adding sale:", error);
      setMessage("Error al agregar la venta");
    } finally {
      setLoading(false); // Detiene el indicador de carga
    }
  };

  const handleDelete = async (id) => {
    setLoading(true); // Inicia el indicador de carga
    try {
      await axios.delete(`/api/sales/${id}`);
      fetchSales();
      setMessage("Venta eliminada con éxito");
    } catch (error) {
      console.error("Error deleting sale:", error);
      setMessage("Error al eliminar la venta");
    } finally {
      setLoading(false); // Detiene el indicador de carga
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex-grow p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Gestión de Ventas</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => setModalOpen(true)}
        >
          Agregar Venta
        </button>

        {/* Mensaje de estado */}
        {message && (
          <div className="bg-yellow-200 text-yellow-800 p-2 rounded mb-4">
            {message}
          </div>
        )}

        {/* Modal para agregar ventas */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
              <span
                className="text-gray-600 cursor-pointer float-right text-xl"
                onClick={() => setModalOpen(false)}
                role="button"
                aria-label="Cerrar"
              >
                &times;
              </span>
              <h2 className="text-xl font-bold mb-4">Agregar Nueva Venta</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Nombre del Cliente</label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Producto</label>
                  <select
                    name="productId"
                    value={formData.productId}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  >
                    <option value="">Seleccione un producto</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium">Cantidad</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded w-full"
                  disabled={loading} // Deshabilita el botón mientras se carga
                >
                  {loading ? "Guardando..." : "Guardar"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Tabla de ventas */}
        <table className="min-w-full bg-white border mt-6">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Cliente</th>
              <th className="border px-4 py-2">Producto</th>
              <th className="border px-4 py-2">Cantidad</th>
              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td className="border px-4 py-2">{sale.id}</td>
                <td className="border px-4 py-2">{sale.customerName}</td>
                <td className="border px-4 py-2">{sale.productName}</td>
                <td className="border px-4 py-2">{sale.quantity}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(sale.id)}
                    disabled={loading} // Deshabilita el botón mientras se carga
                  >
                    {loading ? "Eliminando..." : "Eliminar"}
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

export default SalesManager;
