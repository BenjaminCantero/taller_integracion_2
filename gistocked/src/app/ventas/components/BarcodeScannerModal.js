import React from 'react';
import { BarcodeScanner } from 'react-zxing';

const BarcodeScannerModal = ({ isOpen, onScan, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-white p-6 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-4">Escanear Código de Barras</h2>
        <BarcodeScanner onUpdate={(err, result) => result && onScan(result)} />
        <button
          className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={onClose}
        >
          Cerrar Escáner
        </button>
      </div>
    </div>
  );
};

export default BarcodeScannerModal;
