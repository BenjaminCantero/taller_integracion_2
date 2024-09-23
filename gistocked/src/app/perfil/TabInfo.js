const TabInfo = () => (
    <div className="tab-pane fade active show">
      <div className="card-body">
        <h5>Información de la cuenta</h5>
        <div className="form-group">
          <label className="form-label">Nombre completo</label>
          <input type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label className="form-label">E-mail</label>
          <input type="email" className="form-control" />
        </div>
        <div className="form-group">
          <label className="form-label">Número de teléfono</label>
          <input type="text" className="form-control" />
        </div>
      </div>
    </div>
  );
  
  export default TabInfo;
  