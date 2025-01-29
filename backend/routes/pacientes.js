const { Router } = require('express');
const { check } = require('express-validator');
const { validar } = require('../middleware/validate-camp');
const {tieneRol} = require('../middleware/validate-rol');
const { validateJWT } = require('../middleware/validate-jwt');
//const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { obtenerPacientes, obtenerPaciente, crearPaciente, actualizarPaciente, borrarPaciente, generarPDF } = require('../controllers/pacientes');
const { idPacienteExist, emailExist, emailPacienteExist, cedulaPacienteExist } = require('../helpers/db-validators');
const { borrarCategoria } = require('../controllers/categorias');

const router = Router();

router.get('/',obtenerPacientes);

router.get('/:id',[
    check('id', 'no es un id valido').isMongoId(),
    check('id').custom(idPacienteExist),
    validar
],obtenerPaciente);

router.get('/pdf/:id',generarPDF)

router.post('/',[
    validateJWT,
    check('nombreCompleto.nombre','el nombre es obligatorio').notEmpty(),
    check('nombreCompleto.apellido','el apellido es obligatorio').notEmpty(),
    check('cedula','la cedula es obligatorio').notEmpty(),
    check('cedula','la cedula debe ser unica').custom(cedulaPacienteExist),
    check('cedula','la cedula deben ser solo numero').isNumeric(),
    check('contacto.telefono.movil','el movil es obligatorio').notEmpty(),
    check('contacto.telefono.movil','el movil deben ser solo numero').isNumeric(),
    validar
],crearPaciente);

router.put('/:id',[
    validateJWT,
    check('id', 'no es un id valido').isMongoId(),
    check('id').custom(idPacienteExist),
    check('nombreCompleto.nombre','el nombre es obligatorio').notEmpty(),
    check('nombreCompleto.apellido','el apellido es obligatorio').notEmpty(),
    check('cedula','la cedula es obligatorio').notEmpty(),
    check('cedula','la cedula deben ser solo numero').isNumeric(),
    check('contacto.telefono.movil','el movil es obligatorio').notEmpty(),
    check('contacto.telefono.movil','el movil deben ser solo numero').isNumeric(),
    validar
],actualizarPaciente);

router.delete('/:id',[
    validateJWT,
    //validaRolAdmin,
    // tieneRol('ADMIN_ROL'),
    check('id', 'no es un id valido').isMongoId(),
    check('id').custom(idPacienteExist),
    validar
],borrarPaciente);

module.exports = router;