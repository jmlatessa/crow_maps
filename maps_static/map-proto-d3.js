'use strict'



async function wrapper(){

	let height = window.innerHeight;

	//d3.select("#mapid").style("height", height)
	let width = window.innerWidth;
  	let color_count = 0
  	const colorscale = d3.schemeSet2

  	/*let context = d3.select('#content canvas')
  		.node()
  		.getContext('2d');*/

	 
	let svg_width = width * .66
	let svg_height = 400 
	window.onresize = windowResize;
	 console.log(svg_width)
	 console.log(svg_height)
	//let data = await d3.json('crow_4326_survey.json')
	let data1 = await d3.json('arcmap_vector_geojson_layers_v02/crow_4325_homestd_gr_map.json')
	let data2 = await d3.json('arcmap_vector_geojson_layers_v02/crow_4325_loc_gr_map.json')
	let data3 = await d3.json('arcmap_vector_geojson_layers_v02/crow_4325_survey_gr_map.json')

	

	d3.selectAll("#loading").classed("hidden", true);
	d3.selectAll(".load-unhide").classed("hidden", false);
	console.log(data1)
	console.log(data2)
	console.log(data3)
	var baselong, baselat, zoom 
	baselong = 45.6;
	baselat =  -107.85;
	zoom = 70;

	let projection = d3.geoMercator().scale(20000)
		//.translate([ 45.620038387065144,-107.8539177911578])
		.center([baselat, baselong]);;

	//projection( [45.6, -107.85] )

	let geoGenerator = d3.geoPath()
  		.projection(projection);


  	let u = d3.select('#content g.map')
  	.selectAll('path')
  	.data(data3.features)
  	.join('path')
  	.attr('d', geoGenerator);
	//u.style("stroke-width", "1px").style("stroke", "red")



	function windowResize(){
	}
}


 wrapper()