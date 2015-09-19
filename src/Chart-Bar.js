import React from 'react'
import d3 from 'd3'
import _ from 'lodash'

export default class Counter extends React.Component{
		constructor() {
			super()
			this.state = {data:[]}
		}

		componentDidMount(){
			this.renderChart();
		}
		
		renderChart(){
			let dataset = _.map(_.range(15), function (i) {
				return Math.random() * 100;
			});
			
			const margin = {top: 25, right: 0, bottom: 20, left: 40};
			const w = 400 - margin.left - margin.right,
				h = 300 - margin.top - margin.bottom;
				
			const bar = {'fill' : 'teal'};
			
			let svg = d3.select('#chartArea').append('svg')
				.attr('width', w + margin.left + margin.right)
				.attr('height', h + margin.top + margin.bottom)
				.append('g')
				.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
			
			let xScale = d3.scale.ordinal()
				.domain(dataset)
				.rangeBands([0, w], 0.1, 0);
			
			let yScale = d3.scale.linear()
				.domain([0, d3.max(dataset)])
				.range([h, 0]);
			
			// let xAxis = d3.svg.axis()
			// 	.scale(xScale)
			// 	.orient('bottom')
			// 	.ticks(15)
			// 	.innerTickSize(6)
			// 	.outerTickSize(12)
			// 	.tickPadding(12);

			// svg.append('g')
			// 	.attr('class', 'x axis')
			// 	.attr('transform', 'translate(0, '+ (h + 0) + ')')
			// 	.call(xAxis);
				
				let yAxis = d3.svg.axis()
					.scale(yScale)
					.orient('left');

				svg.append('g')
					.attr('class', 'y axis')
					.attr('transform', 'translate(0, 0)')
					.call(yAxis);
				
			svg.selectAll('rect')
				.data(dataset)
				.enter()
				.append('rect')
				.style('fill', 'yellow')
				.attr('x', xScale)
				.attr('width', xScale.rangeBand())
				.attr('y', 250)
				.attr('height', 0)
				.transition()
				.duration(800)
				.style(bar)
				.text(function(d) { return d; })
				.attr('y', yScale)
				.attr('height', function (d) {
				return h - yScale(d);
				});
		}
		render(){
			return <div id="chartArea"></div>
		}
	}