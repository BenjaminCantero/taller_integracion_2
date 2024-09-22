const TabChangePassword = () => (
  <div className="tab-pane fade active show">
    <div className="card-body">
      <h5 className="mb-4">Cambiar la contraseña</h5>
      <div className="form-group">
        <label className="form-label">Contraseña actual</label>
        <input type="password" className="form-control" placeholder="Enter your current password" />
      </div>
      <div className="form-group">
        <label className="form-label">Nueva Contraseña</label>
        <input type="password" className="form-control" placeholder="Enter your new password" />
      </div>
      <div className="form-group">
        <label className="form-label">Repetir la Nueva Contraseña</label>
        <input type="password" className="form-control" placeholder="Repeat your new password" />
      </div>
      <button type="button" className="btn btn-primary mt-3">Actualizar la contraseña</button>
    </div>
  </div>
);

export default TabChangePassword;
