"use client";

import './globals.css';
import Sidebar from './components/sidebar';
import { useState, useEffect } from 'react';

const Layout = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading spinner
  }

  return (
    <html lang="es">
      <body className="flex h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 ml-64">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
};

export default Layout;

