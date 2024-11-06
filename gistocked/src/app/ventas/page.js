'use client';

import React, { useState, useEffect } from 'react';
import BarcodeScanner from 'react-qr-barcode-scanner';
import SalesTable from '../components/SalesTable';
import axios from '../../app/api/services/axiosConfig';
import { generateInvoicePDF, generateReceiptPDF } from '../ventas/pdfUtils';

export default function Component() {
  const [sales, setSales] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productos, setProductos] = useState([]);
  const [isInvoice, setIsInvoice] = useState(false);
  const [paymentMethodModal, setPaymentMethodModal] = useState(false);
  const [isNewSaleModalOpen, setIsNewSaleModalOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [newSaleData, setNewSaleData] = useState({
    producto: '',
    cantidad: 1,
    precio: 0,
    fecha: new Date().toLocaleDateString('es-ES'),
    vendedorNombre: '',
  });
  const [formData, setFormData] = useState({
    tipoDocumento: 'boleta',
    rut: '',
    razonSocial: '',
    direccion: '',
    telefono: '',
    productos: [],
    total: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesResponse = await axios.get('http://190.114.252.218:8000/api/ventas/');
        const productosResponse = await axios.get('http://190.114.252.218:8000/api/inventarios/');
        
        setSales(salesResponse.data);
        setProductos(productosResponse.data);
        
        localStorage.setItem('sales', JSON.stringify(salesResponse.data));
        localStorage.setItem('productos', JSON.stringify(productosResponse.data));
        
        setIsOffline(false);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        const localSales = localStorage.getItem('sales');
        const localProductos = localStorage.getItem('productos');
        
        if (localSales) setSales(JSON.parse(localSales));
        if (localProductos) setProductos(JSON.parse(localProductos));
        
        setIsOffline(true);
      }
    };

    fetchData();

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleEditSale = (id) => {
    const saleToEdit = sales.find((sale) => sale.id === id);
    if (saleToEdit) {
      setNewSaleData({
        producto: saleToEdit.producto,
        cantidad: saleToEdit.cantidad,
        precio: saleToEdit.precio,
        fecha: new Date(saleToEdit.fecha).toLocaleDateString('es-ES'),
      });
      setIsNewSaleModalOpen(true);
    }
  };

  const handleNewSaleSubmit = async (e) => {
    e.preventDefault();
    if (!newSaleData.producto || newSaleData.cantidad <= 0 || newSaleData.precio <= 0) {
      alert("Por favor, completa todos los campos de producto, cantidad y precio correctamente.");
      return;
    }

    const newSale = {
      ...newSaleData,
      id: Date.now(),
      total: newSaleData.cantidad * newSaleData.precio,
    };

    try {
      if (!isOffline) {
        const response = await axios.post('http://190.114.252.218:8000/api/ventas/', newSale);
        setSales([...sales, response.data]);
      } else {
        setSales([...sales, newSale]);
      }
      
      localStorage.setItem('sales', JSON.stringify([...sales, newSale]));
      
      setIsNewSaleModalOpen(false);
      setNewSaleData({ producto: '', cantidad: 1, precio: 0, fecha: new Date().toLocaleDateString('es-ES'), vendedorNombre: '' });
      alert("Venta registrada con éxito.");
    } catch (error) {
      console.error("Error al registrar la venta:", error);
      alert("No se pudo registrar la venta. Se guardará localmente.");
      setSales([...sales, newSale]);
      localStorage.setItem('sales', JSON.stringify([...sales, newSale]));
    }
  };

  const handleScan = async (data) => {
    if (data) {
      const scannedBarcode = data;
      const producto = productos.find(item => item.codigoBarras === scannedBarcode);
  
      if (producto) {
        if (producto.stock > 0) {
          const newSale = {
            id: Date.now(),
            producto: producto.nombre,
            cantidad: 1,
            precio: producto.precio,
            total: producto.precio,
            fecha: new Date().toLocaleDateString('es-ES'),
            vendedorNombre: newSaleData.vendedorNombre,
          };
  
          setSales([...sales, newSale]);
          localStorage.setItem('sales', JSON.stringify([...sales, newSale]));
          
          if (!isOffline) {
            try {
              await axios.post('http://190.114.252.218:8000/api/ventas/', newSale);
              await axios.patch(`http://190.114.252.218:8000/api/inventarios/${producto.id}`, { stock: producto.stock - 1 });
            } catch (error) {
              console.error('Error al actualizar la API:', error);
            }
          }
          
          setIsScannerOpen(false);
        } else {
          alert('Producto sin stock');
        }
      } else {
        alert('Producto no encontrado en la base de datos');
      }
    }
  };
  
  const handleIncreaseQuantity = async (id) => {
    const updatedSales = sales.map((sale) => {
      if (sale.id === id) {
        return { ...sale, cantidad: sale.cantidad + 1, total: (sale.cantidad + 1) * sale.precio };
      }
      return sale;
    });
    
    setSales(updatedSales);
    localStorage.setItem('sales', JSON.stringify(updatedSales));
    
    if (!isOffline) {
      try {
        await axios.patch(`http://190.114.252.218:8000/api/ventas/${id}`, { cantidad: updatedSales.find(s => s.id === id).cantidad });
      } catch (error) {
        console.error('Error al actualizar la cantidad en la API:', error);
      }
    }
  };
  
  const handleDecreaseQuantity = async (id) => {
    const updatedSales = sales.map((sale) => {
      if (sale.id === id && sale.cantidad > 1) {
        return { ...sale, cantidad: sale.cantidad - 1, total: (sale.cantidad - 1) * sale.precio };
      }
      return sale;
    });
    
    setSales(updatedSales);
    localStorage.setItem('sales', JSON.stringify(updatedSales));
    
    if (!isOffline) {
      try {
        await axios.patch(`http://190.114.252.218:8000/api/ventas/${id}`, { cantidad: updatedSales.find(s => s.id === id).cantidad });
      } catch (error) {
        console.error('Error al actualizar la cantidad en la API:', error);
      }
    }
  };
  
  const handleDeleteSale = async (id) => {
    const updatedSales = sales.filter((sale) => sale.id !== id);
    setSales(updatedSales);
    localStorage.setItem('sales', JSON.stringify(updatedSales));
    
    if (!isOffline) {
      try {
        await axios.delete(`http://190.114.252.218:8000/api/ventas/${id}`);
      } catch (error) {
        console.error('Error al eliminar la venta en la API:', error);
      }
    }
    
    alert('Venta eliminada con éxito.');
  };

  const handleGenerateDocument = async () => {
    const venta = {
      ...formData,
      productos: sales,
      total: sales.reduce((acc, sale) => acc + sale.total, 0),
      fecha: new Date().toLocaleDateString('es-ES'),
    };

    if (isInvoice) {
      await generateInvoicePDF(venta);
    } else {
      await generateReceiptPDF(venta, 'boleta');
    }
  };

  const toggleDocumentType = () => {
    setIsInvoice(!isInvoice);
    setFormData({ ...formData, tipoDocumento: isInvoice ? 'boleta' : 'factura' });
  };

  const handleSelectPaymentMethod = () => {
    setPaymentMethodModal(true);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Gestión de Ventas</h1>
      {isOffline && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
          <p className="font-bold">Modo sin conexión</p>
          <p>Estás trabajando sin conexión. Los cambios se guardarán localmente y se sincronizarán cuando vuelvas a estar en línea.</p>
        </div>
      )}
      <div className="mb-6 space-x-4">
        <button 
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsNewSaleModalOpen(true)}
        >
          Registrar Nueva Venta
        </button>
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsScannerOpen(true)}
        >
          Escanear Código de Barras
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
                onChange={(e) => setNewSaleData({ ...newSaleData, cantidad: Math.max(1, parseInt(e.target.value)) })}
                className="border rounded w-full py-2 px-3 mb-4"
                min="1"
                required
              />
              <label className="block mb-2">Precio Unitario:</label>
              <input 
                type="number" 
                value={newSaleData.precio}
                onChange={(e) => setNewSaleData({ ...newSaleData, precio: parseFloat(e.target.value) })}
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
              <button 
                type="button" 
                className="bg-gray-500 text-white py-2 px-4 rounded ml-2"
                onClick={() => setIsNewSaleModalOpen(false)}
              >
                Volver
              </button>
            </form>
          </div>
        </div>
      )}

      {isScannerOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={() => setIsScannerOpen(false)}>
          <div className="bg-white p-6 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4">Escanear Código de Barras</h2>
            <BarcodeScanner
              onUpdate={(err, result) => {
                if (result) handleScan(result);
              }}
            />
            <button 
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsScannerOpen(false)}
            >
              Cerrar Escáner
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-start space-x-4">
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Generar {isInvoice ? 'Factura' : 'Boleta'}
        </button>
        <button 
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSelectPaymentMethod}
        >
          Seleccionar Medio de Pago
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Datos de {isInvoice ? 'Factura' : 'Boleta'}</h2>
            <button 
              className={`mb-4 py-2 px-4 rounded ${isInvoice ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
              onClick={toggleDocumentType}
            >
              {isInvoice ? 'Cambiar a Boleta' : 'Cambiar a Factura'}
            </button>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleGenerateDocument();
            }}>
              {isInvoice && (
                <>
                  <label className="block mb-2">RUT:</label>
                  <input type="text" name="rut" className="border rounded w-full py-2 px-3 mb-4" 
                        value={formData.rut} onChange={(e) => setFormData({ ...formData, rut: e.target.value })} required />
                  <label className="block mb-2">Razón Social:</label>
                  <input type="text" name="razonSocial" className="border rounded w-full py-2 px-3 mb-4" 
                        value={formData.razonSocial} onChange={(e) => setFormData({ ...formData, razonSocial: e.target.value })} required />
                </>
              )}
              <label className="block mb-2">Dirección:</label>
              <input type="text" name="direccion" className="border rounded w-full py-2 px-3 mb-4" 
                    value={formData.direccion} onChange={(e) => setFormData({ ...formData, direccion: e.target.value })} required />
              <label className="block mb-2">Teléfono:</label>
              <input type="text" name="telefono" className="border rounded w-full py-2 px-3 mb-4" 
                    value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} required />
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Generar {isInvoice ? 'Factura' : 'Boleta'}</button>
              <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded ml-2" onClick={() => setIsModalOpen(false)}>Volver</button>
            </form>
          </div>
        </div>
      )}

      {paymentMethodModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={() => setPaymentMethodModal(false)}>
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4">Seleccionar Medio de Pago</h2>
            <form>
              <label className="block mb-2">Medio de Pago:</label>
              <select className="border rounded w-full py-2 px-3 mb-4">
                <option value="efectivo">Efectivo</option>
                <option value="tarjeta">Tarjeta</option>
                <option value="transferencia">Transferencia</option>
              </select>
              <button type="button" className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => alert('Medio de pago seleccionado')}>Seleccionar</button>
              <button
                type="button"
                className="bg-gray-500 text-white py-2 px-4 rounded ml-2"
                onClick={() => setPaymentMethodModal(false)}
              >
                Volver
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}