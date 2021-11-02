

async function wrapper(){

	let height = window.innerHeight;

	//d3.select("#mapid").style("height", height)
	let width = window.innerWidth;
  	let color_count = 0
  	const colorscale = d3.schemeSet2


	 
	let svg_width = width
	let svg_height = height
	d3.select("#mapid").style("width", svg_width).style("height", svg_height)
	window.onresize = windowResize;
	console.log(svg_width)
	console.log(svg_height)
	//let data = await d3.json('crow_4326_survey.json')
	let data1 = await d3.json('arcmap_vector_geojson_layers_v02/crow_4325_homestd_gr_map.json')
	let data2 = await d3.json('arcmap_vector_geojson_layers_v02/crow_4325_loc_gr_map.json')
	let data3 = await d3.json('arcmap_vector_geojson_layers_v02/crow_4325_survey_gr_map.json')
	console.log(data1)
	console.log(data2)
	console.log(data3)
	var baselong, baselat, zoom
	baselong = 45.35;
	baselat =  -107.85;
	zoom = 10;
	console.log(baselong, baselat, zoom)
	//var mymap = L.map('mapid').setView([baselong, baselat], zoom);
	let mymap = L.map('mapid').setView([baselong, baselat], zoom);

	d3.selectAll("#loading").classed("hidden", true);
	d3.selectAll(".load-unhide").classed("hidden", false);
	console.log("finished!")
	let mtoken = 'pk.eyJ1IjoiZXpyYWVkZ2VydG9uIiwiYSI6ImNrdmllOWpnOTAwYzIyb28wNWt0ZmY2MTAifQ.UCZJAFBHQeGzxL7q_mVoXA'
	/*var circle = L.circle([baselong, baselat], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(mymap);*/


	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 100,
    id: 'mapbox/streets-v11',
    accessToken: mtoken
	}).addTo(mymap);
	
	//console.log(data.features.slice(-100))
	var style1 = {
		"fill_opacity" : .8,
    "color": "#0000ff",
    "weight": 1,
    "opacity": 0.8
	};

	var style2 = {
		"fill_opacity" : .8,
		"color": "#00ff00",
    "weight": 1,
    "opacity": 0.8
	};
	var style3 = {
		"fill_opacity" : .8,
		"color": "#ff0000",
    "weight": 1,
    "opacity": 0.8
	};
	


	
function onEachFeature(feature, layer) {
    console.log(feature)
    if (feature.properties ) {
    	console.log(feature.properties)
        layer.bindPopup("Name: "+ feature.properties.First_Name + " " + feature.properties.Last_Name + ", Family: " + feature.properties.Family_Des + "\n" );
    }
}


	L.geoJSON(data1.features,{
    style: style1,
    onEachFeature: onEachFeature
	}).addTo(mymap)
	L.geoJSON(data2.features,{
    style: style2,
    onEachFeature: onEachFeature
	}).addTo(mymap)
	L.geoJSON(data3.features,{
    style: style3,
    onEachFeature: onEachFeature
	}).addTo(mymap)
	// L.geoJSON(data2.features).addTo(mymap,{
 //    style: myStyle
	// })
	//console.log(data3.features)
	// L.geoJSON(data3.features).addTo(mymap, {
 //    style: myStyle
	// });


	
	function windowResize(){
		 height = window.innerHeight;

	//d3.select("#mapid").style("height", height)
	 width = window.innerWidth;



	 
	 svg_width = width
	 svg_height = height
	d3.select("#mapid").style("width", svg_width).style("height", svg_height)
	mymap.invalidateSize()
	}
	windowResize()
}


 wrapper()