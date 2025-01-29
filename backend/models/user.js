const { Schema, model } = require('mongoose')

const userSchema = Schema({
    fullname: {
        type: String,
        required: [true, 'el nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'el correo es requerido'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'la contraseña es necesaria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true
    },
    especialidad: {
        type: String,
        default:""
    },
    userType: {
        type: Boolean,
        default: true
    },
    state: {
        type: Boolean,
        default: true
    },
    fechaRegistro: {
        type: Date,
        default: Date.now // Establece la fecha por defecto al momento actual
    }
})

userSchema.methods.toJSON = function () {
    const { __v, password,  ...user } = this.toObject();
    return user;
}

module.exports = model('User', userSchema);