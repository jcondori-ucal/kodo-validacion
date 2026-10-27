const { POST } = require('./_base');
const pago = (o) => ({ ordenId: 1, metodo: 'yape', monto: 100, codigoOperacion: 'YP-0002', ...o });

module.exports = [
  { id: 'P01', grupo: 'Pagos', titulo: 'Pago Yape válido', concepto: 'Validación condicional con .if()', ...POST('/api/pagos', pago()), esperado: 201 },
  { id: 'P02', grupo: 'Pagos', titulo: 'Monto mayor al saldo de la orden', concepto: 'custom() calcula saldo = total - pagado', ...POST('/api/pagos', pago({ monto: 500000 })), esperado: 400, campos: ['monto'] },
  { id: 'P03', grupo: 'Pagos', titulo: 'Monto 0', concepto: 'isFloat({ gt: 0 })', ...POST('/api/pagos', pago({ monto: 0 })), esperado: 400, campos: ['monto'] },
  { id: 'P04', grupo: 'Pagos', titulo: 'Monto con 3 decimales', concepto: 'isDecimal({ decimal_digits: "0,2" })', ...POST('/api/pagos', pago({ monto: 10.123 })), esperado: 400, campos: ['monto'] },
  { id: 'P05', grupo: 'Pagos', titulo: 'Yape sin código de operación', concepto: 'Obligatorio solo si metodo es yape/plin/tarjeta', ...POST('/api/pagos', pago({ monto: 20, codigoOperacion: undefined })), esperado: 400, campos: ['codigoOperacion'] },
  { id: 'P06', grupo: 'Pagos', titulo: 'Efectivo con código de operación', concepto: 'En efectivo el código no se acepta', ...POST('/api/pagos', pago({ metodo: 'efectivo', codigoOperacion: 'EF-0001' })), esperado: 400, campos: ['codigoOperacion'] },
  { id: 'P07', grupo: 'Pagos', titulo: 'Efectivo sin código', concepto: 'El campo condicional no aplica', ...POST('/api/pagos', pago({ metodo: 'efectivo', monto: 50, codigoOperacion: undefined })), esperado: 201 },
  { id: 'P08', grupo: 'Pagos', titulo: 'Método "bitcoin"', concepto: 'isIn([...])', ...POST('/api/pagos', pago({ metodo: 'bitcoin' })), esperado: 400, campos: ['metodo'] },
  { id: 'P09', grupo: 'Pagos', titulo: 'Código "yape123"', concepto: 'matches() por método de pago', ...POST('/api/pagos', pago({ codigoOperacion: 'yape123' })), esperado: 400, campos: ['codigoOperacion'] },
  { id: 'P10', grupo: 'Pagos', titulo: 'Orden 999', concepto: 'custom() de existencia', ...POST('/api/pagos', pago({ ordenId: 999 })), esperado: 400, campos: ['ordenId'] },
  { id: 'P11', grupo: 'Pagos', titulo: 'Código de operación ya usado', concepto: 'Duplicado = 409', ...POST('/api/pagos', pago({ codigoOperacion: 'YP-0001' })), esperado: 409 },
  { id: 'P12', grupo: 'Pagos', titulo: 'Monto "cien"', concepto: 'isFloat() sobre texto', ...POST('/api/pagos', pago({ monto: 'cien' })), esperado: 400, campos: ['monto'] },
  { id: 'P13', grupo: 'Pagos', titulo: 'GET con ?ordenId=abc', concepto: 'query("ordenId").isInt()', metodo: 'GET', ruta: '/api/pagos?ordenId=abc', esperado: 400, campos: ['ordenId'] },
  { id: 'P14', grupo: 'Pagos', titulo: 'GET con ?ordenId=1', concepto: 'Filtro válido', metodo: 'GET', ruta: '/api/pagos?ordenId=1', esperado: 200 },
];
