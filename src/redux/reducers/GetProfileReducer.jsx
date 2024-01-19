// import * as ActionTypes from '../../actions/home'
import * as ActionTypes from '../actions';
const initialState = {
	isLoading: false,
	response: [],
	apiErrors: [],
};
const GetProfileReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.GET_PROFILE:
			return { ...state, isLoading: true };
		case ActionTypes.GET_PROFILE_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.apiResponse.data ? action.apiResponse.data : null,
				apiErrors: null,
			};
		case ActionTypes.GET_PROFILE_FAILURE:
			return {
				...state,
				isLoading: false,
				data: null,
				apiErrors: action.apiResponse.error ? action.apiResponse.errors : null,
			};
		default:
			return state;
	}
};
export default GetProfileReducer;
