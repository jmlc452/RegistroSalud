import { GETfiles } from "./apiRest.JS";
import { GET } from "./apiRest.JS";



async function renderNavbar(data) {
    // Código HTML del navbar como una cadena
    const navbarHTML = `
<nav class="navbar navbar-expand-lg navbar-custom">
    <div class="container">
        <a class="navbar-brand" href="/dashboard/">REGISTRO SALUD</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse " id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item dropdown">
                    <a id="midropdown" class="nav-link dropdown-toggle rounded-circle" width="50" href="#" role="button"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <img id="imagen-servidor" alt="Imagen del servidor" class="rounded-circle" width="50">
                    </a>
                   
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="/perfil/index.html">Ver perfil</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a id="salirBtn" class="dropdown-item" href="#" >Salir</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>
`;





    // Insertar el código HTML en el contenedor con id "navbar-container"
    document.getElementById('navbar-container').innerHTML = navbarHTML;
    // Asignar la función al botón dentro del módulo
    document.getElementById('salirBtn').addEventListener('click', salir);


    // Suponiendo que el endpoint devuelve la imagen directamente
    await fetch(`http://localhost:8081/api/upload/users/${data._id}`)
        .then(response => response.blob())  // Convierte la respuesta en un blob
        .then(blob => {
            // Crear un objeto URL que apunte al blob
            const imgUrl = URL.createObjectURL(blob);
            // Asignar el URL creado al atributo src de la imagen
            document.getElementById('imagen-servidor').src = imgUrl;
        })
        .catch(error => console.error('Error al cargar la imagen:', error));



}
renderNavbar(await GET("user"))



function salir() {
    if (localStorage.getItem('token')) {
        // Borrar el token del LocalStorage
        localStorage.removeItem('token');
    }


    // Redirigir a la página de inicio de sesión
    window.location.href = '/login/index.html';
}


