# Catálogo de casos

Generado con `npm run docs`. Cada caso se ejecuta automáticamente en `tests/casos.test.js`.

Las fechas `{{ayer}}`, `{{lunes}}`, `{{domingo}}` se calculan respecto a hoy.

## Contactos

| ID | Caso | Regla que practica | Respuesta | Campos con error |
|---|---|---|---|---|
| C01 | Registro válido con espacios y correo en mayúsculas | trim() + normalizeEmail() + toBoolean() | 201 | — |
| C02 | Nombre ausente | notEmpty() | 400 | nombre |
| C03 | Nombre solo con espacios | trim() antes de notEmpty() | 400 | nombre |
| C04 | Nombre de una letra | isLength({ min, max }) | 400 | nombre |
| C05 | Teléfono de 8 dígitos | matches(/^9\d{8}$/) | 400 | telefono |
| C06 | Teléfono que no empieza con 9 | matches(/^9\d{8}$/) | 400 | telefono |
| C07 | Correo mal escrito | isEmail() | 400 | email |
| C08 | Correo vacío (es opcional) | optional({ values: "falsy" }) | 201 | — |
| C09 | aceptaWhatsapp con un valor raro | isBoolean() | 400 | aceptaWhatsapp |
| C10 | Cuerpo vacío {} | Varios campos fallan a la vez | 400 | nombre, telefono |
| C11 | Teléfono ya registrado | Duplicado = 409, no 400 | 409 | — |
| C12 | PATCH solo con el correo | optional() en actualización parcial | 200 | — |
| C13 | PATCH con teléfono inválido | optional() valida si el campo llega | 400 | telefono |
| C14 | PUT sin teléfono | PUT reemplaza: todo es obligatorio | 400 | telefono |
| C15 | GET con id "abc" | param("id").isInt() | 400 | id |
| C16 | GET con id que no existe | Válido en formato, inexistente = 404 | 404 | — |
| C17 | DELETE con id 0 | param("id").isInt({ min: 1 }) | 400 | id |

## Cuerpo de la solicitud

| ID | Caso | Regla que practica | Respuesta | Campos con error |
|---|---|---|---|---|
| J01 | JSON mal formado (coma final) | express.json() falla antes de las reglas | 400 | — |
| J02 | Cuerpo enviado como texto, no como JSON | Sin Content-Type JSON, req.body queda vacío | 400 | nombre, telefono |
| J03 | Campos extra: id y rol | matchedData() descarta lo que no tiene regla | 201 | — |
| J04 | Ruta que no existe | 404 para endpoints no definidos | 404 | — |

## Vehículos

| ID | Caso | Regla que practica | Respuesta | Campos con error |
|---|---|---|---|---|
| V01 | Registro válido con placa en minúsculas | trim() + toUpperCase() | 201 | — |
| V02 | Placa sin guion | matches(/^[A-Z0-9]{3}-\d{3}$/i) | 400 | placa |
| V03 | Modelo que Kodo no atiende | isIn([...]) | 400 | modelo |
| V04 | Año enviado como texto "2021" | isInt() + toInt() | 201 | — |
| V05 | Año 1980 | isInt({ min: 1990 }) | 400 | anio |
| V06 | Año con decimales 2021.5 | isInt() rechaza decimales | 400 | anio |
| V07 | Año 2099 | isInt({ max }) con el año actual + 1 | 400 | anio |
| V08 | Kilometraje negativo | isInt({ min: 0 }) | 400 | kilometraje |
| V09 | Kilometraje "mucho" | isInt() sobre texto | 400 | kilometraje |
| V10 | Contacto que no existe | custom() contra el repositorio (llave foránea) | 400 | contactoId |
| V11 | Color con números | matches(/^[\p{L}\s]+$/u) | 400 | color |
| V12 | PUT con id "abc" | param() y body() en la misma ruta | 400 | id |
| V13 | PUT sobre un id que no existe | Datos válidos, recurso inexistente = 404 | 404 | — |
| V14 | PUT válido (mismas reglas que el POST) | Reutilizar reglasVehiculo() en POST y PUT | 200 | — |
| V15 | Placa ya registrada | Duplicado = 409, no 400 | 409 | — |
| V16 | Cuerpo vacío {} | Varios campos fallan a la vez | 400 | placa, modelo, anio, contactoId |

