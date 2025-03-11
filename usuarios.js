$(document).ready(function () {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    $("#exportar").click(function () {
        if (users.length === 0) {
            Swal.fire("Error", "No hay datos para exportar.", "warning");
            return;
        }

        // Crear nueva lista de usuarios sin 'password'
        let filteredUsers = users.map(({ password, ...rest }) => rest);

        let ws = XLSX.utils.json_to_sheet(filteredUsers);
        let wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Usuarios");
        XLSX.writeFile(wb, "usuarios.xlsx");
    });
    
    // Renderizar usuarios en la tabla
    users.forEach((usuario, index) => {
        let fila = `
            <tr>
                <td>${index + 1}</td>
                <td>${usuario.name}</td>
                <td>${usuario.apellidos}</td>
                <td>${usuario.email}</td>
            </tr>
        `;
        $("#tablaUsuarios tbody").append(fila);
    });

    // Sidebar toggle en móviles
    $("#sidebarToggle").click(function () {
        $("#sidebar").toggleClass("show");
    });

    // Tooltip Bootstrap
    $('[data-bs-toggle="tooltip"]').tooltip();
});
