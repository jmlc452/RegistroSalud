const validaRolAdmin = (req, res,next)=>{
    if(!req.userAuth){
        return res.status(500).json({
            msg:'se quiere verificr el role sin validar el token primero'
        })
    }

    const {rol, name} = req.userAuth;
    
    if(rol !== 'ADMIN_ROL'){
        return res.status(401).json({
            msg:`${name} no es administrador`
        })
    }
    next()
}

const tieneRol=(...rols)=>{ 
    return (req, res, next) => {
        if(!req.user){
            return res.status(500).json({
                msg:'se quiere verificr el role sin validar el token primero'
            })
        }

        if(!rols.includes(req.user.rol)){
            return res.status(401).json({
                msg:`el usuario ${req.user.name} no pertenece a estos roles ${rols}`
            })
        }
        
        next();
    }
}

module.exports= {
    validaRolAdmin,
    tieneRol

}