"use client";

import { useState, useEffect } from "react";
import "./style.css";

export default function Home() {
  // Estado para manejar los productos desde la base de datos
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", category: "", quantity: "", price: "" });
  const [editingIndex, setEditingIndex] = useState(null);

  // Función para obtener productos desde la API
  const fetchProducts = async () => {
    const response = await fetch('http://localhost:3000/productos');
    const data = await response.json();
    setProducts(data);
  };

  // Cargar productos al montar el componente
  useEffect(() => {
    fetchProducts();
  }, []);

  // Función para agregar o editar un producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    const productWithNumberPrice = {
      ...newProduct,
      quantity: Number(newProduct.quantity),
      price: Number(newProduct.price),
    };

    if (editingIndex === null) {
      // Agregar nuevo producto (POST)
      await fetch('http://localhost:3000/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productWithNumberPrice),
      });
    } else {
      // Editar producto existente (PUT)
      const productId = products[editingIndex].id;
      await fetch(`http://localhost:3000/productos/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productWithNumberPrice),
      });
      setEditingIndex(null);
    }

    setNewProduct({ name: "", category: "", quantity: "", price: "" }); // Limpiar formulario
    fetchProducts(); // Recargar productos después de agregar o editar
  };

  // Función para eliminar un producto
  const deleteProduct = async (index) => {
    const productId = products[index].id;
    await fetch(`http://localhost:3000/productos/${productId}`, {
      method: 'DELETE',
    });
    fetchProducts(); // Recargar productos después de eliminar
  };

  // Función para cargar datos en el formulario para edición
  const editProduct = (index) => {
    setNewProduct({
      ...products[index],
      price: products[index].price.toString(),
      quantity: products[index].quantity.toString(),
    });
    setEditingIndex(index);
  };

  return (
    <main>
      <h1>Gestión de Stock</h1>

      {/* Filtro */}
      <div className="filter-container">
        <input type="text" className="filter-input" placeholder="Buscar producto..." />
        <button className="filter-button">Filtrar</button>
      </div>

      {/* Formulario de agregar/editar producto */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          placeholder="Nombre del Producto"
          required
        />
        <select
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
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
          required
        />
        <input
          type="number"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          placeholder="Precio"
          required
        />
        <button type="submit">{editingIndex === null ? "Agregar Producto" : "Guardar Cambios"}</button>
      </form>

      {/* Tabla de productos */}
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.quantity}</td>
              <td>${Number(product.price).toFixed(2)}</td>
              <td>
                <button onClick={() => editProduct(index)}>Editar</button>
                <button onClick={() => deleteProduct(index)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Alerta de productos con bajo stock */}
      <div className="stock-alert">
        <h2>Productos con Bajo Stock</h2>
        <ul>
          {products
            .filter((product) => product.quantity < 10)
            .map((product, index) => (
              <li key={index}>
                {product.name} - Cantidad: {product.quantity}
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
}
