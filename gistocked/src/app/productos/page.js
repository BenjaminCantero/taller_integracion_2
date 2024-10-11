import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    netPrice: '',
    iva: '',
    stock: ''
  });
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products'); // Consulta a la API
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
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
    const totalPrice = parseFloat(formData.netPrice) + (parseFloat(formData.netPrice) * parseFloat(formData.iva) / 100);

    try {
      await axios.post('/api/products', { ...formData, totalPrice });
      fetchProducts(); // Actualiza la lista después de agregar
      setModalOpen(false); // Cierra el modal
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      fetchProducts(); // Actualiza la lista
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="container">
      <h1>Gestión de Productos</h1>
      <button className="add-product-btn" onClick={() => setModalOpen(true)}>Agregar Producto</button>

      {/* Modal para agregar productos */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setModalOpen(false)}>&times;</span>
            <h2>Agregar Nuevo Producto</h2>
            <form onSubmit={handleSubmit} className="product-form">
              <label>Nombre del Producto</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />

              <label>Categoría</label>
              <input type="text" name="category" value={formData.category} onChange={handleInputChange} required />

              <label>Precio Neto</label>
              <input type="number" name="netPrice" value={formData.netPrice} onChange={handleInputChange} step="0.01" required />

              <label>IVA (%)</label>
              <input type="number" name="iva" value={formData.iva} onChange={handleInputChange} step="0.01" required />

              <label>Cantidad en Stock</label>
              <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} required />

              <button type="submit" className="submit-btn">Guardar</button>
            </form>
          </div>
        </div>
      )}

      {/* Tabla de productos */}
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Precio Neto</th>
            <th>IVA</th>
            <th>Precio Total</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.netPrice}</td>
              <td>{product.iva}</td>
              <td>{product.totalPrice}</td>
              <td>{product.stock}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(product.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManager;