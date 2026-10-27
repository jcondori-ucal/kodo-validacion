const { body, query } = require('express-validator');

const CATEGORIAS = ['mantenimiento', 'diagnostico', 'frenos', 'neumaticos', 'electrico', 'planchado_pintura'];

// Parámetros de consulta: GET /api/servicios?categoria=frenos&precioMax=300&page=1&limit=10
const consultaServicios = [
  query('categoria').optional()
    .isIn(CATEGORIAS).withMessage(`La categoría debe ser una de: ${CATEGORIAS.join(', ')}`),
  query('precioMax').optional()
    .isFloat({ gt: 0 }).withMessage('precioMax debe ser un número mayor a 0')
    .toFloat(),
  query('page').optional()
    .isInt({ min: 1 }).withMessage('page debe ser un entero desde 1')
    .toInt(),
  query('limit').optional()
    .isInt({ min: 1, max: 50 }).withMessage('limit debe ser un entero entre 1 y 50')
    .toInt(),
];

const reglasServicio = [
  body('nombre').trim()
    .notEmpty().withMessage('El nombre es obligatorio').bail()
    .isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres'),

  body('categoria')
    .notEmpty().withMessage('La categoría es obligatoria').bail()
    .isIn(CATEGORIAS).withMessage(`La categoría debe ser una de: ${CATEGORIAS.join(', ')}`),

  body('descripcion').optional({ values: 'falsy' }).trim()
    .isLength({ max: 255 }).withMessage('La descripción admite máximo 255 caracteres'),

  // Dinero: mayor a 0, con máximo 2 decimales.
  body('precio')
    .notEmpty().withMessage('El precio es obligatorio').bail()
    .isFloat({ gt: 0, max: 9999.99 }).withMessage('El precio debe ser mayor a 0 y menor a 10 000').bail()
    .isDecimal({ decimal_digits: '0,2' }).withMessage('El precio admite máximo 2 decimales')
    .toFloat(),

  // Regla propia: la duración se agenda en bloques de 15 minutos.
  body('duracionMin')
    .notEmpty().withMessage('La duración es obligatoria').bail()
    .isInt({ min: 15, max: 480 }).withMessage('La duración debe estar entre 15 y 480 minutos').bail()
    .toInt()
    .custom((minutos) => {
      if (minutos % 15 !== 0) throw new Error('La duración debe ser múltiplo de 15 minutos');
      return true;
    }),
];

module.exports = { consultaServicios, reglasServicio, CATEGORIAS };
