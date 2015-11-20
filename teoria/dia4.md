**Objetos Literales**

- Propiedades:
    ```javascript
	var miObjeto = {
	    cadena: 'esto es una cadena',
	    numero: 2,
	    booleano: false
	};
	```


- Métodos:
    ```javascript
	var miObjeto = {
	    saludar: function(){
			console.log("hola!");
		}
	};
	```
	
- Trabajando con espacios y caracteres especiales:
    ```javascript
	var miObjeto = {
		nombre: "objeto",
	    "año": 2015,
	    "estado del sistema": "correcto"
	};
	
	console.log(miObjeto["año"]);
	miObjeto["estado del sistema"] = "fuera de servicio";
	console.log(miObjeto["estado del sistema"]);
	```

- Acortar objetos:

    ```javascript
	var objetoAbreviado = objeto.muy.muy.largo.que.tiene.muchos["metodos y propiedades"];
	
	objetoAbreviado.propiedad1;
	objetoAbreviado.metodo1();

	```



**Ejercicios**

19 - Necesitamos saber cuantos pasajeros están utilizando cada una de estas rutas temporales, para ellos la empresa decide añadir un numero de billete para cada pasajero.  El número de billete tiene que seguir una estructura fija.

*Nota: El formato del número de billete deseado:
- (Inicial de la estación)(número de viajero) -> H1 (Hortaleza 1), T120 (Tetuan 120), M110 (Moncloa 110), etc...*

```javascript
    var nuevasRutas = [ ["Tetuán", 12], ["Moncloa", 19], ["Hortaleza", 21] ];

	function constructorDeTickets (estacion, tiempo) {
		var numeroPasajero = 0;
		return function (nombre) {
			numeroPasajero++;
			console.log("Sr/a. "+nombre+".\n Muchas gracias por adquirir este ticket gratuito en el "+estacion+" express.\n Billete Número:\t"+(estacion.charAt(0)+numeroPasajero)+"\n El tiempo estimado de llegada es de "+tiempo+" minutos.\n  Estamos trabajando en la mejora de nuestra vía principal, disculpe las molestias!");
		};
	}

	var tetuanExpress = constructorDeTickets ("Tetuán", 12);
	var moncloaExpress = constructorDeTickets (nuevasRutas[1][0], nuevasRutas[1][1]);
	var hortalezaExpress = constructorDeTickets (nuevasRutas[2][0], nuevasRutas[2][1]);
	
	
	tetuanExpress ("Pepe");
	moncloaExpress ("Luis");
	hortalezaExpress ("Hector");
```


20 - Gracias al ejercicio anterior, hemos podido saber a groso modo cuantos pasajeros van en cada línea.

La empresa considera que con estos datos, usará trenes con menos vagones que le permitirán transportar a los pasajeros en menos tiempo.

Pero existe el riesgo de dejar pasajeros esperando mucho tiempo.

Así que haremos una nueva función que avise al revisor cuando no quede sitio en el próximo tren.

El revisor del tren debe repartir tickets restaurante a los pasajeros para que puedan tomar una consumición gratis en la cafetería de la estación, si no tienen sitio en el próximo tren.

*Nota: La linea es única y el mismo tren cubre todo el trayecto.*

```javascript
    function capacidad (ultimoPasajero, numeroMaximo) {

		function sinSitios () {
			console.log("IMPORTANTE: No queda sitio, por favor... saca los tickets restaurante!")
			console.log ("Capacidad:\t"+ultimoPasajero+"/"+numeroMaximo);
		};
		function quedaSitio () {
			console.log ("Capacidad:\t"+ultimoPasajero+"/"+numeroMaximo);
		};

		if (ultimoPasajero >= numeroMaximo){
			sinSitios();
		} else {
			quedaSitio();
		};

	};
	
	capacidad(10, 50);
	capacidad(50, 50);
	capacidad(55, 50);
```



### JS avanzado (POO)

**POO**

- Programación basada en prototipos

