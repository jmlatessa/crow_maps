'use strict'

async function wrapper(){

	let height = window.innerHeight;

	//d3.select("#mapid").style("height", height)
	let width = window.innerWidth;
  	let color_count = 0
  	const colorscale = d3.schemeSet2


	 
	let svg_width = width * .66
	let svg_height = 400 
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
	baselong = 45.6;
	baselat =  -107.85;
	zoom = 10;

	var mymap = L.map('mapid').setView([baselong, baselat], zoom);
	d3.selectAll("#loading").classed("hidden", true);
	d3.selectAll(".load-unhide").classed("hidden", false);
	console.log("finished!")
	let mtoken = 'pk.eyJ1IjoiZXpyYWVkZ2VydG9uIiwiYSI6ImNqamZzMG5mMDRoeTIzcG9oOGNnOG43NXMifQ.3pouVQJcwGKZpz4P6qh_aQ'

	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 10,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoiZXpyYWVkZ2VydG9uIiwiYSI6ImNrNndpeTJ4eDA2NDEzbm52NG5jeTAyeDAifQ.IaHIVaAkQ_dEGVBtoSA9xw'
	}).addTo(mymap);
	//console.log(data.features.slice(-100))
	L.geoJSON(data1.features).addTo(mymap);
	//L.geoJSON(data2.features).addTo(mymap);
	//L.geoJSON(data3.features).addTo(mymap);


	function windowResize(){

	}
}


 wrapper()