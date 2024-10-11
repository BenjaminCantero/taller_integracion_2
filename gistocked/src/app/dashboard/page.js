"use client";

import React, { useState } from 'react';

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
];

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard title="Cantidad de Ventas" value="13" />
        <StatCard title="Ingresos por Ventas" value="$25,060" />
        <StatCard title="Usuarios Registrados" value="180" />
        <StatCard title="Productos Disponibles" value="60" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="Ventas Mensuales" chart={<SalesChart data={salesData} />} />
        <ChartCard title="Ingresos por Producto" chart={<RevenueChart data={revenueData} />} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Últimas Ventas</h2>
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
};

const StatCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const ChartCard = ({ title, chart }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <div className="h-64">
      {chart}
    </div>
  </div>
);

const SalesChart = ({ data }) => {
  const [hoveredBar, setHoveredBar] = useState(null);
  const maxSales = Math.max(...data.map(d => d.sales));
  const chartWidth = 300;
  const chartHeight = 200;
  const barWidth = chartWidth / data.length - 10;

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
      <defs>
        <linearGradient id="barGradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#3498db" />
          <stop offset="100%" stopColor="#2980b9" />
        </linearGradient>
      </defs>
      {/* Eje Y */}
      <line x1="40" y1="10" x2="40" y2={chartHeight - 20} stroke="#333" strokeWidth="2" />
      {/* Eje X */}
      <line x1="40" y1={chartHeight - 20} x2={chartWidth} y2={chartHeight - 20} stroke="#333" strokeWidth="2" />
      {data.map((item, index) => {
        const barHeight = (item.sales / maxSales) * (chartHeight - 40);
        const x = index * (barWidth + 10) + 50;
        const y = chartHeight - barHeight - 20;
        return (
          <g key={item.month}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={hoveredBar === index ? "url(#barGradient)" : "#3498db"}
              onMouseEnter={() => setHoveredBar(index)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              <animate
                attributeName="height"
                from="0"
                to={barHeight}
                dur="0.5s"
                fill="freeze"
              />
            </rect>
            <text
              x={x + barWidth / 2}
              y={chartHeight - 5}
              textAnchor="middle"
              fill="#333"
              fontSize="12"
            >
              {item.month}
            </text>
            {hoveredBar === index && (
              <text
                x={x + barWidth / 2}
                y={y - 5}
                textAnchor="middle"
                fill="#333"
                fontSize="12"
              >
                {item.sales}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

const RevenueChart = ({ data }) => {
  const [hoveredSlice, setHoveredSlice] = useState(null);
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12'];

  return (
    <svg width="100%" height="100%" viewBox="-50 -50 100 100">
      {data.map((item, index) => {
        const startAngle = currentAngle;
        const angleSize = (item.value / total) * 360;
        currentAngle += angleSize;
        const isHovered = hoveredSlice === index;

        return (
          <g key={item.name}>
            <path
              d={describeArc(0, 0, isHovered ? 42 : 40, startAngle, currentAngle)}
              fill={colors[index % colors.length]}
              onMouseEnter={() => setHoveredSlice(index)}
              onMouseLeave={() => setHoveredSlice(null)}
            >
              <animate
                attributeName="d"
                from={describeArc(0, 0, 0, startAngle, currentAngle)}
                to={describeArc(0, 0, isHovered ? 42 : 40, startAngle, currentAngle)}
                dur="0.5s"
                fill="freeze"
              />
            </path>
            {isHovered && (
              <text
                x={polarToCartesian(0, 0, 30, startAngle + angleSize / 2).x}
                y={polarToCartesian(0, 0, 30, startAngle + angleSize / 2).y}
                textAnchor="middle"
                fill="#fff"
                fontSize="4"
              >
                {`${item.name}: ${((item.value / total) * 100).toFixed(1)}%`}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

// Helper functions para el gráfico circular
function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    "M", start.x, start.y, 
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    "L", x, y,
    "Z"
  ].join(" ");
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

export default Dashboard;