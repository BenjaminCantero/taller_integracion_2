"use client";

// pages/index.js
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('account-general');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <style jsx>{`
        body {
          background: #f5f5f5;
          margin-top: 20px;
        }
        .ui-w-80 {
          width: 80px !important;
          height: auto;
        }
        .btn-default {
          border-color: rgba(24, 28, 33, 0.1);
          background: rgba(0, 0, 0, 0);
          color: #4E5155;
        }
        label.btn {
          margin-bottom: 0;
        }
        .btn-outline-primary {
          border-color: #26B4FF;
          background: transparent;
          color: #26B4FF;
        }
        .btn {
          cursor: pointer;
        }
        .text-light {
          color: #babbbc !important;
        }
        .card {
          background-clip: padding-box;
          box-shadow: 0 1px 4px rgba(24, 28, 33, 0.012);
        }
        .row-bordered {
          overflow: hidden;
        }
        .account-settings-fileinput {
          position: absolute;
          visibility: hidden;
          width: 1px;
          height: 1px;
          opacity: 0;
        }
        .account-settings-links .list-group-item.active {
          font-weight: bold !important;
          background-color: #e9ecef; /* Color de fondo para el item activo */
        }
        .light-style .account-settings-links .list-group-item {
          padding: 0.85rem 1.5rem;
          border-color: rgba(24, 28, 33, 0.03) !important;
        }
      `}</style>

      <div className="container light-style flex-grow-1 container-p-y">
        <Head>
          <title>CodingDung | Profile Template</title>
          <meta name="description" content="Plantilla de perfil" />
        </Head>

        <h4 className="font-weight-bold py-3 mb-4">Configuración de Cuenta</h4>
        <div className="card overflow-hidden">
          <div className="row no-gutters row-bordered row-border-light">
            <div className="col-md-3 pt-0">
              <div className="list-group list-group-flush account-settings-links">
                <a className="list-group-item list-group-item-action" onClick={() => handleTabChange('account-general')}>General</a>
                <a className="list-group-item list-group-item-action" onClick={() => handleTabChange('account-change-password')}>Cambiar contraseña</a>
                <a className="list-group-item list-group-item-action" onClick={() => handleTabChange('account-info')}>Info</a>
                <a className="list-group-item list-group-item-action" onClick={() => handleTabChange('account-social-links')}>Enlaces sociales</a>
                <a className="list-group-item list-group-item-action" onClick={() => handleTabChange('account-connections')}>Conexiones</a>
                <a className="list-group-item list-group-item-action" onClick={() => handleTabChange('account-notifications')}>Notificaciones</a>
              </div>
            </div>
            <div className="col-md-9">
              <div className="tab-content">
                <div className={`tab-pane fade ${activeTab === 'account-general' ? 'active show' : ''}`} id="account-general">
                  <div className="card-body media align-items-center">
                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" className="d-block ui-w-80" />
                    <div className="media-body ml-4">
                      <label className="btn btn-outline-primary">
                        Subir nueva foto
                        <input type="file" className="account-settings-fileinput" />
                      </label>
                      <button type="button" className="btn btn-default md-btn-flat">Restablecer</button>
                      <div className="text-light small mt-1">Se permiten JPG, GIF o PNG. Tamaño máximo de 800K</div>
                    </div>
                  </div>
                  <hr className="border-light m-0" />
                  <div className="card-body">
                    <div className="form-group">
                      <label className="form-label">Nombre de Usuario</label>
                      <input type="text" className="form-control mb-1" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Nombre</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">E-mail</label>
                      <input type="text" className="form-control mb-1" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Compañía</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                </div>

                <div className={`tab-pane fade ${activeTab === 'account-change-password' ? 'active show' : ''}`} id="account-change-password">
                  <div className="card-body">
                    <h5>Cambiar Contraseña</h5>
                    <div className="form-group">
                      <label className="form-label">Nueva Contraseña</label>
                      <input type="password" className="form-control mb-1" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Confirmar Nueva Contraseña</label>
                      <input type="password" className="form-control mb-1" />
                    </div>
                  </div>
                </div>

                {/* Aquí puedes agregar más pestañas como Info, Enlaces sociales, Conexiones y Notificaciones */}

              </div>
            </div>
          </div>
        </div>
        <div className="text-right mt-3">
          <button type="button" className="btn btn-primary">Guardar cambios</button>
          <button type="button" className="btn btn-default">Cancelar</button>
        </div>
      </div>
    </>
  );
}
