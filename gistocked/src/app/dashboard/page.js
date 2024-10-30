'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FaShoppingCart, FaMoneyBill, FaUsers, FaBoxOpen } from 'react-icons/fa';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

const Dashboard = () => {
  // Estados para cada parte del dashboard
  const [salesCount, setSalesCount] = useState(null);
  const [salesRevenue, setSalesRevenue] = useState(null);
  const [userCount, setUserCount] = useState(null);
  const [productCount, setProductCount] = useState(null);
  const [monthlySales, setMonthlySales] = useState([]);
  const [productRevenue, setProductRevenue] = useState([]);
  const [annualComparison, setAnnualComparison] = useState([]);
  const [recentSales, setRecentSales] = useState([]);
  const [summary, setSummary] = useState({});
  const [productAnalysis, setProductAnalysis] = useState([]);

  // useEffect para obtener datos de la API
  useEffect(() => {
    // Cantidad de Ventas
    axios.get('http://190.114.252.218:8000/api/ventas')
      .then(response => {
        setSalesCount(response.data.length);
        const totalRevenue = response.data.reduce((acc, sale) => acc + sale.amount, 0);
        setSalesRevenue(totalRevenue);
      })
      .catch(error => console.error("Error fetching sales data:", error));

    // Usuarios Registrados
    axios.get('http://190.114.252.218:8000/api/usuarios')
      .then(response => setUserCount(response.data.length))
      .catch(error => console.error("Error fetching user data:", error));

    // Productos Disponibles
    axios.get('http://190.114.252.218:8000/api/inventarios')
      .then(response => setProductCount(response.data.length))
      .catch(error => console.error("Error fetching product data:", error));

    // Ventas Mensuales
    axios.get('http://190.114.252.218:8000/api/ventas-mensuales')  //Cambiar
      .then(response => setMonthlySales(response.data))
      .catch(error => console.error("Error fetching monthly sales data:", error));

    // Ingresos por Productos
    axios.get('http://190.114.252.218:8000/api/ingresos-productos')
      .then(response => setProductRevenue(response.data))
      .catch(error => console.error("Error fetching product revenue data:", error));

    // Comparativa Mensual/Anual
    axios.get('http://190.114.252.218:8000/api/comparativa-anual')
      .then(response => setAnnualComparison(response.data))
      .catch(error => console.error("Error fetching annual comparison data:", error));

    // Ventas Recientes
    axios.get('http://190.114.252.218:8000/api/ventas-recientes')
      .then(response => setRecentSales(response.data))
      .catch(error => console.error("Error fetching recent sales data:", error));

    // Resumen
    axios.get('http://190.114.252.218:8000/api/resumen')
      .then(response => setSummary(response.data))
      .catch(error => console.error("Error fetching summary data:", error));

    // Análisis de Productos
    axios.get('http://190.114.252.218:8000/api/analisis-productos')
      .then(response => setProductAnalysis(response.data))
      .catch(error => console.error("Error fetching product analysis data:", error));
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-5xl font-bold text-gray-800 text-center mb-10">Dashboard de Ventas</h1>

      <StatsGrid 
        salesCount={salesCount} 
        salesRevenue={salesRevenue} 
        userCount={userCount} 
        productCount={productCount} 
      />
      <ChartsGrid 
        monthlySales={monthlySales} 
        productRevenue={productRevenue} 
        annualComparison={annualComparison} 
      />
      <LatestSalesTable data={recentSales} />
      <SummaryPanel summary={summary} />
      <CustomerAnalysis analysis={productAnalysis} />

      <button 
        onClick={() => downloadDataAsCSV(monthlySales, 'SalesData')} 
        className="mt-6 w-full px-4 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition duration-200">
        Descargar Datos en CSV
      </button>
    </div>
  );
};

// Componentes de cada sección del Dashboard

// StatsGrid muestra las métricas principales
const StatsGrid = ({ salesCount, salesRevenue, userCount, productCount }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <StatCard title="Cantidad de Ventas" value={salesCount ?? "Cargando..."} icon={<FaShoppingCart />} />
    <StatCard title="Ingresos por Ventas" value={salesRevenue != null ? `$${salesRevenue}` : "Cargando..."} icon={<FaMoneyBill />} />
    <StatCard title="Usuarios Registrados" value={userCount ?? "Cargando..."} icon={<FaUsers />} />
    <StatCard title="Productos Disponibles" value={productCount ?? "Cargando..."} icon={<FaBoxOpen />} />
  </div>
);

const ChartCard = ({ title, chart }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    {chart}
  </div>
);

const ChartsGrid = ({ monthlySales, productRevenue, annualComparison }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
    <ChartCard title="Ventas Mensuales" chart={<SalesChart data={monthlySales} />} />
    <ChartCard title="Ingresos por Productos" chart={<RevenueChart data={productRevenue} />} />
    <ChartCard title="Comparativa Anual/Mensual" chart={<ComparisonChart data={annualComparison} />} />
  </div>
);

const SalesChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
);

const RevenueChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="product" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="revenue" fill="#3b82f6" />
    </BarChart>
  </ResponsiveContainer>
);

const ComparisonChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="sales" fill="#3b82f6" />
    </BarChart>
  </ResponsiveContainer>
);

const LatestSalesTable = ({ data }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
    <h2 className="text-2xl font-bold mb-4">Ventas Recientes</h2>
    <table className="min-w-full bg-white rounded-lg shadow-md">
      <thead>
        <tr className="bg-gray-200">
          <th className="py-2 px-4 text-left">Producto</th>
          <th className="py-2 px-4 text-left">Cantidad</th>
          <th className="py-2 px-4 text-left">Fecha</th>
        </tr>
      </thead>
      <tbody>
        {data.map((sale) => (
          <tr key={sale.id} className="border-t">
            <td className="py-2 px-4">{sale.product}</td>
            <td className="py-2 px-4">{sale.quantity}</td>
            <td className="py-2 px-4">{sale.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const SummaryPanel = ({ summary }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
    <h2 className="text-2xl font-bold mb-4">Resumen</h2>
    <p>{summary.text}</p>
  </div>
);

const CustomerAnalysis = ({ analysis }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
    <h2 className="text-2xl font-bold mb-4">Análisis de Productos</h2>
    {/* Aquí podrías mostrar gráficos o tablas detalladas */}
    <p>{JSON.stringify(analysis)}</p>
  </div>
);

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg flex items-center transition-transform transform hover:scale-105">
    <div className="mr-4 text-blue-500 text-4xl">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold text-gray-700">{value}</p>
    </div>
  </div>
);

export default Dashboard;
