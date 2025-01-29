const mongoose = require('mongoose')

const dbConnection = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_CNN,{ 
            
        })
        console.log('db conection ok')
    } catch (error) {
        console.log(error)
        //setTimeout(dbConnection(),100)
    }
}

module.exports = {
    dbConnection
}