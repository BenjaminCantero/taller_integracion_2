import React, { useEffect, useState } from "react";

const Page = () => {
  const [productos, setProductos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProductos = async () => {
      const response = await fetch("http://190.114.252.218:8000/api/inventarios/");
      const data = await response.json();
      setProductos(data);
    };
    fetchProductos();
  }, []);

  const abrirModal = (producto = null) => {
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

  const cerrarModal = () => {
    setIsModalOpen(false);
    setNuevoProducto({
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
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => {
      const updatedProducto = { ...prev, [name]: value };
      if (name === "porcentaje_de_ganancia") {
        const gananciaDecimal = parseFloat(value) / 100;
        const precioNeto = parseFloat(updatedProducto.precio_compra) * (1 + gananciaDecimal);
        const precioVenta = precioNeto * 1.2;
        const precioVentaFinal = precioVenta;
        updatedProducto.precio_neto = precioNeto;
        updatedProducto.precio_venta = precioVenta;
        updatedProducto.precio_venta_final = precioVentaFinal;
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

  const guardarProducto = async () => {
    const url = `http://190.114.252.218:8000/api/inventarios/${isEditing ? `${nuevoProducto.id_producto}/` : ""}`;
    const method = isEditing ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoProducto),
    });

    setProductos((prev) =>
      isEditing
        ? prev.map((prod) => (prod.id_producto === nuevoProducto.id_producto ? nuevoProducto : prod))
        : [...prev, { ...nuevoProducto, id_producto: prev.length + 1 }]
    );
    cerrarModal();
  };

  const eliminarProducto = async (id) => {
    await fetch(`http://190.114.252.218:8000/api/inventarios/${id}/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    setProductos(productos.filter((producto) => producto.id_producto !== id));
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Gestión de Productos</h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => abrirModal()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
        >
          Añadir Producto
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 overflow-y-auto max-h-[80vh]">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
              {isEditing ? "Editar Producto" : "Añadir Producto"}
            </h2>
            <form>
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold">Imagen:</label>
                  <input
                    type="file"
                    name="img"
                    className="w-full p-2 border border-gray-300 rounded"
                    onChange={manejarCambioArchivo}
                  />
                </div>
                {/* Continuar con los otros campos como antes */}
                {/* Código, nombre del producto, descripción, cantidad, precio_compra, etc. */}
              </div>
              <div className="flex justify-end mt-6 space-x-3">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={cerrarModal}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={guardarProducto}
                >
                  {isEditing ? "Actualizar" : "Añadir"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-auto rounded-lg shadow-lg mt-6">
        <table className="min-w-full bg-white rounded-md border border-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-6 font-semibold text-gray-700 border-b">Imagen</th>
              <th className="py-3 px-6 font-semibold text-gray-700 border-b">Nombre</th>
              <th className="py-3 px-6 font-semibold text-gray-700 border-b">Precio Compra</th>
              <th className="py-3 px-6 font-semibold text-gray-700 border-b">Precio Venta</th>
              <th className="py-3 px-6 font-semibold text-gray-700 border-b">Código</th>
              <th className="py-3 px-6 font-semibold text-gray-700 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id_producto} className="hover:bg-gray-100">
                <td className="py-4 px-6 border-b text-center">
                  <img src={producto.img} alt="Producto" className="w-16 h-16 object-cover mx-auto" />
                </td>
                <td className="py-4 px-6 border-b text-center">{producto.nombre_producto}</td>
                <td className="py-4 px-6 border-b text-center">${producto.precio_compra}</td>
                <td className="py-4 px-6 border-b text-center">${producto.precio_venta}</td>
                <td className="py-4 px-6 border-b text-center">{producto.codigo}</td>
                <td className="py-4 px-6 border-b text-center space-x-2">
                  <button
                    onClick={() => abrirModal(producto)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
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
