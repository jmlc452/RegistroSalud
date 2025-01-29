const { Schema, model } = require('mongoose')


const CategoriaSchema = Schema({
    name: {
        type: String,
        require:[true,'El nombre  es obligatorio']
    },
    state: {
        type: Boolean,
        default:true,
        require:true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
});

module.exports = model('Categoria', CategoriaSchema);
