// import * as ActionTypes from '../../actions/home'
import * as ActionTypes from '../../../actions';
const initialState = {
	isLoading: false,
	response: [],
	apiErrors: [],
};
const AddJobReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.ADD_JOB:
			return { ...state, isLoading: true };
		case ActionTypes.ADD_JOB_SUCCESS:
			return {
				...state,
				data: action.apiResponse.data ? action.apiResponse.data : null,
				apiErrors: null,
			};
		case ActionTypes.ADD_JOB_COMPLETED:
			return {
				...state,
				isLoading: false,
			};
		case ActionTypes.ADD_JOB_FAILURE:
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
export default AddJobReducer;
