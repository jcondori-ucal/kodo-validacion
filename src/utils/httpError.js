// Error con código HTTP. Lo usan los servicios (404, 409) y lo traduce middlewares/errores.js.
class HttpError extends Error {
  constructor(status, mensaje) {
    super(mensaje);
    this.status = status;
  }
}
module.exports = HttpError;
