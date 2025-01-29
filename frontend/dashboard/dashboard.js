import { GET } from "../helpers/apiRest.JS";
import { getPacientes, renderPacientes } from "./mostrarTodosPacientes.js";

renderPacientes(await getPacientes())

document.getElementById('searchBtn').addEventListener('click', async () => {
    const palabra = document.getElementById('searchInput').value; // Obtenemos el valor del input

    // Si el input está vacío muestra todos los pacientes 
    if (!palabra) {
        renderPacientes(await GET("pacientes"))
        return;
    }

    try {
        const response = await GET(`buscar?palabra=${encodeURIComponent(palabra)}`);
        // if (!response.ok) {
        //     throw new Error('Error en la búsqueda');
        // }

        // const resultados = await response.json(); 
        renderPacientes(response); 
    } catch (error) {
        console.error(error);
    }
});