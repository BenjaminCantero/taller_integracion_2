"use client"; // Esto indica que el componente es un Client Component

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [codigoBarras, setCodigoBarras] = useState('');
  const [mensaje, setMensaje] = useState({ text: '', type: '' });

  useEffect(() => {
    document.getElementById('codigoBarras').focus();
  }, []);

  const escanear = async () => {
    if (codigoBarras.trim() === '') {
      mostrarMensaje('Por favor, ingrese un código de barras válido.', 'error');
      return;
    }

    try {
      const response = await fetch('/api/guardar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ codigoBarras }),
      });
      const data = await response.json();

      if (data.error) {
        mostrarMensaje('Error: ' + data.error, 'error');
      } else {
        mostrarMensaje(data.message, 'success');
        setCodigoBarras('');
      }
    } catch (error) {
      mostrarMensaje('Ha ocurrido un error en la solicitud: ' + error.message, 'error');
    }
  };

  const mostrarMensaje = (mensaje, tipo) => {
    setMensaje({ text: mensaje, type: tipo });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Escanear Código de Barras</h1>
        <input
          id="codigoBarras"
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
          value={codigoBarras}
          onChange={(e) => setCodigoBarras(e.target.value)}
          placeholder="Ingrese el código de barras"
        />
        <button
          onClick={escanear}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Escanear
        </button>

        {mensaje.text && (
          <div
            className={`mt-4 p-3 rounded-lg text-center ${
              mensaje.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}
          >
            {mensaje.text}
          </div>
        )}
      </div>
    </div>
  );
}
