"use client";

import { useState, useEffect, useRef } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import LinesChart from "./LinesChart";
import BarsChart from "./BarsChart";
import PiesChart from "./PiesChart";




export default function Home() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  return (
    <div>
        {/* Aquí incluiré las gráficas (un componente por cada ejemplo). */}
        <h1 className="bg-info text-center font-monospace fw-bold lh-base">Gráficas ChartJS</h1>
        <div>
            <p className="m-2"><b>Ejemplo #1: </b>Gráfico de líneas básico</p>
            <div className="bg-light mx-auto px-2 border border-2 border-primary" style={{width:"450px", height:"230px"}}>
              <LinesChart />
            </div>
        </div>
        <hr className="mt-3 mb-2"/>
        <div>
            <p className="m-2"><b>Ejemplo #2: </b>Gráfico de barras</p>
            <div className="bg-light mx-auto px-2 border border-2 border-primary" style={{width:"450px", height:"225px"}}>
              <BarsChart />
            </div>
        </div>
        <hr className="mt-3 mb-2"/>
        <div>
            <p className="m-2"><b>Ejemplo #3: </b>Gráfico circular</p>
            <div className="bg-light mx-auto border border-2 border-primary" style={{width:"450px", height:"250px"}}>
                <div style={{width:"100%", height:"100%", padding:"10px 0"}}>
                  <PiesChart />             
                </div>
            </div>
        </div>
    </div>
  );


};
