// pages/api/producto/[codigoBarras].ts

import { prisma } from '../../../lib/prisma';

export default async function handler(req, res) {
  const { codigoBarras } = req.query;

  try {
    const producto = await prisma.producto.findUnique({
      where: { codigoBarras: codigoBarras }
    });

    if (producto) {
      res.status(200).json(producto);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error en la base de datos' });
  }
}
