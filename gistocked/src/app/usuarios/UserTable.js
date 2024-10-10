import React from 'react';

const UserTable = () => {
  // Ejemplo de datos de usuarios
  const users = [
    { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com', rol: 'Admin' },
    { id: 2, nombre: 'María López', email: 'maria@example.com', rol: 'Vendedor' },
    { id: 3, nombre: 'Carlos González', email: 'carlos@example.com', rol: 'Vendedor' },
    { id: 4, nombre: 'Ana Torres', email: 'ana@example.com', rol: 'Vendedor' },
    { id: 5, nombre: 'Luis Fernández', email: 'luis@example.com', rol: 'Vendedor' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 shadow-md">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-4 border-b text-left text-sm font-medium">ID</th>
            <th className="py-3 px-4 border-b text-left text-sm font-medium">Nombre</th>
            <th className="py-3 px-4 border-b text-left text-sm font-medium">Email</th>
            <th className="py-3 px-4 border-b text-left text-sm font-medium">Rol</th>
            <th className="py-3 px-4 border-b text-left text-sm font-medium">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="py-3 px-4 border-b">{user.id}</td>
              <td className="py-3 px-4 border-b">{user.nombre}</td>
              <td className="py-3 px-4 border-b">{user.email}</td>
              <td className="py-3 px-4 border-b">{user.rol}</td>
              <td className="py-3 px-4 border-b">
                <button className="text-blue-500 hover:underline">Editar</button>
                <button className="text-red-500 hover:underline ml-4">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
