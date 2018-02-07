google.maps.event.addDomListener(window, 'load', function() {
  const newLocation = new Location(() => {    
    let myLocation = {
      lat: newLocation.latitude,
      lng: newLocation.longitude
    };

    // SOLO DE PRUEBA
    let newLoc = {
      lat: -33.4190456, 
      lng: -70.6439491
    };

    // ------------------ OBTENER UBICACION DE USUARIO -------------------
    const options = {
      center: myLocation,
      zoom: 14
    };
    let map = document.getElementById('map_canvas');
    const newMap = new google.maps.Map(map, options);

    // ----------------------- BTN ENCUENTRAME ------------------------------
    document.getElementById('originBtn').addEventListener('click', findMe);
    function findMe() {
      const marker = new google.maps.Marker({
        position: myLocation,
        animation: google.maps.Animation.DROP,
        map: newMap,
        title: 'Here you are!'
      });
      marker.setIcon('assets/img/tinybike.png');
    };

    // ------------------- INICIO AUTOCOMPLETADO --------------------------------
    let autoOrigin = document.getElementById('origin');
    const searchOr = new google.maps.places.Autocomplete(autoOrigin);
    searchOr.bindTo('bounds', newMap);

    let autoDestiny = document.getElementById('destiny');
    const searchDes = new google.maps.places.Autocomplete(autoDestiny);
    searchDes.bindTo('bounds', newMap);
    // ------------------- FIN AUTOCOMPLETADO --------------------------------
    
    // let originCoder = new google.maps.Geocoder();
    // let objInfo = {
    //   address: 'metro santa isabel, santiago chile',
    // };
    // originCoder.geocode(objInfo, fnCoder);
    // function fnCoder(data) {
    //   let coordenates = data[0].geometry.location; // obj latlng
    //   let config = {
    //     map: newMap,
    //     animation: google.maps.Animation.DROP,
    //     draggable: true,
    //     position: coordenates,
    //     title: 'Here you go!'
    //   };
    //   let markerOrigin = new google.maps.Marker(config);
    //   markerOrigin.setIcon('assets/img/tinybike.png');
    // };

    // let miruta = [myLocation, ];
    // let trazo = new google.maps.Polyline({path: miruta,
    //   strokeColor: '#008080', strokeOpacity: 0.8, strokeWeight: 3});
    // trazo.setMap(newMap);

    document.getElementById('routeBtn').addEventListener('click', drawRoute);

    let configDR = {
      map: newMap
    };

    let configDS = {
      origin: document.getElementById('origin').value, // Lat Long o String de domicilio
      destination: document.getElementById('destiny').value,
      travelMode: google.maps.TravelMode['BICYCLING'],
      unitSystem: google.maps.DirectionsUnitSystem['METRIC'],
      provideRouteAlternatives: false
    };

    let dirService = new google.maps.DirectionsService();
    let dirRenderer = new google.maps.DirectionsRenderer();

    dirService.route(configDS, drawRoute);

    function drawRoute(results, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        dirRenderer.setMap(newMap);
        dirRenderer.setDirections(results);
      } else {
        console.log('Error ' + status);
      }
    }
  });
});