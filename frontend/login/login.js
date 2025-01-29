import { appendAlert } from "../helpers/alert.js";

document.getElementById("userForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que se recargue la página

    // Recoger los datos del formulario
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    return fetch("http://localhost:8081/api/auth/login", {
        method: "POST", // o "POST", dependiendo del caso
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.msg) {
                console.log("Respuesta del servidor:", data);
                appendAlert(data.msg,'warning')

                // Si hay errores, recorrerlos y mostrar cada uno en un alert
                // data.msg.forEach(error => {
                //     // alert(`Error: ${error.msg}`);
                // });
            } else {
                // alert("Usuario registrado con éxito");
                appendAlert("Inicio de sesion con éxito",'success');
                localStorage.setItem("token", data.token);
                setTimeout(function() {
                    window.location.href = "../dashboard/"
                  }, 1000); // 2000 milisegundos = 2 segundos
            }
        })
        .catch(error => {
            console.error("Error:", error);
            return error;

        });
    

})