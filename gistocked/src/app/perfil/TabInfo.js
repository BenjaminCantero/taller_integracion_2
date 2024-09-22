const TabInfo = () => (
    <div className="tab-pane fade active show">
      <div className="card-body">
        <h5>Información de la cuenta</h5>
        <div className="form-group">
          <label className="form-label">Nombre completo</label>
          <input type="text" className="form-control" defaultValue="Nelle Maxwell" />
        </div>
        <div className="form-group">
          <label className="form-label">E-mail</label>
          <input type="email" className="form-control" defaultValue="nmaxwell@mail.com" />
        </div>
        <div className="form-group">
          <label className="form-label">Número de teléfono</label>
          <input type="text" className="form-control" defaultValue="123-456-7890" />
        </div>
      </div>
    </div>
  );
  
  export default TabInfo;
  