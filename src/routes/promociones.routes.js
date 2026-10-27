const router = require('express').Router();
const ctrl = require('../controllers/promociones.controller');
const { reglasPromocion } = require('../validators/promociones.validator');
const validar = require('../validators/validar');

router.get('/', ctrl.listar);
router.post('/', reglasPromocion, validar, ctrl.crear);

module.exports = router;
