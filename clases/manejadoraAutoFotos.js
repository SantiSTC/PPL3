"use strict";
/// <reference path="./autoBD.ts"/>
/// <reference path="./manejadora.ts"/>
/// <reference path="./node_modules/@types/jquery/index.d.ts">
var PrimerParcial;
(function (PrimerParcial) {
    class ManejadoraAutoFotos {
        static AgregarAutoFotoBD() {
            let ajax = new Ajax();
            let patente = document.getElementById("patente").value;
            let marca = document.getElementById("marca").value;
            let color = document.getElementById("color").value;
            let precio = document.getElementById("precio").value;
            let foto = document.getElementById("foto");
            let form = new FormData();
            form.append("patente", patente);
            form.append("marca", marca);
            form.append("color", color);
            form.append("precio", precio);
            form.append("foto", foto.files[0]);
            ajax.Post("../backend/AgregarAutoBD.php", (resultado) => {
                let retorno = JSON.parse(resultado);
                console.log(retorno.mensaje);
                alert(retorno.mensaje);
                ManejadoraAutoFotos.MostrarAutoFotosBD();
            }, form, ManejadoraAutoFotos.Fail);
        }
        static MostrarAutoFotosBD() {
            let ajax = new Ajax();
            ajax.Get("../backend/listadoAutosBD.php", (resultado) => {
                $("#divTablaAutoFotos").html("");
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
                                <td><img src="../backend/autos/imagenes/${auto.pathFoto}" alt="auto" width="50px" height="50px"></td>
                                <td>
                                <input type="button" value="modificar" data-obj=' ${JSON.stringify(auto)} ' name="modificar">
                                <input type="button" value="eliminar" data-obj='  ${JSON.stringify(auto)} ' data-action="eliminar">
                                </td>
                                </tr>`;
                    });
                    html += '</table>';
                    $("#divTablaAutoFotos").html(html);
                    $('[data-action="eliminar"]').on("click", function () {
                        let objString = $(this).attr("data-obj");
                        console.log(objString);
                        let obj = JSON.parse(objString);
                        (new PrimerParcial.Manejadora()).EliminarAuto(obj);
                    });
                    document.getElementsByName("modificar").forEach((boton) => {
                        boton.addEventListener("click", () => {
                            let obj = boton.getAttribute("data-obj");
                            PrimerParcial.ManejadoraAutoFotos.RellenarInputs(JSON.parse(obj));
                        });
                    });
                }
                else {
                    $("#divTablaAutoFotos").html("<p>No se encontraron autos.</p>");
                }
            });
        }
        Modificar() {
            let ajax = new Ajax();
            let patente = document.getElementById("patente").value;
            let marca = document.getElementById("marca").value;
            let color = document.getElementById("color").value;
            let precio = document.getElementById("precio").value;
            let foto = document.getElementById("imgFoto");
            let pathFoto = foto.src;
            let auto = new Entidades.AutoBD(patente, marca, color, parseInt(precio), pathFoto);
            alert(auto.ToJSON());
            let form = new FormData();
            form.append("auto_json", auto.ToJSON());
            ajax.Post("../backend/modificarAutoBD.php", (resultado) => {
                alert(resultado);
                let retorno = JSON.parse(resultado);
                PrimerParcial.Manejadora.MostrarAutosBD();
                console.log(retorno.mensaje);
                alert(retorno.mensaje);
            }, form, ManejadoraAutoFotos.Fail);
        }
        static RellenarInputs(autoJSON) {
            document.getElementById("patente").value = autoJSON.patente;
            document.getElementById("marca").value = autoJSON.marca;
            document.getElementById("color").value = autoJSON.color;
            document.getElementById("precio").value = autoJSON.precio;
            document.getElementById("imgFoto").src = autoJSON.pathFoto;
            document.getElementById("imgFoto").style.display = "block";
        }
        static ModificarAutoFotoStatic() {
            (new ManejadoraAutoFotos).Modificar();
        }
        static Fail(retorno) {
            console.error(retorno);
            alert("Ha ocurrido un ERROR.");
        }
    }
    PrimerParcial.ManejadoraAutoFotos = ManejadoraAutoFotos;
})(PrimerParcial || (PrimerParcial = {}));
//# sourceMappingURL=manejadoraAutoFotos.js.map