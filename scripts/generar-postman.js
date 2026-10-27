// Genera postman/kodo-validacion.postman_collection.json y CASOS.md a partir de casos/.
const fs = require('fs');
const path = require('path');
const casos = require('../casos');
const { fechas } = require('../casos/fechas');

const raiz = path.join(__dirname, '..');
const grupos = [...new Set(casos.map((c) => c.grupo))];
const f = fechas();

const item = (c) => {
  const req = {
    method: c.metodo,
    header: [],
    url: { raw: `{{baseUrl}}${c.ruta}`, host: ['{{baseUrl}}'], path: c.ruta.split('?')[0].split('/').filter(Boolean), query: [] },
  };
  const q = c.ruta.split('?')[1];
  if (q) req.url.query = q.split('&').map((p) => ({ key: p.split('=')[0], value: p.split('=')[1] }));
  if (c.raw !== undefined) {
    req.header.push({ key: 'Content-Type', value: c.contentType });
    req.body = { mode: 'raw', raw: c.raw };
  } else if (c.body !== undefined) {
    req.header.push({ key: 'Content-Type', value: 'application/json' });
    req.body = { mode: 'raw', raw: JSON.stringify(c.body, null, 2), options: { raw: { language: 'json' } } };
  }
  const test = [`pm.test('${c.id}: status ${c.esperado}', () => pm.response.to.have.status(${c.esperado}));`];
  if (c.campos) test.push(`pm.test('campos con error: ${c.campos.join(', ')}', () => pm.expect(pm.response.json().errores.map(e => e.campo).sort()).to.eql(${JSON.stringify([...c.campos].sort())}));`);
  return {
    name: `${c.id} · ${c.titulo}`,
    event: [{ listen: 'test', script: { type: 'text/javascript', exec: test } }],
    request: req,
  };
};

const coleccion = {
  info: { name: 'Kodo Motors · Validación', schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json' },
  variable: [
    { key: 'baseUrl', value: 'http://localhost:4000' },
    ...Object.entries(f).map(([key, value]) => ({ key, value })),
  ],
  item: [
    { name: '00 · Reiniciar datos', request: { method: 'POST', header: [], url: { raw: '{{baseUrl}}/api/__reset', host: ['{{baseUrl}}'], path: ['api', '__reset'] } } },
    ...grupos.map((g) => ({ name: g, item: casos.filter((c) => c.grupo === g).map(item) })),
  ],
};
fs.writeFileSync(path.join(raiz, 'postman', 'kodo-validacion.postman_collection.json'), JSON.stringify(coleccion, null, 2));

let md = '# Catálogo de casos\n\nGenerado con `npm run docs`. Cada caso se ejecuta automáticamente en `tests/casos.test.js`.\n';
md += '\nLas fechas `{{ayer}}`, `{{lunes}}`, `{{domingo}}` se calculan respecto a hoy.\n';
for (const g of grupos) {
  md += `\n## ${g}\n\n| ID | Caso | Regla que practica | Respuesta | Campos con error |\n|---|---|---|---|---|\n`;
  for (const c of casos.filter((x) => x.grupo === g)) {
    md += `| ${c.id} | ${c.titulo} | ${c.concepto.replace(/\|/g, '\\|')} | ${c.esperado} | ${c.campos ? c.campos.join(', ') : '—'} |\n`;
  }
}
fs.writeFileSync(path.join(raiz, 'CASOS.md'), md);
console.log(`${casos.length} casos → postman/ y CASOS.md`);
