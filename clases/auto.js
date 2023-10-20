"use strict";
var Entidades;
(function (Entidades) {
    class Auto {
        constructor(patente, marca, color, precio) {
            this.patente = patente;
            this.marca = marca;
            this.color = color;
            this.precio = precio;
        }
        ToString() {
            return `"patente": "${this.patente}", "marca": "${this.marca}", "color": "${this.color}", "precio": "${this.precio}"`;
        }
        ToJSON() {
            return "{" + this.ToString() + "}";
        }
    }
    Entidades.Auto = Auto;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=auto.js.map