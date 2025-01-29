const especialidades = require("../models/especialidades.js");

const obtenerEspecialidades = async (req, res)=>{
    const esp = await especialidades.find();
    res.status(200).json(esp)
}

module.exports = {
    obtenerEspecialidades
}