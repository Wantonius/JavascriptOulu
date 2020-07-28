import {
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	REGISTER_SUCCESS,
	REGISTER_FAILED,
	LOGOUT_SUCCESS,
	LOGOUT_FAILED,
	FETCH_LOADING,
	LOADING_DONE
} from '../actions/loginActions';

const getInitialState = () => {
	if(sessionStorage.getItem("loginstate")) {
		let state = JSON.parse(sessionStorage.getItem("loginstate"))
		return state;
	} else {
		return {
			isLogged:false,
			token:"",
			loading:false,
			error:""
		}
	}
}

const saveToStorage = (state) => {
	sessionStorage.setItem("loginstate",JSON.stringify(state));
}

const initialState = getInitialState();

const loginReducer = (state=initialState,action) => {
	console.log("loginReducer, action type:"+action.type);
	let tempState = {};
	switch(action.type) {
		case FETCH_LOADING: 
				tempState= {
					...state,
					loading:true
				}
				saveToStorage(tempState);
				return tempState;
		case LOADING_DONE:
				tempState= {
					...state,
					loading:false
				}
				saveToStorage(tempState);
				return tempState;
		case REGISTER_SUCCESS:
				tempState= {
					...state,
					error:""
				}
				saveToStorage(tempState);
				return tempState;
		case REGISTER_FAILED:
				tempState= {
					...state,
					error:action.error
				}
				saveToStorage(tempState);
				return tempState;
		case LOGIN_SUCCESS:
				tempState= {
					...state,
					isLogged:true,
					token:action.token,
					error:""
				}
				saveToStorage(tempState);
				return tempState;
		case LOGIN_FAILED:
				tempState= {
					...state,
					error:action.error
				}
				saveToStorage(tempState);
				return tempState;
		case LOGOUT_SUCCESS:
				tempState= {
					...state,
					isLogged:false,
					token:"",
					error:""
				}
				saveToStorage(tempState);
				return tempState;
		case LOGOUT_FAILED:
				tempState= {
					...state,
					isLogged:false,
					token:"",
					error:action.error
				}
				saveToStorage(tempState);
				return tempState;
		default:
			return state;
	}
}

export default loginReducer;