// src/app/layout.js
import './globals.css';
import Layout from './components/layout';

export const metadata = {
  title: 'Mi Tienda',
  description: 'Gestión de inventario y ventas',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
