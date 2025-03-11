let correo = localStorage.getItem("emailIngreso") || "";

// Al cargar la página
$(document).ready(function() {    
    mostrarActividades();
    verificarActividadesPendientes();

    // Guardar nueva actividad
    $("#guardar").click(function() {
        let actividad = $("#actividad").val();
        let fecha = $("#fecha").val();
        
        if (actividad === "" || fecha === "") {
            Swal.fire("Error", "Por favor, completa todos los campos", "error");
            return;
        }

        let actividadesPorUsuario = JSON.parse(localStorage.getItem("actividadesPorUsuario")) || {};
        if (!actividadesPorUsuario[correo]) {
            actividadesPorUsuario[correo] = [];
        }

        actividadesPorUsuario[correo].push({ actividad, fecha, progreso: 0 });

        localStorage.setItem("actividadesPorUsuario", JSON.stringify(actividadesPorUsuario));
        
        Swal.fire("Guardado", "Actividad registrada correctamente", "success");
        
        mostrarActividades();
    });

    // Manejo del cambio en el progreso
    $(document).on('change', '.form-check-input', function() {
        let li = $(this).closest('li');
        let progressBar = li.find('.progress-bar');
        let progressValue = parseInt($(this).val());
        let index = li.data("index");

        let actividadesPorUsuario = JSON.parse(localStorage.getItem("actividadesPorUsuario")) || {};
        
        if (actividadesPorUsuario[correo] && actividadesPorUsuario[correo][index]) {
            actividadesPorUsuario[correo][index].progreso = progressValue;
            localStorage.setItem("actividadesPorUsuario", JSON.stringify(actividadesPorUsuario));

            // Actualizar visualmente la barra de progreso
            progressBar.css('width', progressValue + '%')
                       .attr('aria-valuenow', progressValue)
                       .text(progressValue + '%');
        }
    });
});

// Verifica si hay actividades pendientes
function verificarActividadesPendientes() {
    let actividadesPorUsuario = JSON.parse(localStorage.getItem("actividadesPorUsuario")) || {};
    let actividades = actividadesPorUsuario[correo] || [];
    
    if (actividades.length > 0) {
        Swal.fire("Recordatorio", "Tienes actividades pendientes por hacer", "info");
    }
}

// Muestra las actividades en la lista
function mostrarActividades() {
    let lista = $("#lista-actividades");
    lista.empty();

    let actividadesPorUsuario = JSON.parse(localStorage.getItem("actividadesPorUsuario")) || {};
    let actividades = actividadesPorUsuario[correo] || [];

    actividades.forEach((item, index) => {
        let li = $(`
            <li class='list-group-item d-flex flex-column align-items-start' data-index="${index}">
                <div class="d-flex justify-content-between align-items-center w-100">
                    <span>${item.actividad} - ${item.fecha}</span>
                    <button class='btn btn-danger btn-sm' onclick='eliminarActividad(${index})'>Eliminar</button>
                </div>
                <div class="progress mt-2" style="width: 100%;">
                    <div class="progress-bar" role="progressbar" style="width: ${item.progreso || 0}%;" aria-valuenow="${item.progreso || 0}" aria-valuemin="0" aria-valuemax="100">${item.progreso || 0}%</div>
                </div>
                <div class="row mt-2">
                    ${[25, 50, 75, 100].map(value => `
                        <div class="col-3">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="progressRadio${index}" value="${value}" ${item.progreso == value ? 'checked' : ''}>
                                <label class="form-check-label">${value}%</label>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </li>
        `);

        lista.append(li);
    });
}

// Eliminar una actividad
function eliminarActividad(index) {
    let actividadesPorUsuario = JSON.parse(localStorage.getItem("actividadesPorUsuario")) || {};

    if (actividadesPorUsuario[correo]) {
        actividadesPorUsuario[correo].splice(index, 1);
        localStorage.setItem("actividadesPorUsuario", JSON.stringify(actividadesPorUsuario));
        mostrarActividades();
    }
}

// Descargar datos en JSON
function descargarDatos() {
    let actividadesPorUsuario = JSON.parse(localStorage.getItem("actividadesPorUsuario"));
    
    if (!actividadesPorUsuario || !actividadesPorUsuario[correo] || actividadesPorUsuario[correo].length === 0) {
        Swal.fire("Atención", "No hay actividades para descargar", "warning");
        return;
    }

    let datos = JSON.stringify(actividadesPorUsuario[correo], null, 2);
    let blob = new Blob([datos], { type: "application/json" });
    let link = $("<a>");
    link.attr("href", URL.createObjectURL(blob));
    link.attr("download", "actividades.json");
    link[0].click();
}
