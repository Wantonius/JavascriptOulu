import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import ShoppingForm from './components/ShoppingForm'
import ShoppingList from './components/ShoppingList'

function App() {
	
	const [state,setState] = useState({
		list:[],
		id:100
	})
	
	const addToList = (item) => {
		item.id = state.id;
		let tempId = state.id+1;
		setState({
			list:state.list.concat(item),
			id:tempId
		})
	}
	
	const removeFromList = (id) => {
		let tempId = parseInt(id,10);
		let tempList = state.list.filter(item => item.id !== tempId);
		setState({
			...state,
			list:tempList
		})
	}
	
    return (
		<div className="App">
			<ShoppingForm addToList={addToList}/>
			<hr/>
			<ShoppingList list={state.list} removeFromList={removeFromList}/>
		</div>
	);
}

export default App;
