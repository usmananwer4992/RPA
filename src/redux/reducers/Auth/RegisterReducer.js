// import * as ActionTypes from '../../actions/home'
import * as ActionTypes from '../../actions/Auth/index';

const initialState = {
	isLoading: false,
	user: [],
	apiErrors: [],
};

// export const REGISTER_USER = 'REGISTER_USER';
// export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
// export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';
const RegisterUserReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.REGISTER_USER:
			return { ...state, isLoading: true };
		case ActionTypes.REGISTER_USER_FAILURE_RESET:
			return {
				...state,
				isLoading: false,
				user: null,
				apiErrors: null,
			};
		case ActionTypes.REGISTER_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				user: action.apiResponse.data ? action.apiResponse.data : null,
				apiErrors: null,
			};

		case ActionTypes.REGISTER_USER_FAILURE:
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
export default RegisterUserReducer;
