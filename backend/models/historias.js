const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historiaSchema = new Schema({
   
    antecedentesMedicos: {
        familiares: { type: String },
        personalesPatologicos: { type: String },
        personalesNoPatologicos: { type: String },
        alergias: { type: String },
        medicamentosActuales: { type: String },
    },
    motivoConsulta: {
        descripcion: { type: String, required: true },
    },
    examenFisico: {
        peso: { type: Number },
        talla: { type: Number },
        presionArterial: { type: String },
        frecuenciaCardiaca: { type: Number },
        frecuenciaRespiratoria: { type: Number },
        temperatura: { type: Number },
        descripcion: { type: String },
    },
    diagnostico: {
        principal: { type: String, required: true },
        secundarios: { type: [String] },
    },
    planTratamiento: {
        tratamientoPrescrito: { type: String },
        examenesComplementarios: { type: [String] },
        recomendaciones: { type: String },
    },
    evolucionNotasClinicas: [{
        fechaEvolucion: { type: Date, default: Date.now },
        notasEvolucion: { type: String },
        observaciones: { type: String },
    }],
    archivosAdjuntos: [{
        img: { type: String }, // URL al archivo adjunto
    }],
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    paciente: {
        type: Schema.Types.ObjectId,
        ref: 'Paciente',
        require: true
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
    }
},
    {
        timestamps: true // para agregar automáticamente campos de createdAt y updatedAt
    }
);

module.exports = mongoose.model('Historias', historiaSchema);

