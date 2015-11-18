9 - #compliquemos!
 Servicio nocturno en el tren 10. Nota: Frente al ejercicio anterior, en este caso queremos que siempre que hablemos del tren 10 se especifique que es nocturno. Independientemente de si esta parado o funcionando.
```javascript
    var textoEstadoTren = "El tren número "
    var textoTrenParado = " está funcionando"
    var textoTrenFuncionando =  " está parado"
    var textoTrenNocturno = " y es nocturno"
    var trenesTotales = 12
    var trenesFuncionando = 8
    var trenesParados = 4
    var trenNocturno = 10
    
    for (var trenActual = 1; trenActual <= trenesTotales; trenActual++) {

    	if (trenActual > trenesFuncionando) {
    		var mensajeTren = textoTrenFuncionando;
    	}
    	if (trenActual <= trenesFuncionando) {
    		var mensajeTren = textoTrenParado;
    	}
        if (trenActual == trenNocturno) {
            var mensajeTren = mensajeTren + textoTrenNocturno
        }

    	console.log(textoEstadoTren + trenActual + mensajeTren);
    };
```