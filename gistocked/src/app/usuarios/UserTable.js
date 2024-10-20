import React from 'react';

const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
      <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
        <thead className="bg-gradient-to-r from-gray-800 to-gray-600 text-white">
          <tr>
            <th className="py-4 px-6 border-b text-left text-lg font-semibold">ID</th>
            <th className="py-4 px-6 border-b text-left text-lg font-semibold">Nombre</th>
            <th className="py-4 px-6 border-b text-left text-lg font-semibold">Email</th>
            <th className="py-4 px-6 border-b text-left text-lg font-semibold">Rol</th>
            <th className="py-4 px-6 border-b text-left text-lg font-semibold">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
              <td className="py-5 px-6 border-b text-md">{user.id}</td>
              <td className="py-5 px-6 border-b text-md">{user.nombre}</td>
              <td className="py-5 px-6 border-b text-md">{user.email}</td>
              <td className="py-5 px-6 border-b text-md">{user.rol}</td>
              <td className="py-5 px-6 border-b text-md">
                <button
                  className="inline-block px-4 py-2 mr-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300 ease-in-out"
                  onClick={() => onEdit(user)}
                >
                  Editar
                </button>
                <button
                  className="inline-block px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-300 ease-in-out"
                  onClick={() => onDelete(user.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;