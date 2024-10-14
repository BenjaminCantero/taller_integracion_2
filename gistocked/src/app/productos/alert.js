import React from 'react';

export const Alert = ({ variant, children }) => {
  const alertStyle = {
    destructive: 'bg-red-100 text-red-700 border border-red-400',
    warning: 'bg-yellow-100 text-yellow-700 border border-yellow-400',
    info: 'bg-blue-100 text-blue-700 border border-blue-400',
  };

  return (
    <div className={`p-4 rounded ${alertStyle[variant]}`}>
      {children}
    </div>
  );
};

export const AlertTitle = ({ children }) => (
  <h3 className="text-lg font-bold">{children}</h3>
);

export const AlertDescription = ({ children }) => (
  <p className="mt-2">{children}</p>
);
