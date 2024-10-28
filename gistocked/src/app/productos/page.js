import React, { useEffect, useState } from "react";
import axios from "axios";

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
      const response = await axios.get("http://190.114.252.218:8000/api/inventarios/");
      setProductos(response.data);
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

    const formData = new FormData();
    formData.append("id_producto", nuevoProducto.id_producto);
    formData.append("img", nuevoProducto.img);  // Este es el archivo de la imagen
    formData.append("nombre_producto", nuevoProducto.nombre_producto);
    formData.append("descripcion", nuevoProducto.descripcion);
    formData.append("precio_compra", nuevoProducto.precio_compra);
    formData.append("porcentaje_de_ganancia", nuevoProducto.porcentaje_de_ganancia);
    formData.append("precio_neto", nuevoProducto.precio_neto);
    formData.append("precio_venta", nuevoProducto.precio_venta);
    formData.append("precio_venta_final", nuevoProducto.precio_venta_final);
    formData.append("codigo", nuevoProducto.codigo);
    formData.append("descuento", nuevoProducto.descuento);
    formData.append("precio_descuento", nuevoProducto.precio_descuento);
    formData.append("cantidad", nuevoProducto.cantidad);
    formData.append("id_empresa", nuevoProducto.id_empresa);
    formData.append("id_categoria", nuevoProducto.id_categoria);

    try {
      const response = await axios({
        method,
        url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const productoGuardado = response.data;
      setProductos((prev) =>
        isEditing
          ? prev.map((prod) => (prod.id_producto === nuevoProducto.id_producto ? productoGuardado : prod))
          : [...prev, productoGuardado]
      );
      cerrarModal();
    } catch (error) {
      console.error("Error en la solicitud:", error.response ? error.response.data : error.message);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`http://190.114.252.218:8000/api/inventarios/${id}/`);
      setProductos(productos.filter((producto) => producto.id_producto !== id));
    } catch (error) {
      console.error("Error al eliminar el producto:", error.response ? error.response.data : error.message);
    }
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
                {["nombre_producto", "descripcion", "precio_compra", "porcentaje_de_ganancia", "codigo", "descuento", "cantidad", "id_empresa", "id_categoria"].map((campo) => (
                  <div key={campo}>
                    <label className="block font-semibold">{campo.replace(/_/g, ' ')}:</label>
                    <input
                      type="text"
                      name={campo}
                      value={nuevoProducto[campo]}
                      onChange={manejarCambio}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                ))}
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
              {["Imagen", "Nombre", "Descripción", "Precio Compra", "Ganancia %", "Precio Neto", "Precio Venta", "Precio Venta Final", "Código", "Descuento", "Precio con Descuento", "Cantidad", "ID Empresa", "ID Categoría", "Acciones"].map((header) => (
                <th key={header} className="py-3 px-6 font-semibold text-gray-700 border-b">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id_producto} className="hover:bg-gray-100">
                <td className="py-4 px-6 border-b text-center">
                  <img src={producto.img} alt="Producto" className="w-16 h-16 object-cover mx-auto" />
                </td>
                {["nombre_producto", "descripcion", "precio_compra", "porcentaje_de_ganancia", "precio_neto", "precio_venta", "precio_venta_final", "codigo", "descuento", "precio_descuento", "cantidad", "id_empresa", "id_categoria"].map((campo) => (
                  <td key={campo} className="py-4 px-6 border-b text-center">
                    {producto[campo]}
                  </td>
                ))}
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
