function initialise() {
	// create the map object
	myMapB = new L.Map('mapa');
	myMapA = new L.Map('mapb');
	// create the tile layer with correct attribution
	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	var osmA = new L.TileLayer(osmUrl, {minZoom: 1, maxZoom: 12, attribution: osmAttrib});		
	var osmB = new L.TileLayer(osmUrl, {minZoom: 5, maxZoom: 15, attribution: osmAttrib});		

	myMapA.setView(new L.LatLng(0, 178.60),2);
	myMapA.addLayer(osmA);

	myMapB.setView(new L.LatLng(0, 178.60),5);
	myMapB.addLayer(osmB); 

	//Add a marker
	var icon1 = L.icon({
		iconUrl: 'marker1.png',
		iconAnchor:   [12, 12],
	});	

	var icon2 = L.icon({
		iconUrl: 'marker2.png',
		iconAnchor:   [12, 12],
	});	
	var icon3 = L.icon({
		iconUrl: 'marker3.png',
		iconAnchor:   [12, 12],
	});	
	var icon4 = L.icon({
		iconUrl: 'marker4.png',
		iconAnchor:   [12, 12],
	});	
	var icon5 = L.icon({
		iconUrl: 'marker5.png',
		iconAnchor:   [12, 12],
	});	
	
	for (item in myData){
		if (myData[item].magnitude < 5) {
				var thisIcon = icon1;
			} else if (myData[item].magnitude < 6) {
				var thisIcon = icon2;
			} else if (myData[item].magnitude < 7) {
				var thisIcon = icon3;
			} else if (myData[item].magnitude < 8) {
				var thisIcon = icon4;
			} else {
				var thisIcon = icon5;
			}
		var marker = L.marker([myData[item].latitude,myData[item].longitude],{icon: thisIcon}).addTo(myMapA);
		var marker = L.marker([myData[item].latitude,myData[item].longitude]).addTo(myMapB);
		var circle = L.circle([myData[item].latitude,myData[item].longitude],{radius:myData[item].horizontal_distance * 1000}).addTo(myMapB);
	}
	
			
	

  
	function onClickA(m) {

		// find where mapA was clicked, and move the map so that that is the new centre
		var mapACenter = m.latlng;
		myMapA.panTo(mapACenter);
		myMapB.panTo(mapACenter);
		myMapB.setZoom(5);
	}

	function onDragA(m) {
		// after a drag event, find out the new center of the map...
		var mapACenter = m.target.getCenter();

		// the rest of the logic is identical to onClickA
		myMapB.panTo(mapACenter);
	}
	function onClickB(m){
		var mapBCenter = m.latlng;
		myMapB.panTo(mapBCenter);
		var zoom = m.target.getZoom();
		myMapB.setZoom(zoom + 1);
	}


	//add listeners for events which will trigger functions
	myMapA.on('click',onClickA);
	myMapB.on('click',onClickB);
	myMapA.on('dragend',onDragA);

}