// src/app/layout.js

import Layout from '@/components/layout';
import './globals.css';

export const metadata = {
  title: 'Gistoked',
  description: 'Zona de ventas',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
