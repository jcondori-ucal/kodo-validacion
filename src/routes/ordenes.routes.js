const router = require('express').Router();
const ctrl = require('../controllers/ordenes.controller');
const { idParam } = require('../validators/common');
const { reglasOrden } = require('../validators/ordenes.validator');
const validar = require('../validators/validar');

router.get('/', ctrl.listar);
router.get('/:id', idParam(), validar, ctrl.obtener);
router.post('/', reglasOrden, validar, ctrl.crear);

module.exports = router;
