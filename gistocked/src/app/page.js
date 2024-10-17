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
};

export default Home;
