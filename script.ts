/// <reference path="./clases/manejadora.ts"/>

window.addEventListener("load", ()=>{
    document.getElementById("btn-agregar")?.addEventListener("click", PrimerParcial.Manejadora.AgregarAutoJSON);
    document.getElementById("btn-mostrar")?.addEventListener("click", PrimerParcial.Manejadora.MostrarAutosJSON);
    document.getElementById("btn-verificar")?.addEventListener("click", PrimerParcial.Manejadora.VerificarAutoJSON);
    document.getElementById("btn-agregarSinFoto")?.addEventListener("click", PrimerParcial.Manejadora.AgregarAutoSinFoto);
    document.getElementById("btn-mostrarbd")?.addEventListener("click", PrimerParcial.Manejadora.MostrarAutosBD);
});