/**
 * # clase 2
 * ejercicio 7
 */

var trenesOperativos = 8;
var totalTrenes = 12;

function estadoDetalle () {
  var numeroTren = 1;
  while (numeroTren <= trenesOperativos) {
    console.log("El tren numero "+numeroTren+" esta funcionando");
    numeroTren++;
  };
  for(var trenParado = trenesOperativos + 1; trenParado <= totalTrenes; trenParado++) {
    console.log("El tren numero "+trenParado+" esta parado");
  };
};

/**
 * # Clase 3
 * ejercicio 8
 */

function estadoDetalle2()  {
  console.log("%cEjercio 8", "color: blue; font-size: large;");

  for (var i = 1; i <= totalTrenes; i++) {
    if (i > trenesOperativos) {
      console.log('El tren ' + i + ' está parado');
    } else {
      console.log('El tren ' + i + ' está funcionando');
    }
  }
}

estadoDetalle2();

/**
 * # Clase 3
 * 9 - #compliquemos! Servicio nocturno en el tren 10.
 * Nota: Frente al ejercicio anterior, en este caso queremos
 * que siempre que hablemos del tren 10 se especifique que es nocturno.
 * Independientemente de si esta parado o funcionando.
 */

function estadoDetalle3() {
  console.log("%cEjercio 9", "color: blue; font-size: large;");

  for (var i = 1; i <= totalTrenes; i++) {
    if (i > trenesOperativos && i !== 10) {
      console.log('El tren ' + i + ' está parado');
    } else if (i === 10) {
      console.log('%cEl tren ' + i + ' es nocturno', "color: red;");
    } else {
      console.log('El tren ' + i + ' está funcionando');
    }
  }
}

estadoDetalle3();


/**
 * # Clase 3
 * 10 - Refactoricemos - ¿Y si todos los trenes están en las vías
 * funcionando o por el contrario si ninguno de los trenes
 * esta funcionando?.
 */
function estadoDetalle4(estado) {
  console.log("%cEjercio 10", "color: blue; font-size: large;");

  if (trenesOperativos > 0) {
    if (trenesOperativos === totalTrenes) {
      console.log('Todos los trenes están funcionando');
    } else {
      for (var i = 1; i <= totalTrenes; i++) {
        if (i > trenesOperativos && i !== 10) {
          console.log('El tren ' + i + ' está parado');
        } else if (i === 10) {
          console.log('%cEl tren ' + i + ' es nocturno', "color: red;");
        } else {
          console.log('El tren ' + i + ' está funcionando');
        }
      }
    }
  } else {
    console.log('Todos los trenes están parados');
  }

}

estadoDetalle4();


/**
 * # Clase 3
 * 11 - El servicio nocturno se queda un poco corto y necesitamos
 * añadir un nuevo tren de refuerzo. El 12 será destinado a cubrir
 * esta necesidad, exactamente igual que el 10 anteriormente.
 */

function estadoDetalle5() {
  console.log("%cEjercio 11", "color: blue; font-size: large;");

  for (var i = 1; i <= totalTrenes; i++) {
    if (i > trenesOperativos && i !== 10 && i !== 12) {
      console.log('El tren ' + i + ' está parado');
    } else if (i === 10 || i === 12) {
      console.log('%cEl tren ' + i + ' es nocturno', "color: red;");
    } else {
      console.log('El tren ' + i + ' está funcionando');
    }
  }
}

estadoDetalle5();

/**
 * # Clase 3
 * 12 - El departamento de Marketing ha decidido lanzar un nuevo servicio
 * los sábados. El "tren fiestero" será un tren adaptado a un público más
 * intrépido y funcionará solo en los sábados. Este tren será el número 3.
 */

function estadoDetalle6() {
  console.log("%cEjercio 12", "color: blue; font-size: large;");

  var diaSemana = 'Sábado';

  for (var i = 1; i <= totalTrenes; i++) {
    if (i > trenesOperativos && i !== 10 && i !== 12 && i !== 3) {
      console.log('El tren ' + i + ' está parado');
    } else if (i === 3 && diaSemana === 'Sábado') {
      console.log('%cEl tren ' + i + ' ¡¡es fieterooo!!', "color: red;");
    } else {
      console.log('El tren ' + i + ' está funcionando');
    }
  }
}

