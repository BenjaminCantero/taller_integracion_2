import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Obtener todos los usuarios
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } else if (req.method === 'POST') {
    // Crear un nuevo usuario
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10); // Encriptar la contraseña

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    res.status(201).json(newUser);
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
