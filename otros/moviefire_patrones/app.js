/*global Firebase*/

(function(){

var movieApp = {
    config: {
        firebaseUrl: "https://experimentos.firebaseio.com/jsmovies",
        baseDatos: null
    },
    core: {
        enrutadorFirebase: function (key) {
            return movieApp.config.baseDatos.child(key);
        },
        subirFirebase: function (movieName, details) {
            movieApp.config.baseDatos.push({
                name: movieName,
                details: details
            });
        },
        actualizarFirebase: function(movieName, details, key){
            key.update({
                name: movieName,
                details: details
            });
        },
        peticionAJAX: function (tipo, movieName, keyChild) {
            var xmlHttp = new XMLHttpRequest(),
            url = 'http://www.omdbapi.com/?t='+movieName+'&y=&plot=short&r=json';

                    xmlHttp.onreadystatechange = function () {
                        var film = {};
                        if (xmlHttp.readyState === 4 && xmlHttp.status >= 200 && xmlHttp.status < 300) {
                            film = JSON.parse(xmlHttp.responseText);
                            if(tipo === "actualizar"){
                                movieApp.core.actualizarFirebase(movieName, film, keyChild);
                            } else if (tipo === "crear") {
                                movieApp.core.subirFirebase(movieName, film);
                            } else {
                                console.warn("Petición AJAX Erronea - \"tipo\" no definido correctamente");
                            }

                        } else if (xmlHttp.readyState === 4 && xmlHttp.status >= 400 && xmlHttp.status < 600) {
                            film = JSON.parse(xmlHttp.responseText);
                            if(tipo === "actualizar"){
                                movieApp.core.actualizarFirebase(movieName, film, keyChild);
                            } else if (tipo === "crear") {
                                movieApp.core.subirFirebase(movieName, film);
                            } else {
                                console.warn("Petición AJAX Erronea - \"tipo\" no definido correctamente");
                            }
                        }
                    };

                    xmlHttp.open( "GET", url, true );
                    xmlHttp.send();
        },
        registrarPelicula: function(event) {
            if (event.which == 13 || event.keyCode == 13) {
                var movieName = document.getElementById('movieName').value.trim();
                if (movieName.length > 0) {
                    movieApp.core.peticionAJAX("crear", movieName);
                }
                document.getElementById('movieName').value = '';
            }
        },
        actualizarIU: function (listaOriginal) {
            var listaEnriquecida = '';
            for (var i = 0; i < listaOriginal.length; i++) {
                listaEnriquecida += '<li data-name="' + listaOriginal[i].name + '" data-key="' + listaOriginal[i].key + '">' + listaOriginal[i].name + ' [' + movieApp.core.generarLinks(listaOriginal[i].key, listaOriginal[i].name) + ']</li>';
            }
            document.getElementById('favMovies').innerHTML = listaEnriquecida;
        },
        generarLinks: function (key, mvName) {

            var links = '';

            movieApp.config.baseDatos.on("value", function(snapshot) {
                var data = snapshot.val();
                if (data[key].details.Response === "True" ){
                    links += '<a class="details" href="#">Detalles</a> | ';
                    links += '<a class="edit" href="#">Editar</a> | ';
                    links += '<a class="del" href="#">Borrar</a>';
                } else {
                    links += '<a class="edit" href="#">Editar</a> | ';
                    links += '<a class="del" href="#">Borrar</a>';
                }
            });

            return links;
        },
        ocultarDetalles: function () {
            document.getElementById('movieDetails').style.display = 'none';
        },
        details: function (key, mvName) {
           movieApp.config.baseDatos.on("value", function(snapshot) {
           var data = snapshot.val();
           var detallesEnriquecidos = '<p><b>'+data[key].details.Title+'</b><p>';
           detallesEnriquecidos += '<a href="#">[Cerrar]</a><br>';

           if(data[key].details.Poster != "N/A"){
            detallesEnriquecidos += '<img src="'+data[key].details.Poster+'">';
           }

           detallesEnriquecidos += '<p>Titulo original: '+data[key].details.Title+'</p>';
           detallesEnriquecidos += '<p>Director: '+data[key].details.Director+'</p>';
           detallesEnriquecidos += '<p>Año: '+data[key].details.Year+'</p>';
           detallesEnriquecidos += '<p>Actores: '+data[key].details.Actors+'</p>';
           detallesEnriquecidos += '<p>Genero [En]: '+data[key].details.Genre+'</p>';
           detallesEnriquecidos += '<p>Pais [En]: '+data[key].details.Country+'</p>';
           detallesEnriquecidos += '<p>Trama [En]: '+data[key].details.Plot+'</p>';

           document.getElementById('movieDetails').innerHTML = detallesEnriquecidos;
           document.getElementById('movieDetails').style.display = 'block';
           });
        },
      edit: function (key, mvName) {
            var movieName = prompt("Actualiza el nombre de la película", mvName);

            if (movieName && movieName.length > 0) {
                movieApp.core.ocultarDetalles();
                var updateMovieRef = movieApp.core.enrutadorFirebase(key);
                movieApp.core.peticionAJAX("actualizar", movieName, updateMovieRef);

            }
        },
        del: function (key, mvName) {
            var respuesta = confirm("¿Estas seguro que deseas eliminar \"" + mvName + "\" de la lista?");
            if (respuesta === true) {
                movieApp.core.ocultarDetalles();
                var deleteMovieRef = movieApp.core.enrutadorFirebase(key);
                deleteMovieRef.remove();
            }
        }
    },
    eventos:{
        agregar: null,
        quitar: null
    }

};

movieApp.config.baseDatos = new Firebase(movieApp.config.firebaseUrl);


    // Init-time branching
    if (typeof window.addEventListener === 'function') {
        movieApp.eventos.agregar = function(el, type, fn) {
            el.addEventListener(type, fn, false);
        };
        movieApp.eventos.quitar = function(el, type, fn) {
            el.removeEventListener(type, fn, false);
        };
    } else { // Soporte para IE8
        movieApp.eventos.agregar = function(el, type, fn) {
            el.attachEvent('on' + type, fn);
        };
        movieApp.eventos.quitar = function(el, type, fn) {
            el.detachEvent('on' + type, fn);
        };
    }

// -- Control de Eventos --

movieApp.config.baseDatos.on("value", function(snapshot) {
    var data = snapshot.val();
    var list = [];
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var name = data[key].name ? data[key].name : '';
            if (name.trim().length > 0) {
                list.push({
                    name: name,
                    key: key
                });
            }
        }
    }
    movieApp.core.actualizarIU(list);
});

    movieApp.eventos.agregar(window, 'keypress', movieApp.core.registrarPelicula);

    movieApp.eventos.agregar(document.getElementById("movieDetails"), 'click', function (event) {
        var evento = evento || window.event;
        var elemento = evento.target || evento.srcElement;

        if(elemento.innerHTML === "[Cerrar]"){
            movieApp.core.ocultarDetalles();
        }
    });

    movieApp.eventos.agregar(document.getElementById("favMovies"), 'click', function (event) {

        var evento = evento || window.event;
        var elemento = evento.target || evento.srcElement;
        var name = elemento.parentNode.getAttribute("data-name");
        var key = elemento.parentNode.getAttribute("data-key");

        if(elemento.innerHTML === "Editar"){
            movieApp.core.edit(key, name);
        } else if (elemento.innerHTML === "Borrar"){
            movieApp.core.del(key, name);
        } else if (elemento.innerHTML === "Detalles"){
            movieApp.core.details(key, name);
        }
        
    });

}());
