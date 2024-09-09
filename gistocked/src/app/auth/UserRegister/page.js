import Image from "next/image";
import Link from "next/link";

export default function UserRegister() {
  return (
    <main className="h-screen grid ss:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 2xl:grid-cols-6 ss:grid-rows-3 lg:grid-rows-5 xl:grid-rows-6 2xl:grid-rows-8 gap bg-Colores_Login-1">
        <form className="ss:py-4 lg:py-8 ss:col-[2/3] lg:col-[2/3] xl:col-[3/5] 2xl:col-[3/5] ss:row-[2/3] lg:row-[2/5] xl:row-[2/6] 2xl:row-[2/8] font-racing_sans_one rounded-lg bg-Colores_Login-2">
            <ul className="grid grid-cols-1 grid-rows-7 ss:gap-1 lg:gap-4 xl:gap-4 2xl:gap-8">
              <li>
                <div className="ss:h-4 lg:h-8 2xl:h-20 text-center">
                  <h1 className="ss:text-xl lg:text-2xl xl:text-4xl 2xl:text-6xl">GISTOKED</h1>
                </div>
              </li>

              <li>
                <div className="mx-14 ss:h-6 lg:h-8 xl:h-10 2xl:h-20 text-black rounded-md bg-Colores_Login-3">
                  <Link href="#" className="w-full">
                    <div>
                      <Image alt="Logo de Google" src="/images/Logo-Google.png" width={80} height={55} className="inline ss:w-10 lg:w-13 xl:w-20 2xl:w-40"></Image>
                      <p className="inline ss:text-xs lg:text-sm xl:text-md 2xl:text-xl">Registrase Con Google</p>
                    </div>
                  </Link>
                </div>
              </li>

              <li>
                <div className="mx-14 ss:h-6 lg:h-8 xl:h-10 2xl:h-20 grid ss:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-7 gap items-center">
                  <div className="ss:col-[1/2] lg:col-[1/2] xl:col-[1/2] 2xl:col-[1/2] horizontal_line"></div>
                  <div className="ss:col-[2/3] lg:col-[2/3] xl:col-[2/3] 2xl:col-[2/4] horizontal_line"></div>
                  <div className="ss:col-[3/4] lg:col-[3/4] xl:col-[3/4] 2xl:col-[4/5] text-center"> <p>o</p> </div>
                  <div className="ss:col-[4/5] lg:col-[4/5] xl:col-[4/5] 2xl:col-[5/6] horizontal_line"></div>
                  <div className="ss:col-[5/6] lg:col-[5/6] xl:col-[5/6] 2xl:col-[6/8] horizontal_line"></div>
                </div>
              </li>

              <li>
                <div className="mx-14 ss:h-6 lg:h-8 xl:h-10 2xl:h-20 text-black rounded-md">
                  <input type="text" placeholder="Nombre de Usuario" className="px-5 w-full h-full ss:text-xs lg:text-sm xl:text-md 2xl:text-xl rounded-md bg-Colores_Login-3"></input>
                </div>
              </li>

              <li>
                <div className="mx-14 ss:h-6 lg:h-8 xl:h-10 2xl:h-20 text-black rounded-md">
                  <input type="email" placeholder="Correo" className="px-5 w-full h-full ss:text-xs lg:text-sm xl:text-md 2xl:text-xl rounded-md bg-Colores_Login-3"></input>
                </div>
              </li>

              <li>
                <div className="mx-14 ss:h-6 lg:h-8 xl:h-10 2xl:h-20 text-black rounded-md">
                  <input type="password" placeholder="Contraseña" className="px-5 w-full h-full ss:text-xs lg:text-sm xl:text-md 2xl:text-xl rounded-md bg-Colores_Login-3"></input>
                </div>
              </li>

              <li>
                <div className="mx-14 ss:h-6 lg:h-8 xl:h-10 2xl:h-20 text-black grid place-items-center rounded-md bg-Colores_Login-3">
                  <button type="submit" className="w-full h-full ss:text-xs lg:text-sm xl:text-md 2xl:text-xl">Registrase</button>
                </div>
              </li>
            </ul>
        </form>
    </main>
  );
}