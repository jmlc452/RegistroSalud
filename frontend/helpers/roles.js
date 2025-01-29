import { GET } from "./apiRest.JS";

export async function renderRoles(elementId) {
    try {
        const roles = await GET("rols");
        const selectElement = document.getElementById('miSelect');

        roles.result.forEach(rol => {
            const option = document.createElement('option');
            option.value = rol.rol;
            option.text = rol.rol;
            selectElement.appendChild(option);
        });

    } catch (error) {
        console.error('Error al obtener los roles:', error);
    }

}