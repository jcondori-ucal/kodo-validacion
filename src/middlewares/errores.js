// Manejo centralizado de errores.
// Cubre 404 (ruta inexistente), 409 (duplicado) y JSON mal formado.
const notFound = (req, res) => {
  res.status(404).json({ mensaje: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
};

// eslint-disable-next-line no-unused-vars
const manejarErrores = (err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ mensaje: 'El cuerpo no es un JSON válido', detalle: 'Revisa comillas, comas finales y llaves.' });
  }
  if (err.status) return res.status(err.status).json({ mensaje: err.message });
  console.error(err);
  return res.status(500).json({ mensaje: 'Error interno del servidor' });
};

module.exports = { notFound, manejarErrores };
