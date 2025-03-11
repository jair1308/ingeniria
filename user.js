$(document).ready(function () {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let correo = localStorage.getItem("emailIngreso");

    if (!correo) {
        window.location.href = 'login.html';
        return;
    }

    correo = correo.replace(/"/g, ''); // Limpiar comillas si las hay
    let foundUser = users.find(user => user.email === correo);

    if (!foundUser) {
        Swal.fire({
            icon: "error",
            title: "Usuario no encontrado",
            text: "Debes iniciar sesión nuevamente.",
        }).then(() => {
            localStorage.removeItem('emailIngreso');
            window.location.href = 'login.html';
        });
        return;
    }

    // Mostrar datos en el formulario
    $("#nameUser").append('<h2>¡Hola! ' + foundUser.name + ' ' + foundUser.apellidos + '</h2>');
    $("#inputEmail").val(foundUser.email);
    $("#inputPassword4").val(foundUser.password);
    $("#inputNombre").val(foundUser.name);
    $("#inputApellidos").val(foundUser.apellidos);
    $("#inputEdad").val(foundUser.edad);
    $("#inputPeso").val(foundUser.peso);
    $("#inputAltura").val(foundUser.altura);
    $("#historial").val(foundUser.historial);

    // Actualizar datos y redirigir a inicio
    $("#update").click(function () {
        let updatedUser = {
            email: $("#inputEmail").val(),
            password: $("#inputPassword4").val(),
            name: $("#inputNombre").val(),
            apellidos: $("#inputApellidos").val(),
            edad: $("#inputEdad").val(),
            peso: $("#inputPeso").val(),
            altura: $("#inputAltura").val(),
            historial: $("#historial").val()
        };

        // Buscar y actualizar usuario en localStorage
        let index = users.findIndex(user => user.email === correo);
        if (index !== -1) {
            users[index] = updatedUser;
            localStorage.setItem("users", JSON.stringify(users));

            Swal.fire({
                icon: "success",
                title: "Datos actualizados",
                text: "Serás redirigido a la página de inicio.",
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
                window.location.href = 'multimedia.html';
            });
        }
    });

    // Cerrar sesión
    $("#logout").click(function () {
        Swal.fire({
            icon: "info",
            title: "¿Estás seguro de cerrar sesión?",
            showDenyButton: true,
            confirmButtonText: "Confirmar",
            denyButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('emailIngreso');
                window.location.href = 'login.html';
            }
        });
    });
});
