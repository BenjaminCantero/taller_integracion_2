"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

const TablaUsuarios = ({ onEdit, onDelete }) => {
    const router = useRouter();
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchUsuarios = async () => {
            const response = await fetch('/api/usuario/2' , {method: "GET"});
            const data = await response.json();
            setUsuarios(data);
        };

        fetchUsuarios();
    }, []);

    const handleEdit = (id) => {
        console.log(`Editar usuario con ID: ${id}`);
        router.push(`/auth/UserUpdate?id=${id}`);
      };
    
      const handleDelete = async (id) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
        if (confirmDelete) {
            try {
                await fetch(`/api/usuario/${id}`, { method: 'DELETE' });

            } catch (error) {
                console.error('Error al eliminar el usuario:', error);
            }
        }
      };

    return (
        <table className="min-w-full bg-white rounded-lg shadow-xs overflow-hidden dark:bg-gray-800">
            <thead>
                <tr className="bg-gray-800 text-gray-500 uppercase text-sm leading-normal">
                    <th className="px-4 py-3">Nombre</th>
                    <th className="px-4 py-3">Id</th>
                    <th className="px-4 py-3">Correo</th>
                    <th className="px-4 py-3">Editar</th>
                    <th className="px-4 py-3">Eliminar</th>
                </tr>
            </thead>

            <tbody className="text-gray-700 dark:text-gray-400">
                {usuarios.map((usuario) => (
                    <tr key={usuario.id_usuarios} className="hover:bg-gray-100 dark:hover:bg-gray-700">

                        <td className="px-4 py-3 text-sm text-center">{usuario.nombre}</td>
                        <td className="px-4 py-3 text-sm text-center">{usuario.id_usuarios}</td>
                        <td className="px-4 py-3 text-sm text-center">{usuario.correo}</td>

                        <td className="px-4 py-3 text-sm text-center">
                            <button className="bg-yellow-500 text-white px-3 py-2 rounded-md hover:bg-yellow-700" onClick={() => handleEdit(usuario.id_usuarios)}>
                                Editar
                            </button>
                        </td>
                        <td className="px-4 py-3 text-sm text-center">
                            <button className="ml-2 bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-700" onClick={() => handleDelete(usuario.id_usuarios)}>
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TablaUsuarios;