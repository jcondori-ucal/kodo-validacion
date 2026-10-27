const router = require('express').Router();
const ctrl = require('../controllers/vehiculos.controller');
const { idParam } = require('../validators/common');
const { reglasVehiculo } = require('../validators/vehiculos.validator');
const validar = require('../validators/validar');

router.get('/', ctrl.listar);
router.get('/:id', idParam(), validar, ctrl.obtener);
router.post('/', reglasVehiculo(), validar, ctrl.crear);
router.put('/:id', idParam(), reglasVehiculo(), validar, ctrl.reemplazar); // las mismas reglas del POST

module.exports = router;
