const TabSocialLinks = () => (
    <div className="tab-pane fade active show">
      <div className="card-body">
        <h5>Enlaces sociales</h5>
        <div className="form-group">
          <label className="form-label">Facebook</label>
          <input type="url" className="form-control" placeholder="https://facebook.com/yourprofile" />
        </div>
        <div className="form-group">
          <label className="form-label">Twitter</label>
          <input type="url" className="form-control" placeholder="https://twitter.com/yourprofile" />
        </div>
        <div className="form-group">
          <label className="form-label">LinkedIn</label>
          <input type="url" className="form-control" placeholder="https://linkedin.com/in/yourprofile" />
        </div>
      </div>
    </div>
  );
  
  export default TabSocialLinks;
  