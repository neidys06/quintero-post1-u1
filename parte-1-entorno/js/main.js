// main.js — Funcionalidad básica del laboratorio

// Registrar cuando la página terminó de cargar
document.addEventListener("DOMContentLoaded", () => {
  console.log("Página cargada:", new Date().toLocaleTimeString());
  console.log("Título del documento:", document.title);
  console.log("Secciones encontradas:",
    document.querySelectorAll("section").length);
});