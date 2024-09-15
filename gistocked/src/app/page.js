import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  const productos = [
    { id: 1, nombre: 'Carnes', cantidad: 10, precio: '$1000' },
    { id: 2, nombre: 'Heldaos', cantidad: 50, precio: '$20' },
    { id: 3, nombre: 'Tecnologia', cantidad: 30, precio: '$50' },
  ];

  return (
    <>
      <Header />
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Inventario de Productos</h1>

        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/4 py-2">Producto</th>
              <th className="w-1/4 py-2">Cantidad</th>
              <th className="w-1/4 py-2">Precio</th>
              <th className="w-1/4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id} className="text-center border-b">
                <td className="py-2">{producto.nombre}</td>
                <td className="py-2">{producto.cantidad}</td>
                <td className="py-2">{producto.precio}</td>
                <td className="py-2">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded">
                    Editar
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 ml-2 rounded">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <Footer />
    </>
  );
}
