const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { subirArchivo } = require('../helpers/subir-archivo');




const userGet = async (req, res) => {
    // const { limite = 5, desde = 0 } = req.query;


    // const [usuarios, total] = await Promise.all([
    //     User.find({})
    //         .skip(Number(desde))
    //         .limit(Number(limite))
    // ])
    // res.json({
    //     usuarios,
    //     total
    // })

    const userInfo = await User.findById(req.user._id);

    res.status(200).json(userInfo)
}


const getDoctores = async (req, res) => {
    // Consulta para obtener los usuarios con rol de doctor
    const doctores = await User.find({ rol: 'Doctor' });

    res.json(doctores)

}

const getDoctoresEsp = async (req, res) => {
    const { esp } = req.params;
    // Consulta para obtener los usuarios con rol de doctor
    const doctores = await User.find({ rol: 'Doctor', especialidad: esp });
    if (doctores) {

        res.json(doctores)
    } else {
        res.json({ error: "no hay doctores" })
    }


}

const userPost = async (req, res) => {
    // El archivo está en req.file
    let img = "" ;

    const { fullname, email, password, rol } = req.body;
    let user = "";

    if(req.files.archivo){
        img = await subirArchivo(req.files, undefined, 'users')
    }

    // Verificar si el usuario es Doctor y tiene una especialidad
    if (req.body.especialidad && req.body.rol == "Doctor") {
        const especialidad = req.body.especialidad;
        user = new User({ fullname, email, password, rol, especialidad, img });
    } else {
        user = new User({ fullname, email, password, rol, img });
    }

    // Agregar la ruta de la imagen subida al usuario
    if (req.file) {
        user.img = req.file.path; // Guardar la ruta de la imagen en el campo img
    }

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, 10);

    try {
        await user.save(); // Guardar el usuario en la base de datos
    } catch (error) {
        return res.status(500).json({ error: 'Error al guardar el usuario' });
    }

    // Responder con el usuario registrado
    res.json({
        msg: 'Usuario registrado exitosamente',
        user,
    });
};

const userPut = async (req, res) => {
    const { id } = req.user;
    const { _id, password, google, email, ...resto } = req.body;
    // if (password) {
    //     const salt = bcrypt.genSaltSync();
    //     resto.password = bcrypt.hashSync(password, salt);
    // }
    const newUser = await User.findByIdAndUpdate(id, resto);
    res.json({
        msg: 'put API - controllers',
        newUser
    })
}

const userDelete = async (req, res) => {
    const { id } = req.params;
    //const userBorrado = await User.findByIdAndDelete(id);
    const userStatus = await User.findByIdAndUpdate(id, { status: false })
    //console.log(userBorrado)
    const userAuth = req.userAuth
    res.json({ userStatus, userAuth })
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
    getDoctores,
    getDoctoresEsp
}