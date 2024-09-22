"use client";

import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TabGeneral from './TabGeneral';
import TabChangePassword from './TabChangePassword';
import TabInfo from './TabInfo';
import TabSocialLinks from './TabSocialLinks';
import TabConnections from './TabConnections';
import TabNotifications from './TabNotifications';
import TabLink from './TabLink';

const tabs = [
  { id: 'account-general', label: 'General', component: <TabGeneral /> },
  { id: 'account-change-password', label: 'Cambiar la contraseña', component: <TabChangePassword /> },
  { id: 'account-info', label: 'Info', component: <TabInfo /> },
  { id: 'account-social-links', label: 'Enlaces sociales', component: <TabSocialLinks /> },
  { id: 'account-connections', label: 'Connections', component: <TabConnections /> },
  { id: 'account-notifications', label: 'Notificaciones', component: <TabNotifications /> },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('account-general');

  return (
    <div className="container light-style flex-grow-1 container-p-y">
      <h4 className="font-weight-bold py-3 mb-4">Configuraciones de la cuenta</h4>
      <div className="card overflow-hidden">
        <div className="row no-gutters row-bordered row-border-light">
          <div className="col-md-3 pt-0">
            <div className="list-group list-group-flush account-settings-links">
              {tabs.map(tab => (
                <TabLink
                  key={tab.id}
                  id={tab.id}
                  label={tab.label}
                  isActive={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                />
              ))}
            </div>
          </div>
          <div className="col-md-9">
            <div className="tab-content">
              {tabs.find(tab => tab.id === activeTab).component}
            </div>
          </div>
        </div>
      </div>
      <div className="text-right mt-3">
        <button type="button" className="btn btn-primary">Guardar cambios</button>
        <button type="button" className="btn btn-default">Cancelar</button>
      </div>
    </div>
  );
}
