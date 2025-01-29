const jwt = require('jsonwebtoken');
const user = require('../models/user');

const validateJWT = async (req,res,next)=>{
    const token = req.header('token');

    if(!token){
        return res.status(401).json({
            msg:'no hay token'
        })
    }

    try {
        const {uid} = jwt.verify(token,process.env.PRIVATEKEY);

        req.uid = uid;
        //leer usuario en la base de datos
        const userAuth = await user.findById(uid);
        if(!userAuth){
            return res.status(401).json({
                msg:'token no valido- usuario no existe en la bd'
            })
        }

        //verificar si el uid esta en true
        if(!userAuth.state){
            return res.status(401).json({
                msg:'token no valido- usuario con estado en false'
            })
        }
        
        req.user = userAuth
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg:'token no valido'
        })
    }

    
    
}

module.exports = {
    validateJWT
}