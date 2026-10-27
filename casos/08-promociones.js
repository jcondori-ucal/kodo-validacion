const { promoOk, POST } = require('./_base');

module.exports = [
  { id: 'PR01', grupo: 'Promociones', titulo: 'Promoción válida', concepto: 'Código normalizado con toUpperCase()', ...POST('/api/promociones', promoOk), esperado: 201 },
  { id: 'PR02', grupo: 'Promociones', titulo: 'servicioId null = promoción para todos', concepto: 'optional({ values: "null" })', ...POST('/api/promociones', { ...promoOk, codigo: 'TODOS15', servicioId: null, descuentoPct: 15 }), esperado: 201 },
  { id: 'PR03', grupo: 'Promociones', titulo: 'fechaFin anterior a fechaInicio', concepto: 'Regla entre campos', ...POST('/api/promociones', { ...promoOk, fechaInicio: '2026-12-31', fechaFin: '2026-12-01' }), esperado: 400, campos: ['fechaFin'] },
  { id: 'PR04', grupo: 'Promociones', titulo: 'Descuento 150%', concepto: 'isInt({ min: 1, max: 90 })', ...POST('/api/promociones', { ...promoOk, descuentoPct: 150 }), esperado: 400, campos: ['descuentoPct'] },
  { id: 'PR05', grupo: 'Promociones', titulo: 'Código "DES-10%"', concepto: 'matches(/^[A-Z0-9]{4,12}$/)', ...POST('/api/promociones', { ...promoOk, codigo: 'DES-10%' }), esperado: 400, campos: ['codigo'] },
  { id: 'PR06', grupo: 'Promociones', titulo: 'Código "kodo10" ya existe (case-insensitive)', concepto: 'Normalizar antes de comparar; duplicado = 409', ...POST('/api/promociones', { ...promoOk, codigo: 'kodo10' }), esperado: 409 },
  { id: 'PR07', grupo: 'Promociones', titulo: 'Servicio 99', concepto: 'custom() de existencia', ...POST('/api/promociones', { ...promoOk, servicioId: 99 }), esperado: 400, campos: ['servicioId'] },
  { id: 'PR08', grupo: 'Promociones', titulo: 'Fecha 01-12-2026', concepto: 'isISO8601({ strict: true })', ...POST('/api/promociones', { ...promoOk, fechaInicio: '01-12-2026' }), esperado: 400, campos: ['fechaInicio'] },
  { id: 'PR09', grupo: 'Promociones', titulo: 'Cuerpo vacío {}', concepto: 'Varios campos fallan a la vez', ...POST('/api/promociones', {}), esperado: 400, campos: ['codigo', 'descripcion', 'descuentoPct', 'fechaInicio', 'fechaFin'] },
];
