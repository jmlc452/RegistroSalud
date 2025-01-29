import { GET } from "../helpers/apiRest.JS";

function mostrarConsultasEnAcordeon(datos) {
    const acordeon = document.getElementById('acordeonContainerConsultas');
    let html = '';

    // Iterar sobre los elementos del historial
    datos.forEach((item, index) => {
        // Definir el ID único para cada sección
        const id = `collapse${index}`;
        const headingId = `heading${index}`;

        // Agregar el contenido del acordeón
        html += `

            <div class="accordion-item">
                <h2 class="accordion-header">
                <button class="accordion-button ${index === 0 ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#${id}" aria-expanded="true" aria-controls="${id}">
                ${new Date(item.createdAt).toLocaleDateString()}
                </button>
                </h2>
                <div id="${id}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" data-bs-parent="#acordeonContainerConsultas">
                <div class="accordion-body">
                    <p><strong>Fecha de Creación:</strong> ${new Date(item.createdAt).toLocaleDateString()}</p>
                    <p><strong>Paciente:</strong> ${item.paciente.nombreCompleto.nombre} ${item.paciente.nombreCompleto.apellido}</p>
                    <p><strong>Doctor:</strong> ${item.doctor.fullname} (${item.doctor.rol})</p>
                    <p><strong>Descripcion del problema:</strong> ${item.consulta.descripcionProblema}</p>
                    <p><strong>Diagnóstico:</strong> Principal: ${item.consulta.diagnostico}</p>
                    <p><strong>Examen Fisico:</strong> ${item.consulta.examenFisico}</p>
                    <p><strong>Fecha de la consulta:</strong> ${item.consulta.fecha}</p>
                    <p><strong>Motivo de Consulta:</strong> ${item.consulta.motivo}</p>
                    <p><strong>Notas Adicionales:</strong> Peso: ${item.consulta.notasAdicionales}</p>
                    <p><strong>Plan de tratamiento:</strong> ${item.consulta.planTratamiento}</p>
                    <p><strong>Tiempo de evolucion:</strong> ${item.consulta.tiempoEvolucion}</p>
                    <p><strong>Estado:</strong> ${item.estado}</p>
                    <button class="btn btn-success pdfconsultas" id="descargarPdf" data-id="${item._id}">Descargar</button>
                </div>
                </div>
            </div>
        `;
    });

    // Insertar el HTML generado en el acordeón
    acordeon.innerHTML = html;

    const elementos = document.getElementsByClassName('pdfconsultas');
    Array.from(elementos).forEach(elemento => {
        elemento.addEventListener('click', () => {
            // Crea un enlace temporal para la descarga
            const link = document.createElement('a');
            link.href = `http://localhost:8081/api/consultas/pdf/${elemento.dataset.id}`;  // Ruta al endpoint que genera el PDF
            const nombre = datos[0].paciente.nombreCompleto.nombre + datos[0].paciente.nombreCompleto.apellido
            link.download = nombre + '.pdf';  // Nombre del archivo descargado
            document.body.appendChild(link);
            link.click();  // Simula el clic
            document.body.removeChild(link);  // Elimina el enlace temporal
        });
      });
}




// Obtener el parámetro 'id' de la URL
const urlParams = new URLSearchParams(window.location.search);
const pacienteId = urlParams.get('id');

// Poner link con id al boton de agregar la consulta
const agregarConsulta = document.getElementById("btnCrearConsulta")
agregarConsulta.href += `?id=${pacienteId}`

const datos = await GET(`consultas/${pacienteId}`)
mostrarConsultasEnAcordeon(datos)