const { body } = require('express-validator');
const sedes = require('../repositories/sedes.repository');
const servicios = require('../repositories/servicios.repository');
const vehiculos = require('../repositories/vehiculos.repository');
const { idRelacion, fechaISO, hoyISO } = require('./common');

const HORA_RE = /^([01]\d|2[0-3]):[0-5]\d$/;
const esDomingo = (iso) => new Date(`${iso}T00:00:00`).getDay() === 0;
const sedeDe = (req) => sedes.findById(Number(req.body.sedeId)); // null si sedeId es inválido

const reglasReserva = [
  idRelacion('sedeId', sedes, 'La sede'),
  idRelacion('servicioId', servicios, 'El servicio'),
  idRelacion('vehiculoId', vehiculos, 'El vehículo'),

  fechaISO('fecha', 'La fecha').bail()
    .custom((fecha) => {
      if (fecha < hoyISO()) throw new Error('La fecha no puede estar en el pasado');
      return true;
    }).bail()
    // Regla entre campos: depende de la sede elegida.
    .custom((fecha, { req }) => {
      const sede = sedeDe(req);
      if (sede && esDomingo(fecha) && !sede.atiendeDomingo) throw new Error(`${sede.nombre} no atiende los domingos`);
      return true;
    }),

  body('hora').trim()
    .notEmpty().withMessage('La hora es obligatoria').bail()
    .matches(HORA_RE).withMessage('La hora debe tener formato HH:mm (24 horas)').bail()
    .custom((hora, { req }) => {
      const sede = sedeDe(req);
      if (sede && (hora < sede.horaApertura || hora >= sede.horaCierre)) {
        throw new Error(`${sede.nombre} atiende de ${sede.horaApertura} a ${sede.horaCierre}`);
      }
      return true;
    }),

  // Texto libre: se recorta y se escapa (<, >, &, ", ') para que no pueda inyectar HTML.
  body('observacion').optional({ values: 'falsy' }).trim()
    .isLength({ max: 255 }).withMessage('La observación admite máximo 255 caracteres')
    .escape(),
];

module.exports = { reglasReserva };
