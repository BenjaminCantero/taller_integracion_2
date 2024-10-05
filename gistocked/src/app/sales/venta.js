"use client";

import React, { useState, useEffect } from 'react';
import { CURRENCY, DEFAULT_TOTAL } from '../../constants';

const Venta = () => {

  const [data, setData] = useState([
    { id: 1, nombre: 'Guantes Quirúrgicos', precio: 1500, stock: 50 },
    { id: 2, nombre: 'Mascarillas N95', precio: 2500, stock: 50 },
    { id: 3, nombre: 'Jeringas 5ml', precio: 500, stock: 50 },
    { id: 4, nombre: 'Batas Desechables', precio: 3000, stock: 50 },
    { id: 5, nombre: 'Alcohol Gel 500ml', precio: 3500, stock: 50 },
    { id: 6, nombre: 'Termómetro Digital', precio: 7000, stock: 50 },
    { id: 7, nombre: 'Oxímetro de Pulso', precio: 9500, stock: 50 },
    { id: 8, nombre: 'Venda Elástica', precio: 1200, stock: 50 }
  ]);

  let [productos, setProductos] = useState([]);

  {/* ---------------------------------------------------------------------------- */}
  {/* ---------------------------------------------------------------------------- */}
  {/* ---------------------------------------------------------------------------- */}

  function shuffleElements(data) {
      let aux = data.slice();

      for (let i = aux.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [aux[i], aux[j]] = [aux[j], aux[i]];
      }
  
      let selected = aux.slice(0, 8);
  
      // Eliminar elementos con stock igual a 0
      selected = selected.filter(item => item.stock > 0);
  
      for (let j = 0; j < selected.length; j++) {
        selected[j].cantidad = Math.floor(Math.random() * selected[j].stock) + 1;
      }
  
      return selected;
  }


  const agregarProducto = () => {
    setProductos(shuffleElements(data));
  }


  const calculaTotal = () => {
    let total = 0
    for (let i = 0; i < productos.length; i++) {
      total += productos[i].precio * productos[i].cantidad;
    }
    return total;
  }


  const eliminarProducto = (id) => {
    setProductos(productos.filter(producto => producto.id !== id));
  };


  const venderProducto = () => {
    const updatedData = [...data]; // Copia del estado original
    for (let i = 0; i < productos.length; i++) {
        updatedData[productos[i].id - 1].stock -= productos[i].cantidad;
    }

    setData(updatedData); // Actualiza el estado con el nuevo stock
    setProductos([]); // Limpia productos
    
    console.log(updatedData);
  };

  {/* ---------------------------------------------------------------------------- */}
  {/* ---------------------------------------------------------------------------- */}
  {/* ---------------------------------------------------------------------------- */}

  const [total, setTotal] = useState(DEFAULT_TOTAL);
  const [paymentOptionsVisible, setPaymentOptionsVisible] = useState(false);
  const [documentOptionsVisible, setDocumentOptionsVisible] = useState(false);


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
            <div className="flex mb-2 border-b pb-2">
              {/* 
              <span className="font-medium flex-1">PRODUCTO</span>
              <span className="flex-none w-24 text-left font-medium">PRECIO</span>
              <span className="flex-none w-16 text-left font-medium">CANTIDAD</span>
              */}
            </div>

            {productos.map((producto) => (
                <div key={producto.id} className="flex justify-between items-center mb-4 border-b pb-2">
                  <span className="flex-1">{producto.nombre}</span>
                  <span className="flex-none w-24 text-left">{CURRENCY}{producto.precio}</span>
                  <span className="flex-none w-16 text-left">{producto.cantidad}</span>

                  <button className="text-red-500" onClick={() => eliminarProducto(producto.id)}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                  </button>
                </div>
            ))}
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
            <button className="bg-blue-500 text-white p-3 rounded-lg w-full mb-2">Crédito</button>
            <button className="bg-green-500 text-white p-3 rounded-lg w-full mb-2">Débito</button>
            <button className="bg-yellow-500 text-white p-3 rounded-lg w-full mb-2">Depósito</button>
            <button className="bg-gray-500 text-white p-3 rounded-lg w-full">Cheque</button>
          </div>
        )}

        {/* Opciones de documento */}
        {documentOptionsVisible && (
          <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
            <h2 className="font-bold text-lg mb-4">Seleccionar Documento</h2>
            <button className="bg-blue-500 text-white p-3 rounded-lg w-full mb-2">Boleta</button>
            <button className="bg-green-500 text-white p-3 rounded-lg w-full">Factura</button>
          </div>
        )}

        {/* Total y botones */}
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg mb-6">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">Total:</span>
            <span className="text-2xl font-bold">{CURRENCY}{calculaTotal()}</span>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-red-500 text-white p-4 rounded-lg">Cancelar</button>
          <button onClick={venderProducto} className="bg-green-500 text-white p-4 rounded-lg">Vender</button>
          <button onClick={agregarProducto} className="bg-yellow-500 text-white p-4 rounded-lg">Agregar</button>
        </div>
      </div>
    </div>
  );
};

export default Venta;
