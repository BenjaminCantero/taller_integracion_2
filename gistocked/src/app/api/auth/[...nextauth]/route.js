import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: { correo: {label: "correo", type: "text"},
                           contrasena: {label: "contrasena", type: "password"},
            },
            async authorize(credentials, req) {
                const userFound = await prisma.usuario.findUnique({
                    where: {
                        correo: credentials.email
                    }
                })

                if (!userFound) throw new Error("Correo y/o Constraseña invalidos")
                
                const matchPassword = await bcrypt.compare(credentials.password, userFound.contrasena)

                if (!matchPassword) throw new Error("Correo y/o Constraseña invalidos")

                return {
                    id: userFound.id,
                    name: userFound.nombre,
                    email: userFound.correo,
                }
            },
        }),
    ],

    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };