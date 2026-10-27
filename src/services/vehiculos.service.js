const repo = require('../repositories/vehiculos.repository');
const HttpError = require('../utils/httpError');

const DEFECTO = { color: null, kilometraje: 0 };

const listar = () => repo.findAll();

const obtener = (id) => {
  const vehiculo = repo.findById(id);
  if (!vehiculo) throw new HttpError(404, 'Vehículo no encontrado');
  return vehiculo;
};

const asegurarPlacaLibre = (placa, idActual) => {
  const otro = repo.findByPlaca(placa);
  if (otro && otro.id !== idActual) throw new HttpError(409, 'Ya existe un vehículo con esa placa');
};

const crear = (datos) => {
  asegurarPlacaLibre(datos.placa);
  return repo.create({ ...DEFECTO, ...datos });
};

const reemplazar = (id, datos) => {
  obtener(id);
  asegurarPlacaLibre(datos.placa, id);
  return repo.update(id, { ...DEFECTO, ...datos });
};

module.exports = { listar, obtener, crear, reemplazar };
