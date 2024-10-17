import React, { useState, useEffect } from 'react';
import '../globals.css';  // Asegúrate de que la ruta del CSS sea correcta

const ProductManager = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Producto 1', category: 'Categoría 1', netPrice: 100, iva: 19, totalPrice: 119, stock: 10, image: '' },
    { id: 2, name: 'Producto 2', category: 'Categoría 2', netPrice: 200, iva: 19, totalPrice: 238, stock: 5, image: '' }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    netPrice: '',
    iva: '',
    stock: '',
    image: ''
  });
  const [isModalOpen, setModalOpen] = useState(false);  // Controla el estado del modal
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);  // Nuevo estado para controlar si estamos editando
  const [currentProductId, setCurrentProductId] = useState(null);  // ID del producto que estamos editando

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });  // Guarda la imagen en base64
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const calculateTotalPrice = () => {
    const netPrice = parseFloat(formData.netPrice) || 0;
    const iva = parseFloat(formData.iva) || 0;
    return (netPrice + (netPrice * iva / 100)).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalPrice = calculateTotalPrice();

    if (isEditing) {
      // Si estamos editando, actualizamos el producto existente
      const updatedProducts = products.map(product =>
        product.id === currentProductId ? { ...product, ...formData, totalPrice } : product
      );
      setProducts(updatedProducts);
    } else {
      // Si no estamos editando, creamos un nuevo producto
      const newProduct = {
        id: products.length + 1,
        ...formData,
        totalPrice
      };
      setProducts([...products, newProduct]);  // Agrega el nuevo producto
    }

    setModalOpen(false);  // Cierra el modal después de agregar/editar el producto
    setIsEditing(false);  // Resetea el estado de edición
    setFormData({ name: '', category: '', netPrice: '', iva: '', stock: '', image: '' });  // Limpia el formulario
  };

  const handleDelete = (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);  // Elimina el producto
  };

  const handleEdit = (product) => {
    setFormData(product);
    setCurrentProductId(product.id);
    setIsEditing(true);  // Cambia a modo edición
    setModalOpen(true);  // Abre el modal
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <img src="/logo.png" alt="Logo" width="50" height="50" />
          <span>Gistocked</span>
        </div>
        <nav>
          <ul>
            <li><a href="#"><i className="fas fa-tachometer-alt"></i> Dashboard</a></li>
            <li><a href="#" className="active"><i className="fas fa-boxes"></i> Productos</a></li>
          </ul>
        </nav>
        <div className="user-info">
          <p>Bienvenido, Admin</p>
          <button className="logout-btn"><i className="fas fa-sign-out-alt"></i> Cerrar Sesión</button>
        </div>
      </div>

      {/* Contenido Principal */}
      <main>
        <h1>Gestión de Productos</h1>
        <button className="add-product-btn" onClick={() => { setModalOpen(true); setIsEditing(false); }}>
          <i className="fas fa-box-open"></i> Agregar Producto
        </button>

        {isModalOpen && (
          <div className="modal" style={{ display: isModalOpen ? 'block' : 'none' }}>
            <div className="modal-content">
              <span className="close-btn" onClick={() => setModalOpen(false)}>&times;</span>
              <h2>{isEditing ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
              <form onSubmit={handleSubmit} className="product-form">
                <label>Nombre del Producto</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />

                <label>Categoría</label>
                <input type="text" name="category" value={formData.category} onChange={handleInputChange} required />

                <label>Precio Neto</label>
                <input type="number" name="netPrice" value={formData.netPrice} onChange={handleInputChange} required />

                <label>IVA (%)</label>
                <input type="number" name="iva" value={formData.iva} onChange={handleInputChange} required />

                <label>Precio Total</label>
                <input type="text" value={calculateTotalPrice()} readOnly />

                <label>Cantidad en Stock</label>
                <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} required />

                <label>Imagen del Producto</label>
                <input type="file" name="image" onChange={handleImageChange} />

                <button type="submit" className="submit-btn">{isEditing ? 'Actualizar' : 'Guardar'}</button>
              </form>
            </div>
          </div>
        )}

        {/* Barra de búsqueda */}
        <input
          type="text"
          placeholder="Buscar Producto..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

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
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.netPrice}</td>
                <td>{product.iva}</td>
                <td>{product.totalPrice}</td>
                <td>{product.stock}</td>
                <td><img src={product.image} alt={product.name} width="50" height="50" /></td>
                <td>
                  <button onClick={() => handleEdit(product)} className="edit-btn">
                    <i className="fas fa-edit"></i> Editar
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="delete-btn">
                    <i className="fas fa-trash"></i> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default ProductManager;
