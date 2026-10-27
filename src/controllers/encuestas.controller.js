const { matchedData } = require('express-validator');
const service = require('../services/encuestas.service');

exports.crear = (req, res) => res.status(201).json(service.crear(matchedData(req, { locations: ['body'] })));
