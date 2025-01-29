const { subirArchivo } = require("../helpers/subir-archivo");
const User = require('../models/user')
const Pacientes = require('../models/pacientes')
const Historias = require('../models/historias');
const path = require('path');
const fs = require('fs')

const cargarArchivo = async (req, res) => {


    try {
        const pathCompleto = await subirArchivo(req.files, ['txt'], 'textos')

        res.send(pathCompleto)
    } catch (error) {
        res.send(error)
    }

}

const actualizarImagen = async (req, res) => {

    const { id, coleccion } = req.params;

    let modelo

    switch (coleccion) {
        case 'users':
            modelo = await User.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
            break;

        case 'pacientes':
            modelo = await Pacientes.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un pacientes con el id ${id}`
                })
            }
            break;
        case 'historias':
            modelo = await Historias.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe una historia con el id ${id}`
                })
            }
            break;

        default:
            return res.status(500).json({ msg: 'se me olvido validar esto' });
    }


    if (modelo.img) {
        const pathImg = path.join(__dirname, '../uploads', coleccion, modelo.img)
        if (fs.existsSync(pathImg)) {
            fs.unlinkSync(pathImg)
        }
    }

    try {
        const nombre = await subirArchivo(req.files, undefined, coleccion);
        if (coleccion == 'historias') {
            // Actualizar el array archivosAdjuntos del documento
            const historiaActualizada = await Historias.findByIdAndUpdate(
                id,
                { $push: { archivosAdjuntos: { img: nombre } } }, // Añadir un nuevo archivo al array
                { new: true } // Retornar el documento actualizado
            );
        }
        else {
            modelo.img = nombre

            await modelo.save();
        }




        res.json(modelo)
    } catch (e) {
        res.json(e)

    }

}

const mostrarImagen = async (req, res) => {
    const { id, coleccion } = req.params;

    let modelo

    switch (coleccion) {
        case 'users':
            modelo = await User.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
            break;

        case 'pacientes':
            modelo = await Pacientes.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un pacientes con el id ${id}`
                })
            }
            break;
        case 'historias':
            modelo = await Historias.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe una historia con el id ${id}`
                })
            }
            break;

        default:
            return res.status(500).json({ msg: 'se me olvido validar esto' });
    }


    if (modelo.img) {
        const pathImg = path.join(__dirname, '../uploads', coleccion, modelo.img)
        if (fs.existsSync(pathImg)) {
            return res.sendFile(pathImg)
        }
    }

    res.sendFile(path.join(__dirname, '../', 'placeholder.png'))
}



const mostrarImagenById = async (req, res) => {
    const { id, coleccion, idImg } = req.params;

    let modelo

    switch (coleccion) {
        case 'users':
            modelo = await User.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
            break;

        case 'pacientes':
            modelo = await Pacientes.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un pacientes con el id ${id}`
                })
            }
            break;
        case 'historias':
            modelo = await Historias.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe una historia con el id ${id}`
                })
            }
            break;

        default:
            return res.status(500).json({ msg: 'se me olvido validar esto' });
    }

    if(modelo.archivosAdjuntos){
        const pathImg = path.join(__dirname, '../uploads', coleccion, idImg)
        if (fs.existsSync(pathImg)) {
            return res.sendFile(pathImg)
        }
    }

    res.sendFile(path.join(__dirname, '../', 'placeholder.png'))

}


module.exports = {

    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    mostrarImagenById
}