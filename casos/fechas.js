// Fechas relativas a "hoy" para que los casos nunca caduquen. En Postman se llaman igual: {{ayer}}, {{manana}}, {{lunes}}, {{domingo}}.
const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const desdeHoy = (dias) => { const d = new Date(); d.setDate(d.getDate() + dias); return d; };
const proximo = (diaSemana) => { // 0 = domingo ... 1 = lunes; siempre posterior a hoy
  const d = new Date();
  do { d.setDate(d.getDate() + 1); } while (d.getDay() !== diaSemana);
  return d;
};

const fechas = () => ({ ayer: iso(desdeHoy(-1)), manana: iso(desdeHoy(1)), lunes: iso(proximo(1)), domingo: iso(proximo(0)) });

// Reemplaza {{ayer}}, {{lunes}}... dentro de cualquier objeto/lista/texto.
const resolver = (valor) => {
  const f = fechas();
  const rec = (v) => {
    if (typeof v === 'string') return v.replace(/\{\{(\w+)\}\}/g, (m, k) => (f[k] !== undefined ? f[k] : m));
    if (Array.isArray(v)) return v.map(rec);
    if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, rec(x)]));
    return v;
  };
  return rec(valor);
};

module.exports = { fechas, resolver };
