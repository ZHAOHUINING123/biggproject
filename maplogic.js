function initialise() {
	// create the map object
	myMapA = new L.Map('mapa');
	myMapB = new L.Map('mapb');
	// create the tile layer with correct attribution
	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	var osmA = new L.TileLayer(osmUrl, {minZoom: 1, maxZoom: 12, attribution: osmAttrib});		
	var osmB = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib});		

	myMapA.setView(new L.LatLng(0, 178.60),2);
	myMapA.addLayer(osmA);

	myMapB.setView(new L.LatLng(0, 178.60),8);
	myMapB.addLayer(osmB); 

	//Add a marker
	var jamsIcon = L.icon({
		iconUrl: 'marker.png',
		iconAnchor:   [12, 12],
	});	
	
	//var small_count = 0, mid_strong_count = 0, strong_count = 0, violent_count = 0, huge_count = 0;
	//for (item in myData) {
		//var marker = L.marker([myData[item].latitude,myData[item].longitude],{icon: jamsIcon}).addTo(myMapA);
		//if (myData[item].magnitude < 5) {small_count++};
		//else if (myData[item].magnitude < 6) {mid_strong_count++};
		//else if (myData[item].magnitude < 7) { strong_count++};
		//else if (myData[item].magnitude < 8) {violent_count++};
		//else{huge_count++};
	//}

	//for (item in myData) {
	//	var circle = L.circle([myData[item].latitude,myData[item].longitude],myData[item].horizontaldiatance*1000).addTo(myMapB);
	//}

  
	function onClickA(m) {

		// find where mapA was clicked, and move the map so that that is the new centre
		var mapACenter = m.latlng;
		myMapA.panTo(mapACenter);
		myMapB.panTo(mapACenter);
	}

	function onDragA(m) {
		// after a drag event, find out the new center of the map...
		var mapACenter = m.target.getCenter();

		// the rest of the logic is identical to onClickA
		myMapB.panTo(mapACenter);
	}
	

	//add listeners for events which will trigger functions
	myMapA.on('click',onClickA);
	myMapA.on('dragend',onDragA);
	
}