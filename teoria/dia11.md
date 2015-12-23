
### Iterator

> El patrón surge del deseo de acceder a los elementos de un contenedor de objetos (por ejemplo, una lista) sin exponer su representación interna. Además, es posible que se necesite más de una forma de recorrer la estructura siendo para ello necesario crear modificaciones en la clase.

> La solución que propone el patrón es añadir métodos que permitan recorrer la estructura sin referenciar explícitamente su representación. La responsabilidad del recorrido se traslada a un objeto iterador.

> El problema de introducir este objeto iterador reside en que los clientes necesitan conocer la estructura para crear el iterador apropiado. *[Wikipedia](https://www.wikiwand.com/es/Iterador_(patr%C3%B3n_de_dise%C3%B1o))*

- **Claves:**
	- Acceso secuencial a los elementos de un array o propiedades de un objeto sin exponerlos.

- **Array:**
```javascript
// Patrón Iterador
var iterador = (function() {

  var indice = 0,
      datos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      totalDatos = datos.length;

  return {
      siguiente: function() {
          var elemento;
          if (!this.tieneSiguiente()) {
              return null;
          }
          elemento = datos[indice];
          indice ++;
          return elemento;
      },
      tieneSiguiente: function() {
          return indice < totalDatos;
      },
      rebobinar: function() {
          indice = 0;
          return datos[indice];
      },
      actual: function() {
          return datos[indice];
      }
  };

}());

/* Probando
while(iterador.tieneSiguiente()) {  
    console.log(iterador.siguiente());
}

iterador.rebobinar();  
console.log(iterador.actual());  
*/
```

- **Objeto:**
```javascript
var iterador = (function() {

  var indice = 0,
      datos = { primerDato: 1, segundoDato: 'dos', tercerDato: 'tercero' },
      llaves = Object.keys(datos),
      totalDatos = llaves.length;

  return {
      siguiente: function() {
          var elemento;
          if (!this.tieneSiguiente()) {
              return null;
          }
          elemento = datos[llaves[indice]];
          indice ++;
          return elemento;
      },
      tieneSiguiente: function() {
          return indice < totalDatos;
      },
      rebobinar: function() {
          indice = 0;
          return datos[llaves[indice]];
      },
      actual: function() {
          return datos[llaves[indice]];
      }
  };

}());

/* Probando
while(iterador.tieneSiguiente()) {  
    console.log(iterador.siguiente());
}

iterador.rebobinar();  
console.log(iterador.actual());  
*/ 
```

### Façade

> Se aplicará el patrón fachada cuando se necesite proporcionar una interfaz simple para un subsistema complejo, o cuando se quiera estructurar varios subsistemas en capas, ya que las fachadas serían el punto de entrada a cada nivel. Otro escenario proclive para su aplicación surge de la necesidad de desacoplar un sistema de sus clientes y de otros subsistemas, haciéndolo más independiente, portable y reutilizable (esto es, reduciendo dependencias entre los subsistemas y los clientes). *[Wikipedia](https://www.wikiwand.com/es/Facade_(patr%C3%B3n_de_dise%C3%B1o))*

- **Claves:**
	- Creación de interfaces de alto nivel.
	- Muy usado en librerías
	- Oculta el código más complejo
	- Desacoplarnos de código externo

```javascript	
var moduloRobotAutonomo = (function() {
 
    var _privado = {
        velocidad: 0,  // Km/h
        velocidadMax: 20, // Km/h
        velocidadMin: 2, // Km/h

        // ... más propiedades relativos a sensores, navegación, etc...
        
        velocidadActual: function() {
            console.log( "Velocidad Actual:" + _privado.velocidad);
        },
        ajustarVelocidad: function( valor ) {
            this.velocidad = valor;
        },
        acelerar: function() {
          if (_privado.velocidad >= _privado.velocidadMax ) {
            console.warn("Máxima velocidad Alcanzada!");
            _privado.velocidadActual();
          } else if (_privado.velocidad < _privado.velocidadMax){
              _privado.ajustarVelocidad (_privado.velocidad+1)
              _privado.velocidadActual();
          };
        },
        desacelerar: function() {
          if (_privado.velocidad <= _privado.velocidadMin ) {
            console.warn("Mínima velocidad Alcanzada!");
            _privado.velocidadActual();
          } else if (_privado.velocidad > _privado.velocidadMin){
              _privado.ajustarVelocidad (_privado.velocidad-1)
              _privado.velocidadActual();
          };
        },
        parar: function(){
          _privado.velocidad = 0;
          console.log("Robot parado");
        },
        validarVelocidad: function (valor) {
          if( valor <= _privado.velocidadMax && valor >= _privado.velocidadMin ){
            return true
          }else {
            return false
          }  
        }
		
		// más métodos relativos a sensores, navegación, etc...
    };
 
    return {
        facadeAPI: {
          velocidadCrucero: function(valor){
            if(_privado.validarVelocidad(valor)){
              _privado.ajustarVelocidad(valor);
              _privado.velocidadActual();
            }else{
              console.warn("La velocidad deseada "+valor+"Km/h no esta entre "+_privado.velocidadMin+"Km/h y los "+_privado.velocidadMax+"Km/h. permitidos" )
            }
          },
          masLento: _privado.desacelerar,
          masRapido: _privado.acelerar,
          stop:_privado.parar
        } 
    };
}());
 
/* Jugando con el robot
var robot = moduloRobotAutonomo.facadeAPI;
robot.velocidadCrucero(20); // velocidad = 20
robot.masRapido(); // Max alcanzado
robot.stop(); // Parado
robot.masLento(); // Min alcanzado
*/
```

### Mediator

> Habitualmente un programa está compuesto de un número de clases (muchas veces elevado). La lógica y computación es distribuida entre esas clases. Sin embargo, cuantas más clases son desarrolladas en un programa, especialmente durante mantenimiento y/o refactorización, el problema de comunicación entre estas clases quizás llegue a ser más complejo. Esto hace que el programa sea más difícil de leer y mantener. Además, puede llegar a ser difícil cambiar el programa, ya que cualquier cambio podría afectar código en muchas otras clases.

> Con el patrón mediador, la comunicación entre objetos es encapsulada con un objeto mediador. Los objetos no se comunican de forma directa entre ellos, en lugar de ello se comunican mediante el mediador. Esto reduce las dependencias entre los objetos en comunicación, reduciendo entonces la Dependencia de código. *[Wikipedia](https://www.wikiwand.com/es/Mediator_(patr%C3%B3n_de_dise%C3%B1o))*

- Claves:
	- Una interfaz única - Objeto central.
	- Todos los módulos comunican con este módulo central.

```javascript
	// Patron de Mediador
	var moduloCentral = (function(){

	    var _temas = {};

	    var _suscribir = function( tema, fn ){
	        if ( !_temas[tema] ){
	            _temas[tema] = [];
	        }
	        _temas[tema].push( { context: this, callback: fn } );
	        return this;
	    };

	    var _publicar = function( tema ){
	        var args;
	        if ( !_temas[tema] ){
	            return false;
	        }
	        args = Array.prototype.slice.call( arguments, 1 );
	        for ( var i = 0, l = _temas[tema].length; i < l; i++ ) {
	            var subscription = _temas[tema][i];
	            subscription.callback.apply( subscription.context, args );
	        }
	        return this;
	    };

	    return {
	        verTemas: _temas,
	        publicar: _publicar,
	        suscribir: _suscribir,
	        instalarEn: function( obj ){
	            obj.suscribir = _suscribir;
	            obj.publicar = _publicar;
	        }
	    };

	}());

	// Creamos dos Objetos
	var modulo1 = {};
	var modulo2 = {};
	console.clear();

	// Instalamos ...
	moduloCentral.instalarEn(modulo1);
	moduloCentral.instalarEn(modulo2);

	// Ajustamos las suscripciones
	modulo1.suscribir("test", function(){
	    console.info("\"modulo1\" suscrito a \"test\". Callback disparado! ")
	});

	modulo2.suscribir("test2", function(){
	    console.info("\"modulo2\" suscrito a \"test2\". Callback disparado! ")
	});

	moduloCentral.suscribir("testCentral", function(){
	    console.info("\"moduloCentral\" suscrito a \"testCentral\". Callback disparado! ")
	});

	// Suscripciones extra...
	moduloCentral.suscribir("test", function(){
	    console.info("\"moduloCentral\" suscrito a \"test\". Callback disparado! ")
	});
	moduloCentral.suscribir("test2", function(){
	    console.info("\"moduloCentral\" suscrito a \"test2\". Callback disparado! ")
	});
	console.clear();

	// Disparamos las publicaciones
	modulo2.publicar("testCentral");
	modulo2.publicar("test2");
	modulo2.publicar("test");

	modulo1.publicar("testCentral");
	modulo1.publicar("test2");
	modulo1.publicar("test");

	moduloCentral.publicar("testCentral");
	moduloCentral.publicar("test2");
	moduloCentral.publicar("test");
```

### Mixins

> En los lenguajes de programación orientada a objetos, un mixin es una clase que ofrece cierta funcionalidad para ser heredada por una subclase, pero no está ideada para ser autónoma. Heredar de un mixin no es una forma de especialización sino más bien un medio de obtener funcionalidad. Una subclase puede incluso escoger heredar gran parte o el total de su funcionalidad heredando de uno o más mixins mediante herencia múltiple.

> Un mixin puede aplazar la definición y la vinculación de métodos hasta el tiempo de ejecución, aunque los atributos y los parámetros de instanciación siguen siendo definidos en tiempo de compilación. [Wikipedia](https://www.wikiwand.com/es/Mixin)

```javascript
    var Perro = function(nombre) {
        this.nombre = nombre  || "Sin nombre aún"
        this.patas = 4;
        this.ojos = 2;
    };
    
    // Mixin 1
    var PerroGuia = function() {};
    
    PerroGuia.prototype = {
        guiar: function() {
            console.log("Te estoy guiando...");
        }
    };
    
    // Mixin 2
    var PerroSuperPoderes = function() {};
    
    PerroSuperPoderes.prototype = {
    	perseguir: function() {
            console.log("Te estoy persiguiendo....");
        },
        rastrear: function() {
            console.log("Te estoy rastreando...");
        },
        camuflar: function() {
            console.log("Ya no me ves...");
        },
        conducir: function() {
            console.log("Ahora... estoy conduciendo!");
        }
    };
    
    // Mixin 3
    var PastorAleman = function () {};
    
    PastorAleman.prototype = {
        colorLengua: "negra",
        colorOjos: "marrón",
        capacidadTrabajo: true,
        especialidad: "Pastoreo"
    };
    
    
    function extender(claseReceptora, claseDonante) {
        // solo extendemos los metodos que pasamos por parametros
        if (arguments[2]) {
            for (var i = 2, len = arguments.length; i < len; i++) {
                claseReceptora.prototype[arguments[i]] = claseDonante.prototype[arguments[i]];
            }
        }
        // extendemos todos los metodos
        else {
            for (var nombreMetodo in claseDonante.prototype) {
                // comprobamos que ya no existiese un metodo llamado igual
                if (!claseReceptora.prototype[nombreMetodo]) {
                    claseReceptora.prototype[nombreMetodo] = claseDonante.prototype[nombreMetodo];
                }
            }
        }
    }
    
    // Extendemos todos los metodos
    extender(Perro, PerroGuia);
    extender(Perro, PastorAleman);
    
    // Extendemos solo conducir
    extender(Perro, PerroSuperPoderes, "conducir");
    
    var miPerroGuia = new Perro("K9");
    
    // utilizamos los metodos heredados
    console.log("Nombre: "+miPerroGuia.nombre+"\nNúmero patas: "+miPerroGuia.patas+"\n Número ojos: "+miPerroGuia.ojos+"\n Color Lengua: "+miPerroGuia.colorLengua+"\n Color ojos: "+miPerroGuia.colorOjos+"\n Capacidad de trabajo: "+miPerroGuia.capacidadTrabajo+"\n Especialidad: "+miPerroGuia.especialidad);
    miPerroGuia.guiar();
    miPerroGuia.conducir();
```

### Observer

> Definir una dependencia uno-a-muchos entre objetos, de tal forma que cuando el objeto cambie de estado, todos sus objetos dependientes sean notificados automáticamente. Se trata de desacoplar la clase de los objetos clientes del objeto, aumentando la modularidad del lenguaje, creando las mínimas dependencias y evitando bucles de actualización (espera activa o polling). En definitiva, normalmente, usaremos el patrón Observador cuando un elemento “quiere” estar pendiente de otro, sin tener que estar encuestando de forma permanente si éste ha cambiado o no.

> El patrón Observer es la clave del patrón de arquitectura Modelo Vista Controlador (MVC). *[Wikipedia](https://www.wikiwand.com/es/Observer_(patr%C3%B3n_de_dise%C3%B1o))*

```javascript
    var objetoPrincipal = {
        observadores: [],
        
        suscripcion: function(f) {
            this.observadores.push(f);
        },
        
        eliminarSuscripcion: function(f) {
            this.observadores = this.observadores.filter(
                function(observador) {
                    if (observador !== f) {
                        return observador;
                    }
                }
            );
        },
     
        mensaje: function(o, objeto) {
            var ambito = objeto || window;
            this.observadores.forEach(function(observador) {
                observador.call(ambito, o);
            });
        }
    }
    
    var otraFuncion1 = function(item) { 
        console.info(item + " desde otraFuncion1"); 
    };
    
    function otraFuncion2(item) { 
        console.info(item + " desde otraFuncion2");  
    };
    
    // Pruebas
    objetoPrincipal.mensaje('mensaje #1');
    
    objetoPrincipal.suscripcion(otraFuncion1);
    objetoPrincipal.suscripcion(otraFuncion2);
    objetoPrincipal.mensaje('mensaje #2');
    
    objetoPrincipal.eliminarSuscripcion(otraFuncion2);
    objetoPrincipal.mensaje('mensaje #2');
    
    objetoPrincipal.suscripcion(otraFuncion2);
    objetoPrincipal.mensaje('mensaje #3');
```

### Chain of Responsability

> El patrón de diseño Chain of Responsibility es un patrón de comportamiento que evita acoplar el emisor de una petición a su receptor dando a más de un objeto la posibilidad de responder a una petición. Para ello, se encadenan los receptores y pasa la petición a través de la cadena hasta que es procesada por algún objeto. Este patrón es utilizado a menudo en el contexto de las interfaces gráficas de usuario donde un objeto puede contener varios objetos. Según si el ambiente de ventanas genera eventos, los objetos los manejan o los pasan. [Wikipedia](https://www.wikiwand.com/es/Chain_of_Responsibility_(patr%C3%B3n_de_dise%C3%B1o))

```javascript
    var Peticion = function(cantidad) {
        this.cantidad = cantidad;
        logger.registra("Pedido: " + cantidad + "€\n");
    }
     
    Peticion.prototype = {
        get: function(valorMoneda) {
            var cuenta = Math.floor(this.cantidad / valorMoneda);
            this.cantidad -= cuenta * valorMoneda;
    
    		if(cuenta !== 0){
    	        if(valorMoneda < 5 ) {
    				logger.registra("Facilita un total de " + cuenta + " monedas de " + valorMoneda + "€");
    	        } else {
    	        	logger.registra("Facilita un total de " + cuenta + " billetes de " + valorMoneda + "€");
    	        }
    		}
    
            return this;
        }
    }
    
    var logger = (function() {
        var registro = "";
        return {
            registra: function(mensaje) { registro += mensaje + "\n"; },
            resumen: function() { 
            	console.log(registro); 
            	registro = ""; 
            }
        }
    })();
     
    function calcularBilletes(cantidad) {
        var peticion = new Peticion(cantidad);
     
        peticion.get(500).get(200).get(100).get(50).get(20).get(10).get(5) // Billetes
        		.get(2).get(1).get(0.50).get(0.20).get(0.10).get(0.05).get(0.02).get(0.01); // Monedas
     
        logger.resumen();
    }
    
    calcularBilletes(443.79);
```

**Ejercicios**

1 - Incorpora el patron *Chain of responsability* al cajero automatico para indicar los billetes y monedas facilitadas por la maquina cuando se retira efectivo

- [Solución](https://github.com/UlisesGascon/curso-js-web-developers-112015/tree/master/otros/cajero_chain)

2 - Refactoriza la aplicación de las películas:
- Objetivos:
  - Encapsular todo el código
  - Controlar la interacción con eventos
  - Estructurar el código de una manera eficiente

- [Solución](https://github.com/UlisesGascon/curso-js-web-developers-112015/tree/master/otros/moviefire_patrones)

### Underscore

![underscore_logo](http://underscorejs.org/docs/images/underscore.png)

- [Underscore](http://underscorejs.org/#)
- [ECMA5 Soporte](http://kangax.github.io/compat-table/es5/)

- **Collections**

  - *_.where* Bucando dentro...
  ```javascript         
    var listaContactos = [
      {nombre:'Luis' , trabajo:'Full-stack', edad:25},
      {nombre:'David', trabajo:'Front-end', edad:33},
      {nombre:'Leon'  , trabajo:'Front-end', edad:52},
      {nombre:'Paula', trabajo:'Dev-ops', edad:35},
      {nombre:'Oscar' , trabajo:'Full-stack', edad:31},
      {nombre:'Marina', trabajo:'Back-end', edad:28},
      {nombre:'Pablo', trabajo:'Full-stack' , edad:29},
      {nombre:'Maria', trabajo:'Front-end' , edad:32}
      ];
    var amigosFullStack = _.where(listaContactos, {trabajo: 'Full-stack'});
  ```
  - *_.sortBy* Ordenar por...
  ```javascript
    var amigosFullStack = [
      {nombre:'Luis' , trabajo:'Full-stack', edad:25},
      {nombre:'Oscar' , trabajo:'Full-stack', edad:31},
      {nombre:'Pablo', trabajo:'Full-stack' , edad:29}
    ];
  
    var FiltradoAmigosFullStack = _.sortBy(amigosFullStack,function (amigo){ 
      return amigo.edad;
    });
     
  ```    

- **Arrays**
  - *_.zip* Alinea Arrays manteniendo la posición
  ```javascript
    _.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]);
    // [["moe", 30, true], ["larry", 40, false], ["curly", 50, false]]
  ```
  - *_.unzip* Lo opuesto a *_.zip*
  ```javascript
    _.unzip([['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]])
    // ["moe", 30, true], ["larry", 40, false], ["curly", 50, false]
  ```  
  - *_.difference* Devuelve los valores que NO estan en otros arrays
  ```javascript
    _.difference([1,2,3,4,5,6,7], [5,2,10]);
    // [1, 3, 4]
  ```
  - *_.uniq* Devuelve los valores únicos de un array
  ```javascript
    _.unique([1, 2, 1, 4, 1, 3])
    // [1, 2, 4, 3]
  ```
  - *_.range* Creamos una lista de números enteros
  ```javascript
    // _.range([inicio], parada, [paso]) 
    _.range(5);
    // [0, 1, 2, 3, 4, 5]
    _.range(1, 5);
    // [1, 2, 3, 4, 5]
    _.range(0, 20, 5);
    // [0, 5, 10, 15]
    _.range(0, -10, -1);
    // [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
  ```

- **Funciones**
  - *_.memoize* Cacheo de funciones...
  ```javascript
    var fibonacci = _.memoize(function(n) {
      return n < 2 ? n: fibonacci(n - 1) + fibonacci(n - 2);
    });  
  ```
  - *_.throttle* Retorna una función que se ejecuta periodicamente
  ```javascript
    var throttled = _.throttle(updatePosition, 100);
    $(window).scroll(throttled);
  ```
  - *_.once* Retorna una función que se ejecuta una vez
  ```javascript  
    var initialize = _.once(createApplication);
    initialize();
    initialize();
  ```    
  - *_.compose* Una cadena de funciones que toman como parametros el retorno de la funcion anterior
  ```javascript
    var greet    = function(name){ return "hi: " + name; };
    var exclaim  = function(statement){ return statement.toUpperCase() + "!"; };
    var welcome = _.compose(greet, exclaim);
    welcome('moe');
    // 'hi: MOE!'
  ```    

- **Objetos**
  - *_.omit* Retorna una copia "filtrada"...
  ```javascript
    _.omit({name: 'moe', age: 50, userid: 'moe1'}, 'userid');
    // {name: 'moe', age: 50}
  ```  
  - *_.has* Verificamos si existe dentro del objeto...
  ```javascript 
    _.has({a: 1, b: 2, c: 3}, "b");
    //true
  ```
  - *_.extend* Crea una copia de un objeto a otro
  ```javascript
    _.extend({name: 'moe'}, {age: 50});
    // {name: 'moe', age: 50}   
  ```
  - *_.clone* Crea una copia de un objeto pero con limitaciones
  ```javascript
    var anObject = {name: 'Joe', age: 21};
     var aClone = _.clone(anObject);
    // {name: 'Joe', age: 21}
  ```
  - *_.isEqual* Verificar si dos objetos son iguales (contenido)
  ```javascript
    var stooge = {name: 'moe', luckyNumbers: [13, 27, 34]};
    var clone  = {name: 'moe', luckyNumbers: [13, 27, 34]};
    stooge == clone;
    // false
    _.isEqual(stooge, clone);
    // true
  ```
  - Validadores:      
    - isArray
    ```javascript
        _.isArray([1,2,3]);
        // true    
    ```
    - isObject
    ```javascript
        _.isObject({});
        // true
        _.isObject(1);
        // false    
    ```
    - isFunction
    ```javascript
        _.isFunction(alert);
        // true    
    ```
    - isString
    ```javascript
        _.isString("moe");
        // true    
    ```
    - isNumber
    ```javascript
        _.isNumber(8.4 * 5);
        // true    
    ```
    - isFinite
    ```javascript
        _.isFinite(-101);
        // true
        
        _.isFinite(-Infinity);
        // false    
    ```
    - isBoolean
    ```javascript
        _.isBoolean(null);
        // false    
    ```
    - isDate
    ```javascript
        _.isDate(new Date());
        // true    
    ```
    - isRegExp
    ```javascript
        _.isRegExp(/moe/);
        // true    
    ```
    - isNaN
    ```javascript
        _.isNaN(NaN);
        // true
        isNaN(undefined);
        // true
        _.isNaN(undefined);
        // false    
    ```
    - isNull
    ```javascript
        _.isNull(null);
        // true
        _.isNull(undefined);
        // false    
    ``` 
    - isUndefined
    ```javascript
        _.isUndefined(window.missingVariable);
        //true
    ```

- **Utilidades**

  - *_.template* micro-plantillas
  ```javascript
    var saludos = _.template("hello <%= name %>");
    saludos({ name: 'moe' });
  ```

### Backbone

![Backbone_logo](http://backbonejs.org/docs/images/backbone.png)

**Ejemplos**
- [Lista oficial](http://backbonejs.org/#examples)
    - [Earth](http://earth.nullschool.net/#current/wind/surface/level/orthographic)
    - [USA Today](http://www.usatoday.com/)
    - [Enigma](http://enigma.io/)
    - [WordPress Portal](https://es.wordpress.com/)
    - [Foursquare](https://es.foursquare.com/)
    - [Bitbucket](https://bitbucket.org/)
    - [Disqus](https://disqus.com/)
    - [Delicious](https://delicious.com/)
    - [Khan Academy](https://www.khanacademy.org/)
    - [Basecamp](https://basecamp.com/)
    - [Trello](https://trello.com/)

**Dependencias**

- [jquery](https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js)
- [underscore](https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js)
- [backbone](https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.2.3/backbone-min.js)

```javascript
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.2.3/backbone-min.js"></script>
```

**Funcionamiento**

- MVC (Patrón Arquitectura)
    - Modelo
        - Datos
    - Controlador (intermediario)
        - Lógica de negocio
    - Vista
        - UI

- MV* (Variante de MVC)
![Backbone_model](http://file.mrbool.com/mrbool/articles/Manisha/JSComparison/image003.jpg)
    - Modelos
        - Datos (deseado Servidor Json)
    - Vistas
        - UI
        - Actualización modelo
    - Colecciones
        - Instancias de un modelo
    - Rutas
        - Gestión de Peticiones del usuario
        
**Plugins**
- [Lista](http://backplug.io/)
    - [Marionette.js](http://marionettejs.com/)
    - [LocalStorage](https://github.com/jeromegn/Backbone.localStorage)
    - [BackFire](https://www.firebase.com/blog/2013-01-29-backfire-firebase-bindings-for-backbonejs.html)

**Recursos**
- [Wiki](https://github.com/jashkenas/backbone/wiki/Tutorials%2C-blog-posts-and-example-sites)
- [Documentación](http://backbonejs.org/)

**Estructura de un proyecto**
```
index.html
css/
img/
js/
    init.js
    vendor/
        jquery
        underscore
        backbone
    models/
      model.js
    collections/
      collection.js
    views/
      view.js
    routes/
      routes.js
```

**Modelo**

- Extendemos el modelo:
```javascript
    var Coche = Backbone.Model.extend();
    var cochecito = new Coche();
```

- *.set()* Guardar valores: 
```javascript
    cochecito.set( 'marca', 'Seat' );
```

- *.toJSON()* Lectura de valores: 
```javascript
    console.log(cochecito) 
    console.log( cochecito.toJSON() );
```

- *.get()* Leer valores: 
```javascript
    console.log( 'La marca del coche es ' + cochecito.get( 'marca' ) );
```

- Pasando pares de valor en la instanciación
```javascript
    var Coche = Backbone.Model.extend();
    var cochecito = new Coche({
        'marca': 'Seat',
        'modelo': 'Ibiza'
    });
    
    console.log( cochecito.toJSON() );
    console.log( 'La marca del coche es ' + cochecito.get( 'marca' ) + ' y el modelo ' + cochecito.get( 'modelo' ) + '.' );
```

- Valores por defecto en el Modelo
```javascript
    var Coche = Backbone.Model.extend({
        defaults: {
            'marca': 'Seat',
            'modelo': 'Ibiza'
      }
    });
    
    var cocheDesconocido = new Coche();
    var miCoche = new Coche({ 'modelo': 'Toledo' });
    
    console.log( cocheDesconocido.toJSON() );
    console.log( miCoche.toJSON() );
```

- Incluyendo métodos
```javascript
    var Coche = Backbone.Model.extend({
        defaults: {
            'marca': 'Seat',
            'modelo': 'Ibiza',
            'ITVPasada': true
        },
        actualizaModelo: function(){
            var nuevoModelo = prompt( 'Introduce el nuevo modelo: ' );
            this.set( {'modelo': nuevoModelo} );
        }
    });
    
    var cochecito = new Coche();
    console.log( cochecito.toJSON() );
    
    cochecito.actualizaModelo();
    
    console.log( cochecito.toJSON() );
```

**Colecciones**
- Asociar un modelo a una colección:
```javascript
    var cocheModelo = Backbone.Model.extend({
        defaults: {
            'marca': 'Seat',
            'modelo': 'Ibiza',
            'ITVPasada': true
        },
        actualizaModelo: function( nuevoModelo ){
            this.set({ 'modelo': nuevoModelo });
        }
    });
    
    var cocheColeccion = Backbone.Collection.extend({
        Model: cocheModelo
    });
    
    var cochecito = new cocheColeccion();
    
    console.log( cochecito.toJSON() );
```

- *.add()* Añadir modelos a la colección:
```javascript
    var cocheModelo = Backbone.Model.extend();
    
    var cocheColeccion = Backbone.Collection.extend({
        Model: cocheModelo
    });
    
    var cochecito = new cocheColeccion();
    cochecito.add({ 'marca': 'Seat', 'modelo': 'Toledo', 'ITVPasada': false});
    
    console.log( cochecito.toJSON() );
```

- Añadir elementos durante la creación de la Colección
```javascript
    cocheModelo = Backbone.Model.extend();
    
    cocheColeccion = Backbone.Collection.extend({
        model: cocheModelo
    });
    
    var cochecito = new cocheModelo([
        { 'marca': 'Seat', 'modelo': 'Toledo', 'ITVPasada': false},
        { 'marca': 'Audi', 'modelo': 'A4', 'ITVPasada': true}
    ]);
    
    console.log( cochecito.toJSON() );
```

- *.at()* Ajustando posiciones:
```javascript
    var cocheModelo =  Backbone.Model.extend();
    var coche1 = new cocheModelo({ 'marca': 'Fiat', 'modelo': 'Punto', 'ITVPasada': true, 'posicion': 1});
    var coche0 = new cocheModelo({ 'marca': 'Fiat', 'modelo': 'Punto', 'ITVPasada': true, 'posicion': 0});
    
    var cocheColeccion = Backbone.Collection.extend({
        model: cocheModelo
    });
    
    var cochecito = new cocheColeccion([
        { 'marca': 'Seat', 'modelo': 'Toledo', 'ITVPasada': false},
        { 'marca': 'Audi', 'modelo': 'A4', 'ITVPasada': true}
    ]);
    
    console.log( cochecito.toJSON() );
    
    cochecito.add( coche1, {at : 1} );
    console.log( cochecito.toJSON() );
    
    cochecito.add( coche0, {at: 0} );
    console.log( cochecito.toJSON() );
```

- *.remove()* Eliminar objetos:
```javascript
    var primerElemento = cochecito.at(0);
    cochecito.remove( primerElemento );
    console.log( cochecito.toJSON() );
    
    // Eliminamos un objeto determinado
    cochecito.remove( coche1 );
    console.log( cochecito.toJSON() );
```

- *.each()* Recorriendo todos los objetos:
```javascript
    cochecito.each( function( cadaCoche ){
        console.log( 'El coche es un  ' + cadaCoche.get( 'marca' ) + ' ' +cadaCoche.get( 'modelo' ) );
    });
```


**Eventos**
- *.on()* Ecuchar cambios:
```javascript
    var Coche = Backbone.Model.extend({
        defaults: {
            'marca': 'Seat',
            'modelo': 'Ibiza',
            'ITVPasada': true
        },
        actualizaModelo: function( nuevoModelo ){
            this.set({ 'modelo': nuevoModelo });
        }
    });
    
    
    var cochecito = new Coche();
    console.log( cochecito.toJSON() );
    
    // Evento
    cochecito.on( 'change:modelo', function(){
        console.log( 'Modelo modificado!' );
    } );
    
    // Actualizamos el nombre
    cochecito.actualizaModelo( 'Toledo' );
    console.log( cochecito.toJSON() );
```

- *.on()* Añadimos un listener para un evento en la colección:
```javascript
    var cocheModelo =  Backbone.Model.extend();
    var cocheColeccion = Backbone.Collection.extend({
        model: cocheModelo
    });
    
    var cochecito = new cocheColeccion();
    
    cochecito.on( 'add', function(){
        console.log( "Cambios en la colección! Hemos añadido con add() un elemento!" );
    } );
    
    cochecito.add({ 'marca': 'Seat', 'modelo': 'Toledo', 'ITVPasada': false});
    cochecito.add({ 'marca': 'Audi', 'modelo': 'A4', 'ITVPasada': true});
    cochecito.add({ 'marca': 'Fiat', 'modelo': 'Punto', 'ITVPasada': true});
    cochecito.add({ 'marca': 'Fiat', 'modelo': 'Punto', 'ITVPasada': true});
```

- *.on()* Añadimos un listener para varios eventos en la colección:
```javascript
    var cocheModelo =  Backbone.Model.extend();
    var cocheColeccion = Backbone.Collection.extend({
        model: cocheModelo
    });
    
    var cochecito = new cocheColeccion();
    
    cochecito.on( 'add remove', function(){
        console.log( "Cambios en la colección! Hemos añadido o borrado un elemento!" );
    } );
    
    cochecito.add({ 'marca': 'Seat', 'modelo': 'Toledo', 'ITVPasada': false});
    cochecito.add({ 'marca': 'Audi', 'modelo': 'A4', 'ITVPasada': true});
    cochecito.add({ 'marca': 'Fiat', 'modelo': 'Punto', 'ITVPasada': true});
    cochecito.add({ 'marca': 'Fiat', 'modelo': 'Punto', 'ITVPasada': true});
    console.log( cochecito.toJSON() );
    
    primerElemento = cochecito.at(0);
    cochecito.remove( primerElemento );
    console.log( cochecito.toJSON() );
```

**Vista**
- Extendemos la vista:
```javascript
    var cocheVista = Backbone.View.extend();
    var vistaPrincipal = new cocheVista();
    
    console.log( vistaPrincipal );
```

- *el* por defecto *div*:
```javascript
    var cocheVista = Backbone.View.extend();
    var vistaPrincipal = new cocheVista();
    
    console.log( vistaPrincipal.el );
```

- *render* Renderizmos *("pintamos")* la vista:
```javascript
    var cocheVista = Backbone.View.extend({
        render: function(){
            this.$el.html( '<h1>Hola Backbone!</h1>' );
    
            return this;
        }
    });
    
    var vistaPrincipal = new cocheVista();
    
    vistaPrincipal.render();
    
    console.log( vistaPrincipal.el );
```

- *initialize* Para renderizar automaticamente la vista:
```javascript
    var cocheVista = Backbone.View.extend({
        initialize: function(){
            this.render();
        },
        render: function(){
            this.$el.html( '<h1>Hola Backbone!</h1>' );
            return this;
        }
    });
    
    var vistaPrincipal = new cocheVista();
    console.log( vistaPrincipal.el );
```

- *tagName* Asignar etiquetas:
```javascript
    var cocheVista = Backbone.View.extend({
        tagName : 'h1',
        initialize: function(){
            var nombre = prompt ( 'Como te llamas? \n (Por defecto = Backbone)' );
            nombre = nombre || 'Backbone';
            this.render( nombre );
        },
        render: function( nombre ){
            this.$el.text( 'Hola ' + nombre +'!' );
            $( '#vista01' ).html( this.el );
            return this;
        }
    });
    
    var vistaPrincipal = new cocheVista();
```

**Plantillas**

- *<%= ... %>* Usando underscore.js:
```javascript
    var plantilla  = _.template( 'Tenemos un <%= marca %> <%= modelo %>. Todo un clásico!' );
    
    console.log(
        plantilla( {marca: 'Seat', modelo: 'Ibiza'} )
    );
```

- Separamos la plantilla:
```javascript
    var cocheModelo = Backbone.Model.extend();
    var cocheVista = Backbone.View.extend({
        el: '#vista02',
        plantilla: _.template( $('#plantilla-vistacoche').html() ),
        initialize: function( modelo ){
            this.$el.html( this.plantilla ( modelo.toJSON() ));
        },
        render: function(){
            $('#vista02').html( this.$el );
            return this;
        }
    });
    
    cochecito = new cocheModelo({
        'marca': 'Seat',
        'modelo': 'Toledo',
        'url': 'https://www.wikiwand.com/es/SEAT_Toledo'
    });
    var vistaCochecito = new cocheVista( cochecito );
```

- Cambiamos la plantilla pero no nuestro JavaScript:
```javascript
    var cocheModelo = Backbone.Model.extend();
    var cocheVista = Backbone.View.extend({
        el: '#vista02',
        plantilla: _.template( $('#plantilla-vistacochedetalle').html() ),
        initialize: function( modelo ){
            this.$el.html( this.plantilla ( modelo.toJSON() ));
        },
        render: function(){
            $('#vista02').html( this.$el );
            return this;
        }
    });
    
    cochecito = new cocheModelo({
        'marca': 'Seat',
        'modelo': 'Toledo',
        'url': 'https://www.wikiwand.com/es/SEAT_Toledo'
    });
    var vistaCochecito = new cocheVista( cochecito );
```

**Ejercicios**

1 - Desarrolla una versión mejorada de [MovieFire](https://github.com/arvindr21/movieFire/tree/master/backFire) (usando Backbone) incluyendo llamadas AJAX a la base de datos de IMBD para enriquecer los datos, usando [OMDb API](http://omdbapi.com/). 

- [Solución](https://github.com/UlisesGascon/curso-js-web-developers-112015/tree/master/otros/backFire)