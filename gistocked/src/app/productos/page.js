import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, Plus, Package, FolderPlus, Edit2, Trash2 } from 'lucide-react';

const Page = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    id_producto: null,
    img: null,
    nombre_producto: "",
    descripcion: "",
    precio_compra: 0,
    porcentaje_de_ganancia: 0,
    precio_neto: 0,
    precio_venta: 0,
    precio_venta_final: 0,
    codigo: "",
    descuento: 0,
    precio_descuento: 0,
    cantidad: 0,
    id_empresa: 0,
    id_categoria: 0,
  });
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre_categoria: "",
  });

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("http://190.114.252.218:8000/api/inventarios/");
        setProductos(response.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    const fetchCategorias = async () => {
      try {
        const response = await axios.get("http://190.114.252.218:8000/api/categorias/");
        setCategorias(response.data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    fetchProductos();
    fetchCategorias();
  }, []);

  const abrirModalProducto = (producto = null) => {
    setNuevoProducto(
      producto || {
        id_producto: null,
        img: null,
        nombre_producto: "",
        descripcion: "",
        precio_compra: 0,
        porcentaje_de_ganancia: 0,
        precio_neto: 0,
        precio_venta: 0,
        precio_venta_final: 0,
        codigo: "",
        descuento: 0,
        precio_descuento: 0,
        cantidad: 0,
        id_empresa: 0,
        id_categoria: 0,
      }
    );
    setIsEditing(!!producto);
    setIsModalOpen(true);
  };

  const abrirModalCategoria = () => {
    setNuevaCategoria({ nombre_categoria: "" });
    setIsCategoryModalOpen(true);
  };

  const cerrarModalProducto = () => setIsModalOpen(false);
  const cerrarModalCategoria = () => setIsCategoryModalOpen(false);

  const manejarCambioProducto = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => {
      // Convertir id_categoria a número si ese es el campo que está cambiando
      const updatedProducto = { 
        ...prev, 
        [name]: name === "id_categoria" ? Number(value) : value 
      };
  
      // Cálculo del precio neto y precio de venta si cambia porcentaje de ganancia o precio de compra
      if (name === "porcentaje_de_ganancia" || name === "precio_compra") {
        const gananciaDecimal = parseFloat(updatedProducto.porcentaje_de_ganancia) / 100;
        const precioNeto = parseFloat(updatedProducto.precio_compra) * (1 + gananciaDecimal);
        updatedProducto.precio_neto = precioNeto;
        updatedProducto.precio_venta = precioNeto * 1.2;
        updatedProducto.precio_venta_final = updatedProducto.precio_venta;
      }
  
      // Cálculo de precio con descuento si cambia el descuento
      if (name === "descuento") {
        const descuentoDecimal = parseFloat(updatedProducto.descuento) / 100;
        updatedProducto.precio_descuento = updatedProducto.precio_venta * (1 - descuentoDecimal);
      }
      
      return updatedProducto;
    });
  };

  const manejarCambioArchivo = (e) => {
    setNuevoProducto((prev) => ({
      ...prev,
      img: e.target.files[0],
    }));
  };

  const manejarCambioCategoria = (e) => {
    setNuevaCategoria({ ...nuevaCategoria, nombre_categoria: e.target.value });
  };

  const guardarProducto = async () => {
    if (!nuevoProducto.nombre_producto || !nuevoProducto.precio_compra) {
      console.error("Por favor completa los campos obligatorios.");
      return;
    }
  
    const url = `http://190.114.252.218:8000/api/inventarios/${isEditing ? `${nuevoProducto.id_producto}/` : ""}`;
    const method = isEditing ? "PUT" : "POST";
    const formData = new FormData();
  
    Object.keys(nuevoProducto).forEach((key) => {
      formData.append(key, nuevoProducto[key]);
    });
  
    try {
      const response = await axios({
        method,
        url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      });
  
      console.log("Respuesta de la API:", response.data); // Verifica la respuesta
  
      setProductos((prev) =>
        isEditing
          ? prev.map((prod) => (prod.id_producto === nuevoProducto.id_producto ? response.data : prod))
          : [...prev, response.data]
      );
  
      cerrarModalProducto();
    } catch (error) {
      console.error("Error en la solicitud:", error.response?.data || error.message);
      if (error.response) {
        console.error("Detalles del error:", error.response.data);
      }
    }
  };
  
  

  const guardarCategoria = async () => {
    try {
      const response = await axios.post("http://190.114.252.218:8000/api/categorias/", nuevaCategoria);
      setCategorias([...categorias, response.data]);
      cerrarModalCategoria();
    } catch (error) {
      console.error("Error al guardar categoría:", error);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`http://190.114.252.218:8000/api/inventarios/${id}/`);
      setProductos((prev) => prev.filter((prod) => prod.id_producto !== id));
    } catch (error) {
      console.error("Error al eliminar el producto:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center bg-white py-4 rounded-lg shadow-sm">
          Gestión de Productos
        </h1>

        {/* Search and Actions Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar productos por nombre..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white shadow-sm"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => abrirModalProducto()}
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-green-200 hover:translate-y-[-1px] transition-all duration-200"
            >
              <Plus size={20} />
              <span>Añadir Producto</span>
            </button>
            <button
              onClick={() => abrirModalCategoria()}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-blue-200 hover:translate-y-[-1px] transition-all duration-200"
            >
              <FolderPlus size={20} />
              <span>Nueva Categoría</span>
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Imagen</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Nombre</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Descripción</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Precio de Venta</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Cantidad</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {productos
                  .filter((prod) => prod.nombre_producto.toLowerCase().includes(busqueda.toLowerCase()))
                  .map((producto) => (
                    <tr key={producto.id_producto} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4">
                        {producto.img ? (
                          <img 
                            src={producto.img} 
                            alt={producto.nombre_producto} 
                            className="w-16 h-16 object-cover rounded-lg shadow-sm"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Package className="text-gray-400" size={24} />
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-900">{producto.nombre_producto}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{producto.descripcion}</td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900">${producto.precio_venta_final.toFixed(2)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-sm font-medium 
                          ${producto.cantidad > 10 ? 'bg-green-100 text-green-800' : 
                          producto.cantidad > 0 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'}">
                          {producto.cantidad}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => abrirModalProducto(producto)}
                            className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors duration-200"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => eliminarProducto(producto.id_producto)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Product Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-full max-w-4xl p-8 mx-4 rounded-2xl shadow-xl">
              <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
                {isEditing ? "Editar Producto" : "Nuevo Producto"}
              </h2>
              
              <form onSubmit={(e) => { e.preventDefault(); guardarProducto(); }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Código del producto */}
                <div className="col-span-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Código del producto</label>
                  <input
                    type="text"
                    name="codigo"
                    placeholder="Escanea o ingresa el código"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200"
                    value={nuevoProducto.codigo}
                    onChange={manejarCambioProducto}
                  />
                </div>

                {/* Image Upload */}
                <div className="col-span-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Imagen del producto</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition-colors duration-200">
                    <div className="space-y-1 text-center">
                      <Package className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                          <span>Subir archivo</span>
                          <input
                            type="file"
                            name="img"
                            className="sr-only"
                            onChange={manejarCambioArchivo}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resto de campos del formulario con diseño mejorado */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del producto</label>
                    <input
                      type="text"
                      name="nombre_producto"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200"
                      value={nuevoProducto.nombre_producto}
                      onChange={manejarCambioProducto}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                    <textarea
                      name="descripcion"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200"
                      rows="4"
                      value={nuevoProducto.descripcion}
                      onChange={manejarCambioProducto}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Precio de compra</label>
                    <input
                      type="number"
                      name="precio_compra"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200"
                      value={nuevoProducto.precio_compra}
                      onChange={manejarCambioProducto}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Porcentaje de ganancia</label>
                    <input
                      type="number"
                      name="porcentaje_de_ganancia"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200"
                      value={nuevoProducto.porcentaje_de_ganancia}
                      onChange={manejarCambioProducto}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 col-span-full">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Precio neto</label>
                    <input
                      type="number"
                      name="precio_neto"
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200"
                      value={nuevoProducto.precio_neto.toFixed(2)}
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Precio de venta</label>
                    <input
                      type="number"
                      name="precio_venta"
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200"
                      value={nuevoProducto.precio_venta.toFixed(2)}
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Descuento (%)</label>
                    <input
                      type="number"
                      name="descuento"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200"
                      value={nuevoProducto.descuento}
                      onChange={manejarCambioProducto}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Precio con descuento</label>
                    <input
                      type="number"
                      name="precio_descuento"
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200"
                      value={nuevoProducto.precio_descuento.toFixed(2)}
                      readOnly
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cantidad</label>
                  <input
                    type="number"
                    name="cantidad"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200"
                    value={nuevoProducto.cantidad}
                    onChange={manejarCambioProducto}
                  />
                </div>

                <div className="col-span-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                  <select
                    name="id_categoria"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200"
                    value={nuevoProducto.id_categoria}
                    onChange={manejarCambioProducto}
                  >
                    <option value={0}>Seleccione una categoría</option>
                    {categorias.map((categoria) => (
                      <option key={categoria.id_categoria} value={categoria.id_categoria}>
                        {categoria.nombre_categoria}
                      </option>
                    ))}
                  </select>
                </div>
                   {/* Buttons */}
                <div className="col-span-full flex justify-end gap-4 mt-8">
                  <button
                    type="button"
                    onClick={cerrarModalProducto}
                    className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white hover:shadow-lg hover:shadow-green-200 hover:translate-y-[-1px] transition-all duration-200"
                  >
                    {isEditing ? "Guardar cambios" : "Añadir Producto"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Category Modal */}
        {isCategoryModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Nueva Categoría</h2>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de la categoría
                  </label>
                  <input
                    type="text"
                    name="nombre_categoria"
                    placeholder="Ingrese el nombre de la categoría"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200"
                    value={nuevaCategoria.nombre_categoria}
                    onChange={manejarCambioCategoria}
                  />
                </div>

                <div className="flex flex-col gap-3 mt-8">
                  <button
                    type="button"
                    onClick={guardarCategoria}
                    className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg hover:shadow-blue-200 hover:translate-y-[-1px] transition-all duration-200"
                  >
                    Añadir Categoría
                  </button>
                  <button
                    type="button"
                    onClick={cerrarModalCategoria}
                    className="w-full px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;