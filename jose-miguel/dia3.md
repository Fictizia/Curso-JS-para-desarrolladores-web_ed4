# Clase 3

**Ejercicios**

8 - **#simplifiquemos!** Quiero solo un bucle para todo.

```javascript
var trenes = function(trenesFuncionando, totalTrenes) {

    for (var tren = 1; tren <= totalTrenes; tren++) {

        if (tren <= trenesFuncionando ) {
            console.info('El tren numero '+ tren +' esta funcionando');
        } else {
            console.warn('El tren numero '+ tren +' esta parado');
        }

    }

};

trenes(8, 12);
```

9 - **#compliquemos!** Servicio nocturno en el tren 10.
*Nota: Frente al ejercicio anterior, en este caso queremos que siempre que hablemos del
tren 10 se especifique que es nocturno. Independientemente de si esta parado o funcionando.*

```javascript
var trenes = function(trenesFuncionando, trenNocturno, totalTrenes) {

    for (var tren = 1; tren <= totalTrenes; tren++) {

        if (tren <= trenesFuncionando && tren != trenNocturno) {
            console.info('El tren numero '+ tren +' esta funcionando');
        } else if (tren === trenNocturno ) {
            console.warn('El tren numero '+ tren +' es nocturno');
        } else {
            console.warn('El tren numero '+ tren +' esta parado');
        }

    }

};

trenes(8, 10, 12);
```


10 - Refactoricemos - ¿Y si todos los trenes están en las vías funcionando o por el contrario si ninguno de los trenes esta funcionando?.

```javascript
var trenes = function(trenesFuncionando, trenNocturno, totalTrenes) {

    if (trenesFuncionando === totalTrenes) {
      console.info('Todos los trenes estan funcionando');
    } else if (trenesFuncionando === 0) {
      console.warn('Todos los trenes estan parados');
    } else {
        for (var tren = 1; tren <= totalTrenes; tren++) {

            if (tren <= trenesFuncionando && tren != trenNocturno) {
                console.info('El tren numero '+ tren +' esta funcionando');
            } else if (tren === trenNocturno ) {
                console.warn('El tren numero '+ tren +' es nocturno');
            } else {
                console.warn('El tren numero '+ tren +' esta parado');
            }

        }
    }

};

trenes(10, 10, 10);
```

11 - El servicio nocturno se queda un poco corto y necesitamos añadir un nuevo tren de refuerzo.
El 12 será destinado a cubrir esta necesidad, exactamente igual que el 10 anteriormente.

```javascript
var trenes = function(trenesFuncionando, trenNocturno, trenRefuerzo, totalTrenes) {

    if (trenesFuncionando === totalTrenes) {
      console.info('Todos los trenes estan funcionando');
    } else if (trenesFuncionando === 0) {
      console.warn('Todos los trenes estan parados');
    } else {
        for (var tren = 1; tren <= totalTrenes; tren++) {

            if (tren <= trenesFuncionando && tren != trenNocturno && tren != trenRefuerzo) {
                console.info('El tren numero '+ tren +' esta funcionando');
            } else if (tren === trenNocturno ) {
                console.warn('El tren numero '+ tren +' es nocturno');
            } else if (tren === trenRefuerzo ) {
                console.info('El tren numero '+ tren +' es de refuerzo');
            } else {
                console.warn('El tren numero '+ tren +' esta parado');
            }

        }
    }

};

trenes(7, 10, 12, 12);
```


12 - El departamento de Marketing ha decidido lanzar un nuevo servicio los sábados.
 El "tren fiestero" será un tren adaptado a un público más intrépido y funcionará solo en los sábados.
 Este tren será el número 3.

*NOTA: EL TREN 3 SOLO FUNCIONA LOS SÁBADOS. Es necesario incluir el día de la semana en tu código*

```javascript
var trenes = function(trenesFuncionando, trenNocturno, trenRefuerzo, totalTrenes, diaSemana) {

    if (trenesFuncionando === totalTrenes) {
        console.info('Todos los trenes estan funcionando');
    } else if (trenesFuncionando === 0) {
        console.warn('Todos los trenes estan parados');
    } else {
      for (var tren = 1; tren <= totalTrenes; tren++) {

        if (tren <= trenesFuncionando && tren != trenNocturno && tren != trenRefuerzo && tren != 3 && diaSemana != 'S') {
            console.info('El tren numero '+ tren +' esta funcionando');
        } else if (tren === trenNocturno ) {
            console.warn('El tren numero '+ tren +' es nocturno');
        } else if (tren === trenRefuerzo ) {
            console.info('El tren numero '+ tren +' es de refuerzo');
        } else if (tren === 3) {
            if (diaSemana === 's') {
                console.info('El tren numero '+ tren +' es el tren fiestero');
            }
        } else {
            console.warn('El tren numero '+ tren +' esta parado');
        }

      }

    }

};

trenes(7, 10, 12, 12, 's');
```


