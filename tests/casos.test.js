// Ejecuta TODOS los casos de casos/ contra la API real (sin levantar el servidor).
const request = require('supertest');
const crearApp = require('../src/app');
const db = require('../src/data/db');
const casos = require('../casos');
const { resolver } = require('../casos/fechas');

const app = crearApp();
beforeEach(() => db.reset());

describe('Casos de validación de Kodo Motors', () => {
  test.each(casos.map((c) => [`${c.id} · ${c.titulo}`, c]))('%s', async (_nombre, c) => {
    let req = request(app)[c.metodo.toLowerCase()](resolver(c.ruta));
    if (c.raw !== undefined) req = req.set('Content-Type', c.contentType).send(c.raw);
    else if (c.body !== undefined) req = req.send(resolver(c.body));

    const res = await req;
    expect(res.status).toBe(c.esperado);

    if (c.campos) {
      const campos = (res.body.errores || []).map((e) => e.campo).sort();
      expect(campos).toEqual([...c.campos].sort());
      // Estructura estable de la respuesta 400
      expect(res.body.mensaje).toBe('Datos inválidos');
      res.body.errores.forEach((e) => {
        expect(typeof e.campo).toBe('string');
        expect(typeof e.mensaje).toBe('string');
      });
    }
    if (c.check) {
      // eslint-disable-next-line no-new-func
      expect(new Function('r', `return (${c.check});`)(res.body)).toBe(true);
    }
  });
});
