
import React, { useState, useEffect } from 'react';

const UserModal = ({ onClose, onAddUser, onEditUser, onSaveEdit, usuarioActivoTemporal, usuarioActivoApi, usuariosAdminTemporales, usuariosVendedoresTemporales, setUsuariosAdminTemporales, setUsuariosVendedoresTemporales, control, adminType, vendedorType, adminAddFrom, vendedorAddForm }) => {
  // Variables de control
  const [idRol, setIdRol] = useState(1);
  
  // Atributos de los administradores
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombreEmpresa, setNombreEmpresa] = useState('');

  // Atributos de los Vendedores
  const [rut, setRut] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
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
      setIdRol(1);
    }
  }, [onEditUser]);

  // Valido solo para los usuarios Temporales (API apagada)
  const crearUsuario = () => {
    if (idRol === 1) {
      const adminNuevo = {
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
          adminNuevo
      ]);
    } else if (idRol === 2) {
      const vendedorNuevo = {
        id_vendedores: usuariosVendedoresTemporales.length +1,
        nombres: nombres,
        apellidos: apellidos,
        rut: rut,
        contraseña: passwordVendedor,
        nombre_empresa: nombreEmpresaVendedor,
        id_rol: idRol,
        id_admin: 1,
      }
      setUsuariosVendedoresTemporales(prevUsuarios => [
          ...prevUsuarios,
          vendedorNuevo
      ]);
    }
    
    onClose();
};

  // Valido solo para los usuarios Temporales (API apagada)
  const editarInformacion = (roleType) => {
    if (roleType === 1) {
      // Actualiza la bd ficticia
      setUsuariosAdminTemporales(prevState => {
        return prevState.map(usuario => 
            usuario.codigo_vendedor === onEditUser.codigo_vendedor
                ? {
                    ...usuario,
                    ...(nombreUsuario ? {nombre_usuario: nombreUsuario} : onEditUser.nombreUsuario),
                    ...(email ? {email: email}  : onEditUser.email),
                    ...(password ? {password: password} : onEditUser.password),
                    ...(nombreEmpresa ? {nombre_empresa: nombreEmpresa} : onEditUser.nombre_empresa),
                    ...(idRol ? {id_rol: idRol} : onEditUser.id_rol)
                    }
                : usuario // Retorna el usuario sin cambios si no coincide
        );
    });
    } else if (roleType === 2) {
      console.log(usuariosVendedoresTemporales);
      // Actualiza la bd ficticia
      setUsuariosVendedoresTemporales(prevState => {
        return prevState.map(usuario => 
            usuario.id_vendedores === onEditUser.id_vendedores
                ? {
                    ...usuario,
                    ...(nombres ? {nombres: nombres} : onEditUser.nombres),
                    ...(apellidos ? {apellidos: apellidos} : onEditUser.apellidos),
                    ...(passwordVendedor ? {contraseña: passwordVendedor}  : onEditUser.contraseña),
                    ...(nombreEmpresaVendedor ? {nombre_empresa: nombreEmpresaVendedor} : onEditUser.nombre_empresa),
                    ...(idRol ? {id_rol: idRol} : onEditUser.id_rol)
                    }
                : usuario // Retorna el usuario sin cambios si no coincide
        );
    });
    console.log(usuariosVendedoresTemporales);
    }
    
    onClose();
};

  const setupAdminForm = () => {
    setIdRol(1);
    adminAddFrom()

  }

  const setupVendedoresForm = () => {
    setIdRol(2);
    vendedorAddForm();
  }

  // Valido para la API
  const crearAdminNuevo = () => {
    const userAddApi = {
      codigo_vendedor: undefined,
      nombre_usuario: nombreUsuario,
      nombre_empresa: nombreEmpresa,
      password: password,
      email: email,
      pin: 123,
      id_rol: idRol,
      id_admin: 1,
    };
    return userAddApi
  }

  // Valido para la API
  const crearVendedorNuevo = () => {
    const userAddVendedor = {
      id_vendedores: undefined,
      nombres: nombres,
      apellidos: apellidos,
      rut: rut,
      contraseña: passwordVendedor,
      id_admin: 1,
      nombre_empresa: nombreEmpresaVendedor
    }
    return userAddVendedor
  }

  const editarAdmin = () => {
    const userEditedApi = {
      codigo_vendedor: onEditUser.codigo_vendedor,
      nombre_usuario: nombreUsuario || onEditUser.nombre_usuario,
      nombre_empresa: nombreEmpresa || onEditUser.nombre_empresa,
      password: password || onEditUser.password,
      email: email || onEditUser.email,
      pin: onEditUser.pin || 123,
      id_rol: idRol || onEditUser,
      id_admin: 1,
    };
    return userEditedApi
  }

  const editarVendedor = () => {
    const userEditedApi = {
      id_vendedores: onEditUser.id_vendedores,
      nombres: nombres || onEditUser.nombres,
      apellidos: apellidos || onEditUser.apellidos,
      rut: rut || onEditUser.rut,
      contraseña: passwordVendedor || onEditUser.contraseña,
      id_admin: 1,
      nombre_empresa: nombreEmpresaVendedor || onEditUser.nombre_empresa
    }
    return userEditedApi
  }
  // Selecciona la función correcta dependiendo de si la 'API esta encendida o apagada'
  const handleSubmit = (e) => {
    e.preventDefault();

    // Controla que acción se ejecutará
    if (onEditUser) { // Edición de un usuario
      if (usuarioActivoApi) { // Función de la API encendida
        // Actualiza la información del usuario que pertenece a la API
        if (onEditUser.codigo_vendedor) {
          const userEditedApi = editarAdmin();
          setIdRol(1);
          onSaveEdit(userEditedApi);
        } else if (onEditUser.id_vendedores) {
          const userEditedApi = editarVendedor();
          setIdRol(2);
          onSaveEdit(userEditedApi)
        }
        
      } else if (usuarioActivoTemporal) { // Función de la API apagada
        editarInformacion(Number(onEditUser.id_rol));
      }
    } else { // Creación de usuario
      if (usuarioActivoApi) { // Función de la API encendida
        if (adminType) {
          const userAddApi = crearAdminNuevo();
          onAddUser(1, userAddApi);
        } else if (vendedorType) {
          const userAddVendedor = crearVendedorNuevo();
          onAddUser(2, userAddVendedor);
        }
        
      } else if (usuarioActivoTemporal) { // Función de la API apagada
        crearUsuario();
      }
    }
    
    onClose();
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      {control && !(onEditUser) ? (
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
                    onClick={setupAdminForm}
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
                    onClick={setupVendedoresForm}
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
      <div className='relative px-10 py-6 w-full max-w-xl h-5/6 flex flex-col bg-white rounded-lg modal-content overflow-y-scroll'>
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
                className='inputsUsuarios p-2 w-full text-black bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-2 focus:border-blue-400  transition duration-200'
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
                className='inputsUsuarios p-2 w-full text-black bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-2 focus:border-blue-400  transition duration-200'
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
                className='inputsUsuarios p-2 w-full text-black bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-2 focus:border-blue-400  transition duration-200'
              />
            </li>

            <li className='mb-6'>
              <label htmlFor='idRol' className='block text-lg text-gray-700 font-medium mb-2'>Rol</label>
              <select
                disabled={onEditUser}
                id='idRol'
                value={idRol}
                onChange={(e) => setIdRol(Number(e.target.value))}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200'
              >
                <option                      value={1}>Administrador</option>
                <option hidden={!onEditUser} value={2}>Vendedor</option>
              </select>
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
      <div className='relative px-10 py-8 w-full h-5/6 max-w-2xl flex flex-col bg-white rounded-lg modal-content overflow-y-auto'>
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
              <label htmlFor='nombreUsuarioVendedor' className='block text-lg text-gray-700 font-medium mb-1'>Nombre</label>
              <input
                type='text'
                id='nombreUsuarioVendedor'
                required={!onEditUser}
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
                placeholder={onEditUser ? onEditUser.nombres : 'Nombre de Usuario'}
                className='inputsUsuarios p-2 w-full text-black bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-2 focus:border-blue-400  transition duration-200'
              />
            </li>

            {/* Apellidos */}
            <li className='mb-4'>
              <label htmlFor='apellidosUsuarioVendedor' className='block text-lg text-gray-700 font-medium mb-1'>Apellidos</label>
              <input
                type='text'
                id='apellidosUsuarioVendedor'
                required={!onEditUser}
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                placeholder={onEditUser ? onEditUser.apellidos : 'Apellidos del Usuario'}
                className='inputsUsuarios p-2 w-full text-black bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-2 focus:border-blue-400  transition duration-200'
              />
            </li>

            {/* RUT */}
            <li hidden={onEditUser} className='mb-4'>
              <label htmlFor='rutVendedor' className='block text-lg text-gray-700 font-medium mb-1'>Rut</label>
              <input
                type='text'
                id='rutVendedor'
                required={!onEditUser}
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                placeholder={onEditUser ? onEditUser.nombres : 'Rut de la persona'}
                className='inputsUsuarios p-2 w-full text-black bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-2 focus:border-blue-400  transition duration-200'
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
                placeholder={onEditUser ? ('X'.repeat(onEditUser.contraseña.length)) : 'Nueva Contraseña'}
                className='inputsUsuarios p-2 w-full text-black bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-2 focus:border-blue-400  transition duration-200'
              />
            </li>

            {/* Nombre de Empresa */}
            <li className='mb-4'>
              <label htmlFor='nombreEmpresaVendedor' className='block text-lg text-gray-700 font-medium mb-1'>Nombre de Empresa</label>
              <input
                type='text'
                id='nombreEmpresaVendedor'
                required={!onEditUser}
                value={nombreEmpresaVendedor}
                onChange={(e) => setNombreEmpresaVendedor(e.target.value)}
                placeholder={onEditUser ? onEditUser.nombre_empresa : 'Nombre de la Empresa'}
                className='inputsUsuarios p-2 w-full text-black bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-2 focus:border-blue-400  transition duration-200'
              />
            </li>

            {/* ROL */}
            <li className='mb-4'>
              <label htmlFor='idRolVendedor' className='block text-lg text-gray-700 font-medium mb-1'>Rol</label>
              <select
                disabled={onEditUser}
                id='idRolVendedor'
                value={idRol}
                onChange={(e) => setIdRol(e.target.value)}
                className='inputsUsuarios p-2 w-full text-black bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-2 focus:border-blue-400  transition duration-200'
              >
                <option hidden={!onEditUser} value={1}>Administrador</option>
                <option                      value={2}>Vendedor</option>
              </select>
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
