const base = require('./base.repository')('servicios');

// Filtra y pagina. En MySQL sería WHERE categoria = ? AND precio <= ? LIMIT ? OFFSET ?
function buscar({ categoria, precioMax, page, limit }) {
  const todos = base.findAll((s) => (!categoria || s.categoria === categoria) && (precioMax === undefined || s.precio <= precioMax));
  const desde = (page - 1) * limit;
  return { total: todos.length, data: todos.slice(desde, desde + limit) };
}
module.exports = { ...base, buscar };
