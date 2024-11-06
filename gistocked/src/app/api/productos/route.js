import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const productos = await prisma.inventario.findMany();
      return res.status(200).json(productos);
    }

    if (req.method === 'POST') {
      const {
        img,
        nombre_producto,
        descripcion,
        precio_compra,
        porcentaje_de_ganancia,
        precio_neto,
        precio_venta,
        precio_venta_final,
        codigo,
        id_categoria,
        descuento,
        cantidad,
      } = req.body;

      const nuevoProducto = await prisma.inventario.create({
        data: {
          img,
          nombre_producto,
          descripcion,
          precio_compra,
          porcentaje_de_ganancia,
          precio_neto,
          precio_venta,
          precio_venta_final,
          codigo,
          id_categoria,
          descuento,
          cantidad,
        },
      });

      return res.status(201).json(nuevoProducto);
    }

    if (req.method === 'PUT') {
      const { id_producto, ...rest } = req.body;
      const productoActualizado = await prisma.inventario.update({
        where: { id_producto },
        data: rest,
      });

      return res.status(200).json(productoActualizado);
    }

    if (req.method === 'DELETE') {
      const { id_producto } = req.body;
      await prisma.inventario.delete({
        where: { id_producto },
      });

      return res.status(204).end();
    }

    return res.status(405).end(); // Method Not Allowed
  } catch (error) {
    console.error('Error en la conexión a la base de datos:', error);
    return res.status(500).json({ message: 'Error en la conexión a la base de datos', error });
  } finally {
    await prisma.$disconnect(); // Cierra la conexión a la base de datos
  }
}
