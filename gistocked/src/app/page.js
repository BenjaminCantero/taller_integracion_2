import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-3 bg-PaletaLogin-1">
      <main className="col-start-2 col-end-3 row-start-2 row-end-3">
          <div className="bg-PaletaLogin-2 rounded-lg">
              <p>Hola Mundo</p>
          </div>
      </main>
    </div>
  );
}
