"use client";

import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TabGeneral from './TabGeneral';
import TabChangePassword from './TabChangePassword';
import TabInfo from './TabInfo';
import TabSocialLinks from './TabSocialLinks';
import TabConnections from './TabConnections';
import TabNotifications from './TabNotifications';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('General');

  const renderContent = (tab) => ({
    display: activeTab === tab ? 'block' : 'none',
    padding: '15px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
    overflow: 'hidden',
    wordWrap: 'break-word',
  });

  const sidebarStyle = {
    width: '250px',
    height: '590px', // Cambiar a auto para que se ajuste al contenido
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRight: '2px solid #e9ecef',
    position: 'fixed',
    top: '50%', // Centrar verticalmente
    left: '20px', // Alineado a la izquierda
    transform: 'translateY(-50%)', // Ajustar para centrar
  };

  const contentContainerStyle = {
    marginLeft: '270px', // Espacio suficiente para la barra lateral
    padding: '15px',
    maxHeight: '500px', // Altura máxima del contenedor de contenido
    overflowY: 'auto',
  };

  const buttonStyle = (isActive) => ({
    backgroundColor: isActive ? '#007bff' : '#fff',
    color: isActive ? '#fff' : '#000',
    border: 'none',
    padding: '10px 15px',
    textAlign: 'left',
    width: '100%',
    borderRadius: '4px',
    marginBottom: '10px',
    cursor: 'pointer',
    fontWeight: isActive ? 'bold' : 'normal',
  });

  const centerOptionsStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Centrar horizontalmente
    justifyContent: 'center', // Centrar verticalmente
    height: '100%', // Tomar toda la altura disponible
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Barra lateral */}
        <div style={sidebarStyle}>
          <h4 className="font-weight-bold text-center">Configuraciones</h4>
          <div style={centerOptionsStyle}>
            <ul className="nav flex-column" style={{ width: '100%' }}>
              <li className="nav-item">
                <button
                  style={buttonStyle(activeTab === 'General')}
                  onClick={() => setActiveTab('General')}
                >
                  General
                </button>
              </li>
              <li className="nav-item">
                <button
                  style={buttonStyle(activeTab === 'Cambiar la contraseña')}
                  onClick={() => setActiveTab('Cambiar la contraseña')}
                >
                  Cambiar la contraseña
                </button>
              </li>
              <li className="nav-item">
                <button
                  style={buttonStyle(activeTab === 'Info')}
                  onClick={() => setActiveTab('Info')}
                >
                  Info
                </button>
              </li>
              <li className="nav-item">
                <button
                  style={buttonStyle(activeTab === 'Enlaces sociales')}
                  onClick={() => setActiveTab('Enlaces sociales')}
                >
                  Enlaces sociales
                </button>
              </li>
              <li className="nav-item">
                <button
                  style={buttonStyle(activeTab === 'Connections')}
                  onClick={() => setActiveTab('Connections')}
                >
                  Connections
                </button>
              </li>
              <li className="nav-item">
                <button
                  style={buttonStyle(activeTab === 'Notificaciones')}
                  onClick={() => setActiveTab('Notificaciones')}
                >
                  Notificaciones
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Contenido principal */}
        <div style={contentContainerStyle}>
          <h4 className="font-weight-bold">Contenido</h4>

          {/* Contenido de cada pestaña */}
          <div style={renderContent('General')}>
            <TabGeneral />
          </div>

          <div style={renderContent('Cambiar la contraseña')}>
            <TabChangePassword />
          </div>

          <div style={renderContent('Info')}>
            <TabInfo />
          </div>

          <div style={renderContent('Enlaces sociales')}>
            <TabSocialLinks />
          </div>

          <div style={renderContent('Connections')}>
            <TabConnections />
          </div>

          <div style={renderContent('Notificaciones')}>
            <TabNotifications />
          </div>
        </div>
      </div>
    </div>
  );
}
