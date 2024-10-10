"use client";

import React from 'react';

function App() {
    // Datos ficticios de los gráficos (puedes reemplazarlos con los datos reales)
    const linesData = [
        { label: "Enero", value: 65 },
        { label: "Febrero", value: 59 },
        { label: "Marzo", value: 80 },
        { label: "Abril", value: 81 },
        { label: "Mayo", value: 56 },
        { label: "Junio", value: 55 },
        { label: "Julio", value: 40 }
    ];

    const barsData = [
        { label: "Producto A", value: 200 },
        { label: "Producto B", value: 150 },
        { label: "Producto C", value: 300 },
        { label: "Producto D", value: 100 }
    ];

    const piesData = [
        { label: "Categoría 1", value: 50 },
        { label: "Categoría 2", value: 30 },
        { label: "Categoría 3", value: 20 }
    ];

    return (
        <div>
            <main>
                <h1>Gráficas</h1>
                {/* Aquí irían las tablas de datos */}
                <div>
                    <h2>Datos de Líneas</h2>
                    <ul>
                        {linesData.map((item, index) => (
                            <li key={index}>{item.label}: {item.value}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2>Datos de Barras</h2>
                    <ul>
                        {barsData.map((item, index) => (
                            <li key={index}>{item.label}: {item.value}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2>Datos de Pastel</h2>
                    <ul>
                        {piesData.map((item, index) => (
                            <li key={index}>{item.label}: {item.value}</li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
}

export default App;
