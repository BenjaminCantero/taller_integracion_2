import React from 'react';

const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="text-left py-3 px-4">ID</th>
            <th className="text-left py-3 px-4">Nombre</th>
            <th className="text-left py-3 px-4">Email</th>
            <th className="text-left py-3 px-4">Rol</th>
            <th className="text-left py-3 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{user.id}</td>
              <td className="py-2 px-4">{user.nombre}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.rol}</td>
              <td className="py-2 px-4 flex space-x-2">
                <button
                  onClick={() => onEdit(user)}
                  className="edit-btn bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(user.id)}
                  className="delete-btn bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
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
