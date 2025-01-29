const { Router } = require('express');
const { check } = require('express-validator');
const { validar } = require('../middleware/validate-camp');
const {tieneRol} = require('../middleware/validate-rol');
const { validateJWT } = require('../middleware/validate-jwt');
const { obtenerConsulta, crearConsultas, obtenerConsultas, actualizarConsultas, borrarConsultas, generarPDF } = require('../controllers/consultas');
const { idConsultaExist, esDoctor } = require('../helpers/db-validators');
const consultas = require('../models/consultas');
//const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');

const router = Router();

router.get('/',obtenerConsultas);

router.get('/:id',[
    check('id', 'no es un id valido').isMongoId(),
    // check('id').custom(idConsultaExist),
    validar
],obtenerConsulta);

router.get('/pdf/:id',generarPDF)

router.post('/',[
    validateJWT,
    // check('motivo','el motivo es obligatorio').notEmpty(),
    // check('fechaAsistencia','la fecha de asistencia es obligatorio').notEmpty(),
    // check('fechaAsistencia').isDate(),
    // check('doctor','el doctor es obligatoria').notEmpty(),
    // check('doctor').isMongoId(),
    // check('doctor').custom(esDoctor),//valida si es doctor
    // check('paciente','el paciente es obligatoria').notEmpty(),
    // check('paciente').isMongoId(),
    // // check('descripcion','la descripcion es obligatoria').notEmpty(),
    // validar
],crearConsultas);

router.put('/:id',[
    validateJWT,
    check('id', 'no es un id valido').isMongoId(),
    check('id').custom(idConsultaExist),
    check('motivo','el motivo es obligatorio').notEmpty(),
    check('doctor','el doctor es obligatoria').notEmpty(),
    check('doctor').isMongoId(),
    check('fechaAsistencia','la fecha de asistencia es obligatorio').notEmpty(),
    check('fechaAsistencia').isDate(),
    validar
],actualizarConsultas);

router.delete('/:id',[
    validateJWT,
    //validaRolAdmin,
    tieneRol('ADMIN_ROL'),
    check('id', 'no es un id valido').isMongoId(),
    check('id').custom(idConsultaExist),
    validar
],borrarConsultas);

module.exports = router;