import React from 'react';
import logo from './logo.svg';
import './App.css';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import {Route,Switch,Redirect} from 'react-router-dom';
import LoginForm from './components/LoginForm';

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			shoppinglist:[],
			token:"",
			isLogged:false
		}
	}
	
	componentDidMount() {
		if(sessionStorage.getItem("state")) {
			let state = JSON.parse(sessionStorage.getItem("state"));
			this.setState(state, () => {
				if(this.state.isLogged) {
					this.getList();
				}
			})
		}
	}
	
	//Helper functions
	
	saveToStorage = () => {
		sessionStorage.setItem("state",JSON.stringify(this.state));
	}
	
	sessionExpired = () => {
		this.setState({
			isLogged:false,
			token:"",
			shoppinglist:[]
		}, () => {
			this.saveToStorage();
		})
	}

	//Login API
	
	register = (user) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(user)
		}
		fetch("/register",request).then(response => {
			if(response.ok) {
				alert("Register success!");
			} else {
				console.log("Server responded with status:"+response.status);
			}
		}).catch(error => {
			console.log("Server responded with an error:"+error);
		})
	}

	login = (user) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(user)
		}
		fetch("/login",request).then(response => {
			if(response.ok) {
				response.json().then(data => {
					this.setState({
						token:data.token,
						isLogged:true
					}, () => {
						this.getList();
						this.saveToStorage();
					})
				}).catch(error => {
					console.log("Failed to parse JSON:"+error);
				})
			} else {
				console.log("Server responded with status:"+response.status);
			}
		}).catch(error => {
			console.log("Server responded with an error:"+error);
		})
	}	
	
	logout = () => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{
				"Content-type":"application/json",
				"token":this.state.token
			}
		}
		fetch("/logout",request).then(response => {
			this.sessionExpired();
		}).catch(error => {
			this.sessionExpired();
			console.log("Server responded with an error:"+error);
		})
		
	}
	
	//Shopping API
	
	getList = (search) => {
		let request = {
			method:"GET",
			mode:"cors",
			headers:{"Content-type":"application/json",
					token:this.state.token}
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
					},() => {
						this.saveToStorage();
					})
				}).catch(error => {
					console.log("Failed to parse JSON. Reason:"+error);
				});
			} else {
				if(response.status === 403) {
					this.sessionExpired();
				}
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
					token:this.state.token},
			body:JSON.stringify(shoppingitem)
		}
		fetch("/api/shopping",request).then(response => {
			if(response.ok) {
				this.getList();
			} else {
				if(response.status === 403) {
					this.sessionExpired();
				}
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
					token:this.state.token}
		}
		fetch("/api/shopping/"+id,request).then(response => {
			if(response.ok) {
				this.getList();
			} else {
				if(response.status === 403) {
					this.sessionExpired();
				}
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
					token:this.state.token},
			body:JSON.stringify(item)
		}
		fetch("/api/shopping/"+item._id,request).then(response => {
			if(response.ok) {
				this.getList();
			} else {
				if(response.status === 403) {
					this.sessionExpired();
				}
				console.log("Server responded with status:"+response.status);
		}}).catch(error => {
			console.log("Server responded with an error:"+error);
		})
	}
	
	render() {
		return (
			<div className="App">
				<Navbar isLogged={this.state.isLogged}
						logout={this.logout}/>
				<hr/>
				<Switch>
					<Route exact path="/" render={
						() => this.state.isLogged ?
						(<Redirect to="/list"/>) : 
						(<LoginForm login={this.login} register={this.register}/>)
					}/>
					<Route path="/list" render={
						() => this.state.isLogged ?
						(<ShoppingList shoppinglist={this.state.shoppinglist}
									removeFromList={this.removeFromList}
									editItem={this.editItem}
									getList={this.getList}/>) :
						(<Redirect to="/"/>)
					}/>			
					<Route path="/form" render={
						() => this.state.isLogged ?
						(<ShoppingForm addToList={this.addToList}/>):
						(<Redirect to="/"/>)
					}/>
				</Switch>
			</div>
		);
	}
}

export default App;
