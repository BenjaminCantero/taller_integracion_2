
'use client'
import Layout from '@/components/layout';
import UserLogin from './auth/UserLogin/page';
import { useState, useEffect } from 'react';
import './globals.css';
import UserRegister from './auth/UserRegister/page';

export default function RootLayout({ children }) {
  const [pagina, setPagina] = useState(1);
  const [administradores, setAdministradores] = useState({});
  const [vendedores, setVendedores] = useState({});
  const [usuarioActivo, setUsuarioActivo] = useState({});

  useEffect( () => {
    setAdministradores({1:{id:1, nombre:'admin', correo:'admin@gmail.com', contrasena:'123', rol:1, vendedoresAsignados:0}});
    setVendedores({1:{id:1, nombre:'vendedor', correo:'vendedor@gmail.com', contrasena:'123', rol:2, administradorAsignado:1}});
  }, []);

  return (
    <html lang="es">
      <body>
      {
        Object.keys(usuarioActivo).length === 0 && pagina == 1
        ? <UserLogin 
            administradores={administradores} 
            vendedores={vendedores} 
            setUsuarioActivo={setUsuarioActivo}
            setPagina={setPagina} 
          />
        : (
          Object.keys(usuarioActivo).length === 0 && pagina == 2
          ? (
              <UserRegister setPagina={setPagina}></UserRegister>
            )
          : (
              <Layout usuarioActivo={usuarioActivo}>{children}</Layout>
            )
        )
      }
      </body>
    </html>
  );
}
