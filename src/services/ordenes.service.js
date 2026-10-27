const repo = require('../repositories/ordenes.repository');
const servicios = require('../repositories/servicios.repository');
const repuestos = require('../repositories/repuestos.repository');
const HttpError = require('../utils/httpError');

const listar = () => repo.findAll();

const obtener = (id) => {
  const orden = repo.findById(id);
  if (!orden) throw new HttpError(404, 'Orden no encontrada');
  return orden;
};

const crear = (datos) => {
  const servicio = servicios.findById(datos.servicioId);
  const lista = datos.repuestos || [];
  // Descuenta el stock de cada repuesto usado.
  lista.forEach(({ codigo, cantidad }) => {
    const repuesto = repuestos.findByCodigo(codigo);
    repuestos.update(repuesto.id, { stock: repuesto.stock - cantidad });
  });
  return repo.create({
    diagnostico: null,
    ...datos,
    costo: datos.costo !== undefined ? datos.costo : servicio.precio,
    repuestos: lista,
    estado: 'recibido',
  });
};

module.exports = { listar, obtener, crear };
