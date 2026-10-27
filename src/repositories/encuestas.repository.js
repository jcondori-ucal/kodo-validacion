const base = require('./base.repository')('encuestas');
module.exports = { ...base, findByOrden: (ordenId) => base.findAll((e) => e.ordenId === ordenId)[0] || null };
