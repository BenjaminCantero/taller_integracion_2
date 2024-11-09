import React, { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner"; // Asegúrate de tener esta dependencia instalada

const BarcodeScannerModal = ({ products, onProductScanned }) => {
  const [data, setData] = useState("No result");

  const handleScan = (result) => {
    if (result) {
      setData(result.text);
      const scannedBarcode = result.text;
      
      // Busca el producto correspondiente en la lista de productos
      const scannedProduct = products.find(product => product.codigoBarras === scannedBarcode);

      if (scannedProduct) {
        // Llama a la función pasada como prop para añadir el producto escaneado
        onProductScanned(scannedProduct.id); // Aquí se asume que el producto tiene una propiedad 'id'
      } else {
        alert('Producto no encontrado');
      }
    } else {
      setData("No result");
    }
  };

  return (
    <div>
      <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={(err, result) => handleScan(result)}
      />
      <p>Scanned Data: {data}</p>
    </div>
  );
};

export default BarcodeScannerModal;