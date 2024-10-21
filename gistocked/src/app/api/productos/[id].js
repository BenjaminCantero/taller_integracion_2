// /pages/api/producto/[id].js

import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PATCH') {
    const { stock } = req.body;
    try {
      const updatedProduct = await prisma.product.update({
        where: { id: parseInt(id) },
        data: { stock },
      });

      return res.status(200).json(updatedProduct);
    } catch (error) {
      return res.status(500).json({ message: 'Error al actualizar el producto' });
    }
  }
}