>La programación basada en prototipos es un estilo de programación orientada a objetos en la que las clases no están presentes y la reutilización de comportamiento (conocido como herencia en lenguajes basados en clases) se lleva a cabo a través de un proceso de decoración de objetos existentes que sirven de prototipos. Este modelo también se conoce como programación sin clases, orientada a prototipos o basada en ejemplos.
>[Mozilla developer network](https://developer.mozilla.org/es/docs/Web/JavaScript/Introducci%C3%B3n_a_JavaScript_orientado_a_objetos)


- Terminología

> 
- Clase
	- Define las características del Objeto.
- Objeto
	- Una instancia de una Clase.
- Propiedad
	- Una característica del Objeto, como el color.
- Método
	- Una capacidad del Objeto, como caminar.
- Constructor
	- Es un método llamado en el momento de la creación de instancias.
- Herencia
	- Una Clase puede heredar características de otra Clase.
- Encapsulamiento
	- Una Clase sólo define las características del Objeto, un Método sólo define cómo se ejecuta el Método.
- Abstracción
	- La conjunción de herencia compleja, métodos, propiedades que un objeto debe ser capaz de simular en un modelo de la realidad.
- Polimorfismo
	- Diferentes Clases podrían definir el mismo método o propiedad.
> - [Mozilla developer network](https://developer.mozilla.org/es/docs/Web/JavaScript/Introducci%C3%B3n_a_JavaScript_orientado_a_objetos)


- Entendiendo los objetos:
```javascript
	/*
	[Objeto]{
	    [ Propiedad = Variables (no funciónes) ]
	    [ Método = Solo funciónes ]
	}
	*/
```


- Constructor de Objetos:
```javascript
	var coche = function (parametros) {
	    /* Codigo*/
	};
```


- Propiedades del Objeto:
```javascript
	var coche = function (marca, modelo, antiguedad, color, tipo) {
	    this.marca = marca;
	    this.modelo = modelo;
	    this.antiguedad = antiguedad
	    this.color = color;
	    this.tipo = tipo;
	};
```


- Métodos (En el Constructor):
```javascript
	var coche = function (marca, modelo, antiguedad, color, tipo) {
	    this.marca = marca;
	    this.modelo = modelo;
	    this.antiguedad = antiguedad;
	    this.color = color;
	    this.tipo = tipo;
	    if (isNaN(this.antiguedad)) {
	        console.log("Error en el data-typing, antiguedad no es un número");
	    }
	    this.detalles = function(){
	      console.log("Tu coche es un "+this.marca+" "+this.modelo+" con "+this.antiguedad+" años, clase "+this.tipo+" y color "+this.color);
	    }
	};

	var miCoche = new coche ("Seat", "Panda", 20, "azul", "turismo");
	miCoche.detalles();
```


- Métodos (Extensión del prototipo):
```javascript
	var coche = function (marca, modelo, antiguedad, color, tipo) {
	    this.marca = marca;
	    this.modelo = modelo;
	    this.antiguedad = antiguedad;
	    this.color = color;
	    this.tipo = tipo;
	    if (isNaN(this.antiguedad)) {
	        console.log("Error en el data-typing, antigüedad no es un número");
	    }
	};

	coche.prototype.detalles = function(){
	  console.log("Tu coche es un "+this.marca+" "+this.modelo+" con "+this.antiguedad+" años, clase "+this.tipo+" y color "+this.color);
	}

	var miCoche = new coche ("Seat", "Panda", 20, "azul", "turismo");
	miCoche.detalles();
```


- Métodos (Vinculación Externa):
```javascript
	var coche = function (marca, modelo, antiguedad, color, tipo) {
	    this.marca = marca;
	    this.modelo = modelo;
	    this.antiguedad = antiguedad;
	    this.color = color;
	    this.tipo = tipo;
	    if (isNaN(this.antiguedad)) {
	        console.log("Error en el data-typing, antigüedad no es un número");
	    }
	    this.detalles = dameDetalles;
	};

	function dameDetalles(){
	  console.log("Tu coche es un "+this.marca+" "+this.modelo+" con "+this.antiguedad+" años, clase "+this.tipo+" y color "+this.color);
	}

	var miCoche = new coche ("Seat", "Panda", 20, "azul", "turismo");
	miCoche.detalles();
```


- Herencia:
```javascript
	var coche = function (marca, modelo, antiguedad, color, tipo) {
	    this.marca = marca;
	    this.modelo = modelo;
	    this.antiguedad = antiguedad;
	    this.color = color;
	    this.tipo = tipo;
	    if (isNaN(this.antiguedad)) {
	        console.log("Error en el data-typing, antigüedad no es un número");
	    }
	    this.detalles = dameDetalles;
	};

	var furgon = function (taraMinima, cargaUtil, volumenCarga) {
	    this.taraMinima = taraMinima;
	    this.cargaUtil = cargaUtil;
	    this.volumenCarga = volumenCarga;
	    if (isNaN(this.taraMinima) || isNaN(this.cargaUtil) || isNaN(this.volumenCarga)) {
	        console.log("Error en los datos. Por favor usar solo valores numéricos.");
	    }
	    this.detallesTecnicos = detallesTecnicos;
	};


	function dameDetalles(){
	  console.log("Tu coche es un "+this.marca+" "+this.modelo+" con "+this.antiguedad+" años, clase "+this.tipo+" y color "+this.color);
	}

	function detallesTecnicos(){
	  console.warn("Tu coche tiene una Tara mínima de "+this.taraMinima+". Carga útil de "+this.cargaUtil+" y un volumen de carga de "+this.volumenCarga+"m3");
	}

	var miPickup = new coche ("Land Rover", "Santana Aníbal", 35, "Marrón tierra", "4x4");
	miPickup.prototype = new furgon (1200, 768, 4.5);


	miPickup.detalles();
	miPickup.prototype.detallesTecnicos();
```

- Herencia (simplificada):
```javascript
	var perro  = function () {
	    this.patas = 4;
	    this.ojos = 2;
	};

	var pastorAleman = function () {
	    this.colorLengua = "negra";
	    this.colorOjos = "marrón";
	    this.capacidadTrabajo = true;
	    this.especialidad = "Pastoreo";
	};

	pastorAleman.prototype = new perro();

	var miPerro = new pastorAleman();
	console.log("Número patas: "+miPerro.patas+"\n Número ojos: "+miPerro.ojos+"\n Color Lengua: "+miPerro.colorLengua+"\n Color ojos: "+miPerro.colorOjos+"\n Capacidad de trabajo: "+miPerro.capacidadTrabajo+"\n Especialidad: "+miPerro.especialidad);
```


- Privado y público:
```javascript
	var cocheEmpresa = function (marca, modelo, antiguedad, color, tipo) {
	    // públicas
	    this.marca = marca;
	    this.modelo = modelo;
	    this.antiguedad = antiguedad;
	    this.color = color;
	    this.tipo = tipo;
	    
	    // privadas
	    var ITVPasada = true;
	    var ITVfrecuencia = "Cada año";
	    var seguroEnRegla = true;
	    var companySeguros = "SegurExpress";
	    var tipoSeguro = "a terceros";
		
		// Público
		this.dameDetalles = function () {
			console.log("Tu coche es un "+marca+" "+modelo+" con "+antiguedad+" años, clase "+tipo+" y color "+color);
	    }
		
		// Privadas
	    function datosPrivados() {
	        if (ITVPasada && seguroEnRegla)
	            console.info("INFO: Todo en Regla, tienes que pasar la ITV "+ITVfrecuencia+". Tienes un seguro "+tipoSeguro+" con "+companySeguros);
	        else{
	            console.error("ALERTA! El coche no puede usarse. El seguro o la ITV no esta en regla.");
	        }
	    }

	    datosPrivados();
	    this.dameDetalles();
	};

	var miCoche = new cocheEmpresa ("Audi", "S8", 2, "negro", "Berlina");
	var miCoche2 = new cocheEmpresa ("Audi", "S4", 2, "Rojo", "Compacto");
```

- Datos opcionales:
```javascript
	var cocheEmpresa = function (marca, modelo, antiguedad, color) {

	    this.marca = marca || "Seat";
	    this.modelo = modelo || "Ibiza";
	    this.antiguedad = antiguedad || 6;
	    this.color = color || "Azul Corporativo";

		this.dameDetalles = function () {
			console.log("Tu coche es un "+this.marca+" "+this.modelo+" con "+this.antiguedad+" años y color "+this.color);
	    }
		
	    this.dameDetalles();
	};

	var miCoche = new cocheEmpresa ("Audi", "S8", 2, "negro", "Berlina");
	var miCoche2 = new cocheEmpresa ();
	var otroCoche = new cocheEmpresa ("Seat", "Leon");
```


- Creando un ID:
```javascript

	var contador = 0;
	var cocheEmpresa = function (marca, modelo, antiguedad, color, tipo) {

	    this.marca = marca;
	    this.modelo = modelo;
	    this.antiguedad = antiguedad;
	    this.color = color;
	    this.tipo = tipo;
	   	this.id = contador++;
	    	    
	    var ITVPasada = true;
	    var ITVfrecuencia = "Cada año";
	    var seguroEnRegla = true;
	    var companySeguros = "SegurExpress";
	    var tipoSeguro = "a terceros";
		
		this.dameDetalles = function () {
			console.log("Tu coche es un "+marca+" "+modelo+" con "+antiguedad+" años, clase "+tipo+" y color "+color);
	    }
		
	    function datosPrivados() {
	        if (ITVPasada && seguroEnRegla)
	            console.info("INFO: Todo en Regla, tienes que pasar la ITV "+ITVfrecuencia+". Tienes un seguro "+tipoSeguro+" con "+companySeguros);
	        else{
	            console.error("ALERTA! El coche no puede usarse. El seguro o la ITV no esta en regla.");
	        }
	    }

	    function identificador(){
	        console.warn("Recuerda! Tu coche esta identificado como coche numero "+contador);
	    }
		
		
	    datosPrivados();
	    this.dameDetalles();
	    identificador();
	};

	var miCoche = new cocheEmpresa ("Audi", "S8", 2, "negro", "Berlina");
	var otroCoche = new cocheEmpresa ("Audi", "A8", 5, "gris", "Berlina");
	var miCoche2 = new cocheEmpresa ("Seat", "Ibiza", 9, "rojo", "Utilitario");
	console.info("Total de coches de empresa hasta el momento "+contador);
```


- Extensión de objetos nativos (usando prototipos):
```javascript
	Array.prototype.coincidencias = function(palabra) {
	    var coincidencias = 0;
	    for (var i=0; i<this.length; i++) {
	        if (this[i] == palabra) {
	            coincidencias++;
	        }
	    }
	    console.warn("Se encontraron "+coincidencias+" coincidencia(s) de la palabra");
	};


	var amigos = ["Charlie", "Marco", "Luis", "Jose", "Miguel", "Jose", "Luis", "Oscar"];
	amigos.coincidencias("Jose");
```

**Ejercicios Repaso - Cajero Automático**
![cajero automatico](http://rack.1.mshcdn.com/media/ZgkyMDE0LzAyLzI2L2YwL0JpdGNvaW5fQVRNLmJjN2IxLmpwZwpwCXRodW1iCTEyMDB4NjI3IwplCWpwZw/bdee5162/0fe/Bitcoin_ATM.jpg)

El objetivo de este ejercicio es crear un cajero automático que funcione solamente con la consola de Chrome.

- Importante: 
	- No es necesario utilizar POO
	- No es necesario incluir Html o css
	- No es necesario encapsular el código en una función anónima

- Objetivos:
	- Crear el cajero como un objeto literal
	- Añadir detalles como empresa, tipo, materiales, tamaño, moneda, etc...
	- Añadir métodos para el usuario administrador (añadir y retirar dinero del deposito)
	- Añadir métodos para el administrador (agregar y quitar clientes de la lista de clientes autorizados)
	- Añadir métodos para los clientes (añadir y retirar efectivo)
	- Añadir métodos para validar los clientes (Clientes autorizados) y las cantidades (números reales)

- Objetivos opcionales: 
	- Agrupa las operaciones realizadas en grupos (éxito o fracaso)
	- Crear un sistema de log que registre todas las operaciones que se realizan con la mayor cantidad de detalles
		- Tipo de error - "info" o "error".
		- origen del error - "usuario", "maquina" o "administrador".
		- (opcional) código de error - código de error
		- (opcional) detalles - Descripción del error.
	- Añadir un método para resetear (borrar) el log
		- (opcional) utilizar como parámetro un número que nos permite borrar el log solo si no se llega a una determinada cantidad de operaciones registradas.

- Consejos:
	- Refactoriza a menudo
	- Desarrolla paso a paso, usa comentarios y pseudocódigo si es necesario
	- Mantén el código fácil
	- Utiliza herramientas como [jsHint](http://jshint.com/)

```javascript
	// Tu solución
```
