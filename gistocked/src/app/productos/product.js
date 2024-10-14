'use client';
import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, ChevronDown, ChevronUp } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './alert';

const ProductManager = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Producto 1', category: 'Categoría 1', netPrice: 100, iva: 19, totalPrice: 119, stock: 10, image: '' },
    { id: 2, name: 'Producto 2', category: 'Categoría 2', netPrice: 200, iva: 19, totalPrice: 238, stock: 5, image: '' },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    netPrice: '',
    iva: '',
    stock: '',
    image: ''
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [selectedCategory, setSelectedCategory] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, productId: null });
  const [previewImage, setPreviewImage] = useState('');

  const categories = [...new Set(products.map(product => product.category))];

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
        setPreviewImage(reader.result);
      };
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
      const updatedProducts = products.map(product =>
        product.id === currentProductId ? { ...product, ...formData, totalPrice } : product
      );
      setProducts(updatedProducts);
    } else {
      const newProduct = {
        id: products.length + 1,
        ...formData,
        totalPrice
      };
      setProducts([...products, newProduct]);
    }

    setModalOpen(false);
    setIsEditing(false);
    setFormData({ name: '', category: '', netPrice: '', iva: '', stock: '', image: '' });
    setPreviewImage('');
  };

  const handleDelete = (id) => {
    setDeleteConfirmation({ isOpen: true, productId: id });
  };

  const confirmDelete = () => {
    const updatedProducts = products.filter(product => product.id !== deleteConfirmation.productId);
    setProducts(updatedProducts);
    setDeleteConfirmation({ isOpen: false, productId: null });
  };

  const handleEdit = (product) => {
    setFormData(product);
    setCurrentProductId(product.id);
    setIsEditing(true);
    setModalOpen(true);
    setPreviewImage(product.image);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === '' || product.category === selectedCategory)
  );

  const sortedProducts = React.useMemo(() => {
    let sortableProducts = [...filteredProducts];
    if (sortConfig.key !== null) {
      sortableProducts.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProducts;
  }, [filteredProducts, sortConfig]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Gestión de Productos</h1>
      <div className="mb-6 flex justify-between items-center">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => { setModalOpen(true); setIsEditing(false); }}
        >
          Agregar Nuevo Producto
        </button>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Buscar Producto..."
            className="p-2 rounded border border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-2 rounded border border-gray-300"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              {['ID', 'Producto', 'Categoría', 'Precio Neto', 'IVA', 'Precio Total', 'Stock', 'Imagen', 'Acciones'].map((header, index) => (
                <th key={index} className="py-2 px-4 border-b cursor-pointer" onClick={() => requestSort(header.toLowerCase())}>
                  <div className="flex items-center justify-between">
                    {header}
                    {sortConfig.key === header.toLowerCase() && (
                      sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map(product => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{product.id}</td>
                <td className="py-2 px-4 border-b">{product.name}</td>
                <td className="py-2 px-4 border-b">{product.category}</td>
                <td className="py-2 px-4 border-b">{product.netPrice}</td>
                <td className="py-2 px-4 border-b">{product.iva}</td>
                <td className="py-2 px-4 border-b">{product.totalPrice}</td>
                <td className="py-2 px-4 border-b">{product.stock}</td>
                <td className="py-2 px-4 border-b">
                  {product.image && <img src={product.image} alt={product.name} className="w-12 h-12 object-cover" />}
                </td>
                <td className="py-2 px-4 border-b">
                  <button onClick={() => handleEdit(product)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center">
        {Array.from({ length: Math.ceil(sortedProducts.length / itemsPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`py-2 px-4 mx-1 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modal para agregar/editar producto */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Editar Producto' : 'Agregar Producto'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Nombre del Producto</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Categoría</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Precio Neto</label>
                <input
                  type="number"
                  name="netPrice"
                  value={formData.netPrice}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">IVA (%)</label>
                <input
                  type="number"
                  name="iva"
                  value={formData.iva}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Imagen</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {previewImage && (
                  <img src={previewImage} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded" />
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  {isEditing ? 'Actualizar' : 'Agregar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmación para eliminar */}
      {deleteConfirmation.isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
            <h2 className="text-2xl font-bold mb-4">Eliminar Producto</h2>
            <p>¿Estás seguro de que quieres eliminar este producto?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setDeleteConfirmation({ isOpen: false, productId: null })}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManager;