## Servicios

| ID | Caso | Regla que practica | Respuesta | Campos con error |
|---|---|---|---|---|
| S01 | Filtro válido: frenos hasta S/ 300 | query() con optional() + toFloat() | 200 | — |
| S02 | Sin parámetros: valores por defecto | Todo opcional; defaults en el servicio | 200 | — |
| S03 | Categoría que no existe | query("categoria").isIn([...]) | 400 | categoria |
| S04 | precioMax negativo | isFloat({ gt: 0 }) | 400 | precioMax |
| S05 | limit = 500 | isInt({ max: 50 }) protege el servidor | 400 | limit |
| S06 | page = 0 | isInt({ min: 1 }) | 400 | page |
| S07 | page y limit con texto | Dos parámetros inválidos a la vez | 400 | page, limit |
| S08 | Servicio nuevo con precio "85.50" (texto) | isFloat() + isDecimal() + toFloat() | 201 | — |
| S09 | Precio con 3 decimales | isDecimal({ decimal_digits: "0,2" }) | 400 | precio |
| S10 | Duración de 50 minutos | custom() con regla propia (múltiplo de 15) | 400 | duracionMin |
| S11 | Categoría inválida en el cuerpo | body("categoria").isIn([...]) | 400 | categoria |
| S12 | Cuerpo vacío {} | Varios campos fallan a la vez | 400 | nombre, categoria, precio, duracionMin |

## Reservas

| ID | Caso | Regla que practica | Respuesta | Campos con error |
|---|---|---|---|---|
| R01 | Reserva válida; el cliente intenta fijar estado "atendida" | matchedData() + estado decidido por el servidor | 201 | — |
| R02 | Fecha de ayer | custom(): no se reserva en el pasado | 400 | fecha |
| R03 | Fecha 2026-02-30 | isISO8601({ strict: true }) | 400 | fecha |
| R04 | Fecha 25/12/2026 | Formato ISO obligatorio (AAAA-MM-DD) | 400 | fecha |
| R05 | Hora 07:30 (la sede abre a las 08:00) | Regla entre campos: hora vs. horario de la sede | 400 | hora |
| R06 | Hora 18:00 (la sede cierra a las 18:00) | Límite: el cierre no es una hora válida | 400 | hora |
| R07 | Hora 25:00 | matches(HH:mm de 24 horas) | 400 | hora |
| R08 | Domingo en la sede que no atiende domingos | Regla entre campos: fecha vs. atiendeDomingo | 400 | fecha |
| R09 | Domingo en la sede que sí atiende | La misma fecha es válida en otra sede | 201 | — |
| R10 | Sede 99 | custom() de existencia | 400 | sedeId |
| R11 | servicioId "frenos" | isInt() antes de consultar la base | 400 | servicioId |
| R12 | Cuerpo vacío {} | Varios campos fallan a la vez | 400 | sedeId, servicioId, vehiculoId, fecha, hora |
| R13 | Observación con <script> | escape() neutraliza HTML | 201 | — |
| R14 | Observación de 300 caracteres | isLength({ max: 255 }) | 400 | observacion |

## Órdenes

| ID | Caso | Regla que practica | Respuesta | Campos con error |
|---|---|---|---|---|
| O01 | Orden válida con un repuesto | Arreglo de objetos con comodines repuestos.* | 201 | — |
| O02 | Orden sin costo ni repuestos | optional(): campos que pueden no venir | 201 | — |
| O03 | Kilometraje menor al registrado del vehículo | custom() contra otro recurso | 400 | kmIngreso |
| O04 | Técnico con números | matches() de solo letras | 400 | tecnico |
| O05 | Cantidad 0 | isInt({ min: 1 }) en repuestos.*.cantidad | 400 | repuestos[0].cantidad |
| O06 | Código de repuesto "XYZ" | matches() sobre cada elemento | 400 | repuestos[0].codigo |
| O07 | Código con formato correcto pero inexistente | custom() contra el catálogo | 400 | repuestos[0].codigo |
| O08 | Cantidad mayor al stock | Regla de negocio con path del comodín | 400 | repuestos[0].cantidad |
| O09 | Mismo repuesto repetido | custom() sobre el arreglo completo | 400 | repuestos |
| O10 | repuestos enviado como texto | isArray() | 400 | repuestos |
| O11 | Dos errores en dos elementos | Cada elemento reporta su propio error | 400 | repuestos[0].codigo, repuestos[1].cantidad |
| O12 | Costo de la orden con 3 decimales | isDecimal({ decimal_digits: "0,2" }) | 400 | costo |
| O13 | Vehículo 999 | custom() de existencia | 400 | vehiculoId |
| O14 | Cuerpo vacío {} | Varios campos fallan a la vez | 400 | vehiculoId, sedeId, servicioId, tecnico, kmIngreso |

