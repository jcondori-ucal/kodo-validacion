const router = require('express').Router();
const ctrl = require('../controllers/reservas.controller');
const { reglasReserva } = require('../validators/reservas.validator');
const validar = require('../validators/validar');

router.get('/', ctrl.listar);
router.post('/', reglasReserva, validar, ctrl.crear);

module.exports = router;
