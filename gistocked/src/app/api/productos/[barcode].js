// /pages/api/producto/[barcode].js

import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const { barcode } = req.query;
  
  if (req.method === 'GET') {
    try {
      const product = await prisma.product.findUnique({
        where: { barcode },
      });

      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener el producto' });
    }
  }
}
