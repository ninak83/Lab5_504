window.onload = function(){
  alert('Click on the map to set start and end points!');
}

      var map = L.map('map').setView([47.25, -122.44], 11);
      var control = L.Routing.control({
          waypoints: [
            null
              //L.latLng(47.246587, -122.438830),
              //L.latLng(47.258024, -122.444725),
              //L.latLng(47.318017, -122.542970)
          ],
          routeWhileDragging: true,
          router: L.Routing.mapbox('pk.eyJ1IjoibmtlcnIwODAzIiwiYSI6ImNqZ2NzajFzcjJ3cncyeHQ1cHNwdWcycnEifQ.UiE1-IaevC2KYyN63XDQxw'),
          units: 'imperial',
          geocoder: L.Control.Geocoder.nominatim()
				}).addTo(map);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox.comic',
          accessToken: 'pk.eyJ1IjoibmtlcnIwODAzIiwiYSI6ImNqZ2NzajFzcjJ3cncyeHQ1cHNwdWcycnEifQ.UiE1-IaevC2KYyN63XDQxw',
				}).addTo(map);
      L.easyButton( '<span class="target">&target;</span>', function (btn, map) {
    map.locate({
        setView: true,
        maxZoom: 18
    });
				}).addTo(map);

// Use map event 'locationfound' to perform some operations once the browser locates the user.
map.on('locationfound', function (event) {
    L.circle(event.latlng, event.accuracy).addTo(map);
  var Test = L.popup().setContent("Click to start trip from your location").setLatLng(event.latlng).addTo(map);
});

function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}

map.on('click', function(e) {

    var container = L.DomUtil.create('div'),
        startBtn = createButton('Start from this location', container),
        destBtn = createButton('Go to this location', container);

				L.DomEvent.on(startBtn, 'click', function() {
						control.spliceWaypoints(0, 1, e.latlng);
						map.closePopup();
				});
				L.DomEvent.on(destBtn, 'click', function() {
		        control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
		        map.closePopup();
		    });

    L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(map);
});


