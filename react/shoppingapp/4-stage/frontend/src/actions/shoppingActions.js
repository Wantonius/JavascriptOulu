import {fetchLoading,loadingDone,logoutSuccess} from './loginActions';
//ACTION CONSTANTS

export const GET_SHOPPINGLIST_SUCCESS = "GET_SHOPPINGLIST_SUCCESS"
export const GET_SHOPPINGLIST_FAILED = "GET_SHOPPINGLIST_FAILED"
export const ADD_TO_LIST_SUCCESS = "ADD_TO_LIST_SUCCESS"
export const ADD_TO_LIST_FAILED = "ADD_TO_LIST_FAILED"
export const REMOVE_FROM_LIST_SUCCESS = "REMOVE_FROM_LIST_SUCCESS"
export const REMOVE_FROM_LIST_FAILED = "REMOVE_FROM_LIST_FAILED"
export const EDIT_ITEM_SUCCESS = "EDIT_ITEM_SUCCESS"
export const EDIT_ITEM_FAILED = "EDIT_ITEM_FAILED"
export const REMOVE_STATE = "REMOVE_STATE"

//ACTIONS
export const getList = (token, search) => {
	return dispatch => {	
		let request = {
			method:"GET",
			mode:"cors",
			headers:{"Content-type":"application/json",
					token:token}
		}
		let url = "/api/shopping"
		if(search) {
			url = url +"?type="+search
		}
		dispatch(fetchLoading());
		fetch(url,request).then(response => {
			dispatch(loadingDone());
			if(response.ok) {
				response.json().then(data => {
					dispatch(getListSuccess(data));
				}).catch(error => {
					dispatch(getListFailed("Failed to parse JSON"+error))
				});
			} else {
				if(response.status===403) {
					dispatch(removeState());
					dispatch(logoutSuccess());
				}
				dispatch(getListFailed("Failed to get shoppinglist. Server responded with status:"+response.status));
			}
		}).catch(error => {
			dispatch(loadingDone())
			dispatch(getListFailed("Server responded with an error:"+error));
		})
	}
}

export const addToList = (token,shoppingitem) => {
	return dispatch => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json",
					token:token},
			body:JSON.stringify(shoppingitem)
		}
		dispatch(fetchLoading());
		fetch("/api/shopping",request).then(response => {
			dispatch(loadingDone());
			if(response.ok) {
				dispatch(addToListSuccess());
				dispatch(getList(token));
			} else {
				dispatch(addToListFailed("Server responded with status:"+response.status));
			}
		}).catch(error => {
			dispatch(loadingDone());
			dispatch(addToListFailed("Server responded with an error:"+error));
		})
	}
}
//ACTION CREATORS

const getListSuccess = (data) => {
	return {
		type:GET_SHOPPINGLIST_SUCCESS,
		list:data
	}
}

const getListFailed = (error) => {
	return {
		type:GET_SHOPPINGLIST_FAILED,
		error:error
	}
}

const addToListSuccess = () => {
	return {
		type:ADD_TO_LIST_SUCCESS
	}
}

const addToListFailed = (error) => {
	return {
		type:ADD_TO_LIST_FAILED,
		error:error
	}
}

const removeFromListSuccess = () => {
	return {
		type:REMOVE_FROM_LIST_SUCCESS
	}
}

const removeFromListFailed = (error) => {
	return {
		type:REMOVE_FROM_LIST_FAILED,
		error:error
	}
}

const editItemSuccess = () => {
	return {
		type:EDIT_ITEM_SUCCESS
	}
}

const editItemFailed = (error) => {
	return {
		type:EDIT_ITEM_FAILED,
		error:error
	}
}

export const removeState = () => {
	return {
		type:REMOVE_STATE
	}
}