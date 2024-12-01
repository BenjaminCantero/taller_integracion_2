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
    head: [Object.keys(data[0] || {})],
    body: data.map(row => Object.values(row)),
  });
  doc.save(`${title}.pdf`);
};

// Componente principal del Dashboard
const Dashboard = () => {
  const [salesCount, setSalesCount] = useState(null); // Total de ventas
  const [salesRevenue, setSalesRevenue] = useState(null); // Ingresos totales
  const [userCount, setUserCount] = useState(null); // Número de usuarios
  const [productCount, setProductCount] = useState(null); // Cantidad de productos
  const [monthlySales, setMonthlySales] = useState([]); // Ventas mensuales
  const [productRevenue, setProductRevenue] = useState([]); // Ingresos por producto
  const [annualComparison, setAnnualComparison] = useState([]); // Comparación anual
  const [recentSales, setRecentSales] = useState([]); // Ventas recientes
  const [inventory, setInventory] = useState([]); // Inventarios

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data..."); 
        const [ventaGeneral, ventaProducto, usuarios, inventarios] = await Promise.all([
          axios.get('http://190.114.252.218:8000/api/venta-general/'),
          axios.get('http://190.114.252.218:8000/api/venta-producto/'),
          axios.get('http://190.114.252.218:8000/api/usuarios/'),
          axios.get('http://190.114.252.218:8000/api/inventarios/')
        ]);
  
        // Log full response data for debugging
        console.log("Full API Responses:", {
          ventaGeneral: ventaGeneral.data,
          ventaProducto: ventaProducto.data,
          usuarios: usuarios.data,
          inventarios: inventarios.data
        });
  
        // More robust data extraction
        setSalesCount(ventaGeneral.data?.totalVentas || ventaGeneral.data?.total_ventas || 0);
        setSalesRevenue(ventaGeneral.data?.totalIngresos || ventaGeneral.data?.total_ingresos || 0);
        
        // Flexible data mapping
        setMonthlySales(ventaGeneral.data?.ventasMensuales || ventaGeneral.data?.ventas_mensuales || []);
        setProductRevenue(ventaProducto.data || []);
        setAnnualComparison(ventaGeneral.data?.comparativaAnual || ventaGeneral.data?.comparativa_anual || []);
        
        setUserCount(usuarios.data?.totalUsuarios || usuarios.data?.total_usuarios || usuarios.data?.length || 0);
        setInventory(inventarios.data || []);
        setProductCount(inventarios.data?.length || 0);
      } catch (error) {
        console.error("Detailed error fetching data:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
      }
    };
  
    fetchData();
  }, []);

  // Simulación de datos para los gráficos (si no hay datos)
  const simulatedMonthlySales = [
    { month: 'Enero', sales: 120 },
    { month: 'Febrero', sales: 150 },
    { month: 'Marzo', sales: 170 },
    { month: 'Abril', sales: 200 },
    { month: 'Mayo', sales: 180 },
    { month: 'Junio', sales: 160 },
  ];

  const simulatedProductRevenue = [
    { product: 'Producto A', revenue: 1500 },
    { product: 'Producto B', revenue: 2000 },
    { product: 'Producto C', revenue: 2500 },
    { product: 'Producto D', revenue: 1800 },
  ];
  

  const simulatedAnnualComparison = [
    { year: 2023, sales: 5000 },
    { year: 2024, sales: 6000 },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard de Ventas</h1>
          <p className="mt-2 text-gray-600">Monitoreo y análisis de ventas en tiempo real</p>
        </header>

        {/* Estadísticas generales */}
        <StatsGrid 
          salesCount={salesCount} 
          salesRevenue={salesRevenue} 
          userCount={userCount} 
          productCount={productCount} 
        />

        {/* Gráficos */}
        <ChartsGrid
          monthlySales={monthlySales.length > 0 ? monthlySales : simulatedMonthlySales}
          productRevenue={productRevenue.length > 0 ? productRevenue : simulatedProductRevenue}
          annualComparison={annualComparison.length > 0 ? annualComparison : simulatedAnnualComparison}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <LatestSalesTable data={recentSales} />
          </div>
          <div className="space-y-6">
            <InventoryPanel data={inventory} />
          </div>
        </div>
      </div>
    </div>
  );
};

// InventoryPanel Component
const InventoryPanel = ({ data }) => (
  <div className="p-4 bg-white shadow rounded-lg">
    <h2 className="text-lg font-bold text-gray-900 mb-4">Inventario</h2>
    <ul className="space-y-2">
      {data.map((item, index) => (
        <li key={index} className="flex justify-between">
          <span>{item.nombre_producto}</span> {/* Muestra el nombre del producto */}
          <span>{item.cantidad}</span> {/* Muestra la cantidad */}
        </li>
      ))}
    </ul>
  </div>
);


// StatsGrid Component
const StatsGrid = ({ salesCount, salesRevenue, userCount, productCount }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <StatCard title="Ventas Totales" value={salesCount ?? "Cargando..."} icon={<ShoppingCart className="h-6 w-6" />} trend="+12.5%" description="vs. mes anterior" color="blue" />
    <StatCard title="Ingresos" value={salesRevenue != null ? `$${salesRevenue}` : "Cargando..."} icon={<DollarSign className="h-6 w-6" />} trend="+8.3%" description="vs. mes anterior" color="green" />
    <StatCard title="Usuarios" value={userCount ?? "Cargando..."} icon={<Users className="h-6 w-6" />} trend="+5.2%" description="vs. mes anterior" color="purple" />
    <StatCard title="Productos" value={productCount ?? "Cargando..."} icon={<Package className="h-6 w-6" />} trend="+3.1%" description="vs. mes anterior" color="orange" />
  </div>
);

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
    <ChartCard title="Comparativa Anual" chart={<AnnualComparisonChart data={annualComparison} />} exportTitle="Comparativa Anual" exportData={annualComparison} />
  </div>
);

// SalesChart Component
const SalesChart = ({ data }) => {
  const chartData = data.map(item => ({
    month: item.month || item.mes,
    sales: item.sales || item.ventas || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};





// AnnualComparisonChart Component
const AnnualComparisonChart = ({ data }) => {
  const chartData = data.map(item => ({
    year: item.year || item.año,
    sales: item.sales || item.ventas || 0
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sales" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};



// StatCard Component
const StatCard = ({ title, value, icon, trend, description, color }) => (
  <div className="p-6 bg-white rounded-lg shadow flex items-center space-x-4">
    <div className={`p-3 bg-${color}-100 rounded-full text-${color}-600`}>
      {icon}
    </div>
    <div className="flex-1">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className={`text-${color}-600 text-sm`}>{trend} <span className="text-gray-600">{description}</span></p>
    </div>
  </div>
);

// LatestSalesTable Component
const LatestSalesTable = ({ data }) => (
  <div className="p-4 bg-white shadow rounded-lg">
    <h2 className="text-lg font-bold text-gray-900 mb-4">Ventas Recientes</h2>
    <table className="min-w-full text-sm text-gray-500">
      <thead>
        <tr>
          <th className="py-2 px-4 text-left">Producto</th>
          <th className="py-2 px-4 text-left">Cantidad</th>
          <th className="py-2 px-4 text-left">Fecha</th>
        </tr>
      </thead>
      <tbody>
        {data.map((sale, index) => (
          <tr key={index} className="border-b">
            <td className="py-2 px-4">{sale.producto}</td>
            <td className="py-2 px-4">{sale.cantidad}</td>
            <td className="py-2 px-4">{sale.fecha}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Dashboard;
