import React from 'react';
import logo from './logo.svg';
import './App.css';
import Sender from './Sender';
import Receiver from './Receiver';

class App extends React.Component {
  
  constructor(props) {
	  super(props);
	  this.state = {
		  message:"No message yet"
	  }	 
  }
  
  sendMessage = (message) => {
	  this.setState({
		  message:message
	  })
  }
  
  render() {
	  return (
		<div className="App">
			<Sender sendMessage={this.sendMessage}/>
			<Receiver message={this.state.message}
					sendMessage={this.sendMessage}/>
		</div>
	  );
  }
}

export default App;
