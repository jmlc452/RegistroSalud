import { calcularEdad } from "../helpers/calcularEdad.js";

// Función para cargar la imagen desde el servidor
async function cargarImagen(idPaciente) {
    try {
        const response = await fetch(`http://localhost:8081/api/upload/pacientes/${idPaciente}`);
        if (!response.ok) {
            throw new Error('Error al cargar la imagen');
        }
        const blob = await response.blob();  // Convierte la respuesta en un blob
        return URL.createObjectURL(blob);    // Crear un objeto URL que apunte al blob
    } catch (error) {
        console.error('Error al cargar la imagen:', error);
        return 'ruta/por/defecto.jpg';  // Ruta por defecto si hay un error
    }
}




export async function renderDatosPaciente(data) {
    const edad = calcularEdad(data.fechaNacimiento)
    // Mostrar los datos del paciente en la página
    const detallePacienteDiv = document.getElementById('detallePaciente');
    // Cargar la imagen desde el servidor
    const imagenUrl = await cargarImagen(data._id);

    detallePacienteDiv.innerHTML = `
    <div class="row">
    <!-- Columna para la imagen -->
    

    <!-- Columna para los datos -->
    <div class="col-md-8">
        <a class="btn btn-primary mb-3" href="/pacientes/editar.html?id=${data._id}">Editar Datos</a>
        <button class="btn btn-success mb-3" id="descargarPdf">Descargarsss</button>

        <h2>${data.nombreCompleto.nombre} ${data.nombreCompleto.apellido}</h2>
        <p><strong>Cédula:</strong> ${data.cedula} <strong>Fecha de Nacimiento:</strong> ${new Date(data.fechaNacimiento).toLocaleDateString()}  <strong>Edad:</strong> ${edad} <strong>Género:</strong> ${data.genero} <strong>Nacionalidad:</strong> ${data.nacionalidad} <strong>Estado Civil:</strong> ${data.estadoCivil}</p>
        
        <hr>

        
    </div>

    <div class="col-md-4">
        <!-- Imagen que se obtiene del servidor -->
        <img src="${imagenUrl}" alt="Foto de ${data.nombreCompleto.nombre}" class="img-fluid rounded-circle" style="width: 150px; height: 150px; object-fit: cover;">
    </div>
</div>
    
    <div class="accordion" id="accordionExample">
        <div class="accordion-item">
            <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Contacto
            </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <p><strong>Teléfono Móvil:</strong> ${data.contacto.telefono.movil}</p>
                <p><strong>Teléfono Fijo:</strong> ${data.contacto.telefono.fijo || 'N/A'}</p>
                <p><strong>Email:</strong> ${data.contacto.correoElectronico}</p>
                <h4>Dirección</h4>
                <p>${data.contacto.direccion.calle || ''} ${data.contacto.direccion.numero || ''}, ${data.contacto.direccion.ciudad || ''}, ${data.contacto.direccion.estado || ''}</p>
            </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Información Médica
            </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <p><strong>Tipo de Sangre:</strong> ${data.informacionMedica.tipoSangre || 'N/A'}</p>
                <p><strong>Alergias:</strong> ${data.informacionMedica.alergias.join(', ') || 'N/A'}</p>
                <p><strong>Condiciones Preexistentes:</strong> ${data.informacionMedica.condicionesPreexistentes.join(', ') || 'N/A'}</p>
                <p><strong>Medicamentos Actuales:</strong> ${data.informacionMedica.medicamentosActuales.join(', ') || 'N/A'}</p>
                <p><strong>Antecedentes Familiares:</strong> ${data.informacionMedica.antecedentesFamiliares.join(', ') || 'N/A'}</p>
                <p><strong>Vacunas Recibidas:</strong> ${data.informacionMedica.vacunasRecibidas.join(', ') || 'N/A'}</p>
            </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Contacto de Emergencia
                </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <p><strong>Nombre:</strong> ${data.contactoEmergencia.nombre || 'N/A'}</p>
                    <p><strong>Relación:</strong> ${data.contactoEmergencia.relacion || 'N/A'}</p>
                    <p><strong>Teléfono:</strong> ${data.contactoEmergencia.telefono || 'N/A'}</p>
                    <p><strong>Dirección:</strong> ${data.contactoEmergencia.direccion || 'N/A'}</p>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapseThree">
                    Seguro Médico
                </button>
            </h2>
            <div id="collapse4" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <p><strong>Nombre de la Aseguradora:</strong> ${data.seguroMedico.nombreAseguradora || 'N/A'}</p>
                    <p><strong>Número de Póliza:</strong> ${data.seguroMedico.numeroPoliza || 'N/A'}</p>
                    <p><strong>Tipo de Seguro:</strong> ${data.seguroMedico.tipoSeguro || 'N/A'}</p>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse5" aria-expanded="false" aria-controls="collapseThree">
                    Otros
                </button>
            </h2>
            <div id="collapse5" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <p><strong>Profesión:</strong> ${data.otros.profesion || 'N/A'}</p>
                    <p><strong>Lugar de Trabajo:</strong> ${data.otros.lugarTrabajo.nombreEmpresa || 'N/A'}</p>
                    <p><strong>Dirección del Trabajo:</strong> ${data.otros.lugarTrabajo.direccion || 'N/A'}</p>
                    <p><strong>Referido Por:</strong> ${data.otros.referidoPor || 'N/A'}</p>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse6" aria-expanded="false" aria-controls="collapseThree">
                    Consentimientos
                </button>
            </h2>
            <div id="collapse6" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <p><strong>Compartir Información Médica:</strong> ${data.consentimientos.compartirInformacionMedica ? 'Sí' : 'No'}</p>
                    <p><strong>Tratamiento Médico:</strong> ${data.consentimientos.tratamientoMedico ? 'Sí' : 'No'}</p>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse7" aria-expanded="false" aria-controls="collapseThree">
                    Información del Usuario que Registró
                </button>
            </h2>
            <div id="collapse7" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <p><strong>Registrado por:</strong> ${data.user.fullname}</p>
                    <p><strong>Email del Usuario:</strong> ${data.user.email}</p>
                    <p><strong>Rol del Usuario:</strong> ${data.user.rol}</p>
                    <p><strong>Fecha de Registro:</strong> ${new Date(data.user.fechaRegistro).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    </div>
`;
    document.getElementById('descargarPdf').addEventListener('click', () => {
        // Crea un enlace temporal para la descarga
        const link = document.createElement('a');
        link.href = `http://localhost:8081/api/pacientes/pdf/${data._id}`;  // Ruta al endpoint que genera el PDF
        link.download = 'xcsdfs.pdf';  // Nombre del archivo descargado
        document.body.appendChild(link);
        link.click();  // Simula el clic
        document.body.removeChild(link);  // Elimina el enlace temporal
    });
}


