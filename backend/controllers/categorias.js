const Categoria = require('../models/categoria');

const obtenerCategorias = async (req, res) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { state: true };


    const [categoria, total] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('user')
    ])
    res.json({
        categoria,
        total
    })
}

const obtenerCategoria = async (req, res) => {
    const { id } = req.params;
    const categoria = await Categoria.findById(id)
    // console.log(categoria)
    res.json(categoria)
}

const crearCategoria = async (req, res) => {
    const name = req.body.name.toUpperCase();
    const categoriaBD = await Categoria.findOne({ name });

    if (categoriaBD) {
        return res.status(400).json({
            msg: `la categoria ${categoriaBD.name} ya existe`
        })
    }
    // Generar la data a guardar
    const data = {
        name,
        user: req.user._id
    }

    const categoria = new Categoria(data);

    // guardar bd
    await categoria.save();

    res.status(201).json(categoria);
}

const actualizarCategoria = async (req, res) => {
    const { id } = req.params;
    const { _id, state, user, _v, ...resto } = req.body;
    resto.name = resto.name.toUpperCase();
    resto.user = req.user._id;
    const newCategoria = await Categoria.findByIdAndUpdate(id, resto,{new:true});
    res.json({
        msg: 'put API - controllers',
        newCategoria
    })
}

const borrarCategoria = async (req, res) => {
    console.log(req.userAuth)
    const { id } = req.params;
    //const userBorrado = await User.findByIdAndDelete(id);
    const categoriaStatus = await Categoria.findByIdAndUpdate(id, { state: false })
    //console.log(userBorrado)
    res.json( categoriaStatus )
}

module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}