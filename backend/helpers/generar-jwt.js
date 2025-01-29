const jwt = require('jsonwebtoken');

const generarJWT = (uid='')=>{
    return new Promise((resolve,reject)=>{
        const payload = {uid}
        jwt.sign(payload,process.env.PRIVATEKEY,{
            expiresIn: '12h'
        }, (err, token)=>{
            if(err){
                console.log(err);
                reject('no se pudoo crear el token')
            }else{
                resolve(token)
            }
        })
    })
}

module.exports = {
    generarJWT
}