import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://190.114.252.218:8001/',
    timeout: 5000,
});

export const getCategorias = () => axiosInstance.get('api/categorias/');
export const getInventario = () => axiosInstance.get('api/inventario/');
export const getUsuarios = () => axiosInstance.get('api/usuarios/');
export const getVentas = () => axiosInstance.get('api/ventas/');

export default axiosInstance;
