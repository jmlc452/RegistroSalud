export function calcularEdad(fechaNacimiento) {
    const fechaNac = new Date(fechaNacimiento);

    const fechaActual = new Date();

    let edad = fechaActual.getFullYear() - fechaNac.getFullYear();

    // Ajustar la edad si el cumpleaños aún no ha ocurrido este año
    const mesActual = fechaActual.getMonth();
    const diaActual = fechaActual.getDate();

    const mesNacimiento = fechaNac.getMonth();
    const diaNacimiento = fechaNac.getDate();

    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
        edad--;
    }

    return edad;
}

// const fechaNacimiento = '1995-08-29';
// const edad = calcularEdad(fechaNacimiento);
// console.log(`La edad es: ${edad} años`);
