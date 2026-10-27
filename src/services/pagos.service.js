const repo = require('../repositories/pagos.repository');
const HttpError = require('../utils/httpError');

const listar = (ordenId) => repo.findAll((p) => ordenId === undefined || p.ordenId === ordenId);

const crear = (datos) => {
  if (datos.codigoOperacion && repo.findByCodigoOperacion(datos.codigoOperacion)) {
    throw new HttpError(409, 'Ese código de operación ya fue registrado');
  }
  return repo.create({ codigoOperacion: null, ...datos, estado: 'aprobado' });
};

module.exports = { listar, crear };
