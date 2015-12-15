var mainLib = {};

mainLib.cajero = (function(){
    
    var clientesBD = ["Alicia Gutierrez", "Alfonso Gomez", "Luis Navarro", "Oscar Garcia", "Andres Fernandez", "Lucia Mellado"];

    var cajeroAutomatico = {
        // Propiedades
        empresaPropietaria: "SuperExpress",
        modelo: "Al-201",
        año: 2010,
        serie: "01 Beta",
        tipo: "Prototipo",
        unidadMedida: "metros",
        alto: 1,
        ancho: 0.5,
        largo: 0.5,
        unidadPeso: "Kg",
        peso: 600,
        materiales: ["acero", "plástico", "cables", "circuitos"],
        clientesAutorizados: clientesBD,
        moneda: "Euros",
        dineroDisponible: 65000,
        volumenMedida: "m3",

        // Métodos
        sistema: {
            /**
            * Añade información sobre todo lo que ocurre en cajeroAutomatico.log.(logNUMERO).
            * Actualiza cajeroAutomatico.logTotal con operaciones fallidas y operaciones realizadas.
            * @param {string} tipo - "info" o "error".
            * @param {string} origen - "usuario", "maquina" o "administrador".
            * @param {string} codigo - código de error
            * @param {string} detalles - Descripción del error.
            */
            dataLog: function(tipo, origen, codigo, detalles) {
                cajeroAutomatico["operaciones fallidas"] = cajeroAutomatico["operaciones fallidas"] || 0;
                cajeroAutomatico["operaciones realizadas"] = cajeroAutomatico["operaciones realizadas"] || 0;
                cajeroAutomatico.logTotal = cajeroAutomatico.logTotal || 1;
                cajeroAutomatico.log = cajeroAutomatico.log || [];
                cajeroAutomatico.logTotal = cajeroAutomatico["operaciones fallidas"] + cajeroAutomatico["operaciones realizadas"];
                cajeroAutomatico.log[cajeroAutomatico.logTotal] = [cajeroAutomatico.logTotal, tipo, origen, codigo, detalles ]
            },
            esCliente: function (nombre) {
                if (cajeroAutomatico.clientesAutorizados === 0) {
                    if (debugMode) {
                        console.warn("La lista esta vacía.");
                    }
                    return false;
                } else {
                    for (var i = 0; i < cajeroAutomatico.clientesAutorizados.length; i++) {
                        if(cajeroAutomatico.clientesAutorizados[i] == nombre){
                            if (debugMode) {
                                console.info(nombre+" eres cliente de "+cajeroAutomatico.empresaPropietaria);
                            }
                            return true;
                        } else if (i == cajeroAutomatico.clientesAutorizados.length -1){
                            if (debugMode) {
                                console.warn(nombre+" no encontrado!");
                            }
                            return false;
                        }
                    }
                }
            },
            esNumero: function (n){
                return !isNaN(parseFloat(n)) && isFinite(n);
            },
            operacionRealizada: function () {
                if (isNaN(cajeroAutomatico["operaciones realizadas"]) || cajeroAutomatico["operaciones realizadas"] === undefined) {
                    cajeroAutomatico["operaciones realizadas"] = 1;
                    if(debugMode){
                        console.info("Primera operación realizada con éxito!");
                    }
                } else {
                    cajeroAutomatico["operaciones realizadas"]++;
                    if(debugMode){
                        console.info("La operación #"+cajeroAutomatico["operaciones realizadas"]+" realizada con éxito!");
                    }        
                } 
            },
            operacionFallida: function (){
                if (isNaN(cajeroAutomatico["operaciones fallidas"]) || cajeroAutomatico["operaciones fallidas"] === undefined) {
                    cajeroAutomatico["operaciones fallidas"] = 1;
                    if(debugMode){
                        console.warn("ERROR: Primera operación fallida!");
                    }
                } else {
                    cajeroAutomatico["operaciones fallidas"]++;
                    if(debugMode){
                        console.warn("ERROR: La operación #"+cajeroAutomatico["operaciones fallidas"]+" fallo!");
                    }        
                }  
            },
            borrandoDatosVacios: function (objeto, propiedad, valorMinimo) {
                if (objeto[propiedad] <= valorMinimo) {
                    delete objeto[propiedad];
                    return true;
                } else {
                    return false;
                }
            }

        },
        administrador: {
            agregarCliente: function (nombre, lista) {
                lista.push(nombre);
                cajeroAutomatico.sistema.operacionRealizada();
                cajeroAutomatico.sistema.dataLog ("info", "administrador", 11, "Ingreso de "+nombre+" a la base de datos de clientes");
                return true;
            },
            quitarCliente: function (nombre, lista) {
                if (lista.length === 0) {
                    if (debugMode) {
                        console.log("La lista esta vacía.");
                    }
                    cajeroAutomatico.sistema.operacionFallida();
                    cajeroAutomatico.sistema.dataLog ("error", "maquina", 12, "Eliminacion de "+nombre+" fallida. Base de datos, vacía.");
                    return false;
                } else {
                    for (var i = 0; i < lista.length; i++) {
                        if(lista[i] == nombre){
                            lista.splice(i, 1);
                            if(debugMode) {
                                console.log("El Cliente \""+nombre+"\" eliminado con éxito!");
                                console.log(lista);
                            }
                            cajeroAutomatico.sistema.operacionRealizada();
                            cajeroAutomatico.sistema.dataLog ("info", "administrador", 13, "Eliminado "+nombre+" de la base de datos de clientes");
                            return true;
                        } else if (i == lista.length -1){
                            if(debugMode) {
                                console.log("El cliente \""+nombre+"\" no encontrado!");
                            }
                            cajeroAutomatico.sistema.operacionFallida();
                            cajeroAutomatico.sistema.dataLog ("error", "maquina", 14, "Eliminacion de "+nombre+" fallida. Cliente inexistente.");
                            return false;
                        }
                    }
                }
            },
            agregarDinero: function (cantidad){
                if (cajeroAutomatico.sistema.esNumero(cantidad)) {
                    cajeroAutomatico.dineroDisponible = cajeroAutomatico.dineroDisponible + cantidad;
                    cajeroAutomatico.sistema.operacionRealizada();
                    cajeroAutomatico.sistema.dataLog ("info", "administrador", 7, "Ingreso de "+cantidad+cajeroAutomatico.moneda);
                    if(debugMode){
                        console.info("Dinero disponible en el cajero, "+cajeroAutomatico.dineroDisponible);
                    }
                    return true;
                } else {
                    cajeroAutomatico.sistema.operacionFallida();
                    cajeroAutomatico.sistema.dataLog ("error", "administrador", 8, "Ingreso fallido por "+cantidad+" - errónea.");
                    if(debugMode){
                        console.warn(cantidad+" No es un numero valido!");
                    }
                    return false;
                }
            },
            quitarDinero: function (cantidad){
                if (cajeroAutomatico.sistema.esNumero(cantidad)) {
                    cajeroAutomatico.dineroDisponible = cajeroAutomatico.dineroDisponible - cantidad;
                    cajeroAutomatico.sistema.operacionRealizada();
                    cajeroAutomatico.sistema.dataLog ("info", "administrador", 9, "Retirada de "+cantidad+cajeroAutomatico.moneda);
                    if(debugMode){
                        console.info("Dinero disponible en el cajero, "+cajeroAutomatico.dineroDisponible);
                    }
                    return true;
                } else {
                    cajeroAutomatico.sistema.operacionFallida();
                    cajeroAutomatico.sistema.dataLog ("error", "administrador", 10, "Retirada fallida por "+cantidad+" - errónea.");
                    if(debugMode){
                        console.warn(cantidad+" No es un numero valido!");
                    }
                    return false;
                }
            }
        },
        cliente: {
            retirarEfectivo: function (nombre, cantidad) {
                if (cajeroAutomatico.sistema.esCliente(nombre)){
                    if (cajeroAutomatico.sistema.esNumero(cantidad)) {
                        cajeroAutomatico.dineroDisponible = cajeroAutomatico.dineroDisponible - cantidad;
                        cajeroAutomatico.sistema.operacionRealizada();
                        cajeroAutomatico.sistema.dataLog ("info", "usuario", 1, "Retirada de "+cantidad+cajeroAutomatico.moneda+" por "+nombre);
                        if(debugMode){
                            console.info("Dinero disponible en el cajero, "+cajeroAutomatico.dineroDisponible);
                        }
                        return true;
                    } else {
                        cajeroAutomatico.sistema.operacionFallida();
                        cajeroAutomatico.sistema.dataLog ("error", "usuario", 2, "Retirada fallida por "+cantidad+" errónea. Usuario: "+nombre);
                        if(debugMode){
                            console.warn(cantidad+" No es un numero valido!");
                        }
                        return false;
                    }
                } else {
                        cajeroAutomatico.sistema.operacionFallida();
                        cajeroAutomatico.sistema.dataLog ("error", "usuario", 3, nombre+" No es cliente");
                        if(debugMode){
                            console.warn(nombre+" No eres un cliente de "+cajeroAutomatico.empresaPropietaria+"!");
                        }
                        return false;
                }       
            },
            ingresarEfectivo: function (nombre, cantidad) {
                if (cajeroAutomatico.sistema.esCliente(nombre)){
                    if (cajeroAutomatico.sistema.esNumero(cantidad)) {
                        cajeroAutomatico.dineroDisponible = cajeroAutomatico.dineroDisponible + cantidad;
                        cajeroAutomatico.sistema.operacionRealizada();
                        cajeroAutomatico.sistema.dataLog ("info", "usuario", 4, "Ingreso de "+cantidad+cajeroAutomatico.moneda+" por "+nombre);
                        if(debugMode){
                            console.info("Dinero disponible en el cajero, "+cajeroAutomatico.dineroDisponible);
                        }
                        return true;
                    } else {
                        cajeroAutomatico.sistema.operacionFallida();
                        cajeroAutomatico.sistema.dataLog ("error", "usuario", 5, "Ingreso fallido por "+cantidad+" - errónea. Usuario: "+nombre);
                        if(debugMode){
                            console.warn(cantidad+" No es un numero valido!");
                        }
                        return false;
                    }
                } else {
                        cajeroAutomatico.sistema.operacionFallida();
                        cajeroAutomatico.sistema.dataLog ("error", "usuario", 6, nombre+" No es cliente");
                        if(debugMode){
                            console.warn(nombre+" No eres un cliente de "+cajeroAutomatico.empresaPropietaria+"!");
                        }
                        return false;
                }
            }
        },
        eventos: {
            agregar: function(el, type, fn) {
                this.eventos.agregar = function(el, type, fn) {
                    el.addEventListener(type, fn, false);
                };
                this.eventos.agregar(el, type, fn);
            },
            retirar: function(el, type, fn) {
                this.eventos.quitar = function(el, type, fn) {
                    el.removeEventListener(type, fn, false);
                };
                this.eventos.quitar(el, type, fn);
            },
        }
    };
    
})(document);