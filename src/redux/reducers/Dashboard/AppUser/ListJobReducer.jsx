// import * as ActionTypes from '../../actions/home'
import * as ActionTypes from '../../../actions';
const initialState = {
	isLoading: true,
	response: [],
	apiErrors: [],
};
const ListJobReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.LIST_JOB:
			return { ...state, isLoading: true };
		case ActionTypes.LIST_JOB_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.apiResponse.data ? action.apiResponse.data : null,
				apiErrors: null,
			};
		case ActionTypes.LIST_JOB_FAILURE:
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
export default ListJobReducer;
