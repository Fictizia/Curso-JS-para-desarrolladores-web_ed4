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
  console.log("%cEjercio 13", "color: blue; font-size: large;");

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



