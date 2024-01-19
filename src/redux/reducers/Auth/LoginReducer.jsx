// import * as ActionTypes from '../../actions/home'
import * as ActionTypes from '../../actions';

const initialState = {
	isLoading: false,
	user: '',
	apiErrors: [],
};

// export const LOGIN_USER = 'LOGIN_USER';
// export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
// export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
// export const REGISTER_USER = 'REGISTER_USER';
// export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
// export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';
const LoginUserReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.LOGIN_USER:
			return { ...state, isLoading: true };

		case ActionTypes.LOGIN_USER_FAILURE_RESET:
			return {
				...state,
				isLoading: false,
				user: null,
				apiErrors: null,
			};

		case ActionTypes.LOGIN_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				user:
					action.apiResponse && action.apiResponse.data
						? action.apiResponse.data
						: null,
				apiErrors: null,
			};
		case ActionTypes.LOGIN_USER_FAILURE:
			return {
				...state,
				isLoading: false,
				user: null,
				apiErrors: action.apiResponse.error ? action.apiResponse.errors : null,
			};
		default:
			return state;
	}
};

export default LoginUserReducer;
