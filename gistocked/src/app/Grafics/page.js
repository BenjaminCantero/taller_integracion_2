"use client";

import { useState, useEffect, useRef } from "react";
import {
  Chart,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

export default function Home() {
  const [cart, setCart] = useState([]);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Uso de useRef para mantener la instancia del gráfico

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  useEffect(() => {
    // Registrar los componentes antes de usarlos
    Chart.register(
      BarController,
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend
    );

    const ctx = chartRef.current.getContext("2d");

    const labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo"];
    const data = [10, 30, 30, 25, 30];

    const chartConfig = {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Ventas Mensuales",
            data: data,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    // Si existe una instancia previa del gráfico, destruirla antes de crear una nueva
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Crear un nuevo gráfico y guardarlo en chartInstanceRef
    const newChartInstance = new Chart(ctx, chartConfig);
    chartInstanceRef.current = newChartInstance;

    // Cleanup para evitar fugas de memoria al desmontar el componente
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []); // Se ejecuta una sola vez al montar el componente

  return (
    <div>
      <canvas ref={chartRef} width={400} height={200}></canvas>
      {/* Aquí podrías agregar más elementos de la UI, como el carrito */}
    </div>
  );
}
