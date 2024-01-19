// import * as ActionTypes from '../../actions/home'
import * as ActionTypes from '../../actions/index';

const initialState = {
	isLoading: false,
	user: [],
	apiErrors: [],
};

// export const RESET_PASSWORD = 'RESET_PASSWORD';
// export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
// export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

const RestPasswordReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.RESET_PASSWORD:
			return { ...state, isLoading: true };

		case ActionTypes.RESET_PASSWORD_SUCCESS:
			return {
				...state,
				isLoading: false,
				user: action.apiResponse.data ? action.apiResponse.data : null,
				apiErrors: null,
			};

		case ActionTypes.RESET_PASSWORD_FAILURE:
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

export default RestPasswordReducer;
