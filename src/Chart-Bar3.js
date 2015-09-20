import React from 'react'
import d3 from 'd3'
import _ from 'lodash'

export default class ChartBar3 extends React.Component{
	constructor() {
		super()
		this.state = {data:[]}
	}

	componentDidMount(){
		this.renderChart();
	}
	
	renderChart(){
		var margin = {top: 20, right: 20, bottom: 30, left: 40},
			width = 400 - margin.left - margin.right,
			height = 300 - margin.top - margin.bottom;
	
		var x0 = d3.scale.ordinal()
			.rangeRoundBands([0, width], 0.1);
		
		var x1 = d3.scale.ordinal();
		
		var y = d3.scale.linear()
			.range([height, 0]);
		
		var color = d3.scale.ordinal()
			.range(["#2F61E4", "#EC0307", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
		
		var xAxis = d3.svg.axis()
			.scale(x0)
			.orient("bottom");
		
		var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left")
			.tickFormat(d3.format(".2s"));
		
		var svg = d3.select("#chartArea").append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
		//This section converts the data from the csv file to data
		d3.csv("data.csv", function(error, data) {
			if (error) throw error;

			//Removes the first element of the array the "Years" item and places in an array
			//of category names e.g ["closed", "open"]
			var _category = d3.keys(data[0]).filter(function(key) { return key !== "Years"; });

			// console.log(`This is a category array ${_category}`);

			data.forEach(function(d) {
				d._object = _category.map(function(name) { return {name: name, value: +d[name]}; });
		});
		//Passes to x0.domain the Years ["2013", "2014", "2015"]
		x0.domain(data.map(function(d) { return d.Years; }));
		//console.log(data.map(function(d) { return d.Years; }));
		x1.domain(_category).rangeRoundBands([0, x0.rangeBand()]);
		y.domain([0, d3.max(data, function(d) { return d3.max(d._object, function(d) { return d.value; }); })]);
		
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);
		
		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("Deviations");
		
		var state = svg.selectAll(".state")
			.data(data)
			.enter().append("g")
			.attr("class", "g")
			.attr("transform", function(d) { return "translate(" + x0(d.Years) + ",0)"; });
		
		state.selectAll("rect")
			//.data(function(d) { return d._object; }) //Converted to es6
			.data((d) => d._object)
			.enter().append("rect")
			.attr("width", x1.rangeBand())
			.attr("x", function(d) { return x1(d.name); })
			.attr('y', 250)
			.attr('height', 0)
			.transition()
			.duration(2000)
			.attr("y", function(d) { return y(d.value); })
			.attr("height", function(d) { return height - y(d.value); })
			.style("fill", function(d) { return color(d.name); });
		
		var legend = svg.selectAll(".legend")
			.data(_category.slice().reverse())
			.enter().append("g")
			.attr("class", "legend")
			.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
		
		legend.append("rect")
			.attr("x", width - 18)
			.attr("width", 18)
			.attr("height", 18)
			.style("fill", color);
		
		legend.append("text")
			.attr("x", width - 24)
			.attr("y", 9)
			.attr("dy", ".35em")
			.style("text-anchor", "end")
			.text(function(d) { return d; });
	
	});
	}
	
	render(){
		return <div id="chartArea"></div>
	}
	}