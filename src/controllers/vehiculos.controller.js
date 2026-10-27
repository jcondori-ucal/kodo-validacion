const { matchedData } = require('express-validator');
const service = require('../services/vehiculos.service');

const datos = (req) => matchedData(req, { locations: ['body'] });
const idDe = (req) => matchedData(req, { locations: ['params'] }).id;

exports.listar = (req, res) => res.json(service.listar());
exports.obtener = (req, res) => res.json(service.obtener(idDe(req)));
exports.crear = (req, res) => res.status(201).json(service.crear(datos(req)));
exports.reemplazar = (req, res) => res.json(service.reemplazar(idDe(req), datos(req)));
