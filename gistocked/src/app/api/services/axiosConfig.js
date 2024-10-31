import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'integra2@190.114.252.218',
    timeout: 1000,
});

export const getCategorias = () => axiosInstance.get('categorias/');
export const getInventario = () => axiosInstance.get('inventario/');
export const getUsuarios = () => axiosInstance.get('usuarios/');
export const getVentas = () => axiosInstance.get('ventas/');

export default axiosInstance;
