// data.js
const connection = require('./db'); // Importa la conexión a la base de datos

// Función para obtener datos de ventas
const getSalesData = (callback) => {
  const query = 'SELECT period, sales FROM sales_table'; // Reemplaza con tu tabla y columnas
  connection.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Función para obtener datos de ingresos
const getRevenueData = (callback) => {
  const query = 'SELECT product_name AS name, revenue_value AS value FROM revenue_table'; // Reemplaza con tu tabla y columnas
  connection.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Función para obtener las ventas más recientes
const getLatestSales = (callback) => {
  const query = 'SELECT id, product, quantity, sale_date AS date FROM sales_recent_table ORDER BY sale_date DESC LIMIT 10'; // Reemplaza con tu tabla y columnas
  connection.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Exportar las funciones
module.exports = {
  getSalesData,
  getRevenueData,
  getLatestSales,
};
