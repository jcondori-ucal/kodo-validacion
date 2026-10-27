const { body } = require('express-validator');
const contactos = require('../repositories/contactos.repository');
const { idRelacion } = require('./common');

const MODELOS = ['Mazda2', 'Mazda3', 'CX-3', 'CX-30', 'CX-5', 'CX-50', 'CX-90', 'BT-50', 'MX-5'];
const ANIO_MAX = new Date().getFullYear() + 1; // los modelos del año siguiente ya se venden

const reglasVehiculo = () => [
  body('placa').trim()
    .notEmpty().withMessage('La placa es obligatoria').bail()
    .matches(/^[A-Z0-9]{3}-\d{3}$/i).withMessage('Formato de placa inválido (ej. ABC-123)')
    .toUpperCase(),

  body('modelo').trim()
    .notEmpty().withMessage('El modelo es obligatorio').bail()
    .isIn(MODELOS).withMessage(`El modelo debe ser uno de: ${MODELOS.join(', ')}`),

  body('anio')
    .notEmpty().withMessage('El año es obligatorio').bail()
    .isInt({ min: 1990, max: ANIO_MAX }).withMessage(`El año debe ser un entero entre 1990 y ${ANIO_MAX}`)
    .toInt(),

  body('color').optional({ values: 'falsy' }).trim()
    .isLength({ max: 30 }).withMessage('El color admite máximo 30 caracteres').bail()
    .matches(/^[\p{L}\s]+$/u).withMessage('El color solo admite letras y espacios'),

  body('kilometraje').optional()
    .isInt({ min: 0, max: 999999 }).withMessage('El kilometraje debe ser un entero entre 0 y 999999')
    .toInt(),

  idRelacion('contactoId', contactos, 'El contacto'),
];

module.exports = { reglasVehiculo, MODELOS };
