// TabGeneral.js
const TabGeneral = () => (
    <div className="tab-pane fade active show">
      <div className="card-body media align-items-center">
        <img 
          src="https://bootdey.com/img/Content/avatar/avatar1.png" 
          alt="User Avatar" 
          className="d-block ui-w-80" 
        />
        <div className="media-body ml-4">
          <label className="btn btn-outline-primary">
            Upload new photo
            <input type="file" className="account-settings-fileinput" />
          </label>&nbsp;
          <button type="button" className="btn btn-default md-btn-flat">Reiniciar</button>
          <div className="text-light small mt-1">Se permiten archivos JPG, GIF o PNG. Tamaño máximo de 800 K</div>
        </div>
      </div>
      <hr className="border-light m-0" />
      <div className="card-body">
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
  
  export default TabGeneral;
  