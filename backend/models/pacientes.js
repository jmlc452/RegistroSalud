const { Schema, model } = require('mongoose')

const pacienteSchema = Schema({
    nombreCompleto: {
        nombre: { type: String, required: true },
        apellido: { type: String, required: true },
      },
      fechaNacimiento: { type: Date, required: true },
      genero: { type: String, enum: ['Masculino', 'Femenino', 'Otro'], required: false },
      nacionalidad: { type: String, required: false },
      estadoCivil: { type: String, required: false },
      cedula: { type: String, required: true, unique: true },
      
      contacto: {
        direccion: {
          estado: { type: String, required: false },
          ciudad: { type: String, required: false },
          calle: { type: String, required: false },
          numero: { type: String, required: false }
        },
        telefono: {
          movil: { type: String, required: true },
          fijo: { type: String }
        },
        correoElectronico: { type: String, required: false }
      },
      
      informacionMedica: {
        tipoSangre: { type: String, required: false },
        alergias: { type: [String], default: [] },
        condicionesPreexistentes: { type: [String], default: [] },
        medicamentosActuales: { type: [String], default: [] },
        antecedentesFamiliares: { type: [String], default: [] },
        vacunasRecibidas: { type: [String], default: [] },
      },
      
      contactoEmergencia: {
        nombre: { type: String, required: false },
        relacion: { type: String, required: false },
        telefono: { type: String, required: false },
        direccion: { type: String }
      },
      
      seguroMedico: {
        nombreAseguradora: { type: String },
        numeroPoliza: { type: String },
        tipoSeguro: { type: String }
      },
      
      otros: {
        profesion: { type: String },
        lugarTrabajo: {
          nombreEmpresa: { type: String },
          direccion: { type: String }
        },
        referidoPor: { type: String }
      },
      
      consentimientos: {
        compartirInformacionMedica: { type: Boolean, required: false },
        tratamientoMedico: { type: Boolean, required: false }
      },

      user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          require: true
      },
      img:{
        type: String
      }
    }, {
      timestamps: true // para agregar automáticamente campos de createdAt y updatedAt
    }
  );



module.exports = model('Paciente', pacienteSchema);