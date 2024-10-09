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
                           rol: {label: "rol", type: "text"},
            },
            async authorize(credentials, req) {
                const userFound = await prisma.usuario.findUnique({
                    where: {
                        correo: credentials.email
                    }
                })

                if (!userFound) throw new Error("Correo y/o Constraseña invalidos")

                if (parseInt(userFound.rolId) != parseInt(credentials.rol)) throw new Error("Tipo de rol invalido")
                
                const matchPassword = await bcrypt.compare(credentials.password, userFound.contrasena)

                if (!matchPassword) throw new Error("Correo y/o Constraseña invalidos")

                return {
                    id: userFound.id_usuarios,
                    rol: userFound.rolId,
                    name: userFound.nombre,
                    email: userFound.correo,
                }
            },
        }),
    ],

    pages: {
        signIn: "/auth/UserLogin"
    },

    secret: process.env.NEXTAUTH_SECRET,

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // Si hay un usuario, añade sus datos al token
                token.id = user.id;
                token.rol = user.rol;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            // Añade los datos del token a la sesión
            session.user.id = token.id;
            session.user.rol = token.rol;
            session.user.name = token.name;
            session.user.email = token.email;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };