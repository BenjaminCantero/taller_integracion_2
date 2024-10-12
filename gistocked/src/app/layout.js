"use client";

import './globals.css';
import Sidebar from './components/sidebar';

const Layout = ({ children }) => {
  return (
    <html lang="es">
      <body className="flex h-screen overflow-hidden">
        {/* Sidebar fija */}
        <Sidebar />
        
        {/* Contenido principal scrollable */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
          {children}
        </div>
      </body>
    </html>
  );
};

export default Layout;
