import { GET } from "../helpers/apiRest.JS";

export async function renderEspecialidades(elementId) {
    try {
        const esp = await GET("especialidades");
        const selectElement = document.getElementById(elementId);

        // Recorrer el array de objetos
        esp.forEach(item => {
            // Recorrer cada especialidad dentro de 'especialidades'
            item.especialidades.forEach(especialidad => {
                const option = document.createElement('option');
                option.value = especialidad.nombre;
                option.text = especialidad.nombre;
                selectElement.appendChild(option);
            });
        });
    } catch (error) {
        console.error('Error al obtener los roles:', error);
    }

}