import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://your-api-url.com',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

export const getCategorias = () => axiosInstance.get('categorias/');
export const getInventario = () => axiosInstance.get('inventario/');
export const getUsuarios = () => axiosInstance.get('usuarios/');
export const getVentas = () => axiosInstance.get('ventas/');

export default axiosInstance;