## Pagos

| ID | Caso | Regla que practica | Respuesta | Campos con error |
|---|---|---|---|---|
| P01 | Pago Yape válido | Validación condicional con .if() | 201 | — |
| P02 | Monto mayor al saldo de la orden | custom() calcula saldo = total - pagado | 400 | monto |
| P03 | Monto 0 | isFloat({ gt: 0 }) | 400 | monto |
| P04 | Monto con 3 decimales | isDecimal({ decimal_digits: "0,2" }) | 400 | monto |
| P05 | Yape sin código de operación | Obligatorio solo si metodo es yape/plin/tarjeta | 400 | codigoOperacion |
| P06 | Efectivo con código de operación | En efectivo el código no se acepta | 400 | codigoOperacion |
| P07 | Efectivo sin código | El campo condicional no aplica | 201 | — |
| P08 | Método "bitcoin" | isIn([...]) | 400 | metodo |
| P09 | Código "yape123" | matches() por método de pago | 400 | codigoOperacion |
| P10 | Orden 999 | custom() de existencia | 400 | ordenId |
| P11 | Código de operación ya usado | Duplicado = 409 | 409 | — |
| P12 | Monto "cien" | isFloat() sobre texto | 400 | monto |
| P13 | GET con ?ordenId=abc | query("ordenId").isInt() | 400 | ordenId |
| P14 | GET con ?ordenId=1 | Filtro válido | 200 | — |

## Encuestas

| ID | Caso | Regla que practica | Respuesta | Campos con error |
|---|---|---|---|---|
| E01 | Encuesta válida | checkSchema: reglas como objeto | 201 | — |
| E02 | Puntuación 6 | isInt({ min: 1, max: 5 }) | 400 | puntuacion |
| E03 | Puntuación "cinco" | bail: detiene la cadena en el primer error | 400 | puntuacion |
| E04 | recomendaria ausente | exists() en checkSchema | 400 | recomendaria |
| E05 | recomendaria "si" | isBoolean() acepta true/false, no "si" | 400 | recomendaria |
| E06 | Orden aún no entregada | Regla de estado del recurso | 400 | ordenId |
| E07 | Orden 999 | custom() de existencia | 400 | ordenId |
| E08 | Comentario de 301 caracteres | isLength({ max: 300 }) | 400 | comentario |
| E09 | Orden que ya tiene encuesta | Duplicado = 409 | 409 | — |
| E10 | Cuerpo vacío {} | Varios campos fallan a la vez | 400 | ordenId, puntuacion, recomendaria |

## Promociones

| ID | Caso | Regla que practica | Respuesta | Campos con error |
|---|---|---|---|---|
| PR01 | Promoción válida | Código normalizado con toUpperCase() | 201 | — |
| PR02 | servicioId null = promoción para todos | optional({ values: "null" }) | 201 | — |
| PR03 | fechaFin anterior a fechaInicio | Regla entre campos | 400 | fechaFin |
| PR04 | Descuento 150% | isInt({ min: 1, max: 90 }) | 400 | descuentoPct |
| PR05 | Código "DES-10%" | matches(/^[A-Z0-9]{4,12}$/) | 400 | codigo |
| PR06 | Código "kodo10" ya existe (case-insensitive) | Normalizar antes de comparar; duplicado = 409 | 409 | — |
| PR07 | Servicio 99 | custom() de existencia | 400 | servicioId |
| PR08 | Fecha 01-12-2026 | isISO8601({ strict: true }) | 400 | fechaInicio |
| PR09 | Cuerpo vacío {} | Varios campos fallan a la vez | 400 | codigo, descripcion, descuentoPct, fechaInicio, fechaFin |
