const router = require('express').Router();
const { query } = require('express-validator');
const ctrl = require('../controllers/pagos.controller');
const { reglasPago } = require('../validators/pagos.validator');
const validar = require('../validators/validar');

router.get('/', query('ordenId').optional().isInt({ min: 1 }).withMessage('ordenId debe ser un entero positivo').toInt(), validar, ctrl.listar);
router.post('/', reglasPago, validar, ctrl.crear);

module.exports = router;
