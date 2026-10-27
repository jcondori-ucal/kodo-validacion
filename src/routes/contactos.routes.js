const router = require('express').Router();
const ctrl = require('../controllers/contactos.controller');
const { idParam } = require('../validators/common');
const { reglasContacto } = require('../validators/contactos.validator');
const validar = require('../validators/validar');

router.get('/', ctrl.listar);
router.get('/:id', idParam(), validar, ctrl.obtener);
router.post('/', reglasContacto(), validar, ctrl.crear);
router.put('/:id', idParam(), reglasContacto(), validar, ctrl.reemplazar);        // reemplazo total: todo obligatorio
router.patch('/:id', idParam(), reglasContacto(true), validar, ctrl.actualizar); // parcial: solo lo que llegue
router.delete('/:id', idParam(), validar, ctrl.eliminar);

module.exports = router;
