const {Router} = require('express');
const { buscar, buscarEnVariosCampos } = require('../controllers/buscar');

const router = Router();

router.get('/',buscarEnVariosCampos)

module.exports = router;