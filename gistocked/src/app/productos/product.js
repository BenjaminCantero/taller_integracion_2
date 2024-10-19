import React, { useState, useEffect } from 'react';
import Modal from './Modal'; // Asegúrate de que la ruta sea correcta

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', category: '', netPrice: '', iva: '', stock: '', image: '' });
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  // Fetch products on page load
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/productos/products');
        if (!res.ok) throw new Error('Error fetching products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.netPrice || !formData.stock) {
      alert('Por favor, completa los campos requeridos');
      return;
    }

    try {
      const method = isEditModalOpen ? 'PUT' : 'POST';
      const response = await fetch('/productos/products', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isEditModalOpen ? { ...formData, id: productToEdit.id } : formData),
      });
      if (!response.ok) throw new Error('Error en la solicitud');

      const updatedProduct = await response.json();

      if (isEditModalOpen) {
        setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
      } else {
        setProducts([...products, updatedProduct]);
      }

      setAddModalOpen(false);
      setEditModalOpen(false);
      setFormData({ name: '', category: '', netPrice: '', iva: '', stock: '', image: '' });
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
    }
  };

  const openAddModal = () => setAddModalOpen(true);

  const openEditModal = (product) => {
    setProductToEdit(product);
    setFormData(product);
    setEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch('/productos/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error('Error al eliminar el producto');

      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={openAddModal}>Agregar Producto</button>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio Neto</th>
            <th>IVA</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.netPrice}</td>
              <td>{product.iva}</td>
              <td>{product.stock}</td>
              <td>
                <button onClick={() => openEditModal(product)}>Editar</button>
                <button onClick={() => handleDelete(product.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para agregar productos */}
      {isAddModalOpen && (
        <Modal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Categoría"
              value={formData.category}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="netPrice"
              placeholder="Precio Neto"
              value={formData.netPrice}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="iva"
              placeholder="IVA"
              value={formData.iva}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="image"
              placeholder="URL de la imagen"
              value={formData.image}
              onChange={handleInputChange}
            />
            <button type="submit">Agregar Producto</button>
          </form>
        </Modal>
      )}

      {/* Modal para editar productos */}
      {isEditModalOpen && (
        <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Categoría"
              value={formData.category}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="netPrice"
              placeholder="Precio Neto"
              value={formData.netPrice}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="iva"
              placeholder="IVA"
              value={formData.iva}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="image"
              placeholder="URL de la imagen"
              value={formData.image}
              onChange={handleInputChange}
            />
            <button type="submit">Editar Producto</button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default ProductManager;
