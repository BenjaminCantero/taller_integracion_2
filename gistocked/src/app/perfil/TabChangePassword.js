const TabChangePassword = () => (
  <div className="tab-pane fade active show">
    <div className="card-body" style={formBodyStyle}>
      <h5 className="mb-4" style={headerStyle}>Cambiar la contraseña</h5>

      <div className="form-group">
        <label className="form-label">Contraseña actual</label>
        <input
          type="password"
          className="form-control"
          placeholder="Introduce tu contraseña actual"
          style={inputStyle}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Nueva Contraseña</label>
        <input
          type="password"
          className="form-control"
          placeholder="Introduce tu nueva contraseña"
          style={inputStyle}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Repetir la Nueva Contraseña</label>
        <input
          type="password"
          className="form-control"
          placeholder="Repite tu nueva contraseña"
          style={inputStyle}
        />
      </div>

      <button type="button" className="btn btn-primary mt-3" style={buttonStyle}>
        Actualizar la contraseña
      </button>
    </div>
  </div>
);

// Estilos CSS en línea
const formBodyStyle = {
  padding: '20px',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  width: '100%',
  minHeight: '400px',
};

const headerStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  borderRadius: '4px',
  border: '1px solid #ced4da',
  boxSizing: 'border-box',
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '1rem',
  maxWidth: '100%',
};

export default TabChangePassword;
