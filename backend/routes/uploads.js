//librerias
const { Router } = require('express');
const { check } = require('express-validator');

//middlewares
const { validateJWT } = require('../middleware/validate-jwt');
const { validaRolAdmin,tieneRol } = require('../middleware/validate-rol');
const { validar } = require('../middleware/validate-camp');

//Routers
const { cargarArchivo, actualizarImagen, mostrarImagen, mostrarImagenById } = require('../controllers/uploads');

//helpers
const { validaRol, emailExist, idExist, coleccionesPermitidas } = require('../helpers/db-validators');
const { validarArchivoSubir } = require('../middleware/validar-archivo');


const router = Router();

router.post('/',validarArchivoSubir , cargarArchivo);

router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id','El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom(c =>  coleccionesPermitidas(c, ['users','pacientes', 'historias'])),
    validar
],actualizarImagen)

router.get('/:coleccion/:id',[
    check('id','El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom(c =>  coleccionesPermitidas(c, ['users','pacientes', 'historias'])),
    validar
], mostrarImagen)

router.get('/:coleccion/:id/:idImg',[
    check('id','El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom(c =>  coleccionesPermitidas(c, ['users','pacientes', 'historias'])),
    validar
], mostrarImagenById)


module.exports = router