// Contiene los metodos que NO requieran parametros

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
    try {
        // Recibe los datos
        const data = await request.json()

        // Se encriptan los datos
        const nombreEncriptado = await bcrypt.hash(data.nombre, 10)
        const correoEncriptado = await bcrypt.hash(data.correo, 10)
        const contrasenaEncriptado = await bcrypt.hash(data.contrasena,10)

        // Envia los datos encriptados a la base de datos
        const usuario = await prisma.usuario.create(({
            data: {
                rolId: 1,
                nombre: data.nombre,
                correo: data.correo,
                contrasena: contrasenaEncriptado,
            }
        }))
        return new NextResponse(JSON.stringify(usuario), {
            headers:{"Content-Type":"application/json"},
            status:201
        })
    } catch (error) {
        return new NextResponse(error.message, {status:500})
    }
}