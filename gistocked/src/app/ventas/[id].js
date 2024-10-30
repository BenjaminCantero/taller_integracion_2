// /pages/api/ventas/[id].js

import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      await prisma.sale.delete({
        where: { id: parseInt(id) },
      });

      return res.status(200).json({ message: 'Venta eliminada' });
    } catch (error) {
      return res.status(500).json({ message: 'Error al eliminar la venta' });
    }
  }
}
