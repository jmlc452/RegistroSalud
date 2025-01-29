import { appendAlert } from "../helpers/alert.js";
import { POST } from "../helpers/apiRest.JS";
import { renderEspecialidades } from "../helpers/cargarEspecialidades.js";
import { loadDoctores, loadDoctoresEsp } from "../helpers/loadDoctores.js";
const urlParams = new URLSearchParams(window.location.search);
const pacienteId = urlParams.get('id');
renderEspecialidades('especialidad')

// Inicializa Select2
$('#especialidad').select2();
const valorSeleccionado = $('#miSelect').val();
console.log(valorSeleccionado)
loadDoctoresEsp("doctor", "Cardiología")

// Añade un event listener al cambio del select
$('#especialidad').on('change', function () {
  // Obtener el valor seleccionado
  const valorSeleccionado = $(this).val();

  // Ejecuta la función que deseas
  loadDoctoresEsp("doctor", valorSeleccionado)

});

document.getElementById('consultaForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

  // Recoge los datos del formulario
  const formData = new FormData(event.target);
  // Obtén los valores de fecha y hora del formulario
  const fecha = document.getElementById('fecha').value;
  const hora = document.getElementById('hora').value;
  
  // Combina fecha y hora en un solo string y crea un objeto Date
  const fechaHora = new Date(`${fecha}T${hora}:00.000Z`);

  // Crea un objeto con los datos del formulario
  const data = {
    doctor: document.getElementById('doctor').value,
    especialidad: document.getElementById('especialidad').value,
    
    paciente: pacienteId,
    consulta: {
      fecha: fechaHora,
      motivo: formData.get('consulta[motivo]'),
      descripcionProblema: formData.get('consulta[descripcionProblema]'),
      tiempoEvolucion: formData.get('consulta[tiempoEvolucion]'),
      examenFisico: formData.get('consulta[examenFisico]'),
      diagnostico: formData.get('consulta[diagnostico]'),
      planTratamiento: formData.get('consulta[planTratamiento]'),
      notasAdicionales: formData.get('consulta[notasAdicionales]')
    },
    estado: formData.get('estado')
  };

  console.log(data)

  await POST("consultas", data)
  setTimeout(function () {
    window.location.href = `/pacientes/detalle.html?id=${pacienteId}`;
  }, 500); // 2000 milisegundos = 2 segundos

});

document.getElementById('btn-volver').href = `/pacientes/detalle.html?id=${pacienteId}`
