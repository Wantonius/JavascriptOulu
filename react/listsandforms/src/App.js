import React from 'react';
import logo from './logo.svg';
import './App.css';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';

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
	
	removeFromList = (id) => {
		let tempid = parseInt(id,10);
		let templist = this.state.shoppinglist.filter(item => item.id !== tempid)
		this.setState({
			shoppinglist:templist
		})
	}
	
	editItem = (item) => {
		console.log(item);
		let tempList = [];
		for(let i=0;i<this.state.shoppinglist.length;i++) {
			if(this.state.shoppinglist[i].id !== item.id) {
				tempList.push(this.state.shoppinglist[i])
			} else {
				tempList.push(item)
			}
		}
		this.setState({
			shoppinglist:tempList
		})
	}
	
	render() {
		return (
			<div className="App">
				<ShoppingForm addToList={this.addToList}/>
				<hr/>
				<ShoppingList shoppinglist={this.state.shoppinglist}
							removeFromList={this.removeFromList}
							editItem={this.editItem}/>
			</div>
		);
	}
}

export default App;
