

async function wrapper(){

	let height = window.innerHeight;

	//d3.select("#mapid").style("height", height)
	let width = window.innerWidth;
  	let color_count = 0


	 
	let svg_width = width
	let svg_height = height
	d3.select("#mapid").style("width", svg_width).style("height", svg_height)
	window.onresize = windowResize;

	//loading data
	let data1 = await d3.json('arcmap_vector_geojson_layers_v02/crow_4325_homestd_gr_map.json')
	let data2 = await d3.json('arcmap_vector_geojson_layers_v02/crow_4325_loc_gr_map.json')
	let data3 = await d3.json('arcmap_vector_geojson_layers_v02/crow_4325_survey_gr_map.json')
	let reservation = await d3.json('arcmap_vector_geojson_layers_v02/crow_4326_res_1923.json')



	console.log(data1)
	console.log(data2)
	console.log(data3)
	console.log(reservation)

	//Setting up initial map
	var baselong, baselat, zoom
	baselong = 45.35;
	baselat =  -107.85;
	zoom = 9;
	console.log(baselong, baselat, zoom)

	let mymap = L.map('mapid').setView([baselong, baselat], zoom);

	d3.selectAll("#loading").classed("hidden", true);
	d3.selectAll(".load-unhide").classed("hidden", false);
	console.log("finished! loading")
	let mtoken = 'pk.eyJ1IjoiZXpyYWVkZ2VydG9uIiwiYSI6ImNrdmllOWpnOTAwYzIyb28wNWt0ZmY2MTAifQ.UCZJAFBHQeGzxL7q_mVoXA'
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 100,
    minZoom: 7,
    id: 'mapbox/streets-v11',
    accessToken: mtoken
	}).addTo(mymap);
	
	

//Setting up interaction
let labels = Object.keys(data1.features[0].properties)

let ids = ['#color-option', '#label1-option', '#label2-option', '#label3-option']


var color1 = d3.interpolateBlues
var color2 = d3.interpolateBlues


var colorprop = "Acres"
var colorrange = d3.extent(data1.features, function(f){
		return parseInt(f.properties[colorprop])
	})
var colorscale = d3.scaleLinear().domain(colorrange).range([0,1])
var label1 = "First_Name"
var label2 = "Last_Name"
var label3 = "Remarks"
ids.forEach(function(sel_id){

	let sel_el = d3.select(sel_id)

	sel_el
		.selectAll(".option")
		.data(labels)
		.enter()
		.append("option")
		.attr("value", function(d){
			return d
		})
		.text(function(d){
			return d
		})
		.attr("selected", function(d){
			if (sel_id == '#color-option'){
				if(d == colorprop){
					return true
				}
				
			}
			if (sel_id == '#label1-option'){
				if(d == label1){
					return true
				}
				
			}
			if (sel_id == '#label2-option'){
				if(d == label2){
					return true
				}
					
			}
			if (sel_id == '#label3-option'){
				if(d == label3){
					return true
				}
				
			}
		})
	sel_el.on("change", function(){
		console.log(d3.select(this).property("value"))
		if (sel_id == '#color-option'){
			colorprop = d3.select(this).property("value")
			updateLayerColors()
		}
		if (sel_id == '#label1-option'){
			label1 = d3.select(this).property("value")
			updateLayerLabel(homestdlayer)
			updateLayerLabel(surveylayer)
		}
		if (sel_id == '#label2-option'){
			label2 = d3.select(this).property("value")
			updateLayerLabel(homestdlayer)
			updateLayerLabel(surveylayer)
		}
		if (sel_id == '#label3-option'){
			label3 = d3.select(this).property("value")
			updateLayerLabel(homestdlayer)
			updateLayerLabel(surveylayer)
		}
		
	})
})

//Setting up map layers


function stylegen(feature, the_layer){
	var thecolorscale;
	if(the_layer == 'homestdlayer'){
		thecolorscale = color1;
	}
	else{
		thecolorscale = color2;
	}

	let style1 = {
		"fillOpacity" : .5,
    	"fillColor": thecolorscale(colorscale(feature.properties[colorprop])),
    	"weight": 1,
    	"opacity": 1,
    	"stroke" : true,
    	"color" : 'black',
    	"weight" : .5,
	};
	 return style1
}



function homestyle(feature){	
		return stylegen(feature, 'homestdlayer')
		
}
function surveystyle(feature){
	return stylegen(feature, 'surveylayer')
}

var resStyle = {
		"color" : 'black',
		"weight" : 1,
		"fill" : false
	}

function onEachFeature(feature, layer) {
    if (feature.properties ) {
        layer.bindPopup(label1 + ': ' + feature.properties[label1] + label2  + ': ' + feature.properties[label2] + ' ' + label3 + ': ' + feature.properties[label3]);
    }
}

function updateLayerLabel(layer){
	Object.keys(layer._layers).forEach(function(i){
		layer._layers[i].setPopupContent( label1 + layer._layers[i].feature.properties[label1] + label2  + layer._layers[i].feature.properties[label2] + ' ' + label3 + ': ' + layer._layers[i].feature.properties[label3] );
	})
}


function updateLayerColors(layer){
	colorrange = d3.extent(data1.features, function(f){
		return parseInt(f.properties[colorprop])
	})
	colorscale = d3.scaleLinear().domain(colorrange).range([0,1])
	d3.select("#high-val")
		.style("background-color", color1(colorscale(colorrange[1]))).style("color", "white")
		.text(colorrange[1])
	d3.select("#low-val")
		.style("background-color", color1(colorscale(colorrange[0])))
		.text(colorrange[0])
	console.log(colorscale(720))

	homestdlayer.setStyle(homestyle)
	surveylayer.setStyle(surveystyle)



}

	L.geoJSON(reservation.features,{
    style: resStyle,
	}).addTo(mymap)

	let homestdlayer = L.geoJSON(data3.features,{
    style: homestyle,
    onEachFeature: onEachFeature
	}).addTo(mymap)

	let publayer = L.geoJSON(data2.features,{
    style: {
		"fillOpacity" : .5,
    	"fillColor": '#000',
    	"weight": 1,
    	"opacity": 1,
    	"stroke" : true,
    	"color" : 'black',
    	"weight" : .5,
	},
    onEachFeature: onEachFeature
	}).addTo(mymap)

	let surveylayer = L.geoJSON(data1.features,{
    style: surveystyle,
    onEachFeature: onEachFeature
	}).addTo(mymap)
	
	
	function windowResize(){
		 height = window.innerHeight;
	 	 width = window.innerWidth;
		 svg_width = width
		 svg_height = height * .9
		d3.select("#mapid").style("width", svg_width).style("height", svg_height)
		mymap.invalidateSize()
	}

	windowResize()
	updateLayerColors()
}


 wrapper()