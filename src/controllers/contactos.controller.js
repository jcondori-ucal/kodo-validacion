const { matchedData } = require('express-validator');
const service = require('../services/contactos.service');

// matchedData devuelve SOLO los campos que tienen regla: ignora id, rol, estado... que el cliente intente colar.
const datos = (req) => matchedData(req, { locations: ['body'] });
const idDe = (req) => matchedData(req, { locations: ['params'] }).id;

exports.listar = (req, res) => res.json(service.listar());
exports.obtener = (req, res) => res.json(service.obtener(idDe(req)));
exports.crear = (req, res) => res.status(201).json(service.crear(datos(req)));
exports.reemplazar = (req, res) => res.json(service.reemplazar(idDe(req), datos(req)));
exports.actualizar = (req, res) => res.json(service.actualizar(idDe(req), datos(req)));
exports.eliminar = (req, res) => {
  service.eliminar(idDe(req));
  res.status(204).send();
};
