'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line
} from 'recharts';
import { CSVLink } from "react-csv";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FaShoppingCart, FaMoneyBill, FaUsers, FaBoxOpen } from 'react-icons/fa';

// Función para exportar a PDF
const exportToPDF = (title, data) => {
  const doc = new jsPDF();
  doc.text(title, 10, 10);
  doc.autoTable({
    head: [Object.keys(data[0])],
    body: data.map(row => Object.values(row)),
  });
  doc.save(`${title}.pdf`);
};

// Componente principal del Dashboard
const Dashboard = () => {
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

  // Efecto para cargar los datos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesData = await axios.get('http://190.114.252.218:8000/api/ventas');
        setSalesCount(salesData.data.length);
        setSalesRevenue(salesData.data.reduce((acc, sale) => acc + sale.amount, 0));

        const userData = await axios.get('http://190.114.252.218:8000/api/usuarios');
        setUserCount(userData.data.length);

        const productData = await axios.get('http://190.114.252.218:8000/api/inventarios');
        setProductCount(productData.data.length);

        const monthlySalesData = await axios.get('http://190.114.252.218:8000/api/ventas-mensuales');
        setMonthlySales(monthlySalesData.data);

        const productRevenueData = await axios.get('http://190.114.252.218:8000/api/ingresos-productos');
        setProductRevenue(productRevenueData.data);

        const annualComparisonData = await axios.get('http://190.114.252.218:8000/api/comparativa-anual');
        setAnnualComparison(annualComparisonData.data);

        const recentSalesData = await axios.get('http://190.114.252.218:8000/api/ventas-recientes');
        setRecentSales(recentSalesData.data);

        const summaryData = await axios.get('http://190.114.252.218:8000/api/resumen');
        setSummary(summaryData.data);

        const productAnalysisData = await axios.get('http://190.114.252.218:8000/api/analisis-productos');
        setProductAnalysis(productAnalysisData.data);

      } catch (error) {
       
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-white min-h-screen text-gray-800">
      <h1 className="text-5xl font-extrabold text-center mb-10 text-primary">Dashboard de Ventas</h1>

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
    </div>
  );
};

// StatsGrid Component
const StatsGrid = ({ salesCount, salesRevenue, userCount, productCount }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <StatCard title="Cantidad de Ventas" value={salesCount ?? "Cargando..."} icon={<FaShoppingCart />} />
    <StatCard title="Ingresos por Ventas" value={salesRevenue != null ? `$${salesRevenue}` : "Cargando..."} icon={<FaMoneyBill />} />
    <StatCard title="Usuarios Registrados" value={userCount ?? "Cargando..."} icon={<FaUsers />} />
    <StatCard title="Productos Disponibles" value={productCount ?? "Cargando..."} icon={<FaBoxOpen />} />
  </div>
);

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg flex items-center transition-transform transform hover:scale-105 hover:shadow-xl">
    <div className="mr-4 text-primary text-4xl">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

// ChartCard Component with export options
const ChartCard = ({ title, chart, exportTitle, exportData }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
    <h2 className="text-2xl font-bold mb-4 text-primary">{title}</h2>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        {chart}
      </ResponsiveContainer>
    </div>
    <div className="mt-4 flex justify-between">
      <CSVLink data={exportData} filename={`${exportTitle}.csv`} className="text-blue-600 hover:underline">Descargar CSV</CSVLink>
      <button onClick={() => exportToPDF(exportTitle, exportData)} className="bg-blue-500 text-white px-4 py-2 rounded">Exportar a PDF</button>
    </div>
  </div>
);

// ChartsGrid Component
const ChartsGrid = ({ monthlySales, productRevenue, annualComparison }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
    <ChartCard title="Ventas Mensuales" chart={<SalesChart data={monthlySales} />} exportTitle="Ventas Mensuales" exportData={monthlySales} />
    <ChartCard title="Ingresos por Productos" chart={<RevenueChart data={productRevenue} />} exportTitle="Ingresos por Productos" exportData={productRevenue} />
    <ChartCard title="Comparativa Anual/Mensual" chart={<ComparisonChart data={annualComparison} />} exportTitle="Comparativa Anual" exportData={annualComparison} />
  </div>
);

const SalesChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
      <XAxis dataKey="month" tick={{ fill: "#374151" }} />
      <YAxis tick={{ fill: "#374151" }} />
      <Tooltip contentStyle={{ backgroundColor: '#F9FAFB', borderColor: 'gray' }} />
      <Legend />
      <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
);

const RevenueChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
      <XAxis dataKey="product" tick={{ fill: "#374151" }} />
      <YAxis tick={{ fill: "#374151" }} />
      <Tooltip contentStyle={{ backgroundColor: '#F9FAFB', borderColor: 'gray' }} />
      <Legend />
      <Bar dataKey="revenue" fill="#10B981" />
    </BarChart>
  </ResponsiveContainer>
);

const ComparisonChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
      <XAxis dataKey="year" tick={{ fill: "#374151" }} />
      <YAxis tick={{ fill: "#374151" }} />
      <Tooltip contentStyle={{ backgroundColor: '#F9FAFB', borderColor: 'gray' }} />
      <Legend />
      <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} />
      <Line type="monotone" dataKey="revenue" stroke="#EF4444" strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
);

// Tabla de ventas recientes
const LatestSalesTable = ({ data }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
    <h2 className="text-2xl font-bold mb-4 text-primary">Ventas Recientes</h2>
    <table className="min-w-full bg-white">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-2 px-4 border">ID Venta</th>
          <th className="py-2 px-4 border">Producto</th>
          <th className="py-2 px-4 border">Cantidad</th>
          <th className="py-2 px-4 border">Monto</th>
        </tr>
      </thead>
      <tbody>
        {data.map(sale => (
          <tr key={sale.id} className="text-center">
            <td className="py-2 px-4 border">{sale.id}</td>
            <td className="py-2 px-4 border">{sale.product}</td>
            <td className="py-2 px-4 border">{sale.quantity}</td>
            <td className="py-2 px-4 border">${sale.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Panel de Resumen
const SummaryPanel = ({ summary }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
    <h2 className="text-2xl font-bold mb-4 text-primary">Resumen</h2>
    <p>{summary ? summary.text : "Cargando..."}</p>
  </div>
);

// Análisis de Clientes
const CustomerAnalysis = ({ analysis }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
    <h2 className="text-2xl font-bold mb-4 text-primary">Análisis de Clientes</h2>
    <ul>
      {analysis.map((item, index) => (
        <li key={index} className="mb-2">{item}</li>
      ))}
    </ul>
  </div>
);

export default Dashboard;
