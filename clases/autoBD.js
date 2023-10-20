"use strict";
/// <reference path="./auto.ts"/>
var Entidades;
(function (Entidades) {
    class AutoBD extends Entidades.Auto {
        constructor(patente, marca, color, precio, pathFoto) {
            super(patente, marca, color, precio);
            this.pathFoto = pathFoto;
        }
        ToJSON() {
            let autoString = super.ToString();
            let autoJson = autoString + `, "pathFoto": "${this.pathFoto}`;
            return "{" + autoJson + "}";
        }
    }
    Entidades.AutoBD = AutoBD;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=autoBD.js.map