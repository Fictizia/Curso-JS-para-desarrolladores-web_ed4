(function(window) {

  function getPosition() {
    navigator.geolocation.getCurrentPosition(onGetPosition, onGetPositionError);
  }

  function onGetPosition(data) {
    var latlng = {
      lat: parseFloat(data.coords.latitude.toFixed(4)),
      lng: parseFloat(data.coords.longitude.toFixed(4))
    };

    initMap(latlng);
  }

  function onGetPositionError(error) {
    // ToDo: error personalizado
    console.log(error);
  }

  function initMap(obj) {
    var Map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: { lat: obj.lat, lng: obj.lng }
    });

    var Marker = new google.maps.Marker({
      position: Map.getCenter(),
      map: Map
    });
  }

  if ('geolocation' in navigator) {
    getPosition();
  } else {
    console.log('Geolocalización no soportada');
  }

})(window);


