const Historias = require('../models/historias');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path'); // Para manejar rutas de archivos

const obtenerHistorias = async (req, res) => {

    if (req.query.paciente) {
        const query = { paciente: req.query.paciente };
        const [historias, total] = await Promise.all([
            Historias.countDocuments(query),
            Historias.find(query)
                .populate('user')
                .populate('doctor')
                .populate('paciente')
        ])
        res.json({
            historias,
            total
        })


    } else {
        const { limite = 5, desde = 0 } = req.query;
        const query = { state: true };


        const [historias, total] = await Promise.all([
            Historias.countDocuments(query),
            Historias.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .populate('user')
                .populate('doctor')
                .populate('paciente')
        ])
        res.json({
            historias,
            total
        })
    }

}

const obtenerHistoria = async (req, res) => {
    const { id } = req.params;
    const historias = await Historias.findById(id)
        .populate('user')
        .populate('doctor')
    // console.log(categoria)
    res.json(historias)
}




const crearHistorias = async (req, res) => {
    try {
        const { antecedentesMedicos, motivoConsulta, examenFisico, diagnostico, planTratamiento, evolucionNotasClinicas, doctor, paciente } = req.body;

        // Crear un nuevo documento de Historia Médica
        const nuevaHistoria = new Historias({
            antecedentesMedicos,
            motivoConsulta,
            examenFisico,
            diagnostico,
            planTratamiento,
            evolucionNotasClinicas,
            doctor,
            paciente,
            user: req.user._id,
            state: true // Opcional, se inicializa como true por defecto
        });

        // Guardar el documento en la base de datos
        const historiaGuardada = await nuevaHistoria.save();

        // Enviar respuesta exitosa
        res.status(201).json({
            historiaGuardada
        });
    } catch (error) {
        console.error('Error al crear la historia médica:', error);
        res.status(500).json({
            message: 'Error al crear la historia médica',
            error
        });
    }
}

const actualizarHistorias = async (req, res) => {
    const { id } = req.params;
    const { _id, state, user, _v, paciente, ...resto } = req.body;
    resto.user = req.user._id;
    const newHistorias = await Historias.findByIdAndUpdate(id, resto, { new: true });
    res.json({
        msg: 'put API - controllers',
        newHistorias
    })
}

const borrarHistorias = async (req, res) => {
    const { id } = req.params;
    //const userBorrado = await User.findByIdAndDelete(id);
    const ConsultasStatus = await Consultas.findByIdAndUpdate(id, { state: false })
    //console.log(userBorrado)
    res.json(ConsultasStatus)
}

const generarPDF = async (req, res) => {
    const { id } = req.params;


    const data = await Historias.findById(id)
    .populate('paciente')
        .populate('user')
        .populate('doctor')

    const fechaISO = data.createdAt;
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

    console.log(fechaISO)

    // Configura el encabezado de la respuesta para PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="Historia-${fechaFormateada}-${data.paciente.nombreCompleto.nombre} ${data.paciente.nombreCompleto.apellido}.pdf"`);

    // Crear un nuevo documento PDF
    const doc = new PDFDocument();
    doc.pipe(res); // Enviar el PDF directamente a la respuesta
    // Título del PDF
    doc.fontSize(20).text('Historia Médica', { align: 'center' });
    doc.moveDown(1);

    // Función para agregar campos clave-valor
    const addField = (key, value) => {
        if (value && (typeof value === 'string' || typeof value === 'number')) {
            doc.fontSize(12).text(`${key}: ${value}`);
            doc.moveDown(0.3);
        }
    };

    doc.moveDown(1);
    doc.fontSize(14).text('Motivo de Consulta', { underline: true });
    doc.moveDown(0.3);

    addField('', data.motivoConsulta.descripcion);
    addField('Fecha', fechaFormateada);

    doc.moveDown(1);
    doc.fontSize(14).text('Antecedentes Médicos', { underline: true });
    doc.moveDown(0.3);

    addField('Familiares', data.antecedentesMedicos.familiares);
    addField('Personales Patológicos', data.antecedentesMedicos.personalesPatologicos);
    addField('Personales No Patológicos', data.antecedentesMedicos.personalesNoPatologicos);
    addField('Alergias', data.antecedentesMedicos.alergias);
    addField('Medicamentos Actuales', data.antecedentesMedicos.medicamentosActuales);

    doc.moveDown(1);
    doc.fontSize(14).text('Examen Fisico', { underline: true });
    doc.moveDown(0.3);

    addField('Peso', data.examenFisico.peso);
    addField('Talla', data.examenFisico.talla);
    addField('Presión Arterial', data.examenFisico.presionArterial);
    addField('Frecuencia Cardíaca', data.examenFisico.frecuenciaCardiaca);
    addField('Frecuencia Respiratoria', data.examenFisico.frecuenciaRespiratoria);
    addField('Temperatura', data.examenFisico.temperatura);
    addField('Descripción del Examen Físico', data.examenFisico.descripcion);

    doc.moveDown(1);
    doc.fontSize(14).text('Diagnosticos', { underline: true });
    doc.moveDown(0.3);

    addField('Diagnóstico Principal', data.diagnostico.principal);
    addField('Diagnósticos Secundarios', data.diagnostico.secundarios.join(', '));

    doc.moveDown(1);
    doc.fontSize(14).text('Plan de tratamientos', { underline: true });
    doc.moveDown(0.3);

    addField('Tratamiento Prescrito', data.planTratamiento.tratamientoPrescrito);
    addField('Exámenes Complementarios', data.planTratamiento.examenesComplementarios.join(', '));
    addField('Recomendaciones', data.planTratamiento.recomendaciones);

    doc.moveDown(1);
    doc.fontSize(14).text('Doctor tratante', { underline: true });
    doc.moveDown(0.3);


    addField('Doctor', `${data.doctor.fullname} (${data.doctor.especialidad})`);
    addField('Paciente ID', data.paciente);

    // Agregar evolución de notas clínicas
    doc.fontSize(14).text('Evolución de Notas Clínicas:', { underline: true });
    doc.moveDown(0.5);
    data.evolucionNotasClinicas.forEach((nota, index) => {
        doc.fontSize(12).text(`Fecha: ${nota.fechaEvolucion}`);
        doc.text(`Notas: ${nota.notasEvolucion || 'N/A'}`);
        doc.text(`Observaciones: ${nota.observaciones || 'N/A'}`);
        doc.moveDown(0.5);
    });



    // Agregar archivos adjuntos
    doc.fontSize(14).text('Archivos Adjuntos:', { underline: true });

    data.archivosAdjuntos.forEach((archivo, index) => {

        const imagePath = path.join(__dirname, '..', 'uploads', 'historias', archivo.img)

        // Verifica si la imagen existe antes de agregarla
        if (fs.existsSync(imagePath)) {

            doc.addPage();
            const marginTop = 60;
            const marginLeft = 40;
            const width = doc.page.width - 2 * marginLeft;
            const height = doc.page.height - 2 * marginTop;

            doc.image(imagePath, 50, 50, {
                fit: [width, height], // Ajusta el tamaño de la imagen
                align: 'center'
            });

            doc.moveDown(1); // Espacio después de la imagen

        } else {

            doc.fontSize(12).text('Imagen no disponible', { align: 'center' });

            doc.moveDown(1);
        }
    });


    // Finalizar el documento
    doc.end();

}

module.exports = {
    obtenerHistorias,
    obtenerHistoria,
    crearHistorias,
    actualizarHistorias,
    borrarHistorias,
    generarPDF
}