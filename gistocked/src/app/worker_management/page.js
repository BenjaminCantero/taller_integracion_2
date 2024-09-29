
import TablaUsuarios from "./userTable";

const Worker_Management = () => {
  return (
    <div className="container px-6 mx-auto grid">   
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">

        {/* Contenedor 2 */}
        <div className="flex items-center p-4 f-full bg-white rounded-lg shadow-xs dark:bg-gray-800">
          <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>

          {/* Agregar Vendedor */}
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Agregar Vendedor
            </p>
          </div>


          {/* Botón Agregar */}
          <button className="ml-auto bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-700">
            Agregar
          </button>
        </div>
      </div>



      {/* Tabla de Clientes */}
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <TablaUsuarios></TablaUsuarios>
        </div>
      </div>
    </div>
  );
};

export default Worker_Management;