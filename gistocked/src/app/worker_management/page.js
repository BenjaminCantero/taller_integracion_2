const Worker_Management = () => {
  return (
    <div className="container px-6 mx-auto grid">   
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">

        {/* Contenedor 1 */}
        <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
          <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
              ></path>
            </svg>
          </div>

          {/* Vendedores */}
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Vendedores
            </p>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              20
            </p>
          </div>

          {/* Botón Eliminar */}
          <button className="ml-auto bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-700">
            Eliminar
          </button>
        </div>

        {/* Contenedor 2 */}
        <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
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
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              $46,760.89
            </p>
          </div>

          {/* Botón Agregar */}
          <button className="ml-auto bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-700">
            Agregar
          </button>
        </div>

        {/* Contenedor 3 */}
        <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
          <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
              ></path>
            </svg>
          </div>

          {/* Actualizar Vendedor */}
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Actualizar Vendedor
            </p>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              376
            </p>
          </div>

          {/* Botón Editar */}
          <button className="ml-auto bg-yellow-500 text-white px-3 py-2 rounded-md hover:bg-yellow-700">
            Editar
          </button>
        </div>

        {/* Contenedor 4 */}
        <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
          <div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>

          {/* Contactos */}
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Contactos
            </p>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              35
            </p>
          </div>

          {/* Botón Contactar */}
          <button className="ml-auto bg-teal-500 text-white px-3 py-2 rounded-md hover:bg-teal-700">
            Contactar
          </button>
        </div>
      </div>

      {/* Tabla de Clientes */}
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Monto</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Fecha</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              <tr className="text-gray-700 dark:text-gray-400">
                <td className="px-4 py-3">
                  <div className="flex items-center text-sm">
                    <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                      <img
                        className="object-cover w-full h-full rounded-full"
                        src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                        alt=""
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0 rounded-full shadow-inner"
                        aria-hidden="true"
                      ></div>
                    </div>
                    <div>
                      <p className="font-semibold">John Doe</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Reposteria
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">$855.85</td>
                <td className="px-4 py-3 text-xs">
                  <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                    Aprobado
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">15-03-2023</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Worker_Management;
