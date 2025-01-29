const { Router } = require('express');
const { check } = require('express-validator');
const { validar } = require('../middleware/validate-camp');
const {tieneRol} = require('../middleware/validate-rol');
const { validateJWT } = require('../middleware/validate-jwt');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { idCategoriaExist } = require('../helpers/db-validators');

const router = Router();

router.get('/',obtenerCategorias);

router.get('/:id',[
    check('id', 'no es un id valido').isMongoId(),
    check('id').custom(idCategoriaExist),
    validar
],obtenerCategoria);

router.post('/',[
    validateJWT,
    check('name','el nombre es obligatorio').notEmpty(),
    validar
],crearCategoria);

router.put('/:id',[
    validateJWT,
    check('id', 'no es un id valido').isMongoId(),
    check('id').custom(idCategoriaExist),
    check('name','el nombre es obligatorio').notEmpty(),
    validar
],actualizarCategoria);

router.delete('/:id',[
    validateJWT,
    //validaRolAdmin,
    tieneRol('ADMIN_ROL','VENTAS_ROL'),
    check('id', 'no es un id valido').isMongoId(),
    check('id').custom(idCategoriaExist),
    validar
],borrarCategoria);

module.exports = router;