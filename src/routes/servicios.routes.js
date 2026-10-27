const router = require('express').Router();
const ctrl = require('../controllers/servicios.controller');
const { consultaServicios, reglasServicio } = require('../validators/servicios.validator');
const validar = require('../validators/validar');

router.get('/', consultaServicios, validar, ctrl.listar);
router.post('/', reglasServicio, validar, ctrl.crear);

module.exports = router;
