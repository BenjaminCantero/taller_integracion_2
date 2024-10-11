'use client';

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
  const [isNewSaleModalOpen, setIsNewSaleModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSale, setEditingSale] = useState(null);

  const [newSaleData, setNewSaleData] = useState({
    id: sales.length + 1,
    producto: '',
    cantidad: 1,
    total: 0,
    fecha: new Date().toLocaleDateString('es-ES'),
    precio: 0,
  });

  const handleNewSale = () => {
    setIsNewSaleModalOpen(true);
  };

  const handleNewSaleSubmit = (e) => {
    e.preventDefault();
    
    const newSale = {
      ...newSaleData,
      total: newSaleData.cantidad * newSaleData.precio,
    };

    setSales([...sales, newSale]);
    setNewSaleData({
      id: sales.length + 2,
      producto: '',
      cantidad: 1,
      total: 0,
      fecha: new Date().toLocaleDateString('es-ES'),
      precio: 0,
    });
    setIsNewSaleModalOpen(false);
  };

  const handleEditSale = (id) => {
    const saleToEdit = sales.find(sale => sale.id === id);
    setEditingSale(saleToEdit);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedSales = sales.map(sale => 
      sale.id === editingSale.id ? editingSale : sale
    );
    setSales(updatedSales);
    setIsEditModalOpen(false);
    setEditingSale(null);
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
    setIsModalOpen(true);
  };

  const handleInvoiceSubmit = (e) => {
    e.preventDefault();
    alert(`Factura generada para RUT: ${e.target.rut.value}, Razón Social: ${e.target.razonSocial.value}`);
    setIsModalOpen(false);
  };

  const handleSelectPaymentMethod = () => {
    setPaymentMethodModal(true);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Gestión de Ventas</h1>

      <div className="mb-6">
        <button 
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleNewSale}
        >
          Registrar Nueva Venta
        </button>
      </div>

      <SalesTable
        sales={sales.map(sale => ({
          ...sale,
          fecha: new Date(sale.fecha).toLocaleDateString('es-ES'),
        }))}
        handleEditSale={handleEditSale}
        handleDeleteSale={handleDeleteSale}
        handleIncreaseQuantity={handleIncreaseQuantity}
        handleDecreaseQuantity={handleDecreaseQuantity}
      />

      {isNewSaleModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={() => setIsNewSaleModalOpen(false)}>
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4">Registrar Nueva Venta</h2>
            <form onSubmit={handleNewSaleSubmit}>
              {/* ... (campos del formulario de nueva venta) ... */}
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Agregar Venta</button>
            </form>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={() => setIsEditModalOpen(false)}>
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4">Editar Venta</h2>
            <form onSubmit={handleEditSubmit}>
              <label className="block mb-2">Producto:</label>
              <input 
                type="text" 
                value={editingSale.producto}
                onChange={(e) => setEditingSale({ ...editingSale, producto: e.target.value })}
                className="border rounded w-full py-2 px-3 mb-4"
                required
              />
              <label className="block mb-2">Cantidad:</label>
              <input 
                type="number" 
                value={editingSale.cantidad}
                onChange={(e) => setEditingSale({ ...editingSale, cantidad: Math.max(1, parseInt(e.target.value)) })}
                className="border rounded w-full py-2 px-3 mb-4"
                min="1"
                required
              />
              <label className="block mb-2">Precio:</label>
              <input 
                type="number" 
                value={editingSale.total / editingSale.cantidad}
                onChange={(e) => setEditingSale({ ...editingSale, total: e.target.value * editingSale.cantidad })}
                className="border rounded w-full py-2 px-3 mb-4"
                min="0"
                required
              />
              <label className="block mb-2">Fecha:</label>
              <input 
                type="date" 
                value={editingSale.fecha}
                onChange={(e) => setEditingSale({ ...editingSale, fecha: e.target.value })}
                className="border rounded w-full py-2 px-3 mb-4"
                required
              />
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Guardar Cambios</button>
            </form>
          </div>
        </div>
      )}

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

      {isInvoice && isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4">Datos de la Factura</h2>
            <form onSubmit={handleInvoiceSubmit}>
              <label className="block mb-2">RUT:</label>
              <input name="rut" type="text" className="border rounded w-full py-2 px-3 mb-4" />
              <label className="block mb-2">Razón Social:</label>
              <input name="razonSocial" type="text" className="border rounded w-full py-2 px-3 mb-4" />
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Generar Factura</button>
            </form>
          </div>
        </div>
      )}

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