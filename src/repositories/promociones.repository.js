const base = require('./base.repository')('promociones');
module.exports = { ...base, findByCodigo: (codigo) => base.findAll((p) => p.codigo === codigo)[0] || null };
