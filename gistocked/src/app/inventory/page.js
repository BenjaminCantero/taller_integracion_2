"use client";
import { useState, useEffect } from "react";

// Componente React (front-end)
export default function Home() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", category: "", quantity: "", price: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/inventory'); // Asegúrate de que la ruta es correcta.
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const products = await response.json();
        setProducts(products); // Actualizar el estado con los productos obtenidos
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    }

    fetchProducts(); // Invocar la función
  }, []); // Se ejecuta cuando el componente se monta

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newProduct.name || !newProduct.category || isNaN(newProduct.quantity) || isNaN(newProduct.price)) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    const productWithNumberValues = {
      ...newProduct,
      quantity: Number(newProduct.quantity),
      price: Number(newProduct.price),
    };

    try {
      if (editingIndex === null) {
        // Agregar un nuevo producto
        const response = await fetch('/api/inventory', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productWithNumberValues),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
      } else {
        // Editar un producto existente
        const response = await fetch(`/api/inventory/${products[editingIndex].id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productWithNumberValues),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        setEditingIndex(null);
      }

      // Refresca los productos desde la base de datos
      const refreshResponse = await fetch('/api/inventory');
      const data = await refreshResponse.json();
      setProducts(data);

      setNewProduct({ name: "", category: "", quantity: "", price: "" });
    } catch (error) {
      console.error("Error al agregar/editar producto:", error);
    }
  };

  const deleteProduct = async (index) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      try {
        const response = await fetch(`/api/inventory/${products[index].id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const refreshResponse = await fetch('/api/inventory');
        const data = await refreshResponse.json();
        setProducts(data);
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    }
  };

  const editProduct = (index) => {
    setNewProduct({
      ...products[index],
      quantity: products[index].quantity.toString(),
      price: products[index].price.toString(),
    });
    setEditingIndex(index);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);
}
