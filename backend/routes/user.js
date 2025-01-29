//librerias
const { Router } = require('express');
const { check } = require('express-validator');

//middlewares
const { validateJWT } = require('../middleware/validate-jwt');
const { validaRolAdmin, tieneRol } = require('../middleware/validate-rol');
const { validar } = require('../middleware/validate-camp');

//controllers
const { userGet, userPost, userPut, userDelete, getDoctores, getDoctoresEsp } = require('../controllers/user');

//helpers
const { validaRol, emailExist, idExist, userNameExist } = require('../helpers/db-validators');


const router = Router();

router.get('/', [
    validateJWT
], userGet);

router.get('/doctores', [
    validateJWT
], getDoctores);

router.get('/doctores/:esp', [
    validateJWT
], getDoctoresEsp);

router.post('/', [
    check('password', 'el password debe de ser mas de 6 letraas').isLength({ mn: 6 }),
    check('email', 'no es un email correcto').isEmail(),
    check('fullname', 'el nombre completo en oligatorio').not().isEmpty(),
    check('email').custom(emailExist),
    //check('rol', 'no es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(validaRol),
    validar
], userPost);

router.put('/', [
    validateJWT,
    // check('id', 'no es un id valido').isMongoId(),
    // check('id').custom(idExist),
    check('fullname', 'el nombre completo en oligatorio').not().isEmpty(),
    check('email').isEmail(),
    check('rol').custom(validaRol),
    validar
], userPut);

router.delete('/:id', [
    validateJWT,
    //validaRolAdmin,
    tieneRol('ADMIN_ROL', 'VENTAS_ROL'),
    check('id', 'no es un id valido').isMongoId(),
    check('id').custom(idExist),
    validar
], userDelete);

module.exports = router