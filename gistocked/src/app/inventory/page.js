"use client";
import { useState, useEffect } from "react";

// Componente React (front-end)
export default function Home() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", category: "", quantity: "", price: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/inventory'); // Asegúrate de que la ruta es correcta.
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const products = await response.json();
        setProducts(products); // Actualizar el estado con los productos obtenidos
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    }

    fetchProducts(); // Invocar la función
  }, []); // Se ejecuta cuando el componente se monta

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newProduct.name || !newProduct.category || isNaN(newProduct.quantity) || isNaN(newProduct.price)) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    const productWithNumberValues = {
      ...newProduct,
      quantity: Number(newProduct.quantity),
      price: Number(newProduct.price),
    };

    try {
      if (editingIndex === null) {
        // Agregar un nuevo producto
        const response = await fetch('/api/inventory', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productWithNumberValues),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
      } else {
        // Editar un producto existente
        const response = await fetch(`/api/inventory/${products[editingIndex].id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productWithNumberValues),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        setEditingIndex(null);
      }

      // Refresca los productos desde la base de datos
      const refreshResponse = await fetch('/api/inventory');
      const data = await refreshResponse.json();
      setProducts(data);

      setNewProduct({ name: "", category: "", quantity: "", price: "" });
    } catch (error) {
      console.error("Error al agregar/editar producto:", error);
    }
  };

  const deleteProduct = async (index) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      try {
        const response = await fetch(`/api/inventory/${products[index].id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const refreshResponse = await fetch('/api/inventory');
        const data = await refreshResponse.json();
        setProducts(data);
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    }
  };

  const editProduct = (index) => {
    setNewProduct({
      ...products[index],
      quantity: products[index].quantity.toString(),
      price: products[index].price.toString(),
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
    <main className="flex flex-col min-h-screen items-center p-12 bg-gray-50 text-gray-900">
      <h1 className="text-4xl font-bold mb-8 text-center">Gestión de Stock</h1>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
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
              min="1" // Mínimo valor aceptado
              required
            />
            <input
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              placeholder="Precio"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0.01" // Mínimo valor aceptado
              step="0.01" // Incrementos de centavos
              required
            />
            <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
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
                <th className="border p-4 text-left text-black">Producto</th>
                <th className="border p-4 text-left text-black">Categoría</th>
                <th className="border p-4 text-left text-black">Cantidad</th>
                <th className="border p-4 text-left text-black">Precio</th>
                <th className="border p-4 text-left text-black">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => (
                <tr key={index} className="text-center even:bg-gray-100">
                  <td className="border p-4 text-black">{product.name}</td>
                  <td className="border p-4 text-black">{product.category}</td>
                  <td className="border p-4 text-black">{product.quantity}</td>
                  <td className="border p-4 text-black">${Number(product.price).toFixed(2)}</td>
                  <td className="border p-4 flex justify-center space-x-2">
                    <button
                      onClick={() => editProduct(index)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition duration-200"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteProduct(index)}
                      className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition duration-200"
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
                className={`px-4 py-2 rounded ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Alerta de productos con bajo stock */}
      <div className="mt-8 w-full max-w-6xl bg-yellow-200 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Alerta: Productos con bajo stock (menos de 10 unidades)</h2>
        <ul className="list-disc list-inside">
          {products
            .filter((product) => product.quantity < 10)
            .map((product, index) => (
              <li key={index} className="text-black">
                {product.name} - {product.quantity} unidades restantes
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
}
