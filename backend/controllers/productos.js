const Producto = require('../models/productos');

const obtenerProductos = async (req, res) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { state: true };


    const [productos, total] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('user')
            .populate('categoria')
    ])
    res.json({
        productos,
        total
    })
}

const obtenerProducto = async (req, res) => {
    const { id } = req.params;
    const categoria = await Producto.findById(id)
        .populate('user')
        .populate('categoria')
    // console.log(categoria)
    res.json(categoria)
}

const crearProducto = async (req, res) => {
    const name = req.body.name.toUpperCase();
    const ProductoBD = await Producto.findOne({ name });

    if (ProductoBD) {
        return res.status(400).json({
            msg: `el producto ${ProductoBD.name} ya existe`
        })
    }
    // Generar la data a guardar
    const data = {
        name,
        user: req.user._id,
        categoria: req.body.categoria,
        descripcion: req.body.descripcion
    }

    const producto = new Producto(data);

    // guardar bd
    await producto.save();

    res.status(201).json(producto);
}

const actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const { _id, state, user, _v, ...resto } = req.body;
    resto.name = resto.name.toUpperCase();
    resto.user = req.user._id;
    const newProducto = await Producto.findByIdAndUpdate(id, resto, { new: true });
    res.json({
        msg: 'put API - controllers',
        newProducto
    })
}

const borrarProducto = async (req, res) => {
    console.log(req.user)
    const { id } = req.params;
    //const userBorrado = await User.findByIdAndDelete(id);
    const productoStatus = await Producto.findByIdAndUpdate(id, { state: false })
    //console.log(userBorrado)
    res.json(productoStatus)
}

module.exports = {
    obtenerProducto,
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    borrarProducto
}