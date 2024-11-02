
import React from 'react';

const UserTable = ({ 
                      usuariosAdminTemporales, 
                      usuariosVendedoresTemporales,
                      setUsuariosAdminTemporales,
                      usuarioInfo, 
                      users, 
                      onEdit, 
                      onDelete,
                      usuarioActivoTemporal,
                      usuarioActivoApi
                  }) => {

  const usuariosTablaApi = users.filter(user => user.nombre_empresa === usuarioInfo.nombre_empresa);
  const tablaEstaVaciaApi = usuariosTablaApi.length < 1;

  const usuariosTablaTemporales = usuariosAdminTemporales.filter(admin => admin.nombre_empresa === usuarioInfo.nombre_empresa);
  const tablaEstaVaciaTemporales = usuariosTablaTemporales.length < 1;

    // Valido solo para los usuarios Temporales
    const eliminarUsuario = (codigo) => {
      setUsuariosAdminTemporales(prevState => {
        return prevState.filter(usuario => usuario.codigo_vendedor !== codigo);
      });
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
        {/* ---------------------------------- Muestra los usuarios de la API ----------------------------------- */}
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
                <td className='py-5 px-6 border-b border-gray-300 text-md text-center'>{user.codigo_vendedor}</td>
                <td className='py-5 px-6 border-b border-gray-300 text-md text-center'>{user.nombre_usuario}</td>
                <td className='py-5 px-6 border-b border-gray-300 text-md text-center'>{user.nombre_empresa}</td>
                <td className='py-5 px-6 border-b border-gray-300 text-md text-center'>{user.email}</td>
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
                      onClick={() => onDelete(user.codigo_vendedor)}
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
        {/* --------------------------------- Muestra los usuarios Temporales ----------------------------------- */}
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
                <td className='py-5 px-6 border-b border-gray-300 text-md text-center'>{user.codigo_vendedor}</td>
                <td className='py-5 px-6 border-b border-gray-300 text-md text-center'>{user.nombre_usuario}</td>
                <td className='py-5 px-6 border-b border-gray-300 text-md text-center'>{user.nombre_empresa}</td>
                <td className='py-5 px-6 border-b border-gray-300 text-md text-center'>{user.email}</td>
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
                      onClick={() => eliminarUsuario(user.codigo_vendedor)}
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
