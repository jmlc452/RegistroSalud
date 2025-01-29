import { GET } from "../helpers/apiRest.JS";

let pacientes;

export async function getPacientes() {
    try {
        const response = await GET("pacientes")
        console.log(response)
        // Ordenar los pacientes por fecha de registro, el más reciente primero
        pacientes = await response.sort((a, b) => new Date(b.fechaRegistro) - new Date(a.fechaRegistro));

        return pacientes;

    } catch (error) {
        console.error('Error al obtener los pacientes:', error);
        throw error;
    }
}

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
export async function renderPacientes(pacientes) {
    const pacientesList = document.getElementById("pacientesList");
    pacientesList.innerHTML = ''; // Limpiar la lista antes de renderizar

    // Crear un array para almacenar las tarjetas
    const cards = [];

    // Cargar todas las imágenes y crear las tarjetas
    for (const paciente of pacientes) {
        const imagenUrl = await cargarImagen(paciente._id);
        const cardCol = `
        <a href="/pacientes/detalle.html?id=${paciente._id}" class="text-decoration-none m-2">
            <div class="card h-100 hover-card">
                <img src="${imagenUrl}" class="card-img-top" alt="Foto de ${paciente.nombreCompleto.nombre}" style="width: 200px; height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h6 class="card-title">${paciente.nombreCompleto.nombre} ${paciente.nombreCompleto.apellido}</h6>
                </div>
            </div>
        </a>
        `;
        cards.push(cardCol); // Almacenar cada tarjeta en el array
    }

    // Insertar todas las tarjetas al final del contenedor de una sola vez
    pacientesList.innerHTML = cards.join(''); // Unir todas las tarjetas y agregarlas

    // Log para verificar el orden
    console.log(pacientesList);
}


// renderPacientes(await GET("pacientes"));
// renderPacientes(await getPacientes());
