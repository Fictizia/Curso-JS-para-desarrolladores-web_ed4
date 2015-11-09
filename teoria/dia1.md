# Clase 1

### C9.io

**Creamos una cuenta y un workespace con referencia a nuestro repositorio de GitHub**
- [c9.io](https://c9.io/)

**Configurando GitHub**

- [Setup Git and basic commands](http://git-scm.com/book/es/v1/Empezando-Configurando-Git-por-primera-vez)

* Setup `git: git config remote.origin.push HEAD`.
 * `git config --global user.name "John Doe"`.
 * `git config --global user.email johndoe@example.com`.
* Git commands: `git status, git add, git rm, git pull, git commit -m "Commit message", git push`.

### Git y Github

Podéis encontrar todo el material de apoyo en este enlace

**Introducción**

[Como trabajar con Git](http://nvie.com/img/git-model@2x.png)
![Como trabajar con Git](http://nvie.com/img/git-model@2x.png)

[Diversos Entornos](http://www.rittmanmead.com/wp-content/uploads/2013/01/NewImage1.png)
![Diversos Entornos](http://www.rittmanmead.com/wp-content/uploads/2013/01/NewImage1.png)


**Instalación**

Instalamos [Git - Source Code Management](http://git-scm.com/)

Comprobamos la instalación

```
git --version
```


**Bienvenidos a la maquina del tiempo**
- Arquitectura de Árbol(working area, staging Area, Repository)
- Auditoria de código (quien? cuando? y que?)
- Git trabaja en binario (imagenes, docs, etc...)
- Git no guarda una copia de cada version, solo los cambios.
- Distribución (Repositorios y Clones)
- Opensource y funciona offline
- Consola vs. GUI



**Trabajando en Local**

Configuración (entornos):

[Repositorios locales y remotos](http://media.tumblr.com/tumblr_lbnpoxYtNm1qaku05.png)
![Repositorios locales y remotos](http://media.tumblr.com/tumblr_lbnpoxYtNm1qaku05.png)

- System (todos los usuarios)
    - git config --system
    - etc/gitconfig, /usr/local/git/etc/gitconfig

- Global (mi usuario)
    - git config --global
    - .gitconfig (usuario/root)

- Project (proyecto)
    - git config
    - /proyect/.git/config


**Comandos básicos**

versión
```
git --version
```

Grabando Nombre
```
git config --global user.name "nombre"
```

Comprobando el nombre
```
git config --global user.name
```

Grabando Email
```
git config --global user.email "email"
```

Habilitando colores
```
git config --global color.ui true
```

Ver usuarios en el equipo
```
git config --global --list
```


**GIT Working flow (local) - Básico**

- help (ayuda)

    - Ayuda general
    ```
    git config --global --list
    ```

    - Ayuda especifica
    ```
    git help push
    ```

    - Salir de la ayuda
    ```
    q (quit)
    ```

- init (arranque)
    - Buscamos la carpeta (ls, dir...)
    - Arrancando Git
    ```
    git init
    ```

- status
    - Verificar estado
    ```
    git status
    ```

- add
    - Añadiendo todo
    ```
    git add -A
    ```

    - Añadiendo todo *(como add -A, pero omite los archivos fuera de track)*
    ```
    git add .
    ```

    - Añadiendo un archivo especifico
    ```
    git add loquesea
    ```

- commit
    - Comentando el commit
    ```
    git commit -m "Mi primer commit"
    ```

- log
    - Verificando el estado de los commits
    ```
    git log
    ```

- reset (Reseteamos el proyecto hasta un punto dado (SIN RETORNO!))
    - No afecta al working area ni al Stagging Area, solo al repositorio
    ```
    git reset --soft NUMEROCOMMIT
    ```

    - No afecta al working area
    ```
    git reset --mixed NUMEROCOMMIT
    ```

    - Afecta a todos los niveles incluido el working area
    ```
    git reset --hard NUMEROCOMMIT
    ```

    - En caso de necesitar recuperación.
      Haz un reset --hard hacia delante, con el número del útimo commit.
      ```
      git reset --hard ULTIMOCOMMIT
      ```

    - Devolver un archivo de staging a working area
    ```
    git reset HEAD nombrearchivo
    ```    


**GIT Working flow (local) - Viajar en el tiempo**

- log
    - Hacemos una copia de seguridad de nuestros commits.
    ```
    git log > miscommits.txt
    ```

- checkout

    - Abrimos la maquina de tiempo
    ```
    git checkout NUMEROCOMMIT
    ```

    - Volvemos a Master
    ```
    git checkout master
    ```


**GIT Working flow (local) - Ramas (Branches)**

Ramas (Universos Paralelos)
*Línea master -> linea estable o principal.*
*Lineas secundarias -> lineas de desarrollo, bugs, experimentos, etc...*

- branch

    - Crear una rama
    ```
    git branch NOMBRERAMA
    ```

    - Ver ramas
    ```
    git branch
    ```    

    - Cambiar de rama
    ```
    git checkout NOMBRERAMA
    ```  

    - Ver cambios en formato ramas
    ```
    git log --oneline --graph --all
    ```  

    - Borrar una rama
    ```
    git branch -d NOMBRERAMA
    ```


**GIT Working flow (local) - Fusiones (básico)**

- Nos situamos en la rama que absorberá (principal)
    ```
    git checkout RAMAPRINCIAL
    ```

- Hacemos el *merge*
    ```
    git merge RAMASECUNDARIA
    ```

- Añadir comentario (o)

- Guardar y salir (:x)

- Ramas fusionadas
    ```
    git branch
    ```

- Borramos rama
    ```
    git branch -d NOMBRERAMA
    ```


**GIT Working flow (local) - Fusiones (gestión conflictos)**

  - Fast-forward (automatizado). No hay conflicto alguno.

    - Nos situamos en la rama que absorberá (principal)
    ```
    git checkout RAMAPRINCIAL
    ```

    - Hacemos el MERGE
    ```
    git merge RAMASECUNDARIA
    ```

    - Añadir comentario (o)

    - Guardar y salir (:x)


  - Manual Merge (Conflicto, dos personas tocaron los mismos archivos)

    - Nos situamos en la rama que absorberá (principal)
    ```
    git checkout RAMAPRINCIAL
    ```

    - Hacemos el MERGE
    ```
    git merge RAMASECUNDARIA
    ```

    - En consola
    ```
    Auto-merging CARPETA/ARCHIVO
    CONFLICT (content): Merge conflict in CARPETA/ARCHIVO
    Automatic merge failed; fix conflicts and then commit the result.
    ```

    - En el editor
    ```
    <<<<<<< HEAD
    hello world....!!!!!!!
    =======
    hello world 2 ..!!!
    >>>>>>> conflictiva
    ```

    - Resuelver y guardar
    ```
    hello world 2 ..!!!
    ```

    - Comprobamos el estado
    ```
    git status
    ```

    - commit para la resolución conflicto
    ```
    git commit -am "con este commit se arregla el conflicto"
    ```

    - Resultado
    ```
    *   81a6c1d con este commit se arregla el conflicto
    |\  
    | * 64b5518 que pasa
    * | 29a6348 ahora conflcito..no
    |/  
    * afe16ae Todo arriba..
    * 7c9cc50 Mi primer Commit
    ```

    - Borramos la rama (opcional)
    ```
    git branch -d NOMBRERAMA
    ```


**GITHUB Working flow (básico)**
  - clone
    - Clonar un proyecto ( [Bootstrap](https://github.com/twbs/bootstrap) )
    ```
    git clone https://github.com/twbs/bootstrap.git
    ```

  - log
    - Mirar los commits
    ```
    git log
    ```    


**GITHUB Working flow (Proyecto desde cero)**

  - Creamos los ficheros

  - init
    - monitorizamos los ficheros
    ```
    git init
    ```

  - commit
    - Añadimos los ficheros en un commit
    ```
    git commit -am "Mi primer proyecto"
    ```

  - remote
    - Enlazamos con Github
    ```
    git remote add origin <--HTTPoSSH-->
    ```

    - Comprobamos los detalles
    ```
    git remote -v
    ```

  - push
    - Mandamos los cambios
    ```
    git push origin master
    ```

**GITHUB Working flow (Proyecto en equipo)**
El proceso es igual, pero es necesario mantenerse sincronizado.

  - fetch
    - Actualizar *origin/master* (rama espejo en local)
    ```
    git fetch origin
    ```

  - merge
    - Fusionar *master* con *origin/master*
    ```
    git merge origin/master
    ```

  - commit
    - Preparamos un *commit* para subir un cambio a Github
    ```
    git commit -am "Nuevo cambio"
    ```

  - push
    - Subimos los cambios
    ```
    git push origin master
    ```


**GITHUB Working flow (Proyectos de terceros)**
*Usamos 2 repositorios (ORIGINAL EXTERNO (upstream/master) -> CLON ORIGINAL (origin/master) -> CLON LOCAL)*

  - remote
    - Conectamos al fork (origin)
    ```
    git remote add origin <--- HTTP --->
    ```

    - Verificamos la conexión
    ```
    git remote -v
    ```

    - Conectamos al remoto *(Upstream)*
    ```
    git remote add upstream HTTTPREPO-UPS
    ```

    - Verificamos que tenemos dos enlaces *(origin y upstream)*
    ```
    git remote -v
    ```

  - fetch
    - Comprobamos cambios en *origin*
    ```
    git fetch origin
    ```

    - Comprobamos cambios con *upstream*
    ```
    git fetch upstream
    ```

  - merge
    - Fusionamos *upstream* con local para actualizarnos
    ```
    git merge upstream/master
    ```

  - push
    - Subimos cambios a *origin*
    ```
    git push origin master
    ```

  - Subimos cambios al *upstream (pull-request)*



**GITHUB Working flow (GitHub Pages Manual)**
GitHub Pages nos permite hacer una web estática para nuestro usuario o proyectos

  - clone
    - Clonamos el repositorio
    ```
    git rclone <-- URL.git -->
    ```

  - checkout --orphan
    - Creamos una rama huérfana
    ```
    git checkout --orphan gh-pages
    ```

  - rm
    - Borramos todos los archivos del directorio
    ```
    git rm --rf .
    ```

  - add
    - Creamos nuestro index.html y lo añadimos
    ```
    echo "Bienvenido a gh-pages" > index.html
    git add index.html
    ```

  - commit
    - Preparamos un commit para subir el index a Github
    ```
    git commit -am "Nuevo cambio"
    ```

  - push
    - Subimos el cambio
    ```
    git push origin gh-pages
    ```


**GITHUB Avanzado (Trucos)**


  - branch
    - Renombrar rama
    ```
    git branch -m NOMBRERAMA NOMBRERAMANUEVO
    ```

    - Mostrando todas las ramas (incluido espejos)
    ```
    git branch -a
    ```

  - add + commit
    - am
    ```
    git commit -am "Texto"
    ```

  - config
    - Usando un alias
    ```
    git config --global alias.NOMBREALIAS 'COMANDO'
    git config --global alias.buenlog 'log --oneline --graph --all'
    git buenlog
    ```

  - pull
    - fecht + merge
    ```
    git pull
    ```

  - diff
    - Ver lo que has modificado pero aún no has preparado
    ```
    git diff
    ```

    - Ver los cambios que has preparado y que irán en tu próxima confirmación
    ```
    git diff --cached
    ```

**Resumen**
![Trabajar con Git/Github](http://www.geekgumbo.com/wp-content/uploads/2011/08/nvie-git-workflow-commands.png)
[tamaño original](http://www.geekgumbo.com/wp-content/uploads/2011/08/nvie-git-workflow-commands.png)


### Reintroducción a JS

**Modo Estricto**
> El modo estricto hace varios cambios en la semántica normal de JavaScript. Primero, modo estricto elimina algunos errores silenciosos de JavaScript cambiando a que lance los errores. Segundo, modo estricto corrige errores que hacen que sea difícil para los motores de JavaScript para realizar optimizaciones: código de modo estricto a veces se puede hacer para correr más rápido que el código idéntico que no es estricto. Tercero, el modo estricto prohíbe sintaxis que es probable que sea definida en futuras versiones de ECMAScript.
> - [Mozilla](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Modo_estricto)


En resumen:
- Detectaremos más errores
- Mejora la interpretación, lo que aumenta la velocidad de ejecucción.
- Previene que usemos sintaxis de futuras versiones de ECMAScript.

Aplicándolo a todo nuestro código

```javascript
// ./script.js
(function() {
  "use strict";

  // Nuestro código

})();
```

Aplicándolo solo en parte del código
```javascript
// ./script.js
function estricta(){
  'use strict';
  function anidada() {
      return "Yo también!";
  }
  return "Hola! Soy una función en modo estricto!  " + anidada();
}

function noEstricta() {
    return "yo no soy una función estricta.";
}
```

Algunos ejemplos:

- Error: Usar variables u objetos sin declararlos antes.

```javascript
    function estricto(){
        'use strict';
        pi = 3.14;
        console.log(pi);
    }
```

- Error: Borrar variables, objetos o funciones. 

```javascript
    function estricto(){
        'use strict';
        pi = 3.14;
        delete pi
    }
```

- Error: Duplicar parámetros

```javascript
    function estricto(){
        'use strict';
        function x (p1, p1){
            // código
        }
    }
```

- Error: Al usar carácteres escapados
 
```javascript
    function estricto(){
        'use strict';
        var x = \010; 
    }
```

Error: Al usar *writable:false*

```javascript
    function estricto(){
        'use strict';
        var obj = {};
        Object.defineProperty(obj, "x", {value:0, writable:false});
        obj.x = 3.14;
    }
```

Error: Al usar *with* 

```javascript
    function estricto(){
        'use strict';
        with (Math){x = cos(2)};
    }
```

Error: Al usar *eval()* por seguridad

```javascript
    function estricto(){
        'use strict';
        eval ("var x = 2");
        console.log(x);
    }
```



Otras palabras reservadas en modo estricto:
- implements
- interface
- let
- package
- private
- protected
- public
- static
- yield


**Variables**

- No se pueden usar espacios
```javascript
var con espacios = 1;
```

- No usar un número delante
```javascript
var 1numero = 1;
```

- Válidos, pero no recomendado
```javascript
var con_guiones_bajos = 1;
var dame$ = 1;
```

- Válidos, es mejor usar [camelCase](https://es.wikipedia.org/wiki/CamelCase)
```javascript
var otraOpcion = 1;
var opcionCon123123 = 1;
```


**Tipos de variables**

Operador *typeof* y su [especificación](http://www.ecma-international.org/ecma-262/5.1/#sec-11.4.3)

- [x] Undefined
```javascript
typeof undefined
typeof noDefinido
typeof tampocoCreado
```

- [x] Object
```javascript
typeof null
typeof [15, 4]
typeof new Date()
typeof {a:1}
```

- [x] Boolean
```javascript
typeof false
typeof true
typeof Boolean(false)
```

- [x] Number
```javascript
typeof 3
typeof 3.14
typeof NaN
typeof Infinity
```

- [x] String
```javascript
typeof "hola"
```

- [x] Function
```javascript
typeof function(){}
typeof class C {}
```

- [x] Symbol (ECMA6)

> Ahora tenemos los símbolos, nuevo tipo de datos que sirve como identificador único para atributos de objetos
> [EcmaScript 6: Símbolos](http://miguelsr.js.org/2015/08/20/es6-symbols.html) de [Miguel Sánchez](http://miguelsr.js.org/about/)

```javascript
typeof Symbol()
typeof Symbol('simbolo')
```


**Matemáticas Básicas**
```javascript
var suma = 5 + 4;
var resta = 10 - 6;
var multiplicacion = 3 * 3;
var division = 6 / 2;
var modulo = 43 % 10;

function calcular (operacion) {
    console.log(operacion);
};
```

**Matemáticas Básicas (Agrupando operaciones)**
```javascript
var expresion1 = (3 + 7) * 10;
var expresion2 = (-56 * 6) - 74 * -25;
var expresion3 = (3 * 3) + 10 - 12 / 2;
var expresion4 = 44 + (83 % (33 + 100));
var expresion5 = -145 + (500 / 10 - 5) + 10 * 10 ;

function calcular (operacion) {
    console.log(operacion);
};
```


**While**

- Estructura:
    ```javascript
    /*  --while--
    while (-algo verdadero-) {
        -ejecutamos este dódigo-
    };
    */
    ```

- Documentación:
    - [While en w3schools](http://www.w3schools.com/js/js_loop_while.asp)
    - [While en MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while)

- Bucle infinito:
    Este es un error muy común.

    ```javascript
    while (true) {
        console.log("Este texto se imprime hasta el infinito...");
    };
    ```

- Bucle que no se ejecutará:
    ```javascript
    while (false) {
        console.log("Este texto jamas se imprimirá...");
    };
    ```

- Ejemplo:
    ```javascript
    var control = 1;
    while (control <= 10) {
        console.log(control);
        control++;
    };
    ```


**For**

- Estructura:
    ```javascript
    /*  --for--
    for (-inicializando-; -algo verdadero-; -ejecutar al terminar cada bucle-) {
        -ejecutamos este código-
    };
    */
    ```

- Documentación:
    - [For en w3schools](http://www.w3schools.com/js/js_loop_for.asp)
    - [For en MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)
    - [Dominando el rendimiento](https://web.archive.org/web/20141205235948/https://blogs.oracle.com/greimer/entry/best_way_to_code_a)


- Ejemplo:
    ```javascript
    for (var i = 0; i < 10; i++) {
        console.log(i);
    }
    ```


**Do... While**

- Estructura:
    ```javascript
    /* --Do...while--
    do{
       -Ejecutamos este código-
    } while (-Algo verdadero-);
    */
    ```

- Documentación:
    - [Do... While en w3schools](http://www.w3schools.com/js/js_loop_while.asp)
    - [Do... While en MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while)

- Ejemplo:
    ```javascript
    var i = 0;
    do {
       i++;
       console.log(i);
   } while (i < 10);
    ```

- Al menos se ejecutará una vez, aunque la premisa no sea verdadera.

    ```javascript
    do{
       console.warn("me ejecuto")
    } while (false);
    ```


**Ejercicios**
> Vamos a crear un sistema de control para el metro. Nuestro objetivo será desarrollar una aplicación para gestionarlo todo. Con este ejercicio nos centraremos en aplicar conceptos básicos de JavaScript

![Foto de trenes](http://estaticos04.elmundo.es/elmundo/imagenes/2010/06/29/1277838432_0.jpg)

1 - Quiero saber del total de trenes cuantos hay operativos.
    El formato de la respuesta es *"x de x funcionando hoy"*.

```javascript
    // Tu solución
```

- Respuesta esperada (consola):

```
    8 de 12 trenes funcionando hoy.
```


2 - Imprimimos por consola el estado de cada tren en movimiento de manera individualizada (sin bucles).

```javascript
    // Tu solución
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
    // Tu solución
```


4 - Refactoriza.. usando *Do... While*.

```javascript
    // Tu solución
```


5 - Refactoriza.. usando *for*.

```javascript
    // Tu solución
```


**Trabajando con números**

- NaN:
    ```javascript
    console.log(0/0);
    ```

- Infinity:
    ```javascript
    console.log(100/0);
    ```

- .toFixed() limitar decimales:
    ```javascript
    var numero = 1.3453456467;
    console.log(numero.toFixed(3));
    ```


**Comparadores**

```javascript
var mayorQue = 100 > 10;
var menorQue = 10 < 100;
var mayorIgual = 100 >= 10;
var menorIgual = 10 <= 100;
var igual = 10 == 10;
var igualTotalmente = 10 === 10;
var noIgual = 100 != 10;

function comparar (dato) {
    console.log(dato);
};
```


**Cadenas**

```javascript
var yoVeo = "Yo soy de las personas que ven";
var vasoLleno = "vaso medio lleno";
var vasoVacio = "vaso medio vacío";
```

- Concatenando (Uniendo Cadenas):
    ```javascript
    var frasePositiva = yoVeo + " el " + vasoLleno;
    var fraseNegativa = yoVeo + " el " + vasoVacio;

    function imprimir ( texto) {
        console.log( texto );
    };
    ```

- Imprimir con estilo por consola:
    ```javascript
    function imprimirBonito (texto) {
        console.log (guiones);
        console.log (texto);
        console.log (iguales);
    };

    var guiones = "---------------------"
    var iguales = "====================="
    ```

- Caracteres especiales:
    ```javascript
    /*
    \t -> Tabulador
    \' -> Comillas Simples
    \" -> Comillas Dobles
    \\ -> \
    \n -> Salto de línea
    */

    function caracteresDemo () {
    console.log("Hasta aquí... todo correcto. Ahora vamos a \"tabular\":\tves? Ya estamos más lejos.\n\'Otra linea ;-)\'")
    };
    ```


**Consola**

- Niveles:
Nota: la mayoría de consolas nos permitiran el filtrado por tipo.
    - .log:
    ```javascript
        console.log("Hola en formato clásico");
    ```
    
    - .info:
    ```javascript
        console.info("Hola en formato informativo");
    ```
    
    - .warn:
    ```javascript
        console.warn("Hola en formato alerta");
    ```

    - .error:
    ```javascript
        console.error("Hola en formato error");
    ```
    
    - .debug:
    ```javascript
        console.debug("Hola en formato debug");
    ```

- Formateadores:
    - *%o* para estrcuturas del DOM
    ```javascript
        var parrafos = document.getElementsByTagName("p");
        console.log("DOM: %o", parrafos);
    ```
    
    - *%O* para objectos JS
    ```javascript    
        var objeto = {"nombre":"Yo","Apellido":"Mismo"};
        console.log("DOM: %O", objeto);
    ```

- Agrupación:

```javascript
    console.group("bucleFor");
    for(var i=100; i>0; i--){
        console.info("Iteración numero %i", i)
    }
    console.groupEnd();
```


**Manejo de cadenas**

- .lenght:
    ```javascript
    var amigo = "un amigo";
    var amigos = "un amigo, dos amigos, tres amigos...";

    function comparadorCadenas (cadena1, cadena2){
        console.log((cadena1.length>cadena2.length)+", "+cadena1+" no es mayor que "+cadena2);
    };
    ```

- .concat():
    ```javascript
    var amigo = "un amigo";
    var amigos = amigo.concat(", dos amigos, tres amigos...");
    ```

- .toLowerCase():
    ```javascript
    var amigo = "UN Amigo";
    var amigos = amigo.toLowerCase().concat(", dos amigos, tres amigos...");
    ```

- .charAt():
    ```javascript
    var amigo = "un amigo";
    var amigos = "un amigo, dos amigos, tres amigos...";
    function dimeCaracter ( variable, numero){
        console.log(variable.charAt(numero));
    };
    ```

- .indexOf():
    ```javascript
    var amigo = "un amigo";
    var amigos = "un amigo, dos amigos, tres amigos...";

    function localizaCaracter ( variable, caracter){
        console.log(variable.indexOf(caracter));
    };
    ```

- .substring(inicio, final):
    ```javascript
    var amigo = "un amigo";
    var amigos = "un amigo, dos amigos, tres amigos...";

    var dosAmigos = amigos.substring(10, 20);
    var tresAmigos = amigos.substring(22);
    ```


**Jugando con variables**

```javascript
var empezoComo3 = 3;
era3();

empezoComo3 = 35;
era3();

empezoComo3 = empezoComo3 + 30;
era3();

empezoComo3 += 4;
era3();

empezoComo3++;
era3();

empezoComo3 -= 12;
era3();

empezoComo3--;
era3();

empezoComo3 *= 10;
era3();

empezoComo3 /= 11;
era3();

empezoComo3 += "texto";
era3();

empezoComo3 += 20;
era3();

empezoComo3++;
era3();


function era3 () {
    console.log("empezoComo3 debería ser 3, ahora su valor es " + empezoComo3);
};
```


**Ejercicios**

6 - Del total de trenes... ¿cuantos tengo parados?

```javascript
    // Tu solución
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
    // Tu solución
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
