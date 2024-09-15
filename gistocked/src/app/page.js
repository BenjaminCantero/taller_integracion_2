import './globals.css';
import Head from 'next/head';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Gestión de Ventas y Inventario</title>
      </Head>

      {/* Imagen de la tienda */}
      <section className="mb-16">
        <div className="relative">
          <img src="/store-image.jpg" alt="Imagen de la tienda" className="w-full h-64 object-cover rounded-lg shadow-lg" />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg">
            <h1 className="text-4xl font-bold text-white">Bienvenidos a Nuestra Tienda</h1>
          </div>
        </div>
      </section>

      {/* Historia de la tienda */}
      <section className="mb-16 text-center">
        <h2 className="text-4xl font-bold mb-6 text-gray-900">Nuestra Historia</h2>
        <p className="text-lg text-gray-800">
          En nuestra tienda, nos apasiona ofrecer los mejores productos con la mejor atención. Fundada en 2020, nuestra misión es
          proporcionar una experiencia de compra inigualable. Desde productos innovadores hasta un servicio al cliente excepcional,
          trabajamos arduamente para cumplir nuestras promesas y superar tus expectativas.
        </p>
      </section>

      {/* Productos de exhibición */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">Productos de Exhibición</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((id) => (
            <div key={id} className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl">
              <img src={`producto${id}.jpg`} alt={`Imagen de producto ${id}`} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Producto {id}</h3>
                <p className="text-gray-800 mb-4">Descripción del producto {id}</p>
                <p className="text-xl font-bold mb-4">$19.99</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors w-full">Comprar ahora</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reseñas de clientes */}
      <section className="mb-16 text-center">
        <h2 className="text-4xl font-bold mb-6 text-gray-900">Reseñas de Nuestros Clientes</h2>
        <div className="flex flex-col md:flex-row md:justify-around">
          {[1, 2, 3].map((id) => (
            <div key={id} className="bg-white border border-gray-300 rounded-lg p-6 shadow-lg mb-6 md:mb-0 md:w-1/3">
              <p className="text-gray-800 mb-4">
                "Excelente servicio y productos de alta calidad. Definitivamente volveré a comprar aquí. - Cliente {id}"
              </p>
              <h4 className="font-semibold text-gray-900">Cliente {id}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Preguntas o atención */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-900">Preguntas o Atención</h2>
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-gray-900">¿Tienes alguna pregunta?</h3>
          <p className="text-lg text-gray-800 mb-4">Estamos aquí para ayudarte. Puedes contactarnos para resolver cualquier duda o solicitar atención.</p>
          <form className="space-y-4">
            <input type="text" placeholder="Nombre" className="w-full p-3 border border-gray-300 rounded-lg" />
            <input type="email" placeholder="Correo electrónico" className="w-full p-3 border border-gray-300 rounded-lg" />
            <textarea placeholder="Tu mensaje" className="w-full p-3 border border-gray-300 rounded-lg h-32"></textarea>
            <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors w-full">Enviar Mensaje</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
