const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
const port = 3000;

// Ruta para buscar productos por nombre
app.get('/api/inve ntory/search', async (req, res) => {
  const { name } = req.query;

  try {
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar los productos' });
  }
});
// Middleware para parsear JSON
app.use(express.json());

// Ruta para obtener todos los productos
app.get('/api/inventory', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Ruta para agregar un nuevo producto
app.post('/api/inventory', async (req, res) => {
  const { name, category, quantity, price } = req.body;

  try {
    const newProduct = await prisma.product.create({
      data: { name, category, quantity, price }
    });
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto' });
  }
});

// Ruta para editar un producto
app.put('/api/inventory/:id', async (req, res) => {
  const { id } = req.params;
  const { name, category, quantity, price } = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { name, category, quantity, price }
    });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

// Ruta para eliminar un producto
app.delete('/api/inventory/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.product.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
