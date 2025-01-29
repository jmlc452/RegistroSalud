import { appendAlert } from "../helpers/alert.js";
import { POST, PUTfiles } from "../helpers/apiRest.JS";
import { renderEspecialidades } from "../helpers/cargarEspecialidades.js";
import { loadDoctoresEsp } from "../helpers/loadDoctores.js";

const urlParams = new URLSearchParams(window.location.search);
const pacienteId = urlParams.get('id');
renderEspecialidades('especialidad')

// Inicializa Select2
$('#especialidad').select2();
loadDoctoresEsp("doctor", "Cardiología")

// Añade un event listener al cambio del select
$('#especialidad').on('change', function () {
    
    // Obtener el valor seleccionado
    const valorSeleccionados = $(this).val();

    // Ejecuta la función que deseas
    loadDoctoresEsp("doctor", valorSeleccionados)

});


document.getElementById('historiaForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const data = {
        antecedentesMedicos: {
            familiares: document.getElementById('familiares').value,
            personalesPatologicos: document.getElementById('personalesPatologicos').value,
            personalesNoPatologicos: document.getElementById('personalesNoPatologicos').value,
            alergias: document.getElementById('alergias').value,
            medicamentosActuales: document.getElementById('medicamentosActuales').value
        },
        motivoConsulta: { descripcion: document.getElementById('motivoConsulta').value, },
        examenFisico: {
            peso: document.getElementById('peso').value,
            talla: document.getElementById('talla').value,
            presionArterial: document.getElementById('presionArterial').value,
            frecuenciaCardiaca: document.getElementById('frecuenciaCardiaca').value,
            frecuenciaRespiratoria: document.getElementById('frecuenciaRespiratoria').value,
            temperatura: document.getElementById('temperatura').value,
            descripcion: document.getElementById('descripcionExamenFisico').value
        }, diagnostico: {
            principal: document.getElementById('diagnosticoPrincipal').value,
            secundarios: document.getElementById('diagnosticosSecundarios').value.split(',') // Asumimos que los diagnósticos secundarios están separados por comas 
        }, planTratamiento: {
            tratamientoPrescrito: document.getElementById('tratamientoPrescrito').value,
            examenesComplementarios: document.getElementById('examenesComplementarios').value.split(','),
            recomendaciones: document.getElementById('recomendaciones').value
        },
        evolucionNotasClinicas: [{
            fechaEvolucion: new Date(), // La fecha de evolución es la fecha actual 
            notasEvolucion: document.getElementById('notasEvolucion').value,
            observaciones: document.getElementById('observaciones').value
        }],

        doctor: document.getElementById('doctor').value,
        paciente: pacienteId
        // user: document.getElementById('userId').value
    };

    const archivosAdjuntos = document.getElementById('formFileMultiple')
    const imgForm = new FormData();



    // console.log(archivosAdjuntos)

    try {
        // Enviar los datos al endpoint usando fetch
        const res = await POST('historias', data);
        console.log(res)
        // Agregar cada archivo seleccionado al FormData
        for (let i = 0; i < archivosAdjuntos.files.length; i++) {
            const imgForm = new FormData();
            imgForm.append('archivo', archivosAdjuntos.files[i]);
            await PUTfiles(`upload/historias/${res.historiaGuardada._id}`, imgForm)
        }
       
        setTimeout(function() {
            window.location.href = `/pacientes/detalle.html?id=${pacienteId}`;
          }, 500); // 2000 milisegundos = 2 segundos


    } catch (error) {
        console.error('Error al registrar la historia médica:', error);
        appendAlert('Hubo un problema al registrar la historia médica', 'danger');
    }
});


document.getElementById('btn-volver').href = `/pacientes/detalle.html?id=${pacienteId}`
