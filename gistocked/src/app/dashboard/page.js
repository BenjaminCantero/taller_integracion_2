"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

// Datos de ejemplo
const salesData = [
  { month: 'Ene', sales: 30 },
  { month: 'Feb', sales: 40 },
  { month: 'Mar', sales: 45 },
  { month: 'Abr', sales: 55 },
  { month: 'May', sales: 50 },
  { month: 'Jun', sales: 60 },
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

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      <StatsGrid />
      <ChartsGrid />
      <LatestSalesTable />
    </div>
  );
};

const StatsGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <StatCard title="Cantidad de Ventas" value="13" icon={<SalesIcon />} />
    <StatCard title="Ingresos por Ventas" value="$25,060" icon={<RevenueIcon />} />
    <StatCard title="Usuarios Registrados" value="180" icon={<UserIcon />} />
    <StatCard title="Productos Disponibles" value="60" icon={<ProductIcon />} />
  </div>
);

const ChartsGrid = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <ChartCard title="Ventas Mensuales" chart={<SalesChart data={salesData} />} table={<SalesTable data={salesData} />} />
    <ChartCard title="Ingresos por Producto" chart={<RevenueChart data={revenueData} />} table={<RevenueTable data={revenueData} />} />
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

const ChartCard = ({ title, chart, table }) => (
  <div className="bg-white p-6 rounded-lg shadow">
 <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <div className="h-64">
      {chart}
    </div>
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
              <td className="p-2">{item.month}</td>
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
              <td className="p-2">${item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const SalesChart = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="sales" fill="#3498db" />
    </BarChart>
  </ResponsiveContainer>
);

const RevenueChart = ({ data }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

// Iconos simples (puedes reemplazarlos con una librería de iconos si lo prefieres)
const SalesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const RevenueIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2. 599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 111-8 0 4 4 0 01-8 0z" />
  </svg>
);

const ProductIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

export default Dashboard;