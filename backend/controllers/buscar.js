const { isValidObjectId } = require("mongoose");
const user = require("../models/user");
const Categoria = require("../models/categoria");
const Productos = require("../models/productos");
const Pacientes = require("../models/pacientes.js")

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
]

const buscarUsuarios = async (termino = '', res) => {
    const esMongoID = isValidObjectId(termino);

    if (esMongoID) {
        const usuario = await user.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        })
    }

    const regex = new RegExp(termino, 'i');
    console.log(regex);
    const users = await user.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ state: true }]
    })


    res.json({
        resuts: users
    })
}

const buscarCategorias = async (termino = '', res) => {
    const esMongoID = isValidObjectId(termino);

    if (esMongoID) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        })
    }

    const regex = new RegExp(termino, 'i');
    const categorias = await Categoria.find({ name: regex })


    res.json({
        resuts: categorias
    })
}

const buscarProductos = async (termino = '', res) => {
    const esMongoID = isValidObjectId(termino);

    if (esMongoID) {
        const productos = await Productos.findById(termino);
        return res.json({
            results: (productos) ? [productos] : []
        })
    }

    const regex = new RegExp(termino, 'i');
    const productos = await Productos.find({ name: regex })


    res.json({
        resuts: productos
    })
}


const buscar = (req, res) => {
    const { coleccion, termino } = req.params
    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.json({ msg: `la coleccion ${coleccion} no existe` })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res)
            break;
        case 'categorias':
            buscarCategorias(termino, res)
            break;
        case 'productos':
            buscarProductos(termino, res)
            break;

        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta busqueda'
            })
    }
}

const buscarEnVariosCampos = async (req,res) => {
    const { palabra } = req.query; // Obtenemos la palabra de búsqueda desde la query string

    if (!palabra) {
      return res.status(400).send({ error: 'Debe proporcionar una palabra de búsqueda.' });
    }
  
    try {
      const resultados = await Pacientes.find({
        $or: [
          { 'nombreCompleto.nombre': { $regex: palabra, $options: 'i' } },
          { 'nombreCompleto.apellido': { $regex: palabra, $options: 'i' } },
          { 'cedula': { $regex: palabra, $options: 'i' } },
          { 'contacto.correoElectronico': { $regex: palabra, $options: 'i' } },
        ]
      });
  
      res.json(resultados);
    } catch (err) {
      console.error('Error al buscar:', err);
      res.status(500).send({ error: 'Error en el servidor' });
    }
};



module.exports = {
    buscar,
    buscarEnVariosCampos
}