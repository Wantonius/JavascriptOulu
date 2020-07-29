import React from 'react';
import {Link} from 'react-router-dom';
import {List,Header} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {logout} from '../actions/loginActions';

class Navbar extends React.Component {
	
	logout = () => {
		this.props.dispatch(logout(this.props.token));
	}
	
	
	render() {
		let style = {
			height:100,
			backgroundColor:"lightblue"
		}
		let header = "Shopping App";
		if(this.props.loading) {
			header = "Shopping App...Loading"
		}
		if(this.props.error) {
			header = this.props.error
		}
		if(this.props.isLogged) {
			return (
				<div style={style}>
					<Header>{header}</Header>
					<List>
						<List.Item><Link to="/list">Shopping List</Link></List.Item>
						<List.Item><Link to="/form">Add new item</Link></List.Item>
						<List.Item><Link to="/" 
						onClick={this.logout}>Logout</Link></List.Item>
					</List>
				</div>
			)
		} else {
			return (
				<div style={style}>
					<Header>{header}</Header>
				</div>				
			)
		}
	}
}

const mapStateToProps = (state) => {
	return {
		isLogged:state.login.isLogged,
		loading:state.login.loading,
		error:state.login.error,
		token:state.login.token
	}
}

export default connect(mapStateToProps)(Navbar);