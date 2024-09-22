"use client"; // Asegúrate de incluir esta línea al principio del archivo

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

    return (
        <div>
            <h1 className="bg-info text-center font-monospace fw-bold lh-base">Gráficas ChartJS</h1>
            <div>
                <p className="m-2"><b>Ejemplo #1: </b>Gráfico de líneas básico</p>
                <div className="bg-light mx-auto px-2 border border-2 border-primary" style={{ width: "450px", height: "230px" }}>
                    <LinesChart />
                </div>
            </div>
            <hr className="mt-3 mb-2" />
            <div>
                <p className="m-2"><b>Ejemplo #2: </b>Gráfico de barras</p>
                <div className="bg-light mx-auto px-2 border border-2 border-primary" style={{ width: "450px", height: "225px" }}>
                    <BarsChart />
                </div>
            </div>
            <hr className="mt-3 mb-2" />
            <div>
                <p className="m-2"><b>Ejemplo #3: </b>Gráfico circular</p>
                <div className="bg-light mx-auto border border-2 border-primary" style={{ width: "450px", height: "250px" }}>
                    <div style={{ width: "100%", height: "100%", padding: "10px 0" }}>
                        <PiesChart />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
