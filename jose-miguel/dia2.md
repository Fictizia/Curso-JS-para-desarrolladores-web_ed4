# Clase 2

**Ejercicios**
> Vamos a crear un sistema de control para el metro. Nuestro objetivo será desarrollar una aplicación para gestionarlo todo. Con este ejercicio nos centraremos en aplicar conceptos básicos de JavaScript

![Foto de trenes](http://estaticos04.elmundo.es/elmundo/imagenes/2010/06/29/1277838432_0.jpg)

1 - Quiero saber del total de trenes cuantos hay operativos.
    El formato de la respuesta es *"x de x funcionando hoy"*.

```javascript
    var trenes = function(tren, totalTrenes) {
        return console.log(tren +' de ' + totalTrenes + ' trenes funcionando hoy.');
    };

    trenes(8, 12);
```

- Respuesta esperada (consola):

```
    8 de 12 trenes funcionando hoy.
```


2 - Imprimimos por consola el estado de cada tren en movimiento de manera individualizada (sin bucles).

```javascript
    var trenFuncionando = function(tren) {
        return console.log('El tren numero '+ tren +' esta funcionando');
    };

    trenFuncionando(1);
    trenFuncionando(2);
    trenFuncionando(3);
    trenFuncionando(4);
    trenFuncionando(5);
    trenFuncionando(6);
    trenFuncionando(7);
    trenFuncionando(8);
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
    var tren = 1;
    var totalTrenes = 8;

    while (tren <= totalTrenes) {
        console.log('El tren numero '+ tren +' esta funcionando');
        tren++;
    }
```


4 - Refactoriza.. usando *Do... While*.

```javascript
    // Tu solución
```


5 - Refactoriza.. usando *for*.

```javascript
    var totalTrenes = 8;

    for (var i = 1; i <= totalTrenes; i++) {
        console.log('El tren numero '+ i +' esta funcionando');
    }
```



6 - Del total de trenes... ¿cuantos tengo parados?

```javascript
    ver ejercicio 7
```

- Respuesta esperada (consola):

```
    El tren numero 9 esta parado
    El tren numero 10 esta parado
    El tren numero 11 esta parado
    El tren numero 12 esta parado
```


7 - Refactoricemos y juntemos los dos bucles dentro de una misma función. Así se imprime por consola tanto los trenes que estan funcionanado como los que estan parados

```javascript
    var trenes = function(trenesFuncionando, totalTrenes) {

        for (var i = 1; i <= trenesFuncionando; i++) {
          console.info('El tren numero '+ i +' esta funcionando');
        }

        for (var trenesParados = trenesFuncionando+1; trenesParados <= totalTrenes; trenesParados++) {
          console.warn('El tren numero '+ trenesParados +' esta parado');
        }

    };

    trenes(8, 12);
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
    El tren numero 9 esta parado
    El tren numero 10 esta parado
    El tren numero 11 esta parado
    El tren numero 12 esta parado
```
