<<<<<<< HEAD
// src/app/layout.js

import Layout from '@/components/layout';
import './globals.css';

import { UserProvider } from './globalsUsers';
=======
"use client";

import './globals.css';
import Sidebar from './components/sidebar';
>>>>>>> comits-nuevo

const Layout = ({ children }) => {
  return (
    <html lang="es">
<<<<<<< HEAD
      <body>
        <UserProvider>
          <Layout>
            {children}
          </Layout>
        </UserProvider>
=======
      <body className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-100">
          {children}
        </div>
>>>>>>> comits-nuevo
      </body>
    </html>
  );
};

export default Layout;
