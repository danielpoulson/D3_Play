var React = require('react');
var Chart_Bar = require('./Chart-Bar');
var Chart_Bar2 = require('./Chart-Bar4');
var Chart_Pie1 = require('./Chart-Pie');

var APP = 
	React.createClass({
		getInitialState:function(){
			return {data:[]}
		},
		componentDidMount:function(){
			
		},

		render:function(){
			return ( 
			<div className="container">
			<h1>This is my chart examples</h1>
			  <div className="row">
				<div className="one-half column"><Chart_Pie1 /></div>
				<div className="one-half column"><Chart_Bar /></div>
			 </div>
			</div>
			)
		}
	});
React.render(
	<APP />,
	document.getElementById('app'))