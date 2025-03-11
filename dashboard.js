$(document).ready(function() {
    verificarActividadesPendientes();    
    // Toggle del sidebar en móviles
    $("#sidebarToggle").click(function () {
        $("#sidebar").toggleClass("active");
    });
    
    $("#exportar").click(function () {
        // Obtener datos de localStorage
        let datos = localStorage.getItem("users");
        if (!datos) {
            alert("No hay datos en localStorage.");
            return;
        }

        // Convertir a objeto JavaScript
        let jsonData = JSON.parse(datos);

        // Crear hoja de cálculo
        let ws = XLSX.utils.json_to_sheet(jsonData);
        let wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Datos");

        // Exportar archivo Excel
        XLSX.writeFile(wb, "datos.xlsx");
    });

});

function verificarActividadesPendientes() {
    let actividades = JSON.parse(localStorage.getItem("actividades")) || [];
    if (actividades.length > 0) {
        Swal.fire("Recordatorio", "Tienes actividades pendientes por hacer", "info");
    }
}