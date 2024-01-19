// import * as ActionTypes from '../../actions/home'
import * as ActionTypes from '../../actions';
const initialState = {
	isLoading: true,
	response: [],
	apiErrors: [],
};
const DriveSignUpReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.DRIVE_SIGNUP_GET:
			return { ...state, isLoading: true };
		case ActionTypes.DRIVE_SIGNUP_GET_SUCCESS:
			return {
				...state,
				isLoading: false,
				user: action.apiResponse.data ? action.apiResponse.data : null,
				apiErrors: null,
			};
		case ActionTypes.DRIVE_SIGNUP_GET_FAILURE:
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
export default DriveSignUpReducer;
