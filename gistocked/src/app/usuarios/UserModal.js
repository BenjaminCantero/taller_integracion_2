
import React, { useState, useEffect } from 'react';

const UserModal = ({ onClose, onAddUser, onEditUser, onSaveEdit, usuarioActivoTemporal, usuarioActivoApi, usuariosAdminTemporales, setUsuariosAdminTemporales }) => {
  // Variables de control
  const [control, setControl] = useState(true);
  const [adminType, setAdminType] = useState(false);
  const [vendedorType, setVededorType] = useState(false);
  
  // Atributos de los administradores
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [idRol, setIdRol] = useState(1);

  // Atributos de los Vendedores
  const [rut, setRut] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [idRolVendedor, setIdRolVendedor] = useState(2);
  const [passwordVendedor, setPasswordVendedor] = useState('');
  const [nombreEmpresaVendedor, setNombreEmpresaVendedor] = useState('');

  useEffect(() => {
    if (onEditUser) {
      setNombreUsuario(onEditUser.nombre_usuario);
      setEmail(onEditUser.email);
      setNombreEmpresa(onEditUser.nombre_empresa);
      setIdRol(onEditUser.id_rol);
    } else {
      setNombreUsuario('');
      setEmail('');
      setNombreEmpresa('');
      setPassword('');
      setIdRol(2);
    }
  }, [onEditUser]);

  const adminForm = () => {
    setControl(false);
    setAdminType(true);
  }

  const vendedorForm = () => {
    setControl(false);
    setVededorType(true);
  }

  // Valido solo para los usuarios Temporales (API apagada)
  const crearUsuario = () => {
    const usuarioNuevo = {
      codigo_vendedor: usuariosAdminTemporales.length +1,
      nombre_usuario: nombreUsuario,
      nombre_empresa: nombreEmpresa,
      password: password,
      email: email,
      pin: 123,
      id_rol: idRol,
      id_admin: 1,
    }
    setUsuariosAdminTemporales(prevUsuarios => [
        ...prevUsuarios,
        usuarioNuevo
    ]);
    onClose();
};

  // Valido solo para los usuarios Temporales (API apagada)
  const editarInformacion = () => {  
    // Actualiza la bd ficticia
    setUsuariosAdminTemporales(prevState => {
        return prevState.map(usuario => 
            usuario.codigo_vendedor === onEditUser.codigo_vendedor
                ? {
                    ...usuario,
                    ...(nombreUsuario && { nombre_usuario: nombreUsuario }),
                    ...(email ? { email: email } : {}),
                    ...(password ? { password: password} : {}),
                    ...(nombreEmpresa ? { nombre_empresa: nombreEmpresa} : {}),
                    ...(idRol ? {id_rol: idRol} : {})
                    }
                : usuario // Retorna el usuario sin cambios si no coincide
        );
    });
    onClose();
};

  // Selecciona la función correcta dependiendo de si la 'API esta encendida o apagada'
  const handleSubmit = (e) => {
    e.preventDefault();

    // Carga al usuario con la información requerida por la API
    const userPayload = {
      codigo_vendedor: onEditUser ? onEditUser.codigo_vendedor : undefined,
      nombre_usuario: nombreUsuario,
      nombre_empresa: nombreEmpresa,
      password: password || onEditUser.password,
      email: email,
      pin: 123,
      id_rol: idRol,
      id_admin: 1,
    };

    // Controla que acción se ejecutará
    if (onEditUser) { // Edición de un usuario
      if (usuarioActivoApi) { // Función de la API encendida
        onSaveEdit(userPayload);
      } else if (usuarioActivoTemporal) { // Función de la API apagada
        editarInformacion();
      }
    } else { // Creación de usuario
      if (usuarioActivoApi) { // Función de la API encendida
        onAddUser(userPayload);
      } else if (usuarioActivoTemporal) { // Función de la API apagada
        crearUsuario();
      }
    }
    
    onClose();
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      {control ? (
      <div className='p-10 bg-white rounded-lg'>
        <ul className='space-y-5 text-black'>
              {/* ------------------ Bienvenida al cliente ------------------- */}
            <li className='font-racing_sans_one text-center'>
                <div>
                    <h2 className='text-4xl'>Seleccione un tipo de usuario</h2>
                </div>
            </li>

            {/* --------------------- Administrador  --------------------- */}
            <li className='font-racing_sans_one text-center text-lg'>
                <div className='py-1 border border-black rounded-xl'>
                    <button
                    onClick={adminForm}
                    className='w-full'
                    >
                        Administrador
                    </button>
                </div> 
            </li>

            {/* --------------------- Vendedor -------------------- */}
            <li className='font-racing_sans_one text-center text-lg'>
                <div className='py-1 border border-black rounded-xl'>
                    <button
                    onClick={vendedorForm}
                    className='w-full'
                    >
                        Vendedor
                    </button>
                </div> 
            </li>
        </ul>
      </div>
      ) : null}

      {adminType ? (
      <div className='p-8 w-full max-w-3xl relative bg-white rounded-lg modal-content'>
        {/* Boton que cierra el formulario */}
        <span
          className='close-btn absolute top-4 right-4 text-gray-500 text-2xl cursor-pointer hover:text-gray-700 transition duration-300'
          onClick={onClose}
        >
          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-x-lg' viewBox='0 0 16 16'>
            <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z' stroke='currentColor' strokeWidth='1' fill='none'/>
          </svg>
        </span>

        {/* Selecciona mensaje en función de la acción a realizar */}
        <h2 className='text-2xl font-semibold mb-6 text-gray-800'>
          {onEditUser ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}
        </h2>

        {/* ----------------------------------------------------------------------- */}
        {/* --------------- Formulario para agregar Administradores --------------- */}
        {/* ----------------------------------------------------------------------- */}
        <form onSubmit={handleSubmit}>
          <ul>
            <li className='mb-6'>
              <label htmlFor='nombreUsuario' className='block text-lg text-gray-700 font-medium mb-2'>Nombre</label>
              <input
                type='text'
                id='nombreUsuario'
                required
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                placeholder={onEditUser ? onEditUser.nombreUsuario : 'Nombre de Usuario'}
                className='inputsUsuarios px-4 py-2 w-full text-black text-lg border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:border-2 focus:border-blue-400 transition duration-200'
              />
            </li>

            <li className='mb-6'>
              <label htmlFor='email' className='block text-lg text-gray-700 font-medium mb-2'>Email</label>
              <input
                type='email'
                id='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={onEditUser ? onEditUser.nombreUsuario : 'Nuevo Email'}
                className='inputsUsuarios px-4 py-2 w-full text-black text-lg border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:border-2 focus:border-blue-400 transition duration-200'
              />
            </li>

            <li className='mb-6'>
              <label htmlFor='password' className='block text-lg text-gray-700 font-medium mb-2'>Contraseña</label>
              <input
                type='password'
                id='password'
                required={!onEditUser} // Es obligatorio cuando se crea un usuario nuevo
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={onEditUser ? ('X'.repeat(onEditUser.password.length)) : 'Nueva Contraseña'}
                className='inputsUsuarios px-4 py-2 w-full text-black text-lg border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:border-2 focus:border-blue-400 transition duration-200'
              />
            </li>

            <li className='mb-6'>
              <label htmlFor='nombreEmpresa' className='block text-lg text-gray-700 font-medium mb-2'>Nombre de Empresa</label>
              <input
                type='text'
                id='nombreEmpresa'
                required
                value={nombreEmpresa}
                onChange={(e) => setNombreEmpresa(e.target.value)}
                placeholder={onEditUser ? onEditUser.nombreUsuario : 'Nombre de la Empresa'}
                className='inputsUsuarios px-4 py-2 w-full text-black text-lg border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:border-2 focus:border-blue-400 transition duration-200'
              />
            </li>

            <li className='mb-6'>
              <label htmlFor='idRol' className='block text-lg text-gray-700 font-medium mb-2'>Rol</label>
              <input
                id='idRol'
                value={'Administrador'}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200'
              >
              </input>
            </li>

            <li>
              <div className='flex flex-row justify-end'>
                <button
                  type='submit'
                  className='px-4 py-2 mr-2 text-white bg-blue-600 hover:bg-blue-800 transition duration-500 rounded-lg'
                >
                  {onEditUser ? 'Guardar Cambios' : 'Agregar'}
                </button>

                <button
                  type='button'
                  onClick={onClose}
                  className='px-4 py-2 text-white bg-red-500 hover:bg-red-600 transition duration-500 rounded-lg'
                >
                  Cancelar
                </button>
              </div>
            </li>
          </ul>         
        </form>
      </div>
    ) : null}

      {vendedorType ? (
      <div className='p-6 w-full max-w-3xl relative bg-white rounded-lg modal-content'>
        {/* Boton que cierra el formulario */}
        <span
          className='close-btn absolute top-4 right-4 text-gray-500 text-2xl cursor-pointer hover:text-gray-700 transition duration-300'
          onClick={onClose}
        >
          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-x-lg' viewBox='0 0 16 16'>
            <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z' stroke='currentColor' strokeWidth='1' fill='none'/>
          </svg>
        </span>

        {/* Selecciona mensaje en función de la acción a realizar */}
        <h2 className='text-2xl font-semibold mb-6 text-gray-800'>
          {onEditUser ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}
        </h2>

        {/* ----------------------------------------------------------------------- */}
        {/* ----------------- Formulario para agregar Vendedores ------------------ */}
        {/* ----------------------------------------------------------------------- */}
        <form onSubmit={handleSubmit}>
          <ul>
            {/* Nombres */}
            <li className='mb-4'>
              <label htmlFor='nombreUsuario' className='block text-lg text-gray-700 font-medium mb-1'>Nombre</label>
              <input
                type='text'
                id='nombreUsuarioVendedor'
                required
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
                placeholder={onEditUser ? onEditUser.nombres : 'Nombre de Usuario'}
                className='inputsUsuarios px-4 py-2 w-full text-black text-lg border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:border-2 focus:border-blue-400  transition duration-200'
              />
            </li>

            {/* Apellidos */}
            <li className='mb-4'>
              <label htmlFor='nombreUsuario' className='block text-lg text-gray-700 font-medium mb-1'>Nombre</label>
              <input
                type='text'
                id='apellidosUsuarioVendedor'
                required
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                placeholder={onEditUser ? onEditUser.nombres : 'Nombre de Usuario'}
                className='inputsUsuarios px-4 py-2 w-full text-black text-lg border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:border-2 focus:border-blue-400  transition duration-200'
              />
            </li>

            {/* RUT */}
            <li className='mb-4'>
              <label htmlFor='rut' className='block text-lg text-gray-700 font-medium mb-1'>Rut</label>
              <input
                type='text'
                id='rutVendedor'
                required
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                placeholder={onEditUser ? onEditUser.nombres : 'Rut de la persona'}
                className='inputsUsuarios px-4 py-2 w-full text-black text-lg border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:border-2 focus:border-blue-400  transition duration-200'
              />
            </li>

            {/* Contraseña */}
            <li className='mb-4'>
              <label htmlFor='password' className='block text-lg text-gray-700 font-medium mb-1'>Contraseña</label>
              <input
                type='password'
                id='passwordVendedor'
                required={!onEditUser} // Es obligatorio cuando se crea un usuario nuevo
                value={passwordVendedor}
                onChange={(e) => setPasswordVendedor(e.target.value)}
                placeholder={onEditUser ? ('X'.repeat(onEditUser.passwordVendedor.length)) : 'Nueva Contraseña'}
                className='inputsUsuarios px-4 py-2 w-full text-black text-lg border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:border-2 focus:border-blue-400  transition duration-200'
              />
            </li>

            {/* Nombre de Empresa */}
            <li className='mb-4'>
              <label htmlFor='nombreEmpresa' className='block text-lg text-gray-700 font-medium mb-1'>Nombre de Empresa</label>
              <input
                type='text'
                id='nombreEmpresaVendedor'
                required
                value={nombreEmpresaVendedor}
                onChange={(e) => setNombreEmpresaVendedor(e.target.value)}
                placeholder={onEditUser ? onEditUser.nombre_empresa : 'Nombre de la Empresa'}
                className='inputsUsuarios px-4 py-2 w-full text-black text-lg border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:border-2 focus:border-blue-400  transition duration-200'
              />
            </li>

            {/* ROL */}
            <li className='mb-4'>
              <label htmlFor='idRol' className='block text-lg text-gray-700 font-medium mb-1'>Rol</label>
              <input
                id='idRolVendedor'
                readOnly
                value={'Vendedor'}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200'
              >
              </input>
            </li>

            {/* Botones */}
            <li>
              <div className='flex flex-row justify-end'>
              <button
                  type='submit'
                  className='px-4 py-2 mr-2 text-white bg-blue-600 hover:bg-blue-800 transition duration-500 rounded-lg'
                >
                  {onEditUser ? 'Guardar Cambios' : 'Agregar'}
                </button>

                <button
                  type='button'
                  onClick={onClose}
                  className='px-4 py-2 text-white bg-red-500 hover:bg-red-600 transition duration-500 rounded-lg'
                >
                  Cancelar
                </button>
              </div>
            </li>
          </ul>         
        </form>
      </div>
    ) : null}
   </div>
  )
};

export default UserModal;
