
'use client'
import './globals.css';

//import Layout from '@/components/layout';
//import UserLogin from './auth/UserLogin/page';
//import UserRegister from './auth/UserRegister/page';
import Login from './auth/login/page';

import { useState, useEffect } from 'react';

export default function RootLayout({ children }) {
  const [pagina, setPagina] = useState(1);
  const [administradores, setAdministradores] = useState({});
  const [vendedores, setVendedores] = useState({});
  const [usuarioActivo, setUsuarioActivo] = useState({});

  const agregarAdministrador = (nuevoAdministrador) => {
    const nuevoId = Object.keys(administradores).length + 1; // Genera un nuevo ID
    const administradorConId = { ...nuevoAdministrador, id: nuevoId }; // Crea un nuevo objeto con el ID

    setAdministradores((prevAdministradores) => ({
      ...prevAdministradores,
      [nuevoId]: administradorConId,
    }));
  };

  const agregarVendedor = (nuevoVendedor) => {
    const nuevoId = Object.keys(vendedores).length + 1; // Genera un nuevo ID
    const vendedorConId = { ...nuevoVendedor, id: nuevoId }; // Crea un nuevo objeto con el ID

    setVendedores((prevVendedores) => ({
      ...prevVendedores,
      [nuevoId]: vendedorConId,
    }));
  };

  useEffect( () => {
    setAdministradores({1:{id:1, nombre:'admin', correo:'admin@gmail.com', contrasena:'123', rol:1, vendedoresAsignados:0}});
    setVendedores({1:{id:1, nombre:'vendedor', correo:'vendedor@gmail.com', contrasena:'123', rol:2, administradorAsignado:1}});
  }, []);

  useEffect(() => {
    // Actualiza el historial cuando cambia la página
    window.history.pushState({ pagina }, '', `?pagina=${pagina}`);

    // Maneja el evento de popstate
    const handlePopState = (event) => {
      if (event.state) {
        setPagina(event.state.pagina);
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Limpia el evento al desmontar el componente
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [pagina]);

  console.log(administradores);
  console.log(vendedores);

  return (
    <html lang="es">
      <body>
        <Login></Login>
      {/*
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
              <UserRegister setPagina={setPagina} addAdministrador={agregarAdministrador} addVendedor={agregarVendedor}></UserRegister>
            )
          : (
              <Layout usuarioActivo={usuarioActivo}>{children}</Layout>
            )
        )
      }
      */}
      </body>
    </html>
  );
}
