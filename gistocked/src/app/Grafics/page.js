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
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // Estados para los datos del gráfico
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [inputLabel, setInputLabel] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // Registrar los componentes de Chart.js
    Chart.register(
      BarController,
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend
    );

    // Crear el gráfico solo cuando haya datos disponibles
    if (labels.length > 0 && data.length > 0) {
      const ctx = chartRef.current.getContext("2d");

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

      // Si existe una instancia previa del gráfico, destruirla
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Crear un nuevo gráfico
      const newChartInstance = new Chart(ctx, chartConfig);
      chartInstanceRef.current = newChartInstance;
    }

    // Cleanup para evitar fugas de memoria
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [labels, data]); // Ejecutar efecto cuando los datos cambian

  // Función para agregar datos al gráfico
  const addData = () => {
    if (inputLabel && inputValue) {
      setLabels([...labels, inputLabel]);
      setData([...data, parseInt(inputValue)]);
      setInputLabel("");
      setInputValue("");
    }
  };

  // Función para eliminar el último dato agregado
  const removeLastData = () => {
    if (labels.length > 0 && data.length > 0) {
      setLabels(labels.slice(0, -1));
      setData(data.slice(0, -1));
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Administrar Datos del Gráfico</h2>
      <div style={styles.formContainer}>
        <input
          type="text"
          placeholder="Mes"
          value={inputLabel}
          onChange={(e) => setInputLabel(e.target.value)}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Ventas"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={styles.input}
        />
        <button onClick={addData} style={styles.addButton}>
          Agregar Datos
        </button>
        <button onClick={removeLastData} style={styles.removeButton}>
          Eliminar Último
        </button>
      </div>

      <h3 style={styles.chartHeader}>Gráfico de Ventas</h3>
      <div style={styles.chartContainer}>
        <canvas ref={chartRef} width={400} height={200}></canvas>
      </div>
    </div>
  );
}

// Estilos en línea para mejorar la estética
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f4f4f4",
    borderRadius: "10px",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
  },
  header: {
    marginBottom: "20px",
    color: "#333",
  },
  formContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "120px",
    color: "#333", // Asegurarse de que el texto sea visible
    backgroundColor: "#fff", // Fondo blanco para el input
    fontSize: "16px", // Tamaño de fuente mayor para legibilidad
  },
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  removeButton: {
    padding: "10px 20px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  chartHeader: {
    marginBottom: "20px",
    color: "#333",
  },
  chartContainer: {
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
  },
};
