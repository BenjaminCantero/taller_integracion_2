"use client";

import './globals.css';
import Sidebar from './components/sidebar';
import Login from './auth/UserLogin/page';
import { useState } from 'react';

const Layout = ({ children }) => {
  const [usuarioActivo, setUsuarioActivo] = useState(false);
  const [usuarioInfo, setUsuarioInfo] = useState({}); 

  return (
    <html lang="es">
      <body>
        {usuarioActivo ? (
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
              {children}
            </div>
          </div>
        ) : (
          <Login 
          setUsuarioActivo={setUsuarioActivo} 
          setUsuarioInfo={setUsuarioInfo} />
        )}
      </body>
    </html>
  );
};

export default Layout;