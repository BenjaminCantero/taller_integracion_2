import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Bienvenido a Mi Tienda</h1>
      <p className="mb-6">
        Esta es una plataforma integral para la gestión de inventarios y ventas.
        Aquí puedes gestionar tus productos, consultar tus ventas y revisar el inventario de tu tienda.
      </p>

      <div className="flex flex-wrap justify-center mb-6">
        <Link href="/products" className="text-blue-500 hover:underline">Ver Productos</Link>
        <Link href="/sales" className="text-blue-500 hover:underline">Ver Ventas</Link>
        <Link href="/inventory" className="text-blue-500 hover:underline">Gestionar Inventario</Link>
      </div>

      {/* Sección de reseñas */}
      <h2 className="text-3xl font-bold mb-4">Reseñas de nuestros clientes</h2>
      <div className="flex flex-wrap justify-center mb-6">
        <div className="w-full md:w-1/2 xl:w-1/3 p-4">
          <img src="imagen1.jpg" alt="Imagen de reseña 1" className="w-full h-64 object-cover" />
          <p className="text-lg">"Me encanta esta tienda, siempre encuentro lo que necesito."</p>
          <p className="text-sm">- Juan Pérez</p>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-4">
          <img src="imagen2.jpg" alt="Imagen de reseña 2" className="w-full h-64 object-cover" />
          <p className="text-lg">"La atención al cliente es excelente, siempre están dispuestos a ayudar."</p>
          <p className="text-sm">- María García</p>
        </div>
        {/* Agrega más reseñas aquí */}
      </div>

      {/* Sección de productos de muestra */}
      <h2 className="text-3xl font-bold mb-4">Productos de muestra</h2>
      <div className="flex flex-wrap justify-center mb-6">
        <div className="w-full md:w-1/2 xl:w-1/3 p-4">
          <img src="producto1.jpg" alt="Imagen de producto 1" className="w-full h-64 object-cover" />
          <p className="text-lg">Producto 1</p>
          <p className="text-sm">$19.99</p>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-4">
          <img src="producto2.jpg" alt="Imagen de producto 2" className="w-full h-64 object-cover" />
          <p className="text-lg">Producto 2</p>
          <p className="text-sm">$29.99</p>
        </div>
        {/* Agrega más productos aquí */}
      </div>

      {/* Carta que cuenta la historia de la tienda */}
      <h2 className="text-3xl font-bold mb-4">Nuestra historia</h2>
      <p className="mb-6">
        En Mi Tienda, nos enfocamos en brindar la mejor experiencia de compra posible a nuestros clientes.
        Nuestra historia comenzó hace 10 años, cuando nuestros fundadores decidieron crear una plataforma
        que uniera a los vendedores y compradores de manera sencilla y eficiente.
        Desde entonces, hemos crecido y mejorado constantemente, siempre con el objetivo de
        brindar el mejor servicio posible a nuestros clientes.
      </p>
    </div>
  );
}