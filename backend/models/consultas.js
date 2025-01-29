const { Schema, model } = require('mongoose');
const ConsultasSchema = Schema({
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
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    consulta: {
      fecha: { type: Date, default: Date.now, required: true },
      motivo: { type: String, required: true },
      descripcionProblema: { type: String },
      tiempoEvolucion: { type: String },
      examenFisico: { type: String },
      diagnostico: { type: String },
      planTratamiento: { type: String },
      notasAdicionales: { type: String }
    },
    estado: { type: String, enum: ['En proceso', 'Finalizada', 'Pendiente de seguimiento'], default: 'En proceso' }
  },{
    timestamps:true 
  });

module.exports = model('Consultas', ConsultasSchema);
