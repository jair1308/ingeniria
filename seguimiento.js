$(document).ready(function() {    
    mostrarActividades();
    verificarActividadesPendientes();

    $("#guardar").click(function() {
        let actividad = $("#actividad").val();
        let fecha = $("#fecha").val();

        if (actividad === "" || fecha === "") {
            Swal.fire("Error", "Por favor, completa todos los campos", "error");
            return;
        }

        let actividades = JSON.parse(localStorage.getItem("actividades")) || [];
        actividades.push({ actividad, fecha });
        localStorage.setItem("actividades", JSON.stringify(actividades));

        Swal.fire("Guardado", "Actividad registrada correctamente", "success");
        mostrarActividades();
    });
});

function verificarActividadesPendientes() {
    let actividades = JSON.parse(localStorage.getItem("actividades")) || [];
    if (actividades.length > 0) {
        Swal.fire("Recordatorio", "Tienes actividades pendientes por hacer", "info");
    }
}

function mostrarActividades() {
    let lista = $("#lista-actividades");
    lista.empty();
    let actividades = JSON.parse(localStorage.getItem("actividades")) || [];
    
    actividades.forEach((item, index) => {
        let li = $(`<li class='list-group-item d-flex justify-content-between align-items-center'>
                        ${item.actividad} - ${item.fecha}
                        <button class='btn btn-danger btn-sm' onclick='eliminarActividad(${index})'>Eliminar</button>
                    </li>`);
        lista.append(li);
    });
}

function eliminarActividad(index) {
    let actividades = JSON.parse(localStorage.getItem("actividades")) || [];
    actividades.splice(index, 1);
    localStorage.setItem("actividades", JSON.stringify(actividades));
    Swal.fire("Eliminado", "Actividad eliminada correctamente", "success");
    mostrarActividades();
}

function descargarDatos() {
    let actividades = localStorage.getItem("actividades");
    if (!actividades) {
        Swal.fire("Atención", "No hay actividades para descargar", "warning");
        return;
    }
    
    let blob = new Blob([actividades], { type: "application/json" });
    let link = $("<a>");
    link.attr("href", URL.createObjectURL(blob));
    link.attr("download", "actividades.json");
    link[0].click();
}