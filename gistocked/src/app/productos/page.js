import React, { useEffect, useState } from "react";

const Page = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    img: null,
    nombre_producto: "",
    descripcion: "",
    precio_compra: 0,
    porcentaje_de_ganancia: 0,
    precio_neto: 0,
    precio_venta: 0,
    precio_venta_final: 0,
    codigo: "",
    id_categoria: 0,
    descuento: 0,
    cantidad: 0,
    id_producto: null,
  });

  // Estado para el modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Obtener productos del backend
  const obtenerProductos = async () => {
    try {
      const response = await fetch("/products"); // Ruta corregida para obtener productos
      if (response.ok) {
        const data = await response.json();
        setProductos(data);
      } else {
        console.error("Error al obtener productos:", response.statusText);
      }
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  // Manejo de cambios en el formulario
  const manejarCambio = (e) => {
    setNuevoProducto({
      ...nuevoProducto,
      [e.target.name]: e.target.value,
    });
  };

  // Manejo del cambio de la imagen
  const manejarCargaImagen = (e) => {
    setNuevoProducto({
      ...nuevoProducto,
      img: e.target.files[0], // Guardar el archivo de imagen
    });
  };

  // Validar datos del formulario
  const validarFormulario = () => {
    const {
      codigo,
      nombre_producto,
      precio_venta,
      id_categoria,
    } = nuevoProducto;
    return codigo && nombre_producto && precio_venta && id_categoria;
  };

  // Añadir o actualizar producto en el backend
  const guardarProducto = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      console.error("Faltan datos obligatorios");
      return;
    }

    const formData = new FormData();
    for (const key in nuevoProducto) {
      formData.append(key, nuevoProducto[key]);
    }

    try {
      const url = nuevoProducto.id_producto
        ? `/products/${nuevoProducto.id_producto}`
        : "/products";
      const method = nuevoProducto.id_producto ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        body: formData,
      });
      if (response.ok) {
        const productoGuardado = await response.json();
        if (nuevoProducto.id_producto) {
          setProductos(
            productos.map((p) =>
              p.id_producto === nuevoProducto.id_producto
                ? productoGuardado
                : p
            )
          );
        } else {
          setProductos([...productos, productoGuardado]);
        }
        // Resetear el formulario y cerrar modal
        setNuevoProducto({
          img: null,
          nombre_producto: "",
          descripcion: "",
          precio_compra: 0,
          porcentaje_de_ganancia: 0,
          precio_neto: 0,
          precio_venta: 0,
          precio_venta_final: 0,
          codigo: "",
          id_categoria: 0,
          descuento: 0,
          cantidad: 0,
          id_producto: null,
        });
        setIsModalOpen(false);
      } else {
        console.error("Error al guardar producto:", response.statusText);
      }
    } catch (error) {
      console.error("Error al guardar producto:", error);
    }
  };

  // Eliminar producto del backend
  const eliminarProducto = async (id_producto) => {
    try {
      const response = await fetch(`/products/${id_producto}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setProductos(productos.filter((p) => p.id_producto !== id_producto));
      } else {
        console.error("Error al eliminar producto:", response.statusText);
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  // Función para actualizar producto
  const actualizarProducto = (id_producto) => {
    const productoAActualizar = productos.find(
      (p) => p.id_producto === id_producto
    );
    if (productoAActualizar) {
      setNuevoProducto(productoAActualizar);
      setIsModalOpen(true);
    }
  };

  // Función para abrir el modal
  const abrirModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const cerrarModal = () => {
    setIsModalOpen(false);
    setNuevoProducto({
      img: null,
      nombre_producto: "",
      descripcion: "",
      precio_compra: 0,
      porcentaje_de_ganancia: 0,
      precio_neto: 0,
      precio_venta: 0,
      precio_venta_final: 0,
      codigo: "",
      id_categoria: 0,
      descuento: 0,
      cantidad: 0,
      id_producto: null,
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>

      {/* Botón para abrir el modal */}
      <button
        onClick={abrirModal}
        className="bg-green-500 text-white p-2 rounded mb-4"
      >
        Añadir Producto
      </button>

      {/* Modal para añadir o editar un producto */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded shadow-md max-w-lg w-full overflow-hidden">
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">
                {nuevoProducto.id_producto ? "Editar Producto" : "Añadir Producto"}
              </h2>
              <form onSubmit={guardarProducto}>
                <div className="mb-4">
                  <label className="block mb-1">Imagen:</label>
                  <input
                    type="file"
                    onChange={manejarCargaImagen}
                    className="w-full p-2 border"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Código:</label>
                  <input
                    type="text"
                    name="codigo"
                    placeholder="Código"
                    value={nuevoProducto.codigo}
                    onChange={manejarCambio}
                    className="w-full p-2 border"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Nombre del producto:</label>
                  <input
                    type="text"
                    name="nombre_producto"
                    placeholder="Nombre del producto"
                    value={nuevoProducto.nombre_producto}
                    onChange={manejarCambio}
                    className="w-full p-2 border"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Descripción:</label>
                  <textarea
                    name="descripcion"
                    placeholder="Descripción"
                    value={nuevoProducto.descripcion}
                    onChange={manejarCambio}
                    className="w-full p-2 border resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-1">Precio de compra:</label>
                    <input
                      type="number"
                      name="precio_compra"
                      placeholder="Precio de compra"
                      value={nuevoProducto.precio_compra}
                      onChange={manejarCambio}
                      className="w-full p-2 border"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">% de ganancia:</label>
                    <input
                      type="number"
                      name="porcentaje_de_ganancia"
                      placeholder="% de ganancia"
                      value={nuevoProducto.porcentaje_de_ganancia}
                      onChange={manejarCambio}
                      className="w-full p-2 border"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-1">Precio neto:</label>
                    <input
                      type="number"
                      name="precio_neto"
                      placeholder="Precio neto"
                      value={nuevoProducto.precio_neto}
                      onChange={manejarCambio}
                      className="w-full p-2 border"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Precio de venta:</label>
                    <input
                      type="number"
                      name="precio_venta"
                      placeholder="Precio de venta"
                      value={nuevoProducto.precio_venta}
                      onChange={manejarCambio}
                      className="w-full p-2 border"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-1">Precio venta final:</label>
                    <input
                      type="number"
                      name="precio_venta_final"
                      placeholder="Precio venta final"
                      value={nuevoProducto.precio_venta_final}
                      onChange={manejarCambio}
                      className="w-full p-2 border"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Descuento:</label>
                    <input
                      type="number"
                      name="descuento"
                      placeholder="Descuento"
                      value={nuevoProducto.descuento}
                      onChange={manejarCambio}
                      className="w-full p-2 border"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-1">Cantidad:</label>
                    <input
                      type="number"
                      name="cantidad"
                      placeholder="Cantidad"
                      value={nuevoProducto.cantidad}
                      onChange={manejarCambio}
                      className="w-full p-2 border"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">ID Categoría:</label>
                    <input
                      type="number"
                      name="id_categoria"
                      placeholder="ID Categoría"
                      value={nuevoProducto.id_categoria}
                      onChange={manejarCambio}
                      className="w-full p-2 border"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mr-2">
                    {nuevoProducto.id_producto ? "Actualizar" : "Añadir"} Producto
                  </button>
                  <button
                    type="button"
                    onClick={cerrarModal}
                    className="bg-red-500 text-white py-2 px-4 rounded"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Tabla de productos */}
      <h2 className="text-xl font-bold mb-2">Lista de Productos</h2>
      <table className="min-w-full bg-white border border-gray-300 shadow-md rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Imagen</th>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Descripción</th>
            <th className="border px-4 py-2">Precio Compra</th>
            <th className="border px-4 py-2">Porcentaje de Ganancia</th>
            <th className="border px-4 py-2">Precio Neto</th>
            <th className="border px-4 py-2">Precio Venta</th>
            <th className="border px-4 py-2">Precio Venta Final</th>
            <th className="border px-4 py-2">Código</th>
            <th className="border px-4 py-2">ID Categoría</th>
            <th className="border px-4 py-2">Descuento</th>
            <th className="border px-4 py-2">Cantidad</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id_producto} className="hover:bg-gray-100 transition-all">
              <td className="border px-4 py-2 text-center">
                <img
                  src={producto.img}
                  alt={producto.nombre_producto}
                  className="h-12 w-12 object-cover rounded-full mx-auto"
                />
              </td>
              <td className="border px-4 py-2 text-center">
                {producto.nombre_producto}
              </td>
              <td className="border px-4 py-2 text-center">
                {producto.descripcion}
              </td>
              <td className="border px-4 py-2 text-center">
                ${producto.precio_compra}
              </td>
              <td className="border px-4 py-2 text-center">
                {producto.porcentaje_de_ganancia}%
              </td>
              <td className="border px-4 py-2 text-center">
                ${producto.precio_neto}
              </td>
              <td className="border px-4 py-2 text-center">
                ${producto.precio_venta}
              </td>
              <td className="border px-4 py-2 text-center">
                ${producto.precio_venta_final}
              </td>
              <td className="border px-4 py-2 text-center">
                {producto.codigo}
              </td>
              <td className="border px-4 py-2 text-center">
                {producto.id_categoria}
              </td>
              <td className="border px-4 py-2 text-center">
                {producto.descuento}%
              </td>
              <td className="border px-4 py-2 text-center">
                {producto.cantidad}
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => actualizarProducto(producto.id_producto)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white p-1 rounded mr-1"
                >
                  Actualizar
                </button>
                <button
                  onClick={() => eliminarProducto(producto.id_producto)}
                  className="bg-red-500 hover:bg-red-600 text-white p-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
