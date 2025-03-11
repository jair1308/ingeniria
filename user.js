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
    //$("#PerfilName").append(foundUser.name + ' ' + foundUser.apellidos);
    $("#nameUser").append('<h2>¡Hola! '+foundUser.name + ' ' + foundUser.apellidos+'</h2>');
    
    $("#inputEmail").val(foundUser.email);

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


    $('.form-check-input').change(function() {
        let checkedBoxes = $('.form-check-input:checked');
        
        if (checkedBoxes.length > 0) {
            let lastChecked = checkedBoxes.last().siblings('label').text().trim();
            let progressValue = parseInt(lastChecked);
            $('.progress-bar').css('width', progressValue + '%')
                              .attr('aria-valuenow', progressValue)
                              .text(progressValue + '%');
        } else {
            $('.progress-bar').css('width', '0%')
                              .attr('aria-valuenow', 0)
                              .text('0%');
        }
    });
});