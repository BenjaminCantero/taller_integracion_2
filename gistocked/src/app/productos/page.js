import React, { useEffect, useState } from "react";
import axios from "axios";

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
      const updatedProducto = { ...prev, [name]: value };
      if (name === "porcentaje_de_ganancia" || name === "precio_compra") {
        const gananciaDecimal = parseFloat(updatedProducto.porcentaje_de_ganancia) / 100;
        const precioNeto = parseFloat(updatedProducto.precio_compra) * (1 + gananciaDecimal);
        updatedProducto.precio_neto = precioNeto;
        updatedProducto.precio_venta = precioNeto * 1.2;
        updatedProducto.precio_venta_final = updatedProducto.precio_venta;
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
    const url = `http://190.114.252.218:8000/api/inventarios/${isEditing ? `${nuevoProducto.id_producto}/` : ""}`;
    const method = isEditing ? "PUT" : "POST";
    const formData = new FormData();
    Object.keys(nuevoProducto).forEach((key) => {
      formData.append(key, nuevoProducto[key]);
    });

    try {
      const response = await axios({ method, url, data: formData, headers: { "Content-Type": "multipart/form-data" } });
      setProductos((prev) =>
        isEditing
          ? prev.map((prod) => (prod.id_producto === nuevoProducto.id_producto ? response.data : prod))
          : [...prev, response.data]
      );
      cerrarModalProducto();
    } catch (error) {
      console.error("Error en la solicitud:", error.response ? error.response.data : error.message);
    }
  };

  const guardarCategoria = async () => {
    try {
      const response = await axios.post("http://190.114.252.218:8000/api/categorias/", nuevaCategoria);
      setCategorias([...categorias, response.data]);
      cerrarModalCategoria();
    } catch (error) {
      console.error("Error al guardar la categoría:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Gestión de Productos</h1>

      <div className="flex justify-between mb-6">
        <input
          type="text"
          placeholder="Buscar productos por nombre..."
          className="border border-gray-300 p-2 rounded-lg shadow w-2/3"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <div className="space-x-4">
          <button
            onClick={() => abrirModalProducto()}
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition duration-200"
          >
            Añadir Producto
          </button>
          <button
            onClick={() => abrirModalCategoria()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition duration-200"
          >
            Nueva Categoría
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
          <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-8 overflow-y-auto max-h-[80vh]">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
              {isEditing ? "Editar Producto" : "Añadir Producto"}
            </h2>
            <form className="grid grid-cols-2 gap-4">
              <label className="flex flex-col mb-2">
                <span className="text-gray-600">Nombre del producto:</span>
                <input
                  type="text"
                  name="nombre_producto"
                  value={nuevoProducto.nombre_producto}
                  onChange={manejarCambioProducto}
                  placeholder="Ej. Laptop"
                  className="p-2 border border-gray-300 rounded"
                  required
                />
              </label>
              <label className="flex flex-col mb-2">
                <span className="text-gray-600">Descripción:</span>
                <input
                  type="text"
                  name="descripcion"
                  value={nuevoProducto.descripcion}
                  onChange={manejarCambioProducto}
                  placeholder="Descripción del producto"
                  className="p-2 border border-gray-300 rounded"
                  required
                />
              </label>
              <label className="flex flex-col mb-2">
                <span className="text-gray-600">Precio de compra:</span>
                <input
                  type="number"
                  name="precio_compra"
                  value={nuevoProducto.precio_compra}
                  onChange={manejarCambioProducto}
                  placeholder="$0.00"
                  className="p-2 border border-gray-300 rounded"
                  required
                />
              </label>
              <label className="flex flex-col mb-2">
                <span className="text-gray-600">Porcentaje de ganancia (%):</span>
                <input
                  type="number"
                  name="porcentaje_de_ganancia"
                  value={nuevoProducto.porcentaje_de_ganancia}
                  onChange={manejarCambioProducto}
                  placeholder="Ej. 20"
                  className="p-2 border border-gray-300 rounded"
                  required
                />
              </label>
              <label className="flex flex-col mb-2">
                <span className="text-gray-600">Imagen:</span>
                <input
                  type="file"
                  name="img"
                  onChange={manejarCambioArchivo}
                  className="p-2 border border-gray-300 rounded"
                  accept="image/*"
                  required
                />
              </label>
              <label className="flex flex-col mb-2">
                <span className="text-gray-600">Categoría:</span>
                <select
                  name="id_categoria"
                  value={nuevoProducto.id_categoria}
                  onChange={manejarCambioProducto}
                  className="p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Seleccione una categoría</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id_categoria} value={categoria.id_categoria}>
                      {categoria.nombre_categoria}
                    </option>
                  ))}
                </select>
              </label>
              <div className="flex justify-end col-span-2 space-x-4 mt-4">
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                  onClick={cerrarModalProducto}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={guardarProducto}
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isCategoryModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
          <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Nueva Categoría</h2>
            <form>
              <label className="flex flex-col mb-2">
                <span className="text-gray-600">Nombre de la categoría:</span>
                <input
                  type="text"
                  name="nombre_categoria"
                  value={nuevaCategoria.nombre_categoria}
                  onChange={manejarCambioCategoria}
                  placeholder="Ej. Electrónica"
                  className="p-2 border border-gray-300 rounded mb-4"
                  required
                />
              </label>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                  onClick={cerrarModalCategoria}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={guardarCategoria}
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto mt-8">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr>
              <th className="py-2 border-b text-left">Imagen</th>
              <th className="py-2 border-b text-left">Nombre</th>
              <th className="py-2 border-b text-left">Descripción</th>
              <th className="py-2 border-b text-left">Precio Compra</th>
              <th className="py-2 border-b text-left">Precio Venta</th>
              <th className="py-2 border-b text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos
              .filter((producto) =>
                producto.nombre_producto.toLowerCase().includes(busqueda.toLowerCase())
              )
              .map((producto) => (
                <tr key={producto.id_producto}>
                  <td className="py-2 border-b">
                    <img src={producto.img} alt={producto.nombre_producto} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="py-2 border-b">{producto.nombre_producto}</td>
                  <td className="py-2 border-b">{producto.descripcion}</td>
                  <td className="py-2 border-b">${producto.precio_compra.toFixed(2)}</td>
                  <td className="py-2 border-b">${producto.precio_venta.toFixed(2)}</td>
                  <td className="py-2 border-b">
                    <button
                      onClick={() => abrirModalProducto(producto)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarProducto(producto.id_producto)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
