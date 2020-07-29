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
