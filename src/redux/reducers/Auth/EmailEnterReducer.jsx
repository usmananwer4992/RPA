// import * as ActionTypes from '../../actions/home'
import * as ActionTypes from '../../actions';
const initialState = {
	isLoading: false,
	response: [],
	apiErrors: [],
};
const EmailEnterReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.EMAIL_ENTER:
			return { ...state, isLoading: true };
		case ActionTypes.EMAIL_ENTER_SUCCESS:
			return {
				...state,
				isLoading: false,
				response: action.apiResponse.data ? action.apiResponse.data : null,
				apiErrors: null,
			};
		case ActionTypes.EMAIL_ENTER_FAILURE:
			return {
				...state,
				isLoading: false,
				response: null,
				apiErrors: action.apiResponse.error ? action.apiResponse.errors : null,
			};
		default:
			return state;
	}
};
export default EmailEnterReducer;
