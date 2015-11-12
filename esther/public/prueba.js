
// 1 - Quiero saber del total de trenes cuantos hay operativos.
//     El formato de la respuesta es *"x de x funcionando hoy"*.

    var totalTrenes = 12;
    var trenesFuncionando = 8;
    var trenecitos =  trenesFuncionando + " de " + totalTrenes + " funcionando hoy";
    console.log(trenecitos);

// 2 - Imprimimos por consola el estado de cada tren en movimiento de manera individualizada (sin bucles).

    console.log("el tren número "+1+" está funcionando");
    console.log("el tren número "+2+" está funcionando");
    console.log("el tren número "+3+" está funcionando");
    
// 3 - Refactoriza... usando *while*.
    while (true){
        console.log("el tren número "+1+" está funcionando")
    }

// 4 - Refactoriza.. usando *Do... While*.

// 5 - Refactoriza... usando *for*.
    var trenesFuncionando = 8;

    for (var numTren = 1; numTren <= trenesFuncionando; numTren++ ){
        console.log("el tren número "+numTren+" está funcionando")
    }
    

// 6 - Del total de trenes... ¿cuantos tengo parados? 
    console.log("el tren número "+1+" está parado");

    