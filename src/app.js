var React = require('react');
var Chart_Bar = require('./Chart-Bar3');

var APP = 
	React.createClass({
		getInitialState:function(){
			return {data:[]}
		},
		componentDidMount:function(){
			
		},

		render:function(){
			return ( 
			<div>
				<Chart_Bar />
			</div>
			)
		}
	});
React.render(
	<APP />,
	document.getElementById('app'))