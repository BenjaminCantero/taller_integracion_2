const TabGeneral = () => (
  <div className="tab-pane fade active show">
    {/* Encabezado de usuario con imagen y botones */}
    <div className="card-body media align-items-center" style={mediaBodyStyle}>
      <img 
        src="" 
        alt="User Avatar" 
        className="d-block ui-w-80"
        style={avatarStyle} 
      />
      <div className="media-body ml-4">
        <label className="btn btn-outline-primary">
          Subir nueva foto
          <input type="file" className="account-settings-fileinput" />
        </label>&nbsp;
        <button type="button" className="btn btn-default md-btn-flat">Reiniciar</button>
        <div className="text-light small mt-1">Se permiten archivos JPG, GIF o PNG. Tamaño máximo de 800 KB</div>
      </div>
    </div>

    {/* Separador */}
    <hr className="border-light m-0" />

    {/* Formulario de configuración */}
    <div className="card-body" style={formBodyStyle}>
      <div className="form-group">
        <label className="form-label">Nombre de usuario</label>
        <input type="text" className="form-control mb-1" defaultValue="nmaxwell" />
      </div>

      <div className="form-group">
        <label className="form-label">Nombre</label>
        <input type="text" className="form-control" defaultValue="Nelle Maxwell" />
      </div>

      <div className="form-group">
        <label className="form-label">E-mail</label>
        <input type="text" className="form-control mb-1" defaultValue="nmaxwell@mail.com" />
        <div className="alert alert-warning mt-3">
          Tu correo electrónico no está confirmado. Por favor revisa tu bandeja de entrada.<br />
          <a href="javascript:void(0)">Reenviar confirmación</a>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Compañía</label>
        <input type="text" className="form-control" defaultValue="Company Ltd." />
      </div>
    </div>
  </div>
);

const avatarStyle = {
  width: '80px', // Tamaño del avatar
  height: '80px',
  objectFit: 'cover', // Para asegurar que la imagen no se deforme
};

const mediaBodyStyle = {
  display: 'flex',
  alignItems: 'center',
};

const formBodyStyle = {
  padding: '20px', // Espacio interno en el formulario
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Sombra para mejor presentación
};

export default TabGeneral;
