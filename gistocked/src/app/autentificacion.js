
'use client';
import './globals.css';
import Login from './auth/UserLogin/page';
import Register from './auth/UserRegister/page';

import { useState } from 'react';

const Autentificacion = ({ usuariosAdminTemporales, usuariosVendedoresTemporales, setUsuariosAdminTemporales, usuarioActivo, setUsuarioActivo, setUsuarioInfo }) => {
const [actual, setActual] = useState('Login');

  const controlRutas = () => {
    if (actual == 'Login') {
      return (
          <Login
            usuariosAdminTemporales={usuariosAdminTemporales}
            usuariosVendedoresTemporales={usuariosVendedoresTemporales}
            usuarioActivo={usuarioActivo}
            setUsuarioActivo={setUsuarioActivo}
            setUsuarioInfo={setUsuarioInfo}
            setActual={setActual}
          />
      );
    } else if (actual == 'Register') {
      return (
          <Register
            setActual={setActual}
            setUsuariosAdminTemporales={setUsuariosAdminTemporales}
          />
      )
    }
  };

  if (!usuarioActivo) {
    return controlRutas();
  }
};

export default Autentificacion;