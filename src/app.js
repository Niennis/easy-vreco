google.maps.event.addDomListener(window, 'load', function() {
  var newLocation = new Location(() => {    
    var myLocation = {
      lat: newLocation.latitude,
      lng: newLocation.longitude
    };

    // ------------------ OBTENER UBICACION DE USUARIO -------------------
    var options = {
      center: myLocation,
      zoom: 14
    };

    var map = document.getElementById('map_canvas');
    var newMap = new google.maps.Map(map, options);

    // ----------------------- BTN ENCUENTRAME ------------------------------
    document.getElementById('originBtn').addEventListener('click', createMarker);

    // ----------------------------- MARKER -----------------------------------
    function createMarker() {
      var marker = new google.maps.Marker({
        position: myLocation,
        animation: google.maps.Animation.DROP,
        map: newMap,
        title: 'Here you are!'
      });
      marker.setIcon('assets/img/tinybike.png');
    };

    // function markerBike(position, map) {
    //   var marker = new google.maps.Marker({
    //     position: position,
    //     animation: google.maps.Animation.DROP,
    //     map: map,
    //     title: 'Here you are!'
    //   });
    //   marker.setIcon('assets/img/tinybike.png');
    // }

    // ------------------- INICIO AUTOCOMPLETADO --------------------------------
    var autoOrigin = document.getElementById('originPoint');
    var searchOr = new google.maps.places.Autocomplete(autoOrigin);
    searchOr.bindTo('bounds', newMap);

    var autoDestiny = document.getElementById('destinyPoint');
    var searchDes = new google.maps.places.Autocomplete(autoDestiny);
    searchDes.bindTo('bounds', newMap);
    // ------------------- FIN AUTOCOMPLETADO --------------------------------

    // ------------------- INICIO DIBUJAR RUTA --------------------------

    function setRoute() {
      var originRoute = document.getElementById('originPoint').value;
      var destinyRoute = document.getElementById('destinyPoint').value;
      console.log(originRoute);
      console.log(destinyRoute);

      var configDR = {
        map: newMap
      };

      var configDS = {
        origin: originRoute, // Lat Long o String de domicilio
        destination: destinyRoute,
        travelMode: google.maps.TravelMode['DRIVING'],
        unitSystem: google.maps.DirectionsUnitSystem['METRIC'],
        provideRouteAlternatives: false,
      };

      var dirService = new google.maps.DirectionsService();
      var dirRenderer = new google.maps.DirectionsRenderer();

      function drawRoute(results, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          dirRenderer.setMap(new google.maps.Map(map, options));
          dirRenderer.setDirections(results);
          // markerBike(results.routes[0].legs[0].start_location, map);
          // markerBike(results.routes[0].legs[0].end_location, map);
        } else {
          console.log('Error ' + status);
        }
      }
      dirService.route(configDS, drawRoute);
    };
    document.getElementById('routeBtn').addEventListener('click', setRoute);  
  });
});

