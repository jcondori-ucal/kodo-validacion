// Datos base y atajos compartidos por los archivos de casos.
// Campos de cada caso: id, grupo, titulo, concepto (regla que se practica), metodo, ruta, body | raw+contentType,
//   esperado (status), campos (campos con error, solo en 400), check (expresión sobre la respuesta r).
module.exports = {
  J: 'application/json',
  contactoOk: { nombre: 'Marco Quispe', telefono: '998877661' },
  vehiculoOk: { placa: 'XYZ-123', modelo: 'CX-5', anio: 2023, color: 'Gris', kilometraje: 12000, contactoId: 1 },
  reservaOk: { sedeId: 1, servicioId: 1, vehiculoId: 1, fecha: '{{lunes}}', hora: '10:00' },
  ordenOk: { vehiculoId: 1, sedeId: 1, servicioId: 1, tecnico: 'Jorge Salas', kmIngreso: 29000 },
  servicioOk: { nombre: 'Cambio de luces', categoria: 'electrico', precio: 85.5, duracionMin: 45 },
  promoOk: { codigo: 'VERANO25', descripcion: '25% en alineamiento y balanceo', servicioId: 4, descuentoPct: 25, fechaInicio: '2026-12-01', fechaFin: '2026-12-31' },
  POST: (ruta, body) => ({ metodo: 'POST', ruta, body }),
};
