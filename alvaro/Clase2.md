1 - Quiero saber del total de trenes cuantos hay operativos.
    El formato de la respuesta es *"x de x funcionando hoy"*.

```javascript
    var totalTrenes = 10;
    var totalTrenesHoy = 8;
    console.log(totalTrenesHoy + " de " + totalTrenes + " trenes funcionando hoy.");
```

- Respuesta esperada (consola):

```
    8 de 12 trenes funcionando hoy.
```


2 - Imprimimos por consola el estado de cada tren en movimiento de manera individualizada (sin bucles).

```javascript
    // con for

    for (var trenActual = 1; trenActual <= 8; trenActual++) {
    	console.log("El tren número " + trenActual + " está funcionando");
    };
```

- Respuesta esperada (consola):

```
    El tren numero 1 esta funcionando
    El tren numero 2 esta funcionando
    El tren numero 3 esta funcionando
    El tren numero 4 esta funcionando
    El tren numero 5 esta funcionando
    El tren numero 6 esta funcionando
    El tren numero 7 esta funcionando
    El tren numero 8 esta funcionando
```


3 - Refactoriza... usando *while*.

```javascript
    var trenActual = 0;
    while (trenActual <= 8){
	console.log("El tren número " + trenActual + " está funcionando");
	trenActual++;
    }
```


4 - Refactoriza.. usando *Do... While*.

```javascript
    var trenActual = 0;
    do {
	console.log("El tren número " + trenActual + " está funcionando");
	trenActual++;}	while (trenActual <= 8)
```


5 - Refactoriza.. usando *for*.

```javascript
    for (var trenActual = 1; trenActual <= 8; trenActual++) {
    	console.log("El tren número " + trenActual + " está funcionando");
    };
```
