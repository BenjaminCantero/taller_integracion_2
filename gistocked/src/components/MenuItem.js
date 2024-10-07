// components/MenuItem.js
import Link from 'next/link';

function MenuItem({ href, iconClass, text, isActive }) {
  return (
    <Link href={href}>
      <div className={`menu-item ${isActive ? 'active' : ''}`}>
        <i className={iconClass}></i> {text}
      </div>
    </Link>
  );
}

export default MenuItem;
