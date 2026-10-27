const base = require('./base.repository')('vehiculos');
module.exports = { ...base, findByPlaca: (placa) => base.findAll((v) => v.placa === placa)[0] || null };
