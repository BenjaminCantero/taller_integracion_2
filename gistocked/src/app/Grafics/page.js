"use client";

import React, { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

import LinesChart from "./LinesChart";
import BarsChart from "./BarsChart";
import PiesChart from "./PiesChart";

function App() {
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap.bundle").then(() => {
            // Código de Bootstrap cargado
        });
    }, []);

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
            <header className="bg-info text-center text-white py-4 shadow-sm">
                <h1 className="font-monospace fw-bold lh-base">Gráficas ChartJS con Datos</h1>
            </header>

            <div className="container my-5">
                <div className="row g-4">
                    {/* Gráfico de líneas con tabla */}
                    <div className="col-md-6">
                        <div className="card shadow-sm border-0 h-100">
                            <div className="card-header bg-primary text-white">
                                <b>Ejemplo #1: </b>Gráfico de líneas básico
                            </div>
                            <div className="card-body bg-light">
                                <div className="mx-auto" style={{ width: "100%", height: "350px" }}>
                                    <LinesChart />
                                </div>
                                <div className="table-responsive mt-3">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Mes</th>
                                                <th>Valor</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {linesData.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.label}</td>
                                                    <td>{item.value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gráfico de barras con tabla */}
                    <div className="col-md-6">
                        <div className="card shadow-sm border-0 h-100">
                            <div className="card-header bg-success text-white">
                                <b>Ejemplo #2: </b>Gráfico de barras
                            </div>
                            <div className="card-body bg-light">
                                <div className="mx-auto" style={{ width: "100%", height: "350px" }}>
                                    <BarsChart />
                                </div>
                                <div className="table-responsive mt-3">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Producto</th>
                                                <th>Valor</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {barsData.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.label}</td>
                                                    <td>{item.value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gráfico circular con tabla */}
                    <div className="col-md-6">
                        <div className="card shadow-sm border-0 h-100">
                            <div className="card-header bg-warning text-dark">
                                <b>Ejemplo #3: </b>Gráfico circular
                            </div>
                            <div className="card-body bg-light">
                                <div className="mx-auto" style={{ width: "100%", height: "350px" }}>
                                    <PiesChart />
                                </div>
                                <div className="table-responsive mt-3">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Categoría</th>
                                                <th>Valor</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {piesData.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.label}</td>
                                                    <td>{item.value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
