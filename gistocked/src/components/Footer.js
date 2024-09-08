export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Enlaces rápidos */}
          <div>
            <h3 className="font-bold text-lg mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li><a href="/stock" className="hover:text-blue-400">Ver Stock</a></li>
              <li><a href="/orders" className="hover:text-blue-400">Pedidos</a></li>
              <li><a href="/suppliers" className="hover:text-blue-400">Proveedores</a></li>
              <li><a href="/settings" className="hover:text-blue-400">Configuración</a></li>
            </ul>
          </div>
  
          {/* Contacto */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contacto</h3>
            <p>Email: soporte@gistocked.com</p>
            <p>Teléfono: +1 (555) 123-4567</p>
          </div>
  
          {/* Redes sociales */}
          <div>
            <h3 className="font-bold text-lg mb-4">Síguenos</h3>
            <ul className="space-x-4 flex">
              <li><a href="https://facebook.com" className="hover:text-blue-400">Facebook</a></li>
              <li><a href="https://twitter.com" className="hover:text-blue-400">Twitter</a></li>
              <li><a href="https://instagram.com" className="hover:text-blue-400">Instagram</a></li>
            </ul>
          </div>
        </div>
  
        <div className="text-center mt-8 text-gray-400">
          &copy; {new Date().getFullYear()} Gistocked. Todos los derechos reservados.
        </div>
      </footer>
    );
  }
  