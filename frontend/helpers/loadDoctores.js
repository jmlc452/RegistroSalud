import { GET } from "./apiRest.JS";

export async function loadDoctores(idElement) {
    try {
        const response = await GET("user/doctores")
        const doctorSelect = document.getElementById(idElement);
        doctorSelect.innerHTML = ''; // Limpiar el select antes de cargar los doctores
        response.forEach(doctor => {
            const option = document.createElement('option');
            option.value = doctor._id;
            option.textContent = doctor.fullname;
            doctorSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar los doctores:', error);
    }
}

export async function loadDoctoresEsp(idElement,especialidad) {
    try {
        const response = await GET(`user/doctores/${especialidad}`)
        const doctorSelect = document.getElementById(idElement);
        doctorSelect.innerHTML = ''; // Limpiar el select antes de cargar los doctores
        response.forEach(doctor => {
            const option = document.createElement('option');
            option.value = doctor._id;
            option.textContent = doctor.fullname;
            doctorSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar los doctores:', error);
    }
}