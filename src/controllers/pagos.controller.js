const { matchedData } = require('express-validator');
const service = require('../services/pagos.service');

exports.listar = (req, res) => res.json(service.listar(matchedData(req, { locations: ['query'] }).ordenId));
exports.crear = (req, res) => res.status(201).json(service.crear(matchedData(req, { locations: ['body'] })));
