const { Schema, model } = require('mongoose');
const categoria = require('./categoria');


const ProductoSchema = Schema({
    name: {
        type: String,
        require: [true, 'El nombre  es obligatorio']
    },
    state: {
        type: Boolean,
        default: true,
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: { type: String },
    disponible: { type: Boolean, default: true }

});

module.exports = model('Producto', ProductoSchema);
