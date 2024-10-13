"use client"; // Asegúrate de que este está presente

import Layout from './layout'; // Asegúrate de que la ruta sea correcta

const Home = () => {
  return (
    <Layout>
      <main className="welcome-card bg-gradient-to-r from-gray-50 to-gray-200 shadow-lg rounded-lg p-8 max-w-3xl mx-auto mt-10">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Bienvenido al sistema</h1>

        <div className="profile-pic w-36 h-36 bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center rounded-full mx-auto mb-8 shadow-md">
          <span className="text-lg font-semibold">150 x 150</span>
        </div>

        <div className="user-details space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Nombre</label>
            <input 
              type="text" 
              value="user" 
              readOnly 
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Correo</label>
            <input 
              type="text" 
              value="user@gmail.com" 
              readOnly 
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Rol</label>
            <input 
              type="text" 
              value="Empleado" 
              readOnly 
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
