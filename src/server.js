const crearApp = require('./app');
const { PORT } = require('./config');

crearApp().listen(PORT, () => {
  console.log(`Kodo API (validación) escuchando en http://localhost:${PORT}`);
});
