const Rol = require('../models/rol')

const rolGet = async (req, res) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { state: true };

    const result = await Rol.find({});

    res.json({
        result
    })
}

// const userPost = async (req, res) => {
//     const { username, fullname, email, password, rol } = req.body;
//     const user = new User({ username, fullname, email, password, rol });



//     //encriptar clave
//     const salt = bcrypt.genSaltSync();
//     user.password = bcrypt.hashSync(user.password, 10);
//     try {

//         user.save();
//     } catch (error) {
//         console.log(error)
//     }
//     res.json({
//         msg: 'post API - controllers',
//         user
//     })
// }

// const userPut = async (req, res) => {
//     const { id } = req.params;
//     const { _id, password, google, email, ...resto } = req.body;
//     if (password) {
//         const salt = bcrypt.genSaltSync();
//         resto.password = bcrypt.hashSync(password, salt);
//     }
//     const newUser = await User.findByIdAndUpdate(id, resto);
//     res.json({
//         msg: 'put API - controllers',
//         newUser
//     })
// }

// const userDelete = async (req, res) => {
//     const { id } = req.params;
//     //const userBorrado = await User.findByIdAndDelete(id);
//     const userStatus=await User.findByIdAndUpdate(id,{status:false})
//     //console.log(userBorrado)
//     const userAuth = req.userAuth
//     res.json({userStatus,userAuth})
// }

module.exports = {
    rolGet,
    // userPost,
    // userPut,
    // userDelete
}