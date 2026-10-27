const { reservaOk, POST } = require('./_base');

module.exports = [
  { id: 'R01', grupo: 'Reservas', titulo: 'Reserva válida; el cliente intenta fijar estado "atendida"', concepto: 'matchedData() + estado decidido por el servidor', ...POST('/api/reservas', { ...reservaOk, observacion: 'Traer llave', estado: 'atendida' }), esperado: 201, check: "r.estado === 'pendiente'" },
  { id: 'R02', grupo: 'Reservas', titulo: 'Fecha de ayer', concepto: 'custom(): no se reserva en el pasado', ...POST('/api/reservas', { ...reservaOk, fecha: '{{ayer}}' }), esperado: 400, campos: ['fecha'] },
  { id: 'R03', grupo: 'Reservas', titulo: 'Fecha 2026-02-30', concepto: 'isISO8601({ strict: true })', ...POST('/api/reservas', { ...reservaOk, fecha: '2026-02-30' }), esperado: 400, campos: ['fecha'] },
  { id: 'R04', grupo: 'Reservas', titulo: 'Fecha 25/12/2026', concepto: 'Formato ISO obligatorio (AAAA-MM-DD)', ...POST('/api/reservas', { ...reservaOk, fecha: '25/12/2026' }), esperado: 400, campos: ['fecha'] },
  { id: 'R05', grupo: 'Reservas', titulo: 'Hora 07:30 (la sede abre a las 08:00)', concepto: 'Regla entre campos: hora vs. horario de la sede', ...POST('/api/reservas', { ...reservaOk, hora: '07:30' }), esperado: 400, campos: ['hora'] },
  { id: 'R06', grupo: 'Reservas', titulo: 'Hora 18:00 (la sede cierra a las 18:00)', concepto: 'Límite: el cierre no es una hora válida', ...POST('/api/reservas', { ...reservaOk, hora: '18:00' }), esperado: 400, campos: ['hora'] },
  { id: 'R07', grupo: 'Reservas', titulo: 'Hora 25:00', concepto: 'matches(HH:mm de 24 horas)', ...POST('/api/reservas', { ...reservaOk, hora: '25:00' }), esperado: 400, campos: ['hora'] },
  { id: 'R08', grupo: 'Reservas', titulo: 'Domingo en la sede que no atiende domingos', concepto: 'Regla entre campos: fecha vs. atiendeDomingo', ...POST('/api/reservas', { ...reservaOk, fecha: '{{domingo}}' }), esperado: 400, campos: ['fecha'] },
  { id: 'R09', grupo: 'Reservas', titulo: 'Domingo en la sede que sí atiende', concepto: 'La misma fecha es válida en otra sede', ...POST('/api/reservas', { ...reservaOk, sedeId: 2, fecha: '{{domingo}}', hora: '10:00' }), esperado: 201 },
  { id: 'R10', grupo: 'Reservas', titulo: 'Sede 99', concepto: 'custom() de existencia', ...POST('/api/reservas', { ...reservaOk, sedeId: 99 }), esperado: 400, campos: ['sedeId'] },
  { id: 'R11', grupo: 'Reservas', titulo: 'servicioId "frenos"', concepto: 'isInt() antes de consultar la base', ...POST('/api/reservas', { ...reservaOk, servicioId: 'frenos' }), esperado: 400, campos: ['servicioId'] },
  { id: 'R12', grupo: 'Reservas', titulo: 'Cuerpo vacío {}', concepto: 'Varios campos fallan a la vez', ...POST('/api/reservas', {}), esperado: 400, campos: ['sedeId', 'servicioId', 'vehiculoId', 'fecha', 'hora'] },
  { id: 'R13', grupo: 'Reservas', titulo: 'Observación con <script>', concepto: 'escape() neutraliza HTML', ...POST('/api/reservas', { ...reservaOk, observacion: '<script>alert(1)</script>' }), esperado: 201, check: "r.observacion.indexOf('<') === -1" },
  { id: 'R14', grupo: 'Reservas', titulo: 'Observación de 300 caracteres', concepto: 'isLength({ max: 255 })', ...POST('/api/reservas', { ...reservaOk, observacion: 'x'.repeat(300) }), esperado: 400, campos: ['observacion'] },
];
