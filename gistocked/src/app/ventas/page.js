'use client';

import BarcodeScanner from 'react-qr-barcode-scanner';
import React, { useState } from 'react';
import BarcodeScannerModal from '../components/CodigoDeBarras';
import SalesTable from '../components/SalesTable';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import axios from '../../app/api/services/axiosConfig';

const SalesPage = () => {
  const [sales, setSales] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInvoice, setIsInvoice] = useState(false);
  const [paymentMethodModal, setPaymentMethodModal] = useState(false);
  const [isNewSaleModalOpen, setIsNewSaleModalOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);


  const [newSaleData, setNewSaleData] = useState({
    producto: '',
    cantidad: 1,
    precio: 0,
    fecha: new Date().toLocaleDateString('es-ES'),
  });
  const handleEditSale = (id) => {
    const saleToEdit = sales.find((sale) => sale.id === id);
    if (saleToEdit) {
      setNewSaleData({
        producto: saleToEdit.producto,
        cantidad: saleToEdit.cantidad,
        precio: saleToEdit.precio,
        fecha: new Date(saleToEdit.fecha).toLocaleDateString('es-ES'),
      });
      setIsNewSaleModalOpen(true); // Abre el modal para editar la venta
    }
  };  
 
  React.useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get('/ventas');
        setSales(response.data);
      } catch (error) {
        console.error("Error al cargar las ventas:", error);
      }
    };
    fetchSales();
  }, []);

  const handleNewSaleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newSale = {
        ...newSaleData,
        total: newSaleData.cantidad * newSaleData.precio,
      };

      const response = await axios.post('/ventas', newSale);
      setSales([...sales, response.data]);
      
      setNewSaleData({
        producto: '',
        cantidad: 1,
        precio: 0,
        fecha: new Date().toLocaleDateString('es-ES'),
      });
      setIsNewSaleModalOpen(false);
    } catch (error) {
      alert("Error al añadir la venta");
    }
  };
  const handleNewSale = () => {
    // Abre el modal o el formulario para registrar una nueva venta
    setIsNewSaleModalOpen(true);
  };  
  const handleScan = async (data) => {
    if (data) {
      const scannedBarcode = data;
      try {
        const response = await axios.get(`/producto/${scannedBarcode}`);
        const producto = response.data;

        if (response.status === 200 && producto) {
          const newSale = {
            producto: producto.nombre,
            cantidad: 1,
            precio: producto.precio,
            total: producto.precio,
            fecha: new Date().toLocaleDateString('es-ES'),
          };
          setSales([...sales, newSale]);
          setIsScannerOpen(false);
        } else {
          alert('Producto no encontrado en la base de datos');
        }
      } catch (error) {
        alert('Error al conectar con la base de datos');
      }
    }
  };

  const handleIncreaseQuantity = async (id) => {
    const sale = sales.find((sale) => sale.id === id);
    if (!sale) return;

    const newQuantity = sale.cantidad + 1;
    try {
      const response = await axios.patch(`/producto/${sale.codigoBarras}`, {
        stock: sale.stock - 1,
      });

      if (response.status === 200) {
        const updatedSales = sales.map((sale) =>
          sale.id === id ? { ...sale, cantidad: newQuantity, total: newQuantity * sale.precio } : sale
        );
        setSales(updatedSales);
      }
    } catch (error) {
      alert('Error al actualizar la cantidad');
    }
  };

  const handleDecreaseQuantity = async (id) => {
    const sale = sales.find((sale) => sale.id === id);
    if (!sale || sale.cantidad <= 1) return;

    const newQuantity = sale.cantidad - 1;
    try {
      const response = await axios.patch(`/producto/${sale.codigoBarras}`, {
        stock: sale.stock + 1,
      });

      if (response.status === 200) {
        const updatedSales = sales.map((sale) =>
          sale.id === id ? { ...sale, cantidad: newQuantity, total: newQuantity * sale.precio } : sale
        );
        setSales(updatedSales);
      }
    } catch (error) {
      alert('Error al disminuir la cantidad');
    }
  };

  const generateInvoicePDF = async (venta) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); 
    const { width, height } = page.getSize();
  
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
    page.drawText('Razón Social Empresa', { x: 50, y: height - 50, size: 14, font: boldFont });
    page.drawText('Giro: Giro de la Empresa', { x: 50, y: height - 70, size: 10, font });
    page.drawText('Dirección de la Empresa', { x: 50, y: height - 85, size: 10, font });
    page.drawText('Comuna - Ciudad', { x: 50, y: height - 100, size: 10, font });
  
    page.drawText('R.U.T.: 99.999.999-9', { x: width - 200, y: height - 50, size: 10, font });
    page.drawText('FACTURA ELECTRONICA', { x: width - 200, y: height - 65, size: 12, font: boldFont, color: rgb(1, 0, 0) });
    page.drawText('N° 1111', { x: width - 200, y: height - 80, size: 12, font: boldFont });
    page.drawText('S.I.I.', { x: width - 200, y: height - 95, size: 10, font });
    page.drawText('Fecha Emisión: ' + venta.fecha, { x: width - 200, y: height - 110, size: 10, font });
  
    page.drawText('Señores: ' + venta.cliente.nombre, { x: 50, y: height - 130, size: 10, font });
    page.drawText('R.U.T.: ' + venta.cliente.rut, { x: 50, y: height - 145, size: 10, font });
    page.drawText('Giro: ' + venta.cliente.giro, { x: 50, y: height - 160, size: 10, font });
    page.drawText('Dirección: ' + venta.cliente.direccion, { x: 50, y: height - 175, size: 10, font });
    page.drawText('Comuna: ' + venta.cliente.comuna, { x: 50, y: height - 190, size: 10, font });
    page.drawText('Ciudad: ' + venta.cliente.ciudad, { x: 50, y: height - 205, size: 10, font });
    page.drawText('Contacto: ' + venta.cliente.contacto, { x: 50, y: height - 220, size: 10, font });
  
    const tableTop = height - 250;
    const cellPadding = 5;
    page.drawText('CÓDIGO', { x: 50, y: tableTop, size: 10, font: boldFont });
    page.drawText('DESCRIPCIÓN', { x: 120, y: tableTop, size: 10, font: boldFont });
    page.drawText('CANTIDAD', { x: 300, y: tableTop, size: 10, font: boldFont });
    page.drawText('PRECIO', { x: 400, y: tableTop, size: 10, font: boldFont });
    page.drawText('VALOR', { x: 500, y: tableTop, size: 10, font: boldFont });
  
    let yPosition = tableTop - 20;
    venta.productos.forEach((producto) => {
      page.drawText(producto.codigo, { x: 50, y: yPosition, size: 10, font });
      page.drawText(producto.descripcion, { x: 120, y: yPosition, size: 10, font });
      page.drawText(producto.cantidad.toString(), { x: 300, y: yPosition, size: 10, font });
      page.drawText('$ ' + producto.precio.toFixed(2), { x: 400, y: yPosition, size: 10, font });
      page.drawText('$ ' + (producto.cantidad * producto.precio).toFixed(2), { x: 500, y: yPosition, size: 10, font });
      yPosition -= 15;
    });
  
    const subtotal = venta.productos.reduce((acc, p) => acc + p.cantidad * p.precio, 0);
    const iva = subtotal * 0.19;
    const total = subtotal + iva;
  
    page.drawText('MONTO NETO $', { x: 400, y: yPosition - 20, size: 10, font });
    page.drawText(subtotal.toFixed(2), { x: 500, y: yPosition - 20, size: 10, font });
    page.drawText('I.V.A. 19% $', { x: 400, y: yPosition - 35, size: 10, font });
    page.drawText(iva.toFixed(2), { x: 500, y: yPosition - 35, size: 10, font });
    page.drawText('TOTAL $', { x: 400, y: yPosition - 50, size: 10, font: boldFont });
    page.drawText(total.toFixed(2), { x: 500, y: yPosition - 50, size: 10, font: boldFont });
  
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'boleta_o_factura.pdf';
    link.click();
  };

  
  const handleGenerateDocument = (sale) => {
    generateInvoicePDF(sale);
  };

  const handleDeleteSale = async (id) => {
    try {
      await axios.delete(`/ventas/${id}`);
      const updatedSales = sales.filter((sale) => sale.id !== id);
      setSales(updatedSales);
    } catch (error) {
      alert('Error al eliminar la venta');
    }
  };

  const handleSelectDocumentType = (tipoDocumento) => {
    setIsInvoice(tipoDocumento === 'factura');
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
  
      <div className="mb-6 space-x-4">
        <button 
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleNewSale}
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
              <button 
                type="button" 
                className="bg-gray-500 text-white py-2 px-4 rounded ml-2"
                onClick={() => setIsEditModalOpen(false)}
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
            <button 
              type="button" 
              className="mt-4 bg-gray-500 text-white py-2 px-4 rounded ml-2"
              onClick={() => setIsScannerOpen(false)}
            >
              Volver
            </button>
          </div>
        </div>
      )}
  
      <div className="mt-6 flex justify-start space-x-4">
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setIsModalOpen(true);
            setIsInvoice(false); // Inicialmente selecciona boleta
          }}
        >
          Generar Factura/Boleta
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
            <h2 className="text-2xl font-bold mb-4">Seleccionar Tipo de Documento</h2>
            <div className="mb-4">
              <button 
                className="bg-blue-500 text-white py-2 px-4 rounded mr-2" 
                onClick={() => {
                  setIsInvoice(true);
                  setIsModalOpen(false);
                }}
              >
                Factura
              </button>
              <button 
                className="bg-green-500 text-white py-2 px-4 rounded" 
                onClick={() => {
                  setIsInvoice(false);
                  setIsModalOpen(false);
                  alert("Boleta generada.");
                }}
              >
                Boleta
              </button>
              <button 
                type="button" 
                className="bg-gray-500 text-white py-2 px-4 rounded ml-2"
                onClick={() => setIsModalOpen(false)}
              >
                Volver
              </button>
            </div>
          </div>
        </div>
      )}
  
      {isInvoice && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Datos de Factura</h2>
            <form onSubmit={handleInvoiceSubmit}>
              <label className="block mb-2">RUT:</label>
              <input 
                type="text" 
                name="rut"
                className="border rounded w-full py-2 px-3 mb-4"
                required
              />
              <label className="block mb-2">Razón Social:</label>
              <input 
                type="text" 
                name="razonSocial"
                className="border rounded w-full py-2 px-3 mb-4"
                required
              />
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Generar Factura</button>
              <button 
                type="button" 
                className="bg-gray-500 text-white py-2 px-4 rounded ml-2"
                onClick={() => setIsInvoice(false)}
              >
                Volver
              </button>
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
};
export default SalesPage;