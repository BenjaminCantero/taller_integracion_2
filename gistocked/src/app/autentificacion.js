
'use client';
import './globals.css';
import Login from './auth/UserLogin/page';

const Autentificacion = ({ usuarioActivo, setUsuarioActivo, setUsuarioInfo }) => {

  if (!usuarioActivo) {
    return (
      <div className='visible h-screen'>
        <Login
          setUsuarioActivo={setUsuarioActivo}
          setUsuarioInfo={setUsuarioInfo}
        />
      </div>
    );
  }
};

export default Autentificacion;