import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export const generateReceiptPDF = async (venta) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Datos de la empresa
  page.drawText('Razón Social Empresa', { x: 50, y: height - 50, size: 14, font: boldFont });
  page.drawText('Giro: Giro de la Empresa', { x: 50, y: height - 70, size: 10, font });
  page.drawText('Dirección de la Empresa', { x: 50, y: height - 85, size: 10, font });
  page.drawText('Comuna - Ciudad', { x: 50, y: height - 100, size: 10, font });

  // Datos de la boleta
  page.drawText('R.U.T.: 99.999.999-9', { x: width - 200, y: height - 50, size: 10, font });
  page.drawText('BOLETA ELECTRÓNICA', { x: width - 200, y: height - 65, size: 12, font: boldFont, color: rgb(1, 0, 0) });
  page.drawText('N° 1111', { x: width - 200, y: height - 80, size: 12, font: boldFont });
  page.drawText('S.I.I.', { x: width - 200, y: height - 95, size: 10, font });
  page.drawText('Fecha Emisión: ' + (venta.fecha || 'N/A'), { x: width - 200, y: height - 110, size: 10, font });

  // Datos del cliente (si están disponibles)
  let yPosition = height - 130;
  if (venta.direccion) {
    page.drawText('Dirección: ' + venta.direccion, { x: 50, y: yPosition, size: 10, font });
    yPosition -= 15;
  }
  if (venta.telefono) {
    page.drawText('Teléfono: ' + venta.telefono, { x: 50, y: yPosition, size: 10, font });
    yPosition -= 15;
  }


  // Tabla de productos
  const tableTop = yPosition - 20;
  page.drawText('CÓDIGO', { x: 50, y: tableTop, size: 10, font: boldFont });
  page.drawText('DESCRIPCIÓN', { x: 120, y: tableTop, size: 10, font: boldFont });
  page.drawText('CANTIDAD', { x: 300, y: tableTop, size: 10, font: boldFont });
  page.drawText('PRECIO', { x: 400, y: tableTop, size: 10, font: boldFont });
  page.drawText('VALOR', { x: 500, y: tableTop, size: 10, font: boldFont });

  yPosition = tableTop - 20;
  (venta.productos || []).forEach((producto) => {
    page.drawText(producto.codigo || 'N/A', { x: 50, y: yPosition, size: 10, font });
    page.drawText(producto.producto || 'N/A', { x: 120, y: yPosition, size: 10, font });
    page.drawText((producto.cantidad || 'N/A').toString(), { x: 300, y: yPosition, size: 10, font });
    page.drawText('$ ' + (producto.precio ? producto.precio.toFixed(2) : 'N/A'), { x: 400, y: yPosition, size: 10, font });
    page.drawText('$ ' + (producto.total ? producto.total.toFixed(2) : 'N/A'), { x: 500, y: yPosition, size: 10, font });
    yPosition -= 15;
  });

  // Totales
  const subtotal = (venta.productos || []).reduce((acc, p) => acc + (p.total || 0), 0);
  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  page.drawText('MONTO NETO $', { x: 400, y: yPosition - 20, size: 10, font });
  page.drawText(subtotal.toFixed(2), { x: 500, y: yPosition - 20, size: 10, font });
  page.drawText('I.V.A. 19% $', { x: 400, y: yPosition - 35, size: 10, font });
  page.drawText(iva.toFixed(2), { x: 500, y: yPosition - 35, size: 10, font });
  page.drawText('TOTAL $', { x: 400, y: yPosition - 50, size: 10, font: boldFont });
  page.drawText(total.toFixed(2), { x: 500, y: yPosition - 50, size: 10, font: boldFont });

  // Medio de pago
  page.drawText('Medio de Pago: ' + (venta.medioPago || 'N/A'), { x: 50, y: yPosition - 70, size: 10, font });

  // Descargar el PDF
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `boleta.pdf`;
  link.click();
};

