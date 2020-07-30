import React,{useReducer,useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import ShoppingForm from './components/ShoppingForm'
import ShoppingList from './components/ShoppingList'
import {Header} from 'semantic-ui-react';

const initialState = {
	list:[],
	loading:false
}

const listReducer = (state,action) => {
	switch(action.type) {
		case "LOADING": {
			return {
				...state,
				loading:true
			}
		}
		case "LOADING_DONE": {
			return {
				...state,
				loading:false
			}
		}
		case "LIST_LOADED": {
			return {
				list:action.list,
				loading:false
			}
		}
		default:
			return state;
	}
}

function App() {
	
	const [state,dispatch] = useReducer(listReducer,initialState);
	const [urlRequest,setUrlRequest] = useState({
		url:"",
		request:{}
	})
	
	useEffect(() => {
		const fetchData = async () => {
			dispatch({type:"LOADING"});
			try {
				const response = await fetch(urlRequest.url,urlRequest.request);
				if(response.ok) {
					if(urlRequest.request.method === "GET") {
						const data = await response.json();
						dispatch({type:"LIST_LOADED",list:data})
					} else {
						getList();
					}
				else {
					dispatch({type:"LOADING_DONE"})
					console.log("Server responded with status:",response.status)
					}		
				}
			} catch(error) {
				console.log(error)
		}		
	},[urlRequest])
	
	const addToList = (item) => {
		dispatch({
			type:"ADD_TO_LIST",
			item:item
		})
	}
	
	const removeFromList = (id) => {
		dispatch({
			type:"REMOVE_FROM_LIST",
			id:id
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
