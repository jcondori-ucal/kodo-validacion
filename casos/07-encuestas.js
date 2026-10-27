const { POST } = require('./_base');
const enc = (o) => ({ ordenId: 2, puntuacion: 5, recomendaria: true, comentario: 'Excelente atención', ...o });

module.exports = [
  { id: 'E01', grupo: 'Encuestas', titulo: 'Encuesta válida', concepto: 'checkSchema: reglas como objeto', ...POST('/api/encuestas', enc()), esperado: 201 },
  { id: 'E02', grupo: 'Encuestas', titulo: 'Puntuación 6', concepto: 'isInt({ min: 1, max: 5 })', ...POST('/api/encuestas', enc({ puntuacion: 6 })), esperado: 400, campos: ['puntuacion'] },
  { id: 'E03', grupo: 'Encuestas', titulo: 'Puntuación "cinco"', concepto: 'bail: detiene la cadena en el primer error', ...POST('/api/encuestas', enc({ puntuacion: 'cinco' })), esperado: 400, campos: ['puntuacion'] },
  { id: 'E04', grupo: 'Encuestas', titulo: 'recomendaria ausente', concepto: 'exists() en checkSchema', ...POST('/api/encuestas', enc({ recomendaria: undefined })), esperado: 400, campos: ['recomendaria'] },
  { id: 'E05', grupo: 'Encuestas', titulo: 'recomendaria "si"', concepto: 'isBoolean() acepta true/false, no "si"', ...POST('/api/encuestas', enc({ recomendaria: 'si' })), esperado: 400, campos: ['recomendaria'] },
  { id: 'E06', grupo: 'Encuestas', titulo: 'Orden aún no entregada', concepto: 'Regla de estado del recurso', ...POST('/api/encuestas', enc({ ordenId: 3 })), esperado: 400, campos: ['ordenId'] },
  { id: 'E07', grupo: 'Encuestas', titulo: 'Orden 999', concepto: 'custom() de existencia', ...POST('/api/encuestas', enc({ ordenId: 999 })), esperado: 400, campos: ['ordenId'] },
  { id: 'E08', grupo: 'Encuestas', titulo: 'Comentario de 301 caracteres', concepto: 'isLength({ max: 300 })', ...POST('/api/encuestas', enc({ comentario: 'x'.repeat(301) })), esperado: 400, campos: ['comentario'] },
  { id: 'E09', grupo: 'Encuestas', titulo: 'Orden que ya tiene encuesta', concepto: 'Duplicado = 409', ...POST('/api/encuestas', enc({ ordenId: 1 })), esperado: 409 },
  { id: 'E10', grupo: 'Encuestas', titulo: 'Cuerpo vacío {}', concepto: 'Varios campos fallan a la vez', ...POST('/api/encuestas', {}), esperado: 400, campos: ['ordenId', 'puntuacion', 'recomendaria'] },
];
