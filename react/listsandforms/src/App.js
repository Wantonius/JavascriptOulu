import React from 'react';
import logo from './logo.svg';
import './App.css';
import ShoppingForm from './components/ShoppingForm';

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			shoppinglist:[],
			id:100
		}
	}
	
	addToList = (shoppingitem) => {
		shoppingitem.id = this.state.id;
		let templist = this.state.shoppinglist.concat(shoppingitem);
		let tempId = this.state.id+1;
		this.setState({
			shoppinglist:templist,
			id:tempId
		},() => {
			console.log(this.state);
		})
		console.log(this.state);
	}
	
	render() {
		return (
			<div className="App">
				<ShoppingForm addToList={this.addToList}/>
			</div>
		);
	}
}

export default App;
