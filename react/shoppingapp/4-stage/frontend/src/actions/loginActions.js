//ACTION CONSTANTS

export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILED = "LOGIN_FAILED"
export const REGISTER_SUCCESS = "REGISTER_SUCCESS"
export const REGISTER_FAILED = "REGISTER_FAILED"
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"
export const LOGOUT_FAILED = "LOGOUT_FAILED"
export const FETCH_LOADING = "FETCH_LOADING"
export const LOADING_DONE = "LOADING_DONE"

//ACTIONS
export const register = (user) => {
	console.log("Register Action");
	return dispatch => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(user)
		}
		dispatch(fetchLoading());
		fetch("/register",request).then(response => {
			dispatch(loadingDone());
			if(response.ok) {
				alert("Register success!");
				dispatch(registerSuccess());
			} else {
				dispatch(registerFailed("Register failed. Is username already in use? Server responded with status:"+response.status));
			}
		}).catch(error => {
			dispatch(loadingDone());
			dispatch(registerFailed("Error! Server responded with an error:"+error));
		})
	}
}

//ACTION CREATORS

export const fetchLoading = () => {
	return {
		type:FETCH_LOADING
	}
}

export const loadingDone = () => {
	return {
		type:LOADING_DONE
	}
}

export const registerSuccess = () => {
	return {
		type:REGISTER_SUCCESS
	}
}

export const registerFailed = (error) => {
	return {
		type:REGISTER_FAILED,
		error:error
	}
}

export const loginSuccess = (token) => {
	return {
		type:LOGIN_SUCCESS,
		token:token
	}
}

export const loginFailed = (error) => {
	return {
		type:LOGIN_FAILED,
		error:error
	}
}

export const logoutSuccess = () => {
	return {
		type:LOGOUT_SUCCESS
	}
}

export const logoutFailed = (error) => {
	return {
		type:LOGOUT_FAILED,
		error:error
	}
}