"use client"; // Asegúrate de que esta línea esté al principio

// Importamos las dependencias necesarias
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FaShoppingCart, FaMoneyBill, FaUsers, FaBoxOpen } from 'react-icons/fa'; // Importando íconos

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
    pdf.addImage(imgData, 'PNG', 10, 10, 180, 160); // Posición e imagen
    pdf.save(`${title}.pdf`);
  });
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
        return salesData; // Aquí deberías adaptar los datos para mostrar ventas anuales
      default:
        return salesData;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      <StatsGrid />
      <ChartsGrid
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        getSalesData={getSalesData}
      />
      <LatestSalesTable />
    </div>
  );
};

const StatsGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <StatCard title="Cantidad de Ventas" value="13" icon={<FaShoppingCart />} />
    <StatCard title="Ingresos por Ventas" value="$25,060" icon={<FaMoneyBill />} />
    <StatCard title="Usuarios Registrados" value="180" icon={<FaUsers />} />
    <StatCard title="Productos Disponibles" value="60" icon={<FaBoxOpen />} />
  </div>
);

const ChartsGrid = ({ selectedPeriod, setSelectedPeriod, getSalesData }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <ChartCard
      title={`Ventas ${selectedPeriod}`}
      chart={<SalesChart data={getSalesData()} chartId="salesChart" />}
      table={<SalesTable data={getSalesData()} />}
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
      table={<RevenueTable data={revenueData} />}
      onDownload={() => downloadChartAsPDF('revenueChart', 'Ingresos_por_Producto')}
    />
  </div>
);

const LatestSalesTable = () => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-4">Últimas Ventas</h2>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">ID Venta</th>
            <th className="p-2 text-left">Producto</th>
            <th className="p-2 text-left">Cantidad</th>
            <th className="p-2 text-left">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {latestSales.map((sale) => (
            <tr key={sale.id} className="border-b">
              <td className="p-2">{sale.id}</td>
              <td className="p-2">{sale.product}</td>
              <td className="p-2">{sale.quantity}</td>
              <td className="p-2">{sale.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow flex items-center">
    <div className="mr-4 text-blue-500">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const ChartCard = ({ title, chart, table, buttons, onDownload }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>

    {/* Verificamos si buttons es un array antes de usar .map() */}
    <div className="flex space-x-4 mb-4">
      {Array.isArray(buttons) && buttons.map((button, index) => (
        <button
          key={index}
          onClick={button.onClick}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {button.label}
        </button>
      ))}
    </div>

    <div className="h-72">{chart}</div> {/* Ajustamos la altura aquí */}
    
    <button
      onClick={onDownload}
      className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
    >
      Descargar Gráfico en PDF
    </button>
    {table}
  </div>
);

const SalesTable = ({ data }) => (
  <div className="mt-4">
    <h4 className="text-lg font-semibold mb-2">Ventas Mensuales</h4>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Mes</th>
            <th className="p-2 text-left">Ventas</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">{item.period}</td>
              <td className="p-2">{item.sales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const RevenueTable = ({ data }) => (
  <div className="mt-4">
    <h4 className="text-lg font-semibold mb-2">Ingresos por Producto</h4>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Producto</th>
            <th className="p-2 text-left">Ingresos</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const SalesChart = ({ data, chartId }) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data} id={chartId}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="period" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="sales" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const RevenueChart = ({ data, chartId }) => (
  <ResponsiveContainer width="100%" height="100%">
    <PieChart id={chartId}>
      <Pie data={data} dataKey="value" nameKey="name" fill="#8884d8" label>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#8884d8' : '#82ca9d'} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
);

export default Dashboard;
