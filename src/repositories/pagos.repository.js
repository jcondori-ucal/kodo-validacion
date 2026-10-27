const base = require('./base.repository')('pagos');
module.exports = {
  ...base,
  findByCodigoOperacion: (cod) => base.findAll((p) => p.codigoOperacion === cod)[0] || null,
  totalAprobado: (ordenId) => base.findAll((p) => p.ordenId === ordenId && p.estado === 'aprobado').reduce((s, p) => s + p.monto, 0),
};
