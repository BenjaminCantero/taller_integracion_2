const TabNotifications = () => (
    <div className="tab-pane fade active show">
      <div className="card-body">
        <h5>Notifications</h5>
        <div className="form-group">
          <label className="form-label">Notificaciones por correo electrónico</label>
          <input type="checkbox" defaultChecked /> Recibir notificaciones por correo electrónico
        </div>
        <div className="form-group">
          <label className="form-label">Notificaciones SMS</label>
          <input type="checkbox" /> Recibir notificaciones vía SMS
        </div>
      </div>
    </div>
  );
  
  export default TabNotifications;
  