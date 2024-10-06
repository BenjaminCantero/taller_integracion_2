"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

export default function UserUpdate() {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id"); // Obtener el ID de los parámetros de búsqueda


    const onSubmit = async (data) => {
        const res = await fetch(`/api/usuario/${id}`, {
            method: "PUT",
            body: JSON.stringify({ nombre: data.nombre, correo: data.correo, contrasena: data.contrasena }),
            headers: { "Content-Type": "application/json" }
        });

        if (res.ok) {
            router.push("/worker_management");
        } else {
            console.error('Error al actualizar el usuario');
        }
    };

    return (
        <main className="ss:min-h-[600px] flex justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="p-10 bg-Colores_Login-2 rounded-lg font-racing_sans_one">
                <ul className="grid grid-cols-1 grid-rows-7 gap-6 2xl:gap-2">
                    <li>
                        <div className="ss:px-20 2xl:px-20 text-white ss:text-5xl 2xl:text-8xl">
                            <h1>GISTOKED</h1>
                        </div>
                    </li>

                    <li>
                        <div className="ss:h-12 2xl:h-16 rounded-md text-black 2xl:text-3xl">
                            <input
                                type="text"
                                placeholder="Nombre de Usuario"
                                className="px-5 w-full h-full rounded-md bg-Colores_Login-3"
                                {...register("nombre", { required: false })}
                            />
                        </div>
                    </li>

                    <li>
                        <div className="ss:h-12 2xl:h-16 rounded-md text-black 2xl:text-3xl">
                            <input
                                type="email"
                                placeholder="Correo"
                                className="px-5 w-full h-full rounded-md bg-Colores_Login-3"
                                {...register("correo", { required: false })}
                            />
                        </div>
                    </li>

                    <li>
                        <div className="ss:h-12 2xl:h-16 rounded-md text-black 2xl:text-3xl">
                            <input
                                type="password"
                                placeholder="Contraseña"
                                className="px-5 w-full h-full rounded-md bg-Colores_Login-3"
                                {...register("contrasena", { required: false })}
                            />
                        </div>
                    </li>

                    <li>
                        <div className="ss:h-12 2xl:h-16 bg-Colores_Login-3 rounded-md text-black text-center 2xl:text-3xl">
                            <button type="submit" className="w-full h-full">Actualizar</button>
                        </div>
                    </li>
                </ul>
            </form>
        </main>
    );
}