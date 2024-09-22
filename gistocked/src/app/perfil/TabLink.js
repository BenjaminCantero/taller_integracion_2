// TabLink.js
const TabLink = ({ id, label, isActive, onClick }) => (
    <a
      className={`list-group-item list-group-item-action ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      {label}
    </a>
  );
  
  export default TabLink;
  