import React from 'react';

export default class StatefulComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			color:"red"
		}
	}
	
	colorChange = (event) => {
		let state = {}
		state[event.target.name] = event.target.value
		this.setState(state);
	}
	
	render() {
		let style = {"backgroundColor":this.state.color};
		return (
			<div>
				<p style={style}>The background color changes</p>
				<label htmlFor="color">Write to change color:</label>
				<input type="text"
						name="color"
						value={this.state.color}
						onChange={this.colorChange}/>
			</div>
		)
 	}

}