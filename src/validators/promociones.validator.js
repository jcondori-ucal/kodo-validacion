const { body } = require('express-validator');
const servicios = require('../repositories/servicios.repository');
const { fechaISO, existeEn } = require('./common');

const reglasPromocion = [
  body('codigo').trim()
    .notEmpty().withMessage('El código es obligatorio').bail()
    .matches(/^[A-Za-z0-9]{4,20}$/).withMessage('El código debe tener de 4 a 20 letras o números, sin símbolos')
    .toUpperCase(),

  body('descripcion').trim()
    .notEmpty().withMessage('La descripción es obligatoria').bail()
    .isLength({ min: 5, max: 150 }).withMessage('La descripción debe tener entre 5 y 150 caracteres'),

  // null significa "aplica a todos los servicios": optional({ values: 'null' }) lo deja pasar.
  body('servicioId').optional({ values: 'null' })
    .isInt({ min: 1 }).withMessage('servicioId debe ser un entero positivo').bail()
    .toInt()
    .custom(existeEn(servicios, 'El servicio')),

  body('descuentoPct')
    .notEmpty().withMessage('El descuento es obligatorio').bail()
    .isInt({ min: 1, max: 90 }).withMessage('El descuento debe ser un entero entre 1 y 90')
    .toInt(),

  fechaISO('fechaInicio', 'La fecha de inicio'),

  fechaISO('fechaFin', 'La fecha de fin').bail()
    .custom((fin, { req }) => {
      if (/^\d{4}-\d{2}-\d{2}$/.test(req.body.fechaInicio) && fin < req.body.fechaInicio) {
        throw new Error('La fecha de fin no puede ser anterior a la de inicio');
      }
      return true;
    }),

  body('activa').optional()
    .isBoolean().withMessage('activa debe ser true o false').bail()
    .toBoolean(),
];

module.exports = { reglasPromocion };
