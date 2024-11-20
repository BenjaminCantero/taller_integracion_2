'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line
} from 'recharts';
import { CSVLink } from "react-csv";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ShoppingCart, DollarSign, Users, Package, Download } from 'lucide-react';

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
  const [userCount, setUserCount] = useState(null); // Corregido
  const [productCount, setProductCount] = useState(null);
  const [monthlySales, setMonthlySales] = useState([]);
  const [productRevenue, setProductRevenue] = useState([]);
  const [annualComparison, setAnnualComparison] = useState([]);
  const [recentSales, setRecentSales] = useState([]);
  const [summary, setSummary] = useState({});
  const [productAnalysis, setProductAnalysis] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Datos aleatorios generados localmente
        const generateRandomData = (keys, length) => {
          return Array.from({ length }, (_, i) => {
            const obj = {};
            keys.forEach(key => obj[key] = Math.floor(Math.random() * 100) + 1);
            obj.month = `Mes ${i + 1}`; // Clave para el eje X en el gráfico
            return obj;
          });
        };
  
        setSalesCount(Math.floor(Math.random() * 1000));
        setSalesRevenue(Math.floor(Math.random() * 50000));
        setUserCount(Math.floor(Math.random() * 500));
        setProductCount(Math.floor(Math.random() * 200));
  
        setMonthlySales(generateRandomData(['sales'], 12)); // 12 meses
        setProductRevenue(generateRandomData(['product', 'revenue'], 10)); // 10 productos
        setAnnualComparison(generateRandomData(['year', 'sales', 'revenue'], 5)); // 5 años
        setRecentSales(generateRandomData(['product', 'quantity', 'total'], 5)); // 5 ventas recientes
        setSummary({ description: "Este es un resumen generado aleatoriamente." });
        setProductAnalysis([{ analysis: "Análisis generado aleatoriamente" }]);
  
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);
    
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard de Ventas</h1>
          <p className="mt-2 text-gray-600">Monitoreo y análisis de ventas en tiempo real</p>
        </header>

        <StatsGrid 
          salesCount={salesCount} 
          salesRevenue={salesRevenue} 
          userCount={userCount} 
          productCount={productCount} 
        />

        <ChartsGrid 
          monthlySales={monthlySales} // Corregido
          productRevenue={productRevenue} 
          annualComparison={annualComparison} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <LatestSalesTable data={recentSales} />
          </div>
          <div className="space-y-6">
            <SummaryPanel summary={summary} />
            <CustomerAnalysis analysis={productAnalysis} />
          </div>
        </div>
      </div>
    </div>
  );
};

// StatsGrid Component
const StatsGrid = ({ salesCount, salesRevenue, userCount, productCount }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <StatCard title="Ventas Totales" value={salesCount ?? "Cargando..."} icon={<ShoppingCart className="h-6 w-6" />} trend="+12.5%" description="vs. mes anterior" color="blue" />
    <StatCard title="Ingresos" value={salesRevenue != null ? `$${salesRevenue}` : "Cargando..."} icon={<DollarSign className="h-6 w-6" />} trend="+8.3%" description="vs. mes anterior" color="green" />
    <StatCard title="Usuarios" value={userCount ?? "Cargando..."} icon={<Users className="h-6 w-6" />} trend="+5.2%" description="vs. mes anterior" color="purple" />
    <StatCard title="Productos" value={productCount ?? "Cargando..."} icon={<Package className="h-6 w-6" />} trend="+3.1%" description="vs. mes anterior" color="orange" />
  </div>
);

// StatCard Component
const StatCard = ({ title, value, icon, trend, description, color }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600'
  };

  return (
    <div className={`p-6 border border-black rounded-lg hover:shadow-lg transition-all duration-200 ${colors[color]}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${colors[color]}`}>
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <span className="text-sm font-medium text-green-600">{trend}</span>
        <span className="ml-2 text-sm text-gray-500">{description}</span>
      </div>
    </div>
  );
};

// ChartCard Component
const ChartCard = ({ title, chart, exportTitle, exportData }) => (
  <div className="overflow-hidden border border-black rounded-lg">
    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <div className="flex space-x-2">
        <CSVLink data={exportData} filename={`${exportTitle}.csv`} className="text-blue-600 hover:underline">CSV</CSVLink>
        <button onClick={() => exportToPDF(exportTitle, exportData)} className="text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md">
          <Download className="h-4 w-4 mr-2" />PDF
        </button>
      </div>
    </div>
    <div className="p-6 h-72">
      <ResponsiveContainer width="100%" height="100%">{chart}</ResponsiveContainer>
    </div>
  </div>
);

// ChartsGrid Component
const ChartsGrid = ({ monthlySales, productRevenue, annualComparison }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
    <ChartCard title="Ventas Mensuales" chart={<SalesChart data={monthlySales} />} exportTitle="Ventas Mensuales" exportData={monthlySales} />
    <ChartCard title="Ingresos por Productos" chart={<RevenueChart data={productRevenue} />} exportTitle="Ingresos por Productos" exportData={productRevenue} />
    <ChartCard title="Comparativa Anual" chart={<ComparisonChart data={annualComparison} />} exportTitle="Comparativa Anual" exportData={annualComparison} />
  </div>
);

// SalesChart, RevenueChart, and ComparisonChart Components
const SalesChart = ({ data }) => (
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB"/>
    <XAxis dataKey="month"/>
    <YAxis/>
    <Tooltip/>
    <Legend/>
    <Line type="monotone" dataKey="sales" stroke="#1D4ED8" activeDot={{ r: 8 }} />
  </LineChart>
);

const RevenueChart = ({ data }) => (
  <BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB"/>
    <XAxis dataKey="product"/>
    <YAxis/>
    <Tooltip/>
    <Legend/>
    <Bar dataKey="revenue" fill="#34D399"/>
  </BarChart>
);

const ComparisonChart = ({ data }) => (
  <BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB"/>
    <XAxis dataKey="year"/>
    <YAxis/>
    <Tooltip/>
    <Legend/>
    <Bar dataKey="sales" fill="#3B82F6" />
    <Bar dataKey="revenue" fill="#34D399" />
  </BarChart>
);

// LatestSalesTable Component
const LatestSalesTable = ({ data }) => (
  <div className="overflow-x-auto border border-black rounded-lg">
    <table className="min-w-full">
      <thead className="bg-gray-50">
        <tr>
          <th className="p-4 text-left text-sm font-medium text-gray-500">Producto</th>
          <th className="p-4 text-left text-sm font-medium text-gray-500">Cantidad</th>
          <th className="p-4 text-left text-sm font-medium text-gray-500">Total</th>
        </tr>
      </thead>
      <tbody>
        {data.map((sale, index) => (
          <tr key={index} className="border-t">
            <td className="p-4">{sale.product}</td>
            <td className="p-4">{sale.quantity}</td>
            <td className="p-4">{sale.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// SummaryPanel Component
const SummaryPanel = ({ summary }) => (
  <div className="border border-black rounded-lg p-6">
    <h3 className="text-lg font-semibold">Resumen</h3>
    <p className="mt-4 text-sm text-gray-500">{summary.description}</p>
  </div>
);

// CustomerAnalysis Component
const CustomerAnalysis = ({ analysis }) => (
  <div className="border border-black rounded-lg p-6">
    <h3 className="text-lg font-semibold">Análisis de Clientes</h3>
    <ul className="mt-4 space-y-2">
      {analysis.map((item, index) => (
        <li key={index} className="text-sm text-gray-500">{item.analysis}</li>
      ))}
    </ul>
  </div>
);

export default Dashboard;
