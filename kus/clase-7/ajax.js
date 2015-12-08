// http://www.omdbapi.com/?t=hackers&y=&plot=short&r=json

function ajaxRequest(url) {
  var xmlHttp = new XMLHttpRequest();

  // 0 uninitialized
  // 1 loading
  // 2 loaded
  // 3 interactive
  // 4 complete

  // Tipos de errores
  // 1xx Informativas
  // 2xx Peticiones Correctas
  // 3xx Redirecciones
  // 4xx Errores Cliente
  // 5xx Errores Servidor

  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      console.info(JSON.parse(xmlHttp.responseText));
    } else if (xmlHttp.readyState === 4 && xmlHttp.status === 400) {
      console.error('ERROR 404');
      console.info(JSON.parse(xmlHttp.responseText));
    }
  };

  xmlHttp.open('GET', url, true);
  xmlHttp.send();
}

// hackers
console.log(ajaxRequest('http://www.omdbapi.com/?t=hackers&y=&plot=short&r=json'));

// tiempo de Madrid, BCN y Valencia
// 91854a050fca1d503656a021d3ab9169
function getWeather(city) {
  console.log(ajaxRequest('http://api.openweathermap.org/data/2.5/weather?q='+city+',es&units=metric&mode=json&appid=91854a050fca1d503656a021d3ab9169'));
}
getWeather('madrid');
