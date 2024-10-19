// src/pages/api/sales.js
import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Gistocked',
  port: 3306,
});

export default function handler(req, res) {
  connection.connect((err) => {
    if (err) {
      return res.status(500).json({ error: 'Error connecting to database' });
    }

    connection.query('SELECT * FROM sales', (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Error fetching sales data' });
      }
      res.status(200).json(results);
    });
  });
}
