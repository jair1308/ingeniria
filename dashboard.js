$(document).ready(function() {
    verificarActividadesPendientes();    
    // Toggle del sidebar en móviles
    $("#sidebarToggle").click(function () {
        $("#sidebar").toggleClass("active");
    });
});

function verificarActividadesPendientes() {
    correo = localStorage.getItem("emailIngreso");
    // Obtener actividades del usuario actual
    let actividadesPorUsuario = JSON.parse(localStorage.getItem("actividadesPorUsuario")) || {};
    let actividades = actividadesPorUsuario[correo] || [];

    // Verificar si hay actividades pendientes
    if (actividades.length > 0) {
        Swal.fire("Recordatorio", "Tienes actividades pendientes por hacer", "info");
    }
}