import React from 'react';
import logo from './logo.svg';
import './App.css';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import {Route,Switch,Redirect} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import {connect} from 'react-redux';
import {getList} from './actions/shoppingActions';

class App extends React.Component {
		
	componentDidMount() {
		if(this.props.isLogged) {
			this.props.dispatch(getList(this.props.token));
		}
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
						(<ShoppingList />) :
						(<Redirect to="/"/>)
					}/>			
					<Route path="/form" render={
						() => this.props.isLogged ?
						(<ShoppingForm />):
						(<Redirect to="/"/>)
					}/>
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLogged:state.login.isLogged,
		token:state.login.token
	}
}

export default connect(mapStateToProps)(App);
