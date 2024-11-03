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

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">Imagen</th>
              <th className="px-4 py-2 border">Nombre</th>
              <th className="px-4 py-2 border">Descripción</th>
              <th className="px-4 py-2 border">Precio de Venta</th>
              <th className="px-4 py-2 border">Cantidad</th>
              <th className="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos
              .filter((prod) => prod.nombre_producto.toLowerCase().includes(busqueda.toLowerCase()))
              .map((producto) => (
                <tr key={producto.id_producto} className="text-center">
                  <td className="px-4 py-2 border">
                    {producto.img ? (
                      <img src={producto.img} alt={producto.nombre_producto} className="w-16 h-16 object-cover" />
                    ) : (
                      "Sin imagen"
                    )}
                  </td>
                  <td className="px-4 py-2 border">{producto.nombre_producto}</td>
                  <td className="px-4 py-2 border">{producto.descripcion}</td>
                  <td className="px-4 py-2 border">{producto.precio_venta_final.toFixed(2)} $</td>
                  <td className="px-4 py-2 border">{producto.cantidad}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => abrirModalProducto(producto)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarProducto(producto.id_producto)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

{/* Modal para añadir/editar producto */}
{isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white w-full max-w-3xl p-8 mx-4 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        {isEditing ? "Editar Producto" : "Nuevo Producto"}
      </h2>
      <form className="grid grid-cols-2 gap-6">
        
        {/* Campo para la imagen */}
        <div className="col-span-2">
          <label className="block text-gray-700">Imagen del producto</label>
          <input
            type="file"
            name="img"
            onChange={manejarCambioArchivo}
            className="w-full border p-2 mt-1"
          />
        </div>

        {/* Campo para el nombre del producto */}
        <div>
          <label className="block text-gray-700">Nombre del producto</label>
          <input
            type="text"
            name="nombre_producto"
            placeholder="Nombre del producto"
            className="w-full border p-2"
            value={nuevoProducto.nombre_producto}
            onChange={manejarCambioProducto}
          />
        </div>

        {/* Campo para la descripción */}
        <div>
          <label className="block text-gray-700">Descripción</label>
          <textarea
            name="descripcion"
            placeholder="Descripción del producto"
            className="w-full border p-2 h-24"
            value={nuevoProducto.descripcion}
            onChange={manejarCambioProducto}
          />
        </div>

        {/* Campo para el precio de compra */}
        <div>
          <label className="block text-gray-700">Precio de compra</label>
          <input
            type="number"
            name="precio_compra"
            placeholder="Precio de compra"
            className="w-full border p-2"
            value={nuevoProducto.precio_compra}
            onChange={manejarCambioProducto}
          />
        </div>

        {/* Campo para el porcentaje de ganancia */}
        <div>
          <label className="block text-gray-700">Porcentaje de ganancia</label>
          <input
            type="number"
            name="porcentaje_de_ganancia"
            placeholder="Porcentaje de ganancia"
            className="w-full border p-2"
            value={nuevoProducto.porcentaje_de_ganancia}
            onChange={manejarCambioProducto}
          />
        </div>

        {/* Campo para el precio neto */}
        <div>
          <label className="block text-gray-700">Precio neto</label>
          <input
            type="number"
            name="precio_neto"
            placeholder="Precio neto"
            className="w-full border p-2"
            value={nuevoProducto.precio_neto.toFixed(2)}
            readOnly
          />
        </div>

        {/* Campo para el precio de venta */}
        <div>
          <label className="block text-gray-700">Precio de venta</label>
          <input
            type="number"
            name="precio_venta"
            placeholder="Precio de venta"
            className="w-full border p-2"
            value={nuevoProducto.precio_venta.toFixed(2)}
            readOnly
          />
        </div>

        {/* Campo para el descuento */}
        <div>
          <label className="block text-gray-700">Descuento (%)</label>
          <input
            type="number"
            name="descuento"
            placeholder="Descuento"
            className="w-full border p-2"
            value={nuevoProducto.descuento}
            onChange={manejarCambioProducto}
          />
        </div>

        {/* Campo para el precio con descuento */}
        <div>
          <label className="block text-gray-700">Precio con descuento</label>
          <input
            type="number"
            name="precio_descuento"
            placeholder="Precio con descuento"
            className="w-full border p-2"
            value={nuevoProducto.precio_descuento.toFixed(2)}
            readOnly
          />
        </div>

        {/* Campo para la cantidad */}
        <div>
          <label className="block text-gray-700">Cantidad</label>
          <input
            type="number"
            name="cantidad"
            placeholder="Cantidad"
            className="w-full border p-2"
            value={nuevoProducto.cantidad}
            onChange={manejarCambioProducto}
          />
        </div>

        {/* Campo para la categoría */}
        <div>
          <label className="block text-gray-700">Categoría</label>
          <select
            name="id_categoria"
            className="w-full border p-2"
            value={nuevoProducto.id_categoria}
            onChange={manejarCambioProducto}
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id_categoria} value={categoria.id_categoria}>
                {categoria.nombre_categoria}
              </option>
            ))}
          </select>
        </div>

        {/* Botones para guardar y cancelar */}
        <div className="col-span-2 flex justify-between mt-6">
          <button
            type="button"
            onClick={guardarProducto}
            className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600 mr-2"
          >
            {isEditing ? "Guardar Cambios" : "Añadir Producto"}
          </button>
          <button
            type="button"
            onClick={cerrarModalProducto}
            className="bg-gray-300 text-gray-700 w-full py-2 rounded hover:bg-gray-400 ml-2"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
)}


      {/* Modal para añadir nueva categoría */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-md p-8 mx-4">
            <h2 className="text-2xl font-semibold mb-4">Nueva Categoría</h2>
            <form>
              <input
                type="text"
                name="nombre_categoria"
                placeholder="Nombre de la categoría"
                className="w-full border p-2 mb-4"
                value={nuevaCategoria.nombre_categoria}
                onChange={manejarCambioCategoria}
              />
              <button type="button" onClick={guardarCategoria} className="bg-blue-500 text-white w-full py-2 mt-4">
                Añadir Categoría
              </button>
              <button type="button" onClick={cerrarModalCategoria} className="w-full py-2 mt-2 bg-gray-300">
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
