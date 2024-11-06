
import React from 'react';

const UserTable = ({ 
                      usuariosAdminTemporales, 
                      usuariosVendedoresTemporales,
                      setUsuariosAdminTemporales,
                      setUsuariosVendedoresTemporales,
                      usuarioInfo, 
                      users, 
                      onEdit, 
                      onDelete,
                      usuarioActivoTemporal,
                      usuarioActivoApi
                  }) => {

  // Guardan la información de los usuarios cuando la API esta encendida
  const usuariosTablaApi = users.filter(user => user.nombre_empresa === usuarioInfo.nombre_empresa && (user.codigo_vendedor !== usuarioInfo.codigo_vendedor || user.id_vendedor !== user.id_vendedor));
  const tablaEstaVaciaApi = usuariosTablaApi.length < 1;

  // Guardan la información de los usuarios cuando la API esta apagada
  const usuariosTablaTemporalesVendedores = usuariosVendedoresTemporales.filter(vendedor => vendedor.nombre_empresa === usuarioInfo.nombre_empresa)
  const usuariosTablaTemporalesAdmins = usuariosAdminTemporales.filter(admin => admin.nombre_empresa === usuarioInfo.nombre_empresa && admin.codigo_vendedor !== usuarioInfo.codigo_vendedor);
  const usuariosTablaTemporales =  usuariosTablaTemporalesVendedores.concat(usuariosTablaTemporalesAdmins);
  const tablaEstaVaciaTemporales = usuariosTablaTemporales.length < 1;

  // Valido solo para los usuarios Temporales (API apagada)
  const eliminarUsuario = (userType, codigo) => {
    if (userType === 1) {
      setUsuariosAdminTemporales(prevState => {
        return prevState.filter(admin => admin.codigo_vendedor !== codigo);
      });
    } else if (userType === 2) {
      setUsuariosVendedoresTemporales(prevState => {
        return prevState.filter(vendedor => vendedor.id_vendedores !== codigo);
      });
    }
      
  }

  return (
    <div className='mt-8 bg-gray-100 shadow-md shadow-blue-950'>
      <table className='min-w-full bg-white'>
        <thead className='sticky top-0'>
          <tr className='text-white bg-gray-800'>
            <th className='px-3 py-5 text-center text-md font-semibold'>Código Vendedor</th>
            <th className='px-3 py-5 text-center text-md font-semibold'>Nombre Usuario</th>
            <th className='px-3 py-5 text-center text-md font-semibold'>Nombre Empresa</th>
            <th className='px-3 py-5 text-center text-md font-semibold'>Email</th>
            <th className='px-3 py-5 text-center text-md font-semibold'>Rol</th>
            <th className='px-3 py-5 text-center text-md font-semibold'>Acciones</th>
          </tr>
        </thead>

        <tbody>
        {/* ----------------------------------------------------------------------------------------------------- */}
        {/* ----------------------- Muestra los usuarios de la API cuando esta encendida ------------------------ */}
        {/* ----------------------------------------------------------------------------------------------------- */}
        {usuarioActivoApi ? (
          tablaEstaVaciaApi ? (
            <tr>
              <td colSpan='6' className='py-5 px-6 text-center text-md font-semibold'>
                No se encontraron usuarios
              </td>
            </tr>
          ) : (
            usuariosTablaApi.map(user => (
              <tr 
                key={user.codigo_vendedor} 
                className='text-black rounded-b-lg hover:bg-[#ccdfe0] transition duration-500 ease-linear'>
                <td className='py-5 px-6 border-b border-gray-300 text-md text-center'>{user.id_rol === 1 ? user.codigo_vendedor : user.id_vendedores}</td>
                <td className='py-5 px-6 border-b border-gray-300 text-md text-center'>{user.id_rol === 1 ? user.nombre_usuario  : user.nombres}</td>
                <td className='py-5 px-6 border-b border-gray-300 text-md text-center'>{user.id_rol === 1 ? user.nombre_empresa  : user.nombre_empresa}</td>
                <td className='py-5 px-6 border-b border-gray-300 text-md text-center'>{user.id_rol === 1 ? user.email      : 'N/A'}</td>
                <td className='py-5 px-6 border-b border-gray-300 text-md text-center'>{user.id_rol === 1 ? 'Administrador' : 'Vendedor'}</td>
                <td className='py-5 px-6 border-b border-gray-300 text-md text-center'>
                  <div className='flex flex-col'>
                    <button
                      disabled={usuarioInfo.id_rol !== 1}
                      className='px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-500'
                      onClick={() => onEdit(user)}
                    >
                      Editar
                    </button>
                    <button
                      disabled={usuarioInfo.id_rol !== 1}
                      className='px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-500'
                      onClick={() => onDelete(user)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )
        ) : null}

        {/* ----------------------------------------------------------------------------------------------------- */}
        {/* ------------------------ Muestra los usuarios de la API cuando esta apagada ------------------------- */}
        {/* ----------------------------------------------------------------------------------------------------- */}
        {usuarioActivoTemporal ? (
          tablaEstaVaciaTemporales ? (
            <tr>
              <td colSpan='6' className='py-5 px-6 text-center text-md font-semibold'>
                No se encontraron usuarios
              </td>
            </tr>
          ) : (
            usuariosTablaTemporales.map(user => (
              <tr 
                key={user.codigo_vendedor} 
                className='text-black rounded-b-lg hover:bg-[#ccdfe0] transition duration-500 ease-linear'>
                <td className='py-5 px-6 border-b border-gray-300 text-md text-center'>{user.id_rol === 1 ? user.codigo_vendedor : user.id_vendedores}</td>
                <td className='py-5 px-6 border-b border-gray-300 text-md text-center'>{user.id_rol === 1 ? user.nombre_usuario  : user.nombres}</td>
                <td className='py-5 px-6 border-b border-gray-300 text-md text-center'>{user.id_rol === 1 ? user.nombre_empresa  : user.nombre_empresa}</td>
                <td className='py-5 px-6 border-b border-gray-300 text-md text-center'>{user.id_rol === 1 ? user.email      : 'N/A'}</td>
                <td className='py-5 px-6 border-b border-gray-300 text-md text-center'>{user.id_rol === 1 ? 'Administrador' : 'Vendedor'}</td>
                <td className='py-5 px-6 border-b border-gray-300 text-md text-center'>
                  <div className='flex flex-col'>
                    <button
                      disabled={usuarioInfo.id_rol !== 1}
                      className='px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-500'
                      onClick={() => onEdit(user)}
                    >
                      Editar
                    </button>
                    <button
                      disabled={usuarioInfo.id_rol !== 1}
                      className='px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-500'
                      onClick={() => eliminarUsuario(user.id_rol, (user.codigo_vendedor || user.id_vendedores))}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )
        ) : null}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
