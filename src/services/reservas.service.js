const repo = require('../repositories/reservas.repository');

const listar = () => repo.findAll();

// El estado NO lo decide el cliente: toda reserva nueva nace "pendiente".
const crear = (datos) => repo.create({ observacion: null, ...datos, estado: 'pendiente' });

module.exports = { listar, crear };
