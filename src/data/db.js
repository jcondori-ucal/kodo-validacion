// "Base de datos" en memoria. reset() la deja como el seed (útil para pruebas y para repetir la demo).
const seed = require('./seed');
const state = {};

function reset() {
  const copia = JSON.parse(JSON.stringify(seed));
  Object.keys(copia).forEach((tabla) => { state[tabla] = copia[tabla]; });
}
const nextId = (tabla) => state[tabla].reduce((max, fila) => Math.max(max, fila.id), 0) + 1;

reset();
module.exports = { state, reset, nextId };
