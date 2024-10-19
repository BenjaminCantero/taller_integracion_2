import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const products = await prisma.product.findMany();
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
      }
      break;
    
    case 'POST':
      try {
        const newProduct = await prisma.product.create({
          data: req.body,
        });
        res.status(201).json(newProduct);
      } catch (error) {
        res.status(500).json({ error: 'Error creating product' });
      }
      break;

    case 'PUT':
      try {
        const { id, ...data } = req.body;
        const updatedProduct = await prisma.product.update({
          where: { id: parseInt(id) },
          data,
        });
        res.status(200).json(updatedProduct);
      } catch (error) {
        res.status(500).json({ error: 'Error updating product' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.body;
        await prisma.product.delete({
          where: { id: parseInt(id) },
        });
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: 'Error deleting product' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
