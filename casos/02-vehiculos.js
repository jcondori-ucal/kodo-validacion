const { vehiculoOk, POST } = require('./_base');

module.exports = [
  { id: 'V01', grupo: 'Vehículos', titulo: 'Registro válido con placa en minúsculas', concepto: 'trim() + toUpperCase()', ...POST('/api/vehiculos', { ...vehiculoOk, placa: ' xyz-123 ' }), esperado: 201, check: "r.placa === 'XYZ-123'" },
  { id: 'V02', grupo: 'Vehículos', titulo: 'Placa sin guion', concepto: 'matches(/^[A-Z0-9]{3}-\\d{3}$/i)', ...POST('/api/vehiculos', { ...vehiculoOk, placa: 'XYZ123' }), esperado: 400, campos: ['placa'] },
  { id: 'V03', grupo: 'Vehículos', titulo: 'Modelo que Kodo no atiende', concepto: 'isIn([...])', ...POST('/api/vehiculos', { ...vehiculoOk, modelo: 'Corolla' }), esperado: 400, campos: ['modelo'] },
  { id: 'V04', grupo: 'Vehículos', titulo: 'Año enviado como texto "2021"', concepto: 'isInt() + toInt()', ...POST('/api/vehiculos', { ...vehiculoOk, placa: 'QWE-456', anio: '2021' }), esperado: 201, check: "r.anio === 2021 && typeof r.anio === 'number'" },
  { id: 'V05', grupo: 'Vehículos', titulo: 'Año 1980', concepto: 'isInt({ min: 1990 })', ...POST('/api/vehiculos', { ...vehiculoOk, anio: 1980 }), esperado: 400, campos: ['anio'] },
  { id: 'V06', grupo: 'Vehículos', titulo: 'Año con decimales 2021.5', concepto: 'isInt() rechaza decimales', ...POST('/api/vehiculos', { ...vehiculoOk, anio: 2021.5 }), esperado: 400, campos: ['anio'] },
  { id: 'V07', grupo: 'Vehículos', titulo: 'Año 2099', concepto: 'isInt({ max }) con el año actual + 1', ...POST('/api/vehiculos', { ...vehiculoOk, anio: 2099 }), esperado: 400, campos: ['anio'] },
  { id: 'V08', grupo: 'Vehículos', titulo: 'Kilometraje negativo', concepto: 'isInt({ min: 0 })', ...POST('/api/vehiculos', { ...vehiculoOk, kilometraje: -10 }), esperado: 400, campos: ['kilometraje'] },
  { id: 'V09', grupo: 'Vehículos', titulo: 'Kilometraje "mucho"', concepto: 'isInt() sobre texto', ...POST('/api/vehiculos', { ...vehiculoOk, kilometraje: 'mucho' }), esperado: 400, campos: ['kilometraje'] },
  { id: 'V10', grupo: 'Vehículos', titulo: 'Contacto que no existe', concepto: 'custom() contra el repositorio (llave foránea)', ...POST('/api/vehiculos', { ...vehiculoOk, contactoId: 999 }), esperado: 400, campos: ['contactoId'] },
  { id: 'V11', grupo: 'Vehículos', titulo: 'Color con números', concepto: 'matches(/^[\\p{L}\\s]+$/u)', ...POST('/api/vehiculos', { ...vehiculoOk, color: 'R0jo' }), esperado: 400, campos: ['color'] },
  { id: 'V12', grupo: 'Vehículos', titulo: 'PUT con id "abc"', concepto: 'param() y body() en la misma ruta', metodo: 'PUT', ruta: '/api/vehiculos/abc', body: { ...vehiculoOk, placa: 'ZZZ-999' }, esperado: 400, campos: ['id'] },
  { id: 'V13', grupo: 'Vehículos', titulo: 'PUT sobre un id que no existe', concepto: 'Datos válidos, recurso inexistente = 404', metodo: 'PUT', ruta: '/api/vehiculos/99', body: { ...vehiculoOk, placa: 'ZZZ-999' }, esperado: 404 },
  { id: 'V14', grupo: 'Vehículos', titulo: 'PUT válido (mismas reglas que el POST)', concepto: 'Reutilizar reglasVehiculo() en POST y PUT', metodo: 'PUT', ruta: '/api/vehiculos/1', body: { placa: 'abc-123', modelo: 'CX-5', anio: 2022, color: 'Rojo Soul', kilometraje: 29000, contactoId: 1 }, esperado: 200, check: "r.placa === 'ABC-123' && r.kilometraje === 29000" },
  { id: 'V15', grupo: 'Vehículos', titulo: 'Placa ya registrada', concepto: 'Duplicado = 409, no 400', ...POST('/api/vehiculos', { ...vehiculoOk, placa: 'abc-123' }), esperado: 409 },
  { id: 'V16', grupo: 'Vehículos', titulo: 'Cuerpo vacío {}', concepto: 'Varios campos fallan a la vez', ...POST('/api/vehiculos', {}), esperado: 400, campos: ['placa', 'modelo', 'anio', 'contactoId'] },
];
