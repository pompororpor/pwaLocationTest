function initialize() {
    window.map = new google.maps.Map(document.getElementById('map'), {
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    
    // พิกัด กทม : 13.724561,100.4930267
    map.setCenter(new google.maps.LatLng(13.724561,100.4930267));
    map.setZoom(12);
}

function geoFindMe() {
  var output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
      console.log('latitude : ' + latitude + '; longitude : ' + longitude);
      
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        title: 'My Location',
        map: map,
    });
      
      var infowindow = new google.maps.InfoWindow();
      google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(marker.title);
          infowindow.open(map, marker);
      });
    map.setCenter(marker.position)
    map.setZoom(15);
  }

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
}
