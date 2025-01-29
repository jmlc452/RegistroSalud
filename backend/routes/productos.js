const { Router } = require('express');
const { check } = require('express-validator');
const { validar } = require('../middleware/validate-camp');
const {tieneRol} = require('../middleware/validate-rol');
const { validateJWT } = require('../middleware/validate-jwt');
//const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { idExist } = require('../helpers/db-validators');
const { obtenerProducto, obtenerProductos, crearProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');
const productos = require('../models/productos');

const router = Router();

router.get('/',obtenerProductos);

router.get('/:id',[
    check('id', 'no es un id valido').isMongoId(),
    check('id').custom(idExist(productos)),
    validar
],obtenerProducto);

router.post('/',[
    validateJWT,
    check('name','el nombre es obligatorio').notEmpty(),
    check('categoria','la categoria es obligatoria').notEmpty(),
    check('categoria').custom(idCategoriaExist),
    check('precio','el precio es obligatorio').isNumeric().notEmpty(),
    // check('descripcion','la descripcion es obligatoria').notEmpty(),
    validar
],crearProducto);

router.put('/:id',[
    validateJWT,
    check('id', 'no es un id valido').isMongoId(),
    check('id').custom(idProductoExist),
    check('name','el nombre es obligatorio').notEmpty(),
    check('categoria','la categoria es obligatoria').notEmpty(),
    check('categoria').custom(idCategoriaExist),
    check('precio','el precio es obligatorio').isNumeric().notEmpty(),
    check('descripcion','la descripcion es obligatoria').notEmpty(),
    validar
],actualizarProducto);

router.delete('/:id',[
    validateJWT,
    //validaRolAdmin,
    tieneRol('ADMIN_ROL'),
    check('id', 'no es un id valido').isMongoId(),
    check('id').custom(idProductoExist),
    validar
],borrarProducto);

module.exports = router;