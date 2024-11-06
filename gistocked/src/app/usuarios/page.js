
'use client';
import UserTable from './UserTable';
import UserModal from './UserModal';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';

const Usuarios = ({
                    usuarioInfo, 
                    usuariosAdminTemporales, 
                    usuariosVendedoresTemporales, 
                    setUsuariosAdminTemporales, 
                    setUsuariosVendedoresTemporales,
                    usuarioActivoTemporal, 
                    usuarioActivoApi
                }) => {

  const [users, setUsers] = useState([]);
  const [admins, setAdmis] = useState([]);
  const [vendedores, setVendedores] = useState([]);

  const [editUser, setEditUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [control, setControl] = useState(true);
  const [adminType, setAdminType] = useState(false);
  const [vendedorType, setVededorType] = useState(false);

  {/* Carga inicial de los usuarios de la empresa */}
  useEffect(() => {
    const getAdmins = async () => {
        try {
          const admins = await axios.get('http://190.114.252.218:8000/api/usuarios/', {});
          setAdmis(admins.data);
          return admins.data
      } catch (error) {
          console.error('Error al conectar con la api:', error);
          return []
      }}

    const getVendedores = async () => {
      try {
        const vendedores = await axios.get('http://190.114.252.218:8000/api/vendedores/', {});
        setVendedores(vendedores.data);
        return vendedores.data
    } catch (error) {
        console.error('Error al conectar con la api:', error);
        return []
    }}

    // Usa Promise.all para esperar ambas promesas
    const fetchData = async () => {
      try {
        const [admins, vendedores] = await Promise.all([getAdmins(), getVendedores()]);
        const aux = [...admins, ...vendedores]; // Concatenamos los datos
        setUsers(aux); // Establecer los usuarios
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

  fetchData();
      
  }, []);

  {/* Abre el formulario */}
  const handleOpenModal = () => {
    setModalOpen(true);
    setControl(true);

  };

  {/* Cierra el formulario */}
  const handleCloseModal = () => {
    setModalOpen(false);
    setControl(false);
    setAdminType(false);
    setVededorType(false)
    setEditUser(null);
  };

  const adminAddFrom = () => {
    setControl(false);
    setAdminType(true);
    setVededorType(false);
  }

  const vendedorAddForm = () => {
    setControl(false);
    setAdminType(false);
    setVededorType(true);
  }

  {/* Agrega un nuevo usuario a la base de datos */}
  const handleAddUser = (userType, newUser) => {
    console.log(newUser)
    if (userType === 1) {
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
    } else if (userType === 2) {
      fetch('http://190.114.252.218:8000/api/vendedores/', {
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
    }
  };

  {/* Elimina a un usuario de la base de datos */}
  const handleDelete = (user) => {
    if (user.codigo_vendedor) {
      fetch(`http://190.114.252.218:8000/api/usuarios/${user.codigo_vendedor}/`, {
        method: 'DELETE'
      })
      .then(() => {
        setUsers(prevUsers => prevUsers.filter(userB => userB.codigo_vendedor !== user.codigo_vendedor));
      })
      .catch(error => console.error('Error al eliminar usuario:', error));
    } else if (user.id_vendedores) {
      fetch(`http://190.114.252.218:8000/api/vendedores/${user.id_vendedores}/`, {
        method: 'DELETE'
      })
      .then(() => {
        setUsers(prevUsers => prevUsers.filter(userC => userC.id_vendedores !== user.id_vendedores));
      })
      .catch(error => console.error('Error al eliminar usuario:', error));
    }
    
  };

  {/* obtiene la información del usuario que se va a editar */}
  const handleEdit = (user) => {
    if (user.id_rol === 1) {
      setAdminType(true);
      setVededorType(false);
    } else if (user.id_rol === 2) {
      setAdminType(false);
      setVededorType(true);
    }
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
        setUsuariosVendedoresTemporales={setUsuariosVendedoresTemporales}
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
          usuariosVendedoresTemporales={usuariosVendedoresTemporales}
          setUsuariosAdminTemporales={setUsuariosAdminTemporales}
          setUsuariosVendedoresTemporales={setUsuariosVendedoresTemporales}
          control={control}
          adminType={adminType}
          vendedorType={vendedorType}
          adminAddFrom={adminAddFrom}
          vendedorAddForm={vendedorAddForm}
        />
      )}
    </main>
  );
};

export default Usuarios;
