import React from 'react';
import {Table,Button} from 'semantic-ui-react';

export default class EditRow extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			type:props.item.type,
			count:props.item.count,
			price:props.item.price
		}
	}
	
	onChange = (event) => {
		let state = {}
		state[event.target.name] = event.target.value;
		this.setState(state);
	}
	
	editItem = (event) => {
		let item = {
			id:this.props.item.id,
			type:this.state.type,
			count:this.state.count,
			price:this.state.price
		}
		this.props.editItem(item);
	}
	
	cancel = () => {
		this.props.cancel();
	}
	
	render() {
		return(
			<Table.Row>
				<Table.Cell>
					<input type="text"
							name="type"
							required={true}
							value={this.state.type}
							onChange={this.onChange}/>
				</Table.Cell>
				<Table.Cell>
					<input type="number"
							name="count"
							required={true}
							minimum="0"
							value={this.state.count}
							onChange={this.onChange}/>
				</Table.Cell>
				<Table.Cell>
					<input type="number"
							name="price"
							required={true}
							minimum="0"
							step="0.01"
							value={this.state.price}
							onChange={this.onChange}/>
				</Table.Cell>
				<Table.Cell><Button color="green"
				onClick={this.editItem}>Save</Button></Table.Cell>
				<Table.Cell><Button color="red"
				onClick={this.cancel}>Cancel</Button></Table.Cell>
			</Table.Row>
		)
	}
}