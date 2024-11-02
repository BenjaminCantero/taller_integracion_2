
'use client';
import './globals.css';
import Login from './auth/UserLogin/page';
import Register from './auth/UserRegister/page';

import { useState } from 'react';

const Autentificacion = ({ 
                            usuariosAdminTemporales, 
                            usuariosVendedoresTemporales, 
                            setUsuariosAdminTemporales, 
                            usuarioActivo, 
                            setUsuarioActivo, 
                            setUsuarioInfo, 
                            setUsuarioActivoTemporal, 
                            setUsuarioActivoApi
                        }) => {
                          
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
            setUsuarioActivoTemporal={setUsuarioActivoTemporal}
            setUsuarioActivoApi={setUsuarioActivoApi}
          />
      );
    } else if (actual == 'Register') {
      return (
          <Register
            setActual={setActual}
            setUsuariosAdminTemporales={setUsuariosAdminTemporales}
            usuariosAdminTemporales={usuariosAdminTemporales}
          />
      )
    }
  };

  if (!usuarioActivo) {
    return controlRutas();
  }
};

export default Autentificacion;