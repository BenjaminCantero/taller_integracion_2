const handleGenerateDocument = () => {
    // Lógica para generar boleta
    const boletaData = {
      // Incluye aquí la información necesaria para la boleta
      productos: productos, // Suponiendo que tienes una lista de productos en el estado
      total: calcularTotal(), // Implementa esta función para calcular el total
    };
  
    // Llama a la función que genera el PDF
    generateBoletaPDF(boletaData);
  };
  
  const generateBoletaPDF = (data) => {
    // Implementa la lógica para generar el PDF de la boleta
    const { productos, total } = data;
  
    // Aquí puedes usar jsPDF, pdf-lib, o cualquier otra librería para crear el PDF
    const doc = new jsPDF();
    doc.text("Boleta", 10, 10);
    // Agrega información de los productos y el total al PDF
    productos.forEach((producto, index) => {
      doc.text(`${producto.nombre}: $${producto.precio}`, 10, 20 + index * 10);
    });
    doc.text(`Total: $${total}`, 10, 20 + productos.length * 10);
    doc.save("boleta.pdf"); // Guarda el PDF
  };
  
  const handleInvoiceSubmit = (event) => {
    event.preventDefault(); // Evita el envío del formulario por defecto
    const rut = event.target.rut.value; // Obtiene el RUT
    const razonSocial = event.target.razonSocial.value; // Obtiene la razón social
  
    // Llama a la función para generar la factura PDF
    generateInvoicePDF({ rut, razonSocial });
  };
  
  const generateInvoicePDF = (data) => {
    const { rut, razonSocial } = data;
  
    // Aquí implementa la lógica para generar el PDF de la factura
    const doc = new jsPDF();
    doc.text("Factura", 10, 10);
    doc.text(`RUT: ${rut}`, 10, 20);
    doc.text(`Razón Social: ${razonSocial}`, 10, 30);
    // Agrega más información de la factura si es necesario
    doc.save("factura.pdf"); // Guarda el PDF
  };
  