import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const rol = parseInt(params.id);

    try {
        const usuario = await prisma.usuario.findMany({
            where: { rolId: rol },
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
    const id = parseFloat(params.id)

    try{
        const result = await prisma.usuario.delete({
            where: { id_usuarios: id },
        });
        return NextResponse.json({ message: result }, { status: 200 })
    } catch (error) {
        return new NextResponse(error.menssage, {status: 500});
    }
}

export async function PUT(request, { params }) {
    const id = parseInt(params.id);
    const inputData = await request.json();
    const data = {};

    // Condicionales para agregar solo campos no vacíos
    if (inputData.nombre && inputData.nombre.trim() !== "") {
        data.nombre = inputData.nombre;
    }

    if (inputData.correo && inputData.correo.trim() !== "") {
        data.correo = inputData.correo;
    }

    if (inputData.contrasena && inputData.contrasena.trim() !== "") {
        data.contrasena = inputData.contrasena;
    }

    try {
        const result = await prisma.usuario.update({
            where: { id_usuarios: id },
            data: data,
        });

        if (!result) {
            return new NextResponse("Usuario NO Encontrado", { status: 404 });
        }
        return NextResponse.json({ message: result }, { status: 200 });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
}