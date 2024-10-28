"use client";
import { useState, useEffect } from 'react';
import UserTable from './UserTable';
import UserModal from './UserModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Usuarios = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetch('http://190.114.252.218:8000/api/usuarios/')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error al cargar usuarios:', error));
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditUser(null);
  };

  const handleAddUser = (newUser) => {
    fetch('http://190.114.252.218:8000/api/usuarios/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(response => response.json())
      .then(data => {
        setUsers(prevUsers => [...prevUsers, data]);
        handleCloseModal();
      })
      .catch(error => console.error('Error al agregar usuario:', error));
  };

  const handleDelete = (codigoVendedor) => {
    fetch(`http://190.114.252.218:8000/api/usuarios/${codigoVendedor}/`, {
      method: 'DELETE'
    })
      .then(() => {
        setUsers(prevUsers => prevUsers.filter(user => user.codigo_vendedor !== codigoVendedor));
      })
      .catch(error => console.error('Error al eliminar usuario:', error));
  };

  const handleEdit = (user) => {
    setEditUser(user);
    handleOpenModal();
  };

  const handleSaveEdit = (updatedUser) => {
    fetch(`http://190.114.252.218:8000/api/usuarios/${updatedUser.codigo_vendedor}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedUser)
    })
      .then(response => response.json())
      .then(data => {
        setUsers(prevUsers => prevUsers.map(user => user.codigo_vendedor === data.codigo_vendedor ? data : user));
        handleCloseModal();
      })
      .catch(error => console.error('Error al editar usuario:', error));
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
