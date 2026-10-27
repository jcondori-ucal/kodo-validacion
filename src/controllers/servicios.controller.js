const { matchedData } = require('express-validator');
const service = require('../services/servicios.service');

exports.listar = (req, res) => res.json(service.listar(matchedData(req, { locations: ['query'] })));
exports.crear = (req, res) => res.status(201).json(service.crear(matchedData(req, { locations: ['body'] })));
