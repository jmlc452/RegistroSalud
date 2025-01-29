const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validar } = require('../middleware/validate-camp');


const router = Router();

router.post('/login',[
    check('email','el email es obligatorio').isEmail(),
    check('password','la contraseña es obligatoria').notEmpty(),
    validar
],login);

module.exports = router;