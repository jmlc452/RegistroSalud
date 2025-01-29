import { loadDoctores } from "../helpers/loadDoctores.js";




export function openHistoriaForm(pacienteId) {
    // Establecer el ID del paciente en el formulario oculto

    // Cargar los doctores disponibles en el select
    loadDoctores("doctor");

    // Mostrar el modal
    const historiaModal = new bootstrap.Modal(document.getElementById('historiaModal'));
    historiaModal.show();
}

export function closeHistoriaForm() {
    const editModal = bootstrap.Modal.getInstance(document.getElementById('historiaModal'));
    if (editModal) {
        editModal.hide(); // Cerrar el modal programáticamente
    }
}

loadDoctores("doctor");
