import React from 'react';
import logo from './logo.svg';
import './App.css';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import {Route,Switch,Redirect} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import {connect} from 'react-redux';

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			shoppinglist:[]
		}
	}
	



	
	//Shopping API
	
	getList = (search) => {
		let request = {
			method:"GET",
			mode:"cors",
			headers:{"Content-type":"application/json",
					token:this.props.token}
		}
		let url = "/api/shopping"
		if(search) {
			url = url +"?type="+search
		}
		fetch(url,request).then(response => {
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
			headers:{"Content-type":"application/json",
					token:this.props.token},
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
			headers:{"Content-type":"application/json",
					token:this.props.token}
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
			headers:{"Content-type":"application/json",
					token:this.props.token},
			body:JSON.stringify(item)
		}
		fetch("/api/shopping/"+item._id,request).then(response => {
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
				<Navbar/>
				<hr/>
				<Switch>
					<Route exact path="/" render={
						() => this.props.isLogged ?
						(<Redirect to="/list"/>) : 
						(<LoginForm/>)
					}/>
					<Route path="/list" render={
						() => this.props.isLogged ?
						(<ShoppingList shoppinglist={this.state.shoppinglist}
									removeFromList={this.removeFromList}
									editItem={this.editItem}
									getList={this.getList}/>) :
						(<Redirect to="/"/>)
					}/>			
					<Route path="/form" render={
						() => this.props.isLogged ?
						(<ShoppingForm addToList={this.addToList}/>):
						(<Redirect to="/"/>)
					}/>
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLogged:state.isLogged,
		token:state.token
	}
}

export default connect(mapStateToProps)(App);
