"use client"
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useUser } from '@/app/globalsUsers';

import Image from "next/image";
import Link from "next/link";

export default function UserLogin() {
  const { register, handleSubmit, setValue, formState: {errors} } = useForm();
  const router = useRouter();
  const [error, setError] = useState(null)

  const { updateRolState } = useUser();

  const staticUsers = [
    {name: "admin", email: "admin@gmail.com", password: "123", rol:1},
    {name: "vendedor", email: "vendedor@gmail.com", password: "123", rol:2},
  ]

  const onSubmit = handleSubmit(async data => {
    // Usuarios estático
  
    // Verifica si el usuario está en los usuarios estáticos
    const staticUser = staticUsers.find(u => u.email === data.correo && u.password === data.contrasena && u.rol === data.rol);

    if (staticUser) {
      if (staticUser.rol == 1){
        updateRolState(1)
      } else {
        updateRolState(2)
      }

      router.push("/");
      router.refresh();
    } else {
      // Si no se encuentra, proceder a consultar la base de datos
      const res = await signIn("credentials", {
        email: data.correo,
        password: data.contrasena,
        rol: data.rol,
        redirect: false
      });
  
      if (res.error) {
        setError(res.error);
      } else {
        router.push("/");
        router.refresh();
      }
    }
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [accountType, setAccountType] = useState("Tipo de cuenta");

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleAccountTypeChange = (type) => {
    setAccountType(type);
    setDropdownOpen(false);

    if (type == "Admin") {
      setValue("rol", 1);
    } else {
      setValue("rol", 2);
    }
  };

  return (
    <div className="ss:min-h-[600px] flex justify-center items-center">
        <form onSubmit={onSubmit} className="p-10 bg-Colores_Login-2 rounded-lg font-racing_sans_one">
            <ul className="grid grid-cols-1 grid-rows-7 gap-6 2xl:gap-2">
              <li>
                <div className="ss:px-20 2xl:px-20 text-white ss:text-5xl 2xl:text-8xl">
                  <h1>GISTOKED</h1>
                </div>
              </li>

      {/* Círculo inferior derecho */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-300 rounded-full opacity-50 -z-10"></div>

      <form className="p-10 bg-Colores_Login-2 rounded-lg font-racing_sans_one z-10"> {/* Agregar z-10 aquí */}
        <ul className="grid grid-cols-1 grid-rows-7 gap-6 2xl:gap-2">
          <li>
            <div className="ss:px-20 2xl:px-20 text-white ss:text-5xl 2xl:text-8xl">
              <h1>GISTOKED</h1>
            </div>
          </li>

              { 
                error && ( <p className="bg-red-500 rounded-md text-center content-center"> {error} </p>) 
              }

              <li>
                <div className="ss:h-12 2xl:h-16 rounded-md text-black 2xl:text-3xl">
                  <input {...register("correo", {required: {value:true, message: "El correo es requerido"}})} type="email" placeholder="Correo" className="px-5 w-full h-full rounded-md bg-Colores_Login-3"></input>
                  {
                    errors.correo && ( <span className="text-red-500"> {errors.correo.message} </span> )
                  }
                </div>
              </Link>
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

              {/* Botón para seleccionar tipo de cuenta */}
              <li className="relative">
                <button
                  type="button"
                  className="bg-Colores_Login-3 text-black px-4 py-2 rounded-md 2xl:text-3xl w-full"
                  onClick={toggleDropdown}
                  {...register("rol", {required: {value:true, message: "El rol es requerido"}})}
                >
                  {accountType}
                </button>
                {
                  errors.rol && ( <span className="text-red-500"> {errors.rol.message} </span> )
                }

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg z-10">
                    <ul className="py-1">
                      <li>
                        <button
                          className="block px-4 py-2 text-black hover:bg-gray-200 w-full text-left"
                          onClick={() => handleAccountTypeChange("Vendedor")}
                        >
                          
                          Iniciar como Vendedor
                        </button>
                      </li>
                      <li>
                        <button
                          className="block px-4 py-2 text-black hover:bg-gray-200 w-full text-left"
                          onClick={() => handleAccountTypeChange("Admin")}
                        >
                          Iniciar como Admin
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </li>

              <li>
                <div className="ss:h-12 2xl:h-16 bg-Colores_Login-3 rounded-md text-black text-center 2xl:text-3xl">
                  <button type="submit" className="w-full h-full">Iniciar Sesión</button>
                </div>
              </li>

          <li>
            <div className="ss:h-10 2xl:h-16 rounded-md text-black 2xl:text-3xl">
              <input
                type="password"
                placeholder="Contraseña"
                className="px-5 w-full h-full rounded-md bg-Colores_Login-3"
              />
            </div>
          </li>

          <li>
            <div className="ss:h-10 2xl:h-16 bg-Colores_Login-3 rounded-md text-black text-center 2xl:text-3xl">
              <button type="submit" className="w-full h-full">
                Iniciar Sesión
              </button>
            </div>
          </li>

          <li>
            <div className="ss:h-10 2xl:h-16 text-white 2xl:text-3xl">
              <Link href="../../auth/UserRegister/">Registrarse</Link>
            </div>
          </li>

          {/* Botón para seleccionar tipo de cuenta */}
          <li className="relative">
            <button
              type="button"
              className="bg-Colores_Login-3 text-black px-4 py-2 rounded-md 2xl:text-3xl w-full"
              onClick={toggleDropdown}
            >
              {accountType}
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg z-10">
                <ul className="py-1">
                  <li>
                    <button
                      className="block px-4 py-2 text-black hover:bg-gray-200 w-full text-left"
                      onClick={() => handleAccountTypeChange("Vendedor")}
                    >
                      Iniciar como Vendedor
                    </button>
                  </li>
                  <li>
                    <button
                      className="block px-4 py-2 text-black hover:bg-gray-200 w-full text-left"
                      onClick={() => handleAccountTypeChange("Admin")}
                    >
                      Iniciar como Admin
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </form>
    </div>
  );
}
