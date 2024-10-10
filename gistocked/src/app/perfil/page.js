"use client";
import { useState } from 'react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('General');

  const renderContent = (tab) => ({
    display: activeTab === tab ? 'block' : 'none',
  });

  const switchTab = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div>
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
  );
}
