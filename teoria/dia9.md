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
