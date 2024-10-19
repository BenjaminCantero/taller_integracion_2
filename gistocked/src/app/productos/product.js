import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import { Edit2, Trash2, Download } from 'react-feather';
import Modal from './modal'; // Importamos el componente Modal

const ProductManager = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Teclado Mecánico Corsair K95', category: 'Teclados', netPrice: 150, iva: 19, totalPrice: 178.5, stock: 15, image: '' },
    { id: 2, name: 'Teclado Razer Huntsman Elite', category: 'Teclados', netPrice: 160, iva: 19, totalPrice: 190.4, stock: 10, image: '' },
    { id: 3, name: 'Mouse Logitech G502', category: 'Mouses', netPrice: 80, iva: 19, totalPrice: 95.2, stock: 25, image: '' },
    { id: 4, name: 'Mouse Razer DeathAdder V2', category: 'Mouses', netPrice: 70, iva: 19, totalPrice: 83.3, stock: 20, image: '' },
    { id: 5, name: 'Monitor Asus ROG 27"', category: 'Monitores', netPrice: 400, iva: 19, totalPrice: 476, stock: 10, image: '' },
    { id: 6, name: 'Monitor Acer Predator 24"', category: 'Monitores', netPrice: 300, iva: 19, totalPrice: 357, stock: 8, image: '' },
    { id: 7, name: 'Auriculares HyperX Cloud II', category: 'Auriculares', netPrice: 120, iva: 19, totalPrice: 142.8, stock: 30, image: '' },
    { id: 8, name: 'Auriculares Razer BlackShark V2', category: 'Auriculares', netPrice: 130, iva: 19, totalPrice: 154.7, stock: 15, image: '' },
    { id: 9, name: 'Silla Gaming Secretlab Titan', category: 'Sillas', netPrice: 350, iva: 19, totalPrice: 416.5, stock: 5, image: '' },
    { id: 10, name: 'Silla Gaming DXRacer', category: 'Sillas', netPrice: 300, iva: 19, totalPrice: 357, stock: 10, image: '' },
    { id: 11, name: 'Tarjeta Gráfica RTX 3080', category: 'Tarjetas Gráficas', netPrice: 800, iva: 19, totalPrice: 952, stock: 8, image: '' },
    { id: 12, name: 'Tarjeta Gráfica AMD Radeon RX 6800', category: 'Tarjetas Gráficas', netPrice: 700, iva: 19, totalPrice: 833, stock: 10, image: '' },
    { id: 13, name: 'Procesador AMD Ryzen 9 5900X', category: 'Procesadores', netPrice: 450, iva: 19, totalPrice: 535.5, stock: 12, image: '' },
    { id: 14, name: 'Procesador Intel Core i9-11900K', category: 'Procesadores', netPrice: 500, iva: 19, totalPrice: 595, stock: 7, image: '' },
    { id: 15, name: 'Placa Madre ASUS ROG Strix B550', category: 'Placas Madre', netPrice: 250, iva: 19, totalPrice: 297.5, stock: 20, image: '' },
    { id: 16, name: 'Placa Madre MSI MAG B550M', category: 'Placas Madre', netPrice: 200, iva: 19, totalPrice: 238, stock: 15, image: '' }
  ]);

  const [formData, setFormData] = useState({ name: '', category: '', netPrice: '', iva: '', stock: '', image: '' });
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, productId: null });
  const [previewImage, setPreviewImage] = useState('');

  // Función para manejar el cambio en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Función para manejar la carga de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Función para agregar o editar un producto
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditModalOpen) {
      setProducts(products.map((product) => (product.id === formData.id ? formData : product)));
    } else {
      setProducts([...products, { ...formData, id: Date.now() }]); // Usar un timestamp como ID
    }
    setAddModalOpen(false);
    setEditModalOpen(false);
    setFormData({ name: '', category: '', netPrice: '', iva: '', stock: '', image: '' });
    setPreviewImage('');
  };

  // Función para abrir el modal para agregar un producto
  const openAddModal = () => {
    setAddModalOpen(true);
  };

  // Función para abrir el modal para editar un producto
  const openEditModal = (product) => {
    setProductToEdit(product);
    setEditModalOpen(true);
  };

  // Función para abrir la confirmación de eliminación
  const handleDelete = (id) => {
    setDeleteConfirmation({ isOpen: true, productId: id });
  };

  // Confirmar la eliminación de un producto
  const confirmDelete = () => {
    setProducts(products.filter((product) => product.id !== deleteConfirmation.productId));
    setDeleteConfirmation({ isOpen: false, productId: null });
  };

  // Filtrar productos según el término de búsqueda
  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

  // Calcular productos a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>

      {/* Buscador y botón para agregar productos */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-2 flex-grow mr-2"
        />
        <button onClick={openAddModal} className="bg-green-500 text-white p -2 rounded-lg hover:bg-green-700">
          Agregar Producto
        </button>
      </div>

      {/* Tabla de productos */}
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="bg-gray-200 p-2">Nombre</th>
            <th className="bg-gray-200 p-2">Categoría</th>
            <th className="bg-gray-200 p-2">Precio Neto</th>
            <th className="bg-gray-200 p-2">IVA</th>
            <th className="bg-gray-200 p-2">Stock</th>
            <th className="bg-gray-200 p-2">Imagen</th>
            <th className="bg-gray-200 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((product) => (
            <tr key={product.id}>
              <td className="p-2">{product.name}</td>
              <td className="p-2">{product.category}</td>
              <td className="p-2">{product.netPrice}</td>
              <td className="p-2">{product.iva}</td>
              <td className="p-2">{product.stock}</td>
              <td className="p-2">
                <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg" />
              </td>
              <td className="p-2">
                <button onClick={() => openEditModal(product)} className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-700">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300"
        >
          Anterior
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage >= Math.ceil(filteredProducts.length / itemsPerPage)}
          className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300"
        >
          Siguiente
        </button>
      </div>

      {/* Modal para agregar productos */}
      <Modal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)}>
        <h2 className="text-lg font-bold mb-2">Agregar Producto</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            <span className="text-gray-700">Nombre:</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-700">Categoría:</span>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-700">Precio Neto:</span>
            <input
              type="number"
              name="netPrice"
              value={formData.netPrice}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-700">IVA:</span>
            <input
              type="number"
              name="iva"
              value={formData.iva}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-700">Stock:</span>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-700">Imagen:</span>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="border border-gray-300 p-2 w -full"
            />
          </label>
          <button type="submit" className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-700">
            Agregar Producto
          </button>
        </form>
      </Modal>

      {/* Modal para editar productos */}
      <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
        <h2 className="text-lg font-bold mb-2">Editar Producto</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            <span className="text-gray-700">Nombre:</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-700">Categoría:</span>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-700">Precio Neto:</span>
            <input
              type="number"
              name="netPrice"
              value={formData.netPrice}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-700">IVA:</span>
            <input
              type="number"
              name="iva"
              value={formData.iva}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-700">Stock:</span>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-700">Imagen:</span>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="border border-gray-300 p-2 w-full"
            />
          </label>
          <button type="submit" className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-700">
            Editar Producto
          </button>
        </form>
      </Modal>

      {/* Modal para confirmar eliminación */}
      <Modal isOpen={deleteConfirmation.isOpen} onClose={() => setDeleteConfirmation({ isOpen: false, productId: null })}>
        <h2 className="text-lg font-bold mb-2">Eliminar Producto</h2>
        <p>¿Estás seguro de eliminar el producto?</p>
        <button onClick={confirmDelete} className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-700">
          Eliminar
        </button>
        <button onClick={() => setDeleteConfirmation({ isOpen: false, productId: null })} className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300">
          Cancelar
        </button>
      </Modal>

      {/* Botón para descargar CSV */}
      <CSVLink data={products} filename="productos.csv">
        <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700">
          <Download size={16} />
          Descargar CSV
        </button>
      </CSVLink>
    </div>
  );
};

export default ProductManager;