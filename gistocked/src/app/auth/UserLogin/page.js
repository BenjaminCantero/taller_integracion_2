import Image from "next/image";
import Link from "next/link";

export default function UserLogin() {
  return (
    <main className="grid grid-cols-6 grid-rows-6 gap">
        <form className="py-8 col-start-3 col-end-5 row-start-2 row-end-6 font-racing_sans_one rounded-lg bg-Colores_Login-2">
            <ul className="grid grid-cols-1 grid-rows-7 gap-4">
              <li>
                <div className="h-10 text-center">
                  <h1 className="text-4xl">GISTOKED</h1>
                </div>
              </li>

              <li>
                <div className="mx-14 h-10 text-black rounded-md bg-Colores_Login-3">
                  <Link href="#" className="w-full">
                    <div>
                      <Image alt="Logo de Google" src="/images/Logo-Google.png" width={80} height={55} className="inline"></Image>
                      <p className="inline">Iniciar Sesión Con Google</p>
                    </div>
                  </Link>
                </div>
              </li>

              <li>
                <div className="mx-14 h-10 grid grid-cols-5 gap items-center">
                  <div className="horizontal_line"></div>
                  <div className="horizontal_line"></div>
                  <div className="text-center"> <p>o</p> </div>
                  <div className="horizontal_line"></div>
                  <div className="horizontal_line"></div>
                </div>
              </li>

              <li>
                <div className="mx-14 h-10 text-black rounded-md">
                  <input type="text" placeholder="Nombre de Usuario" className="px-5 w-full h-full rounded-md bg-Colores_Login-3"></input>
                </div>
              </li>

              <li>
                <div className="mx-14 h-10 text-black rounded-md">
                  <input type="password" placeholder="Constraseña" className="px-5 w-full h-full rounded-md bg-Colores_Login-3"></input>
                </div>
              </li>

              <li>
                <div className="mx-14 h-10  text-black text-center rounded-md bg-Colores_Login-3">
                  <button type="submit" className="w-full h-full">Iniciar Sesión</button>
                </div>
              </li>

              <li>
                <div className="mx-14 h-10">
                  <Link href="../../auth/UserRegister/">Registrase</Link>
                </div>
              </li>
            </ul>
        </form>
    </main>
  );
}