const { servicioOk, POST } = require('./_base');

module.exports = [
  { id: 'S01', grupo: 'Servicios', titulo: 'Filtro válido: frenos hasta S/ 300', concepto: 'query() con optional() + toFloat()', metodo: 'GET', ruta: '/api/servicios?categoria=frenos&precioMax=300&page=1&limit=5', esperado: 200, check: 'r.total >= 1' },
  { id: 'S02', grupo: 'Servicios', titulo: 'Sin parámetros: valores por defecto', concepto: 'Todo opcional; defaults en el servicio', metodo: 'GET', ruta: '/api/servicios', esperado: 200, check: 'r.page === 1 && r.limit === 10' },
  { id: 'S03', grupo: 'Servicios', titulo: 'Categoría que no existe', concepto: 'query("categoria").isIn([...])', metodo: 'GET', ruta: '/api/servicios?categoria=lujo', esperado: 400, campos: ['categoria'] },
  { id: 'S04', grupo: 'Servicios', titulo: 'precioMax negativo', concepto: 'isFloat({ gt: 0 })', metodo: 'GET', ruta: '/api/servicios?precioMax=-5', esperado: 400, campos: ['precioMax'] },
  { id: 'S05', grupo: 'Servicios', titulo: 'limit = 500', concepto: 'isInt({ max: 50 }) protege el servidor', metodo: 'GET', ruta: '/api/servicios?limit=500', esperado: 400, campos: ['limit'] },
  { id: 'S06', grupo: 'Servicios', titulo: 'page = 0', concepto: 'isInt({ min: 1 })', metodo: 'GET', ruta: '/api/servicios?page=0', esperado: 400, campos: ['page'] },
  { id: 'S07', grupo: 'Servicios', titulo: 'page y limit con texto', concepto: 'Dos parámetros inválidos a la vez', metodo: 'GET', ruta: '/api/servicios?page=abc&limit=xx', esperado: 400, campos: ['page', 'limit'] },
  { id: 'S08', grupo: 'Servicios', titulo: 'Servicio nuevo con precio "85.50" (texto)', concepto: 'isFloat() + isDecimal() + toFloat()', ...POST('/api/servicios', { ...servicioOk, precio: '85.50' }), esperado: 201, check: "r.precio === 85.5 && typeof r.precio === 'number'" },
  { id: 'S09', grupo: 'Servicios', titulo: 'Precio con 3 decimales', concepto: 'isDecimal({ decimal_digits: "0,2" })', ...POST('/api/servicios', { ...servicioOk, precio: 85.555 }), esperado: 400, campos: ['precio'] },
  { id: 'S10', grupo: 'Servicios', titulo: 'Duración de 50 minutos', concepto: 'custom() con regla propia (múltiplo de 15)', ...POST('/api/servicios', { ...servicioOk, duracionMin: 50 }), esperado: 400, campos: ['duracionMin'] },
  { id: 'S11', grupo: 'Servicios', titulo: 'Categoría inválida en el cuerpo', concepto: 'body("categoria").isIn([...])', ...POST('/api/servicios', { ...servicioOk, categoria: 'lujo' }), esperado: 400, campos: ['categoria'] },
  { id: 'S12', grupo: 'Servicios', titulo: 'Cuerpo vacío {}', concepto: 'Varios campos fallan a la vez', ...POST('/api/servicios', {}), esperado: 400, campos: ['nombre', 'categoria', 'precio', 'duracionMin'] },
];
