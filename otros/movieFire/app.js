/*global Firebase*/

var myFBAdress = "https://<---URL--->.firebaseio.com/PATH";
var favMovies = new Firebase(myFBAdress);

function saveToList(event) {
    if (event.which == 13 || event.keyCode == 13) {
        var movieName = document.getElementById('movieName').value.trim();
        if (movieName.length > 0) {
            var xmlHttp = new XMLHttpRequest(),
                url = 'http://www.omdbapi.com/?t=' + movieName+'&y=&plot=short&r=json';

            xmlHttp.onreadystatechange = function () {
                var film = {};
                if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                    film = JSON.parse(xmlHttp.responseText);
                    saveToFB(movieName, film);
                } else if (xmlHttp.readyState === 4 && xmlHttp.status === 404) {
                    film = JSON.parse(xmlHttp.responseText);
                    saveToFB(movieName);
                }
            };

            xmlHttp.open( "GET", url, true );
            xmlHttp.send();
        }
        document.getElementById('movieName').value = '';
    }
}

function saveToFB(movieName, details) {
    favMovies.push({
        name: movieName,
        details: details || false
    });
}

function refreshUI(list) {
    var lis = '';
    for (var i = 0; i < list.length; i++) {
        lis += '<li data-key="' + list[i].key + '">' + list[i].name + ' [' + genLinks(list[i].key, list[i].name) + ']</li>';
    }
    document.getElementById('favMovies').innerHTML = lis;
}

function genLinks(key, mvName) {
    var links = '';

    favMovies.on("value", function(snapshot) {
        var data = snapshot.val();
        if (data[key].details.Response === "True" ){
            links += '<a href="javascript:details(\'' + key + '\',\'' + mvName + '\')">Detalles</a> | ';
            links += '<a href="javascript:edit(\'' + key + '\',\'' + mvName + '\')">Editar</a> | ';
            links += '<a href="javascript:del(\'' + key + '\',\'' + mvName + '\')">Borrar</a>';
        } else {
            links += '<a href="javascript:edit(\'' + key + '\',\'' + mvName + '\')">Editar</a> | ';
            links += '<a href="javascript:del(\'' + key + '\',\'' + mvName + '\')">Borrar</a>';
        }
    });

    return links;
}

function hideDetails () {
    document.getElementById('movieDetails').style.display = 'none';
}

function details(key, mvName) {
   favMovies.on("value", function(snapshot) {
   var data = snapshot.val();
   var allDetails = '<p><b>'+data[key].details.Title+'</b><p>';
   allDetails += '<a href="javascript:hideDetails()">[Cerrar]</a><br>';
   console.log (data[key].details);
   
   if(data[key].details.Poster != "N/A"){
    allDetails += '<img src="'+data[key].details.Poster+'">';
   }
   
   allDetails += '<p>Titulo original: '+data[key].details.Title+'</p>';
   allDetails += '<p>Director: '+data[key].details.Director+'</p>';
   allDetails += '<p>Año: '+data[key].details.Year+'</p>';
   allDetails += '<p>Actores: '+data[key].details.Actors+'</p>';
   allDetails += '<p>Genero [En]: '+data[key].details.Genre+'</p>';
   allDetails += '<p>Pais [En]: '+data[key].details.Country+'</p>';
   allDetails += '<p>Trama [En]: '+data[key].details.Plot+'</p>';

   document.getElementById('movieDetails').innerHTML = allDetails;
   document.getElementById('movieDetails').style.display = 'block';
   });
}

function edit(key, mvName) {
    var movieName = prompt("Actualiza el nombre de la película", mvName);
    if (movieName && movieName.length > 0) {
        var updateMovieRef = buildEndPoint(key);
        var xmlHttp = new XMLHttpRequest(),
        url = 'http://www.omdbapi.com/?t=' + movieName +'&y=&plot=short&r=json';

        xmlHttp.onreadystatechange = function () {
        var film = {};
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                film = JSON.parse(xmlHttp.responseText);
                updateMovieRef.update({
                    name: movieName,
                    details: film || false
                });
            } else if (xmlHttp.readyState === 4 && xmlHttp.status === 404) {
                
                updateMovieRef.update({
                    name: movieName,
                    details: false
                });
            }
        };

        xmlHttp.open( "GET", url, true );
        xmlHttp.send();

        updateMovieRef.update({
            name: movieName
        });
    


    }
}

function del(key, mvName) {
    var response = confirm("¿Estas seguro que deseas eliminar \"" + mvName + "\" de la lista?");
    if (response === true) {
        var deleteMovieRef = buildEndPoint(key);
        deleteMovieRef.remove();
        hideDetails();
    }
}

function buildEndPoint (key) {
	return new Firebase(myFBAdress+'/' + key);
}

favMovies.on("value", function(snapshot) {
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
    refreshUI(list);
});
