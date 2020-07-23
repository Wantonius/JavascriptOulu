import React from 'react';
import logo from './logo.svg';
import './App.css';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			shoppinglist:[]
		}
	}
	
	componentDidMount() {
		this.getList();
	}
	
	getList = () => {
		let request = {
			method:"GET",
			mode:"cors",
			headers:{"Content-type":"application/json"}
		}
		fetch("/api/shopping",request).then(response => {
			if(response.ok) {
				response.json().then(data => {
					this.setState({
						shoppinglist:data
					})
				}).catch(error => {
					console.log("Failed to parse JSON. Reason:"+error);
				});
			} else {
				console.log("Server responded with status:"+response.status);
			}
		}).catch(error => {
			console.log("Server responded with an error:"+error);
		})
	}
	
	addToList = (shoppingitem) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(shoppingitem)
		}
		fetch("/api/shopping",request).then(response => {
			if(response.ok) {
				this.getList();
			} else {
				console.log("Server responded with status:"+response.status);
			}
		}).catch(error => {
			console.log("Server responded with an error:"+error);
		})
	}
	
	removeFromList = (id) => {
		let request = {
			method:"DELETE",
			mode:"cors",
			headers:{"Content-type":"application/json"}
		}
		fetch("/api/shopping/"+id,request).then(response => {
			if(response.ok) {
				this.getList();
			} else {
				console.log("Server responded with status:"+response.status);
			}
		}).catch(error => {
			console.log("Server responded with an error:"+error);
		})
	}
	
	editItem = (item) => {
		let request = {
			method:"PUT",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(item)
		}
		fetch("/api/shopping/"+item.id,request).then(response => {
			if(response.ok) {
				this.getList();
			} else {
				console.log("Server responded with status:"+response.status);
		}}).catch(error => {
			console.log("Server responded with an error:"+error);
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
