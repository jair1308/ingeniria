$(document).ready(function() {
    // Mostrar mensaje en consola cuando se cambia de pestaña
    $(".nav-link").click(function() {
        $("#resultMessage").text("");
    });

    // Mostrar mensaje en consola cuando se cambia de pestaña
    $("#ingresar").click(function() {
        login();
    });

    // Mostrar mensaje en consola cuando se cambia de pestaña
    $("#loginEmail").keypress(function(e) {
        if (e.which == 13) {
            login();
        }
    });

    $("#loginPassword").keypress(function(e) {
        if (e.which == 13) {
            login();
        }
    });
    
    // Mostrar mensaje en consola cuando se cambia de pestaña
    $("#registrar").click(function() {
        let name = $("#registerName").val();
        let apellidos = $("#registerLastName").val();
        let email = $("#registerEmail").val();
        let password = $("#registerPassword").val();

        if (name == "" || apellidos == "" || email == ""  || password == "") {
            $("#resultMessage").text("❌ Para continuar es neceario que llene todos los campos.").css("color", "red");
            return; // No guarda el usuario si el correo ya existe
        }

        // Obtener el arreglo actual de localStorage o inicializarlo
        let users = JSON.parse(localStorage.getItem("users")) || [];
        // Verificar si el correo ya está registrado
        let existingUser = users.find(user => user.email === email);

        if (existingUser) {
            $("#resultMessage").text("❌ Este correo ya está registrado. Intenta con otro.").css("color", "red");
            return; // No guarda el usuario si el correo ya existe
        }
        // Agregar el nuevo usuario
        users.push({ email, password, name, apellidos });

        // Guardar en localStorage
        localStorage.setItem("users", JSON.stringify(users));

        window.location.reload();
    });
});

function login() {
    let searchEmail = $("#loginEmail").val();
    let searchPassword = $("#loginPassword").val();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Buscar el usuario por email
    let foundUser = users.find(user => user.email === searchEmail);

    // Verificar si el usuario existe y la clave es correcta
    if (foundUser) {
        if (foundUser.password === searchPassword) {
            
            localStorage.setItem("emailIngreso", JSON.stringify(searchEmail));
            window.location.href = 'multimedia.html';
        } else {
            $("#resultMessage").text("❌ Clave incorrecta.").css("color", "red");
        }
    } else {
        $("#resultMessage").text("❌ Correo no encontrado.").css("color", "red");
    }
}
