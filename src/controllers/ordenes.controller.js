const { matchedData } = require('express-validator');
const service = require('../services/ordenes.service');

exports.listar = (req, res) => res.json(service.listar());
exports.obtener = (req, res) => res.json(service.obtener(matchedData(req, { locations: ['params'] }).id));
exports.crear = (req, res) => res.status(201).json(service.crear(matchedData(req, { locations: ['body'] })));
