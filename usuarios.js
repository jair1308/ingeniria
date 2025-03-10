$(document).ready(function() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let correo = localStorage.getItem("emailIngreso");
    if (correo == null) {
        window.location.href = 'login.html';
        return;
    }
    correo = correo.split('"');

    // Toggle del sidebar en móviles
    $("#sidebarToggle").click(function () {
        $("#sidebar").toggleClass("active");
    });
    let foundUser = users.find(user => user.email === correo[1]);
    $("#PerfilName").append(foundUser.name + '' + foundUser.apellidos);

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
    $("#logout").click(function () {
        Swal.fire({
            icon: "info",
            title: "Estas seguro de cerrar sesión?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Confirmar",
            denyButtonText: `Cancelar`
          }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('emailIngreso');
                window.location.href = 'login.html';
            }
          });
        return;
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
