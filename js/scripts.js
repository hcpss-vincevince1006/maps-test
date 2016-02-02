var map;

var infos = [];

const mapStyles = [
	{
		'stylers': [
			{'saturation':-80},
		]
	},
	{
		'elementType':'labels.text.stroke', 
		'stylers': [
			{'visibility':'off'},
		]
	},
	{
		'featureType':'road',
		'elementType':'geometry',
		'stylers':[
			{'visibility':'on'}
		]

	},
	{
		'featureType':'road.highway',
		'elementType':'geometry.fill',
		'stylers':[
			{'color':'#3494D2'}
		]		
	},
	{
		'featureType':'road.highway.controlled_access',
		'elementType':'geometry.fill',
		'stylers':[
			{'color':'#FECC6A'}
		]		
	},
	{
		'featureType':'water',
		'stylers':[
			{'visibility':'on'},
			{'saturation':25},
			{'gamma':0},
			{'hue':'#50a5d1'}
		]		
	},
	{
		'featureType':'poi.school',
		'elementType':'geometry.fill',
		'stylers':[
			{'color':'#c39c7b'}
		]		
	},
	{
		'featureType':'poi.park',
		'elementType':'geometry.fill',
		'stylers':[		
			{'color':'#97ce76'}
		]		
	}							
]

function initMap() {
	// array of styles, added to options
	// MapTypeStyleElementType includes options for where feature styles apply
	// MapStylers affects how a map's elements will be styled

	var mapOptions = {
		// two required, zoom and center
		zoom: 12,
		center: {lat: 39.2036, lng: -76.8569},
		minZoom: 11,
		maxZoom: 15,

		streetViewControl: false,

		zoomControl: true, 
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.LARGE, 
			position: google.maps.ControlPosition.TOP_LEFT
		},

		styles: mapStyles
	};

	map = new google.maps.Map(document.getElementById('school-map'), mapOptions);

	for (var i in schools) {
    	var school = schools[i];

    	var content = "<h3>" + school.name + "</h3>" + "<p class='school-map__address'>" + school.address + "</p>" + "<p><a href=" + school.web + " target='_blank'>Website</a></p>" + "</p>" + "<p><a href=" + school.directions + " target='_blank'>Get Directions</a></p>";

    	var location = new google.maps.LatLng(school.lat, school.lng);

    	var icon = "";

        switch (school.type) {
            case "elementary":
                icon = "red";
                break;
            case "middle":
                icon = "blue";
                break;
            case "high":
                icon = "yellow";
                break;
            case "center":
                icon = "green";
                break;
        }

		var image = {
			url: 'http://www.hcpss.org/f/mrb/icons/grad-cap-transparent-' + icon + '.png',
			size: new google.maps.Size(32,30),
			origin: new google.maps.Point(0,0),
			anchor: new google.maps.Point(16,24),
			scaledSize: new google.maps.Size(32,30)
		}

    	var marker = new google.maps.Marker({
      		position: location,
      		map: map,
			icon: image,
      		title: school.name,
      		clickable: true
    	});

		var infoWindow = new google.maps.InfoWindow({
			content: content,
			disableAutoPan: false,
			maxWidth: 300
		});

    	marker.addListener('click', (function(marker, content, infoWindow) {
    		return function() {
    			/* close previous info-window */
    			closeInfos();

    			infoWindow.setContent(content);
				infoWindow.open(map,this);
				
				/* keep the handle, in order to close it on next click event */
			  	infos[0]=infoWindow;
			}
		})(marker, content, infoWindow));	
			
    } 

	function closeInfos(){

	   if(infos.length > 0){
	 
	      /* detach the info-window from the marker */
	      infos[0].set("marker", null);
	 
	      /* and close it */
	      infos[0].close();
	 
	      /* blank the array */
	      infos.length = 0;
	   }
	}

}
