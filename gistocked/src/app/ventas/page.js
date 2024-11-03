'use client';

import BarcodeScanner from 'react-qr-barcode-scanner';
import React, { useState } from 'react';
import SalesTable from '../components/SalesTable';
import axios from '../../app/api/services/axiosConfig';
import { getProductos, addProducto, updateProducto, deleteProducto } from '../api/services/apiServices';
import jsPDF from 'jspdf';
import { generateInvoicePDF, generateReceiptPDF } from '../ventas/pdfUtils';

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
  const [formData, setFormData] = useState({
    tipoDocumento: 'boleta',
    rut: '',
    razonSocial: '',
    direccion: '',
    telefono: '',
    productos: [],
    total: 0,
  });
  


  React.useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get('http://190.114.252.218:8000/api/ventas/');
        setSales(response.data);
      } catch (error) {
        console.error("Error al cargar las ventas:", error);
      }
    };
    fetchSales();
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

  const handleNewSaleSubmit = async () => {
    if (!newSaleData.producto || newSaleData.cantidad <= 0 || newSaleData.precio <= 0) {
      alert("Por favor, completa todos los campos de producto, cantidad y precio correctamente.");
      return;
    }

    try {
      const response = await addProducto(newSaleData); // Usando addProducto para agregar una nueva venta
      setSales([...sales, response]);
      alert("Producto agregado con éxito.");
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      alert("No se pudo agregar el producto. Por favor, verifica los datos.");
    }
  };

  const handleNewSale = () => {
    setIsNewSaleModalOpen(true);
  };

  const handleScan = async (data) => {
    if (data) {
      const scannedBarcode = data;
      try {
        const response = await getInventario(); // Obteniendo el inventario completo
        const producto = response.data.find(item => item.codigoBarras === scannedBarcode);
  
        if (producto) {
          if (producto.stock > 0) {
            const newSale = {
              producto: producto.nombre,
              cantidad: 1,
              precio: producto.precio,
              total: producto.precio,
              fecha: new Date().toLocaleDateString('es-ES'),
            };
  
            // Descontar stock del producto en el inventario
            await updateProducto(producto.id, { stock: producto.stock - 1 });
  
            setSales([...sales, newSale]);
            setIsScannerOpen(false);
          } else {
            alert('Producto sin stock');
          }
        } else {
          alert('Producto no encontrado en la base de datos');
        }
      } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        alert('Error al conectar con la base de datos');
      }
    }
  };
  

  const handleIncreaseQuantity = async (id) => {
    const sale = sales.find((sale) => sale.id === id);
    if (!sale) return;
  
    const response = await getInventario();
    const producto = response.data.find(item => item.nombre === sale.producto);
  
    if (producto && producto.stock > 0) {
      try {
        await updateProducto(producto.id, { stock: producto.stock - 1 });
        const updatedSales = sales.map((sale) =>
          sale.id === id ? { ...sale, cantidad: sale.cantidad + 1, total: (sale.cantidad + 1) * sale.precio } : sale
        );
        setSales(updatedSales);
      } catch (error) {
        alert('Error al aumentar la cantidad');
      }
    } else {
      alert('No hay suficiente stock');
    }
  };
  
  const handleDecreaseQuantity = async (id) => {
    const sale = sales.find((sale) => sale.id === id);
    if (!sale || sale.cantidad <= 1) return;
  
    try {
      const response = await getInventario();
      const producto = response.data.find(item => item.nombre === sale.producto);
  
      if (producto) {
        // Incrementar el stock en el inventario al disminuir la cantidad en la venta
        await updateProducto(producto.id, { stock: producto.stock + 1 });
  
        const updatedSales = sales.map((sale) =>
          sale.id === id ? { ...sale, cantidad: sale.cantidad - 1, total: (sale.cantidad - 1) * sale.precio } : sale
        );
        setSales(updatedSales);
      } else {
        alert('Producto no encontrado en el inventario');
      }
    } catch (error) {
      console.error('Error al disminuir la cantidad:', error);
      alert('Error al disminuir la cantidad');
    }
  };
  

  const handleDeleteSale = async (id) => {
    const sale = sales.find((sale) => sale.id === id);
    if (!sale) return;
  
    try {
      const response = await getInventario();
      const producto = response.data.find(item => item.nombre === sale.producto);
  
      if (producto) {
        // Devolver el stock al inventario al eliminar la venta
        await updateProducto(producto.id, { stock: producto.stock + sale.cantidad });
  
        // Eliminar la venta de la lista
        const updatedSales = sales.filter((sale) => sale.id !== id);
        setSales(updatedSales);
  
        alert('Venta eliminada con éxito.');
      } else {
        alert('Producto no encontrado en el inventario');
      }
    } catch (error) {
      console.error('Error al eliminar la venta:', error);
      alert('No se pudo eliminar la venta. Por favor, intenta de nuevo.');
    }
  };
  


  const handleGenerateDocument = async () => {
    // Define la variable venta con la información necesaria
    const venta = {
      rut: formData.rut,
      razonSocial: formData.razonSocial,
      direccion: formData.direccion,
      telefono: formData.telefono,
      productos: formData.productos,
      total: formData.total,
    };

    if (isInvoice) {
      const pdfBytes = await generateInvoicePDF(venta);
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `factura.pdf`;
      link.click();
    } else {
      const pdfBytes = await generateReceiptPDF(venta, 'boleta');
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `boleta.pdf`;
      link.click();
    }
  };

  // Definición de la función para alternar entre factura y boleta
  const toggleDocumentType = () => {
    setIsInvoice(!isInvoice); // Cambia entre factura y boleta
    setFormData({ ...formData, tipoDocumento: isInvoice ? 'boleta' : 'factura' }); // Actualiza el tipo de documento en el estado
  };

  const handleInvoiceSubmit = (e) => {
    e.preventDefault();
    alert(`Factura generada para RUT: ${e.target.rut.value}, Razón Social: ${e.target.razonSocial.value}`);
    setIsModalOpen(false);
  };

  const handleSelectPaymentMethod = () => {
    setPaymentMethodModal(true);
  };


