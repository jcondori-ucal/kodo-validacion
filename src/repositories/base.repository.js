// Repositorio genérico en memoria. Devuelve copias para que nadie modifique la "tabla" sin querer.
const db = require('../data/db');

module.exports = (tabla) => ({
  findAll: (filtro = () => true) => db.state[tabla].filter(filtro).map((fila) => ({ ...fila })),
  findById: (id) => {
    const fila = db.state[tabla].find((f) => f.id === id);
    return fila ? { ...fila } : null;
  },
  create: (datos) => {
    const fila = { id: db.nextId(tabla), ...datos };
    db.state[tabla].push(fila);
    return { ...fila };
  },
  update: (id, datos) => {
    const fila = db.state[tabla].find((f) => f.id === id);
    if (!fila) return null;
    Object.assign(fila, datos);
    return { ...fila };
  },
  remove: (id) => {
    const i = db.state[tabla].findIndex((f) => f.id === id);
    if (i === -1) return false;
    db.state[tabla].splice(i, 1);
    return true;
  },
});
