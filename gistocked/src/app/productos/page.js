"use client"; // Marca el componente como de cliente

import React, { useEffect, useState } from 'react';

const Page = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    img: '',
    nombre_producto: '',
    descripcion: '',
    precio_compra: 0,
    porcentaje_de_ganancia: 0,
    precio_neto: 0,
    precio_venta: 0,
    precio_venta_final: 0,
    codigo: '',
    id_categoria: 0,
    descuento: 0,
    cantidad: 0,
  });

  // Obtener productos del backend
  const obtenerProductos = async () => {
    try {
      const response = await fetch('./products'); // Usar ruta relativa
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  // Manejo de cambios en el formulario
  const manejarCambio = (e) => {
    setNuevoProducto({
      ...nuevoProducto,
      [e.target.name]: e.target.value,
    });
  };

  // Manejo del cambio de la imagen
  const manejarCargaImagen = (e) => {
    setNuevoProducto({
      ...nuevoProducto,
      img: URL.createObjectURL(e.target.files[0]),
    });
  };

  // Añadir producto al backend
  const añadirProducto = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('./products', { // Usar ruta relativa
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoProducto),
      });
      if (response.ok) {
        const productoAñadido = await response.json();
        setProductos([...productos, productoAñadido]); // Actualizar la lista de productos
        setNuevoProducto({ // Resetear el formulario después de añadir
          img: '',
          nombre_producto: '',
          descripcion: '',
          precio_compra: 0,
          porcentaje_de_ganancia: 0,
          precio_neto: 0,
          precio_venta: 0,
          precio_venta_final: 0,
          codigo: '',
          id_categoria: 0,
          descuento: 0,
          cantidad: 0,
        });
      } else {
        console.error('Error al añadir producto');
      }
    } catch (error) {
      console.error('Error al añadir producto:', error);
    }
  };

  // Actualizar producto
  const actualizarProducto = async (id) => {
    try {
      const productoActualizado = {
        ...nuevoProducto, // Aquí podrías hacer los cambios correspondientes al producto editado
      };
      const response = await fetch(`./products/${id}`, { // Usar ruta relativa
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productoActualizado),
      });
      if (response.ok) {
        const productoActualizadoData = await response.json();
        setProductos(
          productos.map((producto) => (producto.id_producto === id ? productoActualizadoData : producto))
        );
      } else {
        console.error('Error al actualizar producto');
      }
    } catch (error) {
      console.error('Error al actualizar producto:', error);
    }
  };

  // Eliminar producto
  const eliminarProducto = async (id) => {
    try {
      const response = await fetch(`./products/${id}`, { // Usar ruta relativa
        method: 'DELETE',
      });
      if (response.ok) {
        setProductos(productos.filter((producto) => producto.id_producto !== id)); // Remover el producto eliminado de la lista
      } else {
        console.error('Error al eliminar producto');
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  // Verificar si los productos existen antes de renderizar
  if (!productos || productos.length === 0) {
    return <p>No hay productos disponibles</p>;
  }

  return (
    <div>
      <h1>Gestión de Productos</h1>
      
      {/* Formulario para añadir un producto */}
      <form onSubmit={añadirProducto}>
        <input type="file" onChange={manejarCargaImagen} />
        <input type="text" name="codigo" placeholder="Código" value={nuevoProducto.codigo} onChange={manejarCambio} />
        <input type="text" name="nombre_producto" placeholder="Nombre del producto" value={nuevoProducto.nombre_producto} onChange={manejarCambio} />
        <input type="text" name="descripcion" placeholder="Descripción" value={nuevoProducto.descripcion} onChange={manejarCambio} />
        <input type="number" name="precio_compra" placeholder="Precio de compra" value={nuevoProducto.precio_compra} onChange={manejarCambio} />
        <input type="number" name="porcentaje_de_ganancia" placeholder="% de ganancia" value={nuevoProducto.porcentaje_de_ganancia} onChange={manejarCambio} />
        <input type="number" name="precio_neto" placeholder="Precio neto" value={nuevoProducto.precio_neto} onChange={manejarCambio} />
        <input type="number" name="precio_venta" placeholder="Precio de venta" value={nuevoProducto.precio_venta} onChange={manejarCambio} />
        <input type="number" name="precio_venta_final" placeholder="Precio venta final" value={nuevoProducto.precio_venta_final} onChange={manejarCambio} />
        <input type="number" name="descuento" placeholder="Descuento" value={nuevoProducto.descuento} onChange={manejarCambio} />
        <input type="number" name="cantidad" placeholder="Cantidad" value={nuevoProducto.cantidad} onChange={manejarCambio} />
        <input type="number" name="id_categoria" placeholder="ID Categoría" value={nuevoProducto.id_categoria} onChange={manejarCambio} />
        <button type="submit">Añadir Producto</button>
      </form>

      {/* Lista de productos */}
      <h2>Lista de Productos</h2>
      <ul>
        {productos.map(producto => (
          <li key={producto.id_producto}>
            <img src={producto.img} alt={producto.nombre_producto} width="100" />
            <p>{producto.nombre_producto}</p>
            <p>{producto.descripcion}</p>
            <p>Precio: {producto.precio_venta}</p>
            <button onClick={() => actualizarProducto(producto.id_producto)}>Actualizar</button>
            <button onClick={() => eliminarProducto(producto.id_producto)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
