var React = require('react');
var Chart_Bar = require('./Chart-Bar3');
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
			  <div className="row">
				<div className="one-half column"><Chart_Bar /></div>
				<div className="one-half column"><Chart_Pie1 /></div>
			 </div>
			 <div className="row">
				<div className="one-half column"><Chart_Bar2 /></div>
			 </div>
			</div>
			)
		}
	});
React.render(
	<APP />,
	document.getElementById('app'))