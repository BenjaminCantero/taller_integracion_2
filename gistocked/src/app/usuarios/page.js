"use client";

import { useState, useEffect } from 'react';
import UserTable from './UserTable';
import UserModal from './UserModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

const API_BASE_URL = 'http://190.114.252.218:8000/api/usuarios/';

const Usuarios = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  // Función para obtener los usuarios desde la API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(API_BASE_URL);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditUser(null);
  };

  // Función para agregar un nuevo usuario a través de la API
  const handleAddUser = async (newUser) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      const createdUser = await response.json();
      setUsers((prevUsers) => [...prevUsers, createdUser]);
      handleCloseModal();
    } catch (error) {
      console.error("Error al agregar usuario:", error);
    }
  };

  // Función para eliminar un usuario a través de la API
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE_URL}${id}/`, {
        method: 'DELETE',
      });
      setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  // Función para editar usuarios
  const handleEdit = (user) => {
    setEditUser(user);
    handleOpenModal();
  };

  // Función para guardar los cambios en el usuario editado a través de la API
  const handleSaveEdit = async (updatedUser) => {
    try {
      const response = await fetch(`${API_BASE_URL}${updatedUser.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
      const savedUser = await response.json();
      setUsers((prevUsers) =>
        prevUsers.map(user => (user.id === savedUser.id ? savedUser : user))
      );
      handleCloseModal();
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-3xl font-semibold mb-6">Gestión de Usuarios</h1>
      <button
        onClick={handleOpenModal}
        className="add-user-btn bg-blue-600 text-white px-6 py-2 rounded-md flex items-center mb-4 hover:bg-blue-700 transition"
      >
        <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
        Agregar Usuario
      </button>
      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
      {modalOpen && <UserModal onClose={handleCloseModal} onAddUser={handleAddUser} onEditUser={editUser} onSaveEdit={handleSaveEdit} />}
    </main>
  );
};

export default Usuarios;
