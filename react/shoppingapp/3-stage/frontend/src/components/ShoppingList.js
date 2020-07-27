import React from 'react'
import {Table,Button} from 'semantic-ui-react'
import Row from './Row';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';

export default class ShoppingList extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			removeIndex:-1,
			editIndex:-1,
			search:""
		}
	}
	
	onChange = (event) => {
		let state = {};
		state[event.target.name] = event.target.value;
		this.setState(state);
	}
	
	searchByType = (event) => {
		this.props.getList(this.state.search);
		this.setState({
			search:""
		})
	}
	
	changeToRemoveMode = (id) => {
		for(let i=0;i<this.props.shoppinglist.length;i++) {
			if(id === this.props.shoppinglist[i]._id) {
				this.setState({
					removeIndex:i,
					editIndex:-1
				})
			}
		}
	}

	changeToEditMode = (id) => {
		for(let i=0;i<this.props.shoppinglist.length;i++) {
			if(id === this.props.shoppinglist[i]._id) {
				this.setState({
					removeIndex:-1,
					editIndex:i
				})
			}
		}
	}	
	
	removeFromList = (id) => {
		this.props.removeFromList(id);
		this.cancel();
	}
	
	editItem = (item) => {
		this.props.editItem(item);
		this.cancel();
	}
	
	cancel = () => {
		this.setState({
			removeIndex:-1,
			editIndex:-1
		})
	}
	
	render() {
		let items = this.props.shoppinglist.map((item,index) => {
			if(this.state.editIndex === index) {
				return <EditRow key={item._id} item={item}
					editItem={this.editItem} cancel={this.cancel}/>
			}
			if(this.state.removeIndex === index) {
				return <RemoveRow key={item._id} item={item}
					removeFromList={this.removeFromList}
					cancel={this.cancel}/>
			}
			return <Row key={item._id} item={item} 	
			changeToEditMode={this.changeToEditMode}
			changeToRemoveMode={this.changeToRemoveMode}/>
		}
		)
		return( 
		<div>
			<label htmlFor="search">Search by type:</label>
			<input type="text"
					name="search"
					onChange={this.onChange}
					value={this.state.search}/>
			<Button style={{marginLeft:10}} onClick={this.searchByType}>Search</Button>
			<Table celled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Type</Table.HeaderCell>
						<Table.HeaderCell>Count</Table.HeaderCell>
						<Table.HeaderCell>Price</Table.HeaderCell>
						<Table.HeaderCell>Remove</Table.HeaderCell>
						<Table.HeaderCell>Edit</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
				{items}
				</Table.Body>				
			</Table>
		</div>
		)
	}
	
}