import React, { useEffect, useState } from "react";

const Page = () => {
  const [productos, setProductos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch productos desde la API cuando el componente se monta
  useEffect(() => {
    const fetchProductos = async () => {
      const response = await fetch('/api/productos');
      const data = await response.json();
      setProductos(data);
    };

    fetchProductos();
  }, []);

  // Abre el modal para añadir o editar un producto
  const abrirModal = (producto = null) => {
    if (producto) {
      setNuevoProducto(producto);
      setIsEditing(true);
    } else {
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
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  // Cierra el modal y reinicia el formulario
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

  // Maneja los cambios en el formulario
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setNuevoProducto({ ...nuevoProducto, [name]: value });
  };

  // Guarda un nuevo producto o actualiza uno existente
  const guardarProducto = async () => {
    if (isEditing) {
      await fetch('/api/productos', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoProducto),
      });
      setProductos((prevProductos) =>
        prevProductos.map((producto) =>
          producto.id_producto === nuevoProducto.id_producto ? nuevoProducto : producto
        )
      );
    } else {
      const response = await fetch('/api/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoProducto),
      });
      const nuevo = await response.json();
      setProductos([...productos, nuevo]);
    }
    cerrarModal();
  };

  // Elimina un producto
  const eliminarProducto = async (id) => {
    await fetch('/api/productos', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_producto: id }),
    });
    setProductos(productos.filter((producto) => producto.id_producto !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6">Gestión de Productos</h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => abrirModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          Añadir Producto
        </button>
      </div>

      {/* Modal para añadir o editar un producto */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 overflow-y-auto max-h-[80vh]">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {isEditing ? "Editar Producto" : "Añadir Producto"}
            </h2>
            <form>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Imagen:</label>
                <input
                  type="file"
                  name="img"
                  className="w-full p-2 border rounded"
                  onChange={manejarCambio}
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Código:</label>
                <input
                  type="text"
                  name="codigo"
                  value={nuevoProducto.codigo}
                  className="w-full p-2 border rounded"
                  onChange={manejarCambio}
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Nombre del producto:</label>
                <input
                  type="text"
                  name="nombre_producto"
                  value={nuevoProducto.nombre_producto}
                  className="w-full p-2 border rounded"
                  onChange={manejarCambio}
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Descripción:</label>
                <textarea
                  name="descripcion"
                  value={nuevoProducto.descripcion}
                  className="w-full p-2 border rounded resize-none"
                  onChange={manejarCambio}
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Cantidad:</label>
                <input
                  type="number"
                  name="cantidad"
                  value={nuevoProducto.cantidad}
                  className="w-full p-2 border rounded"
                  onChange={manejarCambio}
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Precio Compra:</label>
                <input
                  type="number"
                  name="precio_compra"
                  value={nuevoProducto.precio_compra}
                  className="w-full p-2 border rounded"
                  onChange={manejarCambio}
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Porcentaje de Ganancia:</label>
                <input
                  type="number"
                  name="porcentaje_de_ganancia"
                  value={nuevoProducto.porcentaje_de_ganancia}
                  className="w-full p-2 border rounded"
                  onChange={manejarCambio}
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Descuento:</label>
                <input
                  type="number"
                  name="descuento"
                  value={nuevoProducto.descuento}
                  className="w-full p-2 border rounded"
                  onChange={manejarCambio}
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Categoría:</label>
                <input
                  type="number"
                  name="id_categoria"
                  value={nuevoProducto.id_categoria}
                  className="w-full p-2 border rounded"
                  onChange={manejarCambio}
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Precio de Venta:</label>
                <input
                  type="number"
                  name="precio_venta"
                  value={nuevoProducto.precio_venta}
                  className="w-full p-2 border rounded"
                  onChange={manejarCambio}
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Precio de Venta Final:</label>
                <input
                  type="number"
                  name="precio_venta_final"
                  value={nuevoProducto.precio_venta_final}
                  className="w-full p-2 border rounded"
                  onChange={manejarCambio}
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={guardarProducto}
                  className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
                >
                  {isEditing ? "Actualizar" : "Guardar"}
                </button>
                <button
                  type="button"
                  onClick={cerrarModal}
                  className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabla de productos */}
      <table className="w-full border-collapse mt-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Código</th>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Descripción</th>
            <th className="border px-4 py-2">Cantidad</th>
            <th className="border px-4 py-2">Precio de Venta</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id_producto}>
              <td className="border px-4 py-2">{producto.codigo}</td>
              <td className="border px-4 py-2">{producto.nombre_producto}</td>
              <td className="border px-4 py-2">{producto.descripcion}</td>
              <td className="border px-4 py-2">{producto.cantidad}</td>
              <td className="border px-4 py-2">{producto.precio_venta}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => abrirModal(producto)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarProducto(producto.id_producto)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
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
