"use client";

import './globals.css';
import Autentificacion from './autentificacion';
import Sidebar from './components/sidebar';

import Home from './page';
import Dasboard from './dashboard/page';
import Usuarios from './usuarios/page';
import Productos from './productos/page';
import ProductManager from './ventas/page';
import Configuraciones from './configuraciones/page';

import { useState, useEffect } from 'react';

const Layout = () => {
  const [usuarioActivo, setUsuarioActivo] = useState(false);
  const [usuarioInfo, setUsuarioInfo] = useState({});
  const [pagina, setPagina] = useState('');

  useEffect(() => {
    setPagina('Home'); 
  }, []);

  const renderPage = () => {
    if (pagina === 'Home') {
      return <Home usuarioInfo={usuarioInfo} />
    } else if (pagina === 'Dashboard') {
      return <Dasboard />;
    } else if (pagina === 'Usuarios') {
      return <Usuarios />
    } else if (pagina === 'Productos') {
      return <Productos />
    } else if (pagina === 'Ventas') {
      return <ProductManager />
    } else if  (pagina === 'Configuraciones') {
      return <Configuraciones usuarioInfo={usuarioInfo} setUsuarioInfo={setUsuarioInfo}/>
    }
  };

  return (
    <html lang="es">
      <body>
        {
          !usuarioActivo ? (
            <Autentificacion
              usuarioActivo={usuarioActivo}
              setUsuarioActivo={setUsuarioActivo}
              setUsuarioInfo={setUsuarioInfo}
              usuarioInfo={usuarioInfo}
            />
          ) : (
            <Sidebar
              setUsuarioActivo={setUsuarioActivo}
              setUsuarioInfo={setUsuarioInfo}
              usuarioInfo={usuarioInfo}
              setPagina={setPagina}
              >
                {renderPage()}
            </Sidebar>
          )
        }
      </body>
    </html>
  );
};

export default Layout;