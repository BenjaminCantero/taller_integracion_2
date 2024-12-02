import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, Plus, Package, FolderPlus, Edit2, Trash2 } from "lucide-react";

const initialProductoState = {
  img: "",
  nombre_producto: "",
  descripcion: "",
  cantidad: null,
  precio_compra: null,
  porcentaje_de_ganancia: null,
  precio_neto: null,
  precio_venta: null,
  precio_venta_final: null,
  codigo: null,
  id_categoria: null,
  descuento: null,
  precio_descuento: null,
  id_empresa: null,
};

const initialCategoriaState = { nombre_categoria: "" };

const Page = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [datosSimulados, setDatosSimulados] = useState(true);
  const [nuevoProducto, setNuevoProducto] = useState(initialProductoState);
  const [nuevaCategoria, setNuevaCategoria] = useState(initialCategoriaState);

  const manejarCambioArchivo = (event) => {
    const archivo = event.target.files[0];
    if (archivo) {
      const reader = new FileReader();
      reader.onload = (e) => setNuevoProducto((prev) => ({ ...prev, img: e.target.result }));
      reader.readAsDataURL(archivo);
    } else {
      setNuevoProducto((prev) => ({ ...prev, img: "" }));
    }
  };

  const manejarCambioProducto = (e) => {
    const { name, value } = e.target;
  
    setNuevoProducto((prev) => {
      // Si el campo es `id_categoria`, lo convertimos a número
      const updated = { ...prev, [name]: name === "id_categoria" ? (value ? Number(value) : "") : value };
  
      // Calcular precios si el nombre del campo es "precio_compra" o "porcentaje_de_ganancia"
      if (["precio_compra", "porcentaje_de_ganancia"].includes(name)) {
        const ganancia = parseFloat(updated.porcentaje_de_ganancia) || 0;
        const compra = parseFloat(updated.precio_compra) || 0;
        const precioNeto = compra * (1 + ganancia / 100);
        updated.precio_neto = precioNeto;
        updated.precio_venta = precioNeto * 1.2;
        updated.precio_venta_final = updated.precio_venta;
      }
  
      // Calcular precio con descuento si el nombre del campo es "descuento"
      if (name === "descuento") {
        const descuento = parseFloat(updated.descuento) || 0;
        updated.precio_descuento = updated.precio_venta * (1 - descuento / 100);
      }
  
      return updated;
    });
  };
  
  const guardarProducto = async () => {
    // Validación de campos obligatorios
    const { nombre_producto, precio_compra, id_categoria, cantidad } = nuevoProducto;
  
    if (!nombre_producto.trim() || !precio_compra || !id_categoria || cantidad === null) {
      alert("Por favor completa los campos obligatorios:\n- Nombre del producto\n- Precio de compra\n- Categoría\n- Cantidad.");
      return;
    }
  
    // Convertir valores a números
    const precioCompra = parseFloat(precio_compra) || 0;
    const cantidadProducto = parseInt(cantidad, 10) || 0;
    const porcentajeGanancia = parseFloat(nuevoProducto.porcentaje_de_ganancia) || 0;
  
    // Calcular precios
    const precioNeto = precioCompra * (1 + porcentajeGanancia / 100);
    const precioVenta = precioNeto * 1.2;
    const precioVentaFinal = precioVenta;
    const precioDescuento = precioVenta * (1 - (nuevoProducto.descuento / 100) || 0);
  
    // URL y método según si se está editando o creando un producto
    const url = `http://190.114.252.218:8000/api/inventarios/${isEditing ? `${nuevoProducto.id_producto}/` : ""}`;
    const method = isEditing ? "PUT" : "POST";
  
    // Preparar los datos para el envío, asegurando el formato adecuado
    const formData = new FormData();
    Object.keys(nuevoProducto).forEach((key) => {
      const value = nuevoProducto[key];
  
      // Convertir `id_categoria` a número para evitar errores en el backend
      if (key === "id_categoria") {
        formData.append(key, Number(value));
      } else if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });
  
    // Agregar los cálculos de precios
    formData.append("precio_neto", precioNeto);
    formData.append("precio_venta", precioVenta);
    formData.append("precio_venta_final", precioVentaFinal);
    formData.append("precio_descuento", precioDescuento);
  
    try {
      // Realizar la solicitud HTTP
      const response = await axios({
        method,
        url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      // Actualizar el estado de productos
      setProductos((prev) =>
        isEditing
          ? prev.map((prod) =>
              prod.id_producto === nuevoProducto.id_producto ? response.data : prod
            )
          : [...prev, response.data]
      );
  
      // Cerrar el modal después de guardar
      cerrarModalProducto();
    } catch (error) {
      // Manejo detallado de errores
      if (error.response) {
        console.error("Error en la respuesta del servidor:", error.response.data, "Estado:", error.response.status);
        alert(`Error al guardar el producto: ${error.response.data.detail || "Verifica los datos e inténtalo nuevamente."}`);
      } else if (error.request) {
        console.error("No hubo respuesta del servidor. Detalles:", error.request);
        alert("El servidor no respondió. Verifica tu conexión a Internet o contacta al administrador.");
      } else {
        console.error("Error al configurar la solicitud:", error.message);
        alert("Ocurrió un error inesperado al configurar la solicitud. Inténtalo nuevamente.");
      }
    }
  };
  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`http://190.114.252.218:8000/api/inventarios/${id}/`);
      setProductos((prev) => prev.filter((prod) => prod.id_producto !== id));
    } catch (error) {
      console.error("Error al eliminar el producto:", error.message);
    }
  };

  const abrirModalProducto = (producto = null) => {
    setNuevoProducto(producto || initialProductoState);
    setIsEditing(!!producto);
    setIsModalOpen(true);
  };

  const cerrarModalProducto = () => setIsModalOpen(false);

  const abrirModalCategoria = () => {
    setNuevaCategoria(initialCategoriaState);
    setIsCategoryModalOpen(true);
  };

  const cerrarModalCategoria = () => setIsCategoryModalOpen(false);

  const manejarCambioCategoria = (e) => {
    const { name, value } = e.target;
    setNuevaCategoria((prev) => ({ ...prev, [name]: value }));
  };

  const guardarCategoria = async () => {
    try {
      const response = await axios.post("http://190.114.252.218:8000/api/categorias/", nuevaCategoria);
      setCategorias((prev) => [...prev, response.data]);
      cerrarModalCategoria();
    } catch (error) {
      console.error("Error al guardar la categoría:", error.message);
    }
  };

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("http://190.114.252.218:8000/api/inventarios/");
        setProductos(response.data);
        setDatosSimulados(false);
      } catch (error) {
        console.error("Error al obtener productos:", error.message);
        setDatosSimulados(true);
      }
    };

    const fetchCategorias = async () => {
      try {
        const response = await axios.get("http://190.114.252.218:8000/api/categorias/");
        setCategorias(response.data);
      } catch (error) {
        console.error("Error al obtener categorías:", error.message);
      }
    };

    fetchProductos();
    fetchCategorias();
  }, []);

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
        <div className="bg-white w-full max-w-4xl p-6 mx-4 rounded-lg shadow-xl">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
            {isEditing ? "Editar Producto" : "Nuevo Producto"}
          </h2>

          <form onSubmit={(e) => { e.preventDefault(); guardarProducto(); }} className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Código del producto */}
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-2">Código del producto</label>
              <input
                type="text"
                name="codigo"
                placeholder="Escanea o ingresa el código"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                value={nuevoProducto.codigo || ""}
                onChange={manejarCambioProducto}
              />
            </div>

            {/* Imagen del producto */}
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-2">Imagen del producto</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg hover:border-blue-500">
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

            {/* Nombre del producto */}
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del producto</label>
              <input
                type="text"
                name="nombre_producto"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                value={nuevoProducto.nombre_producto || ""}
                onChange={manejarCambioProducto}
              />
            </div>

            {/* Descripción */}
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
              <textarea
                name="descripcion"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                rows="4"
                value={nuevoProducto.descripcion || ""}
                onChange={manejarCambioProducto}
              />
            </div>

            {/* Precio de compra */}
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-2">Precio de compra</label>
              <input
                type="number"
                name="precio_compra"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                value={nuevoProducto.precio_compra || ""}
                onChange={manejarCambioProducto}
              />
            </div>

            {/* Porcentaje de ganancia */}
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-2">Porcentaje de ganancia</label>
              <input
                type="number"
                name="porcentaje_de_ganancia"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                value={nuevoProducto.porcentaje_de_ganancia || ""}
                onChange={manejarCambioProducto}
              />
            </div>

            {/* Precio de venta */}
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-2">Precio de venta</label>
              <input
                type="number"
                name="precio_venta"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50"
                value={nuevoProducto.precio_venta || ""}
                readOnly
              />
            </div>

            {/* Descuento */}
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-2">Descuento (%)</label>
              <input
                type="number"
                name="descuento"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                value={nuevoProducto.descuento || ""}
                onChange={manejarCambioProducto}
              />
            </div>

            {/* Precio con descuento */}
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-2">Precio con descuento</label>
              <input
                type="number"
                name="precio_descuento"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200"
                value={nuevoProducto.precio_descuento || ""}
                readOnly
              />
            </div>

            {/* Cantidad */}
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-2">Cantidad</label>
              <input
                type="number"
                name="cantidad"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                value={nuevoProducto.cantidad || ""}
                onChange={manejarCambioProducto}
              />
            </div>

              {/* Categoría */}
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                <select
                  name="id_categoria"
                  value={nuevoProducto.id_categoria || ""}
                  onChange={(e) => manejarCambioProducto(e)}
                >
                  <option value="">Seleccionar Categoría</option>
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
                className="px-6 py-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white hover:shadow-lg hover:shadow-green-200 hover:translate-y-[-1px] transition-all duration-200"
                disabled={!nuevoProducto.nombre_producto || !nuevoProducto.precio_compra}  // Disable submit if required fields are empty
              >
                {isEditing ? "Guardar cambios" : "Agregar Producto"}
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