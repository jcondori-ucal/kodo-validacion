const repo = require('../repositories/contactos.repository');
const HttpError = require('../utils/httpError');

const DEFECTO = { email: null, aceptaWhatsapp: true };

const listar = () => repo.findAll();

const obtener = (id) => {
  const contacto = repo.findById(id);
  if (!contacto) throw new HttpError(404, 'Contacto no encontrado');
  return contacto;
};

// El teléfono es único (UNIQUE en la tabla): duplicado = 409 Conflict, no 400.
const asegurarTelefonoLibre = (telefono, idActual) => {
  const otro = repo.findByTelefono(telefono);
  if (otro && otro.id !== idActual) throw new HttpError(409, 'Ya existe un contacto con ese teléfono');
};

const crear = (datos) => {
  asegurarTelefonoLibre(datos.telefono);
  return repo.create({ ...DEFECTO, ...datos });
};

const reemplazar = (id, datos) => {
  obtener(id);
  asegurarTelefonoLibre(datos.telefono, id);
  return repo.update(id, { ...DEFECTO, ...datos });
};

const actualizar = (id, datos) => {
  obtener(id);
  if (datos.telefono) asegurarTelefonoLibre(datos.telefono, id);
  return repo.update(id, datos);
};

const eliminar = (id) => {
  obtener(id);
  repo.remove(id);
};

module.exports = { listar, obtener, crear, reemplazar, actualizar, eliminar };
