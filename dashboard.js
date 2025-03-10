$(document).ready(function() {
    let users = JSON.parse(sessionStorage.getItem("users")) || [];
    let correo = sessionStorage.getItem("emailIngreso");
    correo = correo.split('"');

    let foundUser = users.find(user => user.email === correo[1]);

    $("#PerfilName").append(foundUser.name + '' + foundUser.apellidos);

});
