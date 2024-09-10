import Image from "next/image";
import Link from "next/link";

export default function UserRegister() {
  return (
    <main className="ss:min-h-[600px] h-screen bg-Colores_Login-1 flex justify-center items-center">
        <form className="p-10 my-32 bg-Colores_Login-2 rounded-lg font-racing_sans_one">
            <ul className="grid grid-cols-1 grid-rows-7 gap-4 2xl:gap-2">
              <li>
                <div className="ss:px-20 2xl:px-20 text-white ss:text-5xl 2xl:text-8xl">
                  <h1>GISTOKED</h1>
                </div>
              </li>

              <li>
                <div className="ss:h-10 2xl:h-16 bg-Colores_Login-3 rounded-md">
                  <Link href="#" className="w-full">
                    <div className="text-black 2xl:text-3xl">
                      <Image alt="Logo de Google" src="/images/Logo-Google.png" width={80} height={55} className="inline 2xl:w-32"></Image>
                      <p className="inline">Registrarse Con Google</p>
                    </div>
                  </Link>
                </div>
              </li>

              <li>
                <div className="ss:h-10 2xl:h-16 grid grid-cols-5 gap items-center">
                  <div className="horizontal_line"></div>
                  <div className="horizontal_line"></div>
                  <div className="text-white text-center"> <p>o</p> </div>
                  <div className="horizontal_line"></div>
                  <div className="horizontal_line"></div>
                </div>
              </li>

              <li>
                <div className="ss:h-10 2xl:h-16 rounded-md text-black 2xl:text-3xl">
                  <input type="text" placeholder="Nombre de Usuario" className="px-5 w-full h-full rounded-md bg-Colores_Login-3"></input>
                </div>
              </li>

              <li>
                <div className="ss:h-10 2xl:h-16 rounded-md text-black 2xl:text-3xl">
                  <input type="email" placeholder="Correo" className="px-5 w-full h-full rounded-md bg-Colores_Login-3"></input>
                </div>
              </li>

              <li>
                <div className="ss:h-10 2xl:h-16 rounded-md text-black 2xl:text-3xl">
                  <input type="password" placeholder="Contraseña" className="px-5 w-full h-full rounded-md bg-Colores_Login-3"></input>
                </div>
              </li>

              <li>
                <div className="ss:h-10 2xl:h-16 bg-Colores_Login-3 rounded-md text-black text-center 2xl:text-3xl">
                  <button type="submit" className="w-full h-full">Registrarse</button>
                </div>
              </li>
            </ul>
        </form>
    </main>
  );
}