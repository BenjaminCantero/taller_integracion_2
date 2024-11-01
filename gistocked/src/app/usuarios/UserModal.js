
import React, { useState, useEffect } from 'react';

const UserModal = ({ onClose, onAddUser, onEditUser, onSaveEdit }) => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [idRol, setIdRol] = useState(2); // Id de rol predeterminado

  useEffect(() => {
    if (onEditUser) {
      setNombreUsuario(onEditUser.nombre_usuario);
      setEmail(onEditUser.email);
      setNombreEmpresa(onEditUser.nombre_empresa);
      setIdRol(onEditUser.id_rol);
    } else {
      setNombreUsuario('');
      setEmail('');
      setNombreEmpresa('');
      setPassword('');
      setIdRol(2);
    }
  }, [onEditUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userPayload = {
      nombre_usuario: nombreUsuario,
      nombre_empresa: nombreEmpresa,
      email: email,
      password: password || 'defaultPassword', // Password predeterminado si no se especifica
      id_rol: idRol,
      codigo_vendedor: onEditUser ? onEditUser.codigo_vendedor : undefined,
    };

    if (onEditUser) {
      onSaveEdit(userPayload);
    } else {
      onAddUser(userPayload);
    }

    onClose();
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <ul className='p-8 w-full max-w-3xl relative bg-white rounded-lg modal-content'>
        {/* Boton que cierra el formulario */}
        <span
          className='close-btn absolute top-4 right-4 text-gray-500 text-2xl cursor-pointer hover:text-gray-700 transition duration-300'
          onClick={onClose}
        >
          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-x-lg' viewBox='0 0 16 16'>
            <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z' stroke='currentColor' strokeWidth='1' fill='none'/>
          </svg>
        </span>

        {/* Seleciona mensaje en función de la acción a realizar */}
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          {onEditUser ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}
        </h2>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <ul>
            <li className="mb-6">
              <label htmlFor="nombreUsuario" className="block text-lg text-gray-700 font-medium mb-2">Nombre</label>
              <input
                type="text"
                id="nombreUsuario"
                required
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              />
            </li>

            <li className="mb-6">
              <label htmlFor="nombreEmpresa" className="block text-lg text-gray-700 font-medium mb-2">Nombre de Empresa</label>
              <input
                type="text"
                id="nombreEmpresa"
                required
                value={nombreEmpresa}
                onChange={(e) => setNombreEmpresa(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              />
            </li>

            <li className="mb-6">
              <label htmlFor="email" className="block text-lg text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              />
            </li>

            <li className="mb-6">
              <label htmlFor="password" className="block text-lg text-gray-700 font-medium mb-2">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              />
            </li>

            <li className="mb-6">
              <label htmlFor="idRol" className="block text-lg text-gray-700 font-medium mb-2">Rol</label>
              <select
                id="idRol"
                value={idRol}
                onChange={(e) => setIdRol(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              >
                <option value={2}>Vendedor</option>
                <option value={1}>Administrador</option>
              </select>
            </li>

            <li>
              <div className='flex flex-row justify-end'>
              <button
                  type="submit"
                  className='px-4 py-2 mr-2 text-white bg-blue-600 hover:bg-blue-800 transition duration-500 rounded-lg'
                >
                  {onEditUser ? 'Guardar Cambios' : 'Agregar'}
                </button>

                <button
                  type='button'
                  onClick={onClose}
                  className='px-4 py-2 text-white bg-red-500 hover:bg-red-600 transition duration-500 rounded-lg'
                >
                  Cancelar
                </button>
              </div>
            </li>
          </ul>         
        </form>
      </ul>
    </div>
  );
};

export default UserModal;
