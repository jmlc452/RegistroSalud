import { GET, GETfiles } from "../helpers/apiRest.JS";

// Función para cargar la imagen desde el servidor
async function cargarImagen(url) {
    try {
        const response = await fetch(`http://localhost:8081/api/upload/${url}`);
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

export async function verHistorial(pacienteId) {
    try {
        const response = await GET(`historias?paciente=${pacienteId}`)
        if (response.total) {
            mostrarHistorialEnAcordeon(response)

        } else {
            console.error('Error al obtener el historial.');
        }
    } catch (error) {
        console.error('Error al obtener el historial:', error);
    }
}

async function mostrarHistorialEnAcordeon(datos) {
    const acordeon = document.getElementById('acordeonContainer');
    let html = '';

    // Iterar sobre los elementos del historial
    datos.total.forEach(async (item, index) => {
        // Definir el ID único para cada sección
        const id = `collapse${index}`;
        const headingId = `heading${index}`;
        
        console.log(item)

        // Agregar el contenido del acordeón
        html += `

            <div class="accordion-item">
                <h2 class="accordion-header">
                <button class="accordion-button ${index === 0 ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#${id}" aria-expanded="true" aria-controls="${id}">
                ${new Date(item.createdAt).toLocaleDateString()}
                </button>
                </h2>
                <div id="${id}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" data-bs-parent="#acordeonContainer">
                <div class="accordion-body">
                    <p><strong>Fecha de Creación:</strong> ${new Date(item.createdAt).toLocaleDateString()}</p>
                    <p><strong>Paciente:</strong> ${item.paciente.nombreCompleto.nombre} ${item.paciente.nombreCompleto.apellido}</p>
                    <p><strong>Doctor:</strong> ${item.doctor.fullname} (${item.doctor.especialidad})</p>
                    <p><strong>Motivo de Consulta:</strong> ${item.motivoConsulta.descripcion}</p>
                    <p><strong>Diagnóstico:</strong> Principal: ${item.diagnostico.principal}, Secundarios: ${item.diagnostico.secundarios.join(', ')}</p>
                    <p><strong>Plan de Tratamiento:</strong> ${item.planTratamiento.tratamientoPrescrito}</p>
                    <p><strong>Exámenes Complementarios:</strong> ${item.planTratamiento.examenesComplementarios.join(', ')}</p>
                    <p><strong>Notas Clínicas:</strong> ${item.evolucionNotasClinicas.map(nota => `
                        <p>Fecha: ${new Date(nota.fechaEvolucion).toLocaleDateString()}</p>
                        <p>Notas: ${nota.notasEvolucion}</p>
                        <p>Observaciones: ${nota.observaciones}</p>`).join('')}</p>
                    <p><strong>Examen Físico:</strong> 
                        Peso: ${item.examenFisico.peso} kg, 
                        Talla: ${item.examenFisico.talla} cm, 
                        Presión Arterial: ${item.examenFisico.presionArterial}, 
                        FC: ${item.examenFisico.frecuenciaCardiaca} bpm, 
                        FR: ${item.examenFisico.frecuenciaRespiratoria} rpm, 
                        Temperatura: ${item.examenFisico.temperatura}°C
                    </p>
                    <p id ="imgcontent${index + 1}" class="d-flex flex-wrap"></p>
                    <p><strong>Estado:</strong> ${item.state ? 'Activo' : 'Inactivo'}</p>

                <button class="btn btn-success pdf" id="descargarPdf" data-id="${item._id}">Descargar</button>

                </div>
                </div>
            </div>
        `;

        if (item.archivosAdjuntos.length > 0) {
            for (const img of item.archivosAdjuntos) {
                const res = await cargarImagen(`historias/${item._id}/${img.img}`);

                // Crear el HTML de la card sin el onclick
                const cardHTML = `
                    <div class="card m-2" style="width: 12rem;">
                        <img src="${res}" class="card-img-top" alt="Imagen adjunta ${index + 1}">
                        
                    </div>
                `;

                // Insertar la card en el contenedor con id="imgcontent"
                const container = document.getElementById(`imgcontent${index + 1}`);
                container.insertAdjacentHTML('beforeend', cardHTML);

                // Agregar el evento de clic a la imagen recién insertada
                const imgElement = container.lastElementChild.querySelector("img");
                imgElement.addEventListener("click", () => {
                    showImage(res);
                });

            }
            item.archivosAdjuntos.forEach(async (itemm, index) => {


            });
        }


    });

    // Insertar el HTML generado en el acordeón
    acordeon.innerHTML = html;
    const elementos = document.getElementsByClassName('pdf');
    Array.from(elementos).forEach(elemento => {
        elemento.addEventListener('click', () => {
            // Crea un enlace temporal para la descarga
            const link = document.createElement('a');
            link.href = `http://localhost:8081/api/historias/pdf/${elemento.dataset.id}`;  // Ruta al endpoint que genera el PDF
            link.download = 'sgkjhsgkjsh.pdf';  // Nombre del archivo descargado
            document.body.appendChild(link);
            link.click();  // Simula el clic
            document.body.removeChild(link);  // Elimina el enlace temporal
        });
      });
    
}


const urlParams = new URLSearchParams(window.location.search);
const pacienteId = urlParams.get('id');

document.getElementById('btn-historia').href += `?id=${pacienteId}`;

export function showImage(imageUrl) {
    document.getElementById('modalImage').src = imageUrl;
    const modal = new bootstrap.Modal(document.getElementById('imageModal'));
    modal.show();
}