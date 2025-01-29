import { GET } from "../helpers/apiRest.JS";

document.addEventListener('DOMContentLoaded', async function () {
    const consultaListaEl = document.getElementById('consulta-lista');

    const { consultas } = await GET('consultas');


    // Obtener la fecha de hoy sin la hora
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    // Filtrar las consultas que ocurren hoy o después y ordenarlas por fecha más cercana
    const consultasFuturas = consultas
        .filter(c => {
            const fechaConsulta = new Date(c.consulta.fecha);
            return fechaConsulta >= hoy;
        })
        .sort((a, b) => new Date(a.consulta.fecha) - new Date(b.consulta.fecha)); // Ordenar por fecha más cercana

    
    // Mostrar las consultas en la lista con Bootstrap
    consultasFuturas.forEach(c => {
        const nombrePaciente = `${c.paciente.nombreCompleto.nombre} ${c.paciente.nombreCompleto.apellido}`;
        const fechaConsulta = new Date(c.consulta.fecha);
        const horaConsulta = fechaConsulta.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Crear un elemento de lista con la clase de Bootstrap
        const consultaItem = document.createElement('li');
        consultaItem.classList.add('list-group-item'); // Clase de Bootstrap para estilo
        consultaItem.innerHTML = `<strong>${nombrePaciente}</strong> - ${fechaConsulta.toLocaleDateString()} a las ${horaConsulta}`;
        consultaListaEl.appendChild(consultaItem);
    });

    if (consultasFuturas.length === 0) {
        consultaListaEl.innerHTML = '<li class="list-group-item">No hay consultas programadas para hoy o futuras.</li>';
    }
});
