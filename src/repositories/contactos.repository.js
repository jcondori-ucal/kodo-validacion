const base = require('./base.repository')('contactos');
module.exports = { ...base, findByTelefono: (tel) => base.findAll((c) => c.telefono === tel)[0] || null };
