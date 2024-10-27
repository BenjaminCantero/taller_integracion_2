
'use client';
import './globals.css';
import Login from './auth/UserLogin/page';
import Register from './auth/UserRegister/page';

import { useState, useEffect} from 'react';

const Autentificacion = ({ usuarioActivo, setUsuarioActivo, setUsuarioInfo }) => {
const [actual, setActual] = useState('Login');

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

    cargaUsuariosAdminTemporales();
    cargaUsuariosVendedoresTemporales();
}, []);

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