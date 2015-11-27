/**
 *
 *
Características Tanque:
capacidad: 40 Litros
dimensiones: 51 cm x 25.5 de ancho x 30.5 de alto
color: Gris Claro
Nivel agua Máximo: 29 cm

Características Cama:
capacidad: 10 Litros
dimensiones: 51 cm x 25.5 de ancho x 10 de alto
color: Rojo
Nivel agua Máximo: 5 cm
Sustrato: Piedra volcánica
 */

var Tanque = function() {
  this.capacidad = "40 L";
  this.fondo = 51;
  this.ancho = 25.5;
  this.alto = 30.5;
  this.color = "Gris Claro";
  this.nivelAguaMaximo = 29; // cm

  this.dimensiones = function() {
    this.dimensiones =  this.fondo + ' cm x ' + this.ancho + ' cm de ancho x ' + this.alto + ' cm de alto';
  };
}

var Cama = function() {
  this.capacidad = "10 L";
  this.color = "Rojo";
  this.nivelAguaMaximo = 5; // cm
  this.fondo = 51;
  this.ancho = 25.5;
  this.alto = 10;
  this.sustrato = "Piedra volcánica";

  this.dimensiones = function() {
    this.dimensiones = this.fondo + ' cm x ' + this.ancho + ' cm de ancho x ' + this.alto + ' cm de alto';
  };

}
