import React from 'react';

const SalesTable = ({ sales, registeredSales, handleEditSale, handleDeleteSale, handleIncreaseQuantity, handleDecreaseQuantity }) => {
  return (
    <div className="space-y-8">
      {/* Cuadro de Ventas Actuales */}
      <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Ventas Actuales</h2>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-3 py-5 text-center text-md font-semibold">ID Venta</th>
              <th className="px-3 py-5 text-center text-md font-semibold">Producto</th>
              <th className="px-3 py-5 text-center text-md font-semibold">Cantidad</th>
              <th className="px-3 py-5 text-center text-md font-semibold">Total</th>
              <th className="px-3 py-5 text-center text-md font-semibold">Fecha</th>
              <th className="px-3 py-5 text-center text-md font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id} className="text-black hover:bg-[#ccdfe0] transition duration-500 ease-linear">
                <td className="py-5 px-6 border-b border-gray-300 text-md text-center">{sale.id}</td>
                <td className="py-5 px-6 border-b border-gray-300 text-md text-center">{sale.producto}</td>
                <td className="py-5 px-6 border-b border-gray-300 text-md text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => handleDecreaseQuantity(sale.id)}
                      className="bg-red-400 hover:bg-gray-400 text-black px-2 py-1 rounded"
                    >
                      -
                    </button>
                    <span>{sale.cantidad}</span>
                    <button
                      onClick={() => handleIncreaseQuantity(sale.id)}
                      className="bg-green-400 hover:bg-gray-400 text-black px-2 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="py-5 px-6 border-b border-gray-300 text-md text-center">${sale.total}</td>
                <td className="py-5 px-6 border-b border-gray-300 text-md text-center">{sale.fecha}</td>
                <td className="py-5 px-6 border-b border-gray-300 text-md text-center">
                  <div className="flex flex-col">
                    <button
                      className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 transition duration-500"
                      onClick={() => handleEditSale(sale.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-500"
                      onClick={() => handleDeleteSale(sale.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cuadro de Registro de Ventas */}
      <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Registro de Ventas</h2>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-3 py-5 text-center text-md font-semibold">ID Venta</th>
              <th className="px-3 py-5 text-center text-md font-semibold">Producto</th>
              <th className="px-3 py-5 text-center text-md font-semibold">Cantidad</th>
              <th className="px-3 py-5 text-center text-md font-semibold">Total</th>
              <th className="px-3 py-5 text-center text-md font-semibold">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {registeredSales.map((sale) => (
              <tr key={sale.id} className="text-black hover:bg-[#ccdfe0] transition duration-500 ease-linear">
                <td className="py-5 px-6 border-b border-gray-300 text-md text-center">{sale.id}</td>
                <td className="py-5 px-6 border-b border-gray-300 text-md text-center">{sale.producto}</td>
                <td className="py-5 px-6 border-b border-gray-300 text-md text-center">{sale.cantidad}</td>
                <td className="py-5 px-6 border-b border-gray-300 text-md text-center">${sale.total}</td>
                <td className="py-5 px-6 border-b border-gray-300 text-md text-center">{sale.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesTable;
