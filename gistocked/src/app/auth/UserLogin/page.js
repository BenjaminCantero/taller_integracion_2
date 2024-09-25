"use client"; 
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function UserLogin() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [accountType, setAccountType] = useState("Tipo de cuenta");

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleAccountTypeChange = (type) => {
    setAccountType(type);
    setDropdownOpen(false);
  };

  return (
    <main className="ss:min-h-[600px] h-screen bg-Colores_Login-1 flex justify-center items-center">
      <form className="p-10 my-32 bg-Colores_Login-2 rounded-lg font-racing_sans_one">
        <ul className="grid grid-cols-1 grid-rows-8 gap-4 2xl:gap-2">
          <li>
            <div className="ss:px-20 2xl:px-20 text-white ss:text-5xl 2xl:text-1xl">
              <h1>GISTOKED</h1>
            </div>
          </li>

          <li>
            <div className="ss:h-10 2xl:h-16 bg-Colores_Login-3 rounded-md">
              <Link href="#" className="w-full">
                <div className="text-black 2xl:text-3xl">
                  <Image
                    alt="Logo de Google"
                    src="/images/Logo-Google.png"
                    width={80}
                    height={55}
                    className="inline 2xl:w-32"
                  />
                  <p className="inline">Iniciar Sesión Con Google</p>
                </div>
              </Link>
            </div>
          </li>

          <li>
            <div className="ss:h-10 2xl:h-16 grid grid-cols-5 gap items-center">
              <div className="horizontal_line"></div>
              <div className="horizontal_line"></div>
              <div className="text-white text-center">
                <p>o</p>
              </div>
              <div className="horizontal_line"></div>
              <div className="horizontal_line"></div>
            </div>
          </li>

          <li>
            <div className="ss:h-10 2xl:h-16 rounded-md text-black 2xl:text-3xl">
              <input
                type="text"
                placeholder="Nombre de Usuario"
                className="px-5 w-full h-full rounded-md bg-Colores_Login-3"
              />
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
              className="bg-Colores_Login-3 text-white px-4 py-2 rounded-md 2xl:text-3xl w-full"
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
    </main>
  );
}
