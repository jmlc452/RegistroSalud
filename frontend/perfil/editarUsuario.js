import { renderRoles } from "../helpers/roles.js";
import { appendAlert } from "../helpers/alert.js";
import { GET, PUT } from "../helpers/apiRest.JS";
import { PUTfiles } from "../helpers/apiRest.JS";

await renderRoles("miSelect");
const res = await GET("user")
document.getElementById('fullname').value = res.fullname;
document.getElementById('email').value = res.email;

document.getElementById('miSelect').value = res.rol;


document.getElementById("userForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    // Crear un objeto FormData para almacenar el archivo y los datos JSON
    const formData = {
        fullname: document.getElementById("fullname").value,
        email: document.getElementById("email").value,
        rol: document.getElementById("miSelect").value
    }

    // Obtener el archivo seleccionado
    const archivo = document.getElementById('img').files[0];

    const imgForm = new FormData();

    imgForm.append('archivo',archivo)

   
    const res = await PUT("user", formData)
    const user = await GET("user")
    const img = await PUTfiles(`upload/users/${user._id}`, imgForm)
    if (res.errors) {
        res.errors.forEach(error => {
            appendAlert(error.msg, 'warning')
        });
        return
    }
    if (img.errors) {
        img.errors.forEach(error => {
            appendAlert(error.msg, 'warning')
        });
        return
    }
    appendAlert("Usuario actualizado con éxito", 'success');
    setTimeout(function () {
        window.location.href = "/dashboard/";
    }, 1000);
});
