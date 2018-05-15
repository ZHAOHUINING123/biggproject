function initialise() {
	// create the map object
	myMapB = new L.Map('mapb');
	myMapA = new L.Map('mapa');
	// create the tile layer with correct attribution
	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	var osmA = new L.TileLayer(osmUrl, {minZoom: 1, maxZoom: 12, attribution: osmAttrib});		
	var osmB = new L.TileLayer(osmUrl, {minZoom: 4, maxZoom: 18, attribution: osmAttrib});		

	myMapA.setView(new L.LatLng(0, 178.60),2);
	myMapA.addLayer(osmA);

	myMapB.setView(new L.LatLng(0, 178.60),4);
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
		var markerb = L.marker([myData[item].latitude,myData[item].longitude],{icon: thisIcon, title:"The id of the earthquake is " + myData[item].id}).addTo(myMapB);
		markerb.bindPopup("The more information of the earthquake：<br> Date: "+ myData[item].date + "<br> Time: " + myData[item].time +"<br> Magnitude:" +
			myData[item].magnitude +  "<br> Influence distance: " + myData[item].horizontal_distance + "km");
		var markea = L.marker([myData[item].latitude,myData[item].longitude]).addTo(myMapA);
		var circle = L.circle([myData[item].latitude,myData[item].longitude],{radius:myData[item].horizontal_distance * 1000}).addTo(myMapB);
	}
	
			
	

  
	function onClickA(m) {

		// find where mapA was clicked, and move the map so that that is the new centre
		var mapACenter = m.latlng;
		myMapA.panTo(mapACenter);
		myMapB.panTo(mapACenter);
		myMapB.setZoom(4);
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
		//var zoom = m.target.getZoom();
		//myMapB.setZoom(zoom + 1);
	}


	//add listeners for events which will trigger functions
	myMapA.on('click',onClickA);
	myMapB.on('click',onClickB);
	myMapA.on('dragend',onDragA);

	require.config({
            paths: {
                echarts: 'http://echarts.baidu.com/build/dist'
            }
        });

         require(
            [
                'echarts',
                'echarts/chart/pie'
            ],
            function (ec) {
                var myChart = ec.init(document.getElementById('chartarea'));
                tooltip: {
                        show: true
                    },
	            legend: {
				        orient: 'vertical',
				        x: 'left',
				        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
				    },
				series: [
			        {
			            name:'访问来源',
			            type:'pie',
			            radius: ['50%', '70%'],
			            avoidLabelOverlap: false,
			            label: {
			                normal: {
			                    show: false,
			                    position: 'center'
			                },
			                emphasis: {
			                    show: true,
			                    textStyle: {
			                        fontSize: '30',
			                        fontWeight: 'bold'
			                    }
			                }
			            },
			            labelLine: {
			                normal: {
			                    show: false
			                }
			            },
			            data:[
			                {value:335, name:'直接访问'},
			                {value:310, name:'邮件营销'},
			                {value:234, name:'联盟广告'},
			                {value:135, name:'视频广告'},
			                {value:1548, name:'搜索引擎'}
			            ]
			        }
			    ]
            }
}