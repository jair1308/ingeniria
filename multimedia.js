$(document).ready(function() {
    verificarActividadesPendientes();    
    // Toggle del sidebar en móviles
    $("#sidebarToggle").click(function () {
        $("#sidebar").toggleClass("active");
    });
});

// Verifica si hay actividades pendientes con proceso diferente a 100
function verificarActividadesPendientes() {
    let actividadesPorUsuario = JSON.parse(localStorage.getItem("actividadesPorUsuario")) || {};
    let actividades = actividadesPorUsuario[correo] || [];

    // Filtra actividades que tienen un proceso diferente a 100
    let actividadesPendientes = actividades.filter(actividad => actividad.progreso !== 100);

    if (actividadesPendientes.length > 0) {
        Swal.fire("Recordatorio", "Tienes actividades pendientes por hacer", "info");
    }
}