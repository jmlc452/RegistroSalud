import { appendAlert } from "../helpers/alert.js";
import { PUTfiles } from "../helpers/apiRest.JS";
import { POST } from "../helpers/apiRest.JS";

document.getElementById("userForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita que se recargue la página

    // Recoger los datos del formulario
    const formData = {
        nombreCompleto: {
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value
        },
        fechaNacimiento: document.getElementById('fechaNacimiento').value,
        genero: document.getElementById('genero').value,
        nacionalidad: document.getElementById('nacionalidad').value,
        estadoCivil: document.getElementById('estadoCivil').value,
        cedula: document.getElementById('documentoIdentidad').value,
        contacto: {
            direccion: {
                estado: document.getElementById('estado').value,
                ciudad: document.getElementById('ciudad').value,
                calle: document.getElementById('calle').value,
                numero: document.getElementById('numero').value
            },
            telefono: {
                movil: document.getElementById('telefonoMovil').value,
                fijo: document.getElementById('telefonoFijo').value
            },
            correoElectronico: document.getElementById('correoElectronico').value
        },
        informacionMedica: {
            tipoSangre: document.getElementById('tipoSangre').value,
            alergias: document.getElementById('alergias').value.split(',').map(a => a.trim()),
            condicionesPreexistentes: document.getElementById('condicionesPreexistentes').value.split(',').map(c => c.trim()),
            medicamentosActuales: document.getElementById('medicamentosActuales').value.split(',').map(m => m.trim()),
            antecedentesFamiliares: document.getElementById('antecedentesFamiliares').value.split(',').map(a => a.trim()),
            vacunasRecibidas: document.getElementById('vacunasRecibidas').value.split(',').map(v => v.trim())
        },
        contactoEmergencia: {
            nombre: document.getElementById('nombreEmergencia').value,
            relacion: document.getElementById('relacionEmergencia').value,
            telefono: document.getElementById('telefonoEmergencia').value,
            direccion: document.getElementById('direccionEmergencia').value
        },
        seguroMedico: {
            nombreAseguradora: document.getElementById('nombreAseguradora').value,
            numeroPoliza: document.getElementById('numeroPoliza').value,
            tipoSeguro: document.getElementById('tipoSeguro').value
        },
        otros: {
            profesion: document.getElementById('profesion').value,
            lugarTrabajo: {
                nombreEmpresa: document.getElementById('nombreEmpresa').value,
                direccion: document.getElementById('direccionEmpresa').value
            },
            referidoPor: document.getElementById('referidoPor').value
        },
        consentimientos: {
            compartirInformacionMedica: document.getElementById('compartirInformacionMedica').checked,
            tratamientoMedico: document.getElementById('tratamientoMedico').checked
        }
    };
    // Enviar los datos al servidor usando fetch
    const res = await POST("pacientes", formData)

    
    if (res.errors) {
        res.errors.forEach(error => {
            appendAlert(error.msg, 'danger')
        });
        return
    }
    // Obtener el archivo seleccionado
    const archivo = document.getElementById('img').files[0];
    if (archivo) {
        const imgForm = new FormData();
        
        imgForm.append('archivo', archivo)
        
        console.log(imgForm, res)

        await PUTfiles(`upload/pacientes/${res.pacienteGuardado._id}`, imgForm)

    }
    appendAlert("paciente creado con éxito", 'success');
    setTimeout(function () {
        window.location.href = "/dashboard/";
    }, 1000);
});