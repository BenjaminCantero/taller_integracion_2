"use client";
import React, { useState } from 'react';
import { CURRENCY, DEFAULT_TOTAL } from '../../constants';

const Venta = () => {
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Guantes Quirúrgicos', precio: 1500, cantidad: 10 },
    { id: 2, nombre: 'Mascarillas N95', precio: 2500, cantidad: 20 },
    { id: 3, nombre: 'Jeringas 5ml', precio: 500, cantidad: 50 },
    { id: 4, nombre: 'Batas Desechables', precio: 3000, cantidad: 15 },
    { id: 5, nombre: 'Alcohol Gel 500ml', precio: 3500, cantidad: 8 },
    { id: 6, nombre: 'Termómetro Digital', precio: 7000, cantidad: 5 },
    { id: 7, nombre: 'Oxímetro de Pulso', precio: 9500, cantidad: 3 },
    { id: 8, nombre: 'Venda Elástica', precio: 1200, cantidad: 12 }
  ]);

  const [tablaVentas, setTablaVentas] = useState({});
  const [total, setTotal] = useState(DEFAULT_TOTAL);
  const [paymentOptionsVisible, setPaymentOptionsVisible] = useState(false);
  const [documentOptionsVisible, setDocumentOptionsVisible] = useState(false);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  const eliminarProducto = (id) => {
    setProductos(productos.filter(producto => producto.id !== id));
  };

  const agregarProductoAVenta = (producto) => {
    setTablaVentas(prev => {
      const nuevoTotal = prev[producto.nombre] ? prev[producto.nombre].cantidad + 1 : 1;
      const nuevoPrecio = prev[producto.nombre] ? prev[producto.nombre].precio + producto.precio : producto.precio;

      return {
        ...prev,
        [producto.nombre]: {
          ...producto,
          cantidad: nuevoTotal,
          precio: nuevoPrecio
        }
      };
    });
    setTotal(total + producto.precio);
  };

  const retirarProductoDeVenta = (nombre) => {
    setTablaVentas(prev => {
      const nuevaCantidad = prev[nombre].cantidad - 1;
      const nuevoTotal = total - prev[nombre].precio;

      if (nuevaCantidad === 0) {
        const { [nombre]: _, ...resto } = prev;
        setTotal(nuevoTotal);
        return resto;
      }

      setTotal(nuevoTotal);
      return {
        ...prev,
        [nombre]: {
          ...prev[nombre],
          cantidad: nuevaCantidad
        }
      };
    });
  };

  const seleccionarProducto = (index) => {
    if (productosSeleccionados.includes(index)) {
      setProductosSeleccionados(productosSeleccionados.filter(i => i !== index));
    } else {
      setProductosSeleccionados([...productosSeleccionados, index]);
    }
  };

  const retirarProductosSeleccionados = () => {
    let nuevoTotal = total;
    const nuevosProductos = { ...tablaVentas };

    productosSeleccionados.forEach(index => {
      const nombre = Object.keys(nuevosProductos)[index];
      if (nuevosProductos[nombre]) {
        nuevoTotal -= nuevosProductos[nombre].precio;
        delete nuevosProductos[nombre];
      }
    });

    setTablaVentas(nuevosProductos);
    setTotal(nuevoTotal);
    setProductosSeleccionados([]); 
  };

  const togglePaymentOptions = () => {
    setPaymentOptionsVisible(!paymentOptionsVisible);
  };

  const toggleDocumentOptions = () => {
    setDocumentOptionsVisible(!documentOptionsVisible);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Encabezado */}
      <div className="bg-gray-800 text-white py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <button className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <h1 className="text-2xl font-bold">Venta</h1>
        </div>
      </div>

      <div className="container mx-auto py-10 px-4">
        {/* Barra de búsqueda */}
        <div className="flex items-center mb-6">
          <input
            type="text"
            placeholder="Buscar"
            className="border border-gray-300 rounded-lg p-3 w-full mr-4"
          />
          <button className="bg-gray-200 p-3 rounded-lg text-black">Escáner QR</button>
          <button className="ml-2 bg-gray-200 p-3 rounded-lg text-black">Escáner de Barra</button>
        </div>

        {/* Lista de productos */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          {productos.map((producto) => (
            <div key={producto.id} className="flex justify-between items-center mb-4 border-b pb-2">
              <span className="font-medium">{producto.nombre}</span>
              <span>{CURRENCY}{producto.precio}</span>
              <span>{producto.cantidad}</span>
              <button className="text-green-500 mr-4" onClick={() => agregarProductoAVenta(producto)}>
                Agregar
              </button>
              <button className="text-red-500" onClick={() => eliminarProducto(producto.id)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Tabla de ventas */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="font-bold text-lg mb-4">Productos en la Venta</h2>
          {Object.values(tablaVentas).map((producto, index) => (
            <div key={index} className="flex justify-between items-center mb-4 border-b pb-2">
              <input
                type="checkbox"
                checked={productosSeleccionados.includes(index)}
                onChange={() => seleccionarProducto(index)}
              />
              <span className="font-medium">{producto.nombre} (x{producto.cantidad})</span>
              <span>{CURRENCY}{producto.precio}</span>
              {/* Botón para retirar uno de un producto */}
              {producto.cantidad > 1 && (
                <button className="text-red-500" onClick={() => retirarProductoDeVenta(producto.nombre)}>
                  Quitar Uno
                </button>
              )}
              {/* Botón para retirar completamente el producto */}
              {producto.cantidad === 1 && (
                <button className="text-red-500" onClick={() => retirarProductoDeVenta(producto.nombre)}>
                  Retirar
                </button>
              )}
            </div>
          ))}
          <button
            className="bg-red-500 text-white p-3 rounded-lg mt-4"
            onClick={retirarProductosSeleccionados}
            disabled={productosSeleccionados.length === 0}
          >
            Retirar Seleccionados
          </button>
        </div>

        {/* Métodos de pago */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button className="bg-gray-200 p-4 rounded-lg text-black" onClick={togglePaymentOptions}>
            {paymentOptionsVisible ? 'Cerrar Métodos de Pago' : 'Método de Pago'}
          </button>
          <button className="bg-gray-200 p-4 rounded-lg text-black" onClick={toggleDocumentOptions}>
            {documentOptionsVisible ? 'Cerrar Opciones de Documento' : 'Boleta/Factura'}
          </button>
        </div>

        {/* Opciones de pago */}
        {paymentOptionsVisible && (
          <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
            <h2 className="font-bold text-lg mb-4">Seleccionar Método de Pago</h2>
            <button className="bg-gray-500 text-white p-3 rounded-lg w-full mb-2">Efectivo</button>
            <button className="bg-gray-500 text-white p-3 rounded-lg w-full">Tarjeta de Crédito/Débito</button>
          </div>
        )}

        {/* Opciones de documento */}
        {documentOptionsVisible && (
          <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
            <h2 className="font-bold text-lg mb-4">Opciones de Documento</h2>
            <button className="bg-gray-500 text-white p-3 rounded-lg w-full mb-2">Generar Boleta</button>
            <button className="bg-gray-500 text-white p-3 rounded-lg w-full">Generar Factura</button>
          </div>
        )}

        {/* Total */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="font-bold text-lg">Total: {CURRENCY}{total}</h2>
        </div>
      </div>
    </div>
  );
};

export default Venta;
