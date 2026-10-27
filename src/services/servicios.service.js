const repo = require('../repositories/servicios.repository');

// Los valores por defecto de la paginación viven en el servicio, no en el validador.
const listar = ({ categoria, precioMax, page = 1, limit = 10 }) => {
  const { total, data } = repo.buscar({ categoria, precioMax, page, limit });
  return { page, limit, total, data };
};

const crear = (datos) => repo.create({ descripcion: null, ...datos });

module.exports = { listar, crear };
