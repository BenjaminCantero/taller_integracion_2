// src/app/layout.js

import Layout from '@/components/layout';
import './globals.css';

import { UserProvider } from './globalsUsers';

export const metadata = {
  title: 'Gistoked',
  description: 'Zona de ventas',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <UserProvider>
          <Layout>
            {children}
          </Layout>
        </UserProvider>
      </body>
    </html>
  );
}
