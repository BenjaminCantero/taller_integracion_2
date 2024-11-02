import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        // Recibe los datos
        const data = await request.json();
        const form = data.tipoForm;

        if (form === '2') { 
            const todosLosEmpleados = await prisma.usuario.findMany();
            
            // Asigna el codigo_vendedor como un número mayor que el total de empleados
            let codigoVendedor = parseInt(todosLosEmpleados.length + 1);

            // Envia los datos encriptados a la base de datos
            const usuario = await prisma.usuario.create({
                data: {
                    codigo_vendedor: codigoVendedor,
                    nombre_usuario: data.nombre_usuario,
                    nombre_empresa: data.nombre_empresa,
                    password: data.password,
                    email: data.email,
                    id_rol: 1,
                    id_admin: -1,
                }
            });
            return new NextResponse(JSON.stringify(usuario), {
                headers: { "Content-Type": "application/json" },
                status: 201,
            });
        } else if (form === '1') {

            // Encuentra todos los usuarios de la misma empresa
            const usuarios = await prisma.usuario.findMany({
                where: { nombre_empresa: data.nombre_empresa },
            });

            // Verifica si se encontraron usuarios
            if (usuarios.length > 0) {
                // Busca el usuario que tiene el mismo correo electrónico
                const usuario = usuarios.find(user => user.email === data.email && user.password === data.password);

                // Verifica si se encontró el usuario con ese correo
                if (!usuario) {
                    return new NextResponse("Usuario NO Encontrado", { status: 404 });
                }

                // Devuelve el usuario encontrado
                return NextResponse.json(usuario);
            } else {
                return new NextResponse("No hay usuarios en esta empresa", { status: 404 });
            }
        } else {
            return new NextResponse("Tipo de formulario no válido", { status: 400 });
        }
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
}