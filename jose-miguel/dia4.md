# Clase 4

**Ejercicios**

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
var clientes = {
       cliente1: {
            nombre: 'juan',
            saldo: 234,
            pass: 'juan123'
        },
        cliente2: {
            nombre: 'jose',
            saldo: 682,
            pass: 'jose123'
        },
        cliente3: {
            nombre: 'oscar',
            saldo: 129,
            pass: 'oscar123'
        }
};

var cajero = {
    empresa: 'ING Direct',
    tipo: 'algun tipo',
    materiales: ['metal', 'aluminio'],
    tamaño: {
        unidad: 'mm',
        alto: 160,
        ancho: 50
    },
    moneda: '$',
    cuenta: 5000,
    listaClientes: clientes,
    clientesAutorizados: ['cliente1', 'cliente3'],
    userLogged: false,
    userLogin: function() {
      var userName = prompt('Introduzca su identificador de usuario');
      var userPass = prompt('Introduzca su contraseña');
      
      if(userName === 'admin' && userPass === 'admin') {
        cajero.userLogged = 'admin';
        return console.info('Hola administrador');
      } else if (cajero.listaClientes[userName].pass === userPass) {
        cajero.userLogged = userName;
        console.clear();
        return console.info('Hola ' + cajero.listaClientes[userName].nombre + '. Bienvenido al cajero de ' + cajero.empresa);
      } else {
        // cajero.userLogged = false;
        return console.error('Hay un error con su usuario.');
      }
    },
    userLogout: function() {
      var adiosUser = cajero.userLogged;
      if (cajero.userLogged !== false ) {
        cajero.userLogged = false;
        console.clear();
        return console.info('Hasta luego, ' + cajero.listaClientes[adiosUser].nombre + '.');
      } else {
        console.clear();
        return console.info('Tienes que logearte antes.');
      }
    },
    admin: {
        masDinero: function(dinero) {
            cajero.cuenta += + dinero;
            return console.log('Has metido ' + dinero + ' en el cajero. \n Queda ' + cajero.cuenta+cajero.moneda + ' en el cajero');
        },
        retirarDinero: function(dinero) {
            cajero.cuenta -= dinero;
            return console.log('Has sacado ' + dinero + ' en el cajero. \n Queda ' + cajero.cuenta+cajero.moneda + ' en el cajero');
        },
        cuantoQueda: function() {
            console.clear();
            return console.log('Queda ' + cajero.cuenta + cajero.moneda + ' en el cajero');
        },
        log: [],
        addToLog: function(codigo, tipo, usuario) {
          cajero.admin.log.push({
             codigo: codigo,
             tipo: tipo,
             usuario: usuario,
             fecha: new Date()
            });
        },
        removeLog: function(){
          cajero.admin.log.length = 0;
          return console.log('Has borrado el log.');
        },
        showLog: function(tipo) {
          var dato = cajero.admin.log;
          for (var i = 0; i < dato.length; i++) {
            console.log(dato[i].codigo + ' - ' + dato[i].usuario + ' - ' + dato[i].tipo);
          }
        }
    },
    cliente: {
        sacarDinero: function (cantidad) {
            var user = cajero.userLogged;
            if (cajero.listaClientes[user].saldo >= cantidad && cajero.checkUser(user, cajero.clientesAutorizados ) && cajero.userLogged !== false ) {
                cajero.listaClientes[user].saldo -= cantidad;
                cajero.cuenta -= cantidad;
                console.clear();
                cajero.admin.addToLog(400, 'info', user);
                return console.log('Has sacado ' + cantidad + cajero.moneda + ' de tu cuenta. \n Ahora tienes ' + cajero.listaClientes[user].saldo+cajero.moneda + ' en tu cuenta');
            } else if (cajero.listaClientes[user].saldo < cantidad) {
                console.clear();
                return console.error('No tienes suficiente saldo en tu cuenta.');
            } else {
              return console.error('Error desconocido');
            }
        },
        ingresarDinero: function (cantidad) {
          if (cajero.userLogged !== false){
            var user = cajero.userLogged;
            cajero.listaClientes[user].saldo += cantidad;
            cajero.cuenta += cantidad;
            console.clear();
            return console.log('Has ingresado ' + cantidad + cajero.moneda + ' de tu cuenta. \n Ahora tienes ' + cajero.listaClientes[user].saldo+cajero.moneda + ' en tu cuenta');
          } else {
            return console.error('Tienes que estar logueado para ingresar dinero.');
          }
        }
    }
};

cajero.checkUser = function(usuario, lista) {
  for (var i = 1; i <= lista.length+1; i++) {
    if ( lista.indexOf(usuario) > -1 ) {
      return true;
    } else {
      return false;
    }
  }
};
```
