
# Trucos avanzados

### Monitorizar Variables Globales

- [Detectar variables globales en Javascript por Carlos Benítez](http://www.etnassoft.com/2011/04/04/detectar-variables-globales-en-javascript/)
```javascript
    /**
    * Snippet Detectar variables globales 
    * en Javascript por Carlos Benítez 
    */
    (function( context ){
      var globals = { viewGlobals : true },
          startGlobals = [],
          newGlobals = [];
     
      for (var j in window) {
        globals[j] = true;
        startGlobals.push(j);
      }
     
      setInterval(function() {
        for ( var j in window ) {
          if ( !globals[j] ) {
            globals[j] = true;
            newGlobals.push(j);
            console.warn( 'New Global: ' + j + ' = ' + window[j] + '. Typeof: ' + (typeof window[j]) );
          }
        }
      }, 1000);
     
      context.viewGlobals = function(){
        console.groupCollapsed( 'View globals' );
          console.groupCollapsed( 'Initial globals' );
            console.log( startGlobals.sort().join( ",\n" ) );
          console.groupEnd();
          console.groupCollapsed( 'New globals' );
            console.warn( newGlobals.sort().join( ",\n" ) );
          console.groupEnd();
        console.groupEnd();
      };
     
    })(this);
```


### Colas de Ejecución

- Ejemplo (modificado) de Valentín Starck:
    - [Versión con comentarios](http://blog.aijoona.com/2011/04/30/implementando-colas-de-ejecucion-en-javascript/) 
```javascript

    function write(t) {
      console.log(new Date + ' | ' +t);
    }
    
    var Queue = function() {
      this._tasks = [];
    };

    Queue.prototype.add = function(fn, scope) {
      this._tasks.push({
        fn: fn,
        scope: scope
      });
      return this;
    };

    Queue.prototype.process = function() {
      var proxy, self = this;

      task = this._tasks.shift();
   
      if(!task) {
        return;
      }
      
      proxy = {
        end: function() {
          self.process();
        }
      };

      task.fn.call(task.scope, proxy);
      
      return this;    
    };

    Queue.prototype.clear = function() {
      this._tasks = [];

      return this;
    };
        
    var q = new Queue();

    // Tarea 1 (sincronica)
    q.add(function(proxy) {
      write('Tarea 1 (sincronica)');
      proxy.end();
    });

    // Tarea 2 (asincronica)
    q.add(function(proxy) {
      write('Tarea 2 (asincronica)');
      setTimeout(function() {
        proxy.end();        
      }, 2500);
    });

    // Tarea 3 (sincronica)
    q.add(function(proxy) {
      write('Tarea 3 (sincronica)');
      proxy.end();
    });

    // Tarea 4 (asincronica)
    q.add(function(proxy) {
      write('Tarea 4 (asincronica)');
      setTimeout(function() {
        proxy.end();        
      }, 2500);
    });

    // Tarea 5 (sincronica)
    q.add(function(proxy) {
      write('Tarea 5 (sincronica)');
      proxy.end();
    });

    q.process();
```
- [Librería QueQue de Valentín Starck](https://github.com/Aijoona/QueQue)


### Callback Hell
-![callback_humor](http://cdn.meme.am/instances/400x/63888921.jpg)
- Callback Hell
    - Escalabilidad limitada
    - Problemas para gestionar errores
    - Anidaciones complejas
    ```javascript
    obj.metodo1(data, function(data1) {  
        function(data1, function(data2) {
            obj.otroMetodo(data2, function(data3) {
                obj.otroMetodoMas(data3, function(data4) {
                    // más y más.....
                })
            })
        })
    })

    ```
### Promesas
![promises_ecma6](https://mdn.mozillademos.org/files/8633/promises.png)
> A promise represents the eventual result of an asynchronous operation. The primary way of interacting with a promise is through its *then* method, which registers callbacks to receive either a promise’s eventual value or the reason why the promise cannot be fulfilled.
> From [promisesaplus.com/](http://promisesaplus.com/)

- Estados:
    - Fulfilled – La acción en relación con la promesa se logró.
    - Rejected – La acción en relación con la promesa falló.
    - Pending – Pendiente, no se ha cumplido o rechazado aún.
    - Settled - Arreglada, se ha cumplido o se ha rechazado (resuelta).

- En ECMA6:
- [Soporte en navegadores](http://caniuse.com/#search=promise)  
    - Una promesa
    ```javascript
        var cuentaPromesas = 0;
        var errorMode = false;
        function testPromesa() {
        
          var numPromesaActual = ++cuentaPromesas;
        
          console.warn("Promesa Asíncrona numero ("+numPromesaActual+") - Iniciada")
        
          var miPromesa = new Promise(
            function(resolve, reject) {       
              
              console.info("Promesa Asíncrona numero ("+numPromesaActual+") - Proceso asincrónico empezado");
              
              if(errorMode){
                  reject(numPromesaActual)
              } else{
                window.setTimeout(
                  function() {
                    resolve(numPromesaActual)
                  }, Math.random() * 2000 + 1000);
              }
            });
          miPromesa.then(
            function(val) {
              console.info("Promesa Asíncrona numero ("+val+") - Proceso asincrónico terminado");
              console.warn("Promesa Asíncrona numero ("+numPromesaActual+") - Finalizada");
            }).catch(
              function(val){
                console.error("Promesa Asíncrona numero ("+val+") - ERROR FATAL");
            });
        };
        
        testPromesa();
    ```
    - Usando *.race()*
    ```javascript   
        var p1 = new Promise(function(resolve, reject) { 
            setTimeout(resolve, 500, "uno"); 
        });
        var p2 = new Promise(function(resolve, reject) { 
            setTimeout(resolve, 100, "dos"); 
        });
        
        Promise.race([p1, p2]).then(function(value) {
          console.log(value); // "dos" - p2 más rápida
        }); 
    ``` 
    - Usando *.all()*
    ```javascript
        var errorMode = false
    
        var p1 = new Promise(function(resolve, reject) {
          console.log("P1 - Iniciada"); 
          setTimeout(resolve, 1000, "P1 - Terminada"); 
        }); 
        var p2 = new Promise(function(resolve, reject) {
          console.log("P2 - Iniciada");
          setTimeout(resolve, 2000, "P2 - Terminada"); 
        });
        var p3 = new Promise(function(resolve, reject) {
          if(errorMode){
            reject("errorMode-Activado");
          } else {
            console.log("P3 - Iniciada");
            setTimeout(resolve, 3000, "P3 - Terminada");
          }
        
        });
        var p4 = new Promise(function(resolve, reject) {
          console.log("P4 - Iniciada");
          setTimeout(resolve, 4000, "P4 - Terminada");
        });
        
        Promise.all([p1, p2, p3, p4]).then(function(value) { 
          console.info("Promise.all -> TODO TERMINADO", value)
        }, function(reason) {
          console.log("Parece... que fallamos!", reason)
        });
    ```
    - Usando Ajax
    ```javascript
        function $http(url){
         
          var core = {
        
            ajax : function (method, url, args) {
        
              var promise = new Promise( function (resolve, reject) {
        
                var client = new XMLHttpRequest();
                var uri = url;
        
                if (args && (method === 'POST' || method === 'PUT')) {
                  uri += '?';
                  var argcount = 0;
                  for (var key in args) {
                    if (args.hasOwnProperty(key)) {
                      if (argcount++) {
                        uri += '&';
                      }
                      uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
                    }
                  }
                }
        
                client.open(method, uri);
                client.send();
        
                client.onload = function () {
                  if (this.status >= 200 && this.status < 300) {
                    resolve(this.response);
                  } else {
                    reject(this.statusText);
                  }
                };
                client.onerror = function () {
                  reject(this.statusText);
                };
              });
        
              return promise;
            }
          };
        
          // Patrón Adaptador
          return {
            'get' : function(args) {
              return core.ajax('GET', url, args);
            },
            'post' : function(args) {
              return core.ajax('POST', url, args);
            },
            'put' : function(args) {
              return core.ajax('PUT', url, args);
            },
            'delete' : function(args) {
              return core.ajax('DELETE', url, args);
            }
          };
        };
        
        var callback = {
          success : function(data){
             console.log(1, 'success', JSON.parse(data));
          },
          error : function(data){
             console.log(2, 'error', JSON.parse(data));
          }
        };
        
        // Prueba bicis
        $http("http://bicimad-api.herokuapp.com/api-v1/locations/") 
          .get() 
          .then(callback.success) 
          .catch(callback.error);
        
        // Prueba bicis 2
        var bicisCerca = {
          url: 'http://bicimad-api.herokuapp.com/api-v1/locations/nearest/',
          lat: '40.418889',
          long: '-3.691944',
          distance: '1000000000'
        };
        var cercaMio = bicisCerca.url+"?lat="+bicisCerca.lat+"&long="+bicisCerca.long+"&distance="+bicisCerca.distance;
        
        $http(cercaMio)
          .get() 
          .then(callback.success) 
          .catch(callback.error);
    ```

- Alternativas para usar promesas:
    - [Q](https://github.com/kriskowal/q)
        - Muy utilizada en Nodejs
        - [Q.js](https://rawgit.com/kriskowal/q/v1/q.js);
        - [Q Docs](https://github.com/kriskowal/q/wiki/API-Reference)
        ```javascript
            function primeraFuncion() {
                var deferred = Q.defer();
                setTimeout(function() {
                    console.info('Primera funcion');
                    deferred.resolve();
                }, 2000);
                return deferred.promise;
            }
            
            function segundaFuncion() {
                var deferred = Q.defer();
                setTimeout(function() {
                    console.info('Segunda funcion');
                    deferred.resolve();
                }, 1000);
                return deferred.promise;
            }
            Q()
                .then(primeraFuncion)
                .then(segundaFuncion)
                .done();        
        ```
 
    - [RSVP.js](https://github.com/tildeio/rsvp.js)
    - [When.js](https://github.com/cujojs/when)


### Testing

![testing_graph](http://ashleynolan.co.uk/assets/img/blog/tooling-survey/2015/q7.jpg)

- Código que verifica el funcionamiento de otro código.
- Deben poder realizarse de manera automática.
- Cubrir mayor cantidad de código posible.
- Independientes entre si.
- Capaces de ejercutarse infinidad de veces.
- Pueden agruparse en Test Suites.
- Uso de colores y mensajes claros.

- Ejemplo:
```javascript
    // Función 
    function sumar (p1, p2){
      return p1 + p2;
    }
    
    // Test
    function testSumar(){
      if (sumar(1, 2) !== 3) {
        document.write('<p style="color: red;">sumar(1, 2) ERROR - No devuelve 3</\p>');
      } else {
        document.write('<p style="color: green;">sumar(1, 2) OK</p>');
      }
    
      if (sumar("2", 2) !== 4) {
        document.write('<p style="color: red;">sumar("2", 2) ERROR - No devuelve 4</p>');
      } else {
        document.write('<p style="color: green;">sumar("2", 2) OK</p>');
      }
    }
```

- Metodologías:
    - Test Driven Development (TDD)
        - Primero los test
        - Depués el código (Refactorización <-> Testing)
            - Ciclo de Vida:
                - Escribe los tests
                - Ejecuta los tests (Sin código, solo probando los propios tests)
                - Escribe el código suficiente para que pasen los tests.
                - Ejecuta los tests
                - Refactoriza
                - Repite
                
    - Behavior Driven Development (BDD)
        - Orientado al comportamiento 
        - Se comprueban que las funcionalidades cumplan lo que se espera de ellas

- Frameworks:
    - [QUnit](https://api.qunitjs.com/)
        - [Documentación](https://api.qunitjs.com/) 
        - Utilizado por jQuery 
        ```javascript
            // Función 
            function sumar (p1, p2){
              return p1 + p2;
            }
            
            // Test
            test("test de la funcion sumar(p1, p2)", function() {
              equal(sumar( 1, 2), 3, "1 + 2 = 3" );
              notEqual(sumar( "2", 2), "4", " 2(cadena) + 2 != 4(cadena) ");
            });
        ```
    - [Mocha](https://mochajs.org/)
        - Muy popular
        - En necesario incluir [Chai](http://chaijs.com/)
        ```javascript       
            // Función 
            function sumar (p1, p2){
              return p1 + p2;
            }
            
            // Test
            mocha.setup('bdd');
            var expect = chai.expect;
            var should = chai.should();
            describe("Test de la funcion sumar(p1, p2)", function() {
              
              it('1 + 2 = 3', function() {
                expect(sumar( 1, 2)).to.equal(3);
              });
            
              it('\"2\" + 2 != \"4\"', function() {
                expect(sumar( "2", 2)).not.equal("4");
              });
            
            });
            
            mocha.run()
        ```
    - [Jasmine](https://github.com/jasmine/jasmine)
        - [Documentación](http://jasmine.github.io/2.3/introduction.html)
        - Behavior Driven Development (BDD)

### Rendimiento
- [jsPerf](http://jsperf.com/)
- [benchmark.js](http://benchmarkjs.com/)
```javascript
    var suite = new Benchmark.Suite;
    
    // add tests
    suite.add('RegExp#test', function() {
      /o/.test('Hello World!');
    })
    .add('String#indexOf', function() {
      'Hello World!'.indexOf('o') > -1;
    })
    .add('String#match', function() {
      !!'Hello World!'.match(/o/);
    })
    // add listeners
    .on('cycle', function(event) {
      console.log(String(event.target));
    })
    .on('complete', function() {
      console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    })
    // run async
    .run({ 'async': true });
```


### Require.js & AMD

![Require & AMD logo](http://d348unuw4205d6.cloudfront.net/wp-content/uploads/2014/06/amd_and_require.jpg)

- *Asincronia*
![Asincronia](http://www.codeproject.com/KB/scripting/625262/AMD.png)

- *Dependencias y modularidad*
![Modularidad](http://1.bp.blogspot.com/-RWKQH6r6AQ8/Uutpgj0letI/AAAAAAAAAnk/Rd7hmZ-0-Rg/s1600/fig01.png)


**Entendiendo la utilidad de Require.js**
- Código convencional (Código espagueti):
  - [Código espagueti](https://www.wikiwand.com/es/C%C3%B3digo_espagueti)
  - index.html:
  ```html
    <!doctype html>
    
    <html lang="en">
    <head>
      <meta charset="utf-8">
    
      <title>Testing Requirejs</title>
    
    
    </head>
    
    <body>
      <script src="calculadora.js"></script>
    </body>
    </html>
  ```

  - calculadora.js
  ```javascript
  function sumar (x, y) {
      return x+y
  };
  
  function restar (x, y) {
      return x-y
  };
  
  function multiplicar (x, y) {
      return x*y
  };
  
  
  function dividir (x, y) {
      return x/y
  };
  ```

- Código convencional (Creando un objeto):

  - calculadora.js
  ```javascript
  var calculadora = {};

  calculadora.sumar = function (x,y) {
      return x + y
  };
  calculadora.restar = function (x, y) {
      return x - y
  }
  calculadora.multiplicar = function (x, y) {
      return x * y
  }
  calculadora.divir = function (x, y) {
      return x / y
  }
  ```
  
  
- Código convencional (Mejorando la escalabilidad "dividiendo el objeto"):
  - index.html:
  ```html
  <script src="sumar.js"></script>
  <script src="restar.js"></script>
  <script src="divir.js"></script>
  <script src="multiplicar.js"></script>
  ```
  
  - /sumar.js
  ```javascript
  var calculadora = calculadora || {};
  calculadora.sumar = function (x,y) {
      return x + y
  };
  ```
  
  - /restar.js
  ```javascript
  var calculadora = calculadora || {};
  calculadora.restar = function (x, y) {
      return x - y
  }
  ``` 

  - /dividir.js
  ```javascript
  var calculadora = calculadora || {};
  calculadora.divir = function (x, y) {
      return x / y
  }
  ```


  - /multiplicar.js
  ```javascript
  var calculadora = calculadora || {};
  calculadora.multiplicar = function (x, y) {
      return x * y
  }
  ```


**Usando Require.js**
- AMD:
  - [Asynchronous module definition](https://www.wikiwand.com/es/Asynchronous_module_definition)
  
  - index.html:
  ```html
  <script data-main="calculadora" src="require.js"></script>
  ```
  - /calculadora.js
  ```javascript
  require(['calculadora/sumar', 'calculadora/restar', 'calculadora/cuadrado'], function (sum, res, cua) {
    console.info(sum(1,2)); // 1 + 2
    console.info(res(3,1)); // 3 - 1 
    console.log(cua(2)); // 2 * 2
  });
  ```

  - calculadora/sumar.js
  ```javascript
  define(function () {
    return function (x, y) {
        return x + y;
    };
  });
  ```

  - calculadora/restar.js
  ```javascript
  define(function () {
    return function (x, y) {
        return x - y;
    };
  });
  ```

  - calculadora/multiplicar.js
  ```javascript
  define(function () {
    return function (x, y) {
        return x * y;
    };
  });
  ```

  - calculadora/cuadrado.js
  ```javascript
  define(['calculadora/multiplicar'], function (multiplicar) {
    return function (x) {
        return multiplicar(x, x);
    };
  });
  ```


**Require.js - Modo Avanzado**

- Require.js con dependencias externas:
  - vendor/jquery.min.js (en local)

  - script.js
  ```javascript
  require(['vendor/jquery'], function($){
      $('#hola').html("<h1>HOLA! Hola!</h1>");
  });
  ```


- Require.js varios modulos en el mismo archivo:
  - script.js
  ```javascript
  require(['hola', 'adios'], function(hola, adios){
      $('#hola').html("<h1>"+hola+" y "+adios+"!</h1>");
  });
  ```

  - hola.js
  ```javascript
  define(function() {
      return "Hola";
  });
  
  define('adios', function() {
      return "adios";
  });
  ```

- Require.js configurando baseUrl:

  - Estructura del proyecto: 
  ```  
    www/
        /assets/
        /css/
        /js/
            /App/
                main.js
        /vendor/
            bootstrap.js
            jquery.js
  ```

  - config.js:
  ```javascript    
  requirejs.config({
      baseUrl: '.assets/js'
  });
  ```
  
  - *.js
  ```javascript 
  require(['vendor/jquery', 'vendor/bootstrap', 'app/main']);
  ```


- Require.js configurando Paths:

  - Estructura del proyecto: 
  ```  
    www/
        /assets/
        /css/
        /js/
            /app/
                main.js
        /vendor/
            bootstrap.js
            jquery.js
                
  ```  

  - config.js:
  ```javascript 
  requirejs.config({
      baseUrl: '.assets/js',
      paths: {
          'jquery': 'vendor/jquery',
          'bootstrap': 'vendor/bootstrap',
          'main': 'app/main'
      }
  });
  ```
  
  - *.js:
  ```javascript 
  require(['jquery', 'bootstrap', 'main']);
  ```


**ECMA6**

- [Soporte](https://kangax.github.io/compat-table/es6/)
- [Babel (transpiler)](https://babeljs.io/)
 
- Constantes (cons):
```javascript
	const PI = 3.141593
```

- Scoping:
	- Variables Internas (let):
	```javascript
		for (let i = 0; i < a.length; i++) {
	    let = a[i];
	    //...
		}
		
		/* ECMA5
		for (var i = 0; i < a.length; i++) {
	    var = a[i];
	    //...
		}
		*/
	```
	- Funciones Internas:
	```javascript
		{
		    function nivel1 () { return 1 }
		    nivel1 ();
		    {
		        function nivel2() { return 2 }
		        nivel2 ();
		    }
		}

		/* ECMA5
		(function () {
		    var nivel1 = function () { return 1; }
		    nivel1();
		    (function () {
		        var nivel2 = function () { return 2; };
		        nivel2();
		    })();
		})();
		*/
	```

- Arrow Functions:
	- No pueden usarse con *yield*
	- Siempre son anónimas:
	```javascript
		impares  = numeros.map(v => v + 1);
		pares = evens.map(v => ({ even: v, odd: v + 1 }))
		otrosNumeros  = evens.map((v, i) => v + i)
		
		/* ECMA5
		impares  = numeros.map(function (v) { return v + 1; });
		pares = evens.map(function (v) { return { even: v, odd: v + 1 }; });
		otrosNumeros  = numeros.map(function (v, i) { return v + i; });
		*/

	```
	- *return* implicito en declaración inline
	```javascript
		var odds = [1,2,3,4,5].filter(num => num % 2);
		console.log(odds); // Array [ 1, 3, 5 ]
	```
	- *this* contextual:
	```javascript
	this.nums.forEach((v) => {
	    if (v % 5 === 0)
	        this.fives.push(v)
	})

	/* ECMA 5
	var self = this;
	this.nums.forEach(function (v) {
	    if (v % 5 === 0)
	        self.fives.push(v);
	});
	*/
	```	

- Gestión de Parámetros en funciones:
	- Parametros opcionales:
	```javascript
		function f (x, y = 7, z = 42) {
		    return x + y + z
		}

		/* ECMA5
		function f (x, y, z) {
		    if (y === undefined){
				y = 7;
			}
		    z = z || 42;
		    return x + y + z;
		};
		*/
	```
	- Parametros adicionales:
	```javascript
		function f (x, y, ...a) {
		    return (x + y) * a.length
		}

		/* ECMA5
		function f (x, y) {
		    var a = Array.prototype.slice.call(arguments, 2);
		    return (x + y) * a.length;
		};
		*/
	```

- Las plantillas de cadena de texto:
	- Concepto:
	```javascript
		`cadena de texto ${expresión} texto`
	```
	- Multiples líneas:
	```javascript
		console.log(`línea 1 de texto
		línea 2 de texto`);

		/* ECMA5
		console.log("línea 1 de texto\nlínea 2 de texto");
		*/
	```
	- Expresiones:
	```javascript
		var customer = { name: "Foo" }
		var card = { amount: 7, product: "Bar", unitprice: 42 }
		message = `Hello ${customer.name},
		want to buy ${card.amount} ${card.product} for
		a total of ${card.amount * card.unitprice} bucks?`
		
		/* ECMA5
		var customer = { name: "Foo" };
		var card = { amount: 7, product: "Bar", unitprice: 42 };
		message = "Hello " + customer.name + ",\n" +
		"want to buy " + card.amount + " " + card.product + " for\n" +
		"a total of " + (card.amount * card.unitprice) + " bucks?";
		*/
	```
- Mejoras en Objetos (propiedades y métodos):
	- Definición de propiedades computerizadas:
	```javascript
		obj = {
		    foo: "bar",
		    [ "prop_" + foo() ]: 42
		}

		/* ECMA5
		obj = {
		    foo: "bar"
		};
		obj[ "prop_" + foo() ] = 42;
		*/
	```
	- Métodos:
	```javascript
		obj = {
		    foo (a, b) {
		        …
		    },
		    bar (x, y) {
		        …
		    },
		    *quux (x, y) {
		        …
		    }
		}

		/* ECMA5
		obj = {
		    foo: function (a, b) {
		        …
		    },
		    bar: function (x, y) {
		        …
		    },
		    //  quux: no equivalent in ES5
		    …
		};
		*/
	```
- Parsear Binarios y Octales:
```javascript
	0b111110111 === 503
	0o767 === 503

	/* ECMA 5
	parseInt("111110111", 2) === 503;
	parseInt("767", 8) === 503;
	*/
```

- Asignación desestructurada:
	- Arrays:
	```javascript
		// Matching
		var list = [ 1, 2, 3 ]
		var [ a, , b ] = list
		
		// Parameter Context Matching
		function f ([ name, val ]) {
		    console.log(name, val)
		}

		f([ "bar", 42 ]);

		// Fail-Soft Destructuring
		var list2 = [ 7, 42 ]
		var [ a = 1, b = 2, c = 3, d ] = list2

		/* ECMA5
		// Matching
		var list = [ 1, 2, 3 ];
		var a = list[0], b = list[2];

		// Parameter Context Matching
		function f (arg) {
		    var name = arg[0];
		    var val  = arg[1];
		    console.log(name, val);
		};

		f([ "bar", 42 ]);

		// Fail-Soft Destructuring
		var list2 = [ 7, 42 ];
		var a = typeof list2[0] || 1;
		var b = typeof list2[1] || 2;
		var c = typeof list2[2] !== "undefined" ? list2[2] : 3;
		var d = typeof list2[3] !== "undefined" ? list2[3] : undefined;
		*/
	```
- Nuevos Métodos Integrados:
	- Asignación de propiedades enumerables en objetos:
	```javascript
		var dst  = { quux: 0 }
		var src1 = { foo: 1, bar: 2 }
		var src2 = { foo: 3, baz: 4 }
		Object.assign(dst, src1, src2)
		
		// Verificación
		dst.quux === 0
		dst.foo  === 3
		dst.bar  === 2
		dst.baz  === 4

		/* ECMA5
		var dst  = { quux: 0 };
		var src1 = { foo: 1, bar: 2 };
		var src2 = { foo: 3, baz: 4 };
		Object.keys(src1).forEach(function(k) {
		    dst[k] = src1[k];
		});
		Object.keys(src2).forEach(function(e) {
		    dst[k] = src2[k];
		});

		// Verificación
		dst.quux === 0;
		dst.foo  === 3;
		dst.bar  === 2;
		dst.baz  === 4;
		*/
	```
	- Busqueda en sub-cadenas:
	```javascript
		"hello".startsWith("ello", 1) // true
		"hello".endsWith("hell", 4)   // true
		"hello".includes("ell")       // true
		"hello".includes("ell", 1)    // true
		"hello".includes("ell", 2)    // false

		/* ECMA5
		"hello".indexOf("ello") === 1;    // true
		"hello".indexOf("hell") === (4 - "hell".length); // true
		"hello".indexOf("ell") !== -1;    // true
		"hello".indexOf("ell", 1) !== -1; // true
		"hello".indexOf("ell", 2) !== -1; // false
		*/
	```
	- Chequear No-Numericos e infinitos:
	```javascript
		Number.isNaN(42) === false
		Number.isNaN(NaN) === true

		Number.isFinite(Infinity) === false
		Number.isFinite(-Infinity) === false
		Number.isFinite(NaN) === false
		Number.isFinite(123) === true
		
		/* ECMA5
		var isNaN = function (n) {
		    return n !== n;
		};
		var isFinite = function (v) {
		    return (typeof v === "number" && !isNaN(v) && v !== Infinity && v !== -Infinity);
		};
		isNaN(42) === false;
		isNaN(NaN) === true;

		isFinite(Infinity) === false;
		isFinite(-Infinity) === false;
		isFinite(NaN) === false;
		isFinite(123) === true;
		*/
	```	
	- isSafeInteger():
	```javascript
		Number.isSafeInteger(42) === true
		Number.isSafeInteger(9007199254740992) === false

		/* ECMA5
		function isSafeInteger (n) {
		    return (
		           typeof n === 'number'
		        && Math.round(n) === n
		        && -(Math.pow(2, 53) - 1) <= n
		        && n <= (Math.pow(2, 53) - 1)
		    );
		}
		isSafeInteger(42) === true;
		isSafeInteger(9007199254740992) === false;
		*/
	```
	- Truncar Número Flotante:
	```javascript
	console.log(Math.trunc(42.7)) // 42
	console.log(Math.trunc( 0.1)) // 0
	console.log(Math.trunc(-0.1)) // -0

	/* ECMA5
	function mathTrunc (x) {
	    return (x < 0 ? Math.ceil(x) : Math.floor(x));
	}
	console.log(mathTrunc(42.7)) // 42
	console.log(mathTrunc( 0.1)) // 0
	console.log(mathTrunc(-0.1)) // -0
	*/
	```

- For... of (iteración sobre valores y no propiedades):
```javascript
  let arr = [3, 5, 7];
  arr.foo = "hello";
  
  for (let i in arr) {
     console.log(i); 
     // "0", "1", "2", "foo"
  }
  
  for (let i of arr) {
     console.log(i); 
     // "3", "5", "7"
  }

```
- Generadores:
	- [Ejemplo de Miguel Sánchez](http://miguelsr.js.org/2015/06/08/es6-generators.html)
	```javascript
		function* greatGenerator(name) {
		    yield "Hola " + name + "!";
		    yield "Esta línea saldrá en la segunda ejecución";
		    yield "Esta otra, en la tercera";
		    if (name === "Miguel") yield "Esta otra, saldrá en la cuarta solo si te llamas miguel"
		}
		var generatorInstance = greatGenerator("paco");
		console.log(generatorInstance.next().value); // Hola paco!
		console.log(generatorInstance.next().value); // Esta línea saldrá la segunda ejecución
		console.log(generatorInstance.next().value); // Esta otra, en la tercera
		console.log(generatorInstance.next().value); // undefined
	```

- Map:
	- Manejando datos independientes con una estructura clave/valor
	```javascript
		let miMap = new Map();
		let miArray = [];

		miMap.set('cadena', 'Hola!');
		miMap.set(miArray, [500, "hola", true, false]);
		
		console.log(miMap.get(miArray)); // [500, "hola", true, false]
		console.log(miMap.get('cadena')); // Hola!
		
		console.log(miMap.size); // 2

		miMap.delete('cadena');
		 
		console.log(miMap.size); // 1
	```

- Clases:
	- La idea es POO sin prototipos
	- Definición de Clase:
	```javascript
		class coche{
		  constructor(marca, modelo, antiguedad, color, tipo) {
		    this.marca = marca;
		    this.modelo = modelo;
		    this.antiguedad = antiguedad;
		    this.color = color;
		    this.tipo = tipo;
		  }
		  detalles() {
		    console.log(`Tu coche es un ${this.marca} ${this.modelo} con ${this.antiguedad} años, clase ${this.tipo} y color ${this.color}`);
		  }
		}

		let miCoche = new coche ("Seat", "Panda", 20, "azul", "turismo");
		miCoche.detalles();

		/* ECMA 5
		var coche = function (marca, modelo, antiguedad, color, tipo) {
		    // Propiedades
		    this.marca = marca;
		    this.modelo = modelo;
		    this.antiguedad = antiguedad;
		    this.color = color;
		    this.tipo = tipo;
		    // Metodos
		    this.detalles = function(){
		      console.log("Tu coche es un "+this.marca+" "+this.modelo+" con "+this.antiguedad+" años, clase "+this.tipo+" y color "+this.color);
		    }
		};

		var miCoche = new coche ("Seat", "Panda", 20, "azul", "turismo");
		miCoche.detalles();
		*/
	```
	- Extensión de Clase:
	```javascript
		class perro {
		  constructor(nombre) {
		    this.patas = 4;
		    this.ojos = 2;
		    this.nombre = nombre;
		  }

		  ladrar() {
		    console.log(`${this.nombre} esta ladrando!`);
		  };
		}

		class pastorAleman extends perro {
		  constructor(nombre) {
		    super('pastorAleman');
		    this.colorLengua = "negra";
		    this.colorOjos = "marrón";
		    this.capacidadTrabajo = true;
		    this.especialidad = "Pastoreo";
		  }

		  informacion() {
		  	console.log(`Nombre: ${this.nombre} 
		  	Número patas: ${this.patas}
		  	Número ojos: ${this.ojos}
		  	Color ojos: ${this.colorOjos}
		  	Color Lengua: ${this.colorLengua}
		  	Capacidad de trabajo: ${this.capacidadTrabajo}
		  	Especialidad: ${this.especialidad}`);
		  }
		}

		let miPerro = new pastorAleman('Golden');
		miPerro.informacion();
		miPerro.ladrar();

		/* ECMA 5
		var perro  = function (nombre) {
		    this.patas = 4;
		    this.ojos = 2;
		    this.nombre = nombre;
		    this.ladrar = function(){
		    	console.log(this.nombre + " esta ladrando!");
		    }
		};

		var pastorAleman = function () {
		    this.colorLengua = "negra";
		    this.colorOjos = "marrón";
		    this.capacidadTrabajo = true;
		    this.especialidad = "Pastoreo";
		    this.informacion = function(){
				console.log("Nombre: "+this.nombre+"\nNúmero patas: "+this.patas+"\nNúmero ojos: "+this.ojos+"\nColor Lengua: "+this.colorLengua+"\nColor ojos: "+this.colorOjos+"\nCapacidad de trabajo: "+this.capacidadTrabajo+"\nEspecialidad: "+this.especialidad);
		    }
		};

		pastorAleman.prototype = new perro("Golden");

		var miPerro = new pastorAleman();
		miPerro.informacion();
		miPerro.ladrar();
		*/
	```
	- Métodos Estáticos:
	```javascript
		class coche{
		  static info (edad){
		  	console.info(`Tienes ${edad} años ${ edad >= 18 ? "y puedes conduccir": "y ... ¡Sorpresa! No puedes conduccir."}`);
		  }	
		  constructor(marca, modelo, antiguedad, color, tipo) {
		    this.marca = marca;
		    this.modelo = modelo;
		    this.antiguedad = antiguedad;
		    this.color = color;
		    this.tipo = tipo;
		  }
		  detalles() {
		    console.log(`Tu coche es un ${this.marca} ${this.modelo} con ${this.antiguedad} años, clase ${this.tipo} y color ${this.color}`);
		  }
		}

		coche.info(50);
		coche.info(8);
		let miCoche = new coche ("Seat", "Panda", 20, "azul", "turismo");
		miCoche.detalles();
	```	
- Módulos (Exportación):
	- Único
	```javascript
		// config.js
		let config = {
			token: "secreto",
		}

		export default config;
	```
	- Mutiples
	```javascript
		// config.js
		let config = {
			token: "secreto",
		}

		let config_details = {
			detalles: "más datos"
		}

		export config;
		export config_details;
	```
	- Combinada
	```javascript
		// config.js
		let config = {
			token: "secreto",
		}

		let config_details = {
			detalles: "más datos"
		}
		
		let configuraciones = {config, config_details}

		export default configuraciones;
		export config;
		export config_details;
	```
- Módulos (Importación):
	- Síncrona
	```javascript
		// único 
		import config from './config.js';

		// Multiples
		import * as config from './config.js';

		// Combinandos
		import configuraciones from './config.js';
		import { config, config_details } from './config.js';
	```
	- Asíncrona (solo un módulo)
	```javascript
		System.import('modulo')
	    
	    .then(modulo => {
	        // Uso del módulo importado
	    })
	    .catch(error => {
	        // Gestión de errores
	    });
	```
	- Asíncrona (multiples módulos)
	```javascript
	    Promise.all(
	        ['module1', 'module2', 'module3']
	        .map(x => System.import(x)))
	    .then(([module1, module2, module3]) => {
	        // Use module1, module2, module3
	    });
	```

**FLUX**

- MVC Convencional:

![MVC Convencional](http://cdn.infoq.com/statics_s1_20151222-0055/resource/news/2014/05/facebook-mvc-flux/en/resources/flux-react-mvc.png)

- Flux (React):

![Flux](http://cdn.infoq.com/statics_s1_20151222-0055/resource/news/2014/05/facebook-mvc-flux/en/resources/flux-react.png)


**Recursos adicionales**

- [JSHint](http://jshint.com/)
  - [Instaladores](http://jshint.com/install/) 
- [jsDocs](http://usejsdoc.org/)
  - [gulp-jsdoc](https://www.npmjs.com/package/gulp-jsdoc) 
- [Idiomatic](https://github.com/rwaldron/idiomatic.js/tree/master/translations/es_ES)
- [Semantic Versioning](http://semver.org/)
- [Patrones de diseño en Jquery](http://www.etnassoft.com/2011/05/26/patrones-de-diseno-utilizados-por-jquery/)