import React, { useState, useEffect } from 'react';

const UserModal = ({ onClose, onAddUser, onEditUser, onSaveEdit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');

  useEffect(() => {
    if (onEditUser) {
      setName(onEditUser.nombre);
      setEmail(onEditUser.email);
      setRole(onEditUser.rol);
    } else {
      setName('');
      setEmail('');
      setRole('user');
    }
  }, [onEditUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onEditUser) {
      const updatedUser = {
        id: onEditUser.id,
        nombre: name,
        email: email,
        rol: role,
      };
      onSaveEdit(updatedUser);
    } else {
      const newUser = {
        id: Date.now(),
        nombre: name,
        email: email,
        rol: role,
      };
      onAddUser(newUser);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="modal-content w-full max-w-3xl bg-white rounded-lg shadow-lg p-8 relative">
        <span
          className="close-btn absolute top-4 right-4 text-gray-500 text-2xl cursor-pointer hover:text-gray-700 transition duration-300"
          onClick={onClose}
        >
          &times;
        </span>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          {onEditUser ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block text-lg text-gray-700 font-medium mb-2">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-lg text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="role" className="block text-lg text-gray-700 font-medium mb-2">Rol</label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            >
              <option value="admin">Administrador</option>
              <option value="user">Usuario</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              {onEditUser ? 'Guardar Cambios' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;