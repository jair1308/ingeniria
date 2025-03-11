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
    $("#PerfilName").append(foundUser.name + ' ' + foundUser.apellidos);

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

    
});