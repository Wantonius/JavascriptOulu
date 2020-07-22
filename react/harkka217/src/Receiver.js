import React from 'react'

export default class Receiver extends React.Component {

	clearMessage = () => {
		this.props.sendMessage("No message yet")
	}
	
	render() {
		return(
			<div>
				<p>The message reads:{this.props.message}</p>
				<button onClick={this.clearMessage}>Clear Message</button>
			</div>
		)
	}
}