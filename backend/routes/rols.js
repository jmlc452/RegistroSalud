//librerias
const { Router } = require('express');
const { check } = require('express-validator');

//middlewares
const { validateJWT } = require('../middleware/validate-jwt');
const { validaRolAdmin,tieneRol } = require('../middleware/validate-rol');
const { validar } = require('../middleware/validate-camp');

//controllers
const { userGet, userPost, userPut, userDelete } = require('../controllers/user');

//helpers
const { rolGet } = require('../controllers/rols');


const router = Router();

router.get('/', rolGet);

module.exports = router