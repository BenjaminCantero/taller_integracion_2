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
    e.preventDefault(); // Evita el comportamiento por defecto del formulario

    if (onEditUser) {
      // Si estamos editando, llamamos a la función para guardar los cambios
      const updatedUser = {
        id: onEditUser.id, // Usamos el ID del usuario que se está editando
        nombre: name,
        email: email,
        rol: role,
      };
      onSaveEdit(updatedUser);
    } else {
      // Si estamos agregando un nuevo usuario
      const newUser = {
        id: Date.now(), // Genera un ID único usando la marca de tiempo
        nombre: name,
        email: email,
        rol: role,
      };
      onAddUser(newUser); // Llama a la función para agregar el nuevo usuario
    }

    onClose(); // Cierra el modal
  };

  return (
    <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal-content bg-white rounded-lg shadow-lg p-6">
        <span
          className="close-btn cursor-pointer text-gray-500 float-right"
          onClick={onClose}
        >
          &times;
        </span>
        <h2 className="text-xl font-semibold mb-4">{onEditUser ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)} // Maneja el cambio en el campo de nombre
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
          />

          <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Maneja el cambio en el campo de email
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
          />

          <label htmlFor="role" className="block text-gray-700 font-medium mb-1">Rol</label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)} // Maneja el cambio en el campo de rol
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
          >
            <option value="admin">Administrador</option>
            <option value="user">Usuario</option>
          </select>

          <button
            type="submit"
            className="submit-btn bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            {onEditUser ? 'Guardar Cambios' : 'Guardar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
