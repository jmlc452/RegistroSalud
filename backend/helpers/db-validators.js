const categoria = require('../models/categoria');
const consultas = require('../models/consultas');
const historias = require('../models/historias');
const paciente = require('../models/pacientes');
const productos = require('../models/productos');
const Rol = require('../models/rol');
const User = require('../models/user')



const validaRol = async (rol = '') => {
    const existeRol = await Rol.findOne({ rol });
    if (!existeRol) {
        throw new Error(`el rol ${rol} no esta en la BD`)
    }
}

//validar correo existente
const emailExist = async (email = '') => {
    const emailIn = await User.findOne({ email });
    if (emailIn) {
        throw new Error(`el email ${email} ya esta en la BD`)
    }
}

//validar nombre de usuario
const userNameExist = async (username = '') => {
    const userNameIn = await User.findOne({ username });
    if (userNameIn) {
        throw new Error(`el nombre de usuario ${username} ya esta en la BD`)
    }
}

//validar id existente
const idExist = async (coleccion,id = '') => {
    const existeId = await User.findById( id );
    if (!existeId) {
        throw new Error(`el id ${id} no esta en la BD`)
    }
}

//validar id existente
const idCategoriaExist = async (id = '') => {
    const existeId = await categoria.findById( id );
    if (!existeId) {
        throw new Error(`el id ${id} no esta en la BD`)
    }
}

//validar id existente
const idProductoExist = async (id = '') => {
    const existeId = await productos.findById( id );
    if (!existeId) {
        throw new Error(`el id ${id} no esta en la BD`)
    }
}

//validar id existente
const idPacienteExist = async (id = '') => {
    const existeId = await paciente.findById( id );
    if (!existeId) {
        throw new Error(`el id ${id} no esta en la BD`)
    }
}

//validar id existente
const emailPacienteExist = async (email = '') => {
    const existeEmail = await paciente.findOne({ email });
    if (existeEmail) {
        throw new Error(`el email ${existeEmail.email} ya esta registrado`)
    }
}

//validar cedula existente
const cedulaPacienteExist = async (cedula = '') => {
    const existeci = await paciente.findOne({ cedula });
    if (existeci) {
        throw new Error(`la cedula ${existeci.cedula} ya esta registrado`)
    }
}

//validar id existente
const idConsultaExist = async (id = '') => {
    const existeId = await consultas.findById( id );
    if (!existeId) {
        throw new Error(`el id ${id} no esta en la BD`)
    }
}

//validar id existente
const esDoctor = async (id = '') => {
    const existeId = await User.findById( id );
    if (existeId.rol != "Doctor") {
        throw new Error(`el id ${id} no es doctor`)
    }
}
//validar id existente
const idHistoriasExist = async (id = '') => {
    const existeId = await historias.findById( id );
    if (!existeId) {
        throw new Error(`el id ${id} no es doctor`)
    }
}

//validar las colleciones permitidas

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);
    if(!incluida){
        throw new Error(`la coleccion ${coleccion} no es permitida, ${colecciones}`);
    }

    return true;
}



module.exports = {
    validaRol,
    emailExist,
    userNameExist,
    idExist,
    idCategoriaExist,
    idProductoExist,
    idPacienteExist,
    idConsultaExist,
    idHistoriasExist,
    esDoctor,
    emailPacienteExist,
    cedulaPacienteExist,
    coleccionesPermitidas
}