const FormularioFacturaBoleta = () => {
  const [formData, setFormData] = useState({
    tipoDocumento: 'boleta', // o 'factura'
    rut: '',
    razonSocial: '',
    direccion: '',
    telefono: '',
    productos: [],
    total: 0,
  });

  const [producto, setProducto] = useState({
    nombre: '',
    cantidad: 0,
    precio: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProductoChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const agregarProducto = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      productos: [...prevFormData.productos, { ...producto, cantidad: Number(producto.cantidad), precio: Number(producto.precio) }],
      total: prevFormData.total + producto.cantidad * producto.precio,
    }));
    setProducto({ nombre: '', cantidad: 0, precio: 0 });
  };

  const generarPDF = () => {
    const doc = new jsPDF();

    // Título del documento
    doc.setFontSize(18);
    doc.text(`Documento: ${formData.tipoDocumento.toUpperCase()}`, 10, 10);

    // Información del cliente
    doc.setFontSize(12);
    doc.text(`RUT: ${formData.rut}`, 10, 20);
    doc.text(`Razón Social: ${formData.razonSocial}`, 10, 30);
    doc.text(`Dirección: ${formData.direccion}`, 10, 40);
    doc.text(`Teléfono: ${formData.telefono}`, 10, 50);

    // Tabla de productos
    doc.text('Productos:', 10, 60);
    formData.productos.forEach((prod, index) => {
      doc.text(
        `${index + 1}. ${prod.nombre} - Cantidad: ${prod.cantidad} - Precio: ${prod.precio} - Total: ${prod.cantidad * prod.precio}`,
        10,
        70 + index * 10
      );
    });

    // Total general
    doc.text(`Total: ${formData.total.toFixed(2)}`, 10, 70 + formData.productos.length * 10);

    // Guardar el PDF
    doc.save(`${formData.tipoDocumento}.pdf`);
  };
}

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Gestión de Ventas</h1>
  
      <div className="mb-6 space-x-4">
        <button 
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
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
            <h2 className="text-2xl font-bold mb-4">Datos de {isInvoice ? 'Factura' : 'Boleta'}</h2>
            <button 
              className={`mb-4 py-2 px-4 rounded ${isInvoice ? 'bg-blue-500' : 'bg-gray-300'}`}
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
                  value ={formData.direccion} onChange={(e) => setFormData({ ...formData, direccion: e.target.value })} required />
            <label className="block mb-2">Teléfono:</label>
            <input type="text" name="telefono" className="border rounded w-full py-2 px-3 mb-4" 
                  value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} required />
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Generar {isInvoice ? 'Factura' : 'Boleta'}</button>
            <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded ml-2" onClick={() => setIsModalOpen(false)}>Volver</button>
          </form>
        </div>
      </div>
    )}
  
    {isInvoice && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <h2 className="text-2xl font-bold mb-4">Datos de Factura</h2>
          <form onSubmit={handleInvoiceSubmit}>
            <label className="block mb-2">RUT:</label>
            <input type="text" name="rut" className="border rounded w-full py-2 px-3 mb-4" required />
            <label className="block mb-2">Razón Social:</label>
            <input type="text" name="razonSocial" className="border rounded w-full py-2 px-3 mb-4" required />
            <button type="button"
                      onClick={() => {
                        generateInvoicePDF(false);
                        setIsModalOpen(false);
                      }}
              className="bg-blue-500 text-white py-2 px-4 rounded">Generar Factura</button>
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
