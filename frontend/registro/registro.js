import { appendAlert } from "../helpers/alert.js";
import { POSTfiles } from "../helpers/apiRest.JS";
import { renderEspecialidades } from "../helpers/cargarEspecialidades.js";
import { renderRoles } from "../helpers/roles.js";

await renderRoles('miSelect');
renderEspecialidades('especialidad')
blockSelect();
// Obtener los elementos del DOM
const { select, input } = blockSelect();

// Función para desbloquear el input si se selecciona una opción específica
select.addEventListener('change', function () {
    blockSelect();
});

document.getElementById("userForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita que se recargue la página

    // Crear un objeto FormData para almacenar el archivo y los datos JSON
    const formData = new FormData();

    // Obtener el archivo seleccionado
    const archivo = document.getElementById('img').files[0];
    formData.append('archivo', archivo);  // Añadir el archivo al FormData
    formData.append('fullname', document.getElementById("fullname").value);  // Añadir el JSON al FormData
    formData.append('email', document.getElementById("email").value);  // Añadir el JSON al FormData
    formData.append('password', document.getElementById("password").value);  // Añadir el JSON al FormData
    formData.append('rol', document.getElementById("miSelect").value);  // Añadir el JSON al FormData
    formData.append('especialidad', document.getElementById("especialidad").value);  // Añadir el JSON al FormData

    
    // Enviar los datos al servidor usando fetch
    const res = await POSTfiles("user", formData);
    if (res.errors) {
        res.errors.forEach(error => {
            appendAlert(error.msg, 'warning')
        });
        return
    } else {
        appendAlert(res, 'warning')
    }
    appendAlert("Usuario registrado con éxito", 'success');
    setTimeout(function () {
        window.location.href = "/login/index.html";
    }, 1000); // 2000 milisegundos = 2 segundos

});
function blockSelect() {
    const select = document.getElementById('miSelect');
    const input = document.getElementById('especialidad');

    if (select.value === 'Doctor') {
        input.disabled = false; // Desbloquear el input
    } else {
        input.disabled = true; // Bloquear el input
    }
    return { select, input };
}

