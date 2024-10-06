"use client";
import React, { useState, useEffect } from 'react';

const Venta = () => {
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Guantes Quirúrgicos', precio: 1500, stock: 50 },
    { id: 2, nombre: 'Mascarillas N95', precio: 2500, stock: 50 },
    { id: 3, nombre: 'Jeringas 5ml', precio: 500, stock: 10 },
  ]);

  const [tablaVentas, setTablaVentas] = useState({});
  const [total, setTotal] = useState(0);
  const [codigoBarras, setCodigoBarras] = useState('');
  const [escanerVisible, setEscanerVisible] = useState(false);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  const [formaPago, setFormaPago] = useState('');
  const [tipoComprobante, setTipoComprobante] = useState('');

  const agregarProductoAVenta = (producto) => {
    if (producto.stock > 0) {
      let copiaProducto = { ...producto };
      copiaProducto.cantidad = 0;

      if (copiaProducto.cantidad < copiaProducto.stock) {
        setTablaVentas((prev) => {
          const nuevoTotal = prev[copiaProducto.nombre] ? prev[copiaProducto.nombre].cantidad + 1 : 1;

          // Verificamos que el nuevo total no exceda el stock
          if (nuevoTotal <= copiaProducto.stock) {
            const nuevoPrecio = prev[copiaProducto.nombre] ? prev[copiaProducto.nombre].precio + copiaProducto.precio : copiaProducto.precio;

            return {
              ...prev,
              [copiaProducto.nombre]: {
                ...copiaProducto,
                cantidad: nuevoTotal,
                precio: nuevoPrecio,
              },
            };
          } else {
            console.log('No se puede agregar más productos, stock insuficiente.');
            return prev;
          }
        });
      }
    } else {
      console.log('Producto sin stock');
    }

    setTotal(total + producto.precio);
  };

  const eliminarProductoDeVenta = (nombreProducto) => {
    setTablaVentas((prev) => {
      const { [nombreProducto]: producto, ...resto } = prev;
      if (producto) {
        setTotal((prevTotal) => prevTotal - producto.precio);
      }
      return resto;
    });
  };

  const manejarEscaneo = (e) => {
    if (e.key === 'Enter' && codigoBarras.trim() !== '') {
      const producto = productos.find((p) => p.id.toString() === codigoBarras);
      if (producto) {
        agregarProductoAVenta(producto);
        setCodigoBarras('');
      } else {
        alert('Producto no encontrado.');
      }
    }
  };

  const seleccionarFormaPago = (pago) => {
    setFormaPago(pago);
  };

  const seleccionarComprobante = (comprobante) => {
    setTipoComprobante(comprobante);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-black">
      {/* Encabezado */}
      <div className="bg-gray-800 text-white py-4 px-6 w-full">
        <div className="flex justify-between items-center">
          <button className="text-white">
            {/* Icono para retroceder */}
          </button>
          <h1 className="text-2xl font-bold">Venta</h1>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-grow container mx-auto py-10 px-4">
        {/* Barra de búsqueda con escaneo */}
        <div className="flex items-center mb-6">
          <input
            type="text"
            placeholder="Buscar o escanear código de barras"
            className="border border-gray-300 rounded-lg p-3 w-full mr-4"
            value={codigoBarras}
            onChange={(e) => setCodigoBarras(e.target.value)}
            onKeyDown={manejarEscaneo}
          />
          <button className="bg-gray-200 p-3 rounded-lg text-black">Escáner QR</button>
          <button
            className="ml-2 bg-gray-200 p-3 rounded-lg text-black"
            onClick={() => setEscanerVisible(!escanerVisible)}
          >
            Escáner de Barra
          </button>
        </div>

        {/* Menú desplegable para escanear */}
         {escanerVisible && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="font-bold text-lg mb-4">Escanear Código de Barras</h2>
            <input
              type="text"
              placeholder="Introduce el código o usa el lector"
              className="border border-gray-300 rounded-lg p-3 w-full"
              value={codigoBarras}
              onChange={(e) => setCodigoBarras(e.target.value)}
              onKeyDown={manejarEscaneo}
            />
          </div>
        )}

        {/* Productos disponibles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 w-full">
          {productos.map((producto) => (
            <div key={producto.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">{producto.nombre}</h3>
              <p className="text-gray-700">Precio: ${producto.precio}</p>
              <p className="text-gray-700">Cantidad en stock: {producto.stock}</p>
              <button
                className="mt-4 bg-blue-500 text-white p-2 rounded-lg"
                onClick={() => agregarProductoAVenta(producto)}
              >
                Agregar a la venta
              </button>
            </div>
          ))}
        </div>

        {/* Tabla de ventas */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
          <h2 className="text-2xl font-bold mb-4">Resumen de la Venta</h2>
          <table className="table-auto w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-2">Producto</th>
                <th className="px-4 py-2">Cantidad</th>
                <th className="px-4 py-2">Precio</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(tablaVentas).map(([nombre, producto]) => (
                <tr key={nombre}>
                  <td className="border px-4 py-2">{nombre}</td>
                  <td className="border px-4 py-2">{producto.cantidad}</td>
                  <td className="border px-4 py-2">${producto.precio}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-red-500 text-white p-1 rounded-lg"
                      onClick={() => eliminarProductoDeVenta(nombre)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Formas de Pago */}
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-2">Forma de Pago:</h3>
            <div className="flex space-x-4">
              <button
                className={`p-2 rounded-lg ${formaPago === 'Efectivo' ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}`}
                onClick={() => seleccionarFormaPago('Efectivo')}
              >
                Efectivo
              </button>
              <button
                className={`p-2 rounded-lg ${formaPago === 'Tarjeta' ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}`}
                onClick={() => seleccionarFormaPago('Tarjeta')}
              >
                Tarjeta
              </button>
              <button
                className={`p-2 rounded-lg ${formaPago === 'Transferencia' ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}`}
                onClick={() => seleccionarFormaPago('Transferencia')}
              >
                Transferencia
              </button>
            </div>
          </div>

          {/* Tipo de Comprobante */}
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-2">Tipo de Comprobante:</h3>
            <div className="flex space-x-4">
              <button
                className={`p-2 rounded-lg ${tipoComprobante === 'Boleta' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                onClick={() => seleccionarComprobante('Boleta')}
              >
                Boleta
              </button>
              <button
                className={`p-2 rounded-lg ${tipoComprobante === 'Factura' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                onClick={() => seleccionarComprobante('Factura')}
              >
                Factura
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-end items-end h-full">
            <div className="inline-block mt-6 text-right">
              <h3 className="text-xl font-bold">Total: ${total}</h3>
            </div>

            <div className="inline-block mt-6 text-right ml-4">
              <button onClick={() => console.log('Vender')} className="bg-blue-500 text-white p-2 rounded-lg">
                Vender
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Venta;
