
import React from 'react';

const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <div className='mt-8'>
      <table className='min-w-full bg-white shadow-lg shadow-blue-950'>
        <thead className='sticky top-0'>
          <tr className='text-white bg-gray-800'>
            <th className='p-3 text-center text-md font-semibold border-r border-b border-white rounded-tl-lg'>Código Vendedor</th>
            <th className='p-3 text-center text-md font-semibold border-r border-b border-white'>Nombre Usuario</th>
            <th className='p-3 text-center text-md font-semibold border-r border-b border-white'>Nombre Empresa</th>
            <th className='p-3 text-center text-md font-semibold border-r border-b border-white'>Email</th>
            <th className='p-3 text-center text-md font-semibold border-r border-b border-white'>Rol</th>
            <th className='p-3 text-center text-md font-semibold          border-b border-white rounded-tr-lg'>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr 
              key={user.codigo_vendedor} 
              className='text-black rounded-b-lg transition duration-1000 hover:bg-gray-200 '>
                <td className='py-5 px-6 border-b border-gray-300 text-md text-center'>{user.codigo_vendedor}</td>
                <td className='py-5 px-6 border-b border-gray-300 text-md text-center'>{user.nombre_usuario}</td>
                <td className='py-5 px-6 border-b border-gray-300 text-md text-center'>{user.nombre_empresa}</td>
                <td className='py-5 px-6 border-b border-gray-300 text-md text-center'>{user.email}</td>
                <td className='py-5 px-6 border-b border-gray-300 text-md text-center'>{user.id_rol}</td>

                <td className='py-5 px-6 border-b border-gray-300 text-md text-center'>
                  <div className='flex flex-col'>
                    <button
                      className='px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-500'
                      onClick={() => onEdit(user)}
                    >
                      Editar
                    </button>

                    <button
                      className='px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600   focus:ring-2 focus:ring-red-400  focus:ring-opacity-75 transition duration-500'
                      onClick={() => onDelete(user.codigo_vendedor)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