estadoDetalle6();

/**
 * Imprimamos cada pasajero de la lista y su número de asiento
 * (basado en el orden del índice). Nota: El primer asiento del tren es el 1 y no el 0.
 */
function estadoDetalle7() {
  console.log("%cEjercios 13, 14 y 15", "color: blue; font-size: large;");

  var pasajeros = ["Luis", "Pepe", "Ana", "María", "Juan", "Alicia", "Elena", "Enrique"];
  for (var i = 0, asiento = 1; i < pasajeros.length; i++) {
    console.log('El pasajero ' + pasajeros[i] + ' tiene reservado el asiento ' + asiento);
    asiento++;
  }
}

estadoDetalle7();

/**
 * 16 - Necesitamos una función para agregar y otra para borrar
 * pasajeros de la lista. Nota: Pensemos que a la larga pueden existir más listas.
 */
function agregarPasajeros(pasajeros, nuevosPasajeros) {
  for (var i in nuevosPasajeros) {
    pasajeros.push(nuevosPasajeros[i]);
  }
  return pasajeros;
}

var nuevosPasajeros = agregarPasajeros(["Luis", "Pepe", "Ana", "María", "Juan", "Alicia", "Elena", "Enrique"], ["Patricia", "Sandra", "Azucena", "Jorge"]);
console.log("%cEjercicio 16 (agregar pasajeros)", "color: blue; font-size: large;", nuevosPasajeros);

/**
 * 16 - Necesitamos una función para agregar y otra para borrar
 * pasajeros de la lista. Nota: Pensemos que a la larga pueden existir más listas.
 */

function quitarPasajeros(pasajeros, pasajerosAQuitar) {
  for (var i = 0; i < pasajerosAQuitar.length; i++) {
    if (pasajeros.indexOf(pasajerosAQuitar[i]) !== -1) {
      pasajeros[pasajeros.indexOf(pasajerosAQuitar[i])] = undefined;
    }
  }

  return pasajeros;
}

var nuevosPasajeros2 = quitarPasajeros(nuevosPasajeros, ["Luis", "María", "Patricia"]);
console.log("%cEjercicio 16 y 17 (quitar pasajeros)", "color: blue; font-size: large;", nuevosPasajeros2);

/**
 * 18 - Una de las vías principales esta en obras. Así que nuestra compañía
 * decidió usar antiguas vías para hacer transbordos directos entre las estaciones afectadas.
 * Nuestra Misión es añadir el tiempo estimado en los billetes para las estaciones afectadas
 * Tetuán, Moncloa y Hortaleza. Es necesario incluir un texto informativo y el nombre
 * del usuario también en el billete.
 * Nota: Intenta utilizar Closures
 * Info:
 * - Tetuán (12) - Moncloa (19) - Hortaleza (21)
 */

function addInfo(estacion, tiempo) {
  return function(pasajero) {
    return "Estimado/a " + pasajero + ". El tiempo de espera para la estación de " + estacion + " es de " + tiempo + " minutos";
  }
}

var estacionesAfectadas = [
  { estacion: "Tetúan", tiempo: 12 },
  { estacion: "Moncloa", tiempo: 20 },
  { estacion: "Hortaleza", tiempo: 15 }
];

var infoTetual = addInfo(estacionesAfectadas[0].estacion, estacionesAfectadas[0].tiempo);
var infoMoncloa = addInfo(estacionesAfectadas[1].estacion, estacionesAfectadas[1].tiempo);
var infoHortaleza = addInfo(estacionesAfectadas[2].estacion, estacionesAfectadas[2].tiempo);

console.log( infoTetual("Pepe") );
console.log( infoHortaleza("Luis") );
console.log( infoHortaleza("María") );










