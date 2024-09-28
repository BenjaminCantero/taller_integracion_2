// NO BORRAR | ES LO MAS IMPORTANTE DEL CODIGO
"use client"

import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function UserRegister() {

    // Prepara las funciones importantes
    const { register, handleSubmit, formState: {errors} } = useForm();
    const router = useRouter();

    // Función asociada al Formulario
    const onSubmit = handleSubmit( async (data) => {
        // Envia los datos en formato JSON 
        const res = await fetch("/api/usuario/", {method: "POST", body: JSON.stringify({nombre: data.nombre, correo:data.correo, contrasena: data.contrasena}), headers: {"Content-Type":"application/json"}});

        // Luego de registrarse exitosamente redirige al Login
        if (res.ok) {
            router.push("../auth/UserLogin/")
        }
    });


  // Codigo HTML 
  return (
    <main className="ss:min-h-[600px] flex justify-center items-center">
        <form onSubmit={onSubmit} className="p-10 bg-Colores_Login-2 rounded-lg font-racing_sans_one">
            <ul className="grid grid-cols-1 grid-rows-7 gap-6 2xl:gap-2">
              <li>
                <div className="ss:px-20 2xl:px-20 text-white ss:text-5xl 2xl:text-8xl">
                  <h1>GISTOKED</h1>
                </div>
              </li>

              <li>
                <div className="ss:h-12 2xl:h-16 bg-Colores_Login-3 rounded-md">
                  <Link href="#" className="w-full">
                    <div className="text-black 2xl:text-3xl">
                      <Image alt="Logo de Google" src="/images/Logo-Google.png" width={90} height={55} className="inline 2xl:w-32"></Image>
                      <p className="inline">Registrarse Con Google</p>
                    </div>
                  </Link>
                </div>
              </li>

              <li>
                <div className="ss:h-12 2xl:h-16 grid grid-cols-5 gap items-center">
                  <div className="horizontal_line"></div>
                  <div className="horizontal_line"></div>
                  <div className="text-white text-center"> <p>o</p> </div>
                  <div className="horizontal_line"></div>
                  <div className="horizontal_line"></div>
                </div>
              </li>

              <li>
                <div className="ss:h-12 2xl:h-16 rounded-md text-black 2xl:text-3xl">
                  <input {...register("nombre", {required: {value:true, message: "El nombre de usuario es requerido"}})} type="text" placeholder="Nombre de Usuario" className="px-5 w-full h-full rounded-md bg-Colores_Login-3"></input>
                  {
                    errors.nombre && ( <span className="text-red-500"> {errors.nombre.message} </span> )
                  }
                </div>
              </li>

              <li>
                <div className="ss:h-12 2xl:h-16 rounded-md text-black 2xl:text-3xl">
                  <input {...register("correo", {required: {value:true, message: "El correo es requerido"}})} type="email" placeholder="Correo" className="px-5 w-full h-full rounded-md bg-Colores_Login-3"></input>
                  {
                    errors.correo && ( <span className="text-red-500"> {errors.correo.message} </span> )
                  }
                </div>
              </li>

              <li>
                <div className="ss:h-12 2xl:h-16 rounded-md text-black 2xl:text-3xl">
                  <input {...register("contrasena", {required: {value:true, message: "La contraseña es requerida"}})} type="password" placeholder="Contraseña" className="px-5 w-full h-full rounded-md bg-Colores_Login-3"></input>
                  {
                    errors.contrasena && ( <span className="text-red-500"> {errors.contrasena.message} </span> )
                  }
                </div>
              </li>

              <li>
                <div className="ss:h-12 2xl:h-16 bg-Colores_Login-3 rounded-md text-black text-center 2xl:text-3xl">
                  <button type="submit" className="w-full h-full">Registrarse</button>
                </div>
              </li>
            </ul>
        </form>
    </main>
  );
}