import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://190.114.252.218:8000/api/', // Base URL ajustada para un mejor manejo de rutas
    timeout: 5000,
});

// Funciones para obtener datos de la API
export const getCategorias = () => axiosInstance.get('categorias/');
export const getInventario = () => axiosInstance.get('inventarios/');
export const getUsuarios = () => axiosInstance.get('usuarios/'); 
export const getVentas = () => axiosInstance.get('ventas/');

axiosInstance.interceptors.response.use(
  response => response,
  error => {
      // Manejo de errores global
      console.error('Error en la respuesta:', error);
      return Promise.reject(error); // Propaga el error
  }
);

export default axiosInstance;
