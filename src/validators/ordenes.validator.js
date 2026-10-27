const { body } = require('express-validator');
const sedes = require('../repositories/sedes.repository');
const servicios = require('../repositories/servicios.repository');
const vehiculos = require('../repositories/vehiculos.repository');
const repuestos = require('../repositories/repuestos.repository');
const { idRelacion } = require('./common');

const reglasOrden = [
  idRelacion('vehiculoId', vehiculos, 'El vehículo'),
  idRelacion('sedeId', sedes, 'La sede'),
  idRelacion('servicioId', servicios, 'El servicio'),

  body('tecnico').trim()
    .notEmpty().withMessage('El técnico es obligatorio').bail()
    .isLength({ min: 3, max: 100 }).withMessage('El técnico debe tener entre 3 y 100 caracteres').bail()
    .matches(/^[\p{L}\s.'-]+$/u).withMessage('El técnico solo admite letras y espacios'),

  // Regla entre campos: el odómetro no puede retroceder respecto al último registro del vehículo.
  body('kmIngreso')
    .notEmpty().withMessage('El kilometraje de ingreso es obligatorio').bail()
    .isInt({ min: 0, max: 999999 }).withMessage('El kilometraje debe ser un entero entre 0 y 999999').bail()
    .toInt()
    .custom((km, { req }) => {
      const vehiculo = vehiculos.findById(Number(req.body.vehiculoId));
      if (vehiculo && km < vehiculo.kilometraje) {
        throw new Error(`El kilometraje no puede ser menor al último registrado (${vehiculo.kilometraje} km)`);
      }
      return true;
    }),

  body('diagnostico').optional({ values: 'falsy' }).trim()
    .isLength({ max: 255 }).withMessage('El diagnóstico admite máximo 255 caracteres')
    .escape(),

  body('costo').optional()
    .isFloat({ min: 0, max: 99999 }).withMessage('El costo debe ser un número entre 0 y 99 999').bail()
    .isDecimal({ decimal_digits: '0,2' }).withMessage('El costo admite máximo 2 decimales')
    .toFloat(),

  // Lista de objetos: repuestos[0].codigo, repuestos[0].cantidad, ...
  body('repuestos').optional()
    .isArray({ max: 10 }).withMessage('repuestos debe ser una lista de hasta 10 elementos').bail()
    .custom((lista) => {
      const codigos = lista.map((r) => r && r.codigo);
      if (new Set(codigos).size !== codigos.length) throw new Error('No repitas un repuesto: suma las cantidades');
      return true;
    }),

  body('repuestos.*.codigo').if(body('repuestos').isArray()).trim()
    .notEmpty().withMessage('El código del repuesto es obligatorio').bail()
    .matches(/^[A-Z0-9]{4}-\d{2}-[A-Z0-9]{3}$/).withMessage('Código de repuesto inválido (ej. PE01-14-302)').bail()
    .custom((codigo) => {
      if (!repuestos.findByCodigo(codigo)) throw new Error(`El repuesto ${codigo} no existe`);
      return true;
    }),

  body('repuestos.*.cantidad').if(body('repuestos').isArray())
    .isInt({ min: 1, max: 20 }).withMessage('La cantidad debe ser un entero entre 1 y 20').bail()
    .toInt()
    .custom((cantidad, { req, path }) => {
      const i = Number(path.match(/\[(\d+)\]/)[1]); // path = "repuestos[0].cantidad"
      const repuesto = repuestos.findByCodigo(req.body.repuestos[i].codigo);
      if (repuesto && cantidad > repuesto.stock) {
        throw new Error(`Stock insuficiente de ${repuesto.codigo} (disponible: ${repuesto.stock})`);
      }
      return true;
    }),
];

module.exports = { reglasOrden };
