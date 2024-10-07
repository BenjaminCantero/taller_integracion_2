import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    res.status(200).json(user);
  } else if (req.method === 'PUT') {
    const { name, email, role } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, email, role },
    });
    res.status(200).json(updatedUser);
  } else if (req.method === 'DELETE') {
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}


export async function GET(request, { params }) {
    const nombre = params.id;

    try {
        const usuario = await prisma.Usuario_Main_2.findFirst({
            where: { nombre: nombre },
        });
        if (!usuario){
            return new NextResponse("Usuario NO Encontrado", { status: 404 })
        }
        return NextResponse.json(usuario)
    } catch {
        return new NextResponse(error.message, {status: 500});
    }
}

export async function DELETE(request, { params }) {
    const nombre = params.id

    try{
        const result = await prisma.Usuario_Main_2.delete({
            where: { nombre: nombre },
        });
        return NextResponse.json({ message: result }, { status: 200 });
    } catch (errror) {
        return new NextResponse(error.menssage, {status: 500})
    }
}

export async function PUT(request, { params }) {
    console.log(params.id)
    const nombre = params.id
    const data = await request.json();

    try {
        const result = await prisma.Usuario_Main_2.update({
            where: { nombre: nombre },
            data: data,
        });

        if (!result) {
            return new NextResponse("Usuario NO Encontrado", { status: 404,});
        }
        return NextResponse.json({message:result}, {status:200})
    } catch (error) {
        return new NextResponse(error.message, {status: 500})
    }
}