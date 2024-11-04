
'use client';
import UserTable from './UserTable';
import UserModal from './UserModal';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Usuarios = ({
                    usuarioInfo, 
                    usuariosAdminTemporales, 
                    usuariosVendedoresTemporales, 
                    setUsuariosAdminTemporales, 
                    usuarioActivoTemporal, 
                    usuarioActivoApi
                }) => {

  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [userType, setUserType] = useState(null);

  {/* Carga inicial de los usuarios de la empresa */}
  useEffect(() => {
    fetch('http://190.114.252.218:8000/api/usuarios/')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error al cargar usuarios:', error));
  }, []);

  {/* Abre el formulario */}
  const handleOpenModal = () => {
    setModalOpen(true);

  };

  {/* Cierra el formulario */}
  const handleCloseModal = () => {
    setModalOpen(false);
    setEditUser(null);
  };

  {/* Agrega un nuevo usuario a la base de datos */}
  const handleAddUser = (newUser) => {
    console.log(JSON.stringify(newUser));
    fetch('http://190.114.252.218:8000/api/usuarios/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newUser)
    })
      .then(response => response.json())
      .then(data => {
        setUsers(prevUsers => [...prevUsers, data]);
        handleCloseModal();
      })
      .catch(error => console.error('Error al agregar usuario:', error));
  };

  {/* Elimina a un usuario de la base de datos */}
  const handleDelete = (codigoVendedor) => {
    fetch(`http://190.114.252.218:8000/api/usuarios/${codigoVendedor}/`, {
      method: 'DELETE'
    })
      .then(() => {
        setUsers(prevUsers => prevUsers.filter(user => user.codigo_vendedor !== codigoVendedor));
      })
      .catch(error => console.error('Error al eliminar usuario:', error));
  };

  {/* obtiene la información del usuario que se va a editar */}
  const handleEdit = (user) => {
    setEditUser(user);
    handleOpenModal();
  };

  {/* Edita la información de un usuario de la base de datos */}
  const handleSaveEdit = (updatedUser) => {
    fetch(`http://190.114.252.218:8000/api/usuarios/${updatedUser.codigo_vendedor}/`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
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
    <main className='p-8 min-h-screen bg-white '>
      <h1 className='mb-6 font-semibold text-blue-600 text-3xl'>Gestión de Usuarios</h1>
      <button
        disabled={usuarioInfo.id_rol != 1}
        onClick={handleOpenModal}
        className='px-6 py-2 mb-4 flex items-center text-white bg-blue-600 rounded-md add-user-btn hover:bg-blue-700 transition duration-500'
      >
        <FontAwesomeIcon 
          icon={faUserPlus} 
          className="mr-2" />
          Agregar Usuario
      </button>

      {usuarioInfo.id_rol != 1 &&
      <div className='flex flex-col'>
        <span className='py-2 mt-4 w-full font-racing_sans_one text-center text-lg text-white bg-red-600 rounded-lg'>
            <p>Lo sentimos NO cuenta con los permisos necesarios para realizar alguna acción en esta pagina</p>
        </span>
      </div>
        
      }

      <UserTable 
        usuariosAdminTemporales={usuariosAdminTemporales}
        usuariosVendedoresTemporales={usuariosVendedoresTemporales}
        setUsuariosAdminTemporales={setUsuariosAdminTemporales}
        usuarioInfo={usuarioInfo} // Info del usuario activo
        users={users} // Info de los usuarios que se mostrarán en la tabla
        onEdit={handleEdit} 
        onDelete={handleDelete}
        usuarioActivoTemporal={usuarioActivoTemporal}
        usuarioActivoApi={usuarioActivoApi}
      />

      {/* Formaulario oculto */}
      {modalOpen && (
        <UserModal
          onClose={handleCloseModal}
          onAddUser={handleAddUser}
          onEditUser={editUser}
          onSaveEdit={handleSaveEdit}
          usuarioActivoTemporal={usuarioActivoTemporal}
          usuarioActivoApi={usuarioActivoApi}
          usuariosAdminTemporales={usuariosAdminTemporales}
          setUsuariosAdminTemporales={setUsuariosAdminTemporales}
        />
      )}
    </main>
  );
};

export default Usuarios;
