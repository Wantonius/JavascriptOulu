import React from 'react'
import {Table,Button} from 'semantic-ui-react'
import Row from './Row';
import RemoveRow from './RemoveRow';

export default class ShoppingList extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			removeIndex:-1,
			editIndex:-1
		}
	}
	
	changeToRemoveMode = (id) => {
		let tempid = parseInt(id,10);
		for(let i=0;i<this.props.shoppinglist.length;i++) {
			if(tempid === this.props.shoppinglist[i].id) {
				this.setState({
					removeIndex:i,
					editIndex:-1
				})
			}
		}
	}

	changeToEditMode = (id) => {
		let tempid = parseInt(id,10);
		for(let i=0;i<this.props.shoppinglist.length;i++) {
			if(tempid === this.props.shoppinglist[i].id) {
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
	
	cancel = () => {
		this.setState({
			removeIndex:-1,
			editIndex:-1
		})
	}
	
	render() {
		let items = this.props.shoppinglist.map((item,index) => {
			if(this.state.removeIndex === index) {
				return <RemoveRow key={item.id} item={item}
					removeFromList={this.removeFromList}
					cancel={this.cancel}/>
			}
			return <Row key={item.id} item={item} 	
			changeToEditMode={this.changeToEditMode}
			changeToRemoveMode={this.changeToRemoveMode}/>
		}
		)
		return( 
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
		)
	}
	
}