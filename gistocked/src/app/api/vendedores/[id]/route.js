import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const rolDetectado = parseInt(params.id);

    try {
        const usuario = await prisma.vendedores.findMany({
            where: { rol: rolDetectado },
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
    const idDetectado = parseFloat(params.id)

    try{
        const result = await prisma.vendedores.delete({
            where: { id: idDetectado },
        });
        return NextResponse.json({ message: result }, { status: 200 })
    } catch (error) {
        return new NextResponse(error.menssage, {status: 500});
    }
}

export async function PUT(request, { params }) {
    const idDetectado = parseInt(params.id);
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
        const result = await prisma.vendedores.update({
            where: { id: idDetectado },
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