// components/Layout.js
import Sidebar from './sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-grow p-10 bg-gray-100">
        {children}
      </main>
    </div>
  );
};

export default Layout;
