"use client";

import './globals.css';
import Autentificacion from './autentificacion';
import Sidebar from './components/sidebar';
import 'leaflet/dist/leaflet.css';


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

  const [usuariosAdminTemporales, setUsuariosAdminTemporales] = useState({});
  const [usuariosVendedoresTemporales, setUsuariosVendedoresTemporales] = useState({});


// -----------------------------------------------
// Carga la información de los usuarios temporales
// -----------------------------------------------
  useEffect(() => {
    const cargaUsuariosAdminTemporales = () => {
      setUsuariosAdminTemporales(
           [
               { codigo_vendedor:1, nombre_usuario:'admin1', nombre_empresa:'Empresa 0', password:'123', email:'admin1@gmail.com', id_rol:1, id_admin:1}
           ]
       );
   }

   const cargaUsuariosVendedoresTemporales = () => {
       setUsuariosVendedoresTemporales(
           [
               { id_vendedores:2, nombres:'vendedor1', apellidos:'v1', rut:'111111111', contraseña:'123', id_admin:1, id_rol:2, nombre_empresa:'Empresa 0'}
           ]
       )
   }

   setPagina('Home'); // Primera pagina que vera el usuario
   cargaUsuariosAdminTemporales();
   cargaUsuariosVendedoresTemporales();
}, []);

  const renderPage = () => {
    if (pagina === 'Home') {
      return <Home usuarioInfo={usuarioInfo} />
    } else if (pagina === 'Dashboard') {
      return <Dasboard />;
    } else if (pagina === 'Usuarios') {
      return <Usuarios usuarioInfo={usuarioInfo} usuariosAdminTemporales={usuariosAdminTemporales} usuariosVendedoresTemporales={usuariosVendedoresTemporales}/>
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
              usuariosAdminTemporales={usuariosAdminTemporales}
              usuariosVendedoresTemporales={usuariosVendedoresTemporales}
              setUsuariosAdminTemporales={setUsuariosAdminTemporales}
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
