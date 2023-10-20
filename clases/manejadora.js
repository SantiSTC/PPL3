"use strict";
/// <reference path="./auto.ts"/>
/// <reference path="./autoBD.ts"/>
/// <reference path="./ajax.ts"/>
var PrimerParcial;
(function (PrimerParcial) {
    class Manejadora {
        static AgregarAutoJSON() {
            let ajax = new Ajax();
            let header = [{ "key": "content-type", "value": "application/json" }];
            let patente = document.getElementById("patente").value;
            let marca = document.getElementById("marca").value;
            let color = document.getElementById("color").value;
            let precio = document.getElementById("precio").value;
            let form = new FormData();
            form.append("patente", patente);
            form.append("marca", marca);
            form.append("color", color);
            form.append("precio", precio);
            ajax.Post("../backend/altaAutoJSON.php", (resultado) => {
                let retorno = JSON.parse(resultado);
                console.log(retorno.mensaje);
                alert(retorno.mensaje);
            }, form, Manejadora.Fail);
        }
        static MostrarAutosJSON() {
            let ajax = new Ajax();
            ajax.Get("../backend/listadoAutosJSON.php", (resultado) => {
                let div = document.getElementById("divTabla");
                div.textContent = "";
                console.clear();
                console.log(resultado);
                let autos = JSON.parse(resultado);
                if (autos !== null) {
                    let tabla = "<table><thead><tr><th>Patente</th><th>Marca</th><th>Color</th><th>Precio</th><th>Acciones</th></tr></thead><tbody>";
                    for (let auto of autos) {
                        tabla += '<tr><td>' + auto.patente + '</td><td>' + auto.marca + '</td><td>' + `<input = type="color" value=${auto.color} disabled></input>` + '</td><td>' + auto.precio + '</td>';
                    }
                    tabla += "</tbody></table>";
                    div.innerHTML = tabla;
                }
            });
        }
        static VerificarAutoJSON() {
            let ajax = new Ajax();
            let patente = document.getElementById("patente").value;
            let form = new FormData();
            form.append("patente", patente);
            ajax.Post("../backend/verificarAutoJSON.php", (resultado) => {
                let retorno = JSON.parse(resultado);
                console.log(retorno.mensaje);
                alert(retorno.mensaje);
            }, form, Manejadora.Fail);
        }
        static AgregarAutoSinFoto() {
            let ajax = new Ajax();
            let header = [{ "key": "content-type", "value": "application/json" }];
            let patente = document.getElementById("patente").value;
            let marca = document.getElementById("marca").value;
            let color = document.getElementById("color").value;
            let precio = document.getElementById("precio").value;
            let auto = new Entidades.Auto(patente, marca, color, parseInt(precio));
            let form = new FormData();
            form.append("auto_json", auto.ToJSON());
            ajax.Post("../backend/agregarAutoSinFoto.php", (resultado) => {
                let retorno = JSON.parse(resultado);
                console.log(retorno.mensaje);
                alert(retorno.mensaje);
            }, form, Manejadora.Fail);
        }
        static MostrarAutosBD() {
            let ajax = new Ajax();
            ajax.Get("../backend/listadoAutosBD.php", (resultado) => {
                $("#divTabla").html("");
                if (resultado.length > 0) {
                    console.log(resultado);
                    let autos = JSON.parse(resultado);
                    let html = '<h1>Listado de autos</h1>';
                    html += '<table>';
                    html += '<thead><th>Patente</th><th>Marca</th><th>Color</th><th>Precio</th><th>Foto</th></thead>';
                    autos.forEach((auto) => {
                        html += `<tr>
                                <td>${auto.patente}</td>
                                <td>${auto.marca}</td>
                                <td>${auto.color}</td>
                                <td>${auto.precio}</td>
                                <td><img src="./backend/autos/imagenes/${auto.pathFoto}" alt="auto" width="50px" height="50px"></td>
                                </tr>`;
                    });
                    html += '</table>';
                    $("#divTabla").html(html);
                    $('[data-action="modificar"]').on("click", function () {
                        let objString = $(this).attr("data-obj");
                        let obj = JSON.parse(objString);
                        console.log(obj);
                        $("#id").val(obj.id);
                        $("#nombre").val(obj.nombre);
                        $("#correo").val(obj.correo);
                        $("#clave").val(obj.clave);
                        $("#cboPerfiles").val(obj.id_perfil);
                    });
                    $('[data-action="eliminar"]').on("click", function () {
                        let objString = $(this).attr("data-obj");
                        let obj = JSON.parse(objString);
                        let form = new FormData();
                        form.append("id", obj.id);
                        $.ajax({
                            type: "POST",
                            url: "./backend/EliminarUsuario.php",
                            dataType: "text",
                            cache: false,
                            contentType: false,
                            processData: false,
                            data: form
                        })
                            .done((mensaje) => {
                            alert(mensaje);
                            $("#btnMostrar").click();
                        });
                    });
                }
                else {
                    // Manejar el caso en el que no se obtuvieron datos
                    $("#divTabla").html("<p>No se encontraron usuarios.</p>");
                }
            });
        }
        static Fail(retorno) {
            console.error(retorno);
            alert("Ha ocurrido un ERROR.");
        }
    }
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {}));
//# sourceMappingURL=manejadora.js.map