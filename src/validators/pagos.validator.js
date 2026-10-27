const { body } = require('express-validator');
const ordenes = require('../repositories/ordenes.repository');
const pagos = require('../repositories/pagos.repository');
const { idRelacion } = require('./common');

const METODOS = ['tarjeta', 'yape', 'plin', 'transferencia', 'efectivo'];
const CON_CODIGO = ['tarjeta', 'yape', 'plin', 'transferencia'];

const reglasPago = [
  idRelacion('ordenId', ordenes, 'La orden'),

  body('monto')
    .notEmpty().withMessage('El monto es obligatorio').bail()
    .isFloat({ gt: 0 }).withMessage('El monto debe ser mayor a 0').bail()
    .isDecimal({ decimal_digits: '0,2' }).withMessage('El monto admite máximo 2 decimales').bail()
    .toFloat()
    // Regla de negocio entre campos: no se puede pagar más que el saldo de la orden.
    .custom((monto, { req }) => {
      const orden = ordenes.findById(Number(req.body.ordenId));
      if (!orden) return true;
      const saldo = Math.round((orden.costo - pagos.totalAprobado(orden.id)) * 100) / 100;
      if (monto > saldo) throw new Error(`El monto excede el saldo pendiente (S/ ${saldo.toFixed(2)})`);
      return true;
    }),

  body('metodo').trim()
    .notEmpty().withMessage('El método de pago es obligatorio').bail()
    .isIn(METODOS).withMessage(`El método debe ser uno de: ${METODOS.join(', ')}`),

  // Validación condicional: el código de operación depende del método elegido.
  body('codigoOperacion').if(body('metodo').isIn(CON_CODIGO)).trim()
    .notEmpty().withMessage('El código de operación es obligatorio para este método de pago').bail()
    .matches(/^[A-Z]{2}-\d{4,10}$/).withMessage('Código de operación inválido (ej. YP-0001)'),

  body('codigoOperacion').if(body('metodo').equals('efectivo'))
    .isEmpty().withMessage('Un pago en efectivo no lleva código de operación'),
];

module.exports = { reglasPago, METODOS };
