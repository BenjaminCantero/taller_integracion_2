import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Head from 'next/head';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Gestión de Ventas y Inventario</title>
      </Head>

      <header className="text-center mb-8 bg-gradient-to-r from-blue-600 to-teal-400 text-white p-8 rounded-2xl shadow-2xl">
        <h1 className="text-5xl font-extrabold leading-tight">Gestión de Ventas y Inventario</h1>
        <p className="text-xl mt-2">Optimiza tu negocio con nuestra plataforma</p>
      </header>

      <section className="mb-8">
        <h2 className="text-4xl font-bold text-center mb-6">Productos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((id) => (
            <div key={id} className="card border-2 border-gray-300 rounded-xl overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl">
              <img src={`producto${id}.jpg`} alt={`Imagen de producto ${id}`} className="card-img-top object-cover h-48 w-full" />
              <div className="card-body p-4">
                <h5 className="card-title text-2xl font-semibold mb-2">Producto {id}</h5>
                <p className="card-text text-gray-700 mb-2">Descripción del producto {id}</p>
                <p className="card-text text-xl font-bold mb-4">$19.99</p>
                <button className="btn btn-primary w-full">Comprar ahora</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-4xl font-bold text-center mb-6">Gestión de inventario</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[{ title: 'Inventario actual', text: '10 productos en stock', icon: 'box', color: 'blue-500' },
            { title: 'Historial de ventas', text: '20 ventas en el último mes', icon: 'chart-line', color: 'green-500' }
          ].map((item, index) => (
            <div key={index} className="card border-2 border-gray-300 rounded-xl overflow-hidden shadow-lg">
              <div className="card-body flex items-center p-4">
                <div className={`mr-4 text-4xl text-${item.color}`}>
                  <i className={`fas fa-${item.icon}`}></i>
                </div>
                <div>
                  <h5 className="card-title text-2xl font-semibold mb-2">{item.title}</h5>
                  <p className="card-text text-gray-700 mb-4">{item.text}</p>
                  <button className="btn btn-primary">Ver detalles</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-4xl font-bold text-center mb-6">Llamado a la acción</h2>
        <div className="flex justify-center">
          <button className="btn btn-primary btn-lg border-2 border-blue-700 hover:border-blue-500">Registra tu tienda ahora</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
