"use client"; // Indica que este es un componente de cliente

import { useState } from 'react'; // Importa useState desde React
import Layout from '../layout'; // Asegúrate de que la ruta sea correcta
import UserTable from './UserTable'; // Importa el componente de la tabla
import UserModal from './UserModal'; // Importa el componente del modal
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Para íconos
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'; // Importa el ícono "Agregar usuario"

const Usuarios = () => {
  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar la visibilidad del modal

  // Función para abrir el modal
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Layout> {/* Componente Layout */}
      <main className="p-8"> {/* Contenido principal */}
        <h1 className="text-3xl font-semibold mb-6">Gestión de Usuarios</h1> {/* Título */}
        <button
          onClick={handleOpenModal}
          className="add-user-btn bg-blue-600 text-white px-6 py-2 rounded-md flex items-center mb-4 hover:bg-blue-700 transition"
        >
          <FontAwesomeIcon icon={faUserPlus} className="mr-2" /> {/* Icono usando FontAwesome */}
          Agregar Usuario
        </button>
        <UserTable /> {/* Componente de la tabla */}
        {modalOpen && <UserModal onClose={handleCloseModal} />} {/* Componente del modal */}
      </main>
    </Layout>
  );
};

export default Usuarios;
