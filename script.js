$(document).ready(function() {
    console.log("jQuery está funcionando");

    // Mostrar mensaje en consola cuando se cambia de pestaña
    $(".nav-link").click(function() {
        $("#resultMessage").text("");
    });

    // Mostrar mensaje en consola cuando se cambia de pestaña
    $("#ingresar").click(function() {
        let searchEmail = $("#loginEmail").val();
        let searchPassword = $("#loginPassword").val();

        let users = JSON.parse(sessionStorage.getItem("users")) || [];

        // Buscar el usuario por email
        let foundUser = users.find(user => user.email === searchEmail);

        // Verificar si el usuario existe y la clave es correcta
        if (foundUser) {
            if (foundUser.password === searchPassword) {
                
                sessionStorage.setItem("emailIngreso", JSON.stringify(searchEmail));
                window.location.href = 'dashboard_inicial.html';
            } else {
                $("#resultMessage").text("❌ Clave incorrecta.").css("color", "red");
            }
        } else {
            $("#resultMessage").text("❌ Correo no encontrado.").css("color", "red");
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

        // Obtener el arreglo actual de sessionStorage o inicializarlo
        let users = JSON.parse(sessionStorage.getItem("users")) || [];
        // Verificar si el correo ya está registrado
        let existingUser = users.find(user => user.email === email);

        if (existingUser) {
            $("#resultMessage").text("❌ Este correo ya está registrado. Intenta con otro.").css("color", "red");
            return; // No guarda el usuario si el correo ya existe
        }
        // Agregar el nuevo usuario
        users.push({ email, password, name, apellidos });

        // Guardar en sessionStorage
        sessionStorage.setItem("users", JSON.stringify(users));

        window.location.reload();
    });

    // Validación básica de formularios antes de enviar
    $("form").submit(function(event) {
        let valid = true;
        $(this).find("input").each(function() {
            if ($(this).val().trim() === "") {
                $(this).addClass("is-invalid");
                valid = false;
            } else {
                $(this).removeClass("is-invalid");
            }
        });

        if (!valid) {
            event.preventDefault(); // Evita que el formulario se envíe si hay campos vacíos
            alert("Por favor, completa todos los campos.");
        }
    });
});
