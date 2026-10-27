# Kodo Motors · API de validación

Proyecto de referencia sobre **validación de datos de entrada con express-validator**.
Cada regla tiene un caso ejecutable: **110 casos** sobre contactos, vehículos, servicios, reservas, órdenes, pagos, encuestas y promociones.

## Cómo correrlo

```bash
npm install
cp .env.example .env     # PORT=4000
npm run dev              # o npm start
npm test                 # ejecuta los 110 casos contra la API
npm run docs             # regenera CASOS.md y la colección de Postman
```

Datos de ejemplo: sedes, servicios, contactos, vehículos y órdenes salen de `src/data/seed.js` (copia del `02_seed.sql` de Kodo).
Para reiniciarlos mientras pruebas: `POST /api/__reset` (solo fuera de producción).

## Estructura

```
src/
  routes/        # rutas + cadena de validación + validar + controlador
  validators/    # reglas por recurso (express-validator)
    validar.js   # middleware que responde 400 con { mensaje, errores:[{campo,mensaje}] }
    common.js    # reglas reutilizables: idParam, existeEn, fechaISO...
  controllers/   # usan matchedData(req): solo llegan campos validados
  services/      # reglas de negocio (409 por duplicados, 404 si no existe)
  repositories/  # datos en memoria; se cambian por MySQL sin tocar el resto
casos/           # catálogo de casos (id, body, status esperado, campos con error)
tests/           # Jest + Supertest: recorre casos/
postman/         # colección generada desde casos/
```

## Cómo leer los códigos de respuesta

| Código | Cuándo |
|---|---|
| 400 | El dato llegó mal formado o rompe una regla (lo detecta el validador) |
| 404 | El formato es correcto, pero el recurso no existe |
| 409 | El dato es válido pero choca con uno existente (placa, teléfono, código repetido) |

Los 409 se tratan con más detalle en el manejo centralizado de errores (`src/middlewares/errores.js`).

## Cómo usar los casos

1. Elegir un caso de `CASOS.md` y **predecir** la respuesta antes de enviarlo.
2. Enviarlo desde Postman (carpeta por recurso) o con `npm test -- -t C05`.
3. Abrir el validador del recurso y señalar la regla que lo atrapó.
4. Quitar la regla, volver a ejecutar y ver cómo el dato inválido pasa.

## Notas

- Las fechas de los casos son relativas a hoy (`{{ayer}}`, `{{lunes}}`, `{{domingo}}`).
- En Postman, ejecutar primero `00 · Reiniciar datos` y luego la carpeta completa con el Runner.
- Los repositorios en memoria vuelven a los datos semilla al reiniciar el servidor.
