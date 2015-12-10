### LocalStorage

- [Soporte en Navegadores](http://caniuse.com/#search=localstorage)

- Convencional:
    - Cookies:
    - Espacio limitado (4kb)
    - Máximo 20 cookies
    - Por cada petición HTTP se envia y recibe todo el contenido (lectura servidor)
    - Caducidad

- Tipos:
    - SessionStorage (Solo se almacenan los datos durante la sesión)
    - LocalStorage (Almacenamiento persistente)
    - GlobalStorage (Firefox experimental - No usar)

- Uso y limitaciones:
    - 5-10Mb según navegador
    - Almacenamiento local (lectura/escritura cliente)
    - Sin caducidad
    - Funcionamiento clave/valor
    - Solo se permite el almacenamiento de cadenas de texto.


- Problemas Conocidos:
    - IE 8 y 9 almacena los datos basandose unicamente en el hostname, ignorando el protocolo (http/https) y el puerto.
    - En iOS 5 y 6 los datos se almacenan en una localización que puede ser borrada ocasionalmente por el SO.
    - Usando el modo "navegación privada" Safari, Safari para IOs y Navegadores Android no soportan sessionStorage o localStorage.
    - En IE al acceder a LocalStorage desde local, el objeto localStorage pasa a ser undefined.
    - Internet Explorer no soporta el almacenamiento de casi ninguna cadena de carácteres ASCII con una logitud menor a 20.
    - En IE el evento "storage" genera errores: 
        - IE10 : Se dispara el evento al usar iframes.
        - IE11 : Se confunden el valor antiguo con el nuevo valor (actualizado). 
    - IE10 en Windows 8 puede presentar el siguiente mensaje de error  "SCRIPT5: Access is denied" if "integrity" settings are not set correctly.
    - Chrome en Local no funciona correctamente

- Métodos de *LocalStorage*
    - setItem() Guardando datos
    ```javascript
        localStorage.setItem('clave', 'valor');
    ```
    
    - getItem() Recuperar un valor
    ```javascript
        console.info(localStorage.getItem('clave'));
    ```
    
    - length() Total de elementos
    ```javascript
        console.info(localStorage.length);
    ```
    
    - removeItem() Eliminar un elemento
    ```javascript
        localStorage.removeItem('clave');
    ```
    
    - clear() Eliminar todo
    ```javascript
        localStorage.clear();
    ```
    
- Comprobación
```javascript
    if (window.localStorage) {
        console.info("La función Html5 localStorage está soportada");
    } else {
        console.warn('Su navegador no soporta localStorage');
    }
    
    if (window.sessionStorage) {
        console.info('La función Html5 sessionStorage está soportada');
    } else {
        console.warn('Su navegador no soporta sessionStorage');
    } 
```
- Usando json en LocalStorage
```javascript
    var objeto = { 
        numero: 1, 
        booleano : true,
        array: ["dato", true, 2],
        cadena: "dato"
        };
    localStorage.setItem('clave', JSON.stringify(objeto));
    var objetoRecuperado = JSON.parse(localStorage.getItem('clave'));
    console.log(objetoRecuperado.booleano);    
```

- Eventos asociados
    - key: es la clave que se modifica
    - oldValue: es el valor anterior de la clave que se modifica
    - newValue: es el nuevo valor de la clave que se modifica
    - url: la página donde se modifica la clave
    - storageArea: el objeto donde se modifica la clave
    - [Usa dos Pestañas](http://stackoverflow.com/questions/3055013/html5-js-storage-event-handler)
    - Ejemplo:
    ```javascript
        window.addEventListener('storage', function(event){
            console.info("Se registran cambios en "+event.key+". El valor pasó de ser "+event.oldValue+" a "+event.newValue+".\nRecuerda que estas en "+event.url+" y usando el almacenamiento ", event.storageArea);
        });
    ```

- Trucos:
    - Sacar todas las claves guardadas
   ```javascript 
        for (var key in localStorage){
           console.log(key)
        }
    ```
    
    - Sacar todos los valores
    ```javascript
        for ( var i = 0; i < localStorage.length; i++ ) {
          console.log( localStorage.getItem( localStorage.key( i ) ) );
        }
    ```

**Ejercicios**    

1 - Crear una libreta de contactos para guardar nombre y numero de telefono usando LocalStorage
- Objetivos:
    - Guardar Nombre y telefono
    - Mostrar todos los contactos en el html
    - Botón para borrar un contacto específico
    - Botón para borrar todos los contactos
    - Botón para recuperar el telefono de un contacto
    
```javascript
    // Tu solución
```

2 - Crea una libreta de contactos para guardar multiples datos.
- Objetivos:
    - Guardar Nombre, telefono y email
    - Mostrar todos los contactos en el html
    - Botón para borrar un contacto específico
    - Botón para borrar todos los contactos
    - Botón para recuperar el telefono y email de un contacto
- Consejos:
    - Utiliza *JSON.parse()* y *JSON.stringify()* para guardar multiples datos bajo una misma clave
    
```javascript
    // Tu solución
```
### ContentEditable

- [Soporte en Navegadores](http://caniuse.com/#search=ContentEditable)

- Convencional:
    - Campos de texto
    - Formularios

- Comprobación:
```javascript 
    if (!document.body.contentEditable) {
        console.warn("No se puede utilizar contentEditable :-(");
    } else {
        console.info("Podemos utilizar contentEditable :-)");
    }    
```
- Usando *contentEditable* 
    - Atributo *contentEditable* (true, false, inherit)
    ```html 
        <!-- estilos: [contenteditable] y [contenteditable]:hover -->
        <!DOCTYPE html>
        <html>
          <body>
            <div contentEditable="true">
              Modificame... tanto como quieras!
            </div>
          </body>
        </html
    ```
    - designMode (editando todo el documento)
    ```javascript
        window.document.designMode = "on"; // off, por defecto
    ```
    
    - [execCommand](https://developer.mozilla.org/es/docs/Web/API/Document/execCommand)
        - [Demo](http://www-archive.mozilla.org/editor/midasdemo/)
        - [Código](https://developer.mozilla.org/en-US/docs/Rich-Text_Editing_in_Mozilla)
    
    - spellcheck (editando todo el documento)
    ```html
        <!DOCTYPE html>
        <html>
          <body>
            <div contentEditable="true" spellcheck="true">
              Modificame... tanto como quieras!
            </div>
          </body>
        </html
    ```


### Offline

- [Soporte en Navegadores](http://caniuse.com/#search=offline%20web%20app)

- Uso y limitaciones:
    - Aplicación disponible independientemente del estado de la conexión
    - Se acelera la carga de los archivos
    - Disminuyen las consultas al servidor
    - En algunos navegadores es necesario que el usuario permita el almacenamiento
    - Para incluir cambios en la aplicación es necesario modificar el manifiesto

    
- Comprobación:
```javascript
    if (!window.applicationCache) {
        console.warn("No se puede utilizar applicationCache :-(");
    } else {
        console.info("Podemos utilizar applicationCache :-)");
    }
```

- Verificando la conexión:
```javascript
    if (window.navigator.onLine) {
        var detalles = "<h1>Estas Conectado a Internet!!</h1>";
        detalles += "<h3>Detalles del navegador:</h3>";
        detalles += "<p>CodeName: " + navigator.appCodeName + "</p>";
        detalles += "<p>Nombre: " + navigator.appName + "</p>";
        detalles += "<p>Versión: " + navigator.appVersion + "</p>";
        detalles += "<p>Cookies Habilitadas: " + navigator.cookieEnabled + "</p>";
        detalles += "<p>Lenguaje: " + navigator.language + "</p>";
        detalles += "<p>Plataforma: " + navigator.platform + "</p>";
        detalles += "<p>User-agent header: " + navigator.userAgent + "</p>";
        document.body.innerHTML = detalles;

    } else {
        document.body.innerHTML = "<h1>No estas Conectado!!</h1>"
        console.warn("No estamos conectados a Internet!");
    }
```
- Verificando la conexión usando eventos: 
```javascript
    window.addEventListener("offline", function(){
        console.warn("Estas desconectado!")
    });
    
    window.addEventListener("online", function(){
        console.info("Estas conectado!")
    });
```

- Usando Cache (manifest):
    - Uso:
        - Los archivos son visibles en la pestaña Resources/Application Cache
        - Es necesario ajustar el MIME en algunos servidores
            ```
            // Ex: Apache
            AddType text/cache-manifest .appcache
            ```
        - El atributo manifest puede señalar a una URL pero deben tener el mismo origen que la aplicación web
        - Los sitios no pueden tener más de 5MB de datos almacenados en caché, pueden ser menos si el usuario lo cambia.
        - Si no se puede descargar el archivo de manifiesto o algún recurso especificado en él, fallará todo el proceso de actualización de la caché.
        - Añadir la versión del manifest como comentario.
        - JAMAS incluir el propio manifest dentro del manifest
        - Nuevo sistema de carga:
            - Si existe manifest, el navegador carga el documento y sus recursos asociados directamente desde local.
            - Se verifica si hubo actualizaciones al manifest.
            - Si se actualizo, el navegador descarga la nueva versión del archivo y de los recursos listados en él (segundo plano).
    - Estructura
        - CACHE, lo que se cacheará
        - NETWORK, lo que NO se cacheará
        - FALLBACK, que se visualizará si algo no esta disponible de manera offline
    
    - Incluyendo el manifest
    ```html
        <html manifest="ejemplo.appcache"> 
          <!-- ... -->
        </html>
    ```
    
    - Ejemplo de Manifest
    ```
        CACHE MANIFEST
        # versión 1.0
        
        # SI CACHEAR
        CACHE:
        index.html
        offline.html
        css/style.css 
        js/script.js
        img1.jpg
        img2.jpg
        img3.jpg
        logo.png
        
        # Mostraremos offline.html cuando algo falle
        FALLBACK:
        offline.html
        
        # NO CACHEAR
        NETWORK:
        *
        # * es todo aquello que no este en CACHE
    ```
    
- Estados de Cache (manifest):
```javascript
    var appCache = window.applicationCache;

    switch (appCache.status) {
      case appCache.UNCACHED: // appCache.status == 0
        console.warn('Un objeto caché de la aplicación no se inicializó correctamente o falló.');
        break;
      case appCache.IDLE: // appCache.status == 1
        console.info('La caché no esta en uso.');
        break;
      case appCache.CHECKING: // appCache.status == 2
        console.info('El manifesto se ha obtenido y esta siendo revisado para actualizarse.');
        break;
      case appCache.DOWNLOADING: // appCache.status == 3
        console.info('Se estan descargando nuevos recursos debido a una actualización del manifesto.');
        break;
      case appCache.UPDATEREADY: // appCache.status == 4
        console.info('Hay una nueva versión del manifiesto.');
        break;
      case appCache.OBSOLETE: // appCache.status == 5
        console.info('El caché esta ahora obsoleto');
        break;
      default:
        console.warn('El Caché esta en estado desconocido');
        break;
    };
```    

- Eventos de Cache:
```javascript
function eventosCache(){

var appCache = window.applicationCache;
appCache.addEventListener('cached', chivato);
appCache.addEventListener('checking', chivato);
appCache.addEventListener('downloading', chivato);
appCache.addEventListener('error', chivato);
appCache.addEventListener('noupdate', chivato);
appCache.addEventListener('obsolete', chivato);
appCache.addEventListener('progress', chivato);
appCache.addEventListener('updateready', chivato);

    function chivato(e) {
        var conexion = (navigator.onLine) ? 'sí': 'no';
        var type = e.type;
        console.log('Conectado: ' + conexion+', Evento: ' + type +", \nMás Información: %O", e);
    }

} 
```

- Forzar la actualización (manualmente):

```javascript
var appCache = window.applicationCache;

appCache.update(); // Intentamos actualizar la versión del usuario con un nuevo manifest

if (appCache.status == window.applicationCache.UPDATEREADY) {
  appCache.swapCache();  // La ctualización es correcta y se cambiado a la nueva versión
}
```

### History

- Comprobación:
```javascript
    if (!window.history) {
        console.warn("No se puede utilizar history :-(");
    } else {
        console.info("Podemos utilizar history :-)");
    }
```

- Métodos de *History* 
    - length (total de entradas disponibles en el historial)
    ```javascript
        console.info(window.history.length);
    ```
    
    - go (hacia delante o hacia atras en función del numero) 
    ```javascript
        window.history.go(-1);// <- 1
        window.history.go(2); // 2 ->
        window.history.go(0); // refresh
        // sí te sales de rango, no pasa nada.
    ```

    - back (retrocede) 
    ```javascript
        window.history.back()
    ```

    - forward (avanza) 
    ```javascript
        window.history.forward()
    ```

- Métodos Avanzados de *History* 

    - pushState (añadir entradas al historial) 
    ```javascript
        // pushState(data, title , url)
        window.history.pushState({pag: 1}, "titulo 1", "?pag=1");
        console.log(history.state)
    ```

    - replaceState (remplazar entradas en el historial) 
    ```javascript
        // replaceState(data, title , url)
        window.history.replaceState({pag: 5}, "titulo 5", "?pag=5");
        console.log(history.state)
    ```


- Eventos de *History*
    - onpopstate (monitorizar cambios en el historial) 
    ```javascript
        window.onpopstate = function(event) {
          console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
        };
    ```
    
### Eventos (custom)
```javascript
document.body.addEventListener("eventoCustom", function(e) {
	
	console.info("Detalles del evento: ", e);
	console.info("Información adiccional: ", e.detail);
	e.detail.metodo1();
});

var miEvento = new CustomEvent("eventoCustom", {
  detail: {
    dato1: "Hola!",
    metodo1: function(){
        console.log(this.dato1);
    }
  }
});

document.body.dispatchEvent(miEvento);
```

- [Soporte](http://caniuse.com/#search=customEvent)


# Trucos avanzados

### Objeto de Configuración

- **Claves:**
    - Gestionar multiples parametros en funciones
    - No importa el orden (legibilidad y escalabilidad)

```javascript

    var misParametros = {
        nombre: "Ulises",
        usaGithub: true,
        usuario: "ulisesGascon",
        ultimaSesion: "Ahora mismo... conectado"
    };
    
    var otrosParametros = {
        nombre: "Luis",
        usaGithub: true
    };
    
    function pruebaObjeto ( obj ){
        console.info("Te llamas "+obj.nombre);
        if(obj.usaGithub){
            var desconocido = "__Desconocido__"
            var usuario = obj.usuario || desconocido;
            var ultimaSesion = obj.ultimaSesion || desconocido;
        
            console.warn("Y se que tu usuario es "+usuario+". \nTu última conexión: "+ultimaSesion);
        } else {
            console.warn("Parece... que no tienes GitHub!")
        }
    }
    
    /*
    pruebaObjeto (misParametros);
    
    pruebaObjeto(otrosParametros);    
    
    pruebaObjeto({
        nombre: "Carlos"
    });
    */
```


### Propiedades y Métodos Privados

- **Claves:**
    - Normalmente los nombres de variables y funciones suelen preceder de guion bajo (_varInterna) 

```javascript
    var constructorCocheEmpresa = function (marca, modelo, antiguedad, color) {
        this.marca = marca;
        this.modelo = modelo;
        this.antiguedad = antiguedad;
        this.color = color;

        var _ITVPasada = true;
        var _ITVfrecuencia = "Cada año";
        var _seguroEnRegla = true;
        var _companySeguros = "SegurExpress";
        var _tipoSeguro = "a terceros";


        function _dameDetalles(){
          console.log("Tu coche es un "+marca+" "+modelo+" con "+antiguedad+" años y color "+color);
        }

        function _datosPrivados() {
            if (_ITVPasada && _seguroEnRegla)
                console.info("INFO: Todo en Regla, tienes que pasar la ITV "+_ITVfrecuencia+". Tienes un seguro "+_tipoSeguro+" con "+_companySeguros);
            else{
                console.error("ALERTA! El coche no puede usarse. El seguro o la ITV no esta en regla.");
            }
        }

        _datosPrivados();
        _dameDetalles();
    };

    // var miCoche = new constructorCocheEmpresa ("Audi", "S8", 2, "negro", "Berlina");
```

### Private Members

- **Claves:**
    - Metodos que permiten acceder a datos privados de una manera controlada.

```javascript
    var constructorCocheEmpresa = function (marca, modelo, antiguedad, color) {
        this.marca = marca;
        this.modelo = modelo;
        this.antiguedad = antiguedad;
        this.color = color;
        var _ITVPasada = true;
        var _ITVfrecuencia = "Cada año";
        var _seguroEnRegla = true;
        var _companySeguros = "SegurExpress";
        var _tipoSeguro = "a terceros";

        this.dameDetalles = function(){
          console.log("Tu coche es un "+marca+" "+modelo+" con "+antiguedad+" años y color "+color);
        }

        this.datosPrivados = function() {
            if (_ITVPasada && _seguroEnRegla)
                console.info("INFO: Todo en Regla, tienes que pasar la ITV "+_ITVfrecuencia+". Tienes un seguro "+_tipoSeguro+" con "+_companySeguros);
            else{
                console.error("ALERTA! El coche no puede usarse. El seguro o la ITV no esta en regla.");
            }
        }
    };

    /* 
    var miCoche = new constructorCocheEmpresa ("Audi", "S8", 2, "negro", "Berlina");
    miCoche.datosPrivados()
    miCoche.dameDetalles()
    */
```


### Funciones anónimas autoejecutadas

- **Sintaxis:**
```javascript
    (function(){
      console.log('Hola Mundo!');
    })();
```

- **Incluyendo referencias y manipulando otros elementos:**
```javascript
    var myApp = myApp || {};
    
    (function(w, doc, ns){
      
      ns.accesoWindow = function(){
        return w === window;
      };
      ns.accesoDocument = function(){
        return doc === document;
      };
      ns.confirmacion = function(){
        console.log('Hola Mundo! Mis caracteristicas son: \n Acceso a Window: '+this.accesoWindow()+'\n Acceso a Document: '+this.accesoDocument());
      }
    })(window, document, myApp);

    
    // myApp.confirmacion()
```

### Memoization

- **Claves:**
    - Nos permite "cachear" resultados para agilizar los procesos más complejos

- **Intentaremos resolver la [Sucesión de Fibonacci](https://www.wikiwand.com/es/Sucesi%C3%B3n_de_Fibonacci):**
    - *Fibonacci sin Cachear:*
    ```javascript
        var fibonacci = function(numero) {
          return numero == 0 ? 0 :
                 numero == 1 ? 1 :
                 fibonacci(numero-1) + fibonacci(numero-2);
        };
        console.log( "fibonacci(34) = " + fibonacci(34));
    ```
    - *Fibonacci cacheado (No Optimizado):*
    ```javascript
        var fibonacci = function(numero) {
          return numero == 0 ? 0 :
                 numero == 1 ? 1 :
                 fibonacci(numero-1) + fibonacci(numero-2);
        };
        
        var fibonacci_cache = function(numero, cache) {
          if(!cache[numero]) {
            cache[numero] = fibonacci(numero);
          }
          return cache[numero];
        };
        
        var cache = {};
        console.warn("fibonacci_cache(34, cache) = " + fibonacci_cache(34, cache));
        console.info("fibonacci_cache(34, cache) = " + fibonacci_cache(34, cache));
    ```
    - *Fibonacci cacheado (Optimizado):*
    ```javascript
        var fibonacci = function(numero) {
          return numero == 0 ? 0 : 
                 numero == 1 ? 1 :
                 fibonacci(numero-1) + fibonacci(numero-2);
        };
        
        var cachify = function(f, cache) {
          return function(numero) {
            if(!cache[numero]) {
              cache[numero] = f(numero);
            }
            return cache[numero];
          };
        };
        
        var cache = {};
        fibonacci = cachify(fibonacci, cache);
        
        console.info("fibonacci(1476) = " + fibonacci(1476), cache );
        console.info("fibonacci(1476) = " + fibonacci(1476), cache );
    ```
    
    - [Rendimiento comparado: sin memoization](http://jsperf.com/fibonacci-cache)
    - [Rendimiento comparado: memoization simple vs. compleja](http://jsperf.com/fibonacci-cacheado)

**Ejercicio**

1 - Aplicaremos este mismo concepto a la función de [calculo factorial](http://www.wikiwand.com/es/Factorial) que vimos en clases anteriores.

```javascript
    // Tu solución
```

# Patrones de código

### 3 Capas

- CSS (Diseño)
    - en archivos.css 

- HTML (Contenido)
    - Nada de css o js en línea
    - Manejo de eventos en archivos.js

- JS (Funcionalidad y plantillas)
    - en archivos.js

### Namespace

> Un espacio de nombres es un contenedor abstracto en el que un grupo de uno o más identificadores únicos pueden existir. Un identificador definido en un espacio de nombres está asociado con ese espacio de nombres. El mismo identificador puede independientemente ser definido en múltiples espacios de nombres, eso es, el sentido asociado con un identificador definido en un espacio de nombres es independiente del mismo identificador declarado en otro espacio de nombres. Los lenguajes que manejan espacio de nombres especifican las reglas que determinan a qué espacio de nombres pertenece una instancia de un identificador. *[Wikipedia](http://www.wikiwand.com/es/Espacio_de_nombres)*

- **Claves**
    - Reducir el número de objetos globales
    - Todo forma parte de un único objeto
    - Se puede trabajar en diversos archivos .js

- **Namespace (función anónima):**
    ```javascript
        var myApp = (function () {
            // privado
            var metodoPrivado1 = function () {
                console.info("Método Privado 1");
            };
            var metodoPrivado2 = function () {
                console.info("Método Privado 2");           
            };
            var propiedadPrivada1 = 'dato1';
            return {
                // público
                metodoPublico1: metodoPrivado1,
                propiedadesPublicas:{
                    propiedad1: propiedadPrivada1,
                    otro: "otro"
                },
                mas:{
                    MetodoPublico2: metodoPrivado2
                }
                //...
            }
        })();
    ```

- **Namespace (Extensión):**
    ```javascript
        var myApp = myApp || {};

        (function( namespace ){
            namespace.propiedad1 = "Propiedad 1";
            namespace.metodo1 = function(){
                return "metodo1";
            };
        })(myApp);
        console.log(myApp); 
    ```

- **Usando Namespace:**
    ```javascript
        // global
        var myApp = myApp || {};
        
        // sub-objeto
        myApp.ejemploDatos = {}
        
        myApp.ejemploDatos = {
            metodo: function () {
                console.log("esto es un metodo");           
            },
            propiedad1: 1,
            propiedad2: "dos"
        }
    ```

- **Simplificar la creación de elementos:**
    ```javascript
        var myApp = myApp || {};
        
        myApp.crearElemento = function(nombre){
            var partes = nombre.split('.');
            var nameSpace = myApp;
            for (var i in partes) {
                if (!nameSpace[partes[i]]) {
                    nameSpace[partes[i]] = {};
                }
                nameSpace = nameSpace[partes[i]];
            }
        }
        
        myApp.crearElemento('uno.dos.tres.cuatro.cinco.y.mas.niveles');
        myApp.uno.dos.tres.cuatro.cinco.y.mas.niveles = "Funciona!"
    ```

### Init-time branching

- **Claves:**
    - Cuando algo no cambia durante la ejecucción
    - Se carga una vez al principio y devuelve funciones segun la condicción

```javascript

    var myApp = {};
    
    myApp.eventos = {
        agregar: null,
        quitar: null,
        manejador: function(evento){
        
            console.log("-----------------------------")
            console.log("Type: "+evento.type); // Tipo
            console.log("Bubbles: "+evento.bubbles); // sube por el DOM
            console.log("Cancelable: "+evento.cancelable);
            console.log("CurrentTarget: ", evento.currentTarget);
            console.log("DefaultPrevented: "+evento.defaultPrevented);
            console.log("EventPhase: "+evento.eventPhase);
            console.log("Target: ", evento.target);
            console.log("TimeStamp: "+evento.timeStamp);
            console.log("IsTrusted: "+evento.isTrusted); // true - Usuario o false - Script
            console.log("=============================")
        
        }
    };
    
    if (typeof window.addEventListener === 'function') {
        myApp.eventos.agregar = function(el, type, fn) {
            el.addEventListener(type, fn, false);
        };
        myApp.eventos.quitar = function(el, type, fn) {
            el.removeEventListener(type, fn, false);
        };
    } else { // IE8
        myApp.eventos.agregar = function(el, type, fn) {
            el.attachEvent('on' + type, fn);
        };
        myApp.eventos.quitar = function(el, type, fn) {
            el.detachEvent('on' + type, fn);
        };
    }
    
    /*
        myApp.eventos.agregar(window, 'click', myApp.eventos.manejador);
        myApp.eventos.quitar(window, 'click', myApp.eventos.manejador);
    */
    
```

### Lazy Definition

> En la teoría de lenguajes de programación, La evaluación perezosa (del inglés lazy evaluation) o llamada por necesidad es una estrategia de evaluación que retrasa el cálculo de una expresión hasta que su valor sea necesario, y que también evita repetir la evaluación en caso de ser necesaria en posteriores ocasiones. Esta compartición del cálculo puede reducir el tiempo de ejecución de ciertas funciones de forma exponencial, comparado con otros tipos de evaluación. *[Wikipedia](http://www.wikiwand.com/es/Evaluaci%C3%B3n_perezosa)*

- **Claves:**
    - Se crean las funciones cuando se ejecuta por primera vez 
    - Ahorra recursos en calculos complejos
```javascript
    
    var myApp = {};
    
    myApp.eventos = {
        agregar: function(el, type, fn) {
            if (typeof window.addEventListener === 'function') {
                myApp.eventos.agregar = function(el, type, fn) {
                    el.addEventListener(type, fn, false);
                };
            } else { // IE8
                myApp.eventos.agregar = function(el, type, fn) {
                    el.attachEvent('on' + type, fn);
                };
            }
            
            myApp.eventos.agregar(el, type, fn);
        },
        quitar: function(el, type, fn) {
            if (typeof window.addEventListener === 'function') {
                myApp.eventos.quitar = function(el, type, fn) {
                    el.removeEventListener(type, fn, false);
                };
            } else { // IE8
                myApp.eventos.quitar = function(el, type, fn) {
                    el.detachEvent('on' + type, fn);
                };
            }
            myApp.eventos.quitar(el, type, fn);
        },
        manejador: function(evento){
        
            console.log("-----------------------------")
            console.log("Type: "+evento.type); // Tipo
            console.log("Bubbles: "+evento.bubbles); // sube por el DOM
            console.log("Cancelable: "+evento.cancelable);
            console.log("CurrentTarget: ", evento.currentTarget);
            console.log("DefaultPrevented: "+evento.defaultPrevented);
            console.log("EventPhase: "+evento.eventPhase);
            console.log("Target: ", evento.target);
            console.log("TimeStamp: "+evento.timeStamp);
            console.log("IsTrusted: "+evento.isTrusted); // true - Usuario o false - Script
            console.log("=============================")
        
        }
    };
    
    /*
        myApp.eventos.agregar(window, 'click', myApp.eventos.manejador);
        myApp.eventos.quitar(window, 'click', myApp.eventos.manejador);
    */

```

### Module

> La meta del Patrón para Diseño de Software, consiste en proporcionar las características y estructura sintáctica, definida por el paradigma de Programación Modular, a Lenguajes de Programación, que no lo soportan completamente, o que solo lo soportan de forma incompleta.

> Este patrón requiere 2 elementos, un elemento es el elemento de definición; el cual, puede ser un grupo de código fuente, un solo objeto, o una sola clase, que aplica este patrón. Y el otro, es el elemento de implementación, el cual es un grupo de código fuente, un solo objeto, o una sola clase, que utiliza el elemento de definición.

> Un elemento, puede utilizar ambos casos, definir un patrón, y aplicar otro. Es común, en este patrón, que se aplique varias veces, en una misma aplicación. *[Wikipedia](https://www.wikiwand.com/es/Module_(patr%C3%B3n_de_dise%C3%B1o))*

- **Claves:**
    - Usamos funciones anonimas autoejecutadas
    - Encapsulamos la lógica
    - Exponemos solo parte 

```javascript
    var mates = mates || {};
    
    mates.operaciones = (function() {
      var total = 0;
    
      return {
        sumar: function(a, b){
          var suma = a + b;
          total += suma;
          return suma;
        },
        restar: function(a, b){
          var resta = a - b;
          total -= resta;
          return resta;
        },
        total: function(){
          return total;
        }
      };
    })();
    
    mates.operaciones.total();  
    mates.operaciones.sumar(12, 21);
    mates.operaciones.total();
    mates.operaciones.restar(40, 1);
    mates.operaciones.total();
```


### Revealing Module Pattern

- **Claves:**
    - Incluir métodos privados en el retorno

```javascript
    var constructorCocheEmpresa = function (marca, modelo, antiguedad, color) {
        this.marca = marca;
        this.modelo = modelo;
        this.antiguedad = antiguedad;
        this.color = color;

        var _ITVPasada = true;
        var _ITVfrecuencia = "Cada año";
        var _seguroEnRegla = true;
        var _companySeguros = "SegurExpress";
        var _tipoSeguro = "a terceros";



        function _dameDetalles(){
          console.log("Tu coche es un "+marca+" "+modelo+" con "+antiguedad+" años y color "+color);
        }

        function _datosPrivados() {
            if (_ITVPasada && _seguroEnRegla)
                console.info("INFO: Todo en Regla, tienes que pasar la ITV "+_ITVfrecuencia+". Tienes un seguro "+_tipoSeguro+" con "+_companySeguros);
            else{
                console.error("ALERTA! El coche no puede usarse. El seguro o la ITV no esta en regla.");
            }
        }
        
        return {
         datosPrivados:   _datosPrivados,
         dameDetalles:   _dameDetalles
        }
    };

    /* 
    var miCoche = new constructorCocheEmpresa ("Audi", "S8", 2, "negro", "Berlina");
    miCoche.datosPrivados();
    miCoche.dameDetalles();
    */

```

# Patrones de diseño

### Prototype

> Este patrón resulta útil en escenarios donde es preciso abstraer la lógica que decide qué tipos de objetos utilizará una aplicación, de la lógica que luego usarán esos objetos en su ejecución. Los motivos de esta separación pueden ser variados, por ejemplo, puede ser que la aplicación deba basarse en alguna configuración o parámetro en tiempo de ejecución para decidir el tipo de objetos que se debe crear. En ese caso, la aplicación necesitará crear nuevos objetos a partir de modelos. Estos modelos, o prototipos, son clonados y el nuevo objeto será una copia exacta de los mismos, con el mismo estado. Como decimos, esto resulta interesante para crear, en tiempo de ejecución, copias de objetos concretos inicialmente fijados, o también cuando sólo existe un número pequeño de combinaciones diferentes de estado para las instancias de una clase.

> Dicho de otro modo, este patrón propone la creación de distintas variantes de objetos que nuestra aplicación necesite, en el momento y contexto adecuado. Toda la lógica necesaria para la decisión sobre el tipo de objetos que usará la aplicación en su ejecución se hace independiente, de manera que el código que utiliza estos objetos solicitará una copia del objeto que necesite. En este contexto, una copia significa otra instancia del objeto. El único requisito que debe cumplir este objeto es suministrar la funcionalidad de clonarse. *[Wikipedia](https://www.wikiwand.com/es/Prototype_(patr%C3%B3n_de_dise%C3%B1o))*

- **Clonación simple:**
```javascript
  var coche = {
      marca: "Seat",
      modelo: "Panda",
      antiguedad: 20,
      color: "azul",
      tipo: "turismo"
  };

  var clonCoche = Object.create(coche);

  console.log(clonCoche.marca+" "+clonCoche.modelo);  
```

- **Clonación compleja:**
```javascript
    var coche = {
      marca: "Land Rover",
      modelo: "Santana Aníbal",
      antiguedad: 35,
      color: "Marrón tierra",
      tipo: "4x4",
      detalles: dameDetalles
    };
    
    var furgon = {
      taraMinima: 1200,
      cargaUtil: 768,
      volumenCarga: 4.5,
      detalles: detallesTecnicos
    };
    
    var conductor = {
      nombre: "Yo",
      apellido: "Mismo",
      experiencia: 10000,
      limite: 120,
      detalles: function(){
        console.info("El conductor es "+ this.nombre + " " +this.apellido+". Con "+this.experiencia+" horas de experiencia y una restricción a "+this.limite+"Km/h.");
      }
    }
    
    function dameDetalles(){
      console.log("Tu coche es un "+this.marca+" "+this.modelo+" con "+this.antiguedad+" años, clase "+this.tipo+" y color "+this.color);
    };
    
    function detallesTecnicos(){
      console.warn("Tu coche tiene una Tara mínima de "+this.taraMinima+". Carga útil de "+this.cargaUtil+" y un volumen de carga de "+this.volumenCarga+"m3");
    };
    
    // Patrón de Prototype
    var miPickup = Object.create(coche, { 
        'conductor': { value: conductor },
        'carga': { value: furgon} 
      });
    
    
    miPickup.detalles();
    miPickup.carga.detalles();
    miPickup.conductor.detalles();
    console.log("Es \"coche\" prototipo de \"miPickup\" ? "+coche.isPrototypeOf(miPickup));
    console.log("Es \"conductor\" prototipo de \"miPickup\" ? "+conductor.isPrototypeOf(miPickup));
    console.log("Es \"furgon\" prototipo de \"miPickup\" ? "+furgon.isPrototypeOf(miPickup));
```

### Decorator

> El patrón Decorator responde a la necesidad de añadir dinámicamente funcionalidad a un Objeto. Esto nos permite no tener que crear sucesivas clases que hereden de la primera incorporando la nueva funcionalidad, sino otras que la implementan y se asocian a la primera. *[Wikipedia](https://www.wikiwand.com/es/Decorator_(patr%C3%B3n_de_dise%C3%B1o))*

- **Claves:**
    - Extender objetos.
    - Sobreescribir dinamicamente los métodos.

- **Añadiendo una funcionalidad:**
```javascript
function constructorCoches( color ){
  this.marca = "Seat";
  this.modelo = "Ibiza";
  this.antiguedad = 20;
  this.color = color || "rojo";
  this.detalles = function (){
    console.log("Tu coche es un "+this.marca+" "+this.modelo+" con "+this.antiguedad+" años y color "+this.color);
  }
}


var cocheRojo = new constructorCoches();
cocheRojo.detalles();


var otroCoche = new constructorCoches( "Azul" );
otroCoche.detalles();


// Decorator
otroCoche.definirModelo = function( nuevoModelo ){
this.modelo = nuevoModelo;
};

otroCoche.definirColor = function( nuevoColor ){
this.color = nuevoColor;
};

otroCoche.definirModelo( "Panda" );
otroCoche.definirColor( "Azul Oscuro" );
otroCoche.detalles();

var nuevoCoche = new constructorCoches( "Verde" );
nuevoCoche.detalles();
```

- **Añadiendo multiples funcionalidades:**
```javascript
// Constructor
function constructorCoches( color ){
  this.marca = "Seat";
  this.modelo = "Ibiza";
  this.antiguedad = 20;
  this.color = color || "rojo";
  this.extras = 0;
  this.detalles = function (){
    console.log("Tu coche es un "+this.marca+" "+this.modelo+" con "+this.antiguedad+" años y color "+this.color);
  }
}

// Decorator 1
function gps( coche ) {
  coche.gps = true;
  coche.extras++;
}

// Decorator 2
function aireAcondiccionado( coche ){
  coche["aire acondiccionado"] = true;
  coche.extras++;
}

// Decorator 3
function elevaLunas( coche ){
  coche.elevaLunas = true;
  coche.extras++;
}

// Decorator 4
function farosLed( coche ){
  coche["faros led"] = true;
  coche.extras++;
}

// Decorator 5
function detallesTecnicos( coche ){
  coche.detallesTecnicos = function(){
    if(coche.extras > 0){
      console.info("El coche tiene "+coche.extras+" extras: \n");
      (coche.gps) ? console.log("- GPS"):console.log("- SIN GPS");
      (coche["aire acondiccionado"]) ? console.log("- Aire acondiccionado"):console.log("- SIN Aire acondiccionado");
      (coche["faros led"]) ? console.log("- Faros Led"):console.log("- SIN Faros Led");
      (coche.elevaLunas) ? console.log("- Elevalunas"):console.log("- SIN Elevalunas");
    } else {
      console.info("Parece.. que no se han añadido extras aun.");
    }
  };
}

var cocheRojo = new constructorCoches();
cocheRojo.detalles();


// Aplicando cambios
detallesTecnicos(cocheRojo);
cocheRojo.detallesTecnicos();

// Aplicando más cambios
gps(cocheRojo);
aireAcondiccionado(cocheRojo);
elevaLunas(cocheRojo);
farosLed(cocheRojo);
cocheRojo.detallesTecnicos();


var nuevoCoche = new constructorCoches( "Verde" );
nuevoCoche.detalles();
```

**Ejercicio**

1 - Aplicaremos algunos de los conceptos aprendidos para mejorar el cajero automático que creamos anteriormente.
- Objetivos:
    - Desarrolla el HTML y CSS necesario. Ya no utilizaremos la consola.
    - Toda la interación seguirá la filosofía de la [programación dirigida por eventos](https://es.wikipedia.org/wiki/Programaci%C3%B3n_dirigida_por_eventos)
    - Usa una *función anónima autoejecutada* para encapsular el código
    - Utiliza el *return* para gestionar los métodos y propiedades privadas
- Opcional:
    - usar el patrón *init-time branching* para gestionar los eventos

```javascript
    // Tu solución
```


2 - Adaptamos el cajero para que funcione offline
```javascript
    // Tu solución
```