"use client";

import { useState } from 'react';
import UserTable from './UserTable';
import UserModal from './UserModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Usuarios = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState([
    { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com', rol: 'Admin' },
    { id: 2, nombre: 'María López', email: 'maria@example.com', rol: 'Vendedor' },
    { id: 3, nombre: 'Carlos González', email: 'carlos@example.com', rol: 'Vendedor' },
    { id: 4, nombre: 'Ana Torres', email: 'ana@example.com', rol: 'Vendedor' },
    { id: 5, nombre: 'Luis Fernández', email: 'luis@example.com', rol: 'Vendedor' },
  ]);

  const [editUser, setEditUser] = useState(null);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditUser(null);
  };

  // Función para agregar un nuevo usuario
  const handleAddUser = (newUser) => {
    const updatedUsers = [...users, newUser];
    setUsers(reorderUserIds(updatedUsers)); // Reordena los IDs después de agregar
    handleCloseModal();
  };

  // Función para manejar la eliminación de usuarios
  const handleDelete = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(reorderUserIds(updatedUsers)); // Reordena los IDs después de eliminar
  };

  // Función para editar usuarios
  const handleEdit = (user) => {
    setEditUser(user);
    handleOpenModal();
  };

  // Función para guardar los cambios en el usuario editado
  const handleSaveEdit = (updatedUser) => {
    const updatedUsers = users.map(user => (user.id === updatedUser.id ? updatedUser : user));
    setUsers(reorderUserIds(updatedUsers)); // Reordena los IDs después de editar
    handleCloseModal();
  };

  // Función para reordenar los IDs de los usuarios
  const reorderUserIds = (usersArray) => {
    return usersArray.map((user, index) => ({
      ...user,
      id: index + 1, // Establece el ID basado en el índice
    }));
  };

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-blue-600">Gestión de Usuarios</h1>
      <button
        onClick={handleOpenModal}
        className="add-user-btn bg-blue-600 text-white px-6 py-2 rounded-md flex items-center mb-4 hover:bg-blue-700 transition"
      >
        <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
        Agregar Usuario
      </button>
      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
      {modalOpen && (
        <UserModal
          onClose={handleCloseModal}
          onAddUser={handleAddUser}
          onEditUser={editUser}
          onSaveEdit={handleSaveEdit}
        />
      )}
    </main>
  );
};

export default Usuarios;
