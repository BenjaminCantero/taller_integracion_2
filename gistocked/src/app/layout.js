"use client";

import './globals.css';
import Sidebar from './components/sidebar';

const Layout = ({ children }) => {
  return (
    <html lang="es">
      <body className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-100">
          {children}
        </div>
      </body>
    </html>
  );
};

export default Layout;
