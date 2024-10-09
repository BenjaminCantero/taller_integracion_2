"use client";
import React, { useState } from 'react';

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
  const [formaPago, setFormaPago] = useState('');
  const [tipoComprobante, setTipoComprobante] = useState('');

  const agregarProductoAVenta = (producto) => {
    if (producto.stock > 0) {
      setTablaVentas(prev => {
        const nuevoTotal = prev[producto.nombre] ? prev[producto.nombre].cantidad + 1 : 1;
        
        // Verificamos que el nuevo total no exceda el stock
        if (nuevoTotal <= producto.stock) {
          return {
            ...prev,
            [producto.nombre]: {
              ...producto,
              cantidad: nuevoTotal,
            }
          };
        } else {
          console.log('No se puede agregar más productos, stock insuficiente.');
          return prev;
        }
      });
      setTotal(total + producto.precio);
    } else {
      console.log("Producto sin stock");
    }
  };

  const eliminarProductoDeVenta = (nombreProducto) => {
    setTablaVentas(prev => {
      const { [nombreProducto]: producto, ...resto } = prev;

      if (producto) {
        // Reducir el total en función de la cantidad del producto eliminado
        const nuevoTotal = total - (producto.precio * producto.cantidad);
        setTotal(nuevoTotal);
      }
      
      return resto;
    });
  };

  const reducirCantidadProducto = (nombreProducto) => {
    setTablaVentas(prev => {
      const producto = prev[nombreProducto];

      if (producto) {
        if (producto.cantidad > 1) {
          const nuevoTotal = total - producto.precio;
          setTotal(nuevoTotal);
          return {
            ...prev,
            [nombreProducto]: {
              ...producto,
              cantidad: producto.cantidad - 1,
            }
          };
        } else {
          eliminarProductoDeVenta(nombreProducto);
        }
      }
      return prev;
    });
  };

  const venderProducto = () => {
    const arrayCopiaProductos = [...productos];

    const productosEnVenta = Object.values(tablaVentas);
    for (const producto of productosEnVenta) {
      const indice = arrayCopiaProductos.findIndex(p => p.id === producto.id);
      if (indice !== -1) {
        arrayCopiaProductos[indice].stock -= producto.cantidad;
      }
    }

    console.log(arrayCopiaProductos);
    setProductos(arrayCopiaProductos);
    setTablaVentas({});
    setTotal(0); // Resetea el total después de la venta
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
    <div className="min-h-screen flex flex-col bg-gray-50 text-black">
      <div className="bg-gray-800 text-white py-4 px-6 w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Venta</h1>
        </div>
      </div>

      <div className="flex-grow container mx-auto py-10 px-4">
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
                    <div className="flex space-x-2">
                      <button
                        className="bg-red-500 text-white p-1 rounded-lg"
                        onClick={() => eliminarProductoDeVenta(nombre)}
                      >
                        Eliminar
                      </button>
                      <button
                        className="bg-yellow-500 text-white p-1 rounded-lg"
                        onClick={() => reducirCantidadProducto(nombre)}
                      >
                        ▼
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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

          <div className="mt-4">
            <h3 className="text-xl font-bold mb-2">Tipo de Comprobante:</h3>
            <div className="flex space-x-4">
              <button
                className={`p-2 rounded-lg ${tipoComprobante === 'Factura' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                onClick={() => seleccionarComprobante('Factura')}
              >
                Factura
              </button>
              <button
                className={`p-2 rounded-lg ${tipoComprobante === 'Boleta' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                onClick={() => seleccionarComprobante('Boleta')}
              >
                Boleta
              </button>
            </div>
          </div>

          <h3 className="text-2xl font-bold mt-4">Total: ${total}</h3>
          <button className="mt-6 bg-green-500 text-white p-2 rounded-lg" onClick={venderProducto}>
            Realizar Venta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Venta;
