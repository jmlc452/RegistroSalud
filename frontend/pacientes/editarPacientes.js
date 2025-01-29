import { appendAlert } from "../helpers/alert.js";
import { GET, PUT } from "../helpers/apiRest.JS";
import { PUTfiles } from "../helpers/apiRest.JS";

// Obtener el parámetro 'id' de la URL
const urlParams = new URLSearchParams(window.location.search);
const pacienteId = urlParams.get('id');

export function openEditForm(paciente) {
    console.log(paciente)
    // Extraer solo la parte de la fecha (YYYY-MM-DD)
    const fechaFormateada = paciente.fechaNacimiento.split('T')[0]; // Esto da '1999-08-02'

    if (paciente) {
        // Extraer solo la parte de la fecha (YYYY-MM-DD)
        // Rellenar el formulario con los datos actuales del paciente
        document.getElementById('nombre').value = paciente.nombreCompleto.nombre;
        document.getElementById('apellido').value = paciente.nombreCompleto.apellido;
        document.getElementById('fechaNacimiento').value = fechaFormateada;
        document.getElementById('genero').value = paciente.genero;
        document.getElementById('nacionalidad').value = paciente.nacionalidad;
        document.getElementById('estadoCivil').value = paciente.estadoCivil;
        document.getElementById('documentoIdentidad').value = paciente.cedula;
        document.getElementById('telefonoMovil').value = paciente.contacto.telefono.movil;
        document.getElementById('telefonoFijo').value = paciente.contacto.telefono.fijo;
        document.getElementById('correoElectronico').value = paciente.contacto.correoElectronico;
        document.getElementById('estado').value = paciente.contacto.direccion.estado;
        document.getElementById('ciudad').value = paciente.contacto.direccion.ciudad;
        document.getElementById('calle').value = paciente.contacto.direccion.calle;
        document.getElementById('numero').value = paciente.contacto.direccion.numero;
        document.getElementById('tipoSangre').value = paciente.informacionMedica.tiposangre;
        document.getElementById('alergias').value = paciente.informacionMedica.alergias;
        document.getElementById('condicionesPreexistentes').value = paciente.informacionMedica.condicionesPreexistentes;
        document.getElementById('medicamentosActuales').value = paciente.informacionMedica.medicamentosActuales;
        document.getElementById('antecedentesFamiliares').value = paciente.informacionMedica.antecedentesFamiliares;
        document.getElementById('vacunasRecibidas').value = paciente.informacionMedica.vacunasRecibidas;
        document.getElementById('nombreEmergencia').value = paciente.contactoEmergencia.nombre;
        document.getElementById('relacionEmergencia').value = paciente.contactoEmergencia.relacion;
        document.getElementById('telefonoEmergencia').value = paciente.contactoEmergencia.telefono;
        document.getElementById('direccionEmergencia').value = paciente.contactoEmergencia.direccion;
        document.getElementById('nombreAseguradora').value = paciente.seguroMedico.nombreAseguradora;
        document.getElementById('numeroPoliza').value = paciente.seguroMedico.numeroPoliza;
        document.getElementById('tipoSeguro').value = paciente.seguroMedico.tipoSeguro;
        document.getElementById('profesion').value = paciente.otros.profesion;
        document.getElementById('nombreEmpresa').value = paciente.otros.lugarTrabajo.nombreEmpresa;
        document.getElementById('direccionEmpresa').value = paciente.otros.lugarTrabajo.direccion;
        document.getElementById('referidoPor').value = paciente.otros.referidoPor;

        // Mostrar el modal de edición
    }
}

openEditForm(await GET(`pacientes/${pacienteId}`))


document.getElementById("editForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evitar que se recargue la página

    // Obtener el parámetro 'id' de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const pacienteId = urlParams.get('id');

    // const pacienteId = document.getElementById("editId").value;
    // Recoger los datos del formulario
    const updatedData = {
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
        }
    };
    // Enviar los datos al servidor usando fetch

    const res = await PUT(`pacientes/${pacienteId}`, updatedData);

    // Obtener el archivo seleccionado
    const archivo = document.getElementById('img').files[0];
    if (archivo) {
        const imgForm = new FormData();

        imgForm.append('archivo', archivo)


        await PUTfiles(`upload/pacientes/${res.pacienteGuardado._id}`, imgForm)

    }


    if (res.errors) {
        console.log(res.error)
        res.errors.forEach(error => {
            appendAlert(error.msg, 'warning')
        });
        return
    }
    appendAlert("Paciente actualizado con éxito.", "success");
    setTimeout(function () {
        window.location.href = `/pacientes/detalle.html?id=${pacienteId}`;
    }, 1000);

});

document.getElementById('btn-volver').href = `/pacientes/detalle.html?id=${pacienteId}`