// src/app/usuarios/components/UserModal.js
const UserModal = ({ onClose }) => {
    return (
      <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="modal-content bg-white rounded-lg shadow-lg p-6">
          <span 
            className="close-btn cursor-pointer text-gray-500 float-right" 
            onClick={onClose}
          >
            &times;
          </span>
          <h2 className="text-xl font-semibold mb-4">Agregar Nuevo Usuario</h2>
          <form action="#" method="post">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Nombre</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
            />
            
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
            />
            
            <label htmlFor="role" className="block text-gray-700 font-medium mb-1">Rol</label>
            <select 
              id="role" 
              name="role" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
            >
              <option value="admin">Administrador</option>
              <option value="user">Usuario</option>
            </select>
            
            <button 
              type="submit" 
              className="submit-btn bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Guardar
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default UserModal;
  