import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-between px-4">
        <div className="flex space-x-4">
          <a href="/about" className="hover:text-blue-400 transition-colors">Sobre Nosotros</a>
          <a href="/contact" className="hover:text-blue-400 transition-colors">Contacto</a>
          <a href="/privacy" className="hover:text-blue-400 transition-colors">Política de Privacidad</a>
        </div>
        <p className="text-center mt-4">
          © 2024 Gistocked. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
