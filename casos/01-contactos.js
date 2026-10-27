const { J, contactoOk, POST } = require('./_base');

module.exports = [
  { id: 'C01', grupo: 'Contactos', titulo: 'Registro válido con espacios y correo en mayúsculas', concepto: 'trim() + normalizeEmail() + toBoolean()', ...POST('/api/contactos', { nombre: '  Marco Quispe ', telefono: '998877665', email: '  Marco.Quispe@Kodo.pe ', aceptaWhatsapp: 'true' }), esperado: 201, check: "r.nombre === 'Marco Quispe' && r.email === 'marco.quispe@kodo.pe' && r.aceptaWhatsapp === true" },
  { id: 'C02', grupo: 'Contactos', titulo: 'Nombre ausente', concepto: 'notEmpty()', ...POST('/api/contactos', { telefono: '998877661' }), esperado: 400, campos: ['nombre'] },
  { id: 'C03', grupo: 'Contactos', titulo: 'Nombre solo con espacios', concepto: 'trim() antes de notEmpty()', ...POST('/api/contactos', { nombre: '   ', telefono: '998877661' }), esperado: 400, campos: ['nombre'] },
  { id: 'C04', grupo: 'Contactos', titulo: 'Nombre de una letra', concepto: 'isLength({ min, max })', ...POST('/api/contactos', { nombre: 'A', telefono: '998877661' }), esperado: 400, campos: ['nombre'] },
  { id: 'C05', grupo: 'Contactos', titulo: 'Teléfono de 8 dígitos', concepto: 'matches(/^9\\d{8}$/)', ...POST('/api/contactos', { ...contactoOk, telefono: '98765432' }), esperado: 400, campos: ['telefono'] },
  { id: 'C06', grupo: 'Contactos', titulo: 'Teléfono que no empieza con 9', concepto: 'matches(/^9\\d{8}$/)', ...POST('/api/contactos', { ...contactoOk, telefono: '812345678' }), esperado: 400, campos: ['telefono'] },
  { id: 'C07', grupo: 'Contactos', titulo: 'Correo mal escrito', concepto: 'isEmail()', ...POST('/api/contactos', { ...contactoOk, email: 'marco@' }), esperado: 400, campos: ['email'] },
  { id: 'C08', grupo: 'Contactos', titulo: 'Correo vacío (es opcional)', concepto: 'optional({ values: "falsy" })', ...POST('/api/contactos', { nombre: 'Marco Quispe', telefono: '998877664', email: '' }), esperado: 201, check: 'r.email === null' },
  { id: 'C09', grupo: 'Contactos', titulo: 'aceptaWhatsapp con un valor raro', concepto: 'isBoolean()', ...POST('/api/contactos', { ...contactoOk, aceptaWhatsapp: 'quizas' }), esperado: 400, campos: ['aceptaWhatsapp'] },
  { id: 'C10', grupo: 'Contactos', titulo: 'Cuerpo vacío {}', concepto: 'Varios campos fallan a la vez', ...POST('/api/contactos', {}), esperado: 400, campos: ['nombre', 'telefono'] },
  { id: 'C11', grupo: 'Contactos', titulo: 'Teléfono ya registrado', concepto: 'Duplicado = 409, no 400', ...POST('/api/contactos', { nombre: 'Otra Persona', telefono: '987654321' }), esperado: 409 },
  { id: 'C12', grupo: 'Contactos', titulo: 'PATCH solo con el correo', concepto: 'optional() en actualización parcial', metodo: 'PATCH', ruta: '/api/contactos/1', body: { email: 'nuevo@mail.com' }, esperado: 200, check: "r.email === 'nuevo@mail.com' && r.nombre === 'Lucía Ramírez'" },
  { id: 'C13', grupo: 'Contactos', titulo: 'PATCH con teléfono inválido', concepto: 'optional() valida si el campo llega', metodo: 'PATCH', ruta: '/api/contactos/1', body: { telefono: '12' }, esperado: 400, campos: ['telefono'] },
  { id: 'C14', grupo: 'Contactos', titulo: 'PUT sin teléfono', concepto: 'PUT reemplaza: todo es obligatorio', metodo: 'PUT', ruta: '/api/contactos/1', body: { nombre: 'Lucía Ramírez' }, esperado: 400, campos: ['telefono'] },
  { id: 'C15', grupo: 'Contactos', titulo: 'GET con id "abc"', concepto: 'param("id").isInt()', metodo: 'GET', ruta: '/api/contactos/abc', esperado: 400, campos: ['id'] },
  { id: 'C16', grupo: 'Contactos', titulo: 'GET con id que no existe', concepto: 'Válido en formato, inexistente = 404', metodo: 'GET', ruta: '/api/contactos/999', esperado: 404 },
  { id: 'C17', grupo: 'Contactos', titulo: 'DELETE con id 0', concepto: 'param("id").isInt({ min: 1 })', metodo: 'DELETE', ruta: '/api/contactos/0', esperado: 400, campos: ['id'] },

  { id: 'J01', grupo: 'Cuerpo de la solicitud', titulo: 'JSON mal formado (coma final)', concepto: 'express.json() falla antes de las reglas', metodo: 'POST', ruta: '/api/contactos', raw: '{ "nombre": "Ana", }', contentType: J, esperado: 400, check: "typeof r.mensaje === 'string'" },
  { id: 'J02', grupo: 'Cuerpo de la solicitud', titulo: 'Cuerpo enviado como texto, no como JSON', concepto: 'Sin Content-Type JSON, req.body queda vacío', metodo: 'POST', ruta: '/api/contactos', raw: 'nombre=Ana&telefono=999888777', contentType: 'text/plain', esperado: 400, campos: ['nombre', 'telefono'] },
  { id: 'J03', grupo: 'Cuerpo de la solicitud', titulo: 'Campos extra: id y rol', concepto: 'matchedData() descarta lo que no tiene regla', ...POST('/api/contactos', { id: 999, rol: 'admin', nombre: 'Eva Rojas', telefono: '998877663' }), esperado: 201, check: 'r.id !== 999 && r.rol === undefined' },
  { id: 'J04', grupo: 'Cuerpo de la solicitud', titulo: 'Ruta que no existe', concepto: '404 para endpoints no definidos', metodo: 'GET', ruta: '/api/vehiculo', esperado: 404 },
];
