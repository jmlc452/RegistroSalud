import { verHistorial } from "../historias/mostrarHistorias.js";
import { openHistoriaForm } from "../historias/historiaForm.js";
import { renderDatosPaciente } from "./renderDatos.js";
import { GET } from "../helpers/apiRest.JS";

// Obtener el parámetro 'id' de la URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
renderDatosPaciente(await GET(`pacientes/${id}`));
verHistorial(id)
