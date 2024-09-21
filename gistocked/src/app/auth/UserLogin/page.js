import Image from "next/image";
import Link from "next/link";

export default function UserLogin() {
  return (
    <div className="ss:min-h-[600px] flex justify-center items-center">
        <form className="p-10 bg-Colores_Login-2 rounded-lg font-racing_sans_one">
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

              <li>
                <div className="ss:h-12 2xl:h-16 rounded-md text-black 2xl:text-3xl">
                  <input type="text" placeholder="Nombre de Usuario" className="px-5 w-full h-full rounded-md bg-Colores_Login-3"></input>
                </div>
              </li>

              <li>
                <div className="ss:h-12 2xl:h-16 rounded-md text-black 2xl:text-3xl">
                  <input type="password" placeholder="Constraseña" className="px-5 w-full h-full rounded-md bg-Colores_Login-3"></input>
                </div>
              </li>

              <li>
                <div className="ss:h-12 2xl:h-16 bg-Colores_Login-3 rounded-md text-black text-center 2xl:text-3xl">
                  <button type="submit" className="w-full h-full">Iniciar Sesión</button>
                </div>
              </li>

              <li>
                <div className="ss:h-12 2xl:h-16 text-white 2xl:text-3xl">
                  <Link href="../../auth/UserRegister/">Registrarse</Link>
                </div>
              </li>
            </ul>
        </form>
    </div>
  );
}