const router = require('express').Router();
const ctrl = require('../controllers/encuestas.controller');
const { reglasEncuesta } = require('../validators/encuestas.validator');
const validar = require('../validators/validar');

router.post('/', reglasEncuesta, validar, ctrl.crear);

module.exports = router;
