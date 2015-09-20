import React from 'react'
import d3 from 'd3'
import _ from 'lodash'
import Donut3D from './Donut3D'

export default class ChartBar4 extends React.Component{
	constructor() {
		super()
		this.state = {data:[]}
	}

	componentDidMount(){
		this.renderChart();
	}
	
	renderChart(){
		var salesData=[
			{label:"Basic", value: 12, color:"#3366CC"},
			{label:"Plus", value: 42, color:"#DC3912"},
			{label:"Lite", value: 5, color:"#FF9900"},
			{label:"Elite", value: 23, color:"#109618"},
			{label:"Delux", value: 30, color:"#990099"}
		];
		
		var svg = d3.select("#chartArea2").append("svg").attr("width",400).attr("height",300);
		
		// svg.append("g").attr("id","salesDonut");
		svg.append("g").attr("id","quotesDonut");
		
		//Donut3D.draw("salesDonut", randomData(), 150, 150, 130, 100, 30, 0.4);
		Donut3D.draw("quotesDonut", randomData(), 200, 150, 130, 100, 30, 0);
		Donut3D.transition("quotesDonut", loadData(), 130, 100, 30, 0);
			
		// function changeData(){
		// 	Donut3D.transition("salesDonut", randomData(), 130, 100, 30, 0.4);
		// 	Donut3D.transition("quotesDonut", randomData(), 130, 100, 30, 0);
		// }
		
		function randomData(){
			return salesData.map(function(d){
				return {label:d.label, value:1000*Math.random(), color:d.color};});
		}
		
		function loadData(){
			return salesData.map(function(d){ 
				return {label:d.label, value:d.value, color:d.color};});
		}

	}
	
	render(){
		return <div id="chartArea2"></div>
	}
	}