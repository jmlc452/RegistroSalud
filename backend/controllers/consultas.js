const Consultas = require('../models/consultas');
const pacientes = require('../models/pacientes');
const user = require('../models/user');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');


const obtenerConsultas = async (req, res) => {
    const { limite = 50, desde = 0 } = req.query;


    const [consultas] = await Promise.all([
        Consultas.find({})
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('user')
            .populate('doctor')
            .populate('paciente')
    ])
    res.json({
        consultas

    })
}

const obtenerConsulta = async (req, res) => {
    const { id } = req.params;
    const consulta = await Consultas.find({ paciente: id })
        .populate('user')
        .populate('doctor')
        .populate('paciente')
    // console.log(categoria)
    res.json(consulta)
}

const crearConsultas = async (req, res) => {
    try {
        // Verificar que el usuario y paciente existen
        const { doctor, paciente, consulta, estado } = req.body;

        if (!doctor || !paciente || !consulta) {
            return res.status(400).json({ error: 'Todos los campos son necesarios.' });
        }

        // Verificar si el doctor y el paciente existen
        const doctorExistente = await user.findById(doctor);
        const pacienteExistente = await pacientes.findById(paciente);

        if (!doctorExistente || !pacienteExistente) {
            return res.status(404).json({ error: 'Doctor o paciente no encontrados.' });
        }

        // Crear una nueva consulta
        const nuevaConsulta = new Consultas({
            doctor,
            paciente,
            user: req.user._id, // Suponiendo que `req.user` está disponible y contiene la información del usuario
            consulta,
            estado
        });

        // Guardar la consulta en la base de datos
        const consultaGuardada = await nuevaConsulta.save();

        // Enviar respuesta exitosa
        res.status(201).json(consultaGuardada);
    } catch (error) {
        console.error('Error al crear consulta:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

const actualizarConsultas = async (req, res) => {
    const { id } = req.params;
    const { _id, state, user, _v, paciente, ...resto } = req.body;
    resto.user = req.user._id;
    const newConsultas = await Consultas.findByIdAndUpdate(id, resto, { new: true });
    res.json({
        msg: 'put API - controllers',
        newConsultas
    })
}

const borrarConsultas = async (req, res) => {
    const { id } = req.params;
    //const userBorrado = await User.findByIdAndDelete(id);
    const ConsultasStatus = await Consultas.findByIdAndUpdate(id, { state: false })
    //console.log(userBorrado)
    res.json(ConsultasStatus)
}

const generarPDF = async (req, res) => {
    const { id } = req.params;


    const paciente = await Consultas.findById(id)
        .populate('user')
        .populate('doctor')
        .populate('paciente')

    const data = paciente;

    const fechaISO = data.consulta.fecha;
    const fecha = new Date(fechaISO);

    const opciones = {
        day: '2-digit',
        month: 'long',   
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'UTC'     
    };

    const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);


    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="consulta-${fechaFormateada}-${data.paciente.nombreCompleto.nombre} ${data.paciente.nombreCompleto.apellido}.pdf"`);

    const doc = new PDFDocument();
    doc.pipe(res);

    doc.fontSize(20).text('Consulta', { align: 'center' });
    doc.moveDown(1);

    const addField = (key, value) => {
        if (value && typeof value === 'string') {
            doc.fontSize(12).text(`${key}: ${value}`);
            doc.moveDown(0.3);
        }
    };
    // Datos del JSON
    // Información de la consulta
    
    doc.fontSize(16).text('Consulta:', { underline: true });
    addField('Fecha de la consulta', fechaFormateada);
    addField('Motivo de la consulta', data.consulta.motivo);
    addField('Descripción del problema', data.consulta.descripcionProblema);
    addField('Tiempo de evolución', data.consulta.tiempoEvolucion);
    addField('Examen físico', data.consulta.examenFisico);
    addField('Diagnóstico', data.consulta.diagnostico);
    addField('Plan de tratamiento', data.consulta.planTratamiento);
    addField('Notas adicionales', data.consulta.notasAdicionales);

    // Información del doctor
    doc.moveDown(1);
    doc.fontSize(16).text('Información del Doctor:', { underline: true });
    addField('Nombre', data.doctor.fullname);
    addField('Especialidad', data.doctor.especialidad);
    addField('Email', data.doctor.email);

    // Información del paciente
    doc.moveDown(1);
    doc.fontSize(16).text('Información del Paciente:', { underline: true });
    addField('Nombre', `${data.paciente.nombreCompleto.nombre} ${data.paciente.nombreCompleto.apellido}`);
    addField('Cédula', data.paciente.cedula);
    addField('Fecha de Nacimiento', data.paciente.fechaNacimiento);
    addField('Género', data.paciente.genero);
    addField('Nacionalidad', data.paciente.nacionalidad);
    addField('Estado Civil', data.paciente.estadoCivil);
    addField('Correo Electrónico', data.paciente.contacto.correoElectronico);
    addField('Teléfono Móvil', data.paciente.contacto.telefono.movil);
    addField('Dirección', `${data.paciente.contacto.direccion.calle}, ${data.paciente.contacto.direccion.ciudad}, ${data.paciente.contacto.direccion.estado}, ${data.paciente.contacto.direccion.numero}`);

    // Información médica del paciente
    doc.moveDown(1);
    doc.fontSize(16).text('Información Médica:', { underline: true });
    addField('Tipo de Sangre', data.paciente.informacionMedica.tipoSangre);
    addField('Alergias', data.paciente.informacionMedica.alergias.join(', '));
    addField('Condiciones Preexistentes', data.paciente.informacionMedica.condicionesPreexistentes.join(', '));
    addField('Medicamentos Actuales', data.paciente.informacionMedica.medicamentosActuales.join(', '));
    addField('Antecedentes Familiares', data.paciente.informacionMedica.antecedentesFamiliares.join(', '));
    addField('Vacunas Recibidas', data.paciente.informacionMedica.vacunasRecibidas.join(', '));

    // Información del seguro
    doc.moveDown(1);
    doc.fontSize(16).text('Seguro Médico:', { underline: true });
    addField('Aseguradora', data.paciente.seguroMedico.nombreAseguradora);
    addField('Número de Póliza', data.paciente.seguroMedico.numeroPoliza);
    addField('Tipo de Seguro', data.paciente.seguroMedico.tipoSeguro);

    // Finalizar el documento
    doc.end();

}

module.exports = {
    obtenerConsultas,
    obtenerConsulta,
    crearConsultas,
    actualizarConsultas,
    borrarConsultas,
    generarPDF

}