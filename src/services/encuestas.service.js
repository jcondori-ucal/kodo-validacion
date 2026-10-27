const repo = require('../repositories/encuestas.repository');
const HttpError = require('../utils/httpError');

const crear = (datos) => {
  if (repo.findByOrden(datos.ordenId)) throw new HttpError(409, 'Esta orden ya tiene una encuesta');
  return repo.create({ comentario: null, ...datos });
};

module.exports = { crear };
