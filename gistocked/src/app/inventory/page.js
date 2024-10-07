"use client";
import { useState, useEffect } from "react";
import "./inv_stile.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // Estado para almacenar las categorías
  const [newProduct, setNewProduct] = useState({ name: "", category: "", quantity: "", price: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  // Estados para los filtros de búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Función de búsqueda con filtros (nombre, categoría, rango de precios)
  const handleSearch = async () => {
    try {
      const query = new URLSearchParams({
        name: searchTerm,
        category: searchCategory,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
      });

      const response = await fetch(`/api/inventory/search?${query}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const products = await response.json();
      setProducts(products);
    } catch (error) {
      console.error("Error al buscar productos:", error);
    }
  };

  // Obtener productos y categorías al montar el componente
  useEffect(() => {
    async function fetchProducts() {
      try {
        const productResponse = await fetch('/api/inventory');
        if (!productResponse.ok) {
          throw new Error(`Error: ${productResponse.status}`);
        }
        const products = await productResponse.json();
        setProducts(products);

        // Obtener categorías dinámicamente (si tienes una API para eso)
        const categoryResponse = await fetch('/api/inventory/categories'); // Cambia esto si tienes una ruta específica para categorías
        if (!categoryResponse.ok) {
          throw new Error(`Error: ${categoryResponse.status}`);
        }
        const categories = await categoryResponse.json();
        setCategories(categories); // Guardar las categorías en el estado
      } catch (error) {
        console.error("Error al obtener los productos o categorías:", error);
      }
    }

    fetchProducts();
  }, []);

  // Función para agregar o editar un producto
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
        const response = await fetch('/api/inventory', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productWithNumberValues),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
      } else {
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

      const refreshResponse = await fetch('/api/inventory');
      const data = await refreshResponse.json();
      setProducts(data);

      setNewProduct({ name: "", category: "", quantity: "", price: "" });
    } catch (error) {
      console.error("Error al agregar/editar producto:", error);
    }
  };

  // Función para eliminar un producto
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

  // Función para cargar datos en el formulario para edición
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
    <main className="flex flex-col min-h-screen items-center p-12 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center">Gestión de Stock</h1>

      {/* Formulario de búsqueda */}
      <div className="w-full max-w-6xl mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar producto por nombre"
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <select
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mt-2"
        >
          <option value="">Seleccione Categoría</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        {/* Rango de precios */}
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="Precio Mínimo"
          className="w-full p-3 border border-gray-300 rounded-lg mt-2"
          min="0"
        />
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Precio Máximo"
          className="w-full p-3 border border-gray-300 rounded-lg mt-2"
          min="0"
        />
        <button
          onClick={handleSearch}
          className="w-full mt-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>

      {/* Listado de productos */}
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
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={newProduct.quantity}
              onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
              placeholder="Cantidad"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
              required
            />
            <input
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              placeholder="Precio"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0.01"
              step="0.01"
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
              {currentProducts.map((product, index) => (
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
      </div>

      {/* Alerta de productos con bajo stock */}
      <div className="mt-8 w-full max-w-6xl bg-yellow-200 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Alerta: Productos con bajo stock (menos de 10 unidades)</h2>
        <ul className="list-disc list-inside">
          {products
            .filter((product) => product.quantity < 10)
            .map((product, index) => (
              <li key={index}>
                {product.name} - {product.quantity} unidades restantes
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
}
