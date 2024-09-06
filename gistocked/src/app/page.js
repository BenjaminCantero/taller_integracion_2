import Image from "next/image";

export default function Home() {
  return (
    <main className="grid grid-cols-3 grid-rows-5 gap-3 bg-PaletaLogin-1">
        <form className="col-start-2 col-end-3 row-start-2 row-end-5 bg-PaletaLogin-2 rounded-lg font-racing_sans_one">
            <ul className="grid grid-cols-1 grid-rows-7 gap-1">
              <li>
                <div className="text-center">
                  <h1 className="text-4xl">GISTOKED</h1>
                </div>
              </li>

              <li>
                <div className="mx-14 bg-PaletaLogin-3 text-black rounded-md">
                  <a href="#" className="pl-5 block w-full">Iniciar Sesión Con Google</a>
                </div>
              </li>

              <li>
                <div className="mx-14">
                  <img></img>
                </div>
              </li>

              <li>
                <div className="mx-14 text-black">
                  <input type="text" placeholder="Nombre de Usuario" className="bg-PaletaLogin-3 rounded-md w-full pl-5"></input>
                </div>
              </li>

              <li>
                <div className="mx-14 bg-PaletaLogin-3 text-black rounded-md">
                  <input type="password" placeholder="Constraseña" className="bg-PaletaLogin-3 rounded-md w-full pl-5"></input>
                </div>
              </li>

              <li>
                <div className="mx-14 bg-PaletaLogin-3 text-black rounded-md text-center">
                  <button className="w-full">Iniciar Sesión</button>
                </div>
              </li>

              <li>
                <div className="mx-14">
                  <a href="#">Registrase</a>
                </div>
              </li>
            </ul>
        </form>
    </main>
  );
}