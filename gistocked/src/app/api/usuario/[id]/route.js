import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const nombre = params.id;

    try {
        const usuario = await prisma.usuario.findFirst({
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
        const result = await prisma.usuario.delete({
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
        const result = await prisma.usuario.update({
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