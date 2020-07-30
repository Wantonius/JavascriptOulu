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
				} else {
					dispatch({type:"LOADING_DONE"})
					console.log("Server responded with status:",response.status)
					}		
			} catch(error) {
				console.log(error)
			}		
		}
		
		fetchData();
	},[urlRequest])
	
	useEffect(() => getList(),[]);
	
	const getList = () => {
		setUrlRequest({
			url:"/api/shopping",
			request:{
				method:"GET",
				mode:"cors",
				headers:{"Content-type":"application/json"}
			}
		})
	}
	
	const addToList = (item) => {
		setUrlRequest({
			url:"/api/shopping",
			request:{
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json"},
				body:JSON.stringify(item)
			}
		})
	}
	
	const removeFromList = (id) => {
		setUrlRequest({
			url:"/api/shopping/"+id,
			request:{
				method:"DELETE",
				mode:"cors",
				headers:{"Content-type":"application/json"}
			}
		})
	}
	
	let header = <Header>Shopping App</Header>
	if(state.loading) {
		header = <Header>Shopping App ...Loading</Header>
	}
	
    return (
		<div className="App">
		{header}
			<ShoppingForm addToList={addToList}/>
			<hr/>
			<ShoppingList list={state.list} removeFromList={removeFromList}/>
		</div>
	);
}

export default App;
