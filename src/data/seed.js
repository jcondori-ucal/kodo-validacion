// Datos de ejemplo de Kodo Motors (los mismos de database/02_seed.sql del arquetipo).
// Aquí viven en memoria para que la API corra sin Docker; en MySQL serían filas de tablas.
module.exports = {
  sedes: [
    { id: 1, nombre: 'Kodo Surquillo', distrito: 'Surquillo', horaApertura: '08:00', horaCierre: '18:00', atiendeDomingo: false, activa: true },
    { id: 2, nombre: 'Kodo La Molina', distrito: 'La Molina', horaApertura: '08:30', horaCierre: '17:30', atiendeDomingo: true, activa: true },
    { id: 3, nombre: 'Kodo San Miguel', distrito: 'San Miguel', horaApertura: '09:00', horaCierre: '18:00', atiendeDomingo: false, activa: true },
  ],
  servicios: [
    { id: 1, nombre: 'Mantenimiento 10 000 km', categoria: 'mantenimiento', precio: 380, duracionMin: 120 },
    { id: 2, nombre: 'Diagnóstico computarizado', categoria: 'diagnostico', precio: 150, duracionMin: 60 },
    { id: 3, nombre: 'Cambio de pastillas de freno', categoria: 'frenos', precio: 290, duracionMin: 90 },
    { id: 4, nombre: 'Alineamiento y balanceo', categoria: 'neumaticos', precio: 120, duracionMin: 60 },
    { id: 5, nombre: 'Revisión de batería', categoria: 'electrico', precio: 60, duracionMin: 30 },
  ],
  contactos: [
    { id: 1, nombre: 'Lucía Ramírez', telefono: '987654321', email: 'lucia.ramirez@mail.com', aceptaWhatsapp: true },
    { id: 2, nombre: 'Carlos Huamán', telefono: '912345678', email: null, aceptaWhatsapp: false },
    { id: 3, nombre: 'Andrea Paredes', telefono: '955123456', email: 'andrea.p@mail.com', aceptaWhatsapp: true },
  ],
  vehiculos: [
    { id: 1, placa: 'ABC-123', modelo: 'CX-5', anio: 2022, color: 'Rojo Soul', kilometraje: 28500, contactoId: 1 },
    { id: 2, placa: 'BXD-456', modelo: 'Mazda3', anio: 2020, color: 'Gris Machine', kilometraje: 61200, contactoId: 2 },
    { id: 3, placa: 'CKM-789', modelo: 'CX-30', anio: 2024, color: 'Blanco', kilometraje: 9800, contactoId: 3 },
    { id: 4, placa: 'DLP-321', modelo: 'BT-50', anio: 2021, color: 'Azul', kilometraje: 45300, contactoId: 1 },
  ],
  reservas: [
    { id: 1, fecha: '2026-10-20', hora: '09:00', sedeId: 1, servicioId: 1, vehiculoId: 1, estado: 'confirmada', observacion: null },
    { id: 2, fecha: '2026-10-20', hora: '10:30', sedeId: 1, servicioId: 2, vehiculoId: 2, estado: 'pendiente', observacion: null },
  ],
  ordenes: [
    { id: 1, vehiculoId: 1, sedeId: 1, servicioId: 1, tecnico: 'Jorge Salas', kmIngreso: 28500, diagnostico: null, costo: 380, estado: 'entregado', repuestos: [] },
    { id: 2, vehiculoId: 2, sedeId: 1, servicioId: 3, tecnico: 'Rosa Díaz', kmIngreso: 61200, diagnostico: null, costo: 290, estado: 'entregado', repuestos: [] },
    { id: 3, vehiculoId: 4, sedeId: 2, servicioId: 2, tecnico: 'Jorge Salas', kmIngreso: 45300, diagnostico: null, costo: 150, estado: 'listo', repuestos: [] },
  ],
  pagos: [
    // La orden 1 cuesta S/ 380 y ya se pagaron S/ 200: saldo pendiente S/ 180
    { id: 1, ordenId: 1, monto: 200, metodo: 'yape', codigoOperacion: 'YP-0001', estado: 'aprobado' },
    { id: 2, ordenId: 2, monto: 290, metodo: 'efectivo', codigoOperacion: null, estado: 'aprobado' },
  ],
  repuestos: [
    { id: 1, codigo: 'PE01-14-302', nombre: 'Filtro de aceite', modeloCompatible: 'Todos', stock: 2 },
    { id: 2, codigo: 'KD1Y-33-28Z', nombre: 'Pastillas delanteras', modeloCompatible: 'CX-5', stock: 8 },
    { id: 3, codigo: 'BP4K-33-23Z', nombre: 'Pastillas delanteras', modeloCompatible: 'Mazda3', stock: 3 },
    { id: 4, codigo: 'PY8W-13-Z40', nombre: 'Filtro de aire', modeloCompatible: 'CX-5', stock: 12 },
  ],
  encuestas: [
    { id: 1, ordenId: 1, puntuacion: 5, recomendaria: true, comentario: 'Atención rápida y muy amable' },
  ],
  promociones: [
    { id: 1, codigo: 'MAZDA20', descripcion: '20 % en mantenimiento 10 000 km', servicioId: 1, descuentoPct: 20, fechaInicio: '2026-10-01', fechaFin: '2026-12-31', activa: true },
    { id: 2, codigo: 'KODO10', descripcion: '10 % en todos los servicios', servicioId: null, descuentoPct: 10, fechaInicio: '2026-10-01', fechaFin: '2026-11-30', activa: true },
  ],
};
