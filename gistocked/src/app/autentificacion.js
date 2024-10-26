
'use client';
import './globals.css';
import Login from './auth/UserLogin/page';
import Register from './auth/UserRegister/page';

import { useState } from 'react';

const Autentificacion = ({ usuarioActivo, setUsuarioActivo, setUsuarioInfo }) => {
const [actual, setActual] = useState('Login');

  const controlRutas = () => {
    console.log(actual);

    
    if (actual == 'Login') {
      return (
          <Login
            setUsuarioActivo={setUsuarioActivo}
            setUsuarioInfo={setUsuarioInfo}
            setActual={setActual}
          />
      );
    } else if (actual == 'Register') {
      return (
          <Register
          setActual={setActual}
          />
      )
    }
  };

  if (!usuarioActivo) {
    return controlRutas();
  }
};

export default Autentificacion;