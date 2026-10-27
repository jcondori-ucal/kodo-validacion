const { body } = require('express-validator');
const { campo } = require('./common');

// parcial = true (PATCH): cada campo solo se valida si viene en el cuerpo.
const reglasContacto = (parcial = false) => [
  campo('nombre', parcial).trim()
    .notEmpty().withMessage('El nombre es obligatorio').bail()
    .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres'),

  campo('telefono', parcial).trim()
    .notEmpty().withMessage('El teléfono es obligatorio').bail()
    .matches(/^9\d{8}$/).withMessage('El teléfono debe tener 9 dígitos y empezar con 9'),

  // Opcional: si llega vacío o null se ignora; si llega con texto, debe ser un correo.
  body('email').optional({ values: 'falsy' }).trim()
    .isEmail().withMessage('El correo no tiene un formato válido').bail()
    .isLength({ max: 120 }).withMessage('El correo admite máximo 120 caracteres')
    .normalizeEmail(),

  body('aceptaWhatsapp').optional()
    .isBoolean().withMessage('aceptaWhatsapp debe ser true o false').bail()
    .toBoolean(),
];

module.exports = { reglasContacto };
