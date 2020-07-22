import React from 'react';

export default class Sender extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			message:""
		}
	}
	
	sendMessage = (event) => {
		this.props.sendMessage(this.state.message)
		this.setState({
			message:""
		})
	}
	
	onChange = (event) => {
		let state = {};
		state[event.target.name] = event.target.value;
		this.setState(state)
	}
	
	render() {
		return(
			<div>
				<label htmlFor="message">Enter a message</label>
				<input type="text"
						name="message"
						value={this.state.message}
						onChange={this.onChange}/>
				<button onClick={this.sendMessage}>Send message</button>
			</div>
		)
	}

}