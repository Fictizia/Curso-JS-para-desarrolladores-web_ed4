/*global Firebase*/
var myFBAdress = "https://URL.firebaseio.com/PATH";
var formulario = new Firebase(myFBAdress);
var inscritos = "";

function subirDatos() {

    var email = document.getElementById("email").value;
    var nombre = document.getElementById("nombre").value;
    var apellidos = document.getElementById("apellidos").value;
    var edad = document.getElementById("edad").value;

    formulario.orderByChild('email')
        .equalTo(email)
        .once('value', function(snap) {
            var usuarioEncontrado = snap.val();
            if (usuarioEncontrado !== null) {
                var alerta = '<div class="alert alert-danger alert-dismissible" role="alert">';
                alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
                alerta += '<strong>Aviso!</strong> El email (' + email + ') ya esta registrado! Comprueba tu inbox.</div>';
                document.getElementById('alerta').innerHTML = alerta;
            } else {
                formulario.push({
                    email: email,
                    nombre: nombre,
                    apellidos: apellidos,
                    edad: edad
                });
            }
        });
}

formulario.on("child_added", function(snapshot) {
    var nuevosInscritos = snapshot.val();
    inscritos += '<div class="panel panel-default"><div class="panel-body">';
    inscritos += nuevosInscritos.nombre + ' ' + nuevosInscritos.apellidos + '(' + nuevosInscritos.email + ')';
    inscritos += '</div></div>';
    document.getElementById("nuevosInscritos").innerHTML = inscritos;
});