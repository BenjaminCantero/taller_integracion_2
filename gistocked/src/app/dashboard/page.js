
'use client'; 
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChart, Line } from 'recharts';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FaShoppingCart, FaMoneyBill, FaUsers, FaBoxOpen } from 'react-icons/fa'; // Iconos
import { saveAs } from 'file-saver';
import Papa from 'papaparse'; // Librería para exportar CSV

// Datos de ejemplo
const salesData = [
  { period: 'Ene', sales: 30 },
  { period: 'Feb', sales: 40 },
  { period: 'Mar', sales: 45 },
  { period: 'Abr', sales: 55 },
  { period: 'May', sales: 50 },
  { period: 'Jun', sales: 60 },
];

const revenueData = [
  { name: 'Monitor Samsung', value: 1200 },
  { name: 'Laptop HP', value: 1500 },
  { name: 'Teclado Logitech', value: 300 },
  { name: 'Mouse Razer', value: 200 },
];

const latestSales = [
  { id: 1, product: 'Monitor Samsung', quantity: 2, date: '08/10/2024' },
  { id: 2, product: 'Laptop HP', quantity: 1, date: '07/10/2024' },
  { id: 3, product: 'Teclado Logitech', quantity: 3, date: '06/10/2024' },
];

// Función para descargar el gráfico como PDF
const downloadChartAsPDF = (chartId, title) => {
  const input = document.getElementById(chartId);

  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10, 180, 160);
    pdf.save(`${title}.pdf`);
  });
};

// Función para descargar datos en CSV
const downloadDataAsCSV = (data, filename) => {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${filename}.csv`);
};

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Mensual');

  const getSalesData = () => {
    switch (selectedPeriod) {
      case 'Diario':
        return salesData.slice(0, 1); // Solo un día como ejemplo
      case 'Mensual':
        return salesData;
      case 'Anual':
        return salesData; 
      default:
        return salesData;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-5xl font-bold text-gray-800 text-center mb-10">Dashboard de Ventas</h1>

      <StatsGrid />
      <ChartsGrid
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        getSalesData={getSalesData}
      />
      <LatestSalesTable data={latestSales} />
      <SummaryPanel salesData={salesData} />
      <ExportReportButton data={salesData} />
      <CustomerAnalysis latestSales={latestSales} />

      <button 
        onClick={() => downloadDataAsCSV(salesData, 'SalesData')} 
        className="mt-6 w-full px-4 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition duration-200">
        Descargar Datos en CSV
      </button>
    </div>
  );
};

// Definición del componente StatCard
const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg flex items-center transition-transform transform hover:scale-105">
    <div className="mr-4 text-blue-500 text-4xl">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold text-gray-700">{value}</p>
    </div>
  </div>
);

const StatsGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <StatCard title="Cantidad de Ventas" value="13" icon={<FaShoppingCart />} />
    <StatCard title="Ingresos por Ventas" value="$25,060" icon={<FaMoneyBill />} />
    <StatCard title="Usuarios Registrados" value="180" icon={<FaUsers />} />
    <StatCard title="Productos Disponibles" value="60" icon={<FaBoxOpen />} />
  </div>
);

// Componente del Panel de Resumen
const SummaryPanel = ({ salesData }) => {
  const totalSales = salesData.reduce((acc, item) => acc + item.sales, 0);
  const averageSales = totalSales / salesData.length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <h3 className="text-xl font-bold mb-4">Resumen</h3>
      <p className="text-lg">Total Ventas: <span className="font-semibold">{totalSales}</span></p>
      <p className="text-lg">Promedio Mensual: <span className="font-semibold">{averageSales.toFixed(2)}</span></p>
    </div>
  );
};

// Componente para exportar informes
const ExportReportButton = ({ data }) => {
  const handleExport = () => {
    const csvData = Papa.unparse(data);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'Informe_Personalizado.csv');
  };

  return (
    <button onClick={handleExport} className="mt-4 w-full px-4 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200">
      Exportar Informe
    </button>
  );
};

// Análisis de Clientes
const CustomerAnalysis = ({ latestSales }) => {
  const productSalesCount = latestSales.reduce((acc, sale) => {
    acc[sale.product] = (acc[sale.product] || 0) + sale.quantity;
    return acc;
  }, {});

  const sortedProducts = Object.entries(productSalesCount).sort((a, b) => b[1] - a[1]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <h3 className="text-xl font-bold mb-4">Análisis de Productos</h3>
      <ul className="list-disc list-inside">
        {sortedProducts.map(([product, count]) => (
          <li key={product} className="py-1">
            {product}: <span className="font-semibold">{count} vendidos</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ChartsGrid = ({ selectedPeriod, setSelectedPeriod, getSalesData }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
    <ChartCard
      title={`Ventas ${selectedPeriod}`}
      chart={<SalesChart data={getSalesData()} chartId="salesChart" />}
      buttons={[
        { label: 'Diario', onClick: () => setSelectedPeriod('Diario') },
        { label: 'Mensual', onClick: () => setSelectedPeriod('Mensual') },
        { label: 'Anual', onClick: () => setSelectedPeriod('Anual') },
      ]}
      onDownload={() => downloadChartAsPDF('salesChart', `Ventas_${selectedPeriod}`)}
    />
    <ChartCard
      title="Ingresos por Producto"
      chart={<RevenueChart data={revenueData} chartId="revenueChart" />}
      onDownload={() => downloadChartAsPDF('revenueChart', 'Ingresos')}
    />
    {/* Comparativa Anual/Mensual */}
    <ChartCard
      title="Comparativa Mensual/Anual"
      chart={<SalesComparisonChart currentSalesData={salesData} previousSalesData={salesData} />}
    />
  </div>
);

// Componente para gráficos de ventas
const SalesChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="period" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
);

// Gráfico de ingresos
const RevenueChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#3b82f6" />
    </BarChart>
  </ResponsiveContainer>
);

// Gráfico de comparativa
const SalesComparisonChart = ({ currentSalesData, previousSalesData }) => {
  const currentSales = currentSalesData.reduce((acc, item) => acc + item.sales, 0);
  const previousSales = previousSalesData.reduce((acc, item) => acc + item.sales, 0);
  
  const data = [
    { name: 'Este Año', sales: currentSales },
    { name: 'Año Pasado', sales: previousSales },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );
};

// Tabla de ventas recientes
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

// Componente para las tarjetas de gráficos
const ChartCard = ({ title, chart, buttons, onDownload }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-200 hover:shadow-xl">
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    <div className="flex justify-between mb-4">
      <div>
        {buttons && buttons.map((btn, index) => (
          <button 
            key={index} 
            onClick={btn.onClick} 
            className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
            {btn.label}
          </button>
        ))}
      </div>
      <button 
        onClick={onDownload} 
        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200">
        Descargar Gráfico
      </button>
    </div>
    {chart}
  </div>
);

export default Dashboard;
