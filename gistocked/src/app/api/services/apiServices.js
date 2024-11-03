import axios from './axiosConfig'; // Asegúrate de que esta ruta sea correcta

// Función para obtener productos
export const getProductos = async () => {
  try {
    const response = await axios.get('/productos');
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

// Función para agregar un producto
export const addProducto = async (producto) => {
  try {
    const response = await axios.post('/productos', producto);
    return response.data;
  } catch (error) {
    console.error('Error al agregar producto:', error);
    throw error;
  }
};

// Función para actualizar un producto
export const updateProducto = async (id, producto) => {
  try {
    const response = await axios.put(`/productos/${id}`, producto);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    throw error;
  }
};

// Función para eliminar un producto
export const deleteProducto = async (id) => {
  try {
    const response = await axios.delete(`/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    throw error;
  }
};

