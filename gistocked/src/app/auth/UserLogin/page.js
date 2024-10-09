
"use client"
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

export default function UserLogin( { administradores, vendedores, setUsuarioActivo, setPagina } ) {
  const { register, handleSubmit, setValue, formState: {errors} } = useForm();
  // const router = useRouter();
  const [error, setError] = useState(null)


  const onSubmit = handleSubmit(async data => {  

    // Verifica si el usuario está en los usuarios estáticos
    const usuarioAdmin = Object.values(administradores).find(u => u.correo === data.correo && u.contrasena === data.contrasena && u.rol === data.rol);
    const usuarioVendedor = Object.values(vendedores).find(u => u.correo === data.correo && u.contrasena === data.contrasena && u.rol === data.rol)

    try {
      if (usuarioAdmin && Object.keys(usuarioAdmin).length > 0) {
          setUsuarioActivo(usuarioAdmin);
      } else if (usuarioVendedor && Object.keys(usuarioVendedor).length > 0) {
          setUsuarioActivo(usuarioVendedor);
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
              setUsuarioActivo(data);
          }
      }
    } catch (error) {
        console.error('Error al intentar iniciar sesión:', error);
        setError('Ocurrió un error inesperado. Por favor, inténtalo de nuevo.');
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

    if (type == "Administrador") {
      setValue('rol', 1)
    } else if (type == "Vendedor") {
      setValue('rol', 2)
    } else {
      console.log('Rol no encontrado')
    }
  };

  return (
    <div className="ss:min-h-[600px] h-screen bg-gray-100 flex justify-center items-center">
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
                      <p className="inline">Iniciar Sesión Con Google</p>
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
                          className="block px-4 py-2 text-black text-center hover:bg-gray-200 w-full text-left"
                          onClick={() => handleAccountTypeChange("Administrador")}
                        >
                          Administrador
                        </button>
                      </li>
                      <li>
                        <button
                          className="block px-4 py-2 text-black text-center hover:bg-gray-200 w-full text-left"
                          onClick={() => handleAccountTypeChange("Vendedor")}
                        >
                          Vendedor
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
                <div className="ss:h-12 2xl:h-16 text-white 2xl:text-3xl">
                  <Link href="/auth/UserRegister/" onClick={e => setPagina(2)}>Registrarse</Link>
                </div>
              </li>
            </ul>
        </form>
    </div>
  );
}