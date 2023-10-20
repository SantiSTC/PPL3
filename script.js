"use strict";
/// <reference path="./clases/manejadora.ts"/>
window.addEventListener("load", () => {
    var _a, _b, _c, _d, _e, _f;
    (_a = document.getElementById("btn-agregar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", PrimerParcial.Manejadora.AgregarAutoJSON);
    (_b = document.getElementById("btn-mostrar")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", PrimerParcial.Manejadora.MostrarAutosJSON);
    (_c = document.getElementById("btn-verificar")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", PrimerParcial.Manejadora.VerificarAutoJSON);
    (_d = document.getElementById("btn-agregarSinFoto")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", PrimerParcial.Manejadora.AgregarAutoSinFoto);
    (_e = document.getElementById("btn-mostrarbd")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", PrimerParcial.Manejadora.MostrarAutosBD);
    (_f = document.getElementById("btn-modificarSinFoto")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", PrimerParcial.Manejadora.ModificarAutoStatic);
});
//# sourceMappingURL=script.js.map