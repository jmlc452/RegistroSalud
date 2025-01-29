const { Schema, model } = require('mongoose')


const RolSchema = Schema({
    rol: {
        type: String,
        require:[true,'El rol es obligatorio']
    },
    fechaRegistro: {
        type: Date,
        default: Date.now // Establece la fecha por defecto al momento actual
    }
});

module.exports = model('Rol', RolSchema);
