/*global Firebase*/
var myFBAdress = "https://<---URL--->.firebaseio.com/";
var formulario = new Firebase(myFBAdress);
var inscritos = "";

function subirDatos(){
    formulario.authWithOAuthPopup("github", function(error, authData) {
      if (error) {
        console.warn("Login Failed!", error);
      } else {
        var uid = authData.uid;
        var usuario = authData.github.username;
        formulario.orderByChild('uid')
        .equalTo(uid)
        .once('value', function(snap) {
            var usuarioEncontrado = snap.val();
            if (usuarioEncontrado !== null) {
                var alerta = '<div class="alert alert-danger alert-dismissible" role="alert">';
                alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
                alerta += '<strong>Aviso!</strong> ' + usuario + ' ya esta registrado! Comprueba tu inbox.</div>';
                document.getElementById('alerta').innerHTML = alerta;
            } else {
                formulario.push(authData);
            }
        });
      }
    });
}

function actualizarInterfaz (snapshot) {
    
    var nuevosDetalles = snapshot.val().github.cachedUserProfile;
    var nuevosNombres = snapshot.val().github.username;

    inscritos += '<div class="panel panel-default"><div class="panel-body">';
    inscritos += '<img class="avatar-img pull-left" src="'+nuevosDetalles.avatar_url+'"></img>';
    inscritos += '<h5><b>'+nuevosNombres + '</b> ( ' + nuevosDetalles.location + ' )</h5>';
    inscritos += '</div></div>';
    document.getElementById("nuevosInscritos").innerHTML = inscritos;
}

formulario.on("child_added", actualizarInterfaz);