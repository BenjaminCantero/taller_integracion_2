import React, { useState } from "react";


const BarcodeScannerModal = () => {
  const [data, setData] = useState("No result");

  return (
    <div>
      <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={(err, result) => {
          if (result) setData(result.text);
          else setData("No result");
        }}
      />
      <p>Scanned Data: {data}</p>
    </div>
  );
};

export default BarcodeScannerModal;
