import React from 'react'
import d3 from 'd3'
import _ from 'lodash'

export default class ChartBar2 extends React.Component{
		constructor() {
			super()
			this.state = {data:[]}
		}

		componentDidMount(){
			this.renderChart();
		}
		
		renderChart(){
			var n = 3, // number of samples
				m = 2; // number of series
				
			var cnt = 2;
			
			//var data = d3.range(m).map(function() { return d3.range(n).map(Math.random); });
			//var data = d3.range(m).map(function() { return d3.range(n).map(function(){return 1;}) });
			
			//console.log(data);
			
			var data = [[0.1, 0.2, 0.4], [0.4, 0.4, 0.8]];

			
			console.log(data);

			
			var margin = {top: 20, right: 30, bottom: 30, left: 40},
				width = 400 - margin.left - margin.right,
				height = 300 - margin.top - margin.bottom;
			
			var y = d3.scale.linear()
				.domain([0, d3.max(data[1])])
				.range([height, 0]);
			
			var x0 = d3.scale.ordinal()
				.domain(d3.range(n))
				.rangeBands([0, width], .2);
			
			var x1 = d3.scale.ordinal()
				.domain(d3.range(m))
				.rangeBands([0, x0.rangeBand()]);
			
			var z = d3.scale.category10();
			
			var xAxis = d3.svg.axis()
				.scale(x0)
				.orient("bottom");
			
			var yAxis = d3.svg.axis()
				.scale(y)
				.orient("left");
			
			var svg = d3.select("#chartArea").append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
			.append("svg:g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			
			svg.append("g")
				.attr("class", "y axis")
				.call(yAxis);
			
			svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + height + ")")
				.call(xAxis);
			
			svg.append("g").selectAll("g")
				.data(data)
			.enter().append("g")
				.style("fill", function(d, i) { return z(i); })
				.attr("transform", function(d, i) { return "translate(" + x1(i) + ",0)"; })
			.selectAll("rect")
				.data(function(d) { return d; })
			.enter().append("rect")
				.attr("width", x1.rangeBand())
				.attr("height", y)
				.attr("x", function(d, i) { return x0(i); })
				.attr("y", function(d) { return height - y(d); });
		}
		render(){
			return <div id="chartArea"></div>
		}
	}