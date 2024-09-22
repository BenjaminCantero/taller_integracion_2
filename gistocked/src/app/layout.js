// src/app/layout.js
import './globals.css';
import Layout from './components/layout';

export const metadata = {
  title: 'Gistoked',
  description: 'Zona de ventas',
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
