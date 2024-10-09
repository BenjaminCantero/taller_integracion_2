// Metodos que SI necesitan parametros
import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { codigoBarras } = req.body;

    if (!codigoBarras || codigoBarras.trim() === '') {
      return res.status(400).json({ error: 'Código de barras no válido.' });
    }

    try {
      // Configura la conexión a tu base de datos MySQL
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',  // Cambia esto según tu configuración
        password: '',  // Tu contraseña
        database: 'inventario',  // El nombre de tu base de datos
      });

      // Consulta SQL para insertar el código de barras en la tabla
      const [result] = await connection.execute(
        'INSERT INTO codigos_barras (codigo) VALUES (?)',
        [codigoBarras]
      );

      await connection.end();

      res.status(200).json({ message: 'Código de barras guardado correctamente.' });
    } catch (error) {
      res.status(500).json({ error: 'Error al guardar el código en la base de datos.' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