export const generateInvoicePDF = async (venta) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Datos de la empresa
  page.drawText('Razón Social Empresa', { x: 50, y: height - 50, size: 14, font: boldFont });
  page.drawText('Giro: Giro de la Empresa', { x: 50, y: height - 70, size: 10, font });
  page.drawText('Dirección de la Empresa', { x: 50, y: height - 85, size: 10, font });
  page.drawText('Comuna - Ciudad', { x: 50, y: height - 100, size: 10, font });

  // Datos de la boleta
  page.drawText('R.U.T.: 99.999.999-9', { x: width - 200, y: height - 50, size: 10, font });
  page.drawText('FACTURA ELECTRÓNICA', { x: width - 200, y: height - 65, size: 12, font: boldFont, color: rgb(1, 0, 0) });
  page.drawText('N° 1111', { x: width - 200, y: height - 80, size: 12, font: boldFont });
  page.drawText('S.I.I.', { x: width - 200, y: height - 95, size: 10, font });
  page.drawText('Fecha Emisión: ' + (venta.fecha || 'N/A'), { x: width - 200, y: height - 110, size: 10, font });

  // Datos del cliente (si están disponibles)
  page.drawText('Señores: ' + (venta.razonSocial || 'N/A'), { x: 50, y: height - 130, size: 10, font });
  page.drawText('R.U.T.: ' + (venta.rut || 'N/A'), { x: 50, y: height - 145, size: 10, font });
  page.drawText('Dirección: ' + (venta.direccion || 'N/A'), { x: 50, y: height - 160, size: 10, font });
  page.drawText('Teléfono: ' + (venta.telefono || 'N/A'), { x: 50, y: height - 175, size: 10, font });

  // Tabla de productos
  const tableTop = height - 190;
  page.drawText('CÓDIGO', { x: 50, y: tableTop, size: 10, font: boldFont });
  page.drawText('DESCRIPCIÓN', { x: 120, y: tableTop, size: 10, font: boldFont });
  page.drawText('CANTIDAD', { x: 300, y: tableTop, size: 10, font: boldFont });
  page.drawText('PRECIO', { x: 400, y: tableTop, size: 10, font: boldFont });
  page.drawText('VALOR', { x: 500, y: tableTop, size: 10, font: boldFont });

  let yPosition = tableTop - 20;
  (venta.productos || []).forEach((producto) => {
    page.drawText(producto.codigo || 'N/A', { x: 50, y: yPosition, size: 10, font });
    page.drawText(producto.producto || 'N/A', { x: 120, y: yPosition, size: 10, font });
    page.drawText((producto.cantidad || 'N/A').toString(), { x: 300, y: yPosition, size: 10, font });
    page.drawText('$ ' + (producto.precio ? producto.precio.toFixed(2) : 'N/A'), { x: 400, y: yPosition, size: 10, font });
    page.drawText('$ ' + (producto.total ? producto.total.toFixed(2) : 'N/A'), { x: 500, y: yPosition, size: 10, font });
    yPosition -= 15;
  });

  // Totales
  const subtotal = (venta.productos || []).reduce((acc, p) => acc + (p.total || 0), 0);
  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  page.drawText('MONTO NETO $', { x: 400, y: yPosition - 20, size: 10, font });
  page.drawText(subtotal.toFixed(2), { x: 500, y: yPosition - 20, size: 10, font });
  page.drawText('I.V.A. 19% $', { x: 400, y: yPosition - 35, size: 10, font });
  page.drawText(iva.toFixed(2), { x: 500, y: yPosition - 35, size: 10, font });
  page.drawText('TOTAL $', { x: 400, y: yPosition - 50, size: 10, font: boldFont });
  page.drawText(total.toFixed(2), { x: 500, y: yPosition - 50, size: 10, font: boldFont });

  // Medio de Pago
  page.drawText('Medio de Pago: ' + (venta.medioPago || 'N/A'), { x: 50, y: yPosition - 70, size: 10, font });

  // Descargar el PDF
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `factura.pdf`;
  link.click();
};