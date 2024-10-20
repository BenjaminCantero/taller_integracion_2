const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Obtener todos los productos
app.get('/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Añadir un producto
app.post('/products', async (req, res) => {
  const {
    img,
    codigo,
    nombre_producto,
    descripcion,
    precio_compra,
    porcentaje_de_ganancia,
    precio_neto,
    precio_venta,
    precio_venta_final,
    descuento,
    cantidad,
    id_categoria
  } = req.body;

  // Validación básica de los datos
  if (!codigo || !nombre_producto || !precio_venta) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  try {
    const nuevoProducto = await prisma.product.create({
      data: {
        img,
        codigo,
        nombre_producto,
        descripcion,
        precio_compra,
        porcentaje_de_ganancia,
        precio_neto,
        precio_venta,
        precio_venta_final,
        descuento,
        cantidad,
        id_categoria,
      },
    });
    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error('Error al añadir producto:', error);
    res.status(500).json({ error: 'Error al añadir producto' });
  }
});

// Actualizar un producto
app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const productoActualizado = await prisma.product.update({
      where: { id_producto: parseInt(id) },
      data,
    });
    res.json(productoActualizado);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

// Eliminar un producto
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.product.delete({
      where: { id_producto: parseInt(id) },
    });
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

// Iniciar servidor en el puerto 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
