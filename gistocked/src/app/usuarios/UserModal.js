import React, { useState, useEffect } from 'react';

const UserModal = ({ onClose, onAddUser, onEditUser, onSaveEdit }) => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [password, setPassword] = useState('');
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
            <label htmlFor="nombreUsuario" className="block text-lg text-gray-700 font-medium mb-2">Nombre</label>
            <input
              type="text"
              id="nombreUsuario"
              required
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="nombreEmpresa" className="block text-lg text-gray-700 font-medium mb-2">Nombre de Empresa</label>
            <input
              type="text"
              id="nombreEmpresa"
              required
              value={nombreEmpresa}
              onChange={(e) => setNombreEmpresa(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-lg text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-lg text-gray-700 font-medium mb-2">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            />
          </div>
          <div className="mb-6">
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
