var Firebase = function() {
    
    var conn = new Firebase("https://formfirebaseexp.firebaseio.com/");
    
    this.addUser = function() {
        
        var name = document.getElementById("name");
        var surname = document.getElementById("surname");
        var email = document.getElementById("email");
        
        // Buscamos usuarios
        conn.child("users").orderByChild("email")
            .equalTo(surname)
            .once("value", function(data) {
                var userData = data.val();
                if(userData !== null) {
                    addMessage("Usuario repetido");
                } else {
                    conn.push({
                        name: name,
                        surname: surname,
                        email: email
                    });
                }
            });
    }
    
    // Child Added
    conn.once("child_added", function(dataFB) {
        var data = dataFB.val();
        var resultado = "<div class=\"data-item\">";
        resultado += "Nombre: " + data.name + ", Apellido: " + data.surname + ", Email: " + data.email;
        resultado += "</div>";
    }, function (errorObject) {
        addMessage(errorObject.code);
    });
    
    function addMessage(message) {
        document.getElementsByClassName("message").innerHtml(message);
    }
};

var fireBase = new Firebase();
