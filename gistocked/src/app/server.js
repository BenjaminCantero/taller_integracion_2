const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json()); // Permite leer JSON en las peticiones del cliente

// Ruta para obtener todos los productos
app.get('/productos', async (req, res) => {
  try {
    const productos = await prisma.producto.findMany();
    res.json(productos);
  } catch (error) {
    console.error('Error obteniendo los productos:', error);
    res.status(500).json({ error: 'Error obteniendo los productos' });
  }
});

// Ruta para agregar un nuevo producto
app.post('/productos', async (req, res) => {
  const { name, category, quantity, price } = req.body;
  try {
    const newProduct = await prisma.producto.create({
      data: { name, category, quantity: Number(quantity), price: Number(price) },
    });
    res.json(newProduct);
  } catch (error) {
    console.error('Error agregando el producto:', error);
    res.status(500).json({ error: 'Error agregando el producto' });
  }
});

// Ruta para actualizar un producto
app.put('/productos/:id', async (req, res) => {
  const { id } = req.params;
  const { name, category, quantity, price } = req.body;
  try {
    const updatedProduct = await prisma.producto.update({
      where: { id: Number(id) },
      data: { name, category, quantity: Number(quantity), price: Number(price) },
    });
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error actualizando el producto:', error);
    res.status(500).json({ error: 'Error actualizando el producto' });
  }
});

// Ruta para eliminar un producto
app.delete('/productos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.producto.delete({ where: { id: Number(id) } });
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    console.error('Error eliminando el producto:', error);
    res.status(500).json({ error: 'Error eliminando el producto' });
  }
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
