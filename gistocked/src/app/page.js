"use client";

import { useState } from "react";
import "./style.css";

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