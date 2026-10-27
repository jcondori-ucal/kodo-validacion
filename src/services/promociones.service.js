const repo = require('../repositories/promociones.repository');
const HttpError = require('../utils/httpError');

const listar = () => repo.findAll();

const crear = (datos) => {
  if (repo.findByCodigo(datos.codigo)) throw new HttpError(409, 'Ya existe una promoción con ese código');
  return repo.create({ servicioId: null, activa: true, ...datos });
};

module.exports = { listar, crear };
