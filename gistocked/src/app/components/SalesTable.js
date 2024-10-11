const SalesTable = ({ sales, handleEditSale, handleDeleteSale, handleIncreaseQuantity, handleDecreaseQuantity }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2 px-4 text-left">ID Venta</th>
            <th className="py-2 px-4 text-left">Producto</th>
            <th className="py-2 px-4 text-left">Cantidad</th>
            <th className="py-2 px-4 text-left">Total</th>
            <th className="py-2 px-4 text-left">Fecha</th>
            <th className="py-2 px-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id} className="border-b border-gray-200">
              <td className="py-2 px-4">{sale.id}</td>
              <td className="py-2 px-4">{sale.producto}</td>
              <td className="py-2 px-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDecreaseQuantity(sale.id)}
                    className="bg-gray-300 hover:bg-gray-400 text-black px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span>{sale.cantidad}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(sale.id)}
                    className="bg-gray-300 hover:bg-gray-400 text-black px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="py-2 px-4">${sale.total}</td>
              <td className="py-2 px-4">{sale.fecha}</td>
              <td className="py-2 px-4 space-x-2">
                <button
                  className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600 transition"
                  onClick={() => handleEditSale(sale.id)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition"
                  onClick={() => handleDeleteSale(sale.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;

