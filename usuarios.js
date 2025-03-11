$(document).ready(function() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
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

    users.forEach((usuario, index) => {
        let htmlRender = `
            <tr>
                <td>${index + 1}</td>
                <td>${usuario.name}</td>
                <td>${usuario.apellidos}</td>
                <td>${usuario.email}</td>
            </tr>
        `;
    
        $("#tablaUsuarios").append(htmlRender);

    });

});
