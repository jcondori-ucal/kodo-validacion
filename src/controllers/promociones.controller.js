const { matchedData } = require('express-validator');
const service = require('../services/promociones.service');

exports.listar = (req, res) => res.json(service.listar());
exports.crear = (req, res) => res.status(201).json(service.crear(matchedData(req, { locations: ['body'] })));
