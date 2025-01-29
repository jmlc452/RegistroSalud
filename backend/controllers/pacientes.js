const Pacientes = require('../models/pacientes');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path'); // Para manejar rutas de archivos

const obtenerPacientes = async (req, res) => {
    const { limite = 50, desde = 0 } = req.query;


    const [pacientes] = await Promise.all([
        Pacientes.find({})
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('user')
    ])
    res.json(pacientes)

    // const pacientes = await Pacientes.find({});

    // res.json(pacientes)
}

const obtenerPaciente = async (req, res) => {
    const { id } = req.params;
    const paciente = await Pacientes.findById(id)
        .populate('user')
    // console.log(categoria)
    res.json(paciente)
}

const crearPaciente = async (req, res) => {
    try {
        // Extraer los datos del cuerpo de la solicitud (req.body)
        const {
            nombreCompleto,
            fechaNacimiento,
            genero,
            nacionalidad,
            estadoCivil,
            cedula,
            numeroHistoriaMedica,
            contacto,
            informacionMedica,
            contactoEmergencia,
            seguroMedico,
            otros,
            consentimientos
        } = req.body;

        nombreCompleto.nombre = nombreCompleto.nombre.toUpperCase();
        nombreCompleto.apellido = nombreCompleto.apellido.toUpperCase();
        // Validar que los campos requeridos estén presentes (opcional)
        if (!nombreCompleto || !cedula || !contacto.telefono.movil || !consentimientos) {
            return res.status(400).json({ errors: 'Por favor, complete todos los campos obligatorios.' });
        }

        // Crear un nuevo paciente con los datos del cuerpo de la solicitud
        const nuevoPaciente = new Pacientes({
            nombreCompleto,
            fechaNacimiento,
            genero,
            nacionalidad,
            estadoCivil,
            cedula,
            numeroHistoriaMedica,
            contacto,
            informacionMedica,
            contactoEmergencia,
            seguroMedico,
            otros,
            consentimientos,
            user: req.user._id
        });

        // Guardar el nuevo paciente en la base de datos
        const pacienteGuardado = await nuevoPaciente.save();

        // Responder con el paciente registrado
        res.status(201).json({ pacienteGuardado });

    } catch (error) {
        // Manejo de errores
        console.error(error);
        res.status(500).json({ msg: 'Error al registrar el paciente', errors: error.message });
    }
};

const actualizarPaciente = async (req, res) => {
    const { id } = req.params;
    const { _id, state, user, _v, ...resto } = req.body;
    // resto.name = resto.name.toUpperCase();
    resto.nombreCompleto.nombre = resto.nombreCompleto.nombre.toUpperCase();
    resto.nombreCompleto.apellido = resto.nombreCompleto.apellido.toUpperCase();
    resto.user = req.user._id;
    try {
        const pacienteGuardado = await Pacientes.findByIdAndUpdate(id, resto, { new: true });
        res.json({
            pacienteGuardado
        })
    } catch (error) {
        console.log(error)
        res.json({ error: error })
    }

}

const borrarPaciente = async (req, res) => {
    const { id } = req.params;
    //const userBorrado = await User.findByIdAndDelete(id);
    const productoStatus = await Pacientes.findByIdAndUpdate(id, { state: false })
    //console.log(userBorrado)
    res.json(productoStatus)
}

const generarPDF = async (req, res) => {
    const { id } = req.params;


    const paciente = await Pacientes.findById(id)
        .populate('user')

    const data = paciente;

    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="paciente-${data.nombreCompleto.nombre} ${data.nombreCompleto.apellido}.pdf"`);
    
    const doc = new PDFDocument();
    doc.pipe(res); 
    
    doc.fontSize(20).text('Información del Paciente', { align: 'center' });
    doc.moveDown(1);
    
    const imagePath= !data.img ? path.join(__dirname,'..', 'placeholder.png') : path.join(__dirname,'..', 'uploads', 'pacientes', data.img);

    const fs = require('fs');
    if (fs.existsSync(imagePath)) {
        doc.image(imagePath,73,40, {
            fit: [80 , 80], 
            align: 'center'
        });
        doc.moveDown(1); 
    } else {
        doc.fontSize(12).text('Imagen no disponible', { align: 'center' });
        doc.moveDown(1);
    }

    const addField = (key, value) => {
        if (value && typeof value === 'string') {
            doc.fontSize(12).text(`${key}: ${value}`);
            doc.moveDown(0.3);
        }
    };

    addField('Nombre', `${data.nombreCompleto.nombre} ${data.nombreCompleto.apellido}`);
    addField('Cédula', data.cedula);
    addField('Fecha de Nacimiento', data.fechaNacimiento);
    addField('Género', data.genero);
    addField('Nacionalidad', data.nacionalidad);
    addField('Estado Civil', data.estadoCivil);

    doc.moveDown(1); 
    doc.fontSize(14).text('Contacto', { underline: true });
    doc.moveDown(0.3);

    addField('Correo Electrónico', data.contacto.correoElectronico);
    addField('Teléfono Móvil', data.contacto.telefono.movil);

    doc.moveDown(1); 
    doc.fontSize(14).text('Información medica', { underline: true });
    doc.moveDown(0.3); 

    addField('Tipo de Sangre', data.informacionMedica.tipoSangre);
    addField('Alergias', data.informacionMedica.alergias.join(', '));
    addField('Condiciones Preexistentes', data.informacionMedica.condicionesPreexistentes.join(', '));
    addField('Medicamentos Actuales', data.informacionMedica.medicamentosActuales.join(', '));
    addField('Antecedentes Familiares', data.informacionMedica.antecedentesFamiliares.join(', '));
    addField('Vacunas Recibidas', data.informacionMedica.vacunasRecibidas.join(', '));

    doc.moveDown(1); 
    doc.fontSize(14).text('Seguro medico', { underline: true });
    doc.moveDown(0.3); 

    addField('Nombre Contacto Emergencia', data.contactoEmergencia.nombre);
    addField('Teléfono Emergencia', data.contactoEmergencia.telefono);
    addField('Nombre Aseguradora', data.seguroMedico.nombreAseguradora);
    addField('Número de Póliza', data.seguroMedico.numeroPoliza);

    doc.moveDown(1); 
    doc.fontSize(14).text('Otros', { underline: true });
    doc.moveDown(0.3); 

    addField('Empresa Trabajo', data.otros.lugarTrabajo.nombreEmpresa);
    addField('Profesión', data.otros.profesion);
    addField('Referido Por', data.otros.referidoPor);

    // Finalizar el documento
    doc.end();

}

module.exports = {
    obtenerPacientes,
    obtenerPaciente,
    crearPaciente,
    actualizarPaciente,
    borrarPaciente,
    generarPDF
}