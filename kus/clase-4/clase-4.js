/**
 * 19 - Necesitamos saber cuantos pasajeros están utilizando
 * cada una de estas rutas temporales, para ellos la empresa
 * decide añadir un numero de billete para cada pasajero.
 * El número de billete tiene que seguir una estructura fija.
 * (Inicial de la estación)(número de viajero) -> H1 (Hortaleza 1), T120 (Tetuan 120), M110 (Moncloa 110)
 */

function addInfo(estacion, tiempo) {
  var billete = estacion.charAt(0);
  var ticketNro = 0;

  return function(pasajero) {
    ticketNro++;
    return "Estimado/a " + pasajero + " con billete " + (billete + ticketNro).toUpperCase() + ". El tiempo de espera para la estación de " + estacion + " es de " + tiempo + " minutos.";
  }
}

var estacionesAfectadas = [
  { estacion: "Tetúan", tiempo: 12 },
  { estacion: "Moncloa", tiempo: 20 },
  { estacion: "Hortaleza", tiempo: 15 }
];

var pasajeros = ["Luis", "Ana", "María", "Eduardo", "David", "Jorge", "Carol", "Óscar"];

var infoTetual = addInfo(estacionesAfectadas[0].estacion, estacionesAfectadas[0].tiempo);
var infoMoncloa = addInfo(estacionesAfectadas[1].estacion, estacionesAfectadas[1].tiempo);
var infoHortaleza = addInfo(estacionesAfectadas[2].estacion, estacionesAfectadas[2].tiempo);

console.log(infoTetual(pasajeros[1]));
console.log(infoTetual(pasajeros[2]));
console.log(infoHortaleza(pasajeros[6]));
console.log(infoHortaleza(pasajeros[2]));
console.log(infoMoncloa(pasajeros[5]));
console.log(infoMoncloa(pasajeros[0]));



