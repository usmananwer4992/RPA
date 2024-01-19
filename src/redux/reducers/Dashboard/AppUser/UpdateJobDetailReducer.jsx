// import * as ActionTypes from '../../actions/home'
import * as ActionTypes from '../../../actions';
const initialState = {
	isLoading: false,
	data: null,
	apiErrors: [],
};
const UpdateJobDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.UPDATE_JOB_DETAIL:
			return { ...state, isLoading: true };
		case ActionTypes.UPDATE_JOB_DETAIL_SUCCESS:
			return {
				...state,
				isLoading: false,
			};
		case ActionTypes.UPDATE_JOB_DETAIL_FAILURE:
			return {
				...state,
				isLoading: false,
				apiErrors: action.apiResponse.error ? action.apiResponse.errors : null,
			};

		default:
			return state;
	}
};
export default UpdateJobDetailReducer;
