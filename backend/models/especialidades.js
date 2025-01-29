const { Schema, model } = require('mongoose');

const EspecialidadesSchema = new Schema({
    especialidades: [{
        nombre: { type: String}
    }]
});

module.exports = model('Especialidades', EspecialidadesSchema);
