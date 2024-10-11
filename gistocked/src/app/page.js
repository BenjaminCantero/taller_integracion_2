<<<<<<< HEAD
import './globals.css'
import Head from 'next/head';
import React from 'react';

const Home = () => {
    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <div className="dashboard">
                <div className="main-content">
                    <div className="header">
                        <h2>Reporte General</h2>
                        <div className="user-info">
                            <input type="text" className="search-bar" placeholder="Buscar..." />
                            <i className="fas fa-bell" style={{ marginLeft: '20px', fontSize: '20px', color: '#666' }}></i>
                        </div>
                    </div>
                    <div className="widget-container">
                        <div className="widget">
                            <div className="widget-title">Total Ventas</div>
                            <div className="widget-value">S/. 4,710.00</div>
                            <span className="trend trend-up"><i className="fas fa-arrow-up"></i> 33%</span>
                        </div>
                        <div className="widget">
                            <div className="widget-title">Total Compras</div>
                            <div className="widget-value">S/. 3,721.00</div>
                            <span className="trend trend-down"><i className="fas fa-arrow-down"></i> 2%</span>
                        </div>
                        <div className="widget">
                            <div className="widget-title">Total Products</div>
                            <div className="widget-value">350</div>
                            <span className="trend trend-up"><i className="fas fa-arrow-up"></i> 12%</span>
                        </div>
                        <div className="widget">
                            <div className="widget-title">Clientes</div>
                            <div className="widget-value">1,500</div>
                            <span className="trend trend-up"><i className="fas fa-arrow-up"></i> 22%</span>
                        </div>
                    </div>
                    <div className="sales-report">
                        <div className="report-header">
                            <h3>Reporte de Ventas</h3>
                            <div>
                                <span className="date-range"><i className="far fa-calendar-alt"></i> 5 nov, 2022 - 5 dic, 2022</span>
                                <button className="btn" style={{ marginLeft: '10px' }}>Recargar Datos</button>
                            </div>
                        </div>
                        <div>
                            <span style={{ fontWeight: 500, fontSize: '18px', marginRight: '20px' }}>$15,000</span>
                            <span style={{ color: '#888' }}>Mes Actual</span>
                            <span style={{ fontWeight: 500, fontSize: '18px', margin: '0 20px 0 40px' }}>$10,000</span>
                            <span style={{ color: '#888' }}>Mes Anterior</span>
                            <select style={{ marginLeft: '40px', padding: '5px', borderRadius: '5px' }}>
                                <option>Filtrar por categoría</option>
                            </select>
                        </div>
                        <div className="chart-container">
                            <div className="chart-placeholder">Gráfico de Ventas</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
=======
import Layout from './layout'; // Asegúrate de que la ruta sea correcta

const Home = () => {
  return (
    <Layout>
      <main className="welcome-card bg-gradient-to-r from-gray-50 to-gray-200 shadow-lg rounded-lg p-8 max-w-3xl mx-auto mt-10">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Bienvenido al sistema</h1>

        <div className="profile-pic w-36 h-36 bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center rounded-full mx-auto mb-8 shadow-md">
          <span className="text-lg font-semibold">150 x 150</span>
        </div>

        <div className="user-details space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Nombre</label>
            <input 
              type="text" 
              value="user" 
              readOnly 
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Correo</label>
            <input 
              type="text" 
              value="user@gmail.com" 
              readOnly 
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Rol</label>
            <input 
              type="text" 
              value="Empleado" 
              readOnly 
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </main>
    </Layout>
  );
>>>>>>> comits-nuevo
};

export default Home;
