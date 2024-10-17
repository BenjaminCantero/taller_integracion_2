const Home = ({ usuarioInfo }) => {
  return (
    <main className="bg-gradient-to-r from-gray-100 to-gray-300 shadow-2xl rounded-xl p-12 max-w-4xl mx-auto mt-20">
      <h1 className="text-5xl font-bold text-gray-800 mb-10 text-center">Bienvenido a GISTOCKED</h1>

      <div className="profile-pic w-40 h-40 bg-gradient-to-r from-blue-700 to-blue-500 text-white flex items-center justify-center rounded-full mx-auto mb-10 shadow-lg border-4 border-gray-300">
        <span className="text-xl font-semibold">150 x 150</span>
      </div>

      <div className="user-details space-y-8">
        <div>
          <label className="block text-gray-700 font-medium mb-2 text-lg">Nombre</label>
          <input 
            type="text" 
            value={usuarioInfo.nombre} 
            readOnly 
            className="w-full px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2 text-lg">Correo</label>
          <input 
            type="text" 
            value={usuarioInfo.correo}
            readOnly 
            className="w-full px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2 text-lg">Rol</label>
          <input 
            type="text" 
            value={usuarioInfo.rol} 
            readOnly 
            className="w-full px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