13 - Hagamos una lista de pasajeros (min. 6)

```javascript
    // ver ejercicio siguiente
```


14 - Hagamos una lista de pasajeros efectiva usando Arrays

```javascript
    var pasajeros = ['Alicia Gutierrez', 'Alfonso Gomez', 'Luis Navarro', 'Oscar Garcia', 'Andres Fernandez', 'Lucia Mellado'];
```


15 - Imprimamos cada pasajero de la lista y su número de asiento (basado en el orden del índice).
*Nota: El primer asiento del tren es el 1 y no el 0.*

```javascript
    var pasajeros = ['Alicia Gutierrez', 'Alfonso Gomez', 'Luis Navarro', 'Oscar Garcia', 'Andres Fernandez', 'Lucia Mellado'];

    var asientos = function(listaPasajeros) {
        for (var pasajero = 0; pasajero < listaPasajeros.length; pasajero++) {

            var asiento = pasajero+1;
            var persona = listaPasajeros[pasajero];

            console.log('El pasajero '+persona+' tiene reservado el asiento '+asiento);
        }
    };

    asientos(pasajeros);
```

- Respuesta esperada (consola):

```
	El pasajero Alicia Gutierrez tiene reservado el asiento 1
	El pasajero Alfonso Gomez tiene reservado el asiento 2
	El pasajero Luis Navarro tiene reservado el asiento 3
	El pasajero Oscar Garcia tiene reservado el asiento 4
	El pasajero Andres Fernandez tiene reservado el asiento 5
	El pasajero Lucia Mellado tiene reservado el asiento 6
```


16 - Necesitamos una función para agregar y otra para borrar pasajeros de la lista.
*Nota: Pensemos que a la larga pueden existir más listas.*

```javascript
// TODO: terminar este ejercicio bien
//
var pasajeros = ['Alicia Gutierrez', 'Alfonso Gomez', 'Luis Navarro', 'Oscar Garcia', 'Andres Fernandez', 'Lucia Mellado'];

var asientos = function(listaPasajeros) {
    for (var pasajero = 0; pasajero < listaPasajeros.length; pasajero++) {

        var asiento = pasajero+1;
        var persona = listaPasajeros[pasajero];

        return console.log('El pasajero '+persona+' tiene reservado el asiento '+asiento);
    }
};

//asientos(pasajeros);

var eliminarPasajero = function(pasajero, lista) {
    return lista.splice(pasajero-1, 1, undefined);
};

var agregarPasajero = function(pasajero, lista) {
    for (var i = 0; i < lista.length; i++) {
        if (lista[i] === undefined) {
            return lista.splice(i, 1, pasajero);
        } else {
            return lista.push(pasajero);
        }
    }
};

eliminarPasajero(2, pasajeros);

agregarPasajero('pepito perez', pasajeros);
agregarPasajero('juanito perez', pasajeros);

console.log(pasajeros);
```


17 - La compañía de trenes ha decidido que los viajeros podrán reservar el asiento asignado, pero quiere evitar que los pasajeros cambien de asiento constantemente cuando se anula un o varios billetes.
*Nota: Al borrar en el ejercicio anterior las posiciones de los pasajeros cambiaban y los billetes quedaban desactualizados.*

```javascript
    // Tu solución
```


18 - Una de las vías principales esta en obras. Así que nuestra compañía decidió usar antiguas vías para hacer transbordos directos entre las estaciones afectadas.

Nuestra Misión es añadir el tiempo estimado en los billetes para las estaciones afectadas Tetuán,
Moncloa y Hortaleza. Es necesario incluir un texto informativo y el nombre del usuario también en el billete.

*Nota: Intenta utilizar Closures*

Info:
	- Tetuán (12)
   	- Moncloa (19)
   	- Hortaleza (21)

```javascript
    // Tu solución
```


19 - Necesitamos saber cuantos pasajeros están utilizando cada una de estas rutas temporales, para ellos la empresa decide añadir un numero de billete para cada pasajero.  El número de billete tiene que seguir una estructura fija.

*Nota: El formato del número de billete deseado:
- (Inicial de la estación)(número de viajero) -> H1 (Hortaleza 1), T120 (Tetuan 120), M110 (Moncloa 110), etc...*

```javascript
    // Tu solución

```


20 - Gracias al ejercicio anterior, hemos podido saber a groso modo cuantos pasajeros van en cada línea.

La empresa considera que con estos datos, usará trenes con menos vagones que le permitirán transportar a los pasajeros en menos tiempo.

Pero existe el riesgo de dejar pasajeros esperando mucho tiempo.

Así que haremos una nueva función que avise al revisor cuando no quede sitio en el próximo tren.

El revisor del tren debe repartir tickets restaurante a los pasajeros para que puedan tomar una consumición gratis en la cafetería de la estación, si no tienen sitio en el próximo tren.

*Nota: La linea es única y el mismo tren cubre todo el trayecto.*

```javascript
    // Tu solución
```