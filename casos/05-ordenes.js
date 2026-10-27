const { ordenOk, POST } = require('./_base');
const rep = (codigo, cantidad) => ({ codigo, cantidad });

module.exports = [
  { id: 'O01', grupo: 'Órdenes', titulo: 'Orden válida con un repuesto', concepto: 'Arreglo de objetos con comodines repuestos.*', ...POST('/api/ordenes', { ...ordenOk, repuestos: [rep('PE01-14-302', 1)], costo: 380 }), esperado: 201 },
  { id: 'O02', grupo: 'Órdenes', titulo: 'Orden sin costo ni repuestos', concepto: 'optional(): campos que pueden no venir', ...POST('/api/ordenes', { ...ordenOk, servicioId: 2 }), esperado: 201 },
  { id: 'O03', grupo: 'Órdenes', titulo: 'Kilometraje menor al registrado del vehículo', concepto: 'custom() contra otro recurso', ...POST('/api/ordenes', { ...ordenOk, kmIngreso: 1000 }), esperado: 400, campos: ['kmIngreso'] },
  { id: 'O04', grupo: 'Órdenes', titulo: 'Técnico con números', concepto: 'matches() de solo letras', ...POST('/api/ordenes', { ...ordenOk, tecnico: 'Jorge123' }), esperado: 400, campos: ['tecnico'] },
  { id: 'O05', grupo: 'Órdenes', titulo: 'Cantidad 0', concepto: 'isInt({ min: 1 }) en repuestos.*.cantidad', ...POST('/api/ordenes', { ...ordenOk, repuestos: [rep('PE01-14-302', 0)] }), esperado: 400, campos: ['repuestos[0].cantidad'] },
  { id: 'O06', grupo: 'Órdenes', titulo: 'Código de repuesto "XYZ"', concepto: 'matches() sobre cada elemento', ...POST('/api/ordenes', { ...ordenOk, repuestos: [rep('XYZ', 1)] }), esperado: 400, campos: ['repuestos[0].codigo'] },
  { id: 'O07', grupo: 'Órdenes', titulo: 'Código con formato correcto pero inexistente', concepto: 'custom() contra el catálogo', ...POST('/api/ordenes', { ...ordenOk, repuestos: [rep('ZZ99-99-ZZZ', 1)] }), esperado: 400, campos: ['repuestos[0].codigo'] },
  { id: 'O08', grupo: 'Órdenes', titulo: 'Cantidad mayor al stock', concepto: 'Regla de negocio con path del comodín', ...POST('/api/ordenes', { ...ordenOk, repuestos: [rep('PE01-14-302', 9999)] }), esperado: 400, campos: ['repuestos[0].cantidad'] },
  { id: 'O09', grupo: 'Órdenes', titulo: 'Mismo repuesto repetido', concepto: 'custom() sobre el arreglo completo', ...POST('/api/ordenes', { ...ordenOk, repuestos: [rep('PE01-14-302', 1), rep('PE01-14-302', 1)] }), esperado: 400, campos: ['repuestos'] },
  { id: 'O10', grupo: 'Órdenes', titulo: 'repuestos enviado como texto', concepto: 'isArray()', ...POST('/api/ordenes', { ...ordenOk, repuestos: 'filtro' }), esperado: 400, campos: ['repuestos'] },
  { id: 'O11', grupo: 'Órdenes', titulo: 'Dos errores en dos elementos', concepto: 'Cada elemento reporta su propio error', ...POST('/api/ordenes', { ...ordenOk, repuestos: [rep('XYZ', 1), rep('PE01-14-302', 0)] }), esperado: 400, campos: ['repuestos[0].codigo', 'repuestos[1].cantidad'] },
  { id: 'O12', grupo: 'Órdenes', titulo: 'Costo de la orden con 3 decimales', concepto: 'isDecimal({ decimal_digits: "0,2" })', ...POST('/api/ordenes', { ...ordenOk, repuestos: [rep('PE01-14-302', 1)], costo: 100.999 }), esperado: 400, campos: ['costo'] },
  { id: 'O13', grupo: 'Órdenes', titulo: 'Vehículo 999', concepto: 'custom() de existencia', ...POST('/api/ordenes', { ...ordenOk, vehiculoId: 999 }), esperado: 400, campos: ['vehiculoId'] },
  { id: 'O14', grupo: 'Órdenes', titulo: 'Cuerpo vacío {}', concepto: 'Varios campos fallan a la vez', ...POST('/api/ordenes', {}), esperado: 400, campos: ['vehiculoId', 'sedeId', 'servicioId', 'tecnico', 'kmIngreso'] },
];
