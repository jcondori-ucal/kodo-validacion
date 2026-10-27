const base = require('./base.repository')('repuestos');
module.exports = { ...base, findByCodigo: (codigo) => base.findAll((r) => r.codigo === codigo)[0] || null };
