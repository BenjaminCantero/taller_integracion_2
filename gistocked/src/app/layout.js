
'use client';
import './globals.css';
import Sidebar from './components/sidebar';
import Login from './auth/UserLogin/page';

import XD from './xd';

import { useState } from 'react';

const Layout = ({ children }) => {
  const [usuarioActivo, setUsuarioActivo] = useState(false);
  const [usuarioInfo, setUsuarioInfo] = useState({});

  if (!usuarioActivo) {
    return (
      <html lang='es'>
        <body>
          <div className='visible h-screen'>
            <Login
              setUsuarioActivo={setUsuarioActivo}
              setUsuarioInfo={setUsuarioInfo}
            ></Login>
          </div>
        </body>
      </html>
    )
  } else {
      return (
        <html lang='es'>
          <body>
            <XD>
              {children}
            </XD>
            {/*  
              <Sidebar
              usuarioInfo={usuarioInfo}
              >
                <div className='flex-1 overflow-y-auto p-6 bg-gray-100'>
                  {children}
                </div>
              </Sidebar>
            */}
          </body>
        </html>
      )
    }
  };

export default Layout;