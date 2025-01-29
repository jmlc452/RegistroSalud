const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const {generarJWT} = require('../helpers/generar-jwt')

const login = async (req,res)=>{
    const {email,password}=req.body;
    try {
        //validar si el email existe
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                msg:'el correo esta incorrecto o no existe'
            })
        }

        //validar el estado del usuario
        if(!user.state){
            return res.status(400).json({
                msg:'el correo fue borrado'
            })
        }
        
        //validar la contraseña
        const validPassword = bcryptjs.compareSync(password,user.password);
        if(!validPassword){
            return res.status(400).json({msg:'la constraseña es invalida'})
        }

        //generar el jwt
        const token = await generarJWT(user.id);

        res.json({user,token});
    } catch (error) {
        console.log(error);
        return res.json({msg:'hable con el addmin'})
    }
}

module.exports = {
    login
}