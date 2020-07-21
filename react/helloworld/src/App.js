import React from 'react';
import logo from './logo.svg';
import './App.css';
import HelloWorld from './HelloWorld';

class App extends React.Component {
	render() {
	  return (
		<div className="App">
			<HelloWorld/>
			<HelloWorld name="Erno"/>
		</div>
	  );
	}
}

export default App;
