"use client";
import React, { useState } from 'react';

const Venta = () => {
  const [productos, setProductos] = useState([]);
  const [tablaVentas, setTablaVentas] = useState({});
  const [total, setTotal] = useState(0);
  const [codigoBarras, setCodigoBarras] = useState('');
  const [escanerVisible, setEscanerVisible] = useState(false);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [formaPago, setFormaPago] = useState('');
  const [tipoComprobante, setTipoComprobante] = useState('');

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

  const manejarEscaneo = (e) => {
    if (e.key === 'Enter' && codigoBarras.trim() !== '') {
      const producto = productos.find(p => p.id.toString() === codigoBarras);
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
    <div>
      {/* Funciones para agregar el contenido */}
    </div>
  );
};

export default Venta;
