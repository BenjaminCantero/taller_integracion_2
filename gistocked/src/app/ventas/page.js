'use client'; // Esto indica que este componente es un Client Component

import React, { useState } from 'react';
import SalesTable from '../components/SalesTable';

const SalesPage = () => {
  const [sales, setSales] = useState([
    { id: 1, producto: 'Monitor Samsung Curvo', cantidad: 2, total: 500, fecha: '08/10/2024' },
    { id: 2, producto: 'Teclado Logitech Gamer', cantidad: 1, total: 100, fecha: '07/10/2024' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInvoice, setIsInvoice] = useState(false);
  const [paymentMethodModal, setPaymentMethodModal] = useState(false);
  
  // Nuevo estado para manejar el formulario de nueva venta
  const [newSaleData, setNewSaleData] = useState({
    id: sales.length + 1,
    producto: '',
    cantidad: 1,
    total: 0,
    fecha: new Date().toLocaleDateString('es-ES'), // Cambiado para formato español
    precio: 0, // Precio del producto
  });
  
  const [isNewSaleModalOpen, setIsNewSaleModalOpen] = useState(false);

  const handleNewSale = () => {
    // Abre el modal para registrar nueva venta
    setIsNewSaleModalOpen(true);
  };

  const handleNewSaleSubmit = (e) => {
    e.preventDefault();
    
    // Agrega la nueva venta a la tabla
    const newSale = {
      ...newSaleData,
      total: newSaleData.cantidad * newSaleData.precio, // Calcula el total basado en cantidad y precio
    };

    setSales([...sales, newSale]);
    setNewSaleData({
      id: sales.length + 2, // Aumenta el ID basado en la longitud actual (más 1 porque se empieza desde 1)
      producto: '',
      cantidad: 1,
      total: 0,
      fecha: new Date().toLocaleDateString('es-ES'), // Cambiado para formato español
      precio: 0,
    });
    setIsNewSaleModalOpen(false); // Cierra el modal
  };

  const handleEditSale = (id) => {
    alert(`Editar venta con ID: ${id}`);
  };

  const handleDeleteSale = (id) => {
    const updatedSales = sales.filter((sale) => sale.id !== id);
    setSales(updatedSales);
  };

  const handleIncreaseQuantity = (id) => {
    const updatedSales = sales.map((sale) => 
      sale.id === id ? { ...sale, cantidad: sale.cantidad + 1, total: (sale.cantidad + 1) * (sale.total / sale.cantidad) } : sale
    );
    setSales(updatedSales);
  };

  const handleDecreaseQuantity = (id) => {
    const updatedSales = sales.map((sale) =>
      sale.id === id && sale.cantidad > 1 
        ? { ...sale, cantidad: sale.cantidad - 1, total: (sale.cantidad - 1) * (sale.total / sale.cantidad) } 
        : sale
    );
    setSales(updatedSales);
  };

  const handleSelectDocumentType = () => {
    setIsModalOpen(true); // Abre el modal para seleccionar Boleta o Factura
  };

  const handleInvoiceSubmit = (e) => {
    e.preventDefault();
    alert(`Factura generada para RUT: ${invoiceData.rut}, Razón Social: ${invoiceData.razonSocial}`);
    setIsModalOpen(false); // Cierra el modal
  };

  const handleSelectPaymentMethod = () => {
    setPaymentMethodModal(true); // Abre el modal para seleccionar el medio de pago
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Gestión de Ventas</h1>

      {/* Botón para registrar nueva venta */}
      <div className="mb-6">
        <button 
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleNewSale}
        >
          Registrar Nueva Venta
        </button>
      </div>

      {/* Tabla de ventas */}
      <SalesTable
        sales={sales.map(sale => ({
          ...sale,
          fecha: new Date(sale.fecha).toLocaleDateString('es-ES'), // Formatear fecha a día/mes/año
        }))}
        handleEditSale={handleEditSale}
        handleDeleteSale={handleDeleteSale}
        handleIncreaseQuantity={handleIncreaseQuantity}
        handleDecreaseQuantity={handleDecreaseQuantity}
      />

      {/* Modal para registrar nueva venta */}
      {isNewSaleModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={() => setIsNewSaleModalOpen(false)}>
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4">Registrar Nueva Venta</h2>
            <form onSubmit={handleNewSaleSubmit}>
              <label className="block mb-2">ID:</label>
              <input 
                type="number" 
                value={newSaleData.id}
                className="border rounded w-full py-2 px-3 mb-4"
                readOnly // Hacerlo solo lectura, ya que se asigna automáticamente
              />
              <label className="block mb-2">Producto:</label>
              <input 
                type="text" 
                value={newSaleData.producto}
                onChange={(e) => setNewSaleData({ ...newSaleData, producto: e.target.value })}
                className="border rounded w-full py-2 px-3 mb-4"
                required
              />
              <label className="block mb-2">Cantidad:</label>
              <input 
                type="number" 
                value={newSaleData.cantidad}
                onChange={(e) => setNewSaleData({ ...newSaleData, cantidad: Math.max(1, e.target.value) })}
                className="border rounded w-full py-2 px-3 mb-4"
                min="1"
                required
              />
              <label className="block mb-2">Precio:</label>
              <input 
                type="number" 
                value={newSaleData.precio}
                onChange={(e) => setNewSaleData({ ...newSaleData, precio: Math.max(0, e.target.value) })}
                className="border rounded w-full py-2 px-3 mb-4"
                min="0"
                required
              />
              <label className="block mb-2">Fecha:</label>
              <input 
                type="date" 
                value={newSaleData.fecha}
                onChange={(e) => setNewSaleData({ ...newSaleData, fecha: e.target.value })}
                className="border rounded w-full py-2 px-3 mb-4"
                required
              />
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Agregar Venta</button>
            </form>
          </div>
        </div>
      )}

      {/* Botones para seleccionar documento y medio de pago debajo de la tabla */}
      <div className="mt-6 flex justify-start space-x-4">
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSelectDocumentType}
        >
          Seleccionar Documento
        </button>
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSelectPaymentMethod}
        >
          Seleccionar Medio de Pago
        </button>
      </div>

      {/* Modal para seleccionar tipo de documento (Boleta o Factura) */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4">Seleccionar Tipo de Documento</h2>
            <div className="flex justify-between">
              <button
                onClick={() => {
                  setIsInvoice(false);
                  setIsModalOpen(false);
                }}
                className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded mr-2"
              >
                Boleta
              </button>
              <button
                onClick={() => {
                  setIsInvoice(true);
                  setIsModalOpen(false);
                }}
                className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
              >
                Factura
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para generar factura */}
      {isInvoice && isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4">Datos de la Factura</h2>
            <form onSubmit={handleInvoiceSubmit}>
              <label className="block mb-2">RUT:</label>
              <input type="text" className="border rounded w-full py-2 px-3 mb-4" />
              <label className="block mb-2">Razón Social:</label>
              <input type="text" className="border rounded w-full py-2 px-3 mb-4" />
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Generar Factura</button>
            </form>
          </div>
        </div>
      )}

      {/* Modal para seleccionar medio de pago */}
      {paymentMethodModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={() => setPaymentMethodModal(false)}>
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4">Seleccionar Medio de Pago</h2>
            <button
              onClick={() => setPaymentMethodModal(false)}
              className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded mr-2"
            >
              Efectivo
            </button>
            <button
              onClick={() => setPaymentMethodModal(false)}
              className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
            >
              Tarjeta
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesPage;
