/// <reference path="./auto.ts"/>
/// <reference path="./autoBD.ts"/>
/// <reference path="./ajax.ts"/>
/// <reference path="./IParte2.ts"/>
/// <reference path="./node_modules/@types/jquery/index.d.ts">

namespace PrimerParcial {
    export class Manejadora implements IParte2{
        static AgregarAutoJSON(){
            let ajax = new Ajax();

            let patente = (<HTMLInputElement>document.getElementById("patente")).value;
            let marca = (<HTMLInputElement>document.getElementById("marca")).value;
            let color = (<HTMLInputElement>document.getElementById("color")).value;
            let precio = (<HTMLInputElement>document.getElementById("precio")).value;

            let form = new FormData();
            form.append("patente", patente);
            form.append("marca", marca);
            form.append("color", color);
            form.append("precio", precio);

            ajax.Post("../backend/altaAutoJSON.php", (resultado: string)=>{
                let retorno = JSON.parse(resultado);

                console.log(retorno.mensaje);
                alert(retorno.mensaje);
            }, form, Manejadora.Fail);
        }

        static MostrarAutosJSON(){
            let ajax = new Ajax();

            ajax.Get("../backend/listadoAutosJSON.php", (resultado: any)=>{

                let div = (<HTMLInputElement>document.getElementById("divTabla"));
                div.textContent = "";
                console.clear();
                console.log(resultado);

                let autos = JSON.parse(resultado);

                if(autos !== null)
                {
                    let tabla = "<table><thead><tr><th>Patente</th><th>Marca</th><th>Color</th><th>Precio</th><th>Acciones</th></tr></thead><tbody>";

                    for(let auto of autos)
                    {
                        tabla += '<tr><td>' + auto.patente + '</td><td>' + auto.marca + '</td><td>' + `<input = type="color" value=${auto.color} disabled></input>` + '</td><td>' + auto.precio + '</td>'; 
                    }

                    tabla += "</tbody></table>";
                    div.innerHTML = tabla;
                }
            });
        }

        static VerificarAutoJSON(){
            let ajax = new Ajax();

            let patente = (<HTMLInputElement>document.getElementById("patente")).value;

            let form = new FormData();
            form.append("patente", patente);

            ajax.Post("../backend/verificarAutoJSON.php", (resultado: string)=>{
                let retorno = JSON.parse(resultado);

                console.log(retorno.mensaje);
                alert(retorno.mensaje);
            }, form, Manejadora.Fail);
        }

        static AgregarAutoSinFoto(){
            let ajax = new Ajax();
            let header = [{"key": "content-type", "value": "application/json"}];

            let patente = (<HTMLInputElement>document.getElementById("patente")).value;
            let marca = (<HTMLInputElement>document.getElementById("marca")).value;
            let color = (<HTMLInputElement>document.getElementById("color")).value;
            let precio = (<HTMLInputElement>document.getElementById("precio")).value;

            let auto = new Entidades.Auto(patente, marca, color, parseInt(precio));

            let form = new FormData();
            form.append("auto_json", auto.ToJSON());

            ajax.Post("../backend/agregarAutoSinFoto.php", (resultado: string)=>{
                let retorno = JSON.parse(resultado);

                console.log(retorno.mensaje);
                alert(retorno.mensaje);
            }, form, Manejadora.Fail);
        }

        static MostrarAutosBD(){
            let ajax = new Ajax();

            ajax.Get("../backend/listadoAutosBD.php", (resultado: string)=>{
                $("#divTabla").html("");

                if (resultado.length > 0) {
                    console.log(resultado);
                    let autos: Array<{ patente: string, marca: string, color: string, precio: number, pathFoto: string }> = JSON.parse(resultado);
                    let html = '<h1>Listado de autos</h1>';
                    html += '<table>';
                    html += '<thead><th>Patente</th><th>Marca</th><th>Color</th><th>Precio</th><th>Foto</th></thead>';
                    autos.forEach((auto : { patente: string, marca: string, color: string, precio: number, pathFoto: string }) => {
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

                    $("#divTabla").html(html);
            
                    $('[data-action="eliminar"]').on("click", function(){
                        let objString:any = $(this).attr("data-obj");
                        console.log(objString);
                        let obj = JSON.parse(objString);
                        (new Manejadora()).EliminarAuto(obj);
                    });

                    document.getElementsByName("modificar").forEach((boton)=>{
                        boton.addEventListener("click", ()=>{
                            let obj : any = boton.getAttribute("data-obj");
                            Manejadora.RellenarInputs(JSON.parse(obj));
                        })
                    });
                    
                } else {
                    $("#divTabla").html("<p>No se encontraron usuarios.</p>");
                }
            });
        }

        EliminarAuto(autoJSON : any) :void {
            let confirmacion = confirm(`¿Desea eliminar el neumático?\nPatente: ${autoJSON.patente}\nMarca: ${autoJSON.marca}`);

            if(confirmacion){
                let form = new FormData();
                form.append("auto_json", JSON.stringify(autoJSON));

                $.ajax({
                    type:"POST",
                    url: "../backend/eliminarAutoBD.php",
                    dataType: "text",
                    cache: false,
                    contentType: false, 
                    processData: false, 
                    data: form
                })
                .done((mensaje:any)=>{
                    alert(mensaje);
                    $("#btn-mostrarbd").click();
                });
            }
        }

        ModificarAuto() :void {
            let ajax = new Ajax();

            let patente = (<HTMLInputElement>document.getElementById("patente")).value;
            let marca = (<HTMLInputElement>document.getElementById("marca")).value;
            let color = (<HTMLInputElement>document.getElementById("color")).value;
            let precio = (<HTMLInputElement>document.getElementById("precio")).value;

            let auto = new Entidades.Auto(patente, marca, color, parseInt(precio));

            let form = new FormData();
            form.append("auto_json", auto.ToJSON());

            ajax.Post("../backend/modificarAutoBD.php", (resultado: string)=>{
                alert(resultado);
                let retorno = JSON.parse(resultado);

                Manejadora.MostrarAutosBD();

                console.log(retorno.mensaje);
                alert(retorno.mensaje);
            }, form, Manejadora.Fail);
        }

        private static RellenarInputs(autoJSON : any) :void {
            (<HTMLInputElement>document.getElementById("patente")).value = autoJSON.patente;
            (<HTMLInputElement>document.getElementById("marca")).value = autoJSON.marca;
            (<HTMLInputElement>document.getElementById("color")).value = autoJSON.color;
            (<HTMLInputElement>document.getElementById("precio")).value = autoJSON.precio;
        }

        static ModificarAutoStatic() :void {
            (new Manejadora).ModificarAuto();
        }
        private static Fail(retorno:string):void 
        {
            console.error(retorno);
            alert("Ha ocurrido un ERROR.");
        }
    }
}