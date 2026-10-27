const express = require('express');
const db = require('./data/db');
const { notFound, manejarErrores } = require('./middlewares/errores');

function crearApp() {
  const app = express();
  app.use(express.json()); // si el JSON viene mal formado, falla aquí (antes de las reglas)

  app.get('/api/health', (req, res) => res.json({ estado: 'ok', servicio: 'kodo-validacion' }));

  // Solo para la demo: deja los datos como el seed. Así los casos de Postman se pueden repetir.
  if (process.env.NODE_ENV !== 'production') {
    app.post('/api/__reset', (req, res) => {
      db.reset();
      res.json({ mensaje: 'Datos reiniciados' });
    });
  }

  app.use('/api/contactos', require('./routes/contactos.routes'));
  app.use('/api/vehiculos', require('./routes/vehiculos.routes'));
  app.use('/api/servicios', require('./routes/servicios.routes'));
  app.use('/api/reservas', require('./routes/reservas.routes'));
  app.use('/api/ordenes', require('./routes/ordenes.routes'));
  app.use('/api/pagos', require('./routes/pagos.routes'));
  app.use('/api/encuestas', require('./routes/encuestas.routes'));
  app.use('/api/promociones', require('./routes/promociones.routes'));

  app.use(notFound);
  app.use(manejarErrores);
  return app;
}

module.exports = crearApp;
