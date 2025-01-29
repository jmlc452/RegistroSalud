const {obtenerEspecialidades} = require("../controllers/especialidades.js");
const {Router} = require("express");

const router = Router();

router.get('/',obtenerEspecialidades);

module.exports = router; 
