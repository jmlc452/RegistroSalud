const { Router } = require('express');
const { check } = require('express-validator');
const { validar } = require('../middleware/validate-camp');
const {tieneRol} = require('../middleware/validate-rol');
const { validateJWT } = require('../middleware/validate-jwt');
const { idConsultaExist, esDoctor, idHistoriasExist } = require('../helpers/db-validators');
const { obtenerHistorias, obtenerHistoria, crearHistorias, actualizarHistorias, borrarHistorias, generarPDF } = require('../controllers/historias');
//const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');

const router = Router();

router.get('/',obtenerHistorias);

router.get('/:id',[
    check('id', 'no es un id valido').isMongoId(),
    check('id').custom(idHistoriasExist),
    validar
],obtenerHistoria);

router.get('/pdf/:id',generarPDF)

router.post('/',[
    validateJWT,  
    check('motivoConsulta.descripcion','Describa el motivo de la consulta').notEmpty(),
    check('diagnostico.principal','Describa el motivo de la consulta').notEmpty(),
    check('doctor','el doctor es obligatoria').notEmpty(),
    check('doctor').isMongoId(),
    check('doctor').custom(esDoctor),//valida si es doctor
    check('paciente','el paciente es obligatoria').notEmpty(),
    check('paciente').isMongoId(),
    // check('descripcion','la descripcion es obligatoria').notEmpty(),
    validar
],crearHistorias);

router.put('/:id',[
    validateJWT,
    check('id', 'no es un id valido').isMongoId(),
    check('id').custom(idHistoriasExist),
    check('historia','el motivo es obligatorio').notEmpty(),
    check('doctor','el doctor es obligatoria').notEmpty(),
    check('doctor').isMongoId(),
    validar
],actualizarHistorias);

router.delete('/:id',[
    validateJWT,
    //validaRolAdmin,
    tieneRol('ADMIN_ROL'),
    check('id', 'no es un id valido').isMongoId(),
    check('id').custom(idConsultaExist),
    validar
],borrarHistorias);

module.exports = router;