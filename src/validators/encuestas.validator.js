// Mismo tipo de reglas, escritas como esquema (checkSchema): útil cuando hay muchos campos.
const { checkSchema } = require('express-validator');
const ordenes = require('../repositories/ordenes.repository');

const reglasEncuesta = checkSchema({
  ordenId: {
    in: ['body'],
    notEmpty: { errorMessage: 'ordenId es obligatorio', bail: true },
    isInt: { options: { min: 1 }, errorMessage: 'ordenId debe ser un entero positivo', bail: true },
    toInt: true,
    custom: {
      options: (id) => {
        const orden = ordenes.findById(id);
        if (!orden) throw new Error('La orden indicada no existe');
        if (orden.estado !== 'entregado') throw new Error('Solo se puede evaluar una orden entregada');
        return true;
      },
    },
  },
  puntuacion: {
    in: ['body'],
    notEmpty: { errorMessage: 'La puntuación es obligatoria', bail: true },
    isInt: { options: { min: 1, max: 5 }, errorMessage: 'La puntuación debe ser un entero de 1 a 5' },
    toInt: true,
  },
  recomendaria: {
    in: ['body'],
    isBoolean: { errorMessage: 'recomendaria debe ser true o false' },
    toBoolean: true,
  },
  comentario: {
    in: ['body'],
    optional: { options: { values: 'falsy' } },
    trim: true,
    isLength: { options: { max: 300 }, errorMessage: 'El comentario admite máximo 300 caracteres' },
    escape: true,
  },
});

module.exports = { reglasEncuesta